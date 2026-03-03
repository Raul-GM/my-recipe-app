import { createClient } from '@supabase/supabase-js';

// Las variables de entorno deben estar definidas en el entorno de Angular
declare const process: { env: { [key: string]: string } };

const supabaseUrl = process.env['NG_APP_SUPABASE_URL']!;
const supabaseAnonKey = process.env['NG_APP_SUPABASE_ANON_KEY']!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
