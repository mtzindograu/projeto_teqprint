# 🛠️ Configuração do Sistema Administrativo - Teq Print

Este documento explica como configurar o banco de dados Supabase e o painel administrativo para gerenciamento do catálogo de serviços.

---

## 📋 Índice

1. [Configurar Supabase](#1-configurar-supabase)
2. [Configurar Variáveis de Ambiente](#2-configurar-variáveis-de-ambiente)
3. [Acessar Painel Administrativo](#3-acessar-painel-administrativo)
4. [Gerenciar Serviços](#4-gerenciar-serviços)

---

## 1. Configurar Supabase

### Passo 1: Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em **"Start your project"** ou **"New Project"**
3. Preencha as informações:
   - **Name**: `teq-print`
   - **Database Password**: Escolha uma senha forte (guarde em local seguro!)
   - **Region**: Escolha a região mais próxima (Brasil ou EUA)
4. Clique em **"Create new project"**

### Passo 2: Criar Tabela de Serviços

1. No painel do Supabase, vá para **SQL Editor** (menu lateral)
2. Clique em **"New query"**
3. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **"Run"** para executar o script

Isso criará:
- ✅ Tabela `services` com todos os campos necessários
- ✅ Índices para melhor performance
- ✅ Políticas de segurança (RLS)
- ✅ Dados iniciais de exemplo

### Passo 3: Obter Chaves de API

1. No painel do Supabase, vá para **Settings** (ícone de engrenagem)
2. Clique em **API**
3. Copie as seguintes informações:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbG...` (chave longa)

---

## 2. Configurar Variáveis de Ambiente

### Passo 1: Criar Arquivo .env.local

Na raiz do projeto, crie um arquivo chamado `.env.local`:

```bash
# Copie este modelo e preencha com suas chaves do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY= SUA-CHAVE-ANONIMA-AQUI
```

### Passo 2: Substituir os Valores

- Substitua `https://SEU-PROJETO.supabase.co` pela URL do seu projeto
- Substitua `SUA-CHAVE-ANONIMA-AQUI` pela chave anon/public key

### Passo 3: Reiniciar o Servidor de Desenvolvimento

Se o servidor estiver rodando, pare-o (Ctrl+C) e inicie novamente:

```bash
npm run dev
```

---

## 3. Acessar Painel Administrativo

### URL de Acesso

O painel administrativo está disponível em:
```
http://localhost:3000/admin
```

### Senha Padrão

A senha padrão para acesso é:
```
teqprint2024
```

⚠️ **Importante**: Altere a senha no código para maior segurança!

### Como Alterar a Senha

1. Abra o arquivo `src/app/admin/page.tsx`
2. Localize a linha:
   ```typescript
   if (password === "teqprint2024") {
   ```
3. Substitua `"teqprint2024"` pela sua nova senha:
   ```typescript
   if (password === "SUA-NOVA-SENHA") {
   ```

---

## 4. Gerenciar Serviços

### Adicionar Novo Serviço

1. Faça login no painel administrativo
2. Preencha o formulário à esquerda:
   - **Nome**: Nome do serviço (ex: "Cartão de Visita")
   - **Descrição**: Descrição detalhada
   - **Preço**: Valor ou faixa de preço (ex: "R$ 50,00" ou "A partir de R$ 80,00")
   - **Categoria**: Selecione entre Impressão, Informática ou Personalizados
   - **URL da Imagem**: (Opcional) Link para imagem do serviço
   - **Mais Pedido**: Marque se quiser exibir o selo "Mais Pedido"
3. Clique em **"Salvar"**

### Editar Serviço

1. Na lista de serviços à direita, clique no botão de **Editar** (ícone de lápis)
2. Altere os dados desejados
3. Clique em **"Atualizar"**
4. Para cancelar, clique no **X**

### Excluir Serviço

1. Na lista de serviços, clique no botão de **Excluir** (ícone de lixeira)
2. Confirme a exclusão

### Visualizar Catálogo

- Clique em **"Ver Catálogo"** no header para ver como está ficando
- O catálogo público está em: `http://localhost:3000/catalogo`

---

## 🎨 Categorias Disponíveis

| Categoria | Ícone | Uso |
|-----------|-------|-----|
| **Impressão** | 🖨️ | Cartões, panfletos, impressões, adesivos |
| **Informática** | 💻 | Formatação, limpeza, manutenção, consertos |
| **Personalizados** | 🎨 | Canecas, brindes, convites, produtos sob encomenda |

---

## 🔒 Segurança

### Boas Práticas

1. **Altere a senha padrão** imediatamente após a primeira configuração
2. **Não compartilhe** as chaves do Supabase publicamente
3. **Mantenha o arquivo `.env.local`** em segredo (não commit no Git)
4. O arquivo `.env.example` já está incluído no `.gitignore`

### O que já está protegido

- ✅ Apenas usuários autenticados podem criar/editar/excluir serviços
- ✅ Qualquer pessoa pode visualizar o catálogo (leitura pública)
- ✅ As chaves do Supabase são apenas para leitura/escrita limitada

---

## 🐛 Solução de Problemas

### Erro: "Erro ao carregar serviços"

1. Verifique se o arquivo `.env.local` foi criado corretamente
2. Confirme se as chaves do Supabase estão corretas
3. Verifique se o script SQL foi executado no Supabase
4. Abra o console do navegador (F12) para ver erros detalhados

### Erro: "Senha incorreta"

- A senha padrão é `teqprint2024`
- Se alterou a senha, use a nova senha
- Verifique se não há espaços extras antes ou depois da senha

### Serviços não aparecem no catálogo

1. Verifique se os serviços foram salvos no Supabase (painel admin → Table Editor)
2. Aguarde alguns segundos e recarregue a página do catálogo
3. Verifique o console do navegador para erros de conexão

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verifique este README
2. Consulte a documentação do Supabase: [https://supabase.com/docs](https://supabase.com/docs)
3. Verifique os logs no console do navegador (F12)

---

## ✅ Checklist de Configuração

- [ ] Projeto criado no Supabase
- [ ] Script SQL executado com sucesso
- [ ] Chaves da API copiadas
- [ ] Arquivo `.env.local` criado com as chaves corretas
- [ ] Servidor reiniciado após configurar .env.local
- [ ] Login no painel administrativo funcionou
- [ ] Senha padrão alterada para uma senha segura
- [ ] Primeiro serviço de teste criado e visualizado no catálogo

---

**Configurado com sucesso! 🎉**

Agora você pode gerenciar todo o catálogo de serviços da Teq Print sem precisar mexer no código!
