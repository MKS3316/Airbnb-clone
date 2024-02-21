import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/app/libs/prismadb";
import { json } from "stream/consumers";

export async function POST (request:Request){

    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error;
    }

    const body=await request.json();

    const {
        title,
        description,
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,

    }=body;

    const listing=await prisma.listing.create({
        data:{
            title,
            description,
            category,
            locationValue:location.value,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price:parseInt(price,10),
            userId:currentUser.id
        }
    });

    return NextResponse.json(listing);
}