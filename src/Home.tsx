import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import TiltCard from './components/TiltImage'
import PixelCard from './components/ui/PixelCard'
import { csvParse } from "d3-dsv"
import { toast } from "sonner"
import validateUploadedCsvFiles from './lib/validateUploadedCsvFiles';
import Loading from './components/common/Loading';


const Home: React.FC = () => {
  const navigate = useNavigate()
  const [solarGenFile, setSolarGenFile] = useState<File | null>(null)
  const [capacityFile, setCapacityFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        const csvText = reader.result as string
        const parsed = csvParse(csvText)
        // console.log("21 parsed", parsed)
        localStorage.setItem(e.target.id === "solarGen" ? "solarGenData" : "solarCapData", JSON.stringify(parsed))
      }
      reader.readAsText(file)
    }
  }

  const proceed = async (flag: boolean) => {
    //flag to indicate custom data
    localStorage.setItem('useCustomData', flag.toString())
    // saving dahboard token
    localStorage.setItem('dashboard_token', import.meta.env.VITE_DASHBOARD_TOKEN)
    if (flag) {
      if (!solarGenFile || !capacityFile) {
        toast.warning("Please upload both the csv files", {
          style: {
            background: "#fb923c",
            color: "#fff",
            border: "1px solid #ea580c",
          },
          position: "top-center"
        })
        return
      }

      setLoading(false)
      const isValid = await validateUploadedCsvFiles()
      setLoading(false)
      if (isValid) {
        navigate('/dashboard')
      }


    }
    navigate('/dashboard')
  }

  return (

    <div className=" mx-16 py-4 font-poppins">
      {loading && <Loading />}
      {/* header-start */}
      <div className='flex flex-row justify-between'>
        {/* header-left-side */}
        <div className='flex'>
          <img src="/leftarrow1.png" alt="" className='w-12 h-12 ' />
          <img src='/earth.png' className='w-12 h-12' />
          <img src="/leftarrow1.png" alt="" className='w-12 h-12 rotate-180 ' />
        </div>

        {/* header-right-side */}
        <div className='flex gap-5 items-center'>
          <img src='/github2.png' className='w-8 h-8' />
          <button className='bg-orange-400 text-white px-4 py-2 rounded-md' onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>Get Started ➜</button>
        </div>

      </div>

      {/* title section */}
      <div className="mt-16 flex flex-col items-center justify-center ">
        <div className='max-w-[50rem] '>
          <div className='hover:text-orange-400/80 text-6xl font-bold  text-orange-400 flex flex-row gap-2 justify-center items-center'>
            <div className=''>Suryamap</div>
            <div className='text-slate-600 text-5xl'>-Visualizer</div>
          </div>
          <div className='text-black/70 text-lg font-semibold text-center mt-2 p-2'>Interactive 3D visualization platform for analyzing solar power generation across India</div>
        </div>
      </div>

      {/* Demo prototype section */}
      <div className='mt-8 flex justify-center'>
        <div className='max-w-250' style={{ perspective: "1000px" }}>
          <TiltCard />
        </div>
      </div>

      {/* Information section */}
      <div className="mt-24 flex justify-center">
        <div className="max-w-250 w-full">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Powerful Solar Analytics
            </h2>

            <p className="mt-3 text-black/60 text-lg">
              Explore, compare and analyze India's solar energy landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Card 1 */}
            <div
              className="
          rounded-2xl
          
          
          p-6
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-orange-400
        "
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                <img src="/map.png" alt="" className='w-8 h-8' />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-orange-500">
                Interactive 3D Map
              </h3>

              <p className="mt-3 text-black/70 leading-6">
                Navigate a fully interactive 3D map of India and explore
                state-wise solar generation data through an immersive visual experience.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="
          rounded-2xl
         
          p-6
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-orange-400
        "
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                <img src="/heatmap.png" alt="" className='w-8 h-8' />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-orange-500">
                Solar Heatmap
              </h3>

              <p className="mt-3 text-black/70 leading-6">
                Visualize solar energy production across states using
                an intuitive heatmap that highlights regional performance.
              </p>
            </div>

            {/* Card 3
            
            border border-orange-200
          bg-gradient-to-br from-orange-50 to-white*/}
            <div
              className="
          rounded-2xl
         
          p-6
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-orange-400
        "
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                <img src="/historical.png" alt="" className='w-8 h-8' />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-orange-500">
                Historical Analytics
              </h3>

              <p className="mt-3 text-black/70 leading-6">
                Explore six years of solar capacity and generation trends
                to understand India's renewable energy growth journey.
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="
          rounded-2xl
         
          p-6
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-orange-400
        "
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
                <img src="/top.png" alt="" className='w-8 h-8' />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-orange-500">
                Top Performing States
              </h3>

              <p className="mt-3 text-black/70 leading-6">
                Compare and discover the leading states in solar energy
                production through ranked performance metrics.
              </p>
            </div>

          </div>
        </div>
      </div>



      {/* Upload section */}
      <div className='flex flex-col items-center mt-10 ' id="upload-section">
        <div className='max-w-250 w-full'>
          <div className='flex flex-col  items-center mb-12'>
            <h1 className='text-4xl font-bold '>Explore Your Data</h1>
            <div className='mt-3 text-black/60 text-lg '>Upload your own solar dataset or start
              instantly using our sample dataset.</div>
          </div>

          <div className='flex flex-row justify-center items-center gap-5 mt-5 mb-12'>
            <PixelCard variant="orange" className='relative bg-black/90'
              gap={5}
              speed={2}
              colors="#f8fafc,#f1f5f9,#cbd5e1"
              noFocus={false}
            >
              <div className='absolute h-full w-full rounded-md text-white flex flex-col justify-between p-5'>
                <div className=''>
                  <div className='font-bold text-center text-lg'>Sample Dataset</div>
                  <div className='text-md text-center mt-2'>Explore and analyze pre-loaded solar data for quick visualization and insights.</div>
                </div>
                <div className='flex flex-col text-center gap-2 '>
                  <a href='/solarPowerGeneration1.csv' target='_blank' rel='noopener noreferrer' className='bg-orange-400 text-white px-4 py-2 rounded-md text-sm'>Download Sample Solar Power Generation CSV</a>
                  <a href='/solar_capacity_statewise_2017_2023.csv' target='_blank' rel='noopener noreferrer' className='bg-orange-400 text-white px-4 py-2 rounded-md text-sm'>Download Sample Solar Capacity CSV</a>
                  <button className='bg-orange-400 text-white px-4 py-2 rounded-md cursor-pointer font-semibold'
                    onClick={() => proceed(false)}>
                    Use Sample Data</button>
                </div>
              </div>
            </PixelCard>
            <PixelCard variant="orange" className='relative bg-black/90'
              gap={5}
              speed={3}
              colors="#fa8302,#f0a04a,#ffaf59"
              noFocus={false}
            >
              <div className='absolute h-full w-full rounded-md text-white flex flex-col justify-between p-5'>
                <div className=''>
                  <div className='font-bold text-center text-lg'>Upload CSV </div>
                  <div className='text-md text-center mt-2'>Import your own dataset and visualize it on the 3D map.</div>
                </div>
                <div className="flex flex-col gap-3">

                  <div className="border-2 border-dashed rounded-lg p-2">
                    <h3 className="mb-4 text-sm font-medium text-center">
                      Solar Power Generation CSV
                    </h3>

                    <input
                      id='solarGen'
                      type="file"
                      accept=".csv"
                      className="w-full text-xs rounded bg-orange-600 p-2"
                      onChange={(e) => handleUpload(e, setSolarGenFile)}
                    />
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-2">
                    <h3 className="mb-4 text-sm font-medium text-center">
                      Solar Capacity Statewise CSV
                    </h3>

                    <input
                      id='solarCap'
                      type="file"
                      accept=".csv"
                      className="w-full text-xs rounded bg-orange-600 p-2"
                      onChange={(e) => handleUpload(e, setCapacityFile)}
                    />
                  </div>

                  <button className="px-4 py-2 rounded-md bg-orange-400 cursor-pointer font-semibold"
                    onClick={() => proceed(true)}>
                    Visualize
                  </button>

                </div>
              </div>
            </PixelCard>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home;
