import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageCompression = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalImageSize, setOriginalImageSize] = useState(0);
  const [compressedImageSize, setCompressedImageSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setOriginalImage(file);
      setOriginalImageSize((file.size / 1024).toFixed(2)); // Convert size to KB
      setCompressedImage(null);
      setCompressedImageSize(0);
    }
  };

  const handleCompression = async () => {
    const options = {
      maxSizeMB: 1, // Maximum size in MB
      maxWidthOrHeight: 1024, // Maximum width or height
      useWebWorker: true,
    };

    try {
      setIsCompressing(true);
      const compressedFile = await imageCompression(originalImage, options);
      console.log(compressedFile)
      const compressedFileUrl = URL.createObjectURL(compressedFile);

      setCompressedImage(compressedFileUrl);
      setCompressedImageSize((compressedFile.size / 1024).toFixed(2)); // Convert size to KB

      setIsCompressing(false);
    } catch (error) {
      console.error("Compression Error:", error);
      setIsCompressing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border-2 border-blue-300">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Image Compression
          </h1>
          <p className="text-gray-600 mt-2">
            Upload an image and compress it to save storage space.
          </p>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Original Image */}
          <div className="flex-1 border p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Original Image
            </h2>
            <input
              type="file"
              accept="image/*"
              className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageUpload}
            />
            {originalImage && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(originalImage)}
                  alt="Original"
                  className="w-full max-h-full object-cover rounded-lg"
                />
                <p className="mt-2 text-gray-600">
                  Size:{" "}
                  <span className="font-medium">{originalImageSize} KB</span>
                </p>
              </div>
            )}
          </div>

          {/* Compressed Image */}
          <div className="flex-1 border p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Compressed Image
            </h2>
            {compressedImage ? (
              <div className="mt-4">
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="w-full max-h-full object-cover rounded-lg"
                />
                <p className="mt-2 text-gray-600">
                  Size:{" "}
                  <span className="font-medium">{compressedImageSize} KB</span>
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No compressed image yet.</p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center space-x-5">
          <button
            className={`px-6 py-3 rounded-lg text-white ${
              isCompressing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleCompression}
            disabled={isCompressing || !originalImage}
          >
            {isCompressing ? "Compressing..." : "Compress Image"}
          </button>

          {compressedImage ? (
            <a
              href={compressedImage}
              download="compressed-image.jpg"
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Download
            </a>
          ) : (
            <button
              className="px-6 py-3 rounded-lg bg-gray-400 cursor-not-allowed text-white"
              disabled
            >
              Download
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <a
            href="https://www.facebook.com/softdevjowel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            Developed by Muhammad Jowel
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageCompression;
