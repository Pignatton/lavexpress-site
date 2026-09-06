# Atribuição de Marketing — Google Ads → Site → WhatsApp

**Site:** lavexpresslavanderia.com · **Data:** 06/09/2026
**Conta Google Ads:** 253-893-7535 · **Campanha:** `Lavexpress 2026` (`23429059645`)

---

## 1. Objetivo

Gerar o maior volume possível de **leads bons direto no WhatsApp da Lavexpress**.

O WhatsApp é o destino. O site é a landing page de conversão. Nada aqui tenta
transformar o site em checkout nem mover o funil para outro lugar.

O que esta camada acrescenta é rastreabilidade: saber de qual anúncio veio cada
conversa, sem colocar um único passo a mais entre a pessoa e o WhatsApp.

---

## 2. Regra de ouro

> **O WhatsApp abre sempre.**

A atribuição é local e síncrona: cookie first-party e nada mais. **Não existe
chamada de rede no caminho do clique** — nem `fetch`, nem `sendBeacon`. Não há
backend para falhar, não há timeout para estourar, não há endpoint para cair.

Se o cookie estiver desabilitado, se `crypto` não existir, se qualquer coisa
lançar: o `href` original continua lá e o WhatsApp abre com a copy de sempre.
Perde-se o `Ref:`. Nunca o lead.

---

## 3. Fluxo

```
┌──────────────┐  ?gclid= / ?gbraid= / ?wbraid= / ?utm_*
│  Google Ads  │──────────────┐
└──────────────┘              ▼
                   ┌─────────────────────────────────┐
                   │  lavexpresslavanderia.com       │
                   │  Next.js 16 · App Router        │
                   │                                 │
                   │  <AttributionBoot/>  ← na chegada
                   │  lib/attribution.ts       PURO  │
                   │  lib/attribution-client.ts      │
                   │  components/whatsapp-link.tsx   │
                   │                                 │
                   │  cookie lx_attr · 90 dias       │
                   │  SameSite=Lax · first-party     │
                   └───────────────┬─────────────────┘
                                   │ wa.me?text=…\n\nRef: LX-A7K3Q9
                                   ▼
                            ┌──────────────┐
                            │   WhatsApp   │
                            └──────────────┘
```

O atendente lê o `Ref:` na mensagem. É o elo entre a conversa e a campanha.

---

## 4. Arquivos

| Arquivo | Papel |
|---|---|
| `lib/attribution.ts` | Módulo puro: alfabeto, `REF_REGEX`, `gerarLeadRef`, `limparTexto`, `limparUrl`, `lerParametrosDaUrl`, `mesclarAtribuicao`, serialização do cookie. Sem I/O, sem React, sem relógio |
| `lib/attribution-client.ts` | `capturarAtribuicao` (cookie) e `linkWhatsAppComAtribuicao` (monta o wa.me). Síncrono, sem rede |
| `components/attribution-boot.tsx` | Captura **na chegada**, montado no layout raiz |
| `components/whatsapp-link.tsx` | `<WhatsAppLink>` e `criarHandlerWhatsApp` |
| `lib/whatsapp.ts` | `appendLeadRef` |
| `tests/attribution*.test.ts` | 61 casos |

34 âncoras de WhatsApp em 12 arquivos passam pelo caminho central. Os dois
`wa.me` escritos à mão no header e a duplicata de `buildWhatsAppLink` no hero
foram removidos.

---

## 5. `lead_ref`

```
LX-A7K3Q9
```

Alfabeto Crockford Base32 **sem I, L, O e U** — `0123456789ABCDEFGHJKMNPQRSTVWXYZ`.
Sem esses quatro, ninguém transcreve errado ao ditar o código no atendimento.

6 símbolos → 1.073.741.824 combinações. `crypto.getRandomValues` com rejeição
uniforme; `Math.random` é proibido. Sem PII, não sequencial.

Regex canônica: `/^LX-[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{6}$/`

É o **único** identificador que trafega em canal público. `gclid`, `gbraid` e
`wbraid` ficam no cookie e **nunca** entram na URL do wa.me nem na mensagem.

---

## 6. Captura de origem

Lida da URL por **allowlist**: `gclid`, `gbraid`, `wbraid` e as cinco UTM.
Qualquer outra chave é ignorada por não existir caminho de leitura para ela.

Sanitização: `NFKC` → remove tudo fora de `[\p{L}\p{N}._\-/= ]` → `trim` → corte
no limite. `landing_url` e `referrer` são validadas por estrutura (`new URL`,
só http/https), o que também barra `javascript:` e `data:`.

### Por que capturar na chegada, e não no clique

O `gclid` chega uma vez só, na URL de entrada. Capturando apenas no clique,
quem chegasse em `/?gclid=X` e navegasse para `/pacotes` antes de falar perderia
a atribuição — a query já teria sumido e o cookie ainda não existiria.
Verificado no site compilado antes da correção: o cookie nascia com `gclid: null`.

