import React from "react";
import { useTranslation } from "react-i18next";
import { Truck, Globe, Shield, Users, Award, Clock } from "lucide-react";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "150+", label: "Countries Served" },
    { number: "99.8%", label: "On-Time Delivery" },
    { number: "24/7", label: "Customer Support" },
  ];

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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#264D88] mb-2">
                  {stat.number}
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
                  src="/images/about-story.jpg"
                  alt="About Story"
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
