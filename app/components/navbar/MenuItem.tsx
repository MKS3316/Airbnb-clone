"use client";

import React from "react";

interface MenuItemProps{
    label:string,
    onClick:()=>void,
}


const MenuItem:React.FC<MenuItemProps> = ({
    label,
    onClick
}) => {
    return ( 
        <div onClick={onClick} className="hover:bg-neutral-100 px-4 py-3 transition font-semibold">
            {label}
        </div>
     );
}
 
export default MenuItem;