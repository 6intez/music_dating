import React, { useEffect, useState } from 'react';

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получаем данные пользователя из атрибута data-user на странице
    const userData = JSON.parse(document.getElementById('my-profile').dataset.user);
    console.log(userData); // Проверьте структуру данных
    setUser(userData);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Profile</h1>

      <div className="mb-6">
        <p className="text-xl"><strong>Name:</strong> {user.name}</p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Your Music Files</h3>

      {user.audio_files && user.audio_files.length > 0 ? (
        <ul className="space-y-4">
          {user.audio_files.map((audio, index) => (
            <li key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-lg font-medium">Audio File {index + 1}</span>
              <audio controls className="w-full md:w-2/3">
                <source src={audio.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No audio files uploaded yet.</p>
      )}
    </div>
  );
};

export default MyProfile;
