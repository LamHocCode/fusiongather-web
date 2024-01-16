'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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

const Input = ({ label,
    id,
    register,
    required,
    errors,
    type = 'text',
    disabled, width }: InputProps) => {
    return (
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
    );
}

export default Input;
