"use client";

import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";

const Map=dynamic(()=>import('../Map'));

interface ListingInfoProps{
    roomCount:number;
    bathroomCount:number;
    guestCount:number;
    currentUser:SafeUser|null|undefined;
    description:string;
    locationValue:string;
    category:{
        icon:IconType;
        label:string;
        description:string;
    } | undefined;

}

const ListingInfo:React.FC<ListingInfoProps> = ({
    roomCount,
    guestCount,
    bathroomCount,
    category,
    currentUser,
    locationValue,
    description,
}) => {
    const {getByValues}=useCountries();

    const coordinates=getByValues(locationValue)?.latlng;
    return ( 
        <div className="col-span-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center text-lg font-semibold">
                    <div>
                        Hosted by {currentUser?.name}
                    </div>
                    <Avatar img={currentUser?.image}/>
                </div>
                <div className="flex gap-4 items-center font-light text-neutral-600">
                    <div>{guestCount} Guests</div>
                    <div>{roomCount} Rooms</div>
                    <div>{bathroomCount} Bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory label={category.label} description={category.description} icon={category.icon}/>
            )}
            <hr />
            <div className="font-light text-neutral-700">
                {description}
            </div>
            <hr />
            <Map center={coordinates}/>

        </div>
     );
}
 
export default ListingInfo;