"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";
import Heading from "./components/Heading";

interface ErrorStateProps{
    error:Error,
}

const ErrorState:React.FC<ErrorStateProps> = ({error}) => {
    useEffect(() => {
      console.log(error)
    }, [error])
    
    return ( 
        <EmptyState title="Error Occured" subtitle="An error occured while loadind...."/>
     );
}
 
export default ErrorState;