"use client"

import { useEffect, useState } from "react"
import { getInventoryCount } from "@/lib/supabase"

export function InventoryCounter() {
  const [count, setCount] = useState(2847) // Default fallback
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCount() {
      try {
        const totalCount = await getInventoryCount()
        setCount(totalCount)
      } catch (error) {
        console.error("Error fetching inventory count:", error)
        // Keep the fallback number
      } finally {
        setLoading(false)
      }
    }

    fetchCount()
  }, [])

  return <>{(count / 1_000_000).toFixed(2)}M</>
}
