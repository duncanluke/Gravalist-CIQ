import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Return a dummy client or handle missing config gracefully during build
    if (!url || !key) {
        return createBrowserClient('https://placeholder.supabase.co', 'placeholder');
    }

    return createBrowserClient(url, key)
}
