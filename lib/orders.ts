export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
}

/**
 * Calculate the Friday pickup week start date based on an order datetime.
 * Orders placed Monday–Wednesday before 11:59 PM pickup that same week.
 * Orders placed after the cutoff pick up the following Friday.
 */
export function calculatePickupWeekStart(orderDate: Date = new Date()): string {
  const date = new Date(orderDate)
  const day = date.getDay() // 0 = Sunday, 3 = Wednesday
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const isBeforeCutoff =
    day >= 1 &&
    day <= 3 &&
    !(day === 3 && hours === 23 && minutes >= 59)

  const pickupDate = new Date(date)

  if (isBeforeCutoff) {
    pickupDate.setDate(date.getDate() + (5 - day))
  } else {
    let daysUntilNextFriday: number

    switch (day) {
      case 0: // Sunday
        daysUntilNextFriday = 5
        break
      case 4: // Thursday
        daysUntilNextFriday = 8
        break
      case 5: // Friday
        daysUntilNextFriday = 7
        break
      case 6: // Saturday
        daysUntilNextFriday = 6
        break
      default:
        daysUntilNextFriday = (5 - day + 7) % 7 || 7
        break
    }

    pickupDate.setDate(date.getDate() + daysUntilNextFriday)
  }

  pickupDate.setHours(0, 0, 0, 0)
  return pickupDate.toISOString().split('T')[0]
}


