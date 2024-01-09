import React, { useEffect, useState } from "react";
import logo from "../img/Circle logo.png";
import cortiTooth from "../img/cortiTooth.png";
import positionLogo from "../img/positionLogo.png";
import distanceLogo from "../img/distanceLogo.png";
import { LuRefreshCw } from "react-icons/lu";
import { RiSquareFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";

export const UploadedResults = () => {
  const [ImageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const [position, setPosition] = useState(null);
  const [interruption, setInterruption] = useState(null);
  const [relation, setRelation] = useState(null);
  const [risk, setRisk] = useState(null);
  const [distance, setDistance] = useState(null);

  const [error, setError] = useState(null); // New state for the error

  const [postPosition, setPostPosition] = useState(null);
  const [postInterruption, setPostInterruption] = useState(null);

  useEffect(() => {
    console.log("Location:", location.pathname);

    const loadImageSrc = async () => {
      try {
        console.log("Fetching image...");
        const response = await fetch("http://127.0.0.1:8000/result_image");
        console.log("Response status:", response.status);

        if (response.ok) {
          // Assuming the response is an image
          //const blob = await response.blob();
          const originalImageUrl = "http://127.0.0.1:8000/result_image";
          const url = `${originalImageUrl}?timestamp=${new Date().getTime()}`;
          setImageSrc(url);

          // Make predictions by calling the API endpoints
          const responseInterruption = await fetch(
            "http://127.0.0.1:8000/corticilization_type",
            {
              method: "POST",
              body: new FormData(),
            }
          );
          if (!responseInterruption.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching message. Please try again.");
          }

          const responsePosition = await fetch(
            "http://127.0.0.1:8000/position_prediction",
            {
              method: "POST",
              body: new FormData(),
            }
          );
          if (!responsePosition.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching position. Please try again.");
          }

          // Get POST endpoints
          const postInterruption = await responseInterruption.json();
          const postPosition = await responsePosition.json();

          setPostInterruption(postInterruption.postInterruption);
          setPostPosition(postPosition.postPosition);

          // Console log the POST endpoints
          console.log("POST Interruption:", postInterruption);
          console.log("POST Position:", postPosition);

          // Get the values from GET endpoints

          const getDistance = await fetch("http://127.0.0.1:8000/getDistance", {
            method: "GET",
          });
          if (!getDistance.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching position. Please try again.");
          }

          const getPosition = await fetch("http://127.0.0.1:8000/getPosition", {
            method: "GET",
          });
          if (!getPosition.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching position. Please try again.");
          }

          const getInterruption = await fetch(
            "http://127.0.0.1:8000/getInterruption",
            {
              method: "GET",
            }
          );
          if (!getInterruption.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching interruption. Please try again.");
          }

          const getRelation = await fetch("http://127.0.0.1:8000/getRelation", {
            method: "GET",
          });
          if (!getRelation.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching relation. Please try again.");
          }

          const getRisk = await fetch("http://127.0.0.1:8000/getRisk", {
            method: "GET",
          });
          if (!getRisk.ok) {
            console.error("Server response not OK");
            throw new Error("Error fetching risk. Please try again.");
          }

          // store the values in the states but make sure that the values are all loaded
          const position = await getPosition.json();
          const interruption = await getInterruption.json();
          const relation = await getRelation.json();
          const risk = await getRisk.json();
          const distance = await getDistance.json();

          setDistance(distance.distance);
          setPosition(position.position);
          setInterruption(interruption.interruption);
          setRelation(relation.relation);
          setRisk(risk.risk);

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

  // Function to determine the class names based on risk level
  const getRiskStyles = (risk) => {
    switch (risk) {
      case "N.0 (Non-determinant)":
        return {
          backgroundColor: "#58C5C080",
          textColor: "#30BCB5",
        };
      case "N.1 (Low)":
        return {
          backgroundColor: "#87CF7580",
          textColor: "#6ABC55",
        };
      case "N.2 (Medium)":
        return {
          backgroundColor: "#F0993F80",
          textColor: "#F0871A",
        };
      case "N.3 (High)":
        return {
          backgroundColor: "#E9503980",
          textColor: "#EC432A",
        };
      default:
        return {
          backgroundColor: "#58C5C080",
          textColor: "#30BCB5",
        };
    }
  };

  // Get the styles based on the risk level
  const { backgroundColor, textColor } = getRiskStyles(risk);

  return (
    <div className="mt-5 md:px-14 px-4 py-10 mx-auto bg-[url('./img/Background.png')] bg-cover">
      <h1 className="text-center text-[#9641E7] font-nunito text-[54px] font-bold mb-10">
        Results
      </h1>
      <div className="flex flex-row justify-center items-start gap-x-10">
        {/* Left top div */}
        <div className="flex flex-col gap-y-[40px] max-w-[820px]">
          <div className="h-[180px] w-[620px] rounded-[35px] shadow-3x1 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 bg-white font-nunito font-semibold drop-shadow-2xl">
            <div className="flex flex-row gap-x-2 justify-center items-center p-8">
              <div className="h-[180px] flex justify-center items-center">
                <img src={logo} alt="logo" />
              </div>

              <div className="h-[180px] flex flex-col justify-center">
                <h2 className="text-[40px] font-semibold text-[#23314C]">
                  Hi I'm Molar Support
                </h2>
                <p className="text-[20px]">Your Assessment Buddy</p>
              </div>
            </div>
          </div>

          {/* Left bottom div */}
          <div className="h-[640px] w-[620px] rounded-[35px] shadow-3x1 p-6 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-white drop-shadow-2xl">
            {/* Display the result image */}
            <div className="outline-dashed outline-offset-[34px] rounded-[10px] outline-gray-500">
              {loading ? (
                <p className="font-nunito font-semibold italic text-[32px] p-4">
                  {error ? error : "Waiting for image..."}
                  {/* Display the error message if present */}
                </p>
              ) : (
                <img
                  src={ImageSrc}
                  alt="Result Image"
                  className="w-[480px] h-[480px] object-contain"
                  onError={(e) => console.error("Error loading image:", e)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col max-w-[820px] gap-y-[40px]">
          {/* Right top div */}
          <div className="w-[680px] h-[680px] rounded-[35px] shadow-3x1 flex flex-col hover:-translate-y-4 transition-all duration-300 bg-white drop-shadow-2xl">
            <div className="w-full h-[220px] bg-[#E9E4FC] rounded-t-[35px]">
              <div className="flex flex-col p-8 ml-28 justify-center h-full">
                <div className="flex flex-row items-center my-2">
                  <RiSquareFill className="rounded-[14px] text-[50px] text-[#419e59] mr-4" />
                  <p className="text-[32px] text-[#23314C] font-normal font-nunito">
                    Mandibular Third Molar
                  </p>
                </div>

                <div className="flex flex-row items-center my-2">
                  <RiSquareFill className="rounded-[14px] text-[50px] text-[#c94dc9] mr-4" />
                  <p className="text-[32px] text-[#23314C] font-normal font-nunito">
                    Mandibular Canal
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex flex-col p-8 mx-2">
                  <div className="h-full mb-10">
                    <p className="text-[24px] text-[#5A6579] font-normal font-nunito mb-2">
                      M3-MC Relation:
                    </p>
                    {relation !== null ? (
                      <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                        {relation}
                      </p>
                    ) : (
                      <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                        Loading...
                      </p>
                    )}
                  </div>

                  <div className="h-full">
                  <p className="text-[24px] text-[#5A6579] font-normal font-nunito mb-2">
                    Position:
                  </p>
                  <div className="flex flex-row items-center">
                    <img
                      src={positionLogo}
                      alt="cortiToothImage"
                      className="w-[32px] h-[32px] mx-2"
                    />
                    {position !== null ? (
                      <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                        {position}
                      </p>
                    ) : (
                      <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                        Loading...
                      </p>
                    )}
                  </div>
                </div>
                </div>

                <div className="flex flex-col p-8 mx-2">
                  <div className="h-full mb-10">
                    <p className="text-[24px] text-[#5A6579] font-normal font-nunito mb-2">
                      Interruption:
                    </p>
                    <div className="flex flex-row items-center">
                      <img
                        src={cortiTooth}
                        alt="cortiToothImage"
                        className="w-[32px] h-[32px] mx-2"
                      />
                      {interruption !== null ? (
                        <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                          {interruption}
                        </p>
                      ) : (
                        <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                          Loading...
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="h-full">
                  <p className="text-[24px] text-[#5A6579] font-normal font-nunito mb-2">
                    Distance:
                  </p>
                  <div className="flex flex-row items-center">
                    <img
                      src={distanceLogo}
                      alt="cortiToothImage"
                      className="w-[32px] h-[32px] mx-2"
                    />
                    {distance !== null ? (
                      <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                        {distance} mm
                      </p>
                    ) : (
                      <p className="text-[32px] text-[#23314C] font-bold font-nunito mx-2">
                        Loading...
                      </p>
                    )}
                  </div>
                </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="border-b-2 border-[#5A6579]/25 mt-4 w-[520px]"></div>
              </div>

              <div className="flex flex-row w-full justify-center p-4 my-4">
                <div
                  className={`rounded-[40px] p-2 px-6 w-[480px] bg-[${backgroundColor}]`}
                >
                  {risk !== null ? (
                    <p
                      className={`text-[32px] text-[${textColor}] font-bold font-nunito text-center`}
                    >
                      {risk}
                    </p>
                  ) : (
                    <p className="text-[32px] text-[#30BCB5] font-bold font-nunito text-center">
                      Loading...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right bottom div */}
          <div className="w-[680px] h-[120px] rounded-[35px] shadow-3x1 p-4 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300 bg-gradient-to-r from-[#6D58C6] to-[#CC76E2] drop-shadow-2xl border border-solid border-white/50 cursor-pointer">
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
      <p className="hidden">{postInterruption}</p>
      <p className="hidden">{postPosition}</p>
    </div>
    
  );
};

export default UploadedResults;

{
  /* 
                <div className="flex flex-col h-full ml-[54px]">
                  <p className="text-[24px] text-[#5A6579] font-normal font-nunito mb-2">
                    Risk:
                  </p>
                  <div
                    className={`rounded-[40px] p-2 px-6 bg-[${backgroundColor}]`}
                  >
                    {risk !== null ? (
                      <p
                        className={`text-[32px] text-[${textColor}] font-bold font-nunito`}
                      >
                        {risk}
                      </p>
                    ) : (
                      <p className="text-[32px] text-[#30BCB5] font-bold font-nunito">
                        Loading...
                      </p>
                    )}
                  </div>
                </div>
*/
}
