"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

import qs from "query-string";

interface CategoryProps{
    label:string;
    icon:IconType;
    selected?:boolean;
}



const CategoryBox:React.FC<CategoryProps> = ({
    label,
    icon:Icon,
    selected
}) => {

    const router=useRouter();
    const params=useSearchParams();

    const handleClick=useCallback(()=>{
        let currentQuery={};

        if(params){
            currentQuery=qs.parse(params.toString())
        }

        const updatedQuery:any={
            ...currentQuery,
            category:label
        }

        if(params?.get('category')===label){
            delete updatedQuery.category;
        }

        const url=qs.stringifyUrl({
            url:'/',
            query:updatedQuery
        })

        router.push(url);
    },[label,router,params]);

    return ( 
        <div onClick={handleClick} className={`flex flex-col items-center justify-center p-3 gap-2 cursor-pointer transition border-b-2 hover:text-neutral-800 ${selected?'text-neutral-800':'text-neutral-500'} ${selected?'border-b-neutral-800':'border-transparent'}`}>
            <Icon size={26}/>
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
     );
}
 
export default CategoryBox;