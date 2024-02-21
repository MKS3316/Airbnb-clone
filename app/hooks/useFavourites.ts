import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";


interface FavouritesProps{
    listingId:string;
    currentUser?:SafeUser | null;
}

const useFavourites=({listingId,currentUser}:FavouritesProps)=>{
    const router=useRouter();

    const loginModal=useLoginModal();

    const hasFavourited=useMemo(()=>{
        const list=currentUser?.favouritesId || [];

        return list.includes(listingId);
    },[currentUser,listingId]);

    const toggleFavourites=useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }

        try {
            let request;

            if(hasFavourited){
                request=()=>axios.delete(`/api/favourites/${listingId}`);
            }
            else{
                request=()=>axios.post(`/api/favourites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Listing Liked')
            
        } catch (error) {
            toast.error('Favourite not added')
        }
    },[currentUser,hasFavourited,listingId,loginModal,router]);

    return {
        hasFavourited,
        toggleFavourites
    }
}

export default useFavourites;