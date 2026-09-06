# Atribuição de Marketing — Google Ads → Site → WhatsApp → LavCore

**Projeto:** Lavexpress / LavCore · **Data:** 06/09/2026
**Conta Google Ads:** 253-893-7535 · **Campanha:** `Lavexpress 2026` (`23429059645`)

---

## 1. Problema

O Google Ads otimiza para o que ele consegue medir. Hoje ele mede **clique no
botão do WhatsApp** — 96,9% das conversões da campanha no período 23/08–05/09.

Clique no WhatsApp não é cliente. Entre o clique e o dinheiro existem quatro
filtros invisíveis ao Google: a conversa começou, virou orçamento, virou coleta
paga, e tinha ticket X. Sem fechar essa ponte, `Maximizar conversões` treina
para gerar aberturas de conversa — não vendas — e nenhum CPA do relatório é CAC.

Este documento descreve a tubulação que fecha a ponte **sem tirar o WhatsApp do
caminho**.

---

## 2. Regra de ouro

> **O WhatsApp abre sempre.**

Nenhuma camada de tracking pode atrasar, bloquear ou condicionar o
`wa.me`. Timeout duro de 600 ms, envio *fire-and-forget*, `try/catch` em volta
de tudo. Se o cookie estiver desabilitado, se a rede cair, se o endpoint estiver
fora — o usuário vai para o WhatsApp com a mensagem correta do mesmo jeito.
A única coisa que se perde é o dado. Nunca a venda.

---

## 3. Arquitetura

```
┌──────────────┐   gclid/gbraid/wbraid + UTM
│  Google Ads  │──────────────┐
└──────────────┘              ▼
                   ┌─────────────────────────────┐
                   │  lavexpresslavanderia.com   │
                   │  (Next.js 16, App Router)   │
                   │                             │
                   │  lib/attribution.ts   PURO  │
                   │  lib/attribution-client.ts  │
                   │  components/whatsapp-link   │
                   │                             │
                   │  cookie first-party lx_attr │
                   │  90 dias · SameSite=Lax     │
                   └───────┬─────────────┬───────┘
                           │             │
          sendBeacon       │             │  wa.me?text=...\n\nRef: LX-A7K3Q9
          (não bloqueante) │             ▼
                           │      ┌──────────────┐
                           │      │   WhatsApp   │
                           │      └──────┬───────┘
                           ▼             │ atendente lê "Ref:"
        ┌──────────────────────────────┐ │
        │ LavCore                      │◄┘
        │ POST /api/marketing/leads/   │
        │      ingest                  │
        │                              │
        │ marketing_leads              │
        │ google_ads_conversion_queue  │
        │                              │
        │ /admin/marketing/leads       │
        └──────────────┬───────────────┘
                       │ qualificado / venda
                       ▼
        ┌──────────────────────────────┐
        │ worker de conversão offline  │  ← INATIVO
        │ (Google Ads API)             │     sem credencial
        └──────────────────────────────┘
```

### Por que o cookie e não só o servidor

O site é um Next.js de marketing sem banco. Adicionar um cliente de banco a ele
significaria distribuir credencial de escrita para a camada mais exposta do
sistema. O cookie first-party resolve a persistência entre páginas com custo
zero de latência, e o servidor (LavCore) recebe uma cópia assíncrona. Se o
LavCore estiver fora, o `lead_ref` ainda chega ao atendente pela mensagem — o
funil degrada para operação manual, não para perda total.

---

## 3.1 Inventário do que foi entregue

### Site — `E:\Projeto Lavexpress\lavexpress`, branch `feat/atribuicao-google-whatsapp`

| Arquivo | Papel |
|---|---|
| `lib/attribution.ts` | Módulo puro: alfabeto, regex, `gerarLeadRef`, `limparTexto`, `limparUrl`, `lerParametrosDaUrl`, `mesclarAtribuicao`, serialização do cookie |
| `lib/attribution-client.ts` | Browser: `capturarAtribuicao`, `enviarIngest`, `linkWhatsAppComAtribuicao` |
| `components/attribution-boot.tsx` | **Captura na chegada.** Montado no layout raiz |
| `components/whatsapp-link.tsx` | `<WhatsAppLink>` + `criarHandlerWhatsApp` |
| `lib/whatsapp.ts` | `appendLeadRef` (assinaturas antigas preservadas) |
| `tests/attribution.test.ts` · `attribution-client.test.ts` · `attribution-boot.test.ts` | 71 casos |

