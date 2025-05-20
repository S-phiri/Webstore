import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ygjrdfoxcrpwflgkepkh.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnanJkZm94Y3Jwd2ZsZ2tlcGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDQ2NjgsImV4cCI6MjA2MTAyMDY2OH0.3v4OYG9yX6HBy-ceiE4qYdldWXc70AlTUOoE8oSjS10'; // ⬅️ paste yours
export const supabase = createClient(supabaseUrl, supabaseKey);
