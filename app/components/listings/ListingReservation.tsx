"use client";

import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps{
    price:number;
    totalPrice:number;
    dateRange:Range;
    onChangeDate:(value:Range)=>void;
    onSubmit:()=>void;
    disabledDate:Date[];
    disabled?:boolean;
}

const ListingReservation:React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    onChangeDate,
    onSubmit,
    disabledDate,
    disabled,

}) => {
    return ( 
        <div className="bg-white border-[2px] border-neutral-200 overflow-hidden rounded-xl">
            <div className="flex items-center gap-1 p-4">
                <div className="text-xl font-semibold">
                    ${price}
                </div>
                <div className="font-light text-neutral-700">
                    /night
                </div>
            </div>
            <hr />
            <Calendar
            value={dateRange}
            onChange={(value)=>onChangeDate(value.selection)}
            disabledDates={disabledDate}
            />
            <div>
                <Button
                 disabled={disabled}
                 label="Reserve"
                 onClick={onSubmit}
                />
            </div>
            <hr />

            <div className="flex items-center justify-between gap-3 p-4 font-semibold text-xl">
                <div >
                    Total Price:
                </div>
                <div>
                    ${totalPrice}
                </div>
            </div>
        </div>
     );
}
 
export default ListingReservation;