34 âncoras de WhatsApp em 12 arquivos passaram a usar o caminho central. Os dois
`wa.me` escritos à mão no `site-header.tsx` e a duplicata de `buildWhatsAppLink`
no `hero.tsx` foram removidos.

### LavCore — `E:\Projeto LavCore\lav-saasdmin` (arquivos novos, não commitados)

| Arquivo | Papel |
|---|---|
| `supabase/migrations/20260906120000_marketing_leads_atribuicao.sql` | `marketing_leads` + `google_ads_conversion_queue`, RLS `ENABLE` + `FORCE` |
| `supabase/rollbacks/20260906120000_..._rollback.sql` | Reversão |
| `src/lib/marketing/lead-attribution.ts` | Módulo puro, espelha `acquisition.ts` |
| `src/lib/marketing/lead-ingest-guard.ts` | CORS, allowlist de tenant, rate limit |
| `src/lib/marketing/lead-conversion-queue.ts` | Enfileiramento idempotente |
| `src/lib/marketing/google-ads-offline-worker.ts` | Worker **inativo** atrás de `UploadDeConversoes` |
| `src/app/api/marketing/leads/ingest/route.ts` | Ingestão anônima |
| `src/app/actions/marketing/leads.ts` | Transições do funil |
| `src/app/admin/marketing/leads/` | Tela de leads (acessível só por URL direta — o registro no menu ficou como pendência) |
| `src/__tests__/lead-*.test.ts` | 184 casos |

---

## 3.2 Defeito encontrado e corrigido durante a validação

A primeira versão capturava a origem **apenas no clique** do WhatsApp. Testado no
site compilado, o resultado foi:

```
chega em /?gclid=CENARIO_MULTIPAGINA_999  →  navega para /pacotes  →  clica
resultado: cookie gravado com gclid = null
```

O `gclid` chega uma única vez, na URL de entrada. No momento do clique a query
já estava limpa e o cookie ainda não existia para preservá-la — então toda
jornada com navegação antes do clique perdia a atribuição. Justamente a jornada
mais valiosa: quem pesquisa antes de falar.

`<AttributionBoot />` corrigiu isso capturando no primeiro render de cada rota.
Reteste no mesmo fluxo: `gclid`, `utm_source` e `utm_campaign` preservados.

---

## 4. `lead_ref`

```
LX-A7K3Q9
```

- Alfabeto Crockford Base32 **sem I, L, O, U** — `0123456789ABCDEFGHJKMNPQRSTVWXYZ`.
  Sem esses quatro, ninguém transcreve `LX-I0O1` errado no atendimento.
- 6 símbolos → 1.073.741.824 combinações. Não sequencial, não adivinhável por
  incremento, sem PII.
- Gerado com `crypto.getRandomValues` com rejeição uniforme (`Math.random` é
  proibido: previsível e enviesado).
- Regex canônica, idêntica no site e no LavCore:
  `/^LX-[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{6}$/`

É o **único** identificador que trafega em canal público. `gclid`, `gbraid`,
`wbraid` e telefone ficam server-side.

---

## 5. Captura de origem

Lida da URL apenas por **allowlist** — `gclid`, `gbraid`, `wbraid` e as cinco
UTM. Qualquer outra chave é ignorada por não existir caminho de leitura para
ela. Não é lista de bloqueio (que envelhece mal): é lista de permissão.

Sanitização: `NFKC` → remove tudo fora de `[\p{L}\p{N}._\-/= ]` → `trim` →
corte no limite (UTM 80, click id 120, URL 512). Isso derruba de uma vez HTML,
quebra de linha, caractere de controle e separador de JSON.

### First touch × last touch

| Campo | Regra |
|---|---|
| `ref`, click id, UTM, `landing_url`, `referrer`, `first_seen_at` | **First touch.** Gravados na primeira visita, nunca sobrescritos. |
| `last_seen_at` | Sempre atualizado. |

**Exceção única:** se o cookie não tem nenhum click id e chega uma visita com
click id, o click id e as UTM daquela visita são promovidos. Um identificador
Google válido **nunca** é substituído por outro — trocar o primeiro clique pelo
último faria a campanha de descoberta perder o crédito para a de marca.

