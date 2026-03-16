"use client";

import { useMemo, useState } from "react";
import type { Card } from "@/src/types/card";
import Image from "next/image";

interface Props {
    cards: Card[];
}

const CARDS_PER_PAGE = 20;

export default function Card({ cards }: Props) {
    const [page, setPage] = useState(1);

    const maxPage = useMemo(() => {
        return Math.max(1, Math.ceil((cards?.length ?? 0) / CARDS_PER_PAGE));
    }, [cards]);

    const paginatedCards = useMemo(() => {
        if (!cards) return [];
        const start = (page - 1) * CARDS_PER_PAGE;
        return cards.slice(start, start + CARDS_PER_PAGE);
    }, [cards, page]);

    if (!cards || cards.length === 0) {
        return (
            <div className="container">
                <h1 className="text-lg font-semibold">Votre panier est vide</h1>
                <p className="text-sm text-zinc-600">Ajoutez des cartes pour les voir ici.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="text-xl font-semibold mb-4">Cartes dans le panier</h1>

            <div className="row g-4">
                {paginatedCards.map((card) => {
                    const imageUrl = card.card_images?.[0]?.image_url;
                    return (
                        <div className="col-12 col-md-6 col-lg-4" key={card.id}>
                            <div className="card h-100">
                                {imageUrl ? (
                                    <div className="position-relative" style={{ height: 400 }}>
                                        <Image
                                            src={imageUrl}
                                            className="card-img-top object-contain"
                                            alt={card.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                ) : (
                                    <div className="card-img-top bg-zinc-100 h-[400px] flex items-center justify-center text-zinc-400">
                                        Image indisponible
                                    </div>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{card.name}</h5>
                                    {/* <p className="card-text text-sm text-zinc-700">{card.desc}</p> */}
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Type: {card.type}</li>
                                    {card.race ? <li className="list-group-item">Race: {card.race}</li> : null}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                    Page {page} sur {maxPage} ({cards.length} cartes)
                </div>
                <div className="btn-group" role="group" aria-label="Pagination">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                    >
                        Précédent
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setPage((prev) => Math.min(maxPage, prev + 1))}
                        disabled={page === maxPage}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}
