import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/src/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body; return 400 if shape is wrong
    const body = await req.json();
    const { quiz_id, session_id, answers, scores, result_key, user_agent } = body || {};

    if (!quiz_id || !Array.isArray(answers) || !scores || !result_key) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Create server-side Supabase client (uses service key if provided)
    const supabase = getSupabaseAdmin();

    // Attempt insert; capture Supabase’s error to surface it
    const { error } = await supabase.from('quiz_responses').insert({
      quiz_id,
      session_id,
      answers,      // jsonb
      scores,       // jsonb
      result_key,   // text
      user_agent,   // text
    });

    if (error) {
      // Log for server console; return a readable message to the client
      console.error('[submit] Supabase insert error:', error);
      // RLS violations usually show here; 403 is a sensible code for policy blocks
      const status = /row level security/i.test(error.message) ? 403 : 500;
      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[submit] Unexpected error:', e);
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
