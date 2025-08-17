"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        // Reset form on success
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-purple-200 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">Send Us a Message</h3>
        
        {/* Status Messages */}
        {submitStatus.type && (
          <div className={`mb-6 p-4 rounded-md ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-2">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mintBrand bg-white text-purple-900 placeholder-purple-600"
              placeholder="Tell us about your inquiry..."
            ></textarea>
          </div>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-mintBrand hover:bg-seafoamBrand text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>

        {/* Info about where messages go */}
        <div className="mt-6 text-center text-sm text-purple-600">
          <p>Messages are sent directly to our team at caelfindley@gmail.com</p>
        </div>
      </CardContent>
    </Card>
  );
} 