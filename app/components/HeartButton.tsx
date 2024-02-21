"use client";

import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourites from "../hooks/useFavourites";

interface HeartButtonProps{
    listingId:string;
    currentUser?:SafeUser | null;
}

const HeartButton:React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const {hasFavourited,toggleFavourites}=useFavourites({listingId,currentUser});
    
    return ( 
        <div onClick={toggleFavourites} className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={hasFavourited?'fill-rose-500':'fill-gray-400'}
            />
        </div>
     );
}
 
export default HeartButton;