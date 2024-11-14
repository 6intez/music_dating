import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const UserProfile = ({ user, noMoreUsers, onLike, onSkip }) => {
  const [swipeDirection, setSwipeDirection] = useState(null);

  // Анимации свайпа
  const props = useSpring({
    transform: swipeDirection === 'left' ? 'translateX(-100%)' : swipeDirection === 'right' ? 'translateX(100%)' : 'translateX(0%)',
    opacity: swipeDirection === 'left' || swipeDirection === 'right' ? 0 : 1,
    config: { tension: 280, friction: 60 },
  });

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === 'right') {
        onLike();  // обработка "лайка"
      } else if (direction === 'left') {
        onSkip();  // обработка "пропуска"
      }
      setSwipeDirection(null);  // сброс анимации
    }, 500);
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-50 min-h-screen">
      {/* Если нет доступных пользователей */}
      {noMoreUsers ? (
        <p className="text-lg text-center text-gray-600">Нет доступных профилей для просмотра.</p>
      ) : (
        <div className="relative w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
          <animated.div style={props} className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-semibold text-center text-blue-600">{user.name}'s Profile</h1>
            <h3 className="text-lg font-medium text-gray-800">Music Preferences:</h3>
            <ul className="space-y-2">
              {user.audio_files.map((audio, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <strong className="text-gray-700">Audio File {index + 1}:</strong>
                  <audio controls className="w-32">
                    <source src={audio.url} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              ))}
            </ul>
          </animated.div>

          {/* Кнопки для свайпа */}
          <div className="absolute bottom-6 w-full flex justify-between px-4">
            <button
              onClick={() => handleSwipe('left')}
              className="bg-red-500 text-white py-2 px-4 rounded-lg w-full mr-2 shadow-lg hover:bg-red-600 transition-all"
            >
              Skip
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-full ml-2 shadow-lg hover:bg-green-600 transition-all"
            >
              Like
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
