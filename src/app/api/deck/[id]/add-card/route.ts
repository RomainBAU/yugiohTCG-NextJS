import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

type RequestBody = {
  cardId: number;
};

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const deckId = Number(resolvedParams.id);

  if (isNaN(deckId)) {
    return NextResponse.json({ error: "Deck id must be a number" }, { status: 400 });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { cardId } = body;
  if (typeof cardId !== "number" || isNaN(cardId)) {
    return NextResponse.json({ error: "invalid cardId" }, { status: 400 });
  }

  try {
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const cardUIDs: number[] = JSON.parse(deck.cards || "[]");

    if (!cardUIDs.includes(cardId)) {
      cardUIDs.push(cardId);
    }

    const updatedDeck = await prisma.deck.update({
      where: { id: deckId },
      data: { cards: JSON.stringify(cardUIDs) },
    });

    return NextResponse.json({
      id: updatedDeck.id,
      name: updatedDeck.name,
      description: updatedDeck.description,
      cards: cardUIDs, 
    });
  } catch (error) {
    console.error("Add card UID error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}