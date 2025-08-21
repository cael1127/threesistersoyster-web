"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function TestEnvPage() {
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkEnvironment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-env')
      const data = await response.json()
      setEnvStatus(data)
    } catch (error) {
      console.error('Error checking environment:', error)
      setEnvStatus({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkEnvironment()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand p-8">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-purpleBrand/30 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-purple-900 mb-4">Environment Variables Test</h1>
              <p className="text-purple-800">Testing if your environment variables are properly configured</p>
            </div>

            <div className="flex justify-center mb-6">
              <Button 
                onClick={checkEnvironment} 
                disabled={loading}
                className="bg-purpleBrand hover:bg-lavenderBrand text-white"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check Environment
                  </>
                )}
              </Button>
            </div>

            {envStatus && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Supabase URL</h3>
                    <div className="flex items-center justify-center space-x-2">
                      {envStatus.environment?.hasSupabaseUrl ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-700">Configured</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-700">Missing</span>
                        </>
                      )}
                    </div>
                    {envStatus.environment?.NEXT_PUBLIC_SUPABASE_URL && (
                      <p className="text-xs text-gray-600 mt-2 truncate">
                        {envStatus.environment.NEXT_PUBLIC_SUPABASE_URL}
                      </p>
                    )}
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Supabase Key</h3>
                    <div className="flex items-center justify-center space-x-2">
                      {envStatus.environment?.hasSupabaseKey ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-700">Configured</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-700">Missing</span>
                        </>
                      )}
                    </div>
                    {envStatus.environment?.NEXT_PUBLIC_SUPABASE_ANON_KEY && (
                      <p className="text-xs text-gray-600 mt-2">
                        Length: {envStatus.environment.supabaseKeyLength} chars
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Overall Status</h3>
                  <div className="flex items-center justify-center space-x-2">
                    {envStatus.isConfigured ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-green-700 text-lg font-semibold">Ready to Use</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <span className="text-red-700 text-lg font-semibold">Not Configured</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-2">Troubleshooting Tips:</p>
                      <ul className="space-y-1 text-left">
                        <li>• Make sure your .env.local file is in the project root</li>
                        <li>• Restart your development server after creating .env files</li>
                        <li>• Check that there are no spaces around the = sign</li>
                        <li>• Verify your Supabase credentials are correct</li>
                        <li>• Ensure you're using the correct environment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Raw Environment Data:</h4>
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                    {JSON.stringify(envStatus, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
