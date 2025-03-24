import React, { useState, useRef } from "react";

const characters = {
    ا: 1,
    ب: 2,
    ج: 3,
    چ: 4,
    د: 5,
    ە: 6,
    ێ: 7,
    ف: 8,
    گ: 9,
    ه: 10,
    ح: 11,
    ی: 12,
    ژ: 13,
    ک: 14,
    ل: 15,
    ڵ: 16,
    م: 17,
    ن: 18,
    ۆ: 19,
    پ: 20,
    ق: 21,
    ر: 22,
    ڕ: 23,
    س: 24,
    ش: 25,
    ت: 26,
    و: 27,
    وو: 28,
    ڤ: 29,
    خ: 30,
    غ: 31,
    ز: 32,
    ع: 33,
    ئ: 34,
};

const Tools = () => {
    const [image, setImage] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        option1: false,
        option2: false,
        option3: false,
    });
    const [predictedCharacter, setPredictedCharacter] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                stopCamera(); // Stop the camera if active
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle checkbox changes
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!image) {
            alert("Please upload an image or capture one using the camera.");
            return;
        }

        // Convert the image to a file
        const blob = await fetch(image).then((res) => res.blob());
        const file = new File([blob], "image.png", { type: "image/png" });

        // Create a FormData object
        const formData = new FormData();
        formData.append("image", file);

        try {
            // Send the image to the backend
            const response = await fetch("http://127.0.0.1:8000/predict/", {
                method: "POST",
                body: formData,
            });

            // Log the response status and data
            console.log("Response Status:", response.status);
            const result = await response.json();
            console.log("Response Data:", result);

            if (!response.ok) {
                throw new Error(result.error || "Failed to predict character");
            }

            // Set the predicted character
            setPredictedCharacter(result.character);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Failed to predict character. Please try again.");
        }
    };
    // Start the camera
    const startCamera = async () => {
        console.log("Starting camera...");

        if (!videoRef.current) {
            console.error("Video element not yet available");
            alert("Camera initialization failed. Please try again.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log("Got camera stream:", stream);

            videoRef.current.srcObject = stream;

            // Add an event listener to ensure the video is playing
            videoRef.current.onloadedmetadata = async () => {
                console.log("Video metadata loaded");
                try {
                    await videoRef.current.play();
                    console.log("Video is now playing");
                    setCameraActive(true);
                } catch (playError) {
                    console.error("Error playing video:", playError);
                }
            };
        } catch (error) {
            console.error("Error accessing the camera:", error);
            alert(
                "Failed to access the camera. Please ensure you have granted permission."
            );
        }
    };

    // Stop the camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraActive(false);
    };

    // Capture image from the camera
    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            // Set canvas dimensions to match the video feed
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the current frame from the video onto the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas image to a data URL and set it as the image
            const imageDataUrl = canvas.toDataURL("image/png");
            setImage(imageDataUrl);

            // Stop the camera after capturing the image
            stopCamera();
        }
    };

    // Filter characters to only include the predicted character
    const filteredCharacters = predictedCharacter
        ? Object.entries(characters).filter(([char]) => char === predictedCharacter)
        : [];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
                    Tools
                </h1>

                {/* Image Upload/Camera Area */}
                <div className="flex justify-center">
                    <div className="w-96 h-96 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
                        {image ? (
                            <img
                                src={image}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            // Always render the video element, but control its visibility
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className={`w-full h-full object-cover rounded-lg ${cameraActive ? "block" : "hidden"
                                    }`}
                            ></video>
                        )}

                        {/* Show the upload UI when no image and camera not active */}
                        {!image && !cameraActive && (
                            <div className="absolute text-center p-4">
                                <label className="cursor-pointer">
                                    <span className="text-blue-600 font-semibold">
                                        Upload Image
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                                <p className="text-gray-500 mt-2">or</p>
                                <button
                                    onClick={startCamera}
                                    className="text-blue-600 font-semibold mt-2"
                                >
                                    Use Camera
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Capture Button (visible only when camera is active) */}
                {cameraActive && (
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={captureImage}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Capture Image
                        </button>
                    </div>
                )}

                {/* Checkboxes */}
                <div className="mt-8 flex justify-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="option1"
                            checked={checkedItems.option1}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Option 1</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="option2"
                            checked={checkedItems.option2}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Option 2</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="option3"
                            checked={checkedItems.option3}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Option 3</span>
                    </label>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Submit Photo
                    </button>
                </div>
                {/* Predicted Character */}
                {predictedCharacter && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
                            Predicted Character
                        </h2>
                        <div className="grid lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-6 gap-4">
                        <div className="col-span-4 lg:col-start-4 md:col-start-2 sm:col-start-2">
                            {filteredCharacters.map(([char, number]) => (
                                <div
                                    key={number}
                                    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="text-6xl font-bold text-blue-600 mb-4">
                                        {char}
                                    </div>
                                    <div className="text-xl text-gray-700">Number: {number}</div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                )}
                {/* Hidden Canvas for Capturing Images */}
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
        </div>
    );
};

export default Tools;
