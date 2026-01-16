"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Check, Loader2 } from "lucide-react"

export default function EmploymentForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null)
    setSuccess(false)
    setLoading(true)

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const startDate = formData.get('startDate') as string;
    const workHistoryFile = formData.get('workHistory') as File | null;

    // Handle file upload
    let workHistoryBase64: string | undefined;
    if (workHistoryFile && workHistoryFile.size > 0) {
      if (workHistoryFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Work history file must be less than 5MB.')
        setLoading(false)
        return
      }
      try {
        workHistoryBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(workHistoryFile)
        })
      } catch (err) {
        setError('Failed to read work history file. Please try again.')
        setLoading(false)
        return
      }
    }

    try {
      const response = await fetch('/api/job-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          address,
          email,
          phone: phone || undefined,
          position,
          startDate,
          workHistoryFileName: workHistoryFile?.name,
          workHistoryBase64: workHistoryBase64
        })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to submit application. Please try again or contact us directly.')
        return
      }

      setSuccess(true)
      // Reset form
      e.currentTarget.reset()
    } catch (err) {
      setError('An unexpected error occurred. Please try again or contact us directly.')
      console.error('Job application error:', err)
    } finally {
      setLoading(false)
    }
  };

  return (
    <Card className="border-purple-200 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center">Work at Three Sisters</h3>
          <p className="text-purple-800">
            Interested in working on our farm? Fill out the form below to express your interest.
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Name *</label>
            <input
              name="name"
              type="text"
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600 disabled:opacity-50"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Address *</label>
            <textarea
              name="address"
              rows={2}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600 disabled:opacity-50"
              placeholder="Street address, city, state, ZIP code"
            ></textarea>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-2">Email *</label>
              <input
                name="email"
                type="email"
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600 disabled:opacity-50"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-2">Phone Number *</label>
              <input
                name="phone"
                type="tel"
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600 disabled:opacity-50"
                placeholder="(713) 854-7427"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Applying for Position *</label>
            <input
              name="position"
              type="text"
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600 disabled:opacity-50"
              placeholder="e.g., Oyster Farm Worker, Farm Hand, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Available Start Date *</label>
            <input
              name="startDate"
              type="date"
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Work History (File Upload) *</label>
            <input
              name="workHistory"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purpleBrand file:text-white hover:file:bg-purpleBrand/90"
            />
            <p className="text-xs text-purple-600 mt-1">Accepted formats: PDF, DOC, DOCX, TXT (Max 5MB)</p>
          </div>

          {error && (
            <div className="flex items-start space-x-3 rounded-lg border border-red-400 bg-red-50/80 px-4 py-3 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start space-x-3 rounded-lg border border-mintBrand/40 bg-mintBrand/20 px-4 py-3 text-mintBrand">
              <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Your application has been submitted successfully! We'll review it and get back to you soon.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purpleBrand to-seafoamBrand hover:from-lavenderBrand hover:to-blueBrand px-8 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 