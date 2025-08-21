#!/usr/bin/env node

// Simple script to check environment variables
console.log('🔍 Checking environment variables...\n')

// Check if .env files exist
const fs = require('fs')
const path = require('path')

const envFiles = ['.env', '.env.local', '.env.development', '.env.production']

console.log('📁 Environment files found:')
envFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - EXISTS`)
    
    // Read and parse the file
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'))
      
      console.log(`   Contains ${lines.length} environment variables:`)
      lines.forEach(line => {
        const [key] = line.split('=')
        if (key) {
          console.log(`   - ${key.trim()}`)
        }
      })
    } catch (error) {
      console.log(`   ❌ Error reading file: ${error.message}`)
    }
  } else {
    console.log(`❌ ${file} - NOT FOUND`)
  }
})

console.log('\n🔧 Current environment variables:')
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`)
console.log(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET'}`)
console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'}`)

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.log(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
}
if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log(`   Key: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`)
}

console.log('\n💡 Tips:')
console.log('1. Make sure your .env.local file is in the project root directory')
console.log('2. Restart your development server after creating/modifying .env files')
console.log('3. Check that there are no spaces around the = sign in your .env file')
console.log('4. Verify your Supabase credentials are correct')
console.log('5. Make sure you\'re using the correct environment (development vs production)')
