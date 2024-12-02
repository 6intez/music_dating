import React, { useState } from "react";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Очистка предыдущих ошибок
    setErrors([]);
    setSuccessMessage("");

    // Простая валидация
    if (!email || !password) {
      setErrors(["Email и пароль обязательны"]);
      return;
    }

    const credentials = {
      user: {
        email: email,
        password: password,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-CSRF-Token': token, 
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Важно: позволяет браузеру сохранять куки
      });

      if (response.ok) {
        // Успешный ответ
        setSuccessMessage("Успешно вошли в систему!");
        setEmail("");
        setPassword("");

        // Редирект на главную страницу
        window.location.href = "/my_profile";
      } else {
        // Если неудачный ответ, пробуем обработать как текст (в случае с HTML)
        const textResponse = await response.text();
        
        if (textResponse.includes("redirect")) {
          // Если сервер пытается редиректировать, обрабатываем это
          setSuccessMessage("Успешно вошли в систему!");
          window.location.href = "/my_profile";
        } else {
          setErrors(["Ошибка входа. Пожалуйста, попробуйте снова."]);
        }
      }
    } catch (error) {
      setErrors(["Ошибка подключения. Пожалуйста, попробуйте позже."]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Вход
        </h2>

        {/* Сообщение об успехе */}
        {successMessage && (
          <div className="text-green-600 text-center mb-4">
            {successMessage}
          </div>
        )}

        {/* Сообщения об ошибках */}
        {errors.length > 0 && (
          <div className="text-red-600 text-center mb-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Войти
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/users/password/new"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Забыли пароль?
          </a>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Нет аккаунта?{" "}
            <a
              href="/users/sign_up"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
