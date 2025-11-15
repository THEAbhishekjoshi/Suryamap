import { solarPowerGenerationContext, type YearDataProps } from "@/context/SPGenerationContext";
import { YearContext } from "@/context/YearContext";
import React, { memo, useEffect, useRef, useState, type SetStateAction } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";


const geoUrl = "/gadm41_IND_1.json";
interface MapChartProps {
    setTooltipContent: (content: Record<string, string>) => void;
    setSelectedStateInfo: React.Dispatch<React.SetStateAction<Record<string, string>>>
}
const audioUrl = '/ui-pop-sound.mp3'
const aduioUrl2 = '/ui-sound.mp3'

const MapChart: React.FC<MapChartProps> = ({ setTooltipContent, setSelectedStateInfo }) => {
    const { generationData } = React.useContext(solarPowerGenerationContext)
    const { year } = React.useContext(YearContext)

    const audio = useRef<HTMLAudioElement | null>(null);
    const audio2 = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        audio.current = new Audio(audioUrl);
        audio.current.load();
        audio.current.volume=0.3;

        audio2.current = new Audio(aduioUrl2)
        audio2.current.load();
        audio.current.volume=0.5;
    }, []);



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

                className=" w-[600px] h-[600px] relative z-10 "

            >
                <Geographies geography={geoUrl} >
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: { fill: "#E6EFEE", stroke: "#CBD5D8", strokeWidth: 1, outline: "none" },
                                    hover: { fill: "#ff595d", outline: "none" },
                                    pressed: { outline: "none", fill: "" }
                                }}
                                data-tooltip-id="map-tooltip"
                                onClick={() => {
                                    if (audio2.current) {
                                        audio2.current.pause();
                                        audio2.current.currentTime = 0; 
                                        audio2.current.play();
                                    }
                                    setSelectedStateInfo({
                                        State: `${geo.properties.NAME_1}`
                                    })
                                }}
                                onMouseEnter={() => {
                                    if (audio.current) {
                                        audio.current.pause();
                                        audio.current.currentTime = 0; 
                                        audio.current.play();
                                    }

                                    const found = generationData.find(
                                        (d) => d.State === geo.properties.NAME_1
                                    )
                                    const value = found && year in found ? +found[year as keyof YearDataProps] : "N/A";
                                    const val2 = value == "N/A" ? value : value.toFixed(2)

                                    setTooltipContent({
                                        state: `${geo.properties.NAME_1}`,
                                        Generation: `${val2}`,
                                        Year: `${year}`
                                    })
                                }}
                                onMouseLeave={() => {
                                    if (audio.current) {
                                        audio.current.pause();
                                        audio.current.currentTime = 0;
                                    }
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
