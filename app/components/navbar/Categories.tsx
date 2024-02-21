"use client";



import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories } from "./CategoryList";



const Categories = () => {
  
  const params=useSearchParams();
  const category=params?.get('category');
  const pathname=usePathname();
  const isMainPage=pathname==='/';

  if(!isMainPage){
    return null;
  }


  return (
    <Container>
      <div className="flex items-center justify-between pt-2 overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category===item.label}/>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
