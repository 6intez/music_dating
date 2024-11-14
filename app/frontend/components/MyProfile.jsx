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
    <div>
      <h1>Your Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>

      <h3>Your Music Files</h3>
      {audioFiles.length > 0 ? (
        <ul>
          {audioFiles.map((audio, index) => (
            <li key={index}>
              <strong>Audio File {index + 1}:</strong>
              <audio controls>
                <source src={audio.url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      ) : (
        <p>No audio files uploaded yet.</p>
      )}
    </div>
  );
};

export default MyProfile;
