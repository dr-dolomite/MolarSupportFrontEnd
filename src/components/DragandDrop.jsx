"use client"; // Importing the "client" module

import React, { useRef, useState } from "react";
import axios from "axios";
import IMAGES from "../img/images";

import { LuTrash2 } from "react-icons/lu";

export default function DragAndDrop({
  onDragAndDropError,
  onDragAndDropAccept,
}) {
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

        //console.log("Response from process_image:", processResponse.data);

        // Handle the response as needed, e.g., update state to display the result image
        //console.log(processResponse.data);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      setError("An error occurred while processing the image.");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center min-w-[80%]">
      {files.length === 0 && (
        <img
          src={IMAGES.toothLogo}
          alt="tooth"
          className="w-[108px] h-[104px] cursor-pointer hover:-translate-y-4 transition-all duration-300"
          onClick={openFileExplorer}
        />
      )}

      <form
        className="m-8 gap-y-8 grid grid-cols-1 sm:w-[420px] text-center"
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {files.length === 0 && (
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <p
              className="font-nunito text-[24px] text-primary font-semibold"
              onClick={openFileExplorer}
            >
              Drag & Drop to Upload the CBCT M3 Axial Slice image
            </p>
          </div>
        )}

        <div className="flex flex-col justify-center p-3">
          {files.length > 0 ? (
            files.map((file, idx) => (
              <div key={idx}>
                <div className="max-w-md max-h-md flex flex-col justify-center">
                  <p className="font-nunito font-semibold text-[32px] text-[#6848e7] mb-8">
                    Axial Slice Image
                  </p>
                  <p className="font-nunito font-semibold text-[24px] text-white text-ellipsis overflow-hidden">
                    File: {file.name}
                  </p>
                  <div className="flex flex-row items-center mt-6 justify-center">
                    <div className="rounded-[16px] p-2 px-8 outline outline-white outline-2 bg-[#FFFFFF40] hover:bg-[#FFFFFF80] cursor-pointer">
                      <LuTrash2
                        className="w-[36px] h-[40px] text-white"
                        onClick={() => removeFile(idx)}
                      />
                    </div>
                    <div
                      className="flex items-center ml-8 rounded-[16px] w-auto p-2 px-8 bg-[#6e58c6] hover:bg-[#6e58c6]/80 cursor-pointer"
                      onClick={handleSubmitFile}
                    >
                      <p className="font-nunito font-semibold text-[26px] text-[#ffff]">
                        Submit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="font-nunito font-normal text-[24px] text-primary text-ellipsis overflow-hidden">
              No file selected
            </p>
          )}
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
