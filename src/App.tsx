import { useState } from 'react'
import DynamicMapChart from "./components/DynamicMapChart.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import StaticMapChart from './components/StaticMapChart.tsx';
import { House, Vault } from 'lucide-react'
import { CalendarDays } from 'lucide-react'

import ButtonGroupSep from './components/common/ButtonGroupSep.tsx'

import YearButton from './components/YearButton.tsx'
import { YearProvider } from './context/YearContext.tsx';
import { SolarPowerGenerationProvider } from './context/SPGenerationContext.tsx';

function App() {

  const [content, setContent] = useState<Record<string, string>>({});

  const [dynamicView, setDynamicView] = useState(true);

  // ---color to pick for tooltip
  // rgb(178, 217, 230)
  // rgb(3, 157, 191)

  return (

    <div className='flex justify-between map-bg'>
       <SolarPowerGenerationProvider>
        <YearProvider>
        <div>Hello</div>
        <div className="flex items-center justify-center  h-screen flex-col font-family-ibm">
          
            {dynamicView ? (
              <>
                <DynamicMapChart setTooltipContent={setContent} />
                <ReactTooltip
                  id="map-tooltip"
                  place="top"
                  style={{ backgroundColor: "rgba(10, 10, 10, 0.7)", borderRadius: "10px" }}
                  className="font-family-ibm"
                >
                  <div className='w-[15rem] h-[6rem] text-slate-300'>
                    <div className='text-[1rem] font-semibold mb-2 border-b-2 border-black/30 flex items-center justify-center gap-1'>
                      <House size={20} />{content.state}
                    </div>
                    <div className="flex flex-col gap-2 pl-3">
                      <div className='flex items-center gap-1'><Vault size={20} />Value: {content.Generation} GW</div>
                      <div className='flex items-center gap-1'><CalendarDays size={20} />Year: {content.Year}</div>
                    </div>
                  </div>
                </ReactTooltip>
              </>
            ) : (
              <StaticMapChart />
            )}
          
          <div className='mr-[12rem] mt-[0.5rem]'>
            <ButtonGroupSep setDynamicView={setDynamicView} />
          </div>
        </div>
        <div>
          <div>
              <YearButton />
          </div>

        </div>
        </YearProvider>
      </SolarPowerGenerationProvider>

    </div>



  )
}

export default App
