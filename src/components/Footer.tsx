import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.globalShipping")}
                </Link>
              </li>
              <li>
                <Link
                  to="/warehousing"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.warehousing")}
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.tracking")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.help")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.customerSupport")}
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.trackShipment")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/insurance"
                  className="hover:text-blue-400"
                  onClick={scrollToTop}
                >
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
  );
};

export default Footer;
