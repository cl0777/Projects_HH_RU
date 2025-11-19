import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { Globe, User, LogOut, ArrowRight, Phone, Mail } from "lucide-react";
import logo from "../../public/logo.png";
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverWhiteBackground, setIsOverWhiteBackground] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "tm", name: "Türkmen", flag: "🇹🇲" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll detection for navbar transformation and background color detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Detect background color behind navbar
      if (navbarRef.current) {
        const navbarRect = navbarRef.current.getBoundingClientRect();
        const elementBelow = document.elementFromPoint(
          navbarRect.left + navbarRect.width / 2,
          navbarRect.bottom + 10
        );

        if (elementBelow) {
          const computedStyle = window.getComputedStyle(elementBelow);
          const backgroundColor = computedStyle.backgroundColor;

          // Check if background is white or light colored
          const isWhiteOrLight =
            backgroundColor === "rgba(0, 0, 0, 0)" ||
            backgroundColor === "rgb(255, 255, 255)" ||
            backgroundColor.includes("255, 255, 255") ||
            backgroundColor.includes("248, 250, 252") || // gray-50
            backgroundColor.includes("249, 250, 251") || // gray-50
            backgroundColor.includes("243, 244, 246"); // gray-100

          setIsOverWhiteBackground(isWhiteOrLight);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Also check on initial load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavLinkClick = () => {
    scrollToTop();
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    scrollToTop();
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "terminals", path: "/terminals" },
    { key: "services", path: "/services" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#264D88] text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{t("nav.phone")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{t("nav.email")}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>{t("nav.support")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        ref={navbarRef}
        className={`relative backdrop-blur-xl shadow-2xl sticky z-[100] border-b-4 border-[#264D88] transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-transparent via-[#264D88]/5 to-transparent top-4 rounded-2xl mx-4"
            : "bg-white top-0 rounded-none mx-0"
        }`}
      >
        {/* Animated Background Pattern */}
        <div
          className={`absolute inset-0 opacity-10 overflow-hidden transition-all duration-500 ${
            isScrolled ? "rounded-2xl" : "rounded-none"
          }`}
        >
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isScrolled
                ? "bg-gradient-to-r via-[#264D88]/5 via-transparent to-[#264D88]/20 animate-pulse"
                : "bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"
            }`}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full ">
            <div
              className={`absolute top-2 left-4 w-2 h-2 rounded-full animate-bounce transition-colors duration-500 ${
                isScrolled ? "bg-[#264D88]" : "bg-white/30"
              }`}
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className={`absolute top-4 right-8 w-1 h-1 rounded-full animate-bounce transition-colors duration-500 ${
                isScrolled ? "bg-blue-400" : "bg-white/20"
              }`}
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className={`absolute bottom-2 left-12 w-1.5 h-1.5 rounded-full animate-bounce transition-colors duration-500 ${
                isScrolled ? "bg-purple-400" : "bg-white/25"
              }`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className={`absolute bottom-4 right-4 w-1 h-1 rounded-full animate-bounce transition-colors duration-500 ${
                isScrolled ? "bg-indigo-400" : "bg-white/20"
              }`}
              style={{ animationDelay: "0.7s" }}
            ></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-24">
            {/* Logo with Enhanced Animation */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  {/* Main Logo Container */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#264D88] via-[#1e3a8a] to-[#264D88] rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <img src={logo} alt="logo" className="" />
                  </div>

                  {/* Rotating Ring */}
                  <div className="absolute inset-0 w-16 h-16 border-2 border-[#264D88]/30 rounded-2xl group-hover:rotate-180 transition-transform duration-1000"></div>

                  {/* Corner Accents */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation with Enhanced Effects */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`relative group px-3 py-3 font-semibold transition-all duration-500 rounded-xl overflow-hidden ${
                    isOverWhiteBackground
                      ? "text-[#264D88] hover:text-[#1e3a8a]"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {/* Background Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-500 ${
                      isOverWhiteBackground
                        ? "bg-gradient-to-r from-[#264D88]/5 via-[#1e3a8a]/10 to-[#264D88]/5"
                        : "bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                    }`}
                  ></div>

                  {/* Animated Border */}
                  <div
                    className={`absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-500 ${
                      isOverWhiteBackground
                        ? "group-hover:border-[#264D88]/30"
                        : "group-hover:border-white/30"
                    }`}
                  ></div>

                  {/* Text with Gradient Effect */}
                  <span
                    className={` relative z-10 transition-all duration-300 ${
                      isOverWhiteBackground
                        ? "group-hover:bg-gradient-to-r group-hover:from-[#264D88] group-hover:to-[#1e3a8a] group-hover:bg-clip-text group-hover:text-transparent"
                        : "group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text group-hover:text-transparent"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                  </span>

                  {/* Bottom Progress Bar */}
                  <div
                    className={`absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 rounded-full ${
                      isOverWhiteBackground
                        ? "bg-gradient-to-r from-[#264D88] to-[#1e3a8a]"
                        : "bg-gradient-to-r from-white to-gray-200"
                    }`}
                  ></div>

                  {/* Floating Dots */}
                  <div
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse ${
                      isOverWhiteBackground ? "bg-[#264D88]" : "bg-white"
                    }`}
                  ></div>
                  <div
                    className={`absolute -bottom-1 -left-1 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse ${
                      isOverWhiteBackground ? "bg-blue-400" : "bg-white/80"
                    }`}
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </Link>
              ))}
            </div>

            {/* Desktop Auth & Language */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Enhanced Language Selector */}
              <div className="relative z-[200]" ref={langDropdownRef}>
                <button
                  onClick={() => {
                    console.log(
                      "Language button clicked, current state:",
                      isLangOpen
                    );
                    setIsLangOpen(!isLangOpen);
                  }}
                  className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-[#264D88]/10 hover:to-[#1e3a8a]/10 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 group border border-gray-200 hover:border-[#264D88]/30 shadow-lg hover:shadow-xl"
                >
                  <div className="relative">
                    <Globe
                      size={18}
                      className="text-[#264D88] group-hover:rotate-180 transition-transform duration-500"
                    />
                  </div>

                  <span className="hidden sm:inline text-gray-700 group-hover:text-[#264D88] transition-colors">
                    {currentLanguage.name}
                  </span>
                  <div className="w-2 h-2 bg-[#264D88] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white backdrop-blur-xl rounded-2xl shadow-2xl z-[9999] border-2 border-[#264D88]/30 overflow-hidden transform translate-y-0 opacity-100 transition-all duration-300">
                    <div className="p-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-[#264D88]/10 hover:to-[#1e3a8a]/10 flex items-center space-x-3 transition-all duration-300 rounded-xl group ${
                            i18n.language === lang.code
                              ? "bg-gradient-to-r from-[#264D88]/15 to-[#1e3a8a]/15 text-[#264D88] font-semibold"
                              : "text-gray-700 hover:text-[#264D88]"
                          }`}
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {lang.name}
                          </span>
                          {i18n.language === lang.code && (
                            <div className="ml-auto flex items-center space-x-2">
                              <div className="w-2 h-2 bg-[#264D88] rounded-full animate-pulse"></div>
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Auth Buttons */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 bg-gradient-to-r from-[#264D88]/10 to-[#1e3a8a]/10 hover:from-[#264D88]/20 hover:to-[#1e3a8a]/20 text-[#264D88] px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 group border border-[#264D88]/20 hover:border-[#264D88]/40 shadow-lg hover:shadow-xl"
                  >
                    <div className="relative">
                      <User
                        size={18}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <span className="hidden sm:inline group-hover:translate-x-1 transition-transform duration-300">
                      {user.name || user.email}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 group border border-red-200 hover:border-red-300 shadow-lg hover:shadow-xl"
                  >
                    <LogOut
                      size={18}
                      className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                    />
                    <span className="hidden sm:inline group-hover:translate-x-1 transition-transform duration-300">
                      {t("nav.logout")}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-[#264D88] px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-transparent hover:border-gray-200 shadow-lg hover:shadow-xl group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {t("nav.login")}
                    </span>
                  </Link>
                  <Link
                    to="/quote"
                    className="bg-gradient-to-r from-[#264D88] via-[#1e3a8a] to-[#264D88] hover:from-[#1e3a8a] hover:via-[#264D88] hover:to-[#1e3a8a] text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 group border border-[#264D88]/20"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {t("nav.getQuote")}
                    </span>
                    <div className="relative">
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-4 bg-gradient-to-r from-[#264D88]/10 to-[#1e3a8a]/10 hover:from-[#264D88]/20 hover:to-[#1e3a8a]/20 rounded-2xl transition-all duration-500 group border border-[#264D88]/20 hover:border-[#264D88]/40 shadow-lg hover:shadow-xl"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#264D88]/5 to-[#1e3a8a]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative w-7 h-7 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-7 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] transition-all duration-500 rounded-full ${
                      isMenuOpen
                        ? "rotate-45 translate-y-1.5"
                        : "-translate-y-1.5"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-7 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] transition-all duration-500 rounded-full ${
                      isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-7 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] transition-all duration-500 rounded-full ${
                      isMenuOpen
                        ? "-rotate-45 -translate-y-1.5"
                        : "translate-y-1.5"
                    }`}
                  ></span>
                </div>

                {/* Floating Dots */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div
                  className="absolute -bottom-1 -left-1 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-6 pt-6 pb-8 space-y-3 bg-gradient-to-b from-white/95 to-blue-50/90 backdrop-blur-xl border-t-4 border-[#264D88] rounded-b-2xl shadow-2xl">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavLinkClick();
                      navigate(item.path);
                    }}
                    className="flex items-center space-x-4 text-gray-700 hover:text-[#264D88] hover:bg-gradient-to-r hover:from-[#264D88]/10 hover:to-[#1e3a8a]/10 px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-500 group border border-transparent hover:border-[#264D88]/20 shadow-lg hover:shadow-xl"
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-[#264D88]/30 rounded-full group-hover:scale-200 transition-transform duration-500"></div>
                    </div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {t(`nav.${item.key}`)}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight
                        size={16}
                        className="text-[#264D88] group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                ))}

                {/* Enhanced Mobile Language Selector */}
                <div className="pt-6 border-t-2 border-gray-200/50">
                  <div className="px-5 py-3 text-sm font-bold text-[#264D88] mb-4 bg-gradient-to-r from-[#264D88]/10 to-[#1e3a8a]/10 rounded-xl">
                    {t("common.language")}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center space-x-3 px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 group border shadow-lg hover:shadow-xl ${
                          i18n.language === lang.code
                            ? "bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white border-[#264D88] transform scale-105"
                            : "bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 hover:bg-gradient-to-r hover:from-[#264D88]/10 hover:to-[#1e3a8a]/10 border-gray-200 hover:border-[#264D88]/30"
                        }`}
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {lang.flag}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {lang.name}
                        </span>
                        {i18n.language === lang.code && (
                          <div className="ml-auto flex items-center space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Mobile Auth */}
                <div className="pt-6 border-t-2 border-gray-200/50">
                  {user ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-4 bg-gradient-to-r from-[#264D88]/10 to-[#1e3a8a]/10 text-[#264D88] px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-500 group border border-[#264D88]/20 hover:border-[#264D88]/40 shadow-lg hover:shadow-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="relative">
                          <User
                            size={22}
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {user.name || user.email}
                        </span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 w-full px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-500 hover:from-red-100 hover:to-pink-100 border border-red-200 hover:border-red-300 shadow-lg hover:shadow-xl group"
                      >
                        <LogOut
                          size={22}
                          className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                        />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {t("nav.logout")}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        className="flex items-center justify-center text-gray-700 hover:text-[#264D88] px-5 py-4 rounded-2xl text-base font-semibold transition-all duration-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-transparent hover:border-gray-200 shadow-lg hover:shadow-xl group"
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavLinkClick();
                          navigate("/login");
                        }}
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {t("nav.login")}
                        </span>
                      </Link>
                      <Link
                        to="/quote"
                        className="flex items-center justify-center space-x-3 bg-gradient-to-r from-[#264D88] via-[#1e3a8a] to-[#264D88] text-white px-5 py-4 rounded-2xl text-base font-bold transition-all duration-500 hover:shadow-2xl group border border-[#264D88]/20"
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavLinkClick();
                          navigate("/quote");
                        }}
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {t("nav.getQuote")}
                        </span>
                        <div className="relative">
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-2 transition-transform duration-300"
                          />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
