// app/javascript/components/Collaborations.jsx
import React, { useState, useEffect } from 'react';

const Collaborations = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загрузка коллабораций с API
    const fetchCollaborations = async () => {
      try {
        const response = await fetch('/api/users/collaborations');
        const data = await response.json();
        setMatches(data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке коллабораций:', error);
      }
    };

    fetchCollaborations();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
      <div className="max-w-3xl  mx-auto p-6 bg-white bg-opacity-90 rounded-xl shadow-lg">
        <h1 className="text-4xl m-8 p-2 font-semibold text-gray-800 text-center mb-6">My Collaborations</h1>
        {matches.length > 0 ? (
          <ul className="space-y-6 ">
            {matches.map((match) => (
              <li key={match.id} className="bg-white p-4 rounded-lg shadow-md">
                <strong className="text-xl text-gray-800">
                  <a href={`/users/${match.id}`} className="hover:text-blue-500 transition-colors">
                    {match.name}
                  </a>
                </strong>
                <h4 className="text-lg text-gray-700 mt-2 ">Music Preferences:</h4>
                <ul className="space-y-4 mt-2">
                  {match.audio_files.map((audio, index) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <strong className="text-lg text-gray-800">Audio File {index + 1}:</strong>
                      <audio controls className="w-full mt-2 rounded-lg bg-gray-200">
                        <source src={audio.url} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-4">No collaborations found.</p>
        )}
      </div>
    </div>
  );
};

export default Collaborations;
