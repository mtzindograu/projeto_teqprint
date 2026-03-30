# ⚠️ AÇÃO NECESSÁRIA: Configurar Supabase

## O Problema

O erro **"supabaseUrl is required"** ocorre porque as variáveis de ambiente do Supabase não estão configuradas no arquivo `.env.local`.

---

## ✅ Como Resolver (Passo a Passo)

### Passo 1: Obter Chaves do Supabase

1. Acesse **https://supabase.com/dashboard**
2. Faça login na sua conta
3. Selecione o projeto **Teq Print**
4. No menu lateral, clique em **Settings** (ícone de engrenagem ⚙️)
5. Clique em **API**
6. Copie duas informações:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (chave longa que começa com `eyJhbG...`)

---

### Passo 2: Configurar .env.local

1. Abra o arquivo **`.env.local`** na raiz do projeto
2. Substitua os valores:

```env
# Substitua pela URL do seu projeto
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co

# Substitua pela sua chave anon
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA-CHAVE-ANONIMA-AQUI
```

---

### Passo 3: Reiniciar o Servidor

**Importante:** As variáveis de ambiente só são carregadas ao iniciar o servidor.

1. Pare o servidor atual pressionando **Ctrl+C** no terminal
2. Inicie novamente:

```bash
npm run dev
```

---

## 🧪 Verificação

Após reiniciar, acesse:

- **Catálogo:** http://localhost:3000/catalogo
- **Admin:** http://localhost:3000/admin

Se o erro persistir, verifique:

1. ✅ As chaves foram copiadas corretamente (sem espaços extras)
2. ✅ O arquivo `.env.local` está na raiz do projeto
3. ✅ O servidor foi reiniciado após alterar o `.env.local`

---

## 📞 Suporte

Se ainda tiver problemas, consulte:

- `SETUP-ADMIN.md` - Guia completo de configuração
- `CORRECOES_SEGURANCA.md` - Detalhes das correções

---

*Documento criado em: 2026-03-30*
