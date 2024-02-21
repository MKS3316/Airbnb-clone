"use client";

import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesProps{
    currentUser?:SafeUser | null;
    listings:SafeListing[];
}


const PropertiesClient:React.FC<PropertiesProps> = ({currentUser,listings}) => {
    const router=useRouter();
    const [deleteId,setDeleteId]=useState('');

    const onDelete=useCallback((id:string)=>{
        setDeleteId(id);
        axios.delete(`/api/listing/${id}`)
        .then(()=>{
            toast.success("Listing Deleted");
            router.refresh();
        })
        .catch((error)=>{
            toast.error("Something went wrong");
        })
        .finally(()=>{
            setDeleteId('');
        })
    },[router]);
    return ( 
        <Container>
            <Heading title="Properties" subtitle="List of your properties"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-28 gap-8">
                {listings.map((listing)=>(
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    actionLabel="Delete Property"
                    actionId={listing.id}
                    onAction={onDelete}
                    currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
);
}
 
export default PropertiesClient;