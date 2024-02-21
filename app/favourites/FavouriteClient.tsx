"use client";

import React from "react";
import { SafeListing, SafeUser } from "../types";
import ClientOnly from "../components/ClientOnly";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";

interface FavouriteClientProps{
    currentUser?:SafeUser | null;
    listings:SafeListing[];
}

const FavouriteClient:React.FC<FavouriteClientProps> = ({
    currentUser,
    listings,
}) => {
    return ( 
        <Container>
            <Heading title="Favourite Listings" subtitle="Properties you have liked."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-28 gap-8">
                {listings.map((listing)=>(
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                    />
                ))}

            </div>
        </Container>
     );
}
 
export default FavouriteClient;