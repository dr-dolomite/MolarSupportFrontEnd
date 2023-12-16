import { useState } from "react";
import DragAndDrop from "./DragandDrop";
import { GoUpload } from "react-icons/go";
import IMAGES from "../img/images";
import { useNavigate } from "react-router-dom";
import ErrorCard from "./ErrorCard";
import AcceptCard from "./AcceptCard";
import UPLOADSVG from "../img/upload.svg";

function Features() {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [errorVisible, setErrorVisible] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);

  function handleFileSelection(e) {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  }

  function closeError() {
    setErrorVisible(false);
    setAcceptVisible(false);
  }

  // New function to handle errors triggered by DragAndDrop
  function handleDragAndDropError() {
    setErrorVisible(true);
  }

  // New function to handle accept triggered by DragAndDrop
  function handleDragAndDropAccept() {
    setAcceptVisible(true);
  }

  function handleAssessmentStart() {
    // Redirect to UploadedResults
    navigate("/UploadedResults");
  }

  return (
    <div className='my-24 md:px-14 px-4 max-w-screen-2xl mx-auto bg-[url("./img/Background.png")] bg-cover'>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Cards */}
        <div className="w-full lg:w-3/4">
          <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
            {/* First Card */}
            <div className="col-span-3 md:col-span-1.5 border-solid border-2 border-black-600 bg-[#F5F5F7]/90 rounded-[35px] h-[532px] w-auto shadow-3x1 p-2 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300">
              <div className="font-nunito mx-10">
                <h2 className="text-[55px] font-semibold text-[#23314C] mb-20">
                  Mandibular Third Molar (M3) Nerve Injury
                  <span className="text-[#CC76E2]"> Risk Evaluator.</span>
                </h2>
                <p className="text-left text-[24px] font-semibold max-w-2xl text-[#6b6b6b]">
                  Molar Support is an advanced application designed for precise
                  preoperative nerve injury risk assessment in mandibular third
                  molar extraction.
                </p>
              </div>
            </div>

            {/* Second Card */}
            <div className="border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] h-auto shadow-3x1 sm:w-[416px] p-8 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300">
              <h3 className="text-[28px] font-semibold text-[#23314C] mx-5 text-center mt-2">
                You can try these use cases:
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <img
                  src={IMAGES.sample1}
                  alt="Sample 1"
                  className="cursor-pointer"
                />
                <img
                  src={IMAGES.sample2}
                  alt="Sample 2"
                  className="cursor-pointer"
                />
                <img
                  src={IMAGES.sample3}
                  alt="Sample 3"
                  className="cursor-pointer"
                />
                <img
                  src={IMAGES.sample4}
                  alt="Sample 4"
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Third Card */}
            <div className="border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] sm:h-[412px] sm:w-[416px] shadow-3x1 p-8 flex justify-center items-center hover:-translate-y-4 transition-all duration-300 bg-gradient-to-r from-[#6D58C6] to-[#CC76E2]">
              <div className="flex flex-col justify-center items-center">
                <img
                  src={UPLOADSVG}
                  alt="upload logo"
                  className="w-[80px] h-[80px] mb-4"
                />
                <h2 className="font-nunito font-semibold text-[32px] text-white">
                  Upload Image
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Right div */}
        <div className="outline outline-4 outline-[#23314C] bg-[rgba(255,255,255,0.04)] rounded-[35px] h-100 shadow-3x1 hover:-translate-y-4 transition-all duration-300">
          <div className="m-5 outline-dashed outline-2 rounded-[35px] outline-[#23314C]">
            {/* Pass onDragAndDropError to DragAndDrop */}
            <DragAndDrop
              onFileSelection={handleFileSelection}
              onDragAndDropError={handleDragAndDropError}
              onDragAndDropAccept={handleDragAndDropAccept}
              onAssessmentStart={handleAssessmentStart}
            />
          </div>
        </div>
        {/* Display the ErrorCard and Accept Card conditionally */}
        {errorVisible && <ErrorCard onClose={closeError} />}

        {acceptVisible && (
          <AcceptCard
            onClose={closeError}
            onAssessmentStart={handleAssessmentStart}
          />
        )}
      </div>
    </div>
  );
}

export default Features;
