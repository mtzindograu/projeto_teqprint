# 🚀 Guia de Deploy - Teq Print na Vercel

Este guia explica como fazer deploy do site da Teq Print na Vercel, com integração completa ao Supabase.

---

## 📋 Pré-requisitos

- [ ] Conta na [Vercel](https://vercel.com)
- [ ] Conta no [Supabase](https://supabase.com)
- [ ] Projeto configurado localmente
- [ ] Chaves do Supabase em mãos

---

## 🔧 Passo 1: Preparar o Projeto

### 1.1 Verifique os Arquivos

Certifique-se de que estes arquivos existem:

- ✅ `next.config.ts` - Configuração Next.js
- ✅ `vercel.json` - Configuração Vercel
- ✅ `.env.example` - Modelo de variáveis de ambiente
- ✅ `package.json` - Dependências do projeto

### 1.2 Teste Localmente

```bash
# Instale as dependências
npm install

# Rode o build de produção localmente
npm run build

# Se o build passar sem erros, prossiga
npm run dev
```

---

## 🌐 Passo 2: Deploy na Vercel

### Opção A: Via GitHub (Recomendado)

1. **Push para o GitHub**
   ```bash
   git add .
   git commit -m "Preparando para produção"
   git push origin main
   ```

2. **Conecte na Vercel**
   - Acesse https://vercel.com/dashboard
   - Clique em **"Add New Project"**
   - Selecione **"Import Git Repository"**
   - Escolha o repositório `teqprint`

3. **Configure o Projeto**
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (padrão)

4. **Adicione as Variáveis de Ambiente**

   Clique em **"Environment Variables"** e adicione:

   | Nome | Valor | Ambiente |
   |------|-------|----------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` (chave longa) | Production, Preview, Development |
   | `ADMIN_PASSWORD` | `teqprint2024` (ou outra senha) | Production, Preview |

   > ⚠️ **Importante:** Use o prefixo `NEXT_PUBLIC_` para variáveis usadas no frontend.

5. **Deploy**
   - Clique em **"Deploy"**
   - Aguarde o build (2-5 minutos)
   - Pronto! Seu site está no ar 🎉

---

### Opção B: Via Vercel CLI

1. **Instale a CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login na Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure as Variáveis**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add ADMIN_PASSWORD
   ```

5. **Deploy para Produção**
   ```bash
   vercel --prod
   ```

---

## 🔐 Passo 3: Configurar Supabase para Produção

### 3.1 Verificar CORS

No dashboard do Supabase:

1. Vá para **Settings** → **API**
2. Em **CORS**, adicione a URL do seu site na Vercel:
   ```
   https://seu-site.vercel.app
   ```
3. Clique em **Save**

### 3.2 Verificar Storage

Para as imagens funcionarem:

1. Vá para **Storage** no Supabase
2. Clique no bucket `servicos-images`
3. Em **Policies**, certifique-se de que há uma policy pública:
   ```sql
   CREATE POLICY "Allow public access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'servicos-images');
   ```

### 3.3 Obter URL Pública das Imagens

As URLs das imagens devem ser públicas:

```
https://xxxxx.supabase.co/storage/v1/object/public/servicos-images/services/xxx.jpg
```

---

## ✅ Passo 4: Verificar o Deploy

### Checklist Pós-Deploy

- [ ] Site carrega corretamente
- [ ] Logo e imagens aparecem
- [ ] Catálogo mostra os serviços
- [ ] Filtro de categorias funciona
- [ ] Links do WhatsApp funcionam
- [ ] Admin está acessível (`/admin`)
- [ ] Login no admin funciona
- [ ] Imagens dos serviços carregam

### Testar URLs

| Página | URL |
|--------|-----|
| Home | `https://seu-site.vercel.app/` |
| Catálogo | `https://seu-site.vercel.app/catalogo` |
| Admin | `https://seu-site.vercel.app/admin` |

---

## 🎯 Passo 5: Domínio Personalizado (Opcional)

1. **Na Vercel**
   - Vá para **Project Settings** → **Domains**
   - Adicione seu domínio: `teqprint.com.br`

2. **Configurar DNS**
   - No seu registrador de domínio, adicione:
     ```
     Tipo: CNAME
     Nome: www
     Valor: cname.vercel-dns.com
     ```

3. **HTTPS Automático**
   - A Vercel configura SSL automaticamente
   - Aguarde 5-10 minutos para propagação

---

## 🔄 Atualizar o Site

### Para fazer atualizações:

```bash
# Faça as alterações no código
git add .
git commit -m "Descrição das mudanças"
git push origin main

# A Vercel faz deploy automaticamente!
```

---

## 🐛 Troubleshooting

### Erro: "supabaseUrl is required"

**Causa:** Variáveis de ambiente não configuradas.

**Solução:**
1. Vá em **Project Settings** → **Environment Variables** na Vercel
2. Adicione `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy: `vercel --prod`

### Imagens não carregam

**Causa:** Bucket do Storage não está público.

**Solução:**
1. No Supabase, vá para **Storage** → `servicos-images`
2. Em **Policies**, adicione policy pública para SELECT

### Build falha

**Causa:** Erros de TypeScript.

**Solução:**
```bash
# Rode localmente para ver os erros
npm run build

# Corrija os erros reportados
```

---

## 📊 Monitoramento

### Vercel Analytics

1. Vá para **Analytics** no dashboard da Vercel
2. Ative para seu projeto
3. Veja métricas de performance e visitantes

### Vercel Speed Insights

1. Vá para **Speed Insights**
2. Ative para monitorar Core Web Vitals

---

## 🔒 Segurança

### O que está seguro:

- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave pública, segura para frontend
- ✅ `ADMIN_PASSWORD` - Usada apenas no client-side (localStorage)
- ✅ Políticas RLS do Supabase - Protegem os dados

### O que NÃO fazer:

- ❌ Não exponha `service_role key` do Supabase
- ❌ Não commitar `.env.local` no GitHub
- ❌ Não usar senhas fracas no admin

---

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

*Última atualização: 2026-03-30*
