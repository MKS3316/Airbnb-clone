"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary:any
}

const uploadnewPreset="xfhnsgi5";

interface ImageProps{
    value:string;
    onChange:(value:string)=>void;
}

const ImageUpload:React.FC<ImageProps> = ({
    value,
    onChange
}) => {

    const handleUpload=useCallback((result:any)=>{
        onChange(result.info.secure_url);
    },[onChange])

    return ( 
        <CldUploadWidget onUpload={handleUpload} uploadPreset={uploadnewPreset} options={{maxFiles:1}} >
            {({open})=>{
                return (
                    <div onClick={()=>open?.()} className="flex flex-col gap-4 relative transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 items-center justify-center text-neutral-600 p-20">
                        <TbPhotoPlus size={50}/>
                        <div className="font-medium text-neutral-600 text-xl"> 
                            Upload Image
                        </div>
                        {value && (
                            <div className="absolute h-full w-full inset-0">
                                <Image
                                src={value}
                                alt="Airbnb image"
                                style={{objectFit:'cover'}}
                                fill
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
     );
}
 
export default ImageUpload;