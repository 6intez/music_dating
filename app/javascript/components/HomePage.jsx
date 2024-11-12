import React from 'react';
import PhoneImage from '../../assets/images/phone-2.3YMrk_V5.png';  // Путь к изображению может отличаться


const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 text-white">
      <div className="text-center p-6 space-y-4">
        <h1 className="text-4xl font-extrabold mb-4">Начни сотрудничать с новыми продюссерами по своему вкусу</h1>
        <p className="text-xl mb-6">Подключайся к лучшим специалистам и развивай свои проекты с помощью современных технологий.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Продолжить вместе с нами
        </button>
      </div>

      <div className="mt-8">
        <img src={PhoneImage} alt="Phone" className="w-full md:w-1/2 mx-auto shadow-lg rounded-lg" />
      </div>
    </div>
  );
};

export default HomePage;
