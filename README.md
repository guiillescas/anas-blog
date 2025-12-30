# Blog da Ana - Missões e Fé

Blog pessoal de uma missionária, construído com Next.js e Sanity.io.

## Tecnologias

- **Next.js 16** - Framework React
- **Sanity.io** - CMS Headless para gerenciar conteúdo
- **Tailwind CSS v4** - Estilização
- **TypeScript** - Tipagem estática
- **Biome** - Linter e Formatter

## Estrutura do Projeto

```
anas-blog/
├── src/
│   ├── app/              # Rotas do Next.js
│   │   ├── blog/         # Página de listagem e posts individuais
│   │   └── studio/       # Interface admin do Sanity
│   ├── components/       # Componentes React reutilizáveis
│   ├── lib/              # Utilitários e cliente Sanity
│   └── types/            # Tipos TypeScript
├── sanity/
│   └── schemas/          # Schemas do Sanity (Post, Category, Author)
└── sanity.config.ts      # Configuração do Sanity Studio
```

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Sanity

1. Crie uma conta em [sanity.io](https://www.sanity.io/)
2. Crie um novo projeto
3. Copie o Project ID

### 3. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=seu-token-aqui
SANITY_REVALIDATE_SECRET=seu-secret-aleatorio-aqui
```

**Importante:** O `SANITY_REVALIDATE_SECRET` é usado para autenticar os webhooks do Sanity. Use uma string aleatória e segura (ex: gere com `openssl rand -base64 32`).

### 4. Rodar o Projeto

```bash
npm run dev
```

- **Site:** http://localhost:3000
- **Admin (Sanity Studio):** http://localhost:3000/studio

## Funcionalidades

### Para a Missionária (Admin)
- ✅ Interface visual para criar posts
- ✅ Upload de imagens
- ✅ Upload de PDFs
- ✅ Categorias e tags
- ✅ Preview em tempo real
- ✅ Agendamento de posts

### Para os Visitantes
- ✅ Listagem de posts
- ✅ Post individual com conteúdo rico
- ✅ Download de PDFs
- ✅ Design responsivo
- ✅ Performance otimizada
- ✅ Revalidação automática de cache quando novos posts são publicados

## Configuração de Webhook (Revalidação de Cache)

Para que novos posts apareçam automaticamente no site sem precisar fazer rebuild:

1. Acesse o [Sanity Manage](https://www.sanity.io/manage)
2. Selecione seu projeto
3. Vá em **API** → **Webhooks**
4. Clique em **Create webhook**
5. Configure:
   - **Name:** Revalidate Blog
   - **URL:** `https://seu-dominio.com/api/revalidate?secret=SEU_SANITY_REVALIDATE_SECRET`
   - **Dataset:** production (ou o dataset que você usa)
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type == "post"`
   - **HTTP method:** POST
   - **API version:** v2021-03-25 ou superior
6. Salve o webhook

Agora, sempre que um post for criado, atualizado ou deletado no Sanity, o cache do Next.js será automaticamente revalidado!

## Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente (incluindo `SANITY_REVALIDATE_SECRET`)
4. Configure o webhook no Sanity apontando para sua URL de produção
5. Deploy automático!

### Sanity Deploy

Para fazer deploy do Sanity Studio em produção:

```bash
npx sanity deploy
```

Isso criará uma URL tipo: `https://seu-projeto.sanity.studio`

## Schemas do Sanity

### Post
- Título, slug, conteúdo
- Imagem principal
- Data de publicação
- Autor
- Categorias
- Anexos PDF

### Category
- Título, slug, descrição

### Author
- Nome, foto, bio

## Comandos Úteis

```bash
npm run dev      # Rodar em desenvolvimento
npm run build    # Build para produção
npm run start    # Rodar em produção
npm run lint     # Rodar linter (Biome)
npm run format   # Formatar código (Biome)
```
