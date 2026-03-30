# 🖼️ Criar Bucket de Imagens no Supabase

## ⚠️ IMPORTANTE: A imagem não vai funcionar sem isso!

---

## Passo 1: Acesse o Supabase

1. Vá em https://supabase.com/dashboard
2. Clique no seu projeto

---

## Passo 2: Criar o Bucket

### Método 1: Pelo Dashboard (Mais Fácil)

1. No menu **à esquerda**, clique em **Storage**
2. Clique em **"New bucket"**
3. Preencha:
   - **Name**: `servicos-images`
   - **Public**: ✅ Marque esta opção
4. Clique em **"Create"**

### Método 2: Via SQL

1. No menu à esquerda, clique em **SQL Editor**
2. Clique em **"New query"**
3. Cole este código:

```sql
-- Criar bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('servicos-images', 'servicos-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso
CREATE POLICY "Allow public upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'servicos-images');

CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT USING (bucket_id = 'servicos-images');

CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE USING (bucket_id = 'servicos-images');
```

4. Clique em **"Run"**

---

## Passo 3: Verificar

1. Vá em **Storage** no menu
2. Você deve ver o bucket `servicos-images` na lista
3. O ícone deve mostrar que é **público** (cadeado aberto)

---

## Passo 4: Testar Upload

1. Acesse http://localhost:3000/admin
2. Login: `teqprint2024`
3. Preencha um serviço
4. Clique no botão de upload ou cole uma URL de imagem
5. Salve
6. Verifique se a imagem aparece

---

## 🐛 Problemas Comuns

### "Erro ao enviar imagem"

**Causa:** Bucket não existe ou não é público

**Solução:**
1. Verifique se o bucket `servicos-images` foi criado
2. Verifique se é público (ícone de cadeado aberto)

### Imagem não aparece no catálogo

**Causa:** URL inválida ou bucket não é público

**Solução:**
1. Acesse a URL da imagem diretamente no navegador
2. Se der erro 403, o bucket não é público
3. Se a imagem carregar, o problema está no frontend

---

## ✅ Checklist

- [ ] Bucket `servicos-images` criado
- [ ] Bucket é público (cadeado aberto)
- [ ] Políticas de acesso configuradas
- [ ] Upload funciona no admin
- [ ] Imagem aparece no catálogo

---

**Depois de criar o bucket, o upload de imagens vai funcionar!** 🎉
