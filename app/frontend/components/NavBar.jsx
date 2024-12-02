import React from "react";

const NavBar = () => {
  return (

<header
    className="fixed inset-x-0 top-0  z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-2 md:rounded-3xl lg:max-w-screen-lg">
    <div className="px-4 ">
        <div className="flex items-center justify-between">
            <div className="flex shrink-0">
                <a aria-current="page" className="flex items-center" href="/">
                    <img className="h-7 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt=""></img>
                    <p className="sr-only">Website Title</p>
                </a>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            </div>
            <div className="flex items-center justify-end gap-3">
                <a className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    href="/my_profile">Мой профиль</a>
                
            </div>
        </div>
    </div>
</header>
);
};

export default NavBar;