"use client";

import React, { useCallback, useState } from "react";
import { SafeReservations, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";

interface TripsClientProps{
    currentUser?:SafeUser|null;
    reservations:SafeReservations[];
}

const TripsClient:React.FC<TripsClientProps> = ({
    currentUser,
    reservations,
}) => {

    const router=useRouter();
    const [deleteId,setDeleteId]=useState('');

    const handleCancel=useCallback((id:string)=>{
        setDeleteId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation deleted successfully.")
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeleteId('');
        })
    },[router]);
    return ( 
        <Container>
            <Heading title="Trips" subtitle="Places you have reserved."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-28 gap-8">
                {reservations.map((reservation)=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    currentUser={currentUser}
                    actionId={reservation.id}
                    actionLabel="Cancel Reservation"
                    onAction={handleCancel}
                    />
                ))}
            </div>
        </Container>
     );
}
 
export default TripsClient;