import { NextRequest,NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { off } from "process";
import { error } from "console";

interface IParams{
    listingId?:string;
}


export async function POST(
    request:Request,
    {params}:{params:IParams}
){
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId}=params;

    if(!listingId || (typeof listingId!=='string')){
        throw new Error('Invalid ID');
    }

    let favouritesId=[...(currentUser.favouritesId || [])];

    favouritesId.push(listingId);

    const user=await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favouritesId
        },
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request:Request,
    {params}:{params:IParams}
){
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} =params;

    if(!listingId || (typeof listingId!=='string')){
        throw new Error('Invalid ID');
    }

    let favouritesId=[...(currentUser.favouritesId || [])];

    //This deletes the the listingId from the user's favouritesId Array
    favouritesId=favouritesId.filter((id)=>id!==listingId);

    const user=await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favouritesId
        }
    });

    return NextResponse.json(user);

}