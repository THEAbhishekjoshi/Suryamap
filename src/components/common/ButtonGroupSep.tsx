import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { memo, useState } from "react"

type variantType =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

interface dynamicViewProps {
  setDynamicView: (dynamicView: boolean) => void
}

function ButtonCardGroupSep({ setDynamicView }: dynamicViewProps) {
  const [vaBtn1, setVaBtn1] = useState<variantType>("default")
  const [vaBtn2, setVaBtn2] = useState<variantType>("ghost")

  return (
    <ButtonGroup>
      <Button
        variant={vaBtn1}
        size="lg"
        className={`min-w-[15vw] h-[3rem] ${vaBtn1 == 'default' ? 'bg-[#f6b26b] text-black hover:bg-[#f6b36bab]' : 'bg-[#039dbf] hover:bg-[#039dbfbb]'}`}
        onClick={() => {
          setVaBtn1("default")
          setVaBtn2("ghost")
          setDynamicView(true)
        }}
      >
        Dynamic
      </Button>

      <Button
        variant={vaBtn2}
        size="lg"
        className={`min-w-[15vw] h-[3rem] ${vaBtn2 == 'default' ? 'bg-[#f6b26b] text-black hover:bg-[#f6b36bab]' : 'bg-[#039dbf]  hover:bg-[#039dbfbb]'}`}
        onClick={() => {
          setVaBtn1("ghost")
          setVaBtn2("default")
          setDynamicView(false)
        }}
      >
        Static
      </Button>
    </ButtonGroup>
  )
}

export default memo(ButtonCardGroupSep)
