"use client"

import BoothOfEvent from "@/components/main/BoothOfEvent";
import { getBoothByVendorId } from "@/lib/actions/booth"
import { useState, useEffect } from "react";
import { BoothType } from "@/lib/type";
import VendorBoothOfEvent from "./VendorBoothOfEvent";

const VendorBoothPage = ({user}: {user: number}) => {
    const [booths, setBooths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getBoothByVendorId(user);
            if (response.status === 200) {
              setBooths(response.data);
              setLoading(false);

            } else if (response.status === 404) {
              setBooths([]); 
              setLoading(false);
            } else {
              setError(response.error || "An error occurred while fetching booth data.");
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching booth data:", error);
            setLoading(false);
          }
        };
      
        fetchData();
        console.log(booths);

      }, [user]); 

      return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    Your booth list
                </div>
            </div>
            <div className="text-secondary mt-4">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {booths.length === 0 ? (
                            <div>You currently don't have any booth</div>
                        ) : (
                            <VendorBoothOfEvent booths={booths} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default VendorBoothPage;