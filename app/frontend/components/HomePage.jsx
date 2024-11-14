import React from "react";
import PhoneImage from "../../assets/images/phone-2.3YMrk_V5.png"; // Path to image

const HomePage = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 min-h-screen text-white overflow-hidden">
      {/* Background with animation */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url("/path/to/your-background-image.jpg")' }}
      ></div>

      <div className="flex flex-col items-center justify-center min-h-screen-[65] text-center px-4 sm:px-6 md:px-8 py-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Начни сотрудничать с новыми продюссерами по своему вкусу
        </h1>
        <p className="text-lg sm:text-xl mb-8 opacity-90 animate__animated animate__fadeIn animate__delay-2s">
          Подключайся к лучшим специалистам и развивай свои проекты с помощью
          современных технологий.
        </p>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300">
          Продолжить вместе с нами
        </button>
      </div>

      
      <div className=" text-black py-16 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={PhoneImage}
              alt="Phone"
              className="mx-auto w-1/2 md:w-1/2 rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              Найди идеального битмейкера
            </h2>
            <p className="text-lg sm:text-xl opacity-90 mb-8">
              Используй нашу платформу для поиска продюсеров и битмейкеров,
              которые подходят под твои требования, как в Tinder. Свайпай, чтобы
              начать сотрудничество и развивать свои музыкальные проекты.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-full shadow-xl transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Начать искать битмейкеров
            </button>
          </div>
        </div>
      </div>

      {/* Additional footer or content */}
     
    </div>
  );
};

export default HomePage;
