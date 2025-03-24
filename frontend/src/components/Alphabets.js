import React from 'react';

const Alphabets = () => {
  // Kurdish characters with their corresponding numbers
  const characters = {
    "ا": 1,
    "ب": 2,
    "ج": 3,
    "چ": 4,
    "د": 5,
    "ە": 6,
    "ێ": 7,
    "ف": 8,
    "گ": 9,
    "ه": 10,
    "ح": 11,
    "ی": 12,
    "ژ": 13,
    "ک": 14,
    "ل": 15,
    "ڵ": 16,
    "م": 17,
    "ن": 18,
    "ۆ": 19,
    "پ": 20,
    "ق": 21,
    "ر": 22,
    "ڕ": 23,
    "س": 24,
    "ش": 25,
    "ت": 26,
    "و": 27,
    "وو": 28,
    "ڤ": 29,
    "خ": 30,
    "غ": 31,
    "ز": 32,
    "ع": 33,
    "ئ": 34,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Kurdish Alphabets
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6" style={{direction: "rtl"}}>
        {Object.entries(characters).map(([char, number]) => (
          <div
            key={number}
            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-6xl font-bold text-blue-600 mb-4">{char}</div>
            <div className="text-xl text-gray-700">Number: {number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alphabets;