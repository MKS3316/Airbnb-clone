import { create } from "zustand";

interface SearchModalParams{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}


const useSearchModal=create<SearchModalParams>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))

export default useSearchModal;