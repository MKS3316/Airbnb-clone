import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps{
    title:string;
    locationValue:string;
    imageSrc:string;
    id:string;
    currentUser?:SafeUser | null;
}

const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser,
}) => {

    const {getByValues}=useCountries();

    const location=getByValues(locationValue);

    return ( 
        <>
            <Heading title={title} subtitle={`${location?.label}, ${location?.region}`}/>
            <div className="w-full h-[60vh] rounded-xl relative overflow-hidden">
                <Image
                src={imageSrc}
                alt="Listing Image"
                fill
                className="object-cover w-full"
                />
                <div className="absolute top-3 right-3">
                    <HeartButton listingId={id} currentUser={currentUser}/>
                </div>

            </div>
            
        </>
     );
}
 
export default ListingHead;