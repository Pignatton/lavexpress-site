# 🔧 Configuração Google Places API - Lavexpress

## Variáveis de Ambiente Necessárias

Crie o arquivo `.env.local` na raiz do projeto com:

```env
GOOGLE_MAPS_API_KEY=SUA_CHAVE_AQUI
LAVEXPRESS_GOOGLE_PLACE_ID=ChIJ_fmjZbIZuAARoxgnYCMnWrk
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Como Obter a Google Maps API Key

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "API Key"
5. **IMPORTANTE**: Restrinja a chave:
   - Clique em "Edit API key"
   - Em "API restrictions", selecione "Restrict key"
   - Marque apenas: **Places API**
   - Salve

6. Habilite a Places API:
   - Vá em "APIs & Services" > "Library"
   - Procure por "Places API"
   - Clique em "Enable"

## Para Produção (Vercel)

No painel da Vercel, adicione as variáveis de ambiente:

```
GOOGLE_MAPS_API_KEY=sua_chave_aqui
LAVEXPRESS_GOOGLE_PLACE_ID=ChIJ_fmjZbIZuAARoxgnYCMnWrk
NEXT_PUBLIC_BASE_URL=https://seu-dominio.com.br
```

## O que foi implementado

✅ **Route Handler** (`/api/google/rating`):
- Cache de 6 horas (reduz custo)
- Busca rating, count, e URLs do Google
- Fallback elegante em caso de erro

✅ **GoogleRatingBadge Component**:
- Mostra avaliação real do Google
- Link clicável para ver todas as avaliações
- Fallback para dados estáticos se API falhar

✅ **Hero Section**:
- Badge dinâmico substituindo dados estáticos
- Mantém design e UX iguais

## Benefícios

🎯 **Conversão**: Dados reais aumentam confiança
💰 **Custo**: Cache reduz chamadas à API
🔄 **Automático**: Atualiza a cada 6 horas
🛡️ **Seguro**: Fallback se API falhar
