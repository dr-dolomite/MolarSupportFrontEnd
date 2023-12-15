"use client"; // Importing the "client" module

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IMAGES from "../img/images";

export default function DragAndDrop({
  onFileSelection,
  onDragAndDropError,
  onDragAndDropAccept,
  onAssessmentStart,
}) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null); // New state for error
  const inputRef = useRef(null); // Define inputRef

  const openFileExplorer = () => {
    inputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    // Add any visual indications for drag enter if needed
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Remove any visual indications for drag leave if needed
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Add any visual indications for drag over if needed
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmitFile = async () => {
    if (files.length === 0) {
      // Handle no files selected
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/check_valid_cbct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from check_valid_cbct:", response.data);

      // Check if the image is valid
      if (response.data && response.data.error) {
        // If it's an invalid image, set the error state
        setError(response.data.error);

        // Call the callback function to inform Features about the error
        onDragAndDropError();
      } else {
        // If it's a valid image, proceed with processing
        onDragAndDropAccept();

        setError(null); // Reset error state
        const processResponse = await axios.post(
          "http://127.0.0.1:8000/process_image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response from process_image:", processResponse.data);

        // Handle the response as needed, e.g., update state to display the result image
        console.log(processResponse.data);

        // Redirect to the UploadedResults page using the provided callback
        onAssessmentStart();
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      setError("An error occurred while processing the image.");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center min-w-[80%]">
      <img
        src={IMAGES.toothLogo}
        alt="tooth"
        className="w-[108px] h-[104px] cursor-pointer"
        onClick={openFileExplorer}
      />

      <form
        className="m-8 gap-y-8 grid grid-cols-1 sm:w-[420px] text-center"
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col justify-center items-center">
          <p className="font-nunito text-[24px] font-semibold">
            Drag & Drop to Upload the
          </p>
          <p
            className="font-bold text-blue-600 text-[24px] cursor-pointer font-nunito"
            onClick={openFileExplorer}
          >
            CBCT M3 Axial Slice image
          </p>
        </div>

        <div className="flex flex-col justify-center p-3">
          {files.length > 0 ? (
            files.map((file, idx) => (
              <div key={idx}>
                <div className="max-w-md max-h-md flex flex-col">
                  <p className="font-nunito font-normal text-[14px] text-ellipsis overflow-hidden">
                    {file.name}
                  </p>
                  <span
                    className="text-red-500 cursor-pointer font-bold text-[18px] font-nunito"
                    onClick={() => removeFile(idx)}
                  >
                    remove
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="font-nunito font-normal text-[14px] text-ellipsis overflow-hidden">No files selected</p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-[#6e58c6] hover:bg-[#6e58c6]/80 rounded-lg p-3 w-[180px]"
            onClick={handleSubmitFile}
          >
            <span className=" text-white font-nunito font-semibold text-[16px]">
              Submit
            </span>
          </button>
        </div>

        {files.length > 0 && (
          <img
            src={URL.createObjectURL(files[0])}
            className="w-[420px] h-[440px] object-contain"
            alt="Uploaded File"
          />
        )}
      </form>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
}
