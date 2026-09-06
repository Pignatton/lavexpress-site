# RUNBOOK — Lead Qualificado e Venda no Google Ads (Lavexpress)

Documento operacional. Descreve como auditar, reprocessar e medir o funil
Google Ads → site → WhatsApp → LavCore → lead qualificado → venda.

**Conta:** 253-893-7535 · **Campanha:** `Lavexpress 2026` (`23429059645`)
**Última atualização:** 06/09/2026

---

## 0. Estado atual da instrumentação

| Camada | Estado |
|---|---|
| Captura de `gclid`/`gbraid`/`wbraid` no site | implementada |
| `lead_ref` na mensagem do WhatsApp | implementado |
| Persistência de atribuição no LavCore | endpoint pronto; **migration não aplicada em banco** |
| Associação automática WhatsApp → lead | **indisponível** — não há WhatsApp Business API nesta conta |
| Associação manual WhatsApp → lead | disponível na tela de leads do LavCore |
| Envio de conversão offline ao Google | **inativo** — faltam credenciais da Google Ads API |
| Ações de conversão novas no Google Ads | **não criadas** — sessão do Google Ads expirada |

⚠️ Enquanto as duas últimas linhas não forem resolvidas, o Google **continua
aprendendo apenas com `Contato - WhatsApp`**, exatamente como hoje. Nada
regrediu; o que foi construído é a tubulação que passará a alimentá-lo.

---

## 1. Como auditar um lead de ponta a ponta

### 1.1 A partir do `lead_ref`

O cliente manda no WhatsApp uma mensagem terminando em `Ref: LX-A7K3Q9`.

1. LavCore → **Marketing → Leads** → buscar `LX-A7K3Q9`.
2. A ficha mostra: data, origem, campanha, UTM, se havia click id (sim/não),
   bairro/CEP, status, telefone associado, cliente, atendimento, venda e valor.
3. O `gclid` **nunca** aparece inteiro na tela — só o indicador "GCLID: sim/não".
   Para ver o valor bruto é preciso consulta direta ao banco, com justificativa.

### 1.2 Direto no banco

```sql
-- Ficha completa de um lead
select id, lead_ref, status, source, medium, campaign,
       (gclid is not null) as tem_gclid,
       (gbraid is not null) as tem_gbraid,
       (wbraid is not null) as tem_wbraid,
       bairro, cep, service_interest,
       conversation_started_at, qualified_at,
       collection_scheduled_at, converted_at,
       revenue_cents, is_test, created_at
from marketing_leads
where tenant_id = :tenant
  and lead_ref = 'LX-A7K3Q9';
```

### 1.3 Como saber se um lead foi atribuído ao Google

Um lead é atribuível ao Google **somente se** tiver `gclid`, `gbraid` ou `wbraid`.

```sql
select
  count(*)                                                as leads_total,
  count(*) filter (where gclid is not null
                      or gbraid is not null
                      or wbraid is not null)              as atribuiveis_google,
  count(*) filter (where utm_source = 'google')           as marcados_utm_google
from marketing_leads
where tenant_id = :tenant
  and is_test = false
  and created_at >= :inicio and created_at < :fim;
```

> Lead sem click id **não pode** virar conversão offline no Google. Ele continua
> valendo como lead do negócio — só não é reportável ao leilão.

---

## 2. Como verificar as conversões enviadas

### 2.1 Fila interna

```sql
select conversion_type, status, count(*), max(created_at)
from google_ads_conversion_queue
where tenant_id = :tenant
group by 1, 2
order by 1, 2;
```

Estados: `pending` → `processing` → `sent` | `failed` | `ignored`.

- `ignored` = lead sem click id, ou lead de teste (`is_test = true`). Correto, não é erro.
- `failed` com `attempts >= 5` = precisa investigação humana.

### 2.2 No Google Ads

**Metas → Resumo → Ver todas as ações de conversão** → abrir a ação → aba
**Diagnóstico**. Uma conversão offline importada aparece com atraso de algumas
horas e some da janela se o clique tiver mais de 90 dias.

Checar sempre:
- a ação está **Secundária** (coluna "Ação de otimização" = "Secundária");
- a contagem sobe depois de um upload;
- não há aviso de "clique não encontrado".

---

## 3. Como reenviar falhas

1. Identificar:
   ```sql
   select id, lead_id, conversion_type, attempts, last_error, created_at
   from google_ads_conversion_queue
   where tenant_id = :tenant and status = 'failed'
   order by created_at desc;
   ```
2. Ler `last_error`. Causas comuns e o que fazer:

| Erro do Google | Significado | Ação |
|---|---|---|
| `CLICK_NOT_FOUND` | gclid inexistente ou fora da janela de 90 dias | marcar `ignored`; não é recuperável |
| `CONVERSION_PRECEDES_CLICK` | `conversion_time` anterior ao clique | corrigir o timestamp e reenfileirar |
| `DUPLICATE_CLICK_CONVERSION` | já enviada | marcar `sent`; a idempotência funcionou |
| `EXPIRED_CLICK` | clique com mais de 90 dias | marcar `ignored` |
| `AUTHENTICATION_ERROR` / `AUTHORIZATION_ERROR` | credencial inválida | renovar o refresh token; **não** reenfileirar |

3. Reenfileirar apenas o que é recuperável:
   ```sql
   update google_ads_conversion_queue
      set status = 'pending', attempts = 0, last_error = null
    where tenant_id = :tenant and id = :id;
   ```
