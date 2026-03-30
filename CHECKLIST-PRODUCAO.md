# ✅ Checklist de Produção - Teq Print

Use este checklist antes e depois de cada deploy para produção.

---

## 📋 Antes do Deploy

### Código

- [ ] Todos os testes locais passaram
- [ ] Build funciona: `npm run build`
- [ ] Sem erros TypeScript
- [ ] `.env.local` NÃO está no Git

### Variáveis de Ambiente

- [ ] `.env.example` atualizado e commitado
- [ ] Chaves do Supabase configuradas na Vercel
- [ ] `ADMIN_PASSWORD` configurada na Vercel

### Supabase

- [ ] Tabela `services` existe no Supabase
- [ ] Bucket `servicos-images` criado
- [ ] Policies de segurança configuradas
- [ ] CORS configurado para o domínio de produção

---

## 🚀 Durante o Deploy

### Vercel

- [ ] Build completou sem erros
- [ ] Variáveis de ambiente detectadas
- [ ] Domínio configurado (se aplicável)

---

## ✅ Depois do Deploy

### Funcionalidades Principais

- [ ] **Home** carrega corretamente
- [ ] **Catálogo** (/catalogo) acessível
- [ ] **Admin** (/admin) acessível
- [ ] Logo e imagens aparecem
- [ ] Links do WhatsApp funcionam
- [ ] Formulário de login funciona
- [ ] Filtro de categorias funciona

### Catálogo

- [ ] Todos os serviços aparecem
- [ ] Contagem de categorias correta
- [ ] "Personalizados" mostra os itens
- [ ] Imagens dos serviços carregam
- [ ] Botões de WhatsApp direcionam corretamente

### Admin

- [ ] Login com senha funciona
- [ ] Listagem de serviços carrega
- [ ] Cadastro de novo serviço funciona
- [ ] Upload de imagem funciona
- [ ] Edição de serviço funciona
- [ ] Exclusão de serviço funciona
- [ ] Logout funciona

### Performance

- [ ] Site carrega em menos de 3 segundos
- [ ] Imagens otimizadas
- [ ] Sem erros no console do navegador

### Mobile

- [ ] Layout responsivo funciona
- [ ] Menu mobile funciona
- [ ] Botões clicáveis
- [ ] Textos legíveis

---

## 🔒 Segurança

- [ ] Apenas `NEXT_PUBLIC_` variáveis expostas
- [ ] `service_role key` NÃO exposta
- [ ] `.env.local` no `.gitignore`
- [ ] Senha do admin alterada em produção
- [ ] HTTPS ativo (Vercel faz automático)

---

## 📊 Monitoramento

### Vercel

- [ ] Analytics ativado (opcional)
- [ ] Speed Insights ativado (opcional)
- [ ] Deploy automático configurado

### Supabase

- [ ] Monitor de queries ativado
- [ ] Limits de uso verificados

---

## 🐛 Problemas Comuns

### Erro: "supabaseUrl is required"

**Solução:** Adicionar variáveis de ambiente na Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Imagens não carregam

**Solução:** Verificar se bucket `servicos-images` está público no Supabase.

### Build falha

**Solução:** Rodar `npm run build` localmente e corrigir erros TypeScript.

---

## 📝 URLs para Testar

| Página | URL |
|--------|-----|
| Home | `https://SEU-SITE.vercel.app/` |
| Catálogo | `https://SEU-SITE.vercel.app/catalogo` |
| Admin | `https://SEU-SITE.vercel.app/admin` |

---

## 🎯 Domínio Personalizado

Se usar domínio próprio:

- [ ] DNS configurado
- [ ] SSL/HTTPS ativo
- [ ] Redirecionamento www → apex (ou vice-versa)

---

*Use este checklist para cada deploy de produção*

*Última atualização: 2026-03-30*
