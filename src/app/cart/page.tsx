import CardList from "../components/cardList";
import { getAllCards } from "../services/CardService";

export default async function CartPage() {
    const cards = await getAllCards();

    return (
            <CardList cards={cards} />
    );
}
