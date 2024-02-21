"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps{
  currentUser?:SafeUser | null ;
}

const UserMenu:React.FC<UserMenuProps> = ({
  currentUser,
}) => {
  const router=useRouter();
  const registerModal=useRegisterModal();
  const loginModal=useLoginModal();
  const rentModal=useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent=useCallback(()=>{
    if(!currentUser){
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  },[currentUser,rentModal,loginModal])

  return (

    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent} 
          className="hidden md:block py-3 px-4 transition text-sm font-semibold cursor-pointer rounded-full hover:bg-neutral-100"
        >
          Airbnb your Home
        </div>
        <div
          onClick={toggleOpen}
          className="border-[1px] border-neutral-200 rounded-full md:py-1 md:px-2 transition cursor-pointer hover:shadow-md flex flex-row items-center gap-3"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar img={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser?(
              
                <>
                  <MenuItem onClick={()=>{router.push('/trips')}} label="My Trips"/>
                  <MenuItem onClick={()=>{router.push('/favourites')}} label="My Favourites"/>
                  <MenuItem onClick={()=>{router.push('/reservations')}} label="My Reservations"/>
                  <MenuItem onClick={()=>{router.push('/properties')}} label="My Properties"/>
                  <MenuItem onClick={onRent} label="Airbnb my Home"/>
                  <MenuItem onClick={()=>signOut()} label="Logout"/>
                </>
              
            ):(
              
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login"/>
                  <MenuItem onClick={registerModal.onOpen} label="Sign Up"/>
                  <MenuItem onClick={()=>{}} label="Profile"/>
                  <MenuItem onClick={()=>{}} label="Settings"/>
                </>
              
                
              )
}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
