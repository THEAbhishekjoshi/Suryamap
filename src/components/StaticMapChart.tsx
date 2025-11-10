import React, { memo} from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
 
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { solarPowerGenerationContext, type YearDataProps } from "@/context/SPGenerationContext";
import { YearContext } from "@/context/YearContext";


const geoUrl = "/gadm41_IND_1.json";

const MapChart = () => {

    const {generationData} = React.useContext(solarPowerGenerationContext)
    const {year} =  React.useContext(YearContext)
    

    const colorScale= scaleQuantile<string>()
        .domain(generationData
           .map((d:YearDataProps) => +d[year as keyof YearDataProps])
           .filter((v)=>!isNaN(v))
        )
        .range([
            "#ffedea",
            "#ffcec5",
            "#ffad9f",
            "#ff8a75",
            "#ff5533",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"
        ])

    return (
        <div
            className="mt-3  w-[600px]"
            style={{
                perspective: "800px",
                transform: "rotateX(45deg) scale(1.5)",
                transformOrigin: "center bottom",
            }}
        >
            <ComposableMap projection="geoMercator"
                projectionConfig={{
                    center: [82, 22],
                    scale: 1400,
                }}

                className=" w-[600px] h-[600px] relative z-10"

            >

                <Geographies geography={geoUrl} >
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const cur:any = generationData.find(s => s.State == geo.properties.NAME_1)
                            return (<Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={cur?  colorScale(cur[year]): "#EEE"}
                                style={{
                                    default: { outline: "none" },
                                   hover: {outline: "none" },
                                    pressed: { outline: "none"}
                                }}
                            />)

                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}

export default memo(MapChart);
