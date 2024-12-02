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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Sign Up</h2>

        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}

        {errors.length > 0 && (
          <div className="text-red-600 text-center mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">Password Confirmation</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="audioFiles" className="block text-sm font-medium text-gray-700">Upload Audio Files</label>
            <input
              type="file"
              id="audioFiles"
              multiple
              accept="audio/*"
              onChange={(e) => setAudioFiles(e.target.files)}
              className="mt-2 w-full text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
