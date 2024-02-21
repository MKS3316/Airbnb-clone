import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "../Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import React from "react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import { useRouter } from "next/navigation";

interface NavbarProps{
    currentUser?:SafeUser | null ;
}

const  Navbar:React.FC<NavbarProps> = async ({
    currentUser,
}) => {
    
    
    return ( 
        <div className="fixed w-full z-10 bg-white shadow-sm">
            <div className="border-b-2 py-3">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-1">
                        <Logo />
                        <Search/>      
                        <UserMenu currentUser={currentUser}/>
                    </div>
                    
                </Container>
            </div>
            <Categories/>
        </div>
     );
}
 
export default Navbar;