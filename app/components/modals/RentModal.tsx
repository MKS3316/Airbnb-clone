"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/CategoryList";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS{
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5,
}

const RentModal = () => {
    const router=useRouter();
    const rentModal=useRentModal();

    const [isLoading,setIsLoading]=useState(false);
    const [step,setStep]=useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    }=useForm<FieldValues>({
        defaultValues:{
            category:'',
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            imageSrc:'',
            price:1,
            title:'',
            description:''
        }
    });

    const category=watch('category');
    const location=watch('location');
    const guestCount=watch('guestCount');
    const roomCount=watch('roomCount');
    const bathroomCount=watch('bathroomCount');
    const imageSrc=watch('imageSrc');


    const Map=useMemo(()=>dynamic(()=>import("../Map"),{ssr:false}),[location])


    const setCustomValue=(id:string,value:any)=>{
        setValue(id,value,{
            shouldValidate:true,
            shouldTouch:true,
            shouldDirty:true,
        })
    }

    const onBack=()=>{
        setStep((value)=>value-1);
    }

    const onNext=()=>{
        setStep((value)=>value+1);
    }

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        if(step!==STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);

        axios.post('/api/listing',data)
        .then(()=>{
            toast.success("Listing created successfully!!!");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error("Something went wrong...")
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const actionLabel=useMemo(()=>{
        if(step===STEPS.PRICE){
            return 'Create';
        }

        return 'Next';
    },[step]);

    const secondaryActionLabel=useMemo(()=>{
        if(step===STEPS.CATEGORY){
            return undefined;
        }

        return 'Back';
    },[step]);
    
    let bodyContent=(
        <div className="flex flex-col gap-8">
            <Heading
            title="Which of these best describes your place?"
            subtitle="Select Category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item)=>(
                    <CategoryInput
                    label={item.label}
                    key={item.label}
                    icon={item.icon}
                    onClick={(category)=>setCustomValue('category',category)}
                    selected={category===item.label}
                    />
                ))}
            </div>
        </div>
    
    )


    if(step===STEPS.LOCATION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="Please select your Location"
                subtitle="Select a Country"
                />
                <CountrySelect value={location} onChange={(value)=>setCustomValue('location',value)}/>
                <Map 
                center={location?.latlng}
                />
            </div>
        )
    }

    if(step===STEPS.INFO){
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
                onChange={(value)=>setCustomValue('guestCount',value)}
                />
                <Counter
                value={roomCount}
                title={`Rooms`}
                subtitle={`How many rooms do you have?`}
                onChange={(value)=>setCustomValue('roomCount',value)}
                />
                <Counter
                value={bathroomCount}
                title={`Bathrooms`}
                subtitle={`How many bathrooms do you have?`}
                onChange={(value)=>setCustomValue('bathroomCount',value)}
                />
            </div>
        )
    }

    if(step===STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="Please select your Images"
                subtitle="Select image file"
                />
                <ImageUpload
                 value={imageSrc}
                 onChange={(value)=>setCustomValue('imageSrc',value)}
                />
            </div>
        )
    }

    if(step===STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="How would you describe your place?"
                subtitle="Keep it Short and Crisp!!!"
                />
                <Input
                id="title"
                label="Title"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
                />
                <Input
                id="description"
                label="Description"
                required
                disabled={isLoading}
                register={register}
                errors={errors}
                />
            </div>
        )
    }

    if(step===STEPS.PRICE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="Now, set your price"
                subtitle="How much do you charge per night?"
                />
                <Input
                id="price"
                label="Price"
                required
                type="number"
                formatPrice
                disabled={isLoading}
                register={register}
                errors={errors}
                />
            </div>
        )
    }

    return ( 
        <Modal
            title="Airbnb your Home"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step===STEPS.CATEGORY?undefined:onBack}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
     );
}
 
export default RentModal;