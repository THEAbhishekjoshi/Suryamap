import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { solarPowerGenerationContext } from "@/context/SPGenerationContext"
import { YearContext } from "@/context/YearContext"

export default function YearButton() {

  const yearCol = React.useContext(solarPowerGenerationContext)
  const { year, setYear } = React.useContext(YearContext)

  if (!yearCol) {
    throw new Error("useContext(solarPowerGenerationContext) must be used within SolarPowerGenerationProvider")
  }

  const { generationData } = yearCol;
  const itemList = Object.keys(generationData[0] || {});

  React.useEffect(() => {
    if (!year && itemList.length > 0) {
      const validItems = itemList.filter(item => item !== 'State');
      if (validItems.length > 0) {
        setYear(validItems[validItems.length - 1]);
      }
    }
  }, [year, itemList, setYear]);

  return (
    <Select onValueChange={(value) => setYear(value)}>
      <SelectTrigger className="w-[7rem] text-white!">
        <SelectValue placeholder={year} />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          {itemList
            .filter((item) => item !== "State")
            .map((item) => (
              <SelectItem key={item} value={item} >
                {item}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>

  )
}