import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { solarPowerGenerationContext } from "@/context/SPGenerationContext"
import { csv } from "d3-fetch"
import { useContext, useEffect, useState } from "react"



export function DataTable({ selectedState }: { selectedState: string }) {
    const [capData, setCapData] = useState<Record<string, string>[]>([])
    console.log("state:", selectedState)
    const { generationData } = useContext(solarPowerGenerationContext)
  

    useEffect(() => {
        csv('/solar_capacity_statewise_2017_2023.csv')
            .then((data) =>
                setCapData(data)
            )
    }, [])

    const header: string[] = capData.length > 0 ? Object.keys(capData[0]) : []
   
    return (

            <div className={`*:px-2 *:py-8 mb-1 ${selectedState ? 'scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-full':'scrollbar-none'} overflow-x-scroll`}>
            <Table className=" ">
                {/* <TableCaption className="text-white text-left ml-2">{!selectedState ? 'Select A State' : 'Units(MW)'}</TableCaption> */}
                <TableHeader>
                    <TableRow >
                        <TableHead className="*: text-yellow-300">Data (MW)</TableHead>
                        {header
                            .filter((h) => h !== "State")
                            .map((h) => (
                                <TableHead key={h} className="text-black!">{h}</TableHead>
                            ))}
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {
                        generationData
                            .filter((s) => s.State == selectedState)
                            .map((d) => (
                                <TableRow key={d.State} className="text-white">
                                    <TableCell className="text-black">Electricity</TableCell>
                                    <TableCell className="font-medium ">{d["2017"]}</TableCell>
                                    <TableCell>{d["2018"]}</TableCell>
                                    <TableCell>{d["2019"]}</TableCell>
                                    <TableCell>{d["2020"]}</TableCell>
                                    <TableCell>{d["2021"]}</TableCell>
                                    <TableCell>{d["2022"]}</TableCell>

                                </TableRow>

                            ))
                    }
                    {
                        capData
                            .filter((s) => s.State == selectedState)
                            .map((d) => (
                                <TableRow key={d.State} className="text-white">
                                    <TableCell className="text-black">Installed Capacity</TableCell>
                                    <TableCell className="font-medium">{d["2017-18"]}</TableCell>
                                    <TableCell>{d["2018-19"]}</TableCell>
                                    <TableCell>{d["2019-20"]}</TableCell>
                                    <TableCell>{d["2020-21"]}</TableCell>
                                    <TableCell>{d["2021-22"]}</TableCell>
                                    <TableCell>{d["2022-23"]}</TableCell>

                                </TableRow>

                            ))

                    }
                </TableBody>
            </Table>
            </div>


    )
}
