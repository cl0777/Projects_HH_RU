import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Shield, Users, Award } from "lucide-react";

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

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const stats = [
    { value: 10000, suffix: "+", label: t("about.stats.happyCustomers") },
    { value: 150, suffix: "+", label: t("about.stats.countriesServed") },
    {
      value: 99.8,
      suffix: "%",
      label: t("about.stats.onTimeDelivery"),
      decimals: 1,
    },
    { value: 24, suffix: "/7", label: t("about.stats.customerSupport") },
  ];

  // Counter Component
  const StatCounter: React.FC<{
    value: number;
    suffix: string;
    decimals?: number;
  }> = ({ value, suffix, decimals = 0 }) => {
    const count = useCountUp(value, 2000, isVisible);

    const formatNumber = (num: number) => {
      if (decimals > 0) {
        return num.toFixed(decimals);
      }
      return num.toLocaleString();
    };

    return (
      <span>
        {formatNumber(count)}
        {suffix}
      </span>
    );
  };

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-[#264D88]" />,
      title: t("about.values.integrity.title"),
      description: t("about.values.integrity.description"),
    },
    {
      icon: <Globe className="w-8 h-8 text-[#264D88]" />,
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.description"),
    },
    {
      icon: <Users className="w-8 h-8 text-[#264D88]" />,
      title: t("about.values.customerCentric.title"),
      description: t("about.values.customerCentric.description"),
    },
    {
      icon: <Award className="w-8 h-8 text-[#264D88]" />,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform transition-all duration-500 hover:scale-110"
                style={{
                  animation: isVisible
                    ? `fadeIn 0.6s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#264D88] mb-2">
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t("about.story.title")}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t("about.story.content1")}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                {t("about.story.content2")}
              </p>
              <p className="text-lg text-gray-600">
                {t("about.story.content3")}
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-500 w-full h-full">
                <img
                  src="/images/about-story.svg"
                  alt={t("about.story.imageAlt")}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.leadership.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("about.leadership.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-[#264D88] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("about.mission.title")}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {t("about.mission.content1")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
