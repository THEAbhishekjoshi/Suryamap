import { useState } from 'react'
import MapChart from "./components/DynamicMapChart.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import StaticMapChart from './components/StaticMapChart.tsx';



function App() {

  const [content, setContent] = useState<Record<string, string>>({});

  // ---color to pick for tooltip
  // rgb(178, 217, 230)
  //rgb(3, 157, 191)

  return (

    // --- Dynamic Map Component 
    // <div className='flex items-center justify-center map-bg  h-screen'>
    //   <DynamicMapChart setTooltipContent={setContent}/>
    //   {/* <ReactTooltip id="map-tooltip" place="top" content={content} 
    //   style={{ backgroundColor: "rgb(3, 157, 191)", borderRadius: "10px"}}
    //   className='font-family-ibm '
    //   /> */}
    //   <ReactTooltip  id="map-tooltip" place="top" style={{ backgroundColor: "rgb(3, 157, 191)", borderRadius: "10px"}}
    //   className='font-family-ibm '>
    //     <div>
    //      {content.Generation}
    //     </div>
    //   </ReactTooltip>

    // </div>

    // --- Static Map component
    <div className='flex items-center justify-center map-bg  h-screen'>
      <StaticMapChart></StaticMapChart>

    </div>
  )
}

export default App
