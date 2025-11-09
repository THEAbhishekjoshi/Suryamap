import { memo, useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
 
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";


interface GeoData {
    State: string
    year17: number
    year18: number
    year19: number
    year20: number
    year21: number
    year22: number
}
const geoUrl = "/gadm41_IND_1.json";

const MapChart = () => {

    const [generationData, setGeneartionData] = useState<GeoData[]>([])
    useEffect(() => {
        csv("/solarPowerGeneration.csv").then((countries: any) => {
            setGeneartionData(countries);
        });
    }, []);

    const colorScale: any = scaleQuantile<string>()
        .domain(generationData.map((d: GeoData) => d.year22))
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
                        geographies.map((geo) => {
                            const cur = generationData.find(s => s.State == geo.properties.NAME_1)
                            return (<Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={cur?  colorScale(cur.year22): "#EEE"}
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
