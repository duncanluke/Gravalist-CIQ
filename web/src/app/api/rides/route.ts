import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = (supabaseUrl && supabaseServiceKey) ? createClient(supabaseUrl, supabaseServiceKey) : null;

export const revalidate = 0; // Disable caching

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json({ error: 'Database client not available' }, { status: 500 });
        }

        const { data, error } = await supabase
            .schema('maps')
            .from('checkpoints')
            .select('*')
            .limit(50000)
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Error fetching checkpoints via API:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('API Rides Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
