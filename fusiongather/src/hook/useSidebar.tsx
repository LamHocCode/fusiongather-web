import { createContext, useContext, useState } from "react";

type SidebarContextType = {
    isOpen: boolean,
    handleOpenSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType>({} as SidebarContextType)

interface Props {
    [propName: string]: any
}
export const SidebarContextProvider = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpenSidebar = () => {
        setIsOpen(!isOpen)
    }
    const value = {
        isOpen,
        handleOpenSidebar
    }

    return <SidebarContext.Provider value={value} {...props} />
}

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    return context
}
