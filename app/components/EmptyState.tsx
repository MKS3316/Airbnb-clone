"use client";

import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface EmptyStateProps{
    title?:string;
    subtitle?:string;
    showReset?:boolean;
}

const EmptyState:React.FC<EmptyStateProps> = ({
    title="No exact match found.",
    subtitle="Try to change or remove your filter.",
    showReset
}) => {

    const router=useRouter();

    return ( 
        <div className="h-[60vh] flex flex-col gap-2 items-center justify-center">
          <Heading title={title} subtitle={subtitle} center/>
          <div className="w-48 mt-4">
          {showReset && 
            <Button label="Remove all filters" onClick={()=>router.push('/')} outline/>
          }

          </div>
          
          
        </div>
     );
}
 
export default EmptyState;