import { csv } from "d3-fetch";
import React, { createContext, useEffect, useState } from "react";


// export interface YearDataProps {
//   State: string;
//   "2017": number;
//   "2018": number;
//   "2019": number;
//   "2020": number;
//   "2021": number;
//   "2022": number;
//   "2017-2023": number;
// }


interface solarPowerGenerationContextProps {
  generationData: Record<string, number>[]
  setGenerationData: React.Dispatch<React.SetStateAction<Record<string, number>[]>>
}

export const solarPowerGenerationContext = createContext<solarPowerGenerationContextProps>({
  generationData: [],
  setGenerationData: () => { }
});

export const SolarPowerGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [generationData, setGenerationData] = useState<Record<string, number>[]>([])

  useEffect(() => {
    csv("/solarPowerGeneration1.csv").
      then((data) => {
        const formattedData: Record<string, number>[] = data.map((d: any) => d)
        setGenerationData(formattedData);
      });
  }, [])


  return (
    <solarPowerGenerationContext.Provider value={{ generationData, setGenerationData }}>
      {children}
    </solarPowerGenerationContext.Provider>
  )
}