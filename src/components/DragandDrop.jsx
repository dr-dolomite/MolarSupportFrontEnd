"use client"; // Importing the "client" module

import { useRef, useState } from "react"; // Importing the "useRef" and "useState" hooks from the "react" module
import { useNavigate } from "react-router-dom";

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
    <div className="flex items-center justify-center h-screen">
      <form
        className={`${
          dragActive ? "" : ""
        } p-4 w-1/3 rounded-lg min-h-[10rem] text-center flex flex-col items-center justify-center font-poppins`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <p
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Drag & Drop to Upload{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
            style={{ fontFamily: "Nunito, sans-serif" }}
          ></span>{" "}
          the CBCT M3 Axial Slice image
        </p>

        <div className="flex flex-col items-center p-3">
          {files.length > 0 ? (
            files.map((file, idx) => (
              <div key={idx} className="flex flex-row space-x-5">
                <span>{file.name}</span>
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={removeFile}
                >
                  remove
                </span>
              </div>
            ))
          ) : (
            <p>No files selected</p>
          )}
        </div>

        <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button>

        {files.length > 0 && <img src={URL.createObjectURL(files[0])} alt="Uploaded File" />}
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
