'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthGuard } from '@/components/admin/AuthGuard'
import { 
  FileText,
  ArrowLeft,
  Download,
  Check,
  X,
  Clock
} from 'lucide-react'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  items: any
  total_amount: number
  status: string
  payment_status?: string
  order_type?: string
  pickup_code?: string
  pickup_week_start?: string
  checkout_session_id?: string
  created_at: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState<string>('all')
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [orderCount, setOrderCount] = useState<number>(0)

  const formatPickupTime = (time: string | undefined | null) => {
    if (!time) return null
    const [hourStr, minuteStr] = time.split(':')
    const hour = parseInt(hourStr ?? '0', 10)
    const minute = parseInt(minuteStr ?? '0', 10)
    if (Number.isNaN(hour) || Number.isNaN(minute)) return null
    const period = hour >= 12 ? 'PM' : 'AM'
    const twelveHour = hour % 12 === 0 ? 12 : hour % 12
    const paddedMinutes = minute.toString().padStart(2, '0')
    return `${twelveHour}:${paddedMinutes} ${period}`
  }

  useEffect(() => {
    fetchOrders()
  }, [selectedWeek])

  // Auto-refresh orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) { // Only refresh if not currently loading
        console.log('Auto-refreshing orders...')
        fetchOrders()
      }
    }, 30000) // 30 seconds
    
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      // Add cache-busting to ensure fresh data
      const url = selectedWeek !== 'all' 
        ? `/api/admin/orders?week_start=${selectedWeek}&t=${Date.now()}`
        : `/api/admin/orders?t=${Date.now()}`
      const response = await fetch(url, {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Orders fetched:', data.orders?.length || 0, 'orders')
      
      if (data.orders) {
        const newCount = data.orders.length
        const previousCount = orderCount
        
        setOrders(data.orders)
        setOrderCount(newCount)
        setLastRefresh(new Date())
        
        console.log('Orders set in state:', newCount)
        
        // Show notification if new orders were added
        if (newCount > previousCount && previousCount > 0) {
          console.log(`New order detected! Previous: ${previousCount}, Current: ${newCount}`)
        }
      } else {
        console.warn('No orders in response:', data)
        setOrders([])
        setOrderCount(0)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      alert('Failed to load orders. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      fetchOrders()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  // Calculate pickup week start for display (Wednesday 11:59 PM cutoff)
  const getPickupWeekStart = (orderDate: string): string => {
    const date = new Date(orderDate)
    const day = date.getDay() // 0 = Sunday, 3 = Wednesday
    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    // Orders placed Monday through Wednesday (before Wednesday 11:59 PM) → pickup this Friday
    // Orders placed after Wednesday 11:59 PM → pickup next Friday
    const isBeforeCutoff = (day >= 1 && day <= 3) && !(day === 3 && hours === 23 && minutes >= 59)
    
    if (isBeforeCutoff) {
      // This Friday
      const friday = new Date(date)
      friday.setDate(date.getDate() + (5 - day))
      return friday.toISOString().split('T')[0]
    } else {
      // Next week's Friday (after Wednesday cutoff)
      let daysUntilNextFriday: number
      if (day === 0) { // Sunday
        daysUntilNextFriday = 5
      } else if (day === 4) { // Thursday
        daysUntilNextFriday = 8 // Next week's Friday
      } else if (day === 5) { // Friday
        daysUntilNextFriday = 7
      } else if (day === 6) { // Saturday
        daysUntilNextFriday = 6
      } else { // Shouldn't happen (day 1-3), but fallback
        daysUntilNextFriday = (5 - day + 7) % 7 || 7
      }
      const nextFriday = new Date(date)
      nextFriday.setDate(date.getDate() + daysUntilNextFriday)
      return nextFriday.toISOString().split('T')[0]
    }
  }

  // Get unique pickup weeks for filter
  const uniqueWeeks = useMemo(() => {
    const weeks = new Set<string>()
    orders.forEach(order => {
      const week = order.pickup_week_start || getPickupWeekStart(order.created_at)
      weeks.add(week)
    })
    return Array.from(weeks).sort()
  }, [orders])

  const exportWeekOrders = () => {
    if (selectedWeek === 'all') {
      alert('Please select a specific week to export')
      return
    }
    
    const weekOrders = orders.filter(order => {
      const week = order.pickup_week_start || getPickupWeekStart(order.created_at)
      return week === selectedWeek
    })

    const header = [
      'Order ID',
      'Customer Name',
      'Email',
      'Phone',
      'Item Name',
      'Quantity',
      'Unit Price',
      'Line Total',
      'Order Total',
      'Payment Status',
      'Pickup Date',
      'Pickup Time',
      'Pickup Code',
      'Order Date'
    ]

    const escapeCsv = (value: string | number | null | undefined) => {
      const stringValue = value === undefined || value === null ? '' : String(value)
      return `"${stringValue.replace(/"/g, '""')}"`
    }

    const rows: string[][] = [header]

    weekOrders.forEach(order => {
      const shippingAddress = (order as any)?.shipping_address || {}
      const pickupRequestedDate = order.pickup_requested_date || shippingAddress.pickup_requested_date || ''
      const pickupRequestedTime = order.pickup_requested_time || shippingAddress.pickup_requested_time || ''
      const parsedItems = (() => {
        if (Array.isArray(order.items)) return order.items
        try {
          const data = JSON.parse(order.items ?? '[]')
          return Array.isArray(data) ? data : []
        } catch {
          return []
        }
      })()

      if (parsedItems.length === 0) {
        rows.push([
          order.id,
          order.customer_name,
          order.customer_email,
          order.customer_phone || '',
          '',
          '',
          '',
          '',
          order.total_amount.toFixed(2),
          order.payment_status || 'paid',
          pickupRequestedDate,
          pickupRequestedTime,
          order.pickup_code || '',
          new Date(order.created_at).toLocaleDateString()
        ])
        return
      }

      parsedItems.forEach((item: any) => {
        const quantity = Number(item.quantity) || 0
        const unitPrice = Number(item.price) || 0
        const lineTotal = (quantity || 1) * unitPrice

        rows.push([
          order.id,
          order.customer_name,
          order.customer_email,
          order.customer_phone || '',
          item.name || item.product_name || '',
          quantity ? quantity.toString() : '',
          unitPrice ? unitPrice.toFixed(2) : '',
          lineTotal ? lineTotal.toFixed(2) : '',
          order.total_amount.toFixed(2),
          order.payment_status || 'paid',
          pickupRequestedDate,
          pickupRequestedTime,
          order.pickup_code || '',
          new Date(order.created_at).toLocaleDateString()
        ])
      })
    })

    const csv = rows
      .map(row => row.map(cell => escapeCsv(cell)).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-week-${selectedWeek}.csv`
    a.click()
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
                <h1 className="text-4xl font-bold text-purple-900">Orders</h1>
                <p className="text-purple-700">
                  View and manage customer orders • {orderCount} total orders
                  {lastRefresh && (
                    <span className="text-purple-600 text-sm ml-2">
                      (Last updated: {lastRefresh.toLocaleTimeString()})
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Button 
                onClick={() => {
                  console.log('Manual refresh triggered')
                  fetchOrders()
                }} 
                variant="outline"
                title="Refresh orders list"
                disabled={loading}
              >
                <Clock className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {uniqueWeeks.map(week => (
                    <SelectItem key={week} value={week}>
                      Week of {new Date(week).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedWeek !== 'all' && (
                <Button onClick={exportWeekOrders} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Week
                </Button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
              <p className="text-purple-800">Loading orders...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 text-purpleBrand mx-auto mb-4" />
                    <p className="text-purple-800 text-lg">No orders found</p>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order) => {
                  const pickupWeek = order.pickup_week_start || getPickupWeekStart(order.created_at)
                  const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items
                  const pickupRequestedDate = order.pickup_requested_date || (order as any)?.shipping_address?.pickup_requested_date
                  const pickupRequestedTime = order.pickup_requested_time || (order as any)?.shipping_address?.pickup_requested_time
                  const pickupRequestedDateLabel = pickupRequestedDate
                    ? new Date(`${pickupRequestedDate}T00:00:00`).toLocaleDateString(undefined, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })
                    : null
                  const pickupRequestedTimeLabel = formatPickupTime(pickupRequestedTime)
                  
                  return (
                    <Card key={order.id} className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-purple-900 flex items-center">
                              <FileText className="w-5 h-5 mr-2" />
                              Order #{order.id.slice(-8)}
                            </CardTitle>
                            <p className="text-purple-700 mt-1">
                              {order.customer_name} • {order.customer_email}
                            </p>
                            {order.customer_phone && (
                              <p className="text-purple-600 text-sm">Phone: {order.customer_phone}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                            {order.payment_status && (
                              <Badge variant={order.payment_status === 'paid' ? 'default' : 'outline'}>
                                {order.payment_status}
                              </Badge>
                            )}
                            {order.pickup_code && (
                              <Badge variant="outline">
                                Code: {order.pickup_code}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-purple-900 font-semibold mb-2">Items:</p>
                          <ul className="list-disc list-inside text-purple-700 space-y-1">
                            {Array.isArray(items) ? items.map((item: any, idx: number) => (
                              <li key={idx}>
                                {item.name || item.product_name} × {item.quantity || 1} 
                                {item.price && ` - $${(item.price * (item.quantity || 1)).toFixed(2)}`}
                              </li>
                            )) : (
                              <li>No items listed</li>
                            )}
                          </ul>
                        </div>
                        {(pickupRequestedDateLabel || pickupRequestedTimeLabel) && (
                          <div className="rounded-lg border border-purpleBrand/20 bg-white/70 p-3">
                            <p className="text-purple-800 text-sm font-semibold">Requested Pickup</p>
                            <p className="text-purple-700 text-sm">
                              {pickupRequestedDateLabel || 'Date pending'}
                              {pickupRequestedTimeLabel ? ` at ${pickupRequestedTimeLabel}` : ''}
                            </p>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-4 border-t border-purple-200">
                          <div>
                            <p className="text-purple-700 text-sm">
                              Pickup Week: {new Date(pickupWeek).toLocaleDateString()}
                            </p>
                            <p className="text-purple-600 text-xs">
                              Order Date: {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-purple-900 font-bold text-xl">
                              Total: ${order.total_amount.toFixed(2)}
                            </p>
                            {order.status !== 'delivered' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                className="bg-gradient-to-r from-mintBrand to-seafoamBrand"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Mark Fulfilled
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

