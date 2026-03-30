-- Schema do banco de dados para o catálogo de serviços da Teq Print
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de serviços
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('impressao', 'informatica', 'personalizados')),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Criar índice para busca por categoria
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- Criar índice para serviços em destaque
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);

-- Criar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso
-- Permitir leitura pública
CREATE POLICY "Allow public read access" ON services
  FOR SELECT
  USING (true);

-- Permitir inserção apenas para usuários autenticados
CREATE POLICY "Allow authenticated insert" ON services
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Permitir atualização apenas para usuários autenticados
CREATE POLICY "Allow authenticated update" ON services
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Permitir exclusão apenas para usuários autenticados
CREATE POLICY "Allow authenticated delete" ON services
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Inserir dados iniciais de exemplo
INSERT INTO services (name, description, price, category, image_url, is_featured) VALUES
-- Impressão
('Cartão de Visita', 'Cartões de visita profissionais em diversos acabamentos (fosco, brilhante, verniz localizado).', 'A partir de R$ 50,00 (100 un.)', 'impressao', NULL, true),
('Panfletos', 'Panfletos e flyers para divulgação do seu negócio. Diversos tamanhos e papel.', 'A partir de R$ 80,00 (500 un.)', 'impressao', NULL, false),
('Impressões em Geral', 'Impressões coloridas e P&B em diversos formatos (A4, A3, ofício, etc.).', 'A partir de R$ 0,50', 'impressao', NULL, false),
('Adesivos', 'Adesivos em rolo ou folha, diversos tamanhos e formatos. Ideal para produtos e embalagens.', 'A partir de R$ 30,00 (50 un.)', 'impressao', NULL, false),
('Encadernação', 'Encadernação de trabalhos, documentos e apostilas. Acabamento profissional.', 'A partir de R$ 15,00', 'impressao', NULL, false),
('Plastificação', 'Plastificação de documentos, cardápios, crachás e muito mais.', 'A partir de R$ 5,00', 'impressao', NULL, false),

-- Informática
('Formatação de PC', 'Formatação completa com backup de arquivos, instalação de Windows e programas essenciais.', 'R$ 150,00', 'informatica', NULL, true),
('Limpeza de Computador', 'Limpeza interna completa, troca de pasta térmica e organização de cabos.', 'A partir de R$ 80,00', 'informatica', NULL, false),
('Manutenção Preventiva', 'Check-up completo, limpeza, atualização de drivers e otimização do sistema.', 'R$ 120,00', 'informatica', NULL, false),
('Troca de Peças', 'Substituição de HD, SSD, memória RAM, fonte e outros componentes.', 'Orçamento gratuito', 'informatica', NULL, false),
('Conserto de Impressoras', 'Reparo em impressoras jato de tinta, laser e multifuncionais de todas as marcas.', 'A partir de R$ 100,00', 'informatica', NULL, false),
('Manutenção de Videogames', 'Limpeza, reparo e manutenção de PlayStation, Xbox e Nintendo.', 'A partir de R$ 120,00', 'informatica', NULL, false),

-- Personalizados
('Canecas Personalizadas', 'Canecas de cerâmica com fotos, logotipos, frases e arte personalizada.', 'R$ 49,90', 'personalizados', NULL, true),
('Brindes Personalizados', 'Brindes corporativos: canetas, chaveiros, imãs de geladeira e muito mais.', 'Sob consulta', 'personalizados', NULL, false),
('Produtos Sob Encomenda', 'Desenvolvemos produtos personalizados conforme sua necessidade.', 'Orçamento personalizado', 'personalizados', NULL, false),
('Convites Personalizados', 'Convites para festas, casamentos, aniversários e eventos corporativos.', 'A partir de R$ 3,00 (un.)', 'personalizados', NULL, false);
