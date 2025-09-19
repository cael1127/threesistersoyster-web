"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import Supabase functions to avoid SSR issues
const getHarvestReadyInventoryCount = async () => {
  const { getHarvestReadyInventoryCount } = await import("@/lib/supabase")
  return getHarvestReadyInventoryCount()
}

const getFarmInventoryCount = async () => {
  const { getFarmInventoryCount } = await import("@/lib/supabase")
  return getFarmInventoryCount()
}

const getNurseryInventoryCount = async () => {
  const { getNurseryInventoryCount } = await import("@/lib/supabase")
  return getNurseryInventoryCount()
}

export function HarvestReadyInventoryCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  function formatCount(value: number) {
    const millions = value / 1_000_000
    return `${millions.toFixed(2)}M`
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchCount() {
      try {
        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
          setCount(0)
          setError(null)
          setLoading(false)
          return
        }

        const harvestReadyCount = await getHarvestReadyInventoryCount()
        setCount(harvestReadyCount)
        setError(null)
      } catch (error) {
        setError("Failed to load count")
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
    // Refresh every 10 seconds for testing
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [mounted])

  // During SSR, show a placeholder
  if (!mounted) {
    return <div className="animate-pulse">0</div>
  }

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error</div>
  }

  return <>{formatCount(count)}</>
}

export function FarmInventoryCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchCount() {
      try {
        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
          setCount(0)
          setError(null)
          setLoading(false)
          return
        }

        const farmCount = await getFarmInventoryCount()
        setCount(farmCount)
        setError(null)
      } catch (error) {
        setError("Failed to load count")
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
    // Refresh every 10 seconds for testing
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [mounted])

  // During SSR, show a placeholder
  if (!mounted) {
    return <div className="animate-pulse">0</div>
  }

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error</div>
  }

  function formatCount(value: number) {
    const millions = value / 1_000_000
    return `${millions.toFixed(2)}M`
  }

  return <>{formatCount(count)}</>
}

export function NurseryInventoryCounter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchCount() {
      try {
        // Check if Supabase is properly configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co") {
          setCount(0)
          setError(null)
          setLoading(false)
          return
        }

        const nurseryCount = await getNurseryInventoryCount()
        setCount(nurseryCount)
        setError(null)
      } catch (error) {
        setError("Failed to load count")
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
    // Refresh every 10 seconds for testing
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [mounted])

  // During SSR, show a placeholder
  if (!mounted) {
    return <div className="animate-pulse">0</div>
  }

  if (loading) {
    return <div className="animate-pulse">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error</div>
  }

  function formatCount(value: number) {
    const millions = value / 1_000_000
    return `${millions.toFixed(2)}M`
  }

  return <>{formatCount(count)}</>
}
