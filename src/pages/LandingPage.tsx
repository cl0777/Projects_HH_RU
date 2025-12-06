import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  Clock,
  Globe,
  Package,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  RailSymbol,
  TrainTrack,
  Container,
  Anchor,
  Ship,
  Warehouse,
  File,
} from "lucide-react";

// Counter animation hook
const useCountUp = (
  end: number,
  duration: number = 2000,
  isVisible: boolean = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(
        easeOutQuad(progress) * (end - startValue) + startValue
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
};

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-[#264D88]" />,
      title: t("features.globalShipping.title"),
      subtitle: t("features.globalShipping.description"),
    },
    {
      icon: <TrainTrack className="w-8 h-8 text-[#264D88]" />,
      title: t("features.railwayTransport.title"),
      subtitle: t("features.railwayTransport.description"),
    },

    {
      icon: <Container className="w-8 h-8 text-[#264D88]" />,
      title: t("features.multiModalTransport.title"),
      subtitle: t("features.multiModalTransport.description"),
    },
    {
      icon: <Anchor className="w-8 h-8 text-[#264D88]" />,
      title: t("features.transshipment.title"),
      subtitle: t("features.transshipment.description"),
    },
    {
      icon: <Shield className="w-8 h-8 text-[#264D88]" />,
      title: t("features.secureTransport.title"),
      subtitle: t("features.secureTransport.description"),
    },
    {
      icon: <Clock className="w-8 h-8 text-[#264D88]" />,
      title: t("features.support24.title"),
      subtitle: t("features.support24.description"),
    },
  ];

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Counter Component
  const StatCounter: React.FC<{
    value: number;
    suffix: string;
    prefix?: string;
  }> = ({ value, suffix, prefix = "" }) => {
    const count = useCountUp(value, 2000, isVisible);

    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1);
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(0);
      }
      return num.toString();
    };

    return (
      <span>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    );
  };

  // NEW: Stats data
  const stats = [
    {
      icon: <Globe className="w-8 h-8" />,
      value: 15,
      suffix: "+",
      label: t("landing.stats.countriesServed"),
    },
    {
      icon: <Package className="w-8 h-8" />,
      value: 1_500_000,
      suffix: "M MT",
      label: t("landing.stats.packagesDelivered"),
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 1_500,
      suffix: "K+",
      label: t("landing.stats.happyClients"),
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 5,
      suffix: "+",
      label: t("landing.stats.yearsExperience"),
    },
  ];

  // NEW: Service highlights
  const services = [
    {
      title: t("services.oceanFreight.title"),
      description: "",
      icon: <Ship className="w-8 h-8 text-[#264D88]" />,
    },
    {
      title: t("services.railwayTransport.title"),
      description: "",
      icon: <TrainTrack className="w-8 h-8 text-[#264D88]" />,
    },
    {
      title: t("services.multiModalTransport.title"),
      description: "",
      icon: <Container className="w-8 h-8 text-[#264D88]" />,
    },
    {
      title: t("services.roadTransport.title"),
      description: "",
      icon: <Truck className="w-8 h-8 text-[#264D88]" />,
    },
    {
      title: t("services.warehousing.title"),
      description: "",
      icon: <Warehouse className="w-8 h-8 text-[#264D88]" />,
    },
    {
      title: t("services.customs.title"),
      description: "",
      icon: <File className="w-8 h-8 text-[#264D88]" />,
    },
  ];

  // NEW: Why choose us points
  const whyChooseUs = [
    { text: t("landing.why.bullets.tracking") },
    { text: t("landing.why.bullets.pricing") },
    { text: t("landing.why.bullets.insurance") },
    { text: t("landing.why.bullets.accountManagers") },
    { text: t("landing.why.bullets.globalNetwork") },
    { text: t("landing.why.bullets.ecoFriendly") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt={t("landing.images.logisticsAlt")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#264D88]/80 via-[#1e3a8a]/70 to-[#264D88]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="">
            {/* Main Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-bold text-white leading-snug sm:leading-normal text-center pt-10 pb-6">
                <span className="block bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text ">
                  {t("hero.title")}
                </span>
              </h1>
            </div>
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/80 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
              <span className="hidden sm:inline">{t("hero.subtitle")}</span>
              <span className="sm:hidden">{t("hero.subtitleMobile")}</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-6 justify-center items-center pt-4 sm:pt-6 lg:pt-8 px-4">
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

      {/* NEW: Stats Section */}
      <section
        className="py-16 bg-gradient-to-br from-[#264D88] to-[#1e3a8a]"
        ref={statsRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white transform transition-all duration-500 hover:scale-110"
                style={{
                  animation: isVisible
                    ? `fadeIn 0.6s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <StatCounter
                    value={Number(stat.value)}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
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
            {features?.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Comprehensive Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("landing.services.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.services.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {/* <Link
                  to="/services"
                  className="text-[#264D88] font-semibold hover:underline inline-flex items-center"
                >
                  {t("hero.learnMore")} <ArrowRight className="ml-1 w-4 h-4" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t("landing.why.title")}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t("landing.why.subtitle")}
              </p>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
              {/* <Link
                to="/about"
                className="mt-8 inline-flex items-center px-6 py-3 bg-[#264D88] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors"
              >
                {t("about.cta.button")} <ArrowRight className="ml-2 w-5 h-5" />
              </Link> */}
            </div>
            <div className="relative">
              <img
                src="/images/shipping.jpg"
                alt={t("landing.images.logisticsAlt")}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="w-12 h-12 text-green-500" />
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      93.7%
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("landing.metrics.onTimeDelivery")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("landing.how.title")}
            </h2>
            <p className="text-xl text-gray-600">{t("landing.how.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t("landing.how.steps.requestQuote.title"),
                desc: t("landing.how.steps.requestQuote.desc"),
              },
              {
                step: "02",
                title: t("landing.how.steps.getPricing.title"),
                desc: t("landing.how.steps.getPricing.desc"),
              },
              {
                step: "03",
                title: t("landing.how.steps.bookShipment.title"),
                desc: t("landing.how.steps.bookShipment.desc"),
              },
              {
                step: "04",
                title: t("landing.how.steps.trackReceive.title"),
                desc: t("landing.how.steps.trackReceive.desc"),
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-[#264D88] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-gray-300 w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Industry Focus Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("services.industriesWeServe")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("services.industriesWeServeSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              t("industries.ecommerceRetail"),
              t("industries.manufacturing"),
              t("industries.retail"),
              t("industries.healthcarePharmaceuticals"),
              t("industries.technology"),
              t("industries.automotive"),
              t("industries.foodBeverage"),
              t("industries.textiles"),
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900">{industry}</h3>
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
    </div>
  );
};

export default LandingPage;
