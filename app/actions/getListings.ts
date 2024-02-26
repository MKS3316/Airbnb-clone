
import prisma from "@/app/libs/prismadb";

export interface IListingsParams{
    userId?:string;
    category?:string;
    roomCount?:number;
    guestCount?:number;
    bathroomCount?:number;
    locationValue?:string;
    startDate?:string;
    endDate?:string;
}

export default async function getListings(
    params:IListingsParams
){
    try {
        const {
            userId,
            category,
            roomCount,
            guestCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
        }=params;
        let query:any={};
        if(userId){
            query.userId=userId
        }

        if(category){
            query.category=category
        }

        if(locationValue){
            query.locationValue=locationValue
        }

        if(roomCount){
            query.roomCount={
                gte:+roomCount
            }
        }

        if(guestCount){
            query.guestCount={
                gte:+guestCount
            }
        }

        if(bathroomCount){
            query.bathroomCount={
                gte:+bathroomCount
            }
        }

        if(startDate && endDate){
            query.NOT={
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate:{gte:startDate},
                                startDate:{lte:startDate},
                            },
                            {
                                endDate:{gte:endDate},
                                startDate:{lte:endDate},
                            }
                        ]
                    }
                }
            }
        }


        const listings=await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt:"desc"
            }
        });

        const safeListings=listings.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error:any) {
        throw new Error(error)
    }
}