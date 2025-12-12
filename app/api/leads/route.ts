import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables. Make sure SUPABASE_SERVICE_ROLE_KEY is set.')
}

// Use service role key for server-side operations to bypass RLS
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized. Check SUPABASE_SERVICE_ROLE_KEY env variable.')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, contactNumber, bio } = body

    if (!name || !email || !contactNumber) {
      return NextResponse.json(
        { error: 'Name, email, and contact number are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          contact_number: contactNumber,
          bio: bio || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
