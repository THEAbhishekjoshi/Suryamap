import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [solarFile, setSolarFile] = useState<File | null>(null);
  const [capacityFile, setCapacityFile] = useState<File | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        // Store raw CSV in localStorage for later use
        localStorage.setItem(file.name, reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  const proceed = () => {
    // simple flag to indicate custom data is ready
    localStorage.setItem('useCustomData', 'true');
    navigate('/dashboard');
  };

  return (
    <div className=" mx-16 py-4 h-dvh font-poppins">
      <div className='flex flex-row justify-between'>
        <img src='/earth.png' className='w-10' />
        <div className='flex gap-5 items-center'>
          <img src='/github2.png' className='w-8 h-8' />
          <button className='bg-orange-400 text-white px-4 py-2 rounded-md'>Get Started</button>
        </div>

        {/* <div>hearth</div> */}
      </div>

      <div className="mt-16 flex flex-col items-center justify-center ">
        <div className='max-w-[50rem] '>
          {/* <img src="/image.png" alt="" className='w-full h-full object-cover rounded-full' /> */}
          <div className='hover:text-blue-600 text-6xl font-bold  text-orange-400 flex flex-row gap-2 justify-center items-center'>
            <div className=''>Suryamap</div>
            <div className='text-black/70 text-5xl'>-Visualizer</div>
          </div>
          <div className='text-black/70 text-lg font-semibold text-center mt-2 p-2'>Interactive 3D visualization platform for analyzing solar power generation across India</div>
        </div>
      </div>

      <div className='mt-8 flex justify-center'>
        <img src="/demo_dynamic.png" alt="demo1" className='rounded-md w-250 border-1' />
      </div>
    </div>
  );
};

export default Home;
