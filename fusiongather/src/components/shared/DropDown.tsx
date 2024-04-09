import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategory } from "@/lib/actions/event"; 
import { NextAuthMiddleware } from "next-auth/lib";

type DropDownProps = {
  value?: string;
  initialCategoryId?: number;
  onChangeHandler?: (selectedValue: string) => void; 
};


function DropDown({ value,onChangeHandler, initialCategoryId }: DropDownProps) {
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  
   const onValueChangeHandler = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
    if (onChangeHandler) {
      onChangeHandler(selectedValue);
    }
  };

  return (
    <Select onValueChange={onValueChangeHandler}>
      <SelectTrigger className="select-field h-14 text-[18px] text-secondary rounded-2xl">
        <SelectValue placeholder="Choose..." />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category:any) => (
          <SelectItem key={category.id} value={category.id+ ""} >
            {category.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DropDown;



