import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function clean() {
    const { data, error } = await supabase.schema('maps').from('community_notes').select('*');
    console.log('Current Data count:', data?.length);
    if (data && data.length > 0) {
        const ids = data.map(d => d.id);
        const { error: delError } = await supabase.schema('maps').from('community_notes').delete().in('id', ids);
        console.log('Deleted Notes. Error:', delError);
    } else {
        console.log('No notes found to delete.');
    }
}
clean();
