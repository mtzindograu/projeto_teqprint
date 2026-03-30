# 📋 Configuração Final - Integração Supabase

## ✅ O que já foi feito:

1. ✅ Admin panel atualizado para salvar na tabela `servicos`
2. ✅ Catálogo atualizado para buscar dados do Supabase
3. ✅ Upload de imagens configurado com Supabase Storage
4. ✅ Serviços organizados por categoria no catálogo
5. ✅ Selo "Mais Pedido" funcionando

---

## 🔧 O que você precisa fazer AGORA:

### **PASSO 1: Executar o SQL do Storage**

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Entre no seu projeto
3. Vá para **SQL Editor**
4. Clique em **"New query"**
5. Copie e cole o conteúdo do arquivo `supabase-storage.sql`
6. Clique em **"Run"**

Isso vai criar o bucket `servicos-images` para armazenar as imagens.

---

### **PASSO 2: Criar o Bucket no Supabase (Alternativa Manual)**

Se o SQL não funcionar, faça manualmente:

1. No Supabase, vá para **Storage** (menu lateral)
2. Clique em **"Create bucket"**
3. Nome: `servicos-images`
4. Marque como **Public bucket**
5. Clique em **"Create"**

---

### **PASSO 3: Testar o Upload de Imagens**

1. Acesse `http://localhost:3000/admin`
2. Login: `teqprint2024`
3. Preencha um serviço:
   - Nome: "Teste Upload"
   - Descrição: "Testando upload de imagem"
   - Preço: "R$ 100,00"
   - Categoria: Impressão
4. Clique no botão de **Upload** (ícone de upload)
5. Selecione uma imagem do seu computador
6. Aguarde o upload (deve aparecer preview)
7. Clique em **"Salvar"**

---

### **PASSO 4: Verificar no Catálogo**

1. Acesse `http://localhost:3000/catalogo`
2. O serviço "Teste Upload" deve aparecer
3. A imagem deve estar visível
4. Se marcou como "Mais Pedido", o selo dourado deve aparecer

---

## 📊 Estrutura do Banco de Dados

### Tabela: `servicos`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | ID único do serviço |
| `nome` | TEXT | Nome do serviço |
| `descricao` | TEXT | Descrição detalhada |
| `preco` | TEXT | Preço (ex: "R$ 50,00") |
| `categoria` | TEXT | `impressao`, `informatica`, ou `personalizados` |
| `imagem_url` | TEXT | URL da imagem no Supabase Storage |
| `destaque` | BOOLEAN | Se aparece como "Mais Pedido" |
| `created_at` | TIMESTAMP | Data de criação |

### Storage: `servicos-images`

- Bucket público para imagens dos serviços
- Upload permitido para todos
- Delete apenas para autenticados

---

## 🎯 Fluxo Completo

```
1. Admin acessa /admin
2. Faz login (teqprint2024)
3. Preenche formulário
4. Faz upload da imagem
5. Salva no Supabase
6. Catálogo busca automaticamente
7. Cliente vê no /catalogo
```

---

## 🐛 Solução de Problemas

### Erro: "Bucket not found"

**Solução:** Execute o SQL do `supabase-storage.sql` ou crie o bucket manualmente.

### Erro: "Erro ao enviar imagem"

**Solução:**
1. Verifique se o bucket `servicos-images` existe
2. Verifique as políticas de acesso no Storage
3. Veja o console do navegador (F12) para mais detalhes

### Imagem não aparece no catálogo

**Solução:**
1. Verifique se a URL está salva no banco (admin → lista de serviços)
2. Acesse a URL da imagem diretamente no navegador
3. Verifique se o bucket é público

### Catálogo não mostra serviços

**Solução:**
1. Verifique se os serviços estão salvos no admin
2. Abra o console (F12) e veja se há erros
3. Verifique se a tabela `servicos` existe no Supabase

---

## 📱 URLs Importantes

| Página | URL |
|--------|-----|
| Home | http://localhost:3000 |
| Catálogo | http://localhost:3000/catalogo |
| Admin | http://localhost:3000/admin |
| Supabase Dashboard | https://supabase.com/dashboard |

---

## ✅ Checklist Final

- [ ] SQL do Storage executado
- [ ] Bucket `servicos-images` criado
- [ ] Upload de imagem funcionando no admin
- [ ] Serviços aparecendo no catálogo
- [ ] Imagens visíveis no catálogo
- [ ] Selo "Mais Pedido" funcionando
- [ ] Categorias organizadas corretamente

---

**Tudo configurado! O sistema está 100% integrado!** 🎉

Agora é só cadastrar os serviços reais da Teq Print através do painel administrativo!
