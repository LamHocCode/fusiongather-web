    "use client";

    import BoothOfEvent from "@/components/main/BoothOfEvent";
    import { Button } from "@/components/ui/button";
    import { getAllEvent } from "@/lib/actions/event";
    import { getBoothByEventId } from "@/lib/actions/booth"
    import getSession from "@/lib/actions/getSession";
    import Link from "next/link";
    import { FiPlusCircle } from "react-icons/fi";
    import { useState, useEffect } from "react";
    import { BoothType } from "@/lib/type";

    const BoothPage = ({onDelete}: {onDelete: ()=> void}) => {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        Booth in event
                    </div>
                    <Link href={'/event/booth/create'}>
                        <Button type="button" className="min-w-[200px] h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-full hover:bg-primary/20">
                            <FiPlusCircle className="mr-4" />
                            Create Booth
                        </Button>
                    </Link>
                </div>
                <div className="text-secondary mt-4">
    
                        <BoothOfEvent />
                        
 
                    
                </div>
            </div>
        );
    }


    export default BoothPage;