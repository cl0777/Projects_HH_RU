import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Truck,
  Globe,
  Package,
  Warehouse,
  Clock,
  Shield,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Truck className="w-12 h-12 text-[#264D88]" />,
      title: t("services.freightForwarding.title"),
      description: t("services.freightForwarding.description"),
      features: [
        t("services.freightForwarding.features.airFreight"),
        t("services.freightForwarding.features.seaFreight"),
        t("services.freightForwarding.features.roadTransport"),
        t("services.freightForwarding.features.expressDelivery"),
      ],
      image: "shipping",
    },
    {
      icon: <Warehouse className="w-12 h-12 text-[#264D88]" />,
      title: t("services.warehousing.title"),
      description: t("services.warehousing.description"),
      features: [
        t("services.warehousing.features.climateControl"),
        t("services.warehousing.features.inventoryManagement"),
        t("services.warehousing.features.pickPack"),
        t("services.warehousing.features.crossDocking"),
      ],
      image: "warehouse",
    },
    {
      icon: <Package className="w-12 h-12 text-[#264D88]" />,
      title: t("services.packageTracking.title"),
      description: t("services.packageTracking.description"),
      features: [
        t("services.packageTracking.features.realTimeUpdates"),
        t("services.packageTracking.features.smsAlerts"),
        t("services.packageTracking.features.onlinePortal"),
        t("services.packageTracking.features.mobileApp"),
      ],
      image: "tracking",
    },
    {
      icon: <Shield className="w-12 h-12 text-[#264D88]" />,
      title: t("services.secureTransport.title"),
      description: t("services.secureTransport.description"),
      features: [
        t("services.secureTransport.features.insuranceCoverage"),
        t("services.secureTransport.features.securityProtocols"),
        t("services.secureTransport.features.chainOfCustody"),
        t("services.secureTransport.features.riskAssessment"),
      ],
      image: "security",
    },
    {
      icon: <Globe className="w-12 h-12 text-[#264D88]" />,
      title: t("services.internationalLogistics.title"),
      description: t("services.internationalLogistics.description"),
      features: [
        t("services.internationalLogistics.features.customsClearance"),
        t("services.internationalLogistics.features.documentation"),
        t("services.internationalLogistics.features.compliance"),
        t("services.internationalLogistics.features.dutyManagement"),
      ],

      image: "international",
    },
    {
      icon: <Clock className="w-12 h-12 text-[#264D88]" />,
      title: t("services.support24.title"),
      description: t("services.support24.description"),
      features: [
        t("services.support24.features.hotline"),
        t("services.support24.features.onlineChat"),
        t("services.support24.features.emergencySupport"),
        t("services.support24.features.dedicatedManager"),
      ],
      image: "support",
    },
  ];

  const industries = [
    t("industries.ecommerceRetail"),
    t("industries.manufacturing"),
    t("industries.healthcarePharmaceuticals"),
    t("industries.automotive"),
    t("industries.technology"),
    t("industries.foodBeverage"),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              t("services.title")
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              t("services.subtitle")
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden668c318a-2456-45af-98a1-26888cc6937d.jpg"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    {service.icon}
                    <h3 className="text-2xl font-bold text-gray-900 ml-4">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6 text-lg">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      t("services.keyFeatures")
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-gray-600"
                        >
                          <div className="w-2 h-2 bg-[#264D88] rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/quote"
                    className="inline-flex items-center text-[#264D88] font-semibold hover:text-[#1e3a8a] transition-colors"
                  >
                    {t("component.getQuote")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500 w-full h-full">
                    <img
                      src={`/images/${service.image}.jpg`}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("services.industriesWeServe")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("services.industriesWeServeSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-lg hover:bg-[#264D88] hover:text-white transition-colors"
              >
                <h3 className="font-semibold">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("services.howWeWork")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("services.howWeWorkSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t("services.howWeWork.steps.step1"),
                desc: t("services.howWeWork.steps.step1Description"),
              },
              {
                step: "02",
                title: t("services.howWeWork.steps.step2"),
                desc: t("services.howWeWork.steps.step2Description"),
              },
              {
                step: "03",
                title: t("services.howWeWork.steps.step3"),
                desc: t("services.howWeWork.steps.step3Description"),
              },
              {
                step: "04",
                title: t("services.howWeWork.steps.step4"),
                desc: t("services.howWeWork.steps.step4Description"),
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#264D88] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#264D88] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("services.cta.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("services.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote"
              className="bg-white text-[#264D88] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              {t("services.cta.button")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#264D88] transition-colors inline-flex items-center justify-center"
            >
              {t("services.cta.contactUs")}
              <Phone className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
