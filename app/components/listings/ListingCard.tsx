"use client";

import getListings from "@/app/actions/getListings";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservations, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import { da } from "date-fns/locale";
import Button from "../Button";

interface ListingProps{
    data:SafeListing;
    reservation?:SafeReservations;
    onAction?:(id:string)=>void;
    actionLabel?:string;
    actionId?:string;
    currentUser?:SafeUser | null;
    disabled?:boolean;
}

const ListingCard:React.FC<ListingProps> = ({
    data,
    reservation,
    onAction,
    actionId="",
    actionLabel,
    disabled,
    currentUser
}) => {
    const router=useRouter();
    

    const {getByValues}=useCountries();
    const location=getByValues(data.locationValue);

    const handleCancel=useCallback(
        (e:React.MouseEvent<HTMLButtonElement>)=>{
            e.stopPropagation();

            if(disabled){
                return;
            }

            onAction?.(actionId);
        },[onAction,actionId,disabled]
    );

    const price=useMemo(()=>{
        if(reservation){
            return reservation.totalPrice;
        }

        return data.price;
    },[reservation,data.price]);

    const reservationDate=useMemo(()=>{
        if(!reservation){
            return null;
        }
        const start=new Date(reservation.startDate);
        const end=new Date(reservation.endDate);

        const newDate=`${format(start,'PP')}-${format(end,'PP')}`;

        return newDate;
    },[reservation]);
    
    return ( 
        <div onClick={()=>{router.push(`/listings/${data.id}`)}} className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="relative aspect-square overflow-hidden w-full rounded-xl">
                    <Image
                    src={data.imageSrc}
                    alt="Listing"
                    fill
                    className="object-cover h-full w-full transition group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region},{location?.label}
                </div>
                <div className="font-light text-gray-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex items-center gap-1">
                    <div className="font-semibold">
                        ${price}
                    </div>
                    {!reservation && (
                        <div className="font-light">
                            /night
                        </div>
                    )}

                </div>
                {onAction && actionLabel && (
                    <Button label={actionLabel} onClick={handleCancel} small disabled={disabled} />
                )}
            </div>

        </div>
     );
}
 
export default ListingCard;