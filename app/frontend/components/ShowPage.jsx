import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const ShowPage = () => {
  const [user, setUser] = useState(null);
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  // Загрузка случайного пользователя
  const fetchRandomUser = async () => {
    try {
      const response = await fetch('/api/users/show');
      const data = await response.json();

      if (data.no_more_users) {
        setNoMoreUsers(true);
      } else {
        setUser(data.user);
        setNoMoreUsers(false);
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const props = useSpring({
    transform:
      swipeDirection === 'left'
        ? 'translateX(-100%)'
        : swipeDirection === 'right'
        ? 'translateX(100%)'
        : 'translateX(0%)',
    opacity: swipeDirection === 'left' || swipeDirection === 'right' ? 0 : 1,
    config: { tension: 280, friction: 60 },
  });

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === 'right') {
        handleLike();
      } else if (direction === 'left') {
        handleSkip();
      }
      setSwipeDirection(null);
    }, 500);
  };

  const handleLike = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`/api/like/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token, 
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке лайка');
        }

        const data = await response.json();
        console.log('Лайк успешно отправлен:', data);

        // Загружаем следующего пользователя
        fetchRandomUser();
      } catch (error) {
        console.error('Ошибка: не удалось отправить лайк', error);
      }
    } else {
      console.error('Ошибка: пользователь не найден.');
    }
  };

  const handleSkip = async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`/users/${user.id}/skip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при пропуске пользователя');
        }

        const data = await response.json();
        console.log('Пользователь пропущен:', data);

        // Загружаем следующего пользователя
        fetchRandomUser();
      } catch (error) {
        console.error('Ошибка: не удалось пропустить пользователя', error);
      }
    } else {
      console.error('Ошибка: пользователь не найден.');
    }
  };

  useEffect(() => {
    if (user) {
      console.log('Данные пользователя обновлены:', user);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
  {noMoreUsers ? (
    <p className="text-lg text-center font-semibold text-white">
      Нет доступных профилей для просмотра.
    </p>
  ) : (
    <>
      <animated.div
        style={props}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {user?.name}'s Profile
        </h1>
        <h3 className="text-xl text-gray-700 mb-4">Music Preferences:</h3>
        <ul className="space-y-4">
          {user?.audio_files?.map((audio, index) => (
            <li key={index} className="flex flex-col items-center space-y-2">
              <strong className="text-lg text-gray-900">Audio File {index + 1}:</strong>
              <audio controls className="w-full rounded-lg shadow-md border border-gray-300">
                <source src={audio.url} type="audio/mp3" />
                Ваш браузер не поддерживает элемент audio.
              </audio>
            </li>
          ))}
        </ul>
      </animated.div>

      <div className="mt-8 flex space-x-6">
        <button
          onClick={() => handleSwipe('right')}
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        >
          Like
        </button>
        <button
          onClick={() => handleSwipe('left')}
          className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        >
          Skip
        </button>
      </div>
    </>
  )}
</div>
  );
};

export default ShowPage;
