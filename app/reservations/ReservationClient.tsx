"use client";

import React, { useCallback, useState } from "react";
import { SafeReservations, SafeUser } from "../types";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../components/Heading";

interface ReservationParams{
    currentUser?:SafeUser | null;
    reservations:SafeReservations[];
}

const ReservationClient:React.FC<ReservationParams> = ({
    reservations,
    currentUser,
}) => {
    const router=useRouter();
    const [deleteId,setDeleteId]=useState('');


    const handleCancel=useCallback((id:string)=>{
        setDeleteId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation cancelled successfully.');
            router.refresh();
        })
        .catch((error)=>{
            toast.error("Something went wrong while Reserving.");
        })
        .finally(()=>{
            setDeleteId('');
        })
    },[router]);

    return ( 
        <Container>
            <Heading title="Reservations" subtitle="Trips you have reserved"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-28 gap-8">
                {reservations.map((reservation)=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    actionLabel="Cancel Reservation"
                    actionId={reservation.id}
                    currentUser={currentUser}
                    reservation={reservation}
                    onAction={handleCancel}
                    disabled={deleteId===reservation.id}
                    />
                ))}
            </div>
        </Container>
     );
}
 
export default ReservationClient;