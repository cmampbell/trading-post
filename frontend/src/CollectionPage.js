import React from "react";
import { useLoaderData } from "react-router";
import CardItem from "./CardItem";
import CardList from "./CardList"

const CollectionPage = () => {
    const cards = useLoaderData()

    return (
        <CardList makeActive={(side)=> true} activeList={'left'} side={'left'}>
            {cards.length > 0 ? cards.map((card, idx) =>
                <CardItem card={card} key={card + idx} ></CardItem>)
                : <h2>No cards found</h2>}
        </CardList>
    )
};

export default CollectionPage;