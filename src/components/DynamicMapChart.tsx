import React, { memo, useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";


interface MapChartProps {
    setTooltipContent: (content: Record<string,string>) => void;
}

type GenerationData = Record<string, number[]>;

const geoUrl = "/gadm41_IND_1.json";

const stateGenUrl = "/solarPowerGeneration.json";

const MapChart: React.FC<MapChartProps> = ({ setTooltipContent }) => {

    const [generationData,setGeneartionData] = useState<GenerationData>({})
    console.log(generationData)

    useEffect(() => {
        fetch(stateGenUrl)
            .then((res) => res.json())
            .then((data:GenerationData) => setGeneartionData(data))
            .catch((error) => console.log(error))
    }, [])

    

    return (
        <div
            className="mt-10  w-[600px]"
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
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: { fill: "#e5ebe7", stroke: "#FFF", strokeWidth: 0.5, outline: "none" },
                                    hover: { fill: "#ff595d", outline: "none" },
                                    pressed: { outline: "none", fill: "" }
                                }}
                                data-tooltip-id="map-tooltip"
                                onMouseEnter={() => {
                                    const str: number[] = generationData[geo.properties.NAME_1] ?? [];
                                    const str1:string = str.reduce((accu,val)=> accu+val,0).toFixed(2)
                                    // setTooltipContent(`${geo.properties.NAME_1}: ${str1}     GWh` );
                                    setTooltipContent({
                                        state: `${geo.properties.NAME_1}`,
                                        Generation:str1
                                    })
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent({});
                                }}
                            />

                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}

export default memo(MapChart);
