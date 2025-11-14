'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthGuard } from '@/components/admin/AuthGuard'
import { 
  ShoppingBag, 
  Package, 
  FileText, 
  LogOut,
  Settings
} from 'lucide-react'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 via-lavenderBrand/20 via-blueBrand/20 via-mintBrand/20 to-seafoamBrand/20 relative overflow-hidden">
        <SeasonalFloatingParticles count={8} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-purple-900 mb-2">Admin Dashboard</h1>
              <p className="text-purple-700">Three Sisters Oyster Co. Management</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-purpleBrand/30 text-purple-700 hover:bg-purpleBrand/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/products">
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center">
                    <ShoppingBag className="w-6 h-6 mr-2" />
                    Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700">
                    Manage your products, inventory counts, and pricing.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/inventory">
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center">
                    <Package className="w-6 h-6 mr-2" />
                    Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700">
                    Update farm and nursery inventory counts.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/orders">
              <Card className="border-purpleBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700">
                    View and manage orders, filter by week.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-8">
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/5 to-lavenderBrand/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center">
                  <Settings className="w-6 h-6 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700">
                  Use the menu above to manage your inventory, products, and view all customer reservations.
                  Orders can be sorted by pickup week. Guests now choose a specific pickup day (Tuesday–Sunday) and time between 12 PM and 7 PM with at least two days of notice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

