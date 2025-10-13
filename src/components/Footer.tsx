import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

const Footer: React.FC = () => {
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
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
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

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LogiFlow</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400">
                    {t("footer.services")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400">
                    {t("footer.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.services")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shipping" className="hover:text-blue-400">
                    {t("footer.globalShipping")}
                  </Link>
                </li>
                <li>
                  <Link to="/warehousing" className="hover:text-blue-400">
                    {t("footer.warehousing")}
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="hover:text-blue-400">
                    {t("footer.tracking")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.support")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="hover:text-blue-400">
                    {t("footer.help")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400">
                    {t("footer.customerSupport")}
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="hover:text-blue-400">
                    {t("footer.trackShipment")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.legal")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="hover:text-blue-400">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-blue-400">
                    {t("footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link to="/insurance" className="hover:text-blue-400">
                    {t("footer.insurance")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
