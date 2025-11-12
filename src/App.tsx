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
import QuizBox from './components/QuizBox.tsx';
import TopStatesPanel from './components/TopStatesPanel.tsx';

function App() {

  const [content, setContent] = useState<Record<string, string>>({});

  const [dynamicView, setDynamicView] = useState(true);

  // ---color to pick for tooltip
  // rgb(178, 217, 230)
  // rgb(3, 157, 191)

  return (

    <div className='grid grid-cols-3 gap-[20rem] map-bg '>
      <SolarPowerGenerationProvider>
        <YearProvider>
          {/* Left Pannel */}
          <div className=' flex justify-center '>
            <div className='flex flex-col w-[18rem] items-center gap-5 relative z-10' >
              {/* <div className='bg-[#039dbf]'>Logo/Homepage</div> */}
              <TopStatesPanel />
            </div>
          </div>
          {/* Main Pannel */}
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

            <div className='mr-[10rem] mt-[0.5rem]'>
              <ButtonGroupSep setDynamicView={setDynamicView} />
            </div>
          </div>

          {/* Right Pannel */}
          <div className=' flex justify-center '>
            <div className='flex flex-col w-[18rem] items-center gap-5 relative z-10'>

              {/* YearWise Toggle */}
              <div className='bg-[#039dbf] w-[17rem] mt-3 text-white text-[1rem] rounded-sm flex items-center justify-center  h-[3rem] gap-2'>
                <div className=' flex gap-1 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                  </svg>
                  Select a Year
                </div>
                <YearButton />
              </div>

              {/* Detailed Pannel */}
              <div className='w-[17rem] bg-[#039dbf] h-[25rem] rounded-sm'>
              </div>

              <div className='w-[17rem] h-[10rem] mt-7 bg-[#039dbf] rounded-sm'>
                <QuizBox/>
              </div>
            </div>

          </div>
        </YearProvider>
      </SolarPowerGenerationProvider>

    </div>



  )
}

export default App
