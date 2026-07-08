import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import TiltCard from './components/TiltImage'
import PixelCard from './components/ui/PixelCard.jsx'
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
    setLoading(true)
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

      const isValid = await validateUploadedCsvFiles()
      setLoading(false)
      if (isValid) {
        navigate('/dashboard')
      }


    }
    setLoading(false)
    navigate('/dashboard')
  }

  return (

    <div className="font-poppins ">
      {loading && <Loading />}

      <div className='md:mx-16 py-4 px-2 '>
        {/* header-start */}
        <div className='flex items-center'>
          {/* header-left-side */}
          <div className='flex flex-row justify-between  w-full'>
            <div className='flex'>
              <img src="/leftarrow1.png" alt="" className='w-8 h-8 lg:w-12 lg:h-12' />
              <img src='/earth.png' className='w-8 h-8 lg:w-12 lg:h-12' />
              <img src="/leftarrow1.png" alt="" className='w-8 h-8 lg:w-12 lg:h-12 rotate-180 ' />
            </div>

            {/* header-right-side */}
            <div className='flex gap-2 md:gap-3 lg:gap-5 items-center'>
              <a href="https://github.com/THEAbhishekjoshi/Suryamap" target='_blank' rel='noopener noreferrer'>
                <img src='/github2.png' className='w-6 h-6 lg:w-8 lg:h-8' />
              </a>
              <button className='bg-orange-400 hover:bg-orange-500 transition-colors duration-200 cursor-pointer text-white px-2 py-2 lg:px-4 lg:py-2 rounded-md text-xs md:text-sm lg:text-md ' onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>Get Started ➜</button>
            </div>
          </div>

        </div>

        {/* title section */}
        <div className="mt-20 lg:mt-16 flex flex-col items-center justify-center ">
          <div className='max-w-3xl'>
            <div className='hover:text-orange-500 transition-colors duration-200 font-bold  text-orange-400 flex flex-row gap-2 justify-center items-center'>
              <div className='text-3xl md:text-4xl lg:text-6xl font-extrabold'>Suryamap</div>
              <div className='text-slate-600 text-xl md:text-2xl lg:text-4xl mt-2'>-Visualizer</div>
            </div>
            <div className='text-black/70 text-sm md:text-lg font-semibold text-center mt-2 p-2'>Interactive 3D visualization platform for analyzing solar power generation across India</div>
          </div>
        </div>

        {/* Demo prototype section */}
        <div className='mt-10 md:mt-8 flex justify-center p-5 md:p-0'>
          <div className='max-w-5xl shadow-2xl ' style={{ perspective: "1000px" }}>
            <TiltCard />
          </div>
        </div>

        {/* Information section */}
        <div className="mt-24 lg:mt-32 flex justify-center">
          <div className="max-w-5xl w-full">

            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold">
                Powerful Solar Analytics
              </h2>

              <p className="mt-3 text-black/60 text-sm md:tex-md lg:text-lg">
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

                <h3 className="mt-5  text-md md:text-lg lg:text-xl font-semibold text-orange-500">
                  Interactive 3D Map
                </h3>

                <p className="mt-3 text-black/70 leading-6 text-sm md:text-md lg:text-lg">
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

                <h3 className="mt-5  text-md md:text-lg lg:text-xl font-semibold text-orange-500">
                  Solar Heatmap
                </h3>

                <p className="mt-3 text-black/70 leading-6 text-sm md:text-md lg:text-lg">
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

                <h3 className="mt-5  text-md md:text-lg lg:text-xl font-semibold text-orange-500">
                  Historical Analytics
                </h3>

                <p className="mt-3 text-black/70 leading-6 text-sm md:text-md lg:text-lg">
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

                <h3 className="mt-5 text-md md:text-lg lg:text-xl font-semibold text-orange-500">
                  Top Performing States
                </h3>

                <p className="mt-3 text-black/70 leading-6 text-sm md:text-md lg:text-lg">
                  Compare and discover the leading states in solar energy
                  production through ranked performance metrics.
                </p>
              </div>

            </div>
          </div>
        </div>



        {/* Upload section */}
        <div className='flex flex-col items-center mt-12 ' id="upload-section">
          <div className='max-w-5xl w-full'>
            <div className='text-center mb-12'>
              <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>Explore Your Data</h1>
              <div className='mt-3 text-sm md:tex-md lg:text-lg'>Upload your own solar dataset or start
                instantly using our sample dataset.</div>
            </div>

            <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-5 mb-12'>
              <PixelCard variant="orange" className='relative bg-black/90'
                gap={5}
                speed={2}
                colors="#f8fafc,#f1f5f9,#cbd5e1"
                noFocus={false}
              >
                <div className='absolute h-full w-full rounded-md text-white flex flex-col justify-between p-5'>
                  <div className='text-center'>
                    <div className='font-bold text-center  text-md md:text-lg lg:text-xl'>Sample Dataset</div>
                    <div className='text-xs md:text-sm lg:text-md text-center mt-2'>Explore and analyze pre-loaded solar data for quick visualization and insights.</div>
                  </div>
                  <div className='flex flex-col text-center gap-2 flex flex-col gap-3 text-xs md:text-sm lg:text-md '>
                    <a href='/solarPowerGeneration1.csv' target='_blank' rel='noopener noreferrer' className='bg-orange-400 text-white px-4 py-2 rounded-md '>Download Sample Solar Power Generation CSV</a>
                    <a href='/solar_capacity_statewise_2017_2023.csv' target='_blank' rel='noopener noreferrer' className='bg-orange-400 text-white px-4 py-2 rounded-md '>Download Sample Solar Capacity CSV</a>
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
                  <div className='text-center'>
                    <div className='font-bold text-center  text-md md:text-lg lg:text-xl'>Upload CSV </div>
                    <div className='text-xs md:text-sm lg:text-md text-center mt-2'>Import your own dataset and visualize it on the 3D map.</div>
                  </div>
                  <div className="flex flex-col gap-3 text-xs md:text-sm lg:text-md">

                    <div className="border-2 border-dashed rounded-lg p-2  text-center">
                      <h3 className="mb-4  font-medium text-center">
                        Solar Power Generation CSV
                      </h3>

                      <input
                        id='solarGen'
                        type="file"
                        accept=".csv"
                        className="w-full  rounded bg-orange-600 p-2"
                        onChange={(e) => handleUpload(e, setSolarGenFile)}
                      />
                    </div>

                    <div className="border-2 border-dashed rounded-lg p-2">
                      <h3 className="mb-4  font-medium text-center">
                        Solar Capacity Statewise CSV
                      </h3>

                      <input
                        id='solarCap'
                        type="file"
                        accept=".csv"
                        className="w-full rounded bg-orange-600 p-2"
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

          </div >
        </div >
      </div >
    </div >
  )
}

export default Home;
