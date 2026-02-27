import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function list() {
  const { data, error } = await supabase.schema('maps').from('community_notes').select('*');
  console.log('Notes:', data);
}
list();
