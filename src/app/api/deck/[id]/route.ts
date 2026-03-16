import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const deckId = Number(resolvedParams.id);

  if (Number.isNaN(deckId)) {
    return NextResponse.json(
      { error: "Deck id must be a number, params.id: " + resolvedParams.id },
      { status: 400 }
    );
  }

  try {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });

    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const deckResponse = {
      id: deck.id,
      name: deck.name,
      description: deck.description,
      cards: JSON.parse(deck.cards || "[]"),
    };

    return NextResponse.json(deckResponse);
  } catch (error) {
    console.error("GET deck error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const deckId = Number(resolvedParams.id);

  if (Number.isNaN(deckId)) {
    return NextResponse.json(
      { error: "Deck id must be a number, params.id: " + resolvedParams.id },
      { status: 400 }
    );
  }

  try {
    const deck = await prisma.deck.delete({
      where: { id: deckId },
    });

    return NextResponse.json(deck);
  } catch (error) {
    console.error("DELETE deck error:", error);
    return NextResponse.json(
      { error: "Deck not found or deletion failed" },
      { status: 500 }
    );
  }
}