Cookie: `lx_attr`, 90 dias (alinhado à janela de clique do `gclid`),
`SameSite=Lax`, `Path=/`, `Secure` em https.

---

## 6. Mensagem do WhatsApp

A copy comercial existente é preservada. Acrescenta-se apenas, ao final:

```
Ref: LX-A7K3Q9
```

Não vira formulário técnico. Não leva `gclid`. Não leva telefone.

---

## 7. Schema

### `marketing_leads`

Identidade e tenant: `id`, `tenant_id`, `lead_ref` (CHECK do regex),
`customer_id`, `phone`, `order_id`.
Origem: `source`, `medium`, `campaign`, `gclid`, `gbraid`, `wbraid`, `utm_*`,
`landing_url`, `referrer`.
Comercial: `bairro`, `cep`, `service_interest`.
Funil: `status`, `qualification_reason`, `disqualification_reason`,
`conversation_started_at`, `qualified_at`, `collection_scheduled_at`,
`converted_at`, `revenue_cents`.
Controle: `is_test`, `created_at`, `updated_at`.

- `UNIQUE (tenant_id, lead_ref)` — é a idempotência do ingest.
- Índices: `(tenant_id, status)`, `(tenant_id, created_at desc)`, parcial em
  `gclid where not null`.
- RLS por tenant, no mesmo padrão das migrations recentes do repositório.

### `google_ads_conversion_queue`

`id`, `tenant_id`, `lead_id`, `conversion_type`, `conversion_name`, click ids,
`conversion_time`, `value_cents`, `currency`, `status`, `attempts`,
`last_error`, `sent_at`, `created_at`.

- Estados: `pending` · `processing` · `sent` · `failed` · `ignored`.
- `UNIQUE (lead_id, conversion_type)` — impede contar a mesma conversão duas vezes.
- Resposta do Google é registrada **sem** gravar segredo.

---

## 8. Estados do lead

```
clicked_whatsapp → conversation_started → qualified ────► collection_scheduled → converted
                                       └→ disqualified                        └→ lost
```

**Qualificado:** dentro da área atendida, procura serviço prestado, intenção
comercial real, quer orçamento/coleta.
**Desqualificado** (motivo obrigatório): `fora_area`, `servico_nao_oferecido`,
`emprego`, `sem_intencao`, `spam`, `duplicado`, `outro`.

Marcar é ação de **1 clique** no atendimento. Burocracia mata adoção, e um
funil que ninguém preenche não mede nada.

---

## 9. Eventos

`whatsapp_click` · `conversation_started` · `qualified_lead` ·
`collection_scheduled` · `sale_completed`

Só dois viram conversão no Google, e ambos como **secundários**:

| Evento | Ação no Google Ads | Status |
|---|---|---|
| `qualified_lead` | `WhatsApp - Lead Qualificado` | Secundária |
| `sale_completed` | `Lavexpress - Venda Confirmada` | Secundária |

---

## 10. Google Ads — o que muda e o que não muda

**Não muda nada nesta fase.** `Contato - WhatsApp` continua primária, orçamento
continua R$ 40/dia, `Maximizar conversões` continua, geografia, keywords,
negativas e RSAs continuam.

As duas ações novas entram como **secundárias** — elas são observadas, não
otimizadas. A campanha não reaprende, porque uma ação zerada como alvo de
bidding derrubaria a entrega por semanas.

O critério para eventualmente promover uma delas a primária está em
`GOOGLE_ADS_QUALIFIED_LEAD_RUNBOOK.md`, seção 5. Resumo: só com volume medido,
cobertura de click id acima de 70% e taxa de qualificação estável.

---

## 11. Segurança e privacidade

| Risco | Mitigação |
|---|---|
| Vazamento de click id | Nunca em URL pública, mensagem, UI ou log. Só server-side. |
| PII em canal público | Só `lead_ref` trafega. Telefone nunca vai para a URL. |
| Injeção via URL | Allowlist + `NFKC` + remoção de tudo fora de `[\p{L}\p{N}._\-/= ]`. |
| Enumeração de leads | `lead_ref` aleatório em espaço de 10⁹; rate limit no ingest. |
| Cross-tenant | `tenant_id` resolvido no servidor a partir do slug; RLS; nunca aceito do cliente. |
| Conversão duplicada | `UNIQUE (lead_id, conversion_type)` + `UNIQUE (tenant_id, lead_ref)`. |
| Secret em log | Worker registra código e mensagem do Google, nunca o token. |

