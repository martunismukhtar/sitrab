import { useAtom } from "jotai";
import { useState } from "react";
import { activeModalAtom, isOpenModal } from "../../jotai/atoms";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setActiveModal] = useAtom(activeModalAtom);
  const [, setIsOpenModal] = useAtom(isOpenModal);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSetActiveModal = () => {
    setIsOpenModal(true);
    setActiveModal("pengajuan");
  };

  return (
    <header className="fixed top-0 left-0 bg-white text-white shadow-md py-2 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="http://pupracehbarat.id/">
          <img
            src="http://pupracehbarat.id/tema/logo/logo-sitrab.png"
            alt="Logo"
            className="h-16"
          />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <button
              onClick={handleSetActiveModal}
              className="px-4 py-2 text-sm font-medium text-primary border  rounded-md hover:bg-primary hover:text-white"
            >
              Informasi Pemanfaatan Ruang
            </button>
          </li>
          <li className="text-black">
            <a href="http://pupracehbarat.id/">Home</a>
          </li>
        </ul>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={handleToggle}
            className="p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          >
            <svg
              className={`w-6 h-6 transition-transform transform text-[#609ed6] ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-b border-gray-200"
        }`}
      >
        <ul className="border-t border-gray-200">
          <li>
            <button
              onClick={handleSetActiveModal}
              className="block w-full px-4 py-2 text-left text-sm font-medium text-primary hover:bg-primary hover:text-white"
            >
              Informasi Pemanfaatan Ruang
            </button>
          </li>
          <li>
            <a className="text-black block w-full px-4 py-2 text-left text-sm font-medium" href="https://simatabaru.acehbesarkab.go.id/app/">Home</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;