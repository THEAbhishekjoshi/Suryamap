import { Button } from "@/components/ui/button"
import {
    ButtonGroup,
} from "@/components/ui/button-group"
import { useState } from "react"

type variantType = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"


export default function ButtonCardGroupSep() {
    const [vaBtn1, setVaBtn1] = useState<variantType>("default")
    const [vaBtn2, setVaBtn2] = useState<variantType>("ghost")
    const [vaBtn3, setVaBtn3] = useState<variantType>("ghost")
    const [vaBtn4, setVaBtn4] = useState<variantType>("ghost")
    const [vaBtn5, setVaBtn5] = useState<variantType>("ghost")
    const [vaBtn6, setVaBtn6] = useState<variantType>("ghost")
    const [vaBtnAvg, setVaBtnAvg] = useState<variantType>("ghost")
    return (
        <ButtonGroup className="" orientation="vertical">
            <Button variant={vaBtn1} size="lg" className={`w-[6vw] h-[3rem] ${vaBtn1 == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtn1 == "ghost") {
                    setVaBtn1("default")
                    setVaBtn2("ghost")
                    setVaBtn3("ghost")
                    setVaBtn4("ghost")
                    setVaBtn5("ghost")
                    setVaBtn6("ghost")
                    setVaBtnAvg("ghost")
                }

            }}>
                2017
            </Button>
            <Button variant={vaBtn2} size="lg" className={`w-[6vw] h-[3rem] ${vaBtn2 == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtn2 == "ghost") {
                    setVaBtn1("ghost")
                    setVaBtn2("default")
                    setVaBtn3("ghost")
                    setVaBtn4("ghost")
                    setVaBtn5("ghost")
                    setVaBtn6("ghost")
                    setVaBtnAvg("ghost")
                }

            }}>
                2018
            </Button>
            <Button variant={vaBtn3} size="lg" className={`w-[6vw] h-[3rem] ${vaBtn3 == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtn3 == "ghost") {
                    setVaBtn1("ghost")
                    setVaBtn2("ghost")
                    setVaBtn3("default")
                    setVaBtn4("ghost")
                    setVaBtn5("ghost")
                    setVaBtn6("ghost")
                    setVaBtnAvg("ghost")
                }

            }}>
                2019
            </Button>
            <Button variant={vaBtn4} size="lg" className={`w-[6vw] h-[3rem] ${vaBtn4 == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtn4 == "ghost") {
                    setVaBtn1("ghost")
                    setVaBtn2("ghost")
                    setVaBtn3("ghost")
                    setVaBtn4("default")
                    setVaBtn5("ghost")
                    setVaBtn6("ghost")
                    setVaBtnAvg("ghost")
                }

            }}>
                2020
            </Button>
            <Button variant={vaBtn5} size="lg" className={`w-[6vw] h-[3rem] ${vaBtn5 == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtn5 == "ghost") {
                    setVaBtn1("ghost")
                    setVaBtn2("ghost")
                    setVaBtn3("ghost")
                    setVaBtn4("ghost")
                    setVaBtn5("default")
                    setVaBtn6("ghost")
                    setVaBtnAvg("ghost")
                }

            }}>
                2021
            </Button>
            <Button variant={vaBtn6} size="lg" className={`w-[6vw] h-[3rem] ${vaBtn6 == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtn6 == "ghost") {
                    setVaBtn1("ghost")
                    setVaBtn2("ghost")
                    setVaBtn3("ghost")
                    setVaBtn4("ghost")
                    setVaBtn5("ghost")
                    setVaBtn6("default")
                    setVaBtnAvg("ghost")
                }

            }}>
                2022
            </Button>
            <Button variant={vaBtnAvg} size="lg" className={`w-[6vw] h-[3rem] ${vaBtnAvg == 'default' ? 'bg-[#039dbf]' : 'bg-[#e5ebe7]'} `} onClick={() => {
                if (vaBtnAvg == "ghost") {
                    setVaBtn1("ghost")
                    setVaBtn2("ghost")
                    setVaBtn3("ghost")
                    setVaBtn4("ghost")
                    setVaBtn5("ghost")
                    setVaBtn6("ghost")
                    setVaBtnAvg("default")
                }
            }}>
                2017-2022
            </Button>
        </ButtonGroup>
    )
}
