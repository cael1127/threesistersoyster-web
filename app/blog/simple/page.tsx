'use client'

import Link from 'next/link'

export default function SimpleBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-500">
      <h1>Simple Blog Page</h1>
      <p>This is a simple blog page without complex components.</p>
      <Link href="/">Home</Link>
    </div>
  );
}
