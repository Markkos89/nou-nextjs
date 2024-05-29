import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col w-full h-11 text-white justify-center gap-2 p-4">
      <a
        href="/"
        target="_blank"
        className="w-full h-4 flex justify-center text-sm"
      >
        © 2024 NOUxBASE
      </a>
      <div className="w-full h-4 flex justify-evenly text-xs ">
        <a href="/" target="_blank" className="hover:cursor-pointer">
          Contact Support
        </a>
        |
        <a href="/" target="_blank" className="hover:cursor-pointer">
          Terms
        </a>
        |
        <a href="/" target="_blank" className="hover:cursor-pointer">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}

export default Footer;
