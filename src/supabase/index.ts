import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_ANON_PUBLIC = process.env.SUPABASE_ANON_PUBLIC || ''
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_PUBLIC)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)