4. **Nunca** apagar linha da fila para "forçar reenvio". A constraint
   `UNIQUE (lead_id, conversion_type)` é a garantia de que a mesma conversão não
   é contada duas vezes; removê-la quebra a idempotência.

---

## 4. Métricas — como calcular

O custo do Google Ads **não é integrado automaticamente**. Ele vem de:
Google Ads → Campanhas → `Lavexpress 2026` → coluna **Custo**, no período.

Todas as fórmulas abaixo excluem `is_test = true`.

### CPQL — custo por lead qualificado

```
CPQL = gasto_google_no_periodo / leads_qualificados_no_periodo
```

```sql
select count(*) as leads_qualificados
from marketing_leads
where tenant_id = :tenant and is_test = false
  and qualified_at >= :inicio and qualified_at < :fim;
```

### CAC — custo de aquisição de cliente

```
CAC = gasto_google_no_periodo / clientes_adquiridos_no_periodo
```

Cliente adquirido = lead com `status = 'converted'` e `customer_id` não nulo,
contando **a primeira venda** de cada cliente.

```sql
select count(distinct customer_id) as clientes_adquiridos
from marketing_leads
where tenant_id = :tenant and is_test = false
  and status = 'converted'
  and converted_at >= :inicio and converted_at < :fim;
```

### ROAS

```
ROAS = receita_atribuida_ao_google / gasto_google
```

```sql
select coalesce(sum(revenue_cents), 0) / 100.0 as receita_reais
from marketing_leads
where tenant_id = :tenant and is_test = false
  and status = 'converted'
  and (gclid is not null or gbraid is not null or wbraid is not null)
  and converted_at >= :inicio and converted_at < :fim;
```

> ⚠️ **Só entra no ROAS o lead com click id.** Receita de lead sem click id é
> receita do negócio, não receita atribuível ao Google. Misturar as duas infla o
> ROAS e leva a decisão errada de orçamento.

### Taxas do funil

```
clique → conversa      = conversation_started / whatsapp_click
conversa → qualificado = qualified / conversation_started
qualificado → venda    = converted / qualified
ticket médio           = receita / clientes_adquiridos
```

```sql
select
  count(*)                                                  as whatsapp_click,
  count(*) filter (where conversation_started_at is not null) as conversas,
  count(*) filter (where status = 'qualified'
                      or qualified_at is not null)           as qualificados,
  count(*) filter (where status = 'converted')               as vendas,
  coalesce(sum(revenue_cents), 0) / 100.0                    as receita
from marketing_leads
where tenant_id = :tenant and is_test = false
  and created_at >= :inicio and created_at < :fim;
```

---

## 5. Critério para trocar a conversão primária

**Hoje: NÃO trocar.** `Contato - WhatsApp` continua primária.

A troca só deve ser avaliada quando as três condições abaixo forem verdadeiras
ao mesmo tempo:

1. **Volume.** `WhatsApp - Lead Qualificado` acumulou conversões suficientes para
   o `Maximizar conversões` aprender. A referência do próprio Google para
   estratégias automáticas é da ordem de **30 conversões em 30 dias**. Com o
   volume atual da conta (32 conversões de WhatsApp em 14 dias, das quais uma
   fração será qualificada), isso deve levar **meses**, não semanas. Medir, não
   estimar.
2. **Cobertura de atribuição.** Pelo menos **70%** dos leads qualificados têm
   click id. Abaixo disso, otimizar pelo lead qualificado joga fora a maior
   parte do sinal e piora o aprendizado.
3. **Estabilidade.** A taxa `conversa → qualificado` está estável por 4 semanas
   seguidas. Se ela ainda oscila muito, o critério de qualificação do atendente
   ainda não está calibrado e o Google aprenderia com um alvo móvel.

### Ordem da troca, quando o momento chegar

1. Promover `WhatsApp - Lead Qualificado` a **Primária**.
2. Manter `Contato - WhatsApp` **também primária** por 2 semanas (as duas juntas).
3. Só então rebaixar `Contato - WhatsApp` para **Secundária**.
4. Não mexer em orçamento nem em geografia na mesma semana — senão fica
   impossível saber o que causou a variação.
5. Reavaliar CPA, CPQL e CAC 30 dias depois.

> Trocar antes de haver volume zera o histórico de aprendizado da campanha e
> tende a derrubar entrega por várias semanas. O ganho de precisão não compensa
> a perda de aprendizado enquanto a nova ação estiver com pouco dado.

---

## 6. Rotina recomendada

| Frequência | O que fazer |
|---|---|
| Diária | Fila com `status = 'failed'`; leads sem telefone associado há mais de 24h |
| Semanal | CPQL e taxas do funil; leads `clicked_whatsapp` parados há mais de 7 dias |
| Mensal | CAC, ROAS, ticket médio; cobertura de click id; revisar critério de troca da primária |

---

## 7. Higiene de dados

- Leads de teste **sempre** com `is_test = true`. A fila os marca `ignored` e
  nunca envia conversão ao Google.
- `lead_ref` é imutável. Nunca reciclar.
- Atribuição de first touch nunca é sobrescrita — se um lead parece com origem
  errada, investigar antes de corrigir à mão.
- Nada de `gclid` em log, em UI ou em exportação de planilha.
