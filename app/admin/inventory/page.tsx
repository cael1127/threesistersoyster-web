'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthGuard } from '@/components/admin/AuthGuard'
import { 
  Package,
  ArrowLeft
} from 'lucide-react'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'
import type { Inventory } from '@/lib/supabase'

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [countUpdates, setCountUpdates] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/admin/inventory')
      const data = await response.json()
      if (data.inventory) {
        setInventory(data.inventory)
      }
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCount = async (id: string) => {
    const newCount = countUpdates[id]
    if (newCount === undefined) return

    setUpdating(id)
    try {
      await fetch('/api/admin/inventory', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, count: newCount })
      })
      
      setCountUpdates({ ...countUpdates, [id]: undefined })
      fetchInventory()
    } catch (error) {
      console.error('Error updating inventory:', error)
    } finally {
      setUpdating(null)
    }
  }

  const getInventoryTotal = () => {
    return inventory.reduce((sum, item) => sum + (item.count || 0), 0)
  }

  const getFarmTotal = () => {
    return inventory
      .filter(item => item.type === 'farm')
      .reduce((sum, item) => sum + (item.count || 0), 0)
  }

  const getNurseryTotal = () => {
    return inventory
      .filter(item => item.type === 'nursery')
      .reduce((sum, item) => sum + (item.count || 0), 0)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-purpleBrand/20 via-lavenderBrand/20 via-blueBrand/20 via-mintBrand/20 to-seafoamBrand/20 relative overflow-hidden">
        <SeasonalFloatingParticles count={8} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-purple-900">Inventory</h1>
                <p className="text-purple-700">Manage farm and nursery inventory</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900">Total Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-900">{getInventoryTotal()}</p>
              </CardContent>
            </Card>
            <Card className="border-blueBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900">Farm Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-900">{getFarmTotal()}</p>
              </CardContent>
            </Card>
            <Card className="border-mintBrand/30 bg-gradient-to-br from-mintBrand/10 to-seafoamBrand/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900">Nursery Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-900">{getNurseryTotal()}</p>
              </CardContent>
            </Card>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
              <p className="text-purple-800">Loading inventory...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map((item) => (
                <Card key={item.id} className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-900 flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-purple-700">Type</Label>
                      <p className="text-purple-900 font-semibold capitalize">{item.type}</p>
                    </div>
                    <div>
                      <Label className="text-purple-700">Current Count</Label>
                      <p className="text-purple-900 font-bold text-2xl">{item.count}</p>
                    </div>
                    <div>
                      <Label htmlFor={`count-${item.id}`} className="text-purple-700">
                        New Count
                      </Label>
                      <Input
                        id={`count-${item.id}`}
                        type="number"
                        defaultValue={item.count}
                        onChange={(e) => setCountUpdates({ ...countUpdates, [item.id]: parseInt(e.target.value) })}
                      />
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purpleBrand to-lavenderBrand"
                      onClick={() => handleUpdateCount(item.id)}
                      disabled={updating === item.id || countUpdates[item.id] === undefined}
                    >
                      {updating === item.id ? 'Updating...' : 'Update Count'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

