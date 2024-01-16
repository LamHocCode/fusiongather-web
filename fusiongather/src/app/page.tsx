"use client"
import { LogOut } from "@/lib/actions/logout";

const homePage = async () => {
    return (
        <div className="h-full">
            abc
            <button onClick={() => {
                LogOut()
            }}>
                log out
            </button>
        </div>
    );
}

export default homePage;