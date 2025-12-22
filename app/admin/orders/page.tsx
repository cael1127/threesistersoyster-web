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
  Clock,
  Search,
  Filter,
  Mail,
  AlertCircle
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
import { Input } from '@/components/ui/input'

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
  const [allOrders, setAllOrders] = useState<Order[]>([]) // Store all orders including fulfilled
  const [loading, setLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState<string>('all')
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [orderCount, setOrderCount] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('active') // 'active', 'all', 'fulfilled'
  const [emailConfig, setEmailConfig] = useState<{configured: boolean, config: {RESEND_API_KEY: string, RESEND_FROM_EMAIL: string}} | null>(null)
  const [emailTestStatus, setEmailTestStatus] = useState<{sending: boolean, success: boolean | null, message: string}>({sending: false, success: null, message: ''})

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
    fetchEmailConfig()
  }, [selectedWeek])

  const fetchEmailConfig = async () => {
    try {
      const response = await fetch('/api/test-email')
      if (response.ok) {
        const data = await response.json()
        setEmailConfig(data)
      }
    } catch (error) {
      console.error('Error fetching email config:', error)
    }
  }

  const sendTestEmail = async () => {
    setEmailTestStatus({ sending: true, success: null, message: '' })
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'caelfindley1@gmail.com' })
      })
      const data = await response.json()
      
      if (data.success) {
        setEmailTestStatus({ 
          sending: false, 
          success: true, 
          message: `Test email sent successfully to caelfindley1@gmail.com! Message ID: ${data.messageId || 'N/A'}` 
        })
        // Refresh config to show updated status
        fetchEmailConfig()
      } else {
        setEmailTestStatus({ 
          sending: false, 
          success: false, 
          message: `Failed to send test email: ${data.error || 'Unknown error'}` 
        })
      }
    } catch (error) {
      setEmailTestStatus({ 
        sending: false, 
        success: false, 
        message: `Error sending test email: ${error instanceof Error ? error.message : 'Unknown error'}` 
      })
    }
  }

  // Auto-refresh orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) { // Only refresh if not currently loading
        if (process.env.NODE_ENV === 'development') {
          console.log('Auto-refreshing orders...')
        }
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
      if (process.env.NODE_ENV === 'development') {
        console.log('Orders fetched:', data.orders?.length || 0, 'orders')
      }
      
      if (data.orders) {
        const newCount = data.orders.length
        const previousCount = orderCount
        
        // Store all orders
        setAllOrders(data.orders)
        setOrderCount(newCount)
        setLastRefresh(new Date())
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Orders set in state:', newCount)
          
          // Show notification if new orders were added
          if (newCount > previousCount && previousCount > 0) {
            console.log(`New order detected! Previous: ${previousCount}, Current: ${newCount}`)
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('No orders in response:', data)
        }
        setAllOrders([])
        setOrderCount(0)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching orders:', error)
      }
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating order:', error)
      }
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

  // Filter orders based on status and search query
  const filteredOrders = useMemo(() => {
    let filtered = allOrders

    // Filter by status
    if (statusFilter === 'active') {
      // Hide fulfilled/delivered orders
      filtered = filtered.filter(order => 
        order.status !== 'delivered' && 
        order.status !== 'fulfilled' &&
        order.status !== 'completed'
      )
    } else if (statusFilter === 'fulfilled') {
      // Show only fulfilled orders
      filtered = filtered.filter(order => 
        order.status === 'delivered' || 
        order.status === 'fulfilled' ||
        order.status === 'completed'
      )
    }
    // 'all' shows everything

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(order => {
        const searchableText = [
          order.id,
          order.customer_name,
          order.customer_email,
          order.customer_phone || '',
          order.pickup_code || '',
          order.payment_status || '',
          order.status
        ].join(' ').toLowerCase()
        
        return searchableText.includes(query)
      })
    }

    // Filter by week if selected
    if (selectedWeek !== 'all') {
      filtered = filtered.filter(order => {
        const week = order.pickup_week_start || getPickupWeekStart(order.created_at)
        return week === selectedWeek
      })
    }

    return filtered
  }, [allOrders, statusFilter, searchQuery, selectedWeek])

  // Get unique pickup weeks for filter (from all orders)
  const uniqueWeeks = useMemo(() => {
    const weeks = new Set<string>()
    allOrders.forEach(order => {
      const week = order.pickup_week_start || getPickupWeekStart(order.created_at)
      weeks.add(week)
    })
    return Array.from(weeks).sort()
  }, [allOrders])

  const exportWeekOrders = () => {
    if (selectedWeek === 'all') {
      alert('Please select a specific week to export')
      return
    }
    
    const weekOrders = filteredOrders.filter(order => {
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
                  View and manage customer orders • {filteredOrders.length} of {orderCount} orders shown
                  {lastRefresh && (
                    <span className="text-purple-600 text-sm ml-2">
                      (Last updated: {lastRefresh.toLocaleTimeString()})
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <Button 
                onClick={() => {
                  if (process.env.NODE_ENV === 'development') {
                    console.log('Manual refresh triggered')
                  }
                  fetchOrders()
                }} 
                variant="outline"
                title="Refresh orders list"
                disabled={loading}
              >
                <Clock className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <div className="relative flex-1 min-w-[200px] max-w-[400px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by name, email, order ID, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-purpleBrand/30"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active Orders</SelectItem>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Weeks</SelectItem>
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

          {/* Email Testing Section */}
          <Card className="border-purpleBrand/30 bg-gradient-to-br from-blueBrand/10 to-mintBrand/10 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-purple-900 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-purple-700 text-sm font-semibold">Email Configuration Status:</p>
                {emailConfig ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={emailConfig.config.RESEND_API_KEY === 'SET' ? 'default' : 'destructive'} className={emailConfig.config.RESEND_API_KEY === 'SET' ? 'bg-green-600' : ''}>
                        {emailConfig.config.RESEND_API_KEY === 'SET' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        RESEND_API_KEY: {emailConfig.config.RESEND_API_KEY}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={emailConfig.config.RESEND_FROM_EMAIL !== 'MISSING' ? 'default' : 'destructive'} className={emailConfig.config.RESEND_FROM_EMAIL !== 'MISSING' ? 'bg-green-600' : ''}>
                        {emailConfig.config.RESEND_FROM_EMAIL !== 'MISSING' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        RESEND_FROM_EMAIL: {emailConfig.config.RESEND_FROM_EMAIL !== 'MISSING' ? emailConfig.config.RESEND_FROM_EMAIL : 'MISSING'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-purple-600 text-sm">Loading configuration...</p>
                )}
              </div>
              
              <div className="pt-2 border-t border-purple-200">
                <p className="text-purple-700 text-sm mb-3">
                  Send a test purchase confirmation email to verify the email template and delivery:
                </p>
                <Button
                  onClick={sendTestEmail}
                  disabled={emailTestStatus.sending || !emailConfig?.configured}
                  className="bg-gradient-to-r from-mintBrand to-seafoamBrand hover:from-seafoamBrand hover:to-mintBrand"
                >
                  {emailTestStatus.sending ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Test Email to caelfindley1@gmail.com
                    </>
                  )}
                </Button>
                
                {emailTestStatus.message && (
                  <div className={`mt-3 p-3 rounded-lg flex items-start gap-2 ${
                    emailTestStatus.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {emailTestStatus.success ? (
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${emailTestStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                      {emailTestStatus.message}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
              <p className="text-purple-800">Loading orders...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <FileText className="w-16 h-16 text-purpleBrand mx-auto mb-4" />
                    <p className="text-purple-800 text-lg">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'No orders match your filters' 
                        : 'No orders found'}
                    </p>
                    {(searchQuery || statusFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery('')
                          setStatusFilter('active')
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map((order) => {
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
                    <Card key={order.id} className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-purple-900 flex items-center mb-2">
                              <FileText className="w-5 h-5 mr-2 flex-shrink-0" />
                              <span className="font-mono">Order #{order.id.slice(-8)}</span>
                            </CardTitle>
                            <div className="space-y-1">
                              <p className="text-purple-900 font-semibold">
                                {order.customer_name}
                              </p>
                              <p className="text-purple-700 text-sm break-all">
                                {order.customer_email}
                              </p>
                              {order.customer_phone && (
                                <p className="text-purple-600 text-sm">📞 {order.customer_phone}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge 
                              variant={
                                order.status === 'delivered' || 
                                order.status === 'fulfilled' || 
                                order.status === 'completed'
                                  ? 'default' 
                                  : order.status === 'pending'
                                  ? 'secondary'
                                  : 'outline'
                              }
                              className={
                                order.status === 'delivered' || 
                                order.status === 'fulfilled' || 
                                order.status === 'completed'
                                  ? 'bg-green-600'
                                  : order.status === 'pending'
                                  ? 'bg-yellow-500'
                                  : ''
                              }
                            >
                              {order.status === 'delivered' || 
                               order.status === 'fulfilled' || 
                               order.status === 'completed'
                                ? 'Fulfilled'
                                : order.status}
                            </Badge>
                            {order.payment_status && (
                              <Badge 
                                variant={order.payment_status === 'paid' ? 'default' : 'outline'}
                                className={order.payment_status === 'paid' ? 'bg-blue-600' : ''}
                              >
                                {order.payment_status}
                              </Badge>
                            )}
                            {order.pickup_code && (
                              <Badge variant="outline" className="font-mono">
                                Code: {order.pickup_code}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-white/50 rounded-lg p-4 border border-purpleBrand/20">
                          <p className="text-purple-900 font-semibold mb-3 flex items-center">
                            <span className="mr-2">📦</span>
                            Order Items
                          </p>
                          <ul className="space-y-2">
                            {Array.isArray(items) && items.length > 0 ? items.map((item: any, idx: number) => (
                              <li key={idx} className="flex justify-between items-center text-purple-700 bg-white/50 rounded p-2">
                                <span>
                                  <span className="font-medium">{item.name || item.product_name}</span>
                                  <span className="text-purple-600 ml-2">× {item.quantity || 1}</span>
                                </span>
                                {item.price && (
                                  <span className="font-semibold text-purple-900">
                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                  </span>
                                )}
                              </li>
                            )) : (
                              <li className="text-purple-600 italic">No items listed</li>
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
                            {order.status !== 'delivered' && 
                             order.status !== 'fulfilled' && 
                             order.status !== 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'fulfilled')}
                                className="bg-gradient-to-r from-mintBrand to-seafoamBrand hover:from-seafoamBrand hover:to-mintBrand"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Mark Fulfilled
                              </Button>
                            )}
                            {(order.status === 'delivered' || 
                              order.status === 'fulfilled' || 
                              order.status === 'completed') && (
                              <Badge variant="default" className="bg-green-600">
                                ✓ Fulfilled
                              </Badge>
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

