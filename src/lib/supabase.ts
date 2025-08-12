import { createClient } from '@supabase/supabase-js';

export type QuizPayload = {
  quiz_id: string;
  session_id?: string;
  answers: Array<{ qid: string; oid: string }>;
  scores: Record<string, number>;
  result_key: string;
  user_agent?: string;
};

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase creds missing');
  return createClient(url, key);
}