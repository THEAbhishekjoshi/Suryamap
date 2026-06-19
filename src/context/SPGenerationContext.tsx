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
  yearKeys: string[],
  setGenerationData: React.Dispatch<React.SetStateAction<Record<string, number>[]>>
}

export const solarPowerGenerationContext = createContext<solarPowerGenerationContextProps>({
  generationData: [],
  yearKeys: [],
  setGenerationData: () => { }
});

export const SolarPowerGenerationProvider = ({ children }: { children: React.ReactNode }) => {
  const [generationData, setGenerationData] = useState<Record<string, number>[]>([])
  const [yearKeys, setYearKeys] = useState<string[]>([])

  useEffect(() => {
    const localData = localStorage.getItem("solarGenData")
    const hasCustomData = localStorage.getItem("useCustomData") === "true"
    if (localData && hasCustomData) {
      const parsedData = JSON.parse(localData)
      setGenerationData(parsedData)
      setYearKeys(Object.keys(parsedData[0] || {})
        .filter((key: any) => key !== 'State' && key !== 'Total' && (key.split('-')[1] - key.split('-')[0]) == 1)
        .sort())

      // console.log("43 using custom data")

    } else {
      console.log("46 using sample csv")
      csv("/solarPowerGeneration1.csv")
        .then((data) => {
          const formattedData: Record<string, number>[] = data.map((d: any) => d)
          setGenerationData(formattedData)
          setYearKeys(Object.keys(formattedData[0] || {})
            .filter((key: any) => key !== 'State' && key !== 'Total' && (key.split('-')[1] - key.split('-')[0]) == 1)
            .sort())
        })
    }
  }, [])


  return (
    <solarPowerGenerationContext.Provider value={{ generationData, yearKeys, setGenerationData }}>
      {children}
    </solarPowerGenerationContext.Provider>
  )
}