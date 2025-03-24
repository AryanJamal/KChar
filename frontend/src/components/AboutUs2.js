import React from 'react';
import { Link } from 'react-router-dom';
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          About Us
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700 mb-6">
            Kurdish is a language spoken by more than 30 million people around the world and is a significant language from historical and cultural points of view. Despite the fact that Kurdish is widely used, it is hardly represented in the Natural Language Processing (NLP) domain and Optical Character Recognition (OCR).
          </p>

          <p className="text-lg text-gray-700 mb-6">
            While the progress in OCR systems for English and Arabic languages has been rather significant, Kurdish script recognition has not been explored. This project is the first to address this gap by designing a Kurdish character recognition model to enable future Kurdish OCR technologies.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            Kurdish text presents certain challenges to OCR technology, including connected letters and diacritics. These challenges, along with the absence of publicly available datasets, make segmentation and recognition even harder. Current OCR software, which is mainly designed to process Arabic, cannot accurately identify Kurdish letters and therefore requires special approaches.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            The goal of this project is to build a successful Kurdish character recognition model that can work with both standard and handwritten input text. With the help of deep learning approaches and the creation of a dedicated dataset, we aim to address the problem of recognizing the Kurdish script and contribute to the preservation and dissemination of the Kurdish language in the digital environment.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              To bridge the gap in Kurdish language representation in NLP and OCR by developing innovative technologies that empower the Kurdish-speaking community and preserve their linguistic heritage.
            </p>
          </div>
          <div className="mt-8 text-center">
  <Link
    to="/tools"
    className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
  >
    Explore Our Tools
  </Link>
</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;