import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.schema('maps').from('checkpoints').select('ride_id').limit(5);
  console.log('Error:', error);
  console.log('Count:', data?.length);
}
check();
