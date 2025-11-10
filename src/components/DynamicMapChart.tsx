import { solarPowerGenerationContext, type YearDataProps } from "@/context/SPGenerationContext";
import { YearContext } from "@/context/YearContext";
import React, { memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";


const geoUrl = "/gadm41_IND_1.json";
interface MapChartProps {
    setTooltipContent: (content: Record<string, string>) => void;
}

const MapChart: React.FC<MapChartProps> = ({ setTooltipContent }) => {
    const genPowerData = React.useContext(solarPowerGenerationContext)
    const { year } = React.useContext(YearContext)

    if (!genPowerData) {
        throw new Error("useContext(solarPowerGenerationContext) must be used within SolarPowerGenerationProvider")
    }
    const { generationData } = genPowerData;

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
                                    default: { fill: "#e5ebe7", stroke: "#FFF", strokeWidth: 0.5, outline: "none" },
                                    hover: { fill: "#ff595d", outline: "none" },
                                    pressed: { outline: "none", fill: "" }
                                }}
                                data-tooltip-id="map-tooltip"
                                onMouseEnter={() => {
                                    const found = generationData.find(
                                        (d) => d.State === geo.properties.NAME_1
                                    )

                                    const value = found && year in found ? +found[year as keyof YearDataProps] : "N/A";
                                    const val2 = value=="N/A" ? value : value.toFixed(2)

                                    setTooltipContent({
                                        state: `${geo.properties.NAME_1}`,
                                        Generation: `${val2}`,
                                        Year: `${year}`
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
