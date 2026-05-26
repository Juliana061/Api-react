import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kyirfnvtizxcjtlaphql.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5aXJmbnZ0aXp4Y2p0bGFwaHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MzQ2MTMsImV4cCI6MjA5NTMxMDYxM30.4xXSh5Cswee8QqFJ4LaRZ-mgB100HYif81ZZwSwSM7c'

export const supabase = createClient(supabaseUrl, supabaseKey)