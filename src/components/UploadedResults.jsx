import React, { useEffect, useState, setError } from "react";
import logo from "../img/Circle logo.png";
import { LuRefreshCw } from "react-icons/lu";
import { RiRectangleFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";

export const UploadedResults = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log("Location:", location.pathname);

    const loadImageSrc = async () => {
      try {
        console.log("Fetching image...");
        const response = await fetch("http://127.0.0.1:8000/result_image");
        console.log("Response status:", response.status);
    
        if (response.ok) {
          // Assuming the response is an image
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else {
          console.error("Server response not OK");
          setError("Error loading image. Please try again.");
        }
      } catch (error) {
        console.error("Error loading image:", error);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (location.pathname === "/UploadedResults") {
      loadImageSrc();
    }
  }, [location.pathname]);

  return (
    <div className="mt-5 md:px-14 px-4 py-10 mx-auto bg-[url('./img/Background.png')] bg-cover">
      <h1 className="text-center text-[#9641E7] font-nunito text-[54px] font-bold mb-10">
        Results
      </h1>
      <div className="flex flex-row justify-center items-start gap-x-10">
        {/* Left top div */}
        <div className="flex flex-col gap-y-[40px] max-w-[820px]">
          <div className="h-[180px] w-[620px] rounded-[35px] shadow-3x1 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 bg-white font-nunito font-semibold">
            <div className="flex flex-row gap-x-2 justify-center items-center p-8">
              <div className="h-[180px] flex justify-center items-center">
                <img src={logo} alt="logo" />
              </div>

              <div className="h-[180px] flex flex-col justify-center items-center text-center">
                <h2 className="text-[40px] font-semibold text-[#23314C]">
                  Hi I'm Molar Support
                </h2>
                <p className="text-[20px]">Your Assessment Buddy</p>
              </div>
            </div>
          </div>

          {/* Left bottom div */}
          <div className="h-[640px] w-[620px] rounded-[35px] shadow-3x1 p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-white">
            {/* Display the result image */}
            <div className="outline-dashed outline-offset-[40px] rounded-[24px] outline-[#23314C]">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <img
                src={imageSrc}
                alt="Result Image"
                className="w-[420px] h-[440px] object-contain"
                onError={(e) => console.error("Error loading image:", e)}
              />
            )}
            </div>
          </div>
        </div>

        <div className="flex flex-col max-w-[820px] gap-y-[40px]">
          {/* Right top div */}
          <div className="w-[680px] h-[580px] rounded-[35px] shadow-3x1 p-8 flex flex-col hover:-translate-y-4 transition-all duration-300 bg-white">
            <div className="flex flex-row gap-x-6 font-nunito text-[#23314C] text-[28px] justify-center mt-20 ">
              <p className="text-left text-2xl font-semibold text-primary mb-3 flex items-center">
                <RiRectangleFill
                  className="mr-2"
                  style={{ color: "#9F8FB4", marginRight: "10px" }}
                />
                Mandibular Third Molar
              </p>
              <p className="text-left text-2xl font-semibold text-primary mb-3 flex items-center">
                <RiRectangleFill
                  className="mr-2"
                  style={{ color: "#9A6983", marginRight: "10px" }}
                />
                Mandibular Canal
              </p>
            </div>

            <div className="mt-8 font-nunito mx-10 text-[20px] font-semibold">
              <ul className="list-none">
                <li className="my-3">M3-MC Relation:</li>
                <li className="my-3">Position:</li>
                <li className="my-3">Distance between IAN and tooth:</li>
                <li className="my-3">Interruption of Corticalization:</li>
                <li className="my-3">Risk of nerve injury:</li>
              </ul>
            </div>
          </div>

          {/* Right bottom div */}
          <div className="w-[680px] h-[120px] rounded-[35px] shadow-3x1 p-4 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-gradient-to-r from-[#6D58C6] to-[#CC76E2]">
            <Link to="/" className="text-white">
              <h2 className="text-[32px] font-semibold text-primary px-5 flex items-center">
                <LuRefreshCw size={50} className="text-[#F5F5F7] mr-[10px]" />
                <span className="text-[#F5F5F7] font-nunito">
                  Evaluate Another Case
                </span>
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedResults;
