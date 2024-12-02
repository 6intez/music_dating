import React from "react";

const Footer = () => {
  return (

    <footer className="bg-gray-900 py-6 text-center">
    <p className="text-gray-500">
      &copy; {new Date().getFullYear()} Musician Platform. All rights reserved.
    </p>
    <small>
      <a href="#" className="text-gray-400 hover:underline mx-2">Terms</a>
      <a href="#" className="text-gray-400 hover:underline mx-2">Privacy</a>
    </small>
  </footer>
);
};

export default Footer;