export async function fetchAllDecks() {
  try {
    const response = await fetch("/api/deck"); // Appel à ton API Next.js
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    const decks = await response.json();
    return decks;
  } catch (error) {
    console.error("Client DeckService Error:", error);
    throw error;
  }
}