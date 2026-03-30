import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validation - throw clear error if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars: string[] = [];
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  const errorMessage = `[Supabase] Variáveis de ambiente ausentes: ${missingVars.join(', ')}\n\n` +
    `Para corrigir:\n` +
    `1. Abra o arquivo .env.local\n` +
    `2. Adicione suas credenciais do Supabase\n` +
    `3. Reinicie o servidor de desenvolvimento (npm run dev)\n\n` +
    `Obtenha as credenciais em: https://app.supabase.com/project/_/settings/api\n\n` +
    `Variáveis encontradas:\n` +
    `  NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✓ configurada' : '✗ AUSENTE'}\n` +
    `  NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ configurada' : '✗ AUSENTE'}`;
  
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Additional validation for URL format
if (!supabaseUrl.startsWith('https://')) {
  console.warn(
    `[Supabase] Aviso: SUPABASE_URL deve começar com 'https://'. Valor atual: ${supabaseUrl}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types - matching the actual database schema (table: services)
export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'impressao' | 'informatica' | 'personalizados';
  image_url?: string;
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ServiceFormData {
  nome: string;
  descricao: string;
  preco: string;
  categoria: 'impressao' | 'informatica' | 'personalizados';
  imagem_url?: string;
  destaque: boolean;
}

// Category labels and icons mapping
export const CATEGORY_CONFIG = {
  impressao: { label: 'Impressão', icon: 'Printer' as const },
  informatica: { label: 'Informática', icon: 'Monitor' as const },
  personalizados: { label: 'Personalizados', icon: 'Palette' as const },
};
