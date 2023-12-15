"use client"; // Importing the "client" module

import { useRef, useState } from "react"; // Importing the "useRef" and "useState" hooks from the "react" module
import { useNavigate } from "react-router-dom";
import IMAGES from "../img/images";

export default function DragAndDrop() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      setFiles([e.target.files[0]]);
    }
  }

  function handleSubmitFile(e) {
    if (files.length === 0) {
      // no file has been submitted
    } else {
      // write submit logic here
      console.log("Submit logic here");
      const imageUrl = URL.createObjectURL(files[0]);
      navigate("/UploadPage", { state: { imageUrl } });
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([e.dataTransfer.files[0]]);
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile() {
    setFiles([]);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex h-screen flex-col justify-center items-center">
        <img
          src={IMAGES.toothLogo}
          alt="tooth"
          className="w-[108px] h-[104px] cursor-pointer"
          onClick={openFileExplorer}
        />
      <form
        className={`${
          dragActive ? "" : ""
        } m-8 gap-y-8 grid grid-cols-1 place-content-center max-w-lg text-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <p className="font-nunito text-[24px] font-semibold">
          Drag & Drop to Upload{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer font-nunito"
            onClick={openFileExplorer}
          >the CBCT M3 Axial Slice image</span>{" "}
          
        </p>

        <div className="flex flex-col justify-center p-3">
          {files.length > 0 ? (
            files.map((file, idx) => (
              <div key={idx}>
                <div className="max-w-md max-h-md flex flex-col">
                <span className="mb-2 text-ellipsis overflow-hidden">{file.name}</span>
                <span
                  className="text-red-500 cursor-pointer font-bold text-[18px] font-nunito"
                  onClick={removeFile}
                >
                  remove
                </span>
                </div>
              </div>
            ))
          ) : (
            <p>No files selected</p>
          )}
        </div>

        <div className="flex items-center justify-center">
        <button
          className="bg-[#6e58c6] hover:bg-[#6e58c6]/80 rounded-lg p-3 mt-2 w-[180px]"
          onClick={handleSubmitFile}
        >
          <span className=" text-white font-nunito font-semibold text-[16px]">Submit</span>
        </button>
        </div>


        {files.length > 0 && (
          <img src={URL.createObjectURL(files[0])} className="w-[420px] h-[440px] object-contain" alt="Uploaded File" />
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
