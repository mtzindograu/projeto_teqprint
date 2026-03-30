# 🖨️ Teq Print Informática - Site Oficial

Site institucional da Teq Print Informática, desenvolvido com Next.js 16, Tailwind CSS e Supabase.

**Status:** ✅ Pronto para Produção

---

## 🚀 Deploy Rápido

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd projeto-teqprint
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite .env.local com suas chaves do Supabase
```

### 4. Rode em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 📁 Estrutura do Projeto

```
projeto-teqprint/
├── src/
│   ├── app/              # Rotas e páginas (App Router)
│   │   ├── admin/        # Painel administrativo
│   │   ├── catalogo/     # Catálogo de serviços
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Página inicial
│   ├── components/       # Componentes React
│   ├── lib/              # Utilitários e configurações
│   │   └── supabase.ts   # Cliente Supabase
│   └── hooks/            # Hooks personalizados
├── public/               # Arquivos estáticos
├── .env.example          # Modelo de variáveis de ambiente
├── next.config.ts        # Configuração Next.js
├── vercel.json           # Configuração Vercel
└── tailwind.config.ts    # Configuração Tailwind
```

---

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI
- **Supabase** - Backend e Storage
- **Lucide Icons** - Ícones

---

## 🔧 Configuração do Supabase

### 1. Criar Projeto

Acesse https://supabase.com e crie um novo projeto.

### 2. Executar SQL

No SQL Editor do Supabase, execute:

```bash
# Copie o conteúdo de supabase-schema.sql
```

### 3. Criar Bucket de Imagens

No Storage do Supabase, crie um bucket chamado `servicos-images`.

### 4. Obter Chaves

Em Settings → API, copie:
- Project URL
- anon/public key

### 5. Configurar .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
ADMIN_PASSWORD=sua-senha-segura
```

---

## 📱 Páginas

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Página principal |
| Catálogo | `/catalogo` | Serviços com filtros |
| Admin | `/admin` | Painel de gerenciamento |

---

## 🎨 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm start        # Servidor de produção
npm run lint     # Linting
npm run preview  # Build + start local
```

---

## 🚀 Deploy na Vercel

Siga o guia completo em `DEPLOY-VERCEL.md`.

### Resumo:

1. Push para GitHub
2. Conecte na Vercel
3. Adicione variáveis de ambiente
4. Deploy automático!

---

## 🔒 Segurança

- ✅ Apenas chaves públicas (`NEXT_PUBLIC_`) expostas
- ✅ Row Level Security (RLS) no Supabase
- ✅ Senha do admin em variável de ambiente
- ✅ `.env.local` no `.gitignore`

---

## 📊 Funcionalidades

### Catálogo
- Visualização de todos os serviços
- Filtro por categoria
- Contagem em tempo real
- Links diretos para WhatsApp

### Admin
- Login seguro
- CRUD completo de serviços
- Upload de imagens
- Marcar serviços como "Mais Pedido"

---

## 🐛 Troubleshooting

### Erro: "supabaseUrl is required"

Adicione as variáveis de ambiente no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Imagens não carregam

Verifique se o bucket `servicos-images` está com policy pública.

### Build falha

Rode `npm run build` localmente para ver os erros.

---

## 📞 Contato

- **Site:** https://teqprint.com.br
- **Email:** teqprintinfo@hotmail.com
- **WhatsApp:** (44) 3528-3046

---

## 📄 Documentação Adicional

- `DEPLOY-VERCEL.md` - Guia completo de deploy
- `CHECKLIST-PRODUCAO.md` - Checklist pré-deploy
- `CONFIGURAR-SUPABASE.md` - Configuração do Supabase
- `CORRECOES_SEGURANCA.md` - Correções implementadas

---

## 📝 Licença

Propriedade exclusiva da Teq Print Informática.

---

*Desenvolvido com ❤️ para Teq Print Informática*

*Última atualização: 2026-03-30*
