'use client'

import ReactDatePicker from "react-datepicker";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors?: FieldErrors
    disabled?: boolean;
    width?: string;
}

const CustomInput = ({ label,
    id,
    register,
    required,
    errors,
    type = 'text',
    disabled, width }: InputProps) => {
    const [dob, setDob] = useState<string>('');
    const [dateString, setDateString] = useState<string>('');
    const handleDateChange = (date: Date) => {
        if(date){
        setDob(date?.toISOString());
        setDateString(date?.toISOString().split('T')[0]);
        } else {
            setDob('');
            setDateString('');
        }
    };
    return (
        <>
            {id && id === 'dob' ? (
             <div className={'w-full relative'}>
                <div className="flex items-center w-full h-full p-2 rounded-xl border border-gray-200">
                    <FaRegCalendarAlt
                        size={24}
                        className="text-primary"
                    />
                    <ReactDatePicker
                        selected={dob === '' ? null : new Date(dob)}
                        onChange={(date: Date) => handleDateChange(date)}                  
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Date of birth (yyyy/MM/dd)"
                        wrapperClassName="datePicker"
                    />
                <input
                    id={id}
                    disabled={disabled}
                    type='text'                 
                    {...register(id, { required })}
                    value={dateString}
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "auto",
                        width: "1px",
                        height: "1px",
                    }}
                />
                </div>
                {errors && errors[id] && <p className="text-sm text-rose-400">{`${errors[id]?.message}`}</p>}
             </div>   
            )
            : (
                <div className={`w-full relative`}>
            <input
                id={id}
                type={type}
                placeholder=""
                autoComplete={'off'}
                disabled={disabled}
                {...register(id, { required })}
                className={`py-2 px-4 pt-6 outline-none  border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed peer text-gray-600 bg-white font-light ${errors && errors[id] ? 'border-rose-400 focus:border-rose-400' : 'border-black focus:border-black'} ${disabled && 'opacity-50 cursor-default'}
                ${width ? width : 'w-full'}
                `}
            />
            {errors && errors[id] && <p className="text-sm text-rose-400">{`${errors[id]?.message}`}</p>}
            <label className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors && errors[id] ? 'text-rose-500' : 'text-secondary'}`}
                htmlFor={id}>{label}
            </label>
        </div >
            )
        }
        </>
    );
}

export default CustomInput;


