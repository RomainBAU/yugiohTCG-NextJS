export async function fetchAllDecks() {
  try {
    const response = await fetch("/api/deck");
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

export async function fetchDeckById(id: number) {
  try {
    const response = await fetch(`/api/deck/${id}`, {
      method: "GET",
    }); 
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    const deck = await response.json();
    return deck;
  } catch (error) {
    console.error("Client DeckService Error:", error);
    throw error;
  }
}

export async function deleteDeckById(id: number) {
  try {
    const response = await fetch(`/api/deck/${id}`, {
      method: "DELETE",
    }); 
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Client DeckService Error:", error);
    throw error;
  }
}