import React from "react";
import NeilImage from "../img/neil.png";
import RusImage from "../img/rus.png";
import RodImage from "../img/rod.png";
import PioImage from "../img/pio.png";
import DianneImage from "../img/dianne.png";
import MelvinImage from "../img/melvin.jpg";

const Team = () => {
  return (
    <div className="mt-20 ml-32 py-14 flex flex-col">
      <h1 className="font-nunito text-[#ffffff] font-bold text-[46px] text-center">
        Our Team
      </h1>

      <div className="flex flex-row mt-20 gap-x-[80px] justify-center">
        {/* Team Member 1 Card */}
        <div className="w-[380px] h-[460px] rounded-[35px] hover:-translate-y-4 transition-all duration-300 drop-shadow-2xl bg-white flex flex-col items-center justify-center">
          <img
            src={NeilImage}
            alt="Neil"
            className="object-cover z-5 w-full h-full rounded-[35px]"
          />
          <div className="bottom-4 rounded-[25px] z-10 absolute w-[320px] h-[100px] bg-white">
            <div className="flex flex-col p-2 ml-6 justify-center">
              <p className="font-nunito text-[28px] font-bold text-black">
                Neil Clarence Diaz
              </p>
              <p className="font-nunito text-[20px] text-gray-600 font-semibold">
                Project Manager
              </p>
            </div>
          </div>
        </div>

        <div className="w-[380px] h-[460px] rounded-[35px] hover:-translate-y-4 transition-all duration-300 drop-shadow-2xl bg-white flex flex-col items-center justify-center">
          <img
            src={RusImage}
            alt="Rus"
            className="object-cover z-5 w-full h-full rounded-[35px]"
          />
          <div className="bottom-4 rounded-[25px] z-10 absolute w-[320px] h-[100px] bg-white">
            <div className="flex flex-col p-2 ml-6 justify-center">
              <p className="font-nunito text-[28px] font-bold text-black">
                Russel Yasol
              </p>
              <p className="font-nunito text-[20px] text-gray-600 font-semibold">
                Ai and ML Developer
              </p>
            </div>
          </div>
        </div>

        <div className="w-[380px] h-[460px] rounded-[35px] hover:-translate-y-4 transition-all duration-300 drop-shadow-2xl bg-white flex flex-col items-center justify-center">
          <img
            src={RodImage}
            alt="Rod"
            className="object-cover z-5 w-full h-full rounded-[35px]"
          />
          <div className="bottom-4 rounded-[25px] z-10 absolute w-[320px] h-[100px] bg-white">
            <div className="flex flex-col p-2 ml-6 justify-center">
              <p className="font-nunito text-[28px] font-bold text-black">
                Rod Lester Moreno
              </p>
              <p className="font-nunito text-[20px] text-gray-600 font-semibold">
                Project Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-20 gap-x-[80px] justify-center">
        {/* Team Member 1 Card */}
        <div className="w-[380px] h-[460px] rounded-[35px] hover:-translate-y-4 transition-all duration-300 drop-shadow-2xl bg-white flex flex-col items-center justify-center">
          <img
            src={PioImage}
            alt="Pio"
            className="object-cover z-5 w-full h-full rounded-[35px]"
          />
          <div className="bottom-4 rounded-[25px] z-10 absolute w-[320px] h-[100px] bg-white">
            <div className="flex flex-col p-2 ml-6 justify-center">
              <p className="font-nunito text-[28px] font-bold text-black">
                Pio Lawrence Burgos
              </p>
              <p className="font-nunito text-[20px] text-gray-600 font-semibold">
                Front-end Developer
              </p>
            </div>
          </div>
        </div>

        <div className="w-[380px] h-[460px] rounded-[35px] hover:-translate-y-4 transition-all duration-300 drop-shadow-2xl bg-white flex flex-col items-center justify-center">
          <img
            src={MelvinImage}
            alt="Melvin"
            className="object-cover z-5 w-full h-full rounded-[35px]"
          />
          <div className="bottom-4 rounded-[25px] z-10 absolute w-[320px] h-[100px] bg-white">
            <div className="flex flex-col p-2 ml-6 justify-center">
              <p className="font-nunito text-[28px] font-bold text-black">
                Melvin Saracin
              </p>
              <p className="font-nunito text-[20px] text-gray-600 font-semibold">
                UI and UX Designer
              </p>
            </div>
          </div>
        </div>

        <div className="w-[380px] h-[460px] rounded-[35px] hover:-translate-y-4 transition-all duration-300 drop-shadow-2xl bg-white flex flex-col items-center justify-center">
          <img
            src={DianneImage}
            alt="Dianne"
            className="object-cover z-5 w-full h-full rounded-[35px]"
          />
          <div className="bottom-4 rounded-[25px] z-10 absolute w-[320px] h-[100px] bg-white">
            <div className="flex flex-col p-2 ml-6 justify-center">
              <p className="font-nunito text-[24px] font-bold text-black">
                Dianne Ritz Lapasaran
              </p>
              <p className="font-nunito text-[20px] text-gray-600 font-semibold">
                Paper Writer 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
