import React, { useState } from 'react'
import { DataTable } from './common/DataTable'
import DataGraph from './DataGraph'
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FileText } from 'lucide-react'

export interface StateProps {
  selectedStateInfo: Record<string, string>
}
const DetailedInfoPanel: React.FC<StateProps> = ({ selectedStateInfo }) => {

  return (

    <div className="mt-5">
      <div className='text-white border-b font-semibold border-white/20  pb-2 mb-4 '>
        <div className='flex gap-1 justify-center'>
          <FileText className='text-yellow-300'/>
          Detailed Information
        </div>
      </div>
      <div className='text-white ml-2 mb-2 font-semibold '>State: <span className='text-yellow-300 hover:text-white'>{selectedStateInfo.State}</span></div>
      <div className='bg-white/10 rounded-md p-3 backdrop-blur-sm hover:bg-white/20 transition-colors h-75 mx-1'>
        <Tabs defaultValue="Table" className=''>
          <div className="flex items-center justify-center w-full">
            <TabsList className='w-50'>
              <TabsTrigger value="Table">Table</TabsTrigger>
              <TabsTrigger value="Graph">Graph</TabsTrigger>
            </TabsList>
          </div>

          <div className="">
            <TabsContent value="Table" className='border border-white/30 rounded-sm mt-3 bg-white/20 ' >
              <DataTable selectedState={selectedStateInfo.State} />
            </TabsContent>
          </div>
          <TabsContent value="Graph">
            <Tabs defaultValue="Electricity">
              <div className=''>
                <TabsContent value="Electricity" className='h-50'>
                  <DataGraph selectedState={selectedStateInfo.State} dataType="Electricity" />
                </TabsContent>

                <TabsContent value="Capacity" className='h-50'>
                  <DataGraph selectedState={selectedStateInfo.State} dataType="Capacity" />
                </TabsContent>
              </div>

              <div className='flex items-center justify-center w-full'>
                <TabsList className='h-7' >
                  <TabsTrigger value="Electricity" className=''>Elect.</TabsTrigger>
                  <TabsTrigger value="Capacity" className=''>Capac.</TabsTrigger>
                </TabsList>
              </div>


            </Tabs>
          </TabsContent>
        </Tabs>





      </div>
    </div>

  )
}

export default DetailedInfoPanel