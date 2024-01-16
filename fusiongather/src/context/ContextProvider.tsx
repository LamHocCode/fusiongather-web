"use client"

import { SidebarContextProvider } from "@/hook/useSidebar";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {


    return (
        <SidebarContextProvider>
            {children}
        </SidebarContextProvider>
    );
};

export default ContextProvider;