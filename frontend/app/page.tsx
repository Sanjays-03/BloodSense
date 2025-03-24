"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const bloodGroupColors: Record<string, string> = {
  "A+": "bg-red-500",
  "A-": "bg-red-400",
  "B+": "bg-blue-500",
  "B-": "bg-blue-400",
  "AB+": "bg-purple-500",
  "AB-": "bg-purple-400",
  "O+": "bg-green-500",
  "O-": "bg-green-400",
};

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bloodGroup, setBloodGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setBloodGroup(null);
      setError(null);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setError("Please select a fingerprint image.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload file");

      const data = await response.json();
      setBloodGroup(data.blood_group);
    } catch (err) {
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Fingerprint Blood Group Detector</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-96 text-center">
        <input type="file" accept="image/jpeg, image/png, image/bmp" className="mb-4" onChange={handleFileChange} />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          onClick={uploadFile}
        >
          Upload & Detect
        </button>

        {loading && (
          <motion.div className="mt-4 text-blue-600 text-lg" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
            Detecting Blood Group...
          </motion.div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {bloodGroup && (
          <motion.div
            className={`mt-6 p-4 text-white text-xl font-semibold rounded-xl ${bloodGroupColors[bloodGroup] || "bg-gray-600"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Blood Group: {bloodGroup}
          </motion.div>
        )}
      </div>
    </div>
  );
}
