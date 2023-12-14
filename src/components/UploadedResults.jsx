import React from 'react';
import logo from '../img/Circle logo.png';
//import { useLocation } from 'react-router-dom'; // Add this line
import { LuRefreshCw } from "react-icons/lu";
import { RiRectangleFill } from "react-icons/ri";
import { useLocation, Link } from 'react-router-dom'; // Add Link from react-router-dom

export const UploadedResults = () => {
  const location = useLocation(); // Add this line
  const imageUrl = location.state?.imageUrl; // Access the passed image source

  return (
   <div className='my-24 md:px-14 px-4 max-w-screen-2xl mx-auto' style={{ backgroundImage: 'url("./img/Background.png")', backgroundSize: 'cover' }}>
    <h1 style={{ textAlign: 'center', color: '#9641E7', fontFamily: 'Nunito', fontSize: '54px', fontWeight: '800' }}>Results</h1>
    <div className='grid grid-cols-2 grid-rows-2 gap-6'>
        {/* Left top div */}
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '600' }} className='col-span-1 row-span-1 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-60 md:h-160 shadow-3x1 p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-white'>
            <div className="flex flex-row items-center">
                <img style={{ height: 150 }} src={logo} alt="" className="mr-5" />
                <div className="text-left flex-grow">
                    <h2 style={{ fontSize: 40 }} className='text-2xl font-semibold text-primary px-5 mb-3'>
                        Hi I'm Molar Support
                    </h2>
                    <p style={{ fontSize: 24 }} className="text-left px-5">
                        Your Assessment Buddy
                    </p>
                </div>
            </div>
        </div>

        {/* Right top div */}
        <div className='col-span-1 row-span-1 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 md:h-564 shadow-3x1 p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-white'>
            <p style={{ fontSize: 20 }} className='text-left text-2xl font-semibold text-primary mb-3 flex items-center'>
                    <RiRectangleFill className="mr-2"  style={{ color: '#9F8FB4', marginRight: '10px' }}/> Mandibular Third Molar
            </p>
            <p style={{ fontSize: 20 }} className='text-left text-2xl font-semibold text-primary mb-3 flex items-center'>
                    <RiRectangleFill className="mr-2"  style={{ color: '#9A6983', marginRight: '10px' }}/> Mandibular Canal
            </p>
            

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 md:w-11/12 mx-auto' style={{ fontFamily: 'Nunito, sans-serif' }}> {/* Modified this line */}
                <ul className='mt-4 space-y-2 px-4' style={{ fontFamily: 'Nunito, sans-serif' }}>
                    <li className='flex gap-3 items-center' >M3-MC Relation:</li>
                    <li className='flex gap-3 items-center'>Position:</li>
                    <li className='flex gap-3 items-center'>Distance between IAN and tooth:</li>
                    <li className='flex gap-3 items-center'>Interruption of Corticalization:</li>
                    <li className='flex gap-3 items-center'>Risk of nerve injury:</li>
                </ul>
            </div>
        </div>

        {/* Left bottom div */}
        <div className='col-span-1 row-span-1 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 md:h-564 shadow-3x1 p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-white'>
          <h2 style={{ fontSize: 40 }} className='text-2xl font-semibold text-primary px-5 mb-3'>
            Image Placeholder
          </h2>
          {imageUrl && <img src={imageUrl} alt="Uploaded File" style={{ width: '100%', height: '100%' }} />}
        </div>

        {/* Right bottom div */}
        <div className='col-span-1 row-span-1 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-60 md:h-139 shadow-3x1 p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-gradient-to-r from-[#6D58C6] to-[#CC76E2]'>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ fontSize: 40 }} className='text-2xl font-semibold text-primary px-5 mb-3 flex items-center'>
              <LuRefreshCw size={70} style={{ color: '#F5F5F7', marginRight: '10px' }} />
              <span style={{ color: '#F5F5F7' }}>Evaluate Another Case</span>
            </h2>
          </Link>
        </div>
    </div>
</div>
  )
}

export default UploadedResults