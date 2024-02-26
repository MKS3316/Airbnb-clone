"use client";

import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import { formatISO } from "date-fns";

enum STEPS{
    lOCATION=0,
    DATE=1,
    INFO=2,
}

const SearchModal = () => {
    const router=useRouter();
    const searchModal=useSearchModal();
    const params=useSearchParams();

    const [steps,setSteps]=useState(STEPS.lOCATION);
    const [location,setLocation]=useState<CountrySelectValue>();
    const [guestCount,setGuestCount]=useState(1);
    const [roomCount,setRoomCount]=useState(1);
    const [bathroomCount,setBathroomCount]=useState(1);
    const [dateRange,setDateRange]=useState<Range>({
        startDate:new Date(),
        endDate:new Date(),
        key:'selection'
    });

    const Map=useMemo(()=>dynamic(()=>import('../Map'),{ssr:false}),[location]);

    const onNext=useCallback(()=>{
        setSteps((value)=>value+1);
    },[]);

    const onBack=useCallback(()=>{
        setSteps((value)=>value-1);
    },[]);

    const onSubmit=useCallback(async()=>{

        if(steps!==STEPS.INFO){
            return onNext();
        }

        let currentQuery={};
        if(params){
            currentQuery=qs.parse(params.toString());
        }

        const updatedQuery:any={
            ...currentQuery,
            locationValue:location?.value,
            roomCount,
            guestCount,
            bathroomCount,
        };

        if(dateRange.startDate){
            updatedQuery.startDate=formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updatedQuery.endDate=formatISO(dateRange.endDate)
        }

        const url=qs.stringifyUrl({
            url:'/',
            query:updatedQuery,

        },{skipNull:true});

        setSteps(STEPS.lOCATION);
        router.push(url);
        searchModal.onClose();


    },[dateRange,bathroomCount,guestCount,roomCount,location,onNext,router,params,searchModal,steps]);

    const actionLabel=useMemo(()=>{
        if(steps!==STEPS.INFO){
            return "Next";
        }
        return "Submit";
    },[steps]);

    const secondaryActionLabel=useMemo(()=>{
        if(steps===STEPS.lOCATION){
            return undefined;
        }
        return "Back";
    },[steps]);

    let bodyContent=(
        <div className="flex flex-col gap-8">
            <Heading title="Select Country" subtitle="Explore the World." />
            <CountrySelect value={location} onChange={(value)=>setLocation(value as CountrySelectValue)}/>
            <hr />
            <Map center={location?.latlng}/>
        </div>
    )

    if(steps===STEPS.DATE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading title="When are you planning to go?" subtitle="Make sure your homies are free."/>
                <Calendar onChange={(value)=>setDateRange(value.selection)} value={dateRange}/>
            </div>
        )
    }

    if(steps===STEPS.INFO){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="Share some basics about your place"
                subtitle="What amenitis do you have?"
                />
                <Counter
                value={guestCount}
                title={`Guests`}
                subtitle={`How many guests do you allow?`}
                onChange={(value)=>setGuestCount(value)}
                />
                <Counter
                value={roomCount}
                title={`Rooms`}
                subtitle={`How many rooms do you have?`}
                onChange={(value)=>setRoomCount(value)}
                />
                <Counter
                value={bathroomCount}
                title={`Bathrooms`}
                subtitle={`How many bathrooms do you have?`}
                onChange={(value)=>setBathroomCount(value)}
                />
            </div>
        )
    }


    return ( 
        <Modal
         isOpen={searchModal.isOpen}
         onClose={searchModal.onClose}
         onSubmit={onSubmit}
         secondaryAction={steps===STEPS.lOCATION?undefined:onBack}
         title="Filters"
         actionLabel={actionLabel}
         secondaryActionLabel={secondaryActionLabel}
         body={bodyContent}
        />
     );
}
 
export default SearchModal;