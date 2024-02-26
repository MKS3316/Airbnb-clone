import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    try {
        const body = await request.json();

        // Check if any required fields are missing
        const requiredFields = ['title', 'description', 'category', 'location', 'guestCount', 'roomCount', 'bathroomCount', 'imageSrc', 'price'];
        if (requiredFields.some(field => !body[field])) {
            return NextResponse.error();
        }

        const { title, description, category, location, guestCount, roomCount, bathroomCount, imageSrc, price } = body;

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                category,
                locationValue: location.value,
                guestCount,
                roomCount,
                bathroomCount,
                imageSrc,
                price: parseInt(price, 10),
                userId: currentUser.id
            }
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.error();
    }
}
