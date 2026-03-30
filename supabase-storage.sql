-- Configuração do Supabase Storage para imagens dos serviços
-- Execute este script no SQL Editor do Supabase

-- Criar bucket para imagens dos serviços
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

-- Permitir delete para usuários autenticados
CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE
USING (bucket_id = 'servicos-images' AND auth.role() = 'authenticated');
