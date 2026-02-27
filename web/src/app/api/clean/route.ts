import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = (supabaseUrl && supabaseServiceKey) ? createClient(supabaseUrl, supabaseServiceKey) : null;

export async function GET(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: 'Database client not available' }, { status: 500 });
        }

        const { data, error } = await supabase.schema('maps').from('community_notes').select('id');

        if (error) throw error;

        if (data && data.length > 0) {
            const ids = data.map(n => n.id);
            const { error: delError } = await supabase.schema('maps').from('community_notes').delete().in('id', ids);
            if (delError) throw delError;
            return NextResponse.json({ status: 'success', message: `Deleted ${ids.length} test notes.` });
        } else {
            return NextResponse.json({ status: 'success', message: 'No notes found to delete.' });
        }
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
