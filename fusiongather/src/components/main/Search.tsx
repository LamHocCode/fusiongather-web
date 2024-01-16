"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

const Search = () => {
    const { register, handleSubmit } = useForm<FieldValues>({
        defaultValues: {
            searchValues: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);

    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-secondary hidden sm:flex items-center gap-2 pl-3 pr-1  py-2 rounded-full">
            <IoSearch size="20" />
            <input
                placeholder="What event are you looking for?"
                {...register("searchValues", { required: true })}
                className="xl:min-w-[300px] lg:min-w-[215px] sm:min-w-[210px] min-w-[250px] px-1 bg-secondary rounded-full outline-none text-sm text-secondary" />
        </form>
    );
}

export default Search;