---

## 12. Rollback

| Camada | Como reverter |
|---|---|
| Site | `git revert` da branch `feat/atribuicao-google-whatsapp`. Volta ao `wa.me` anterior. Nenhum dado é perdido. |
| Cookie | Expira sozinho em 90 dias. Nenhuma ação necessária. |
| Migration | Script de rollback correspondente em `supabase/rollbacks/`. As tabelas são novas e isoladas — `drop` não afeta nada existente. |
| Endpoint | Remover `NEXT_PUBLIC_LEAD_INGEST_URL` do site desliga o envio sem deploy de código. |
| Google Ads | Ações secundárias podem ser pausadas a qualquer momento sem afetar bidding. |

O ponto de desligamento mais rápido é o env var: sem ela, o site volta a se
comportar exatamente como antes, mantendo apenas o `Ref:` na mensagem.

---

## 13. Monitoramento

| Sinal | Onde | Alerta |
|---|---|---|
| Fila com `failed` | `google_ads_conversion_queue` | qualquer linha com `attempts >= 5` |
| Leads sem telefone | `marketing_leads` | `clicked_whatsapp` há mais de 24h |
| Cobertura de click id | consulta da seção 1.3 do runbook | abaixo de 50% |
| Latência do CTA | monitor do site | qualquer regressão perceptível no clique |
| Ingest fora do ar | logs do LavCore | taxa de erro acima de 5% |

---

## 13.1 Variáveis de ambiente

**Site** — `NEXT_PUBLIC_LEAD_INGEST_URL`. Ausente ou vazia: nenhuma chamada de
rede é feita; cookie e `Ref:` seguem funcionando. É também o desligamento mais
rápido do envio, sem deploy de código.

**LavCore — ingestão:** `MARKETING_LEAD_INGEST_ALLOWED_ORIGINS` (obrigatória),
`MARKETING_LEAD_INGEST_TENANT_SLUGS` (obrigatória),
`MARKETING_LEAD_INGEST_RATE_LIMIT`, `MARKETING_LEAD_INGEST_RATE_WINDOW_SECONDS`.

**LavCore — worker (inativo):** `GOOGLE_ADS_DEVELOPER_TOKEN`,
`GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`,
`GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (opcional),
`GOOGLE_ADS_OFFLINE_DRY_RUN`.

Um portão `credenciaisPresentes()` impede o worker até de ler a fila enquanto as
cinco obrigatórias não existirem.

---

## 14. Bloqueios conhecidos

| # | Bloqueio | Impacto | O que destrava |
|---|---|---|---|
| 1 | Sem credenciais da Google Ads API | Worker de conversão offline não envia | `developer token`, `client_id`, `client_secret`, `refresh_token`, `customer_id` |
| 2 | Sem WhatsApp Business API | Associação conversa→lead é manual | Conta WhatsApp Business API + webhook |
| 3 | Sessão do Google Ads expirada | Ações de conversão não criadas | Login do proprietário na interface |
| 4 | Migration não aplicada | Tabelas não existem em banco | Rodar a migration no ambiente correto |
| 5 | Sem credencial de escrita no GitHub do site | `git push` recusado (403); sem push não há deploy | Credencial com acesso de escrita em `Pignatton/lavexpress-site` |

Nenhum deles impede o restante de funcionar. O site captura, gera `lead_ref` e
entrega no WhatsApp independentemente dos quatro.

---

## 15. Divergência de escopo comercial registrada

`lib/lavexpress.ts` do site declara, em `exclusions`:

```
"Ternos"
```

Isso contradiz a orientação dada na revisão de 14 dias, de que a Lavexpress
**oferece** lavagem de terno e couro — orientação que motivou reclassificar o
termo `lavanderia terno` (R$ 11,06 no período) de desperdício para intenção
comercial boa.

**Nada foi alterado.** Definir se terno é ou não serviço oferecido é decisão
comercial, não técnica. Mas as duas afirmações não podem ser verdadeiras ao
mesmo tempo, e enquanto o site disser que é exclusão, o clique pago por esse
termo tende a não converter.
