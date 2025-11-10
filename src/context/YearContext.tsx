import React, { createContext, useState } from "react";

interface YearContextType{
    year: string
    setYear : React.Dispatch<React.SetStateAction<string>>
}
export const YearContext = createContext<YearContextType>({year:"",setYear:()=>{} });

export function YearProvider({children}:{children:React.ReactNode}){
    const [year,setYear] = useState("2017-2023");

    return (
            <YearContext.Provider value={{year,setYear}}>
                {children}
            </YearContext.Provider>
    )
}
