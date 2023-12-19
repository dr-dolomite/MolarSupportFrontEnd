import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ACCEPTSVG from "../img/accept.svg";

const AcceptCard = ({ onClose }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const navigate = useNavigate(); // Hook from react-router-dom
  
    useEffect(() => {
      const img = new Image();
      img.src = ACCEPTSVG;
      img.onload = () => {
        // Set the state to indicate that the image has loaded
        setIsImageLoaded(true);
      };
    }, []);
  
    function closeModal() {
      const modal = document.getElementById("my-modal");
      if (modal) {
        modal.classList.add("hidden");
      }
      onClose(); // Call onClose to handle closing the modal in Features.jsx
    }
  
    function startAssessment() {
      // Redirect to UploadedResults
      navigate("/UploadedResults");
      // You can also add other logic if needed
      closeModal();
    }

  return (
    isImageLoaded && (
      <div className="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-[24px] px-8 pt-8 pb-8 text-left overflow-hidden shadow-xl transform transition-all sm:my-12 sm:align-middle sm:max-w-xl sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="mx-auto flex items-center justify-center">
                <img src={ACCEPTSVG} alt="error icon" className="h-40 w-40" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-[56px] font-bold text-[#47D5C4] font-nunito"
                  id="modal-headline"
                >
                  Nice!
                </h3>
                <div className="mt-2 text-center flex justify-center">
                  <p className="text-[20px] font-nunito text-[#667085] font-semibold sm:max-w-sm">
                    Image uploaded was a CBCT M3 Axial slice image
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                className="inline-flex justify-center w-full rounded-[35px] border border-transparent shadow-sm px-4 py-4 bg-[#47D5C4] text-base font-semibold text-white font-nunito hover:bg-[#47D5C4]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47D5C4] sm:text-[24px]"
                onClick={startAssessment}
              >
                Let’s start assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AcceptCard;