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
    <div className="collaborations">
      <h1>My Collaborations</h1>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <strong>
                <a href={`/users/${match.id}`}>{match.name}</a>
              </strong>
              <h4>Music Preferences:</h4>
              <ul>
                {match.audio_files.map((audio, index) => (
                  <li key={index}>
                    <strong>Audio File {index + 1}:</strong>
                    <audio controls>
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
        <p>No collaborations found.</p>
      )}
    </div>
  );
};

export default Collaborations;
