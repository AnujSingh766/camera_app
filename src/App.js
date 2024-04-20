import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css"; 

const App = () => {
  const webcamRef = useRef(null);
  const [selectedCamera, setSelectedCamera] = useState("user");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [capturedImages, setCapturedImages] = useState([]);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages([
      ...capturedImages,
      { src: imageSrc, aspectRatio, zoomLevel },
    ]);
  };

  const handleZoomChange = (e) => {
    setZoomLevel(parseFloat(e.target.value));
  };

  const handleDelete = (index) => {
    const updatedImages = [...capturedImages];
    updatedImages.splice(index, 1);
    setCapturedImages(updatedImages);
  };

  return (
    <div className="app">
      <div className="camera-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored={selectedCamera === "user"}
          videoConstraints={{ facingMode: selectedCamera }}
          style={{ transform: `scale(${zoomLevel})` }}
        />
        <div className="controls">
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            <option value="user">Front Camera</option>
            <option value="environment">Back Camera</option>
          </select>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoomLevel}
            onChange={handleZoomChange}
          />
          <select value={zoomLevel} onChange={handleZoomChange}>
            <option value="1">1:1</option>
            <option value="2">4:3</option>
            <option value="3">16:9</option>
          </select>
          <button onClick={capturePhoto}>Capture</button>
        </div>
      </div>
      <div className="gallery">
        {capturedImages.map((image, index) => (
          <>
          <div className="image-container" key={index}>
            <img
              className="image"
              src={image.src}
              alt={`Captured ${index}`}
              style={{ transform: `scale(${image.zoomLevel})` }}
            />
           
          </div>
           <div className="delete-overlay" onClick={() => handleDelete(index)}>
           Delete
         </div>
         </>
        ))}
      </div>
    </div>
  );
};

export default App;
