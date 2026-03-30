# 🔧 Configuração do Supabase Storage para Imagens

## Passo 1: Criar o Bucket de Imagens

### Opção A: Pelo Dashboard do Supabase (Recomendado)

1. Acesse https://supabase.com/dashboard
2. Entre no seu projeto
3. No menu lateral, clique em **Storage**
4. Clique em **"New bucket"**
5. Nome do bucket: `servicos-images`
6. Marque como **Public bucket**
7. Clique em **"Create"**

### Opção B: Via SQL

No **SQL Editor** do Supabase, execute:

```sql
-- Criar bucket para imagens
INSERT INTO storage.buckets (id, name, public) 
VALUES ('servicos-images', 'servicos-images', true)
ON CONFLICT (id) DO NOTHING;

-- Permitir upload público
CREATE POLICY "Allow public upload" ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'servicos-images');

-- Permitir leitura pública
CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT
USING (bucket_id = 'servicos-images');

-- Permitir delete para autenticados
CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE
USING (bucket_id = 'servicos-images' AND auth.role() = 'authenticated');
```

---

## Passo 2: Testar o Upload

1. Acesse `http://localhost:3000/admin`
2. Login: `teqprint2024`
3. Preencha um serviço:
   - Nome: "Teste Imagem"
   - Descrição: "Testando upload"
   - Preço: "R$ 100,00"
   - Categoria: Impressão
4. Clique no botão de **Upload** (ícone de upload ao lado do input de arquivo)
5. Selecione uma imagem
6. Aguarde o preview aparecer
7. Clique em **"Salvar"**

---

## Passo 3: Verificar no Catálogo

1. Acesse `http://localhost:3000/catalogo`
2. O serviço deve aparecer com a imagem

---

## 🐛 Problemas Comuns

### Erro: "Bucket not found"

**Solução:** Crie o bucket `servicos-images` no Storage do Supabase.

### Erro: "Erro ao enviar imagem"

**Solução:**
1. Verifique se o bucket existe
2. Verifique se o bucket é público
3. Veja o console (F12) para mais detalhes

### Imagem não aparece

**Solução:**
1. Acesse a URL da imagem diretamente no navegador
2. Verifique se o bucket é público
3. Tente fazer upload novamente

---

## ✅ Checklist

- [ ] Bucket `servicos-images` criado
- [ ] Bucket é público
- [ ] Políticas de acesso configuradas
- [ ] Upload de imagem funcionando
- [ ] Imagem aparece no admin
- [ ] Imagem aparece no catálogo