`<AttributionBoot />` roda no primeiro render de cada rota. A partir daí o
first touch está protegido.

### First touch × last touch

| Campo | Regra |
|---|---|
| `ref`, click id, UTM, `landing_url`, `referrer`, `first_seen_at` | **First touch.** Nunca sobrescritos |
| `last_seen_at` | Sempre atualizado |

**Exceção única:** cookie sem nenhum click id + visita com click id → o click id
e as UTM daquela visita são promovidos. Um identificador Google válido nunca é
trocado por outro: trocar o primeiro clique pelo último faria a campanha de
descoberta perder o crédito para a de marca.

Cookie `lx_attr`, 90 dias (janela de clique do `gclid`), `SameSite=Lax`,
`Secure` em https.

---

## 7. Mensagem do WhatsApp

A copy comercial é preservada. Acrescenta-se apenas, ao final:

```
Ref: LX-A7K3Q9
```

Não vira formulário técnico, não leva `gclid`, não leva telefone.

---

## 8. Escopo comercial — terno, couro e lavagem a seco

| Serviço | Situação |
|---|---|
| Terno | **oferecido** — Terno Completo R$ 45,00 |
| Blazer | **oferecido** — R$ 35,00 (R$ 20,00 só passar) |
| Couro | **oferecido** — Jaqueta de Couro R$ 75,00 |
| **Lavagem a seco / dry cleaning** | **NÃO oferecida** |

Terno, blazer e couro **não entram nos pacotes mensais** e são cobrados à parte,
pela tabela de peças avulsas. Isso não é o mesmo que "não atendemos".

O campo que listava isso chamava-se `exclusions` e era lido como recusa de
serviço; virou `foraDosPacotes`, e a copy passou a dizer que as peças são
atendidas normalmente.

A página de ternos vendia *"nossa limpeza a seco (ou Wet Cleaning)"*. Wet
Cleaning é justamente o processo **aquoso** controlado que substitui o dry
cleaning — chamá-lo de limpeza a seco prometia serviço que a operação não faz.
Corrigido. `"lavagem a seco"` também saiu das keywords de SEO, e entraram
`lavanderia de ternos` e `lavagem de couro`.

As negativas de `lavagem a seco`, `lavar a seco`, `limpeza a seco`, `dry clean`
e `dry cleaning` **permanecem ativas** na campanha. Estão corretas.

---

## 9. Prazo

`lib/lavexpress.ts` é a fonte de verdade: **24–48h** para lavagem e **4–5 dias
úteis** para passadoria.

A home prometia "em até 24h", mais curto que o SLA real. A copy agora deriva de
`LAVEXPRESS.sla`, então não pode divergir de novo. Os termos de uso passaram de
"24h a 5 dias úteis" para "24–48h a 5 dias úteis".

---

## 10. Google Ads — o que esta camada muda

**Nada.** `Contato - WhatsApp` continua a única conversão primária, o orçamento
continua R$ 40,00/dia, a estratégia continua `Maximizar conversões`, geografia,
horários, keywords, negativas e anúncios continuam como estavam.

O objetivo declarado da campanha permanece: **mais cliques qualificados para o
WhatsApp**.

A correção de concorrentes já aplicada — 6 negativas de frase no `Principal` e 6
no `GRUPO 4` — permanece. O `GRUPO 6` continua sendo o grupo que captura marcas
de concorrentes, e converteu a CPA R$ 8,49.

---

## 11. Segurança

| Risco | Mitigação |
|---|---|
| Vazamento de click id | Nunca em URL, mensagem, UI ou log. Só no cookie |
| PII em canal público | Só `lead_ref` trafega. Telefone nunca vai para a URL |
| Injeção via URL | Allowlist + `NFKC` + remoção de tudo fora de `[\p{L}\p{N}._\-/= ]` |
| Identificador previsível | CSPRNG com rejeição uniforme; falha alta em vez de cair para `Math.random` |
| Dependência externa | **Nenhuma.** A camada não fala com nenhum backend |

---

## 12. Rollback

`git revert` da branch `feat/atribuicao-google-whatsapp`. Volta ao `wa.me`
anterior. O cookie expira sozinho em 90 dias e não guarda nada sensível.

Não há migration para reverter, não há serviço para desligar, não há env para
remover: a camada é inteiramente client-side e autocontida.

---

## 13. Fora de escopo

Medir **conversa → venda** exige um CRM e integração de conversão offline. Isso
foi retirado desta entrega e, se voltar, será projeto próprio com escopo próprio.

Enquanto isso, o `Ref:` na mensagem já permite ao atendimento amarrar
manualmente a conversa à campanha — que é o que a operação precisa hoje.
