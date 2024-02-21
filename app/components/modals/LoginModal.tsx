"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { toast } from "react-hot-toast";
import { FieldValues,SubmitHandler,useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { error } from "console";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginModal = () => {

    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();

    const [isLoading,setIsLoading]=useState(false);

    const router=useRouter();

    const {register,handleSubmit,formState:{errors,}}=useForm<FieldValues>({defaultValues:{ email:"" ,password:"",}});

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect: false,
        }).then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success("Logged in successfully!!!");
                router.refresh();
                loginModal.onClose();

            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const toggle=useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[registerModal,loginModal]);

    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to back!!!" subtitle="Log in to your Account"/>
            <Input id="email" label="Email" disabled={isLoading} errors={errors} register={register} required/>
            <Input id="password" type="password" label="Password" disabled={isLoading} errors={errors} register={register} required/>

        </div>
    );

    const footerContent=(
        <div className="flex flex-col gap-4">
            <hr />
            <Button onClick={()=>signIn('google')} label=" Google" outline icon={FcGoogle} />
            <Button onClick={()=>signIn('github')} label=" Github" outline icon={AiFillGithub} />
            <div className="mt-4 text-center font-light text-neutral-600">
                <div className="flex items-center justify-center gap-2">
                    <div>
                        Dont have an account?
                    </div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Create Account
                    </div>
                </div>
            </div>

        </div>
    );
    

    return ( 
        <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default LoginModal;