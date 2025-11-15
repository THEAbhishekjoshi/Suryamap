import { csv } from "d3-fetch";
import React, { createContext, useEffect, useState } from "react";


export interface YearDataProps {
  State: string;
  "2017": number;
  "2018": number;
  "2019": number;
  "2020": number;
  "2021": number;
  "2022": number;
  "2017-2023": number;
}


interface solarPowerGenerationContextProps {
  generationData: YearDataProps[]
  setGenerationData: React.Dispatch<React.SetStateAction<YearDataProps[]>>
}

export const solarPowerGenerationContext = createContext<solarPowerGenerationContextProps>({
  generationData: [],
  setGenerationData: () => { }
});

export const SolarPowerGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [generationData, setGenerationData] = useState<YearDataProps[]>([])

  useEffect(() => {
    csv("/solarPowerGeneration1.csv").
      then((data) => {
        const formattedData: YearDataProps[] = data.map((d: any) => ({
          State: d.State,
          "2017": +d.year17,
          "2018": +d.year18,
          "2019": +d.year19,
          "2020": +d.year20,
          "2021": +d.year21,
          "2022": +d.year22,
          "2017-2023": +d.yearAvg,
        }));
        setGenerationData(formattedData);
      });
  }, []);


  return (
    <solarPowerGenerationContext.Provider value={{ generationData, setGenerationData }}>
      {children}
    </solarPowerGenerationContext.Provider>
  )
}