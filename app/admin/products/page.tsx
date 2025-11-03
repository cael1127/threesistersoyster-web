'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthGuard } from '@/components/admin/AuthGuard'
import { 
  Plus, 
  Edit, 
  Trash2,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react'
import { SeasonalFloatingParticles } from '@/components/ui/floating-particles'
import type { Product } from '@/lib/supabase'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    inventory_count: 0
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // Add cache-busting timestamp to ensure fresh data
      const response = await fetch(`/api/admin/products?t=${Date.now()}`, {
        cache: 'no-store'
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }
      const data = await response.json()
      if (data.products) {
        setProducts(data.products)
        console.log('Products fetched:', data.products.length, 'products')
        console.log('Oyster products:', data.products.filter((p: Product) => p.category?.toLowerCase() === 'oysters').length)
        console.log('Merch products:', data.products.filter((p: Product) => p.category?.toLowerCase() !== 'oysters').length)
      } else {
        console.error('No products in response:', data)
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Failed to load products. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate category
    const normalizedCategory = formData.category.toLowerCase().trim()
    if (!['merch', 'oysters'].includes(normalizedCategory)) {
      alert('Category must be either "merch" or "oysters"')
      return
    }

    try {
      const response = editingProduct
        ? await fetch('/api/admin/products', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, category: normalizedCategory, id: editingProduct.id })
          })
        : await fetch('/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, category: normalizedCategory })
          })

      const result = await response.json()

      if (!response.ok) {
        const errorMsg = result.details 
          ? `${result.error}: ${result.details}`
          : result.error || 'Failed to save product'
        console.error('API error response:', result)
        throw new Error(errorMsg)
      }

      if (result.success) {
        // Show success message with product details
        const productName = result.product?.name || 'Product'
        alert(editingProduct ? `Product "${productName}" updated successfully!` : `Product "${productName}" created successfully!`)
        
        console.log('Product saved successfully:', result.product)
        
        // Clear form and close first
        setEditingProduct(null)
        setShowAddForm(false)
        setFormData({
          name: '',
          description: '',
          price: 0,
          category: '',
          image_url: '',
          inventory_count: 0
        })
        
        // Refresh products list to show updated data immediately
        await fetchProducts()
        
        // Log the products to verify
        console.log('Products after refresh:', products.length, 'products')
      } else {
        throw new Error(result.error || 'Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to save product. Please check the console for details.'
      alert(errorMessage)
    }
  }

  const handleEdit = (product: Product) => {
    // Clear any existing form state first
    setEditingProduct(product)
    setShowAddForm(true)
    
    // Parse description if it's JSON
    let description = ''
    try {
      if (product.description) {
        const desc = JSON.parse(product.description)
        description = desc.originalDescription || product.description || ''
      } else {
        description = ''
      }
    } catch {
      description = product.description || ''
    }
    
    // Normalize category for the dropdown
    const category = product.category.toLowerCase() === 'oysters' ? 'oysters' : 
                     product.category.toLowerCase() === 'merch' ? 'merch' : 
                     product.category || ''
    
    setFormData({
      name: product.name || '',
      description: description,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
      category: category,
      image_url: product.image_url || '',
      inventory_count: product.inventory_count || 0
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete product')
      }
      
      if (result.success) {
        alert('Product deleted successfully!')
        // Refresh the products list
        await fetchProducts()
      } else {
        throw new Error(result.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete product. Please try again.')
    }
  }

  const resetForm = () => {
    setShowAddForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image_url: '',
      inventory_count: 0
    })
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
                <h1 className="text-4xl font-bold text-purple-900">Products</h1>
                <p className="text-purple-700">Manage your product catalog</p>
              </div>
            </div>
            {!showAddForm && (
              <Button 
                onClick={() => {
                  setEditingProduct(null)
                  setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    image_url: '',
                    inventory_count: 0
                  })
                  setShowAddForm(true)
                }}
                className="bg-gradient-to-r from-purpleBrand to-lavenderBrand"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>

          {showAddForm && (
            <Card className="mb-8 border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price || 0}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="inventory">Inventory Count</Label>
                      <Input
                        id="inventory"
                        type="number"
                        value={formData.inventory_count || 0}
                        onChange={(e) => setFormData({ ...formData, inventory_count: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select category</option>
                      <option value="oysters">Oysters</option>
                      <option value="merch">Merchandise</option>
                    </select>
                    <p className="text-xs text-purple-600 mt-1">
                      Products tagged "oysters" appear in the Fresh Oysters tab. Products tagged "merch" appear in Merchandise.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-gradient-to-r from-purpleBrand to-lavenderBrand">
                      {editingProduct ? 'Update' : 'Create'} Product
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mintBrand mx-auto mb-4"></div>
              <p className="text-purple-800">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="border-purpleBrand/30 bg-gradient-to-br from-purpleBrand/10 to-lavenderBrand/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-900 flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-purple-700">{product.category}</p>
                    <p className="text-purple-900 font-bold text-xl">${product.price.toFixed(2)}</p>
                    <p className="text-purple-700">Inventory: {product.inventory_count || 0}</p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

