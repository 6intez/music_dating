import React, { useState } from 'react';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [audioFiles, setAudioFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user[name]', name);
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    formData.append('user[password_confirmation]', passwordConfirmation);

    // Добавление файлов
    if (audioFiles.length > 0) {
      for (let i = 0; i < audioFiles.length; i++) {
        formData.append('user[audio_files][]', audioFiles[i]);
      }
    }

    try {
      const response = await fetch('/users', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        },
      });

      if (response.ok) {
        setSuccessMessage('You have successfully registered!');
        setErrors([]);

        // Перенаправление на страницу входа после успешной регистрации
        setTimeout(() => {
          window.location.href = '/users/sign_in';
        }, 1000); // Пауза 1 секунда перед редиректом
      } else {
        const data = await response.json();
        setErrors(data.errors || ['Something went wrong.']);
      }
    } catch (err) {
      setErrors(['Network error']);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password Confirmation</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Upload Audio Files</label>
          <input
            type="file"
            multiple
            accept="audio/*"
            onChange={(e) => setAudioFiles(e.target.files)}
          />
        </div>

        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
