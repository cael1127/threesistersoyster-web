"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Track error in analytics if available
    try {
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('Error Boundary', {
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack
        })
      }
    } catch (analyticsError) {
      console.warn('Failed to track error in analytics:', analyticsError)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Something went wrong</h3>
                    <p className="text-sm mt-1">
                      An unexpected error occurred. Please try refreshing the page.
                    </p>
                  </div>
                  
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="text-xs">
                      <summary className="cursor-pointer font-medium">
                        Error Details (Development)
                      </summary>
                      <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                        {this.state.error.message}
                        {this.state.error.stack && (
                          <>
                            {'\n\nStack Trace:\n'}
                            {this.state.error.stack}
                          </>
                        )}
                      </pre>
                    </details>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={this.handleReset}
                      variant="outline"
                      size="sm"
                      className="text-red-700 border-red-300 hover:bg-red-100"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="sm"
                      className="text-red-700 border-red-300 hover:bg-red-100"
                    >
                      Refresh Page
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    // Track error in analytics if available
    try {
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('Error Handler', {
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo?.componentStack
        })
      }
    } catch (analyticsError) {
      console.warn('Failed to track error in analytics:', analyticsError)
    }
  }
}
