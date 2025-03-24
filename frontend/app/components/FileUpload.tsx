"use client"
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [bloodGroup, setBloodGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Validate file type
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type! Please upload a JPG, PNG, or BMP file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a valid image file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setBloodGroup(response.data.blood_group);
      toast.success(`Detected Blood Group: ${response.data.blood_group}`);
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload Fingerprint</h2>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .bmp"
        onChange={handleFileChange}
        className="mb-4 w-full border p-2 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Detect"}
      </button>
      {bloodGroup && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-center">
          <p className="font-bold">Detected Blood Group:</p>
          <p className="text-xl">{bloodGroup}</p>
        </div>
      )}
    </div>
  );
}
