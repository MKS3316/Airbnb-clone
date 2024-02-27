"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {

    const router=useRouter();

    return ( 
        <div  className="cursor-pointer">
            <Image onClick={()=>router.push('/')}
            alt="logo image"
            src={"/logo.png"}
            height={100}
            width={100}
            />
        </div>
     );
}
 
export default Logo;