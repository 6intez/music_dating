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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {noMoreUsers ? (
        <p className="text-lg text-center font-semibold">
          Нет доступных профилей для просмотра.
        </p>
      ) : (
        <>
          <animated.div style={props} className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold text-center mb-4">
              {user?.name}'s Profile
            </h1>
            <h3 className="text-xl mb-2">Music Preferences:</h3>
            <ul className="space-y-4">
              {user?.audio_files?.map((audio, index) => (
                <li key={index} className="flex flex-col items-center">
                  <strong className="text-lg">Audio File {index + 1}:</strong>
                  <audio controls className="w-full">
                    <source src={audio.url} type="audio/mp3" />
                    Ваш браузер не поддерживает элемент audio.
                  </audio>
                </li>
              ))}
            </ul>
          </animated.div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => handleSwipe('right')}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 focus:outline-none"
            >
              Like
            </button>
            <button
              onClick={() => handleSwipe('left')}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none"
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
