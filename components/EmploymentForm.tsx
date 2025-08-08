"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EmploymentForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const availability = formData.get('availability') as string;
    const about = formData.get('about') as string;
    
    const subject = encodeURIComponent('Employment Application - Three Sisters Oyster Co.');
    const body = encodeURIComponent(
      `Employment Application

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Position of Interest: ${position}
Availability: ${availability}

About: ${about}`
    );
    
    window.location.href = `mailto:info@threesistersoyster.com?subject=${subject}&body=${body}`;
  };

  const handleEmailResume = () => {
    window.location.href = "mailto:info@threesistersoyster.com?subject=Employment%20Inquiry";
  };

  return (
    <Card className="border-purple-200 max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">Apply Now</h3>
          <p className="text-gray-600">
            Interested in joining our team? Fill out the application below and we'll get back to you soon.
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                name="firstName"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                name="lastName"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position of Interest *</label>
            <select 
              name="position"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a position</option>
              <option value="farm-hand">Farm Hand</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
            <select 
              name="availability"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select availability</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="seasonal">Seasonal</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself and why you're interested in working with us *</label>
            <textarea
              name="about"
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Share your experience, interests, and what draws you to sustainable aquaculture..."
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 px-8"
            >
              Submit Application
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={handleEmailResume}
            >
              Email Resume
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 