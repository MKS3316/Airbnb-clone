"use client";

import Image from "next/image";
import React from "react";

interface ImageProps{
    img:string | null | undefined
}

const Avatar:React.FC<ImageProps> = ({
    img
}) => {
    return ( 
        <div>
            <Image
            className="rounded-full"
            width={30}
            height={30}
            src={img || "/placeholder.jpg"}
            alt="Avatar"
            />
        </div>
     );
}
 
export default Avatar;