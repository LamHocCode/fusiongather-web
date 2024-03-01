import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategory } from "@/lib/actions/event"; // Thay đường dẫn đến hàm getAllCategory ở đây

type DropDownProps = {
  value?: string;
  onChangeHandler?: (selectedValue: string) => void; 
};


function DropDown({ value }: DropDownProps) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const onChangeHandler = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  };


  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field h-14 text-[18px] text-secondary rounded-2xl">
        <SelectValue placeholder="Choose..." selected={selectedCategory} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.categoryName}>
            {category.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DropDown;



