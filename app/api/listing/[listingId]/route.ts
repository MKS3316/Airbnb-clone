import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IListingsProps{
    listingId?:string
}

export async function DELETE(request: Request,{params}:{params:IListingsProps}){
    const currentUser=await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId}=params;
    if(!listingId || typeof listingId!=='string'){
        throw new Error('Invalid ID');
    }

    const listings=await prisma.listing.deleteMany({
        where:{
            id:listingId,
            userId:currentUser.id,
        }
    });

    return NextResponse.json(listings);



}