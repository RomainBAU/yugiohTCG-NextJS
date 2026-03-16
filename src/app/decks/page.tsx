import { Deck } from "@/src/types/deck"

export async function getAllDecks(): Promise<Deck[]> {
  const res = await fetch("/api/deck")
  if (!res.ok) throw new Error("Failed to fetch decks")
  return res.json()
}