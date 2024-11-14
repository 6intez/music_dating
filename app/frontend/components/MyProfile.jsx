// MyProfile.jsx
import React, { useEffect, useState } from 'react';


const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Убедитесь, что запрос идет на правильный путь API
    fetch('/api/my_profile')  // Этот URL должен быть '/api/my_profile'
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Преобразуем в JSON
      })
      .then(data => {
        setUser(data.user);
        setAudioFiles(data.audio_files);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
<div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
  <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-80 rounded-xl shadow-lg">
    <h1 className="text-4xl font-semibold text-gray-800 text-center mb-4">Your Profile</h1>
    <p className="text-lg text-gray-600 mb-8"><strong>Name:</strong> {user.name}</p>

    <h3 className="text-2xl font-medium text-gray-700 mb-6">Your Music Files</h3>
    
    {audioFiles.length > 0 ? (
      <ul className="space-y-6">
        {audioFiles.map((audio, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <strong className="text-lg text-gray-800">Audio File {index + 1}:</strong>
            <audio controls className="w-full mt-2 rounded-lg bg-gray-100">
              <source src={audio.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
      
    ) : (
      <p className="text-gray-500">No audio files uploaded yet.</p>
    )}
     <a class=" items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    href="/users/show">Найти битмейкера</a>
  </div>
 
</div>

  );
};

export default MyProfile;
