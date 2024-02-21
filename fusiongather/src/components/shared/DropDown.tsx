import React, { useState } from "react";
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
  onChangeHandler?: () => void; // Thêm prop onChangeHandler vào type DropDownProps
};

const onChangeHandler = async () => {
  
};

function DropDown({ value }: DropDownProps) {
    const categories = await getAllCategory()



  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field h-14 text-[18px] text-secondary rounded-2xl">
        <SelectValue placeholder="Choose..." />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category, index) => (
          <SelectItem key={index} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
        
        }

export default DropDown;
