import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, Clock } from "lucide-react";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-[#264D88]" />,
      title: t("features.globalShipping.title"),
      description: t("features.globalShipping.description"),
    },
    {
      icon: <Shield className="w-8 h-8 text-[#264D88]" />,
      title: t("features.secureTransport.title"),
      description: t("features.secureTransport.description"),
    },
    {
      icon: <Clock className="w-8 h-8 text-[#264D88]" />,
      title: t("features.support24.title"),
      description: t("features.support24.description"),
    },
  ];

  const testimonials = [
    {
      name: t("testimonials.sarah.name"),
      role: t("testimonials.sarah.role"),
      content: t("testimonials.sarah.content"),
      rating: 5,
    },
    {
      name: t("testimonials.michael.name"),
      role: t("testimonials.michael.role"),
      content: t("testimonials.michael.content"),
      rating: 5,
    },
    {
      name: t("testimonials.emma.name"),
      role: t("testimonials.emma.role"),
      content: t("testimonials.emma.content"),
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster="/images/logistics-hero-poster.jpg"
          >
            <source src="/videos/logistics-hero.webm" type="video/webm" />
            {/* Fallback for browsers that don't support video */}
            <div className="w-full h-full bg-gradient-to-br from-[#264D88] to-[#1e3a8a] flex items-center justify-center">
              <p className="text-white/50 text-sm">
                Video background not supported
              </p>
            </div>
          </video>
          {/* Video Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#264D88]/70 to-[#1e3a8a]/70"></div>
          {/* Additional overlay for mobile optimization */}
          <div className="absolute inset-0 bg-black/20 md:hidden"></div>
        </div>

        {/* Fallback Background (shows if video fails to load) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#264D88] to-[#1e3a8a] video-fallback"></div>

        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full blur-3xl bg-blue-500/20 animate-pulse"></div>
            <div
              className="absolute top-20 sm:top-40 right-4 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl bg-purple-500/20 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 h-56 sm:w-80 sm:h-80 rounded-full blur-3xl bg-indigo-500/20 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-20 sm:bottom-40 right-1/4 sm:right-1/3 w-40 h-40 sm:w-64 sm:h-64 rounded-full blur-3xl bg-pink-500/20 animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 hidden sm:block">
            <div
              className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/30 animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-blue-400/50 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-pink-400/50 animate-bounce"
              style={{ animationDelay: "0.7s" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-indigo-400/30 animate-bounce"
              style={{ animationDelay: "0.9s" }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-tight px-2">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
              <span className="hidden sm:inline">{t("hero.subtitle")}</span>
              <span className="sm:hidden">{t("hero.subtitleMobile")}</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center pt-4 sm:pt-6 lg:pt-8 px-4">
              <Link
                to="/quote"
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#264D88] text-white rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#264D88]/25 flex items-center justify-center min-w-[160px] sm:min-w-[200px]"
              >
                <span className="relative z-10 flex items-center">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity"></div>
              </Link>

              <Link
                to="/services"
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 backdrop-blur-sm flex items-center justify-center min-w-[160px] sm:min-w-[200px]"
              >
                <span className="flex items-center">
                  {t("hero.learnMore")}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 rounded-full mt-2 bg-white/50 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#264D88] to-[#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <Link
            to="/quote"
            className="bg-white hover:bg-gray-100 text-[#264D88] px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            {t("cta.button")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LogiFlow</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shipping" className="hover:text-blue-400">
                    Global Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/warehousing" className="hover:text-blue-400">
                    Warehousing
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="hover:text-blue-400">
                    Package Tracking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="hover:text-blue-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link to="/tracking" className="hover:text-blue-400">
                    Track Shipment
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-blue-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/insurance" className="hover:text-blue-400">
                    Insurance Coverage
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 LogiFlow. All rights reserved. | Global Logistics
              Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
