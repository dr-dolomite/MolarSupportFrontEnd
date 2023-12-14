import React from 'react';
import DragAndDrop from './DragandDrop';
import { GoUpload } from 'react-icons/go';
import IMAGES from '../img/images';


function Features() {
  return (

    
    <div
      className='my-24 md:px-14 px-4 max-w-screen-2xl mx-auto'
      style={{ backgroundImage: 'url("./img/Background.png")', backgroundSize: 'cover' }}
    >
      <div className='flex flex-col lg:flex-row justify-between items-start gap-10'>
        {/* Cards */}
        <div className='w-full lg:w-3/4'>
          <div className='grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
            {/* First Card */}
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '600' }} className='col-span-3 md:col-span-1.5 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3x1 p-8items-center flex flex-col justify-center items-start hover:-translate-y-4 transition-all duration-300'>
              <h2 style={{ fontSize: 40 }} className='text-2xl font-semibold text-primary px-5 mb-3'>
                Mandibular Third Molar (M3) Nerve Injury <span className="text-violet-500">Risk Evaluator</span>
              </h2>
              <br />
              <p style={{ fontSize: 24 }} className="text-left px-5">
                Molar Support is an advanced application designed for precise preoperative nerve
                injury risk assessment in mandibular third molar extraction.
              </p>
            </div>


            {/* Second Card */}
            <div className='col-span-1.5 md:col-span-0.75 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-auto shadow-3x1 p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300'>
              <h3 style={{ fontSize: 32 }} className='text-2xl font-semibold text-primary px-5 text-center mt-5'>
                You can try these use cases:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <img src={IMAGES.sample1} alt="Sample 1" />
                <img src={IMAGES.sample2} alt="Sample 2" />
                <img src={IMAGES.sample3} alt="Sample 3" />
                <img src={IMAGES.sample4} alt="Sample 4" />
              </div>
            </div>


            {/* Third Card */}
            <div className='col-span-1.5 md:col-span-0.75 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3x1 p-8items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300
            bg-gradient-to-r from-[#6D58C6] to-[#CC76E2]'>
                <h2 className='text-2xl font-semibold text-primary px-5 text-center mt-5'>
                    <GoUpload size={70} style={{ color: '#F5F5F7' }} /> 
                </h2>
            </div>


          </div>
        </div>

        {/* Right div */}
        <div className='col-span-2 md:col-span-1 border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-100 shadow-3x1 items-center flex justify-center bg-blue-100 hover:-translate-y-4 transition-all duration-300 custom-right-div'>
          <DragAndDrop />
        </div>
      </div>
    </div>
  );
}

export default Features;
