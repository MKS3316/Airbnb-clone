"use client";

import {BiSearch} from "react-icons/bi"

const Search = () => {
    return ( 
        <div className="border-[2px] w-full md:w-auto py-2 shadow-sm hover:shadow-md cursor-pointer rounded-full transition">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    Anywhere
                </div>
                <div className="hidden sm:block flex-1 border-x-[1px] text-center text-sm font-semibold px-6">
                    Any Week
                </div>
                <div className="flex flex-row items-center gap-3 text-sm text-gray-600 pr-3 pl-3">
                    <div className="hidden sm:block">Add Guests</div>
                    <div className="p-2 rounded-full bg-rose-500 text-white">
                        <BiSearch size={18}/>
                    </div>

                </div>
            </div>

        </div>
     );
}
 
export default Search;