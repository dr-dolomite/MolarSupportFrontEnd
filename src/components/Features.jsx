import { useState, useRef, useEffect } from "react";
import DragAndDrop from "./DragandDrop";
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
  const [dragAndDropImageLocal, setDragAndDropImageLocal] = useState(null);
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState("");
  const fileInputRef = useRef(null);

  function handleFileSelection(e) {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setDragAndDropImageLocal(imageUrl); // Store image for DragAndDrop
      handleDragAndDropType(file);
      closeError();
    }
  }

  // New function for handling file drop
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setDragAndDropImageLocal(imageUrl); // Store image for DragAndDrop
      closeError();
      handleDragAndDropType(file);
    } else {
      // Handle no file dropped
      console.log("No file dropped");
      closeError();
    }
  }

  function closeError() {
    setErrorVisible(false);
    setAcceptVisible(false);
  }

  function handleFileClick() {
    // Trigger click on the file input when the upload logo is clicked
    fileInputRef.current.click();
  }

  // New function to handle errors triggered by DragAndDrop
  function handleDragAndDropType(file) {
    // Create a FormData object to send the file as multipart/form-data
    const formData = new FormData();
    formData.append("file", file);

    // Make a POST request to the FastAPI endpoint
    fetch("http://127.0.0.1:8000/check_valid_cbct_mc", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the response and take appropriate action
        if ("error" in data) {
          // Show the ErrorCard
          setErrorVisible(true);
        } else {
          // Do nothing or take additional actions if needed
          //
        }
      })
      .catch((error) => {
        console.error("Error while making the request:", error);
        // Handle errors if needed
      });
  }

  // New function for handling drag enter
  function handleDragEnter(e) {
    e.preventDefault();
  }

  // New function for handling drag over
  function handleDragOver(e) {
    e.preventDefault();
  }

  function checkInputs() {
    // Checks if CBCT image, MC image and IAN distance are provided
    if (imageUrl && dragAndDropImageLocal) {
      return true;
    } else {
      return false;
    }
  }

  function handleAssessmentStart() {
    if (checkInputs()) {
      navigate("/UploadedResults");
    }
  }

  // New function to handle errors triggered by DragAndDrop
  function handleDragAndDropError() {
    setErrorVisible(true);
  }

  // New function to handle accept triggered by DragAndDrop
  function handleDragAndDropAccept() {
    setAcceptVisible(true);
  }

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/calculate_distance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ distance: parseFloat(distance) }),
          }
        );

        const data = await response.json();
        setResult(data.result);

        // Display the result
        console.log("Result:", data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Send the request when the distance changes
    if (distance !== "") {
      sendRequest();
    }
  }, [distance]);

  return (
    <div className='my-24 md:px-14 px-4 max-w-screen-2xl mx-auto bg-[url("./img/Background.png")] bg-cover'>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Cards */}
        <div className="w-full lg:w-3/4">
          <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
            {/* First Card */}
            <div className="col-span-3 md:col-span-1.5 border-solid border-2 border-black-600 bg-[#F5F5F7]/90 rounded-[35px] h-[532px] w-auto shadow-3x1 p-2 items-center flex flex-col justify-center hover:-translate-y-4 transition-all duration-300">
              <div className="font-nunito mx-10">
                <h2 className="text-[55px] font-semibold text-[#23314C] mb-10">
                  Mandibular Third Molar (M3) Nerve Injury
                  <span className="text-[#CC76E2]"> Risk Evaluator.</span>
                </h2>
                <p className="text-left text-[24px] font-semibold max-w-2xl text-[#6b6b6b]">
                  Molar Support is an advanced application designed for precise
                  preoperative nerve injury risk assessment in mandibular third
                  molar extraction.
                </p>

                <div className="flex flex-row items-center mt-10">
                  <input
                    type="text"
                    placeholder="IAN Distance (mm)"
                    className="p-2 px-4 border-solid border-2 border-[#735ac8] focus:outline-[#CC76E2] rounded-md font-nunito text-[16px] font-normal"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                  <p className="italic font-nunito text-[14px] ml-4 font-semibold">
                    Please refer to the CBCT reader.
                  </p>
                </div>
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

            <div
              className="border-solid border-2 border-black-600 bg-[rgba(255,255,255,0.04)] rounded-[35px] sm:h-[412px] sm:w-[416px] shadow-3x1 p-8 flex justify-center items-center hover:-translate-y-4 transition-all duration-300 bg-gradient-to-r from-[#6D58C6] to-[#CC76E2]"
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col justify-center items-center text-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="selected image"
                    className="w-[400px] h-[400px] object-contain"
                  />
                ) : (
                  <>
                    <img
                      src={UPLOADSVG}
                      alt="upload logo"
                      className="w-[80px] h-[80px] mb-4 cursor-pointer"
                      onClick={handleFileClick}
                    />

                    <h2 className="font-nunito font-semibold text-[24px] max-w-[200px] text-white">
                      Upload The MC Masked Image
                    </h2>
                  </>
                )}

                {/* Hidden input for file selection */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelection}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right div */}
        <div className="outline outline-4 outline-[#23314C] bg-[rgba(255,255,255,0.04)] rounded-[35px] h-100 shadow-3x1 hover:-translate-y-4 transition-all duration-300">
          <div className="m-5 outline-dashed outline-2 rounded-[35px] outline-[#23314C]">
            {/* Pass onDragAndDropError to DragAndDrop */}
            <DragAndDrop
              onDragAndDropError={handleDragAndDropError}
              onDragAndDropAccept={handleDragAndDropAccept}
            />
          </div>
        </div>

        {/* Display the ErrorCard conditionally */}
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
