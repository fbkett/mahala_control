const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.storagge_POSTGRES_DATABASE;
const supabaseKey = process.env.storagge_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase; 
// 
// 
