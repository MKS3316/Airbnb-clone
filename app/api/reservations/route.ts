import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request:Request
){
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const body=await request.json();

    const {startDate,endDate,listingId,totalPrice}=body;

    if(!startDate || !endDate || !listingId || !totalPrice){
        return NextResponse.error();
    }

    const listingReservations=await prisma.listing.update({
        where:{
            id:listingId,
        },
        data:{
            reservations:{
                create:{
                    userId:currentUser.id,
                    totalPrice,
                    startDate,
                    endDate
                }
            }

        }
    });

    return NextResponse.json(listingReservations);
}