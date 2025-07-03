"use client"

import { useEffect, useState } from "react"
import { getHarvestReadyInventoryCount, getFarmInventoryCount, getNurseryInventoryCount } from "@/lib/supabase"

export function HarvestReadyInventoryCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        console.log("Fetching harvest ready count...")
        const harvestReadyCount = await getHarvestReadyInventoryCount()
        console.log("Harvest ready count received:", harvestReadyCount)
        setCount(harvestReadyCount)
        setError(null)
      } catch (error) {
        console.error("Error fetching harvest ready inventory count:", error)
        setError("Failed to load count")
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
    // Refresh every 10 seconds for testing
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error</div>
  }

  return <>{count.toLocaleString()}</>
}

export function FarmInventoryCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        console.log("Fetching farm count...")
        const farmCount = await getFarmInventoryCount()
        console.log("Farm count received:", farmCount)
        setCount(farmCount)
        setError(null)
      } catch (error) {
        console.error("Error fetching farm inventory count:", error)
        setError("Failed to load count")
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
    // Refresh every 10 seconds for testing
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error</div>
  }

  return <>{count.toLocaleString()}</>
}

export function NurseryInventoryCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCount() {
      try {
        console.log("Fetching nursery count...")
        const nurseryCount = await getNurseryInventoryCount()
        console.log("Nursery count received:", nurseryCount)
        setCount(nurseryCount)
        setError(null)
      } catch (error) {
        console.error("Error fetching nursery inventory count:", error)
        setError("Failed to load count")
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
    // Refresh every 10 seconds for testing
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error</div>
  }

  return <>{count.toLocaleString()}</>
}
