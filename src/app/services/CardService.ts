import { Card } from "../../types/card"

export async function getAllCards(): Promise<Card[]> {
  try {
    const res = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
    if (!res.ok) {
      throw new Error("Failed to fetch cards")
    }
    const data = await res.json()
    return data.data as Card[]
  } catch (err) {
    console.error("Error fetching cards:", err)
    return []
  }
}

export async function getCardById(id: number): Promise<Card | null> {
  try {
    const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
    if (!res.ok) {
      throw new Error("Failed to fetch card")
    }
    const data = await res.json()
    return data.data[0] as Card | null
  } catch (err) {
    console.error("Error fetching card:", err)
    return null
  }
}

