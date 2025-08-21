"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

export default function EnvVarChecker() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: string | undefined
    supabaseKey: string | undefined
    nodeEnv: string | undefined
    isConfigured: boolean
  }>({
    supabaseUrl: undefined,
    supabaseKey: undefined,
    nodeEnv: undefined,
    isConfigured: false
  })

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const nodeEnv = process.env.NODE_ENV
    
    const isConfigured = !!(supabaseUrl && 
                           supabaseKey && 
                           supabaseUrl !== "https://placeholder.supabase.co")

    setEnvStatus({
      supabaseUrl,
      supabaseKey,
      nodeEnv,
      isConfigured
    })
  }, [])

  return (
    <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Environment Variables Status
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-purple-800">NODE_ENV:</span>
            <Badge className={envStatus.nodeEnv === 'development' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
              {envStatus.nodeEnv || 'undefined'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-purple-800">Supabase URL:</span>
            <div className="flex items-center space-x-2">
              {envStatus.supabaseUrl ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 truncate max-w-32">
                    {envStatus.supabaseUrl.includes('placeholder') ? 'Placeholder' : 'Configured'}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">Missing</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-purple-800">Supabase Key:</span>
            <div className="flex items-center space-x-2">
              {envStatus.supabaseKey ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    {envStatus.supabaseKey.length > 10 ? 'Configured' : 'Invalid'}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">Missing</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-purple-200">
            <span className="text-purple-800 font-semibold">Overall Status:</span>
            <Badge className={envStatus.isConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
              {envStatus.isConfigured ? 'Ready' : 'Not Configured'}
            </Badge>
          </div>
        </div>
        
        {!envStatus.isConfigured && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Create a <code>.env.local</code> file in your project root with:
            </p>
            <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
