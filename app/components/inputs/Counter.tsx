"use client";

import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlinePlusSquare } from "react-icons/ai";

interface CounterProps{
    value:number;
    onChange:(value:number)=>void;
    title:string;
    subtitle:string;
}

const Counter:React.FC<CounterProps> = ({
    value,
    onChange,
    title,
    subtitle,
}) => {

    const onAdd=useCallback(()=>{
        onChange(value+1);
    },[onChange,value])

    const onReduce=useCallback(()=>{
        if(value===1){
            return;
        }
        onChange(value-1)
    },[onChange,value])



    return ( 
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
                <div className="font-semibold">{title}</div>
                <div className="font-light text-neutral-500">{subtitle}</div>
            </div>
            <div className="flex items-center gap-4">
                <div onClick={onReduce} className="flex items-center justify-center h-10 w-10 border-[1px] border-neutral-400 rounded-full text-black cursor-pointer hover:opacity-80 transition">
                    <AiOutlineMinus/>
                </div>
                <div className="font-light text-neutral-800 text-xl">{value}</div>
                <div onClick={onAdd} className="flex items-center justify-center h-10 w-10 border-[1px] border-neutral-400 rounded-full text-black cursor-pointer hover:opacity-80 transition">
                    <AiOutlinePlus/>
                </div>
            </div>

        </div>
     );
}
 
export default Counter;