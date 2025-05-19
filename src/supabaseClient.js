import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://elqkeulbkgbsacpjqufu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscWtldWxia2dic2FjcGpxdWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTExNDEsImV4cCI6MjA2MjY4NzE0MX0.LiXalOUte9lZLWkMBY5qGFdKSwKMqbcKVu-8nJw3O4U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
