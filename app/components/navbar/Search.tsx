"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {BiSearch} from "react-icons/bi"

const Search = () => {
    const searchModal=useSearchModal();
    const search=useSearchParams();
    const {getByValues}=useCountries();

    const locationValue=search?.get('locationValue');
    const startDate=search?.get('startDate');
    const endDate=search?.get('endDate');
    const guestCount=search?.get('guestCount');

    const locationLabel=useMemo(()=>{
        if(locationValue){
            return getByValues(locationValue as string)?.label
        }
        return "Anywhere";
    },[getByValues,locationValue]);

    const dateRangeLabel=useMemo(()=>{
        if(startDate && endDate){
            const start=new Date(startDate);
            const end=new Date(endDate);
            let diff=differenceInDays(end,start);

            if(diff===0){
                diff=1;
            }
            return (`${diff} Days`);
        }

        return "Any Week";
    },[startDate,endDate]);

    const guestCountLabel=useMemo(()=>{
        if(guestCount){
            return (`${guestCount} Guests`)
        }

        return "Add Guests";
    },[guestCount])

    return ( 
        <div onClick={searchModal.onOpen} className="border-[2px] w-full md:w-auto py-2 shadow-sm hover:shadow-md cursor-pointer rounded-full transition">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block flex-1 border-x-[1px] text-center text-sm font-semibold px-6">
                    {dateRangeLabel}
                </div>
                <div className="flex flex-row items-center gap-3 text-sm text-gray-600 pr-3 pl-3">
                    <div className="hidden sm:block">{guestCountLabel}</div>
                    <div className="p-2 rounded-full bg-rose-500 text-white">
                        <BiSearch size={18}/>
                    </div>

                </div>
            </div>

        </div>
     );
}
 
export default Search;