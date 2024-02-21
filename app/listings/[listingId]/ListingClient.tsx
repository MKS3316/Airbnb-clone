"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SafeListing, SafeReservations, SafeUser } from "../../types";
import Container from "../../components/Container";
import ListingHead from "../../components/listings/ListingHead";
import { Reservation } from "@prisma/client";
import { categories } from "@/app/components/navbar/CategoryList";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";

const initialRange:Range={
    startDate:new Date(),
    endDate:new Date(),
    key:'selection',
}

interface ListingClientProps {
    reservations?: SafeReservations[];
    listing: SafeListing & {user:SafeUser};
    currentUser?: SafeUser | null ;
  }

const ListingClient:React.FC<ListingClientProps> = ({
    reservations=[],
    listing,
    currentUser
}) => {
    const loginModal=useLoginModal();
    const router=useRouter();

    const disabledDates=useMemo(()=>{
        let dates:Date[]=[];

        reservations.forEach((reservation)=>{
            const range=eachDayOfInterval({
                start:new Date(reservation.startDate),
                end:new Date(reservation.endDate),

            });

            dates=[...dates,...range];
            
        })
        return dates;
    },[reservations])

    const [isLoading,setIsLoading]=useState(false);
    const [totalPrice,setTotalPrice]=useState(listing.price);
    const [dateRange,setDateRange]=useState<Range>(initialRange);

    const category=useMemo(()=>{
        return categories.find((item)=>
            item.label===listing.category
        );
    },[listing.category]);    

    const onCreateReservation=useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations',{
            totalPrice,
            startDate:dateRange.startDate,
            endDate:dateRange.endDate,
            listingId:listing?.id,
        })
        .then(()=>{
            toast.success('Reservations Listed!!!');
            setDateRange(initialRange);
            router.push('/trips');
            router.refresh();
        })
        .catch(()=>{
            toast.error("Something went wrong.");
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[currentUser,dateRange.endDate,dateRange.startDate,listing?.id,loginModal,totalPrice,router]);

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount=differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            );

            if(dayCount && listing.price){
                setTotalPrice(dayCount*listing.price);
            }
            else{
                setTotalPrice(listing.price);
            }
        }
    },[dateRange,listing.price]);

    

    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6 ">
                    <ListingHead locationValue={listing.locationValue} title={listing?.title} imageSrc={listing?.imageSrc} id={listing?.id} currentUser={currentUser} />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} description={listing.description} currentUser={currentUser} category={category} locationValue={listing.locationValue}/>
                        <div className="mb-10 order-first md:order-last md:col-span-3">
                        <ListingReservation
                         price={listing.price}
                         onChangeDate={(value)=>setDateRange(value)}
                         onSubmit={onCreateReservation}
                         disabled={isLoading}
                         dateRange={dateRange}
                         disabledDate={disabledDates}
                         totalPrice={totalPrice}
                        />
                        </div>
                        
                    </div>

                    
                </div>
            </div>
        </Container>
     );
}
 
export default ListingClient;