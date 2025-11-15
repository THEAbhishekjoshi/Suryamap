import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { solarPowerGenerationContext, type YearDataProps } from "@/context/SPGenerationContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
interface DataGraphProps {
    selectedState: string,
    dataType: string
}
const DataGraph = ({ selectedState, dataType }: DataGraphProps) => {
    const [capData, setCapData] = useState<Record<string, string>[]>([]);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "yellow" },
                grid: { color: "rgb(15, 15, 15,0.4)" },
            },
            y: {
                ticks: { color: "yellow" },
                grid: { color: "rgba(15, 15, 15,0.4)" },
            },
        },
    };

    useEffect(() => {
        csv("/solar_capacity_statewise_2017_2023.csv").then((data) => setCapData(data));
    }, []);


    let yearList: string[]
    let dataList: number[] = []
    if (dataType === "Capacity") {


        yearList = capData.length ? Object.keys(capData[0]).filter((k) => k !== "State") : []
        const stateRow = capData.find((s) => s.State === selectedState)
        dataList = stateRow ? yearList.map((y) => +stateRow[y]) : []

    }
    else {
        const { generationData } = useContext(solarPowerGenerationContext)
        yearList = generationData.length ? Object.keys(generationData[0]).filter((k) => k !== "State") : [" "]
        const stateRow = generationData.find((s) => s.State === selectedState)
        dataList = stateRow ? yearList.map((y) => +stateRow[y as keyof YearDataProps]) : []


    }

    const lineData = {
        labels: yearList,
        datasets: [
            {
                label: `${selectedState} Capacity (MW)`,
                data: dataList,
                fill: false,
                borderColor: "rgb(235, 207, 52)",
                backgroundColor: "rgb(252, 252, 247)",
                tension: 0.2,
            },
        ],
    };

    return (
        <div className="w-full h-full" >
            <Line data={lineData} options={options} />
        </div >
    )
};

export default DataGraph;
