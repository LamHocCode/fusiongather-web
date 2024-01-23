import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
};
function DropDown({ value, onChangeHandler }: DropDownProps) {
  //   const [category, setCategory] = useState([]);
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field h-14 text-[18px] text-secondary rounded-2xl">
        <SelectValue placeholder="Choose..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Charity">Charity </SelectItem>
        <SelectItem value="Businees">Businees</SelectItem>
        <SelectItem value="Food & Drink">Food & Drink</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default DropDown;
