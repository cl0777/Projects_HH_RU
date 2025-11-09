import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Package,
  Truck,
  Ship,
  Plane,
  Warehouse,
  Shield,
  ChevronRight,
  Search,
} from "lucide-react";

interface Terminal {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  coordinates: { lat: number; lng: number };
  images: string[];
  capacity: string;
  specializations: string[];
}

const TerminalsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalTerminal, setModalTerminal] = useState<Terminal | null>(null);

  const terminals: Terminal[] = [
    {
      id: "ashgabat",
      name: t("terminals.ashgabat.name"),
      city: t("terminals.ashgabat.city"),
      address: t("terminals.ashgabat.address"),
      phone: "+993 12 44-55-66",
      email: "ashgabat@htl.tm",
      hours: t("terminals.ashgabat.hours"),
      capacity: t("terminals.ashgabat.capacity"),
      coordinates: { lat: 37.9601, lng: 58.3261 },
      images: [
        "/images/sarahs/sarahs_1.jpg",
        "/images/sarahs/sarahs_2.jpg",
        "/images/sarahs/sarahs_3.jpg",
        "/images/sarahs/sarahs_4.jpg",
        "/images/sarahs/sarahs_5.jpg",
        "/images/sarahs/sarahs_6.jpg",
        "/images/sarahs/sarahs_7.jpg",
        "/images/sarahs/sarahs_8.jpg",
        "/images/sarahs/sarahs_9.jpg",
        "/images/sarahs/sarahs_10.jpg",
      ],
      services: ["freight", "warehousing", "customs", "road", "security"],
      specializations: [
        t("terminals.ashgabat.spec1"),
        t("terminals.ashgabat.spec2"),
        t("terminals.ashgabat.spec3"),
      ],
    },
    {
      id: "turkmenbashi",
      name: t("terminals.turkmenbashi.name"),
      city: t("terminals.turkmenbashi.city"),
      address: t("terminals.turkmenbashi.address"),
      phone: "+993 243 2-22-33",
      email: "turkmenbashi@htl.tm",
      hours: t("terminals.turkmenbashi.hours"),
      capacity: t("terminals.turkmenbashi.capacity"),
      coordinates: { lat: 40.0225, lng: 52.9553 },
      images: [
        "/images/sarahs/sarahs_1.jpg",
        "/images/sarahs/sarahs_2.jpg",
        "/images/sarahs/sarahs_3.jpg",
        "/images/sarahs/sarahs_4.jpg",
        "/images/sarahs/sarahs_5.jpg",
        "/images/sarahs/sarahs_6.jpg",
        "/images/sarahs/sarahs_7.jpg",
        "/images/sarahs/sarahs_8.jpg",
        "/images/sarahs/sarahs_9.jpg",
        "/images/sarahs/sarahs_10.jpg",
      ],
      services: [
        "freight",
        "warehousing",
        "customs",
        "ocean",
        "road",
        "security",
      ],
      specializations: [
        t("terminals.turkmenbashi.spec1"),
        t("terminals.turkmenbashi.spec2"),
        t("terminals.turkmenbashi.spec3"),
      ],
    },
    {
      id: "mary",
      name: t("terminals.mary.name"),
      city: t("terminals.mary.city"),
      address: t("terminals.mary.address"),
      phone: "+993 522 5-11-22",
      email: "mary@htl.tm",
      hours: t("terminals.mary.hours"),
      capacity: t("terminals.mary.capacity"),
      coordinates: { lat: 37.5942, lng: 61.8306 },
      images: [
        "/images/sarahs/sarahs_1.jpg",
        "/images/sarahs/sarahs_2.jpg",
        "/images/sarahs/sarahs_3.jpg",
        "/images/sarahs/sarahs_4.jpg",
        "/images/sarahs/sarahs_5.jpg",
        "/images/sarahs/sarahs_6.jpg",
        "/images/sarahs/sarahs_7.jpg",
        "/images/sarahs/sarahs_8.jpg",
        "/images/sarahs/sarahs_9.jpg",
        "/images/sarahs/sarahs_10.jpg",
      ],
      services: ["freight", "warehousing", "road", "security"],
      specializations: [
        t("terminals.mary.spec1"),
        t("terminals.mary.spec2"),
        t("terminals.mary.spec3"),
      ],
    },
    {
      id: "turkmenabat",
      name: t("terminals.turkmenabat.name"),
      city: t("terminals.turkmenabat.city"),
      address: t("terminals.turkmenabat.address"),
      phone: "+993 422 4-33-44",
      email: "turkmenabat@htl.tm",
      hours: t("terminals.turkmenabat.hours"),
      capacity: t("terminals.turkmenabat.capacity"),
      coordinates: { lat: 39.0933, lng: 63.5784 },
      images: [
        "/images/sarahs/sarahs_1.jpg",
        "/images/sarahs/sarahs_2.jpg",
        "/images/sarahs/sarahs_3.jpg",
        "/images/sarahs/sarahs_4.jpg",
        "/images/sarahs/sarahs_5.jpg",
        "/images/sarahs/sarahs_6.jpg",
        "/images/sarahs/sarahs_7.jpg",
        "/images/sarahs/sarahs_8.jpg",
        "/images/sarahs/sarahs_9.jpg",
        "/images/sarahs/sarahs_10.jpg",
      ],
      services: ["freight", "warehousing", "customs", "road", "security"],
      specializations: [
        t("terminals.turkmenabat.spec1"),
        t("terminals.turkmenabat.spec2"),
        t("terminals.turkmenabat.spec3"),
      ],
    },
    {
      id: "dashoguz",
      name: t("terminals.dashoguz.name"),
      city: t("terminals.dashoguz.city"),
      address: t("terminals.dashoguz.address"),
      phone: "+993 322 6-55-77",
      email: "dashoguz@htl.tm",
      hours: t("terminals.dashoguz.hours"),
      capacity: t("terminals.dashoguz.capacity"),
      coordinates: { lat: 41.8369, lng: 59.9659 },
      images: [
        "/images/sarahs/sarahs_1.jpg",
        "/images/sarahs/sarahs_2.jpg",
        "/images/sarahs/sarahs_3.jpg",
        "/images/sarahs/sarahs_4.jpg",
        "/images/sarahs/sarahs_5.jpg",
        "/images/sarahs/sarahs_6.jpg",
        "/images/sarahs/sarahs_7.jpg",
        "/images/sarahs/sarahs_8.jpg",
        "/images/sarahs/sarahs_9.jpg",
        "/images/sarahs/sarahs_10.jpg",
      ],
      services: ["freight", "warehousing", "road", "security"],
      specializations: [
        t("terminals.dashoguz.spec1"),
        t("terminals.dashoguz.spec2"),
        t("terminals.dashoguz.spec3"),
      ],
    },
  ];

  const serviceIcons: { [key: string]: React.ReactNode } = {
    freight: <Package className="w-5 h-5" />,
    warehousing: <Warehouse className="w-5 h-5" />,
    customs: <Shield className="w-5 h-5" />,
    air: <Plane className="w-5 h-5" />,
    ocean: <Ship className="w-5 h-5" />,
    road: <Truck className="w-5 h-5" />,
    security: <Shield className="w-5 h-5" />,
  };

  const filteredTerminals = terminals.filter(
    (terminal) =>
      terminal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      terminal.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      terminal.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#264D88] via-[#1e3a8a] to-[#264D88] text-white py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <MapPin className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t("terminals.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t("terminals.hero.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>{t("terminals.hero.stat1")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>{t("terminals.hero.stat2")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span>{t("terminals.hero.stat3")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C300,100 600,0 900,50 L900,120 L0,120 Z"
              fill="white"
              opacity="0.1"
            />
            <path
              d="M0,70 C300,120 600,20 900,70 L900,120 L0,120 Z"
              fill="white"
              opacity="0.1"
            />
            <path
              d="M0,90 C300,140 600,40 1200,90 L1200,120 L0,120 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("terminals.search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#264D88] focus:outline-none transition-all duration-300 text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Terminals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTerminals.map((terminal) => (
            <div
              key={terminal.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out overflow-hidden border-2 border-gray-100 hover:border-[#264D88]/50"
            >
              {/* Terminal Header */}
              <div className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {terminal.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-blue-100">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{terminal.city}</span>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg rounded-full p-3">
                      <Warehouse className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-300 text-sm">
                    <Package className="w-4 h-4" />
                    <span>{terminal.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Terminal Details */}
              <div className="p-6">
                {/* Contact Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-[#264D88] mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{terminal.address}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-5 h-5 text-[#264D88] flex-shrink-0" />
                    <a
                      href={`tel:${terminal.phone}`}
                      className="text-sm hover:text-[#264D88] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {terminal.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-5 h-5 text-[#264D88] flex-shrink-0" />
                    <a
                      href={`mailto:${terminal.email}`}
                      className="text-sm hover:text-[#264D88] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {terminal.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Clock className="w-5 h-5 text-[#264D88] flex-shrink-0" />
                    <span className="text-sm">{terminal.hours}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-[#264D88] rounded-full mr-2"></span>
                    {t("terminals.services")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {terminal.services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2 bg-gradient-to-r from-[#264D88]/10 to-[#1e3a8a]/10 text-[#264D88] px-3 py-2 rounded-lg text-xs font-semibold border border-[#264D88]/20"
                      >
                        {serviceIcons[service]}
                        <span>{t(`terminals.serviceTypes.${service}`)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {t("terminals.specializations")}
                  </h4>
                  <ul className="space-y-2">
                    {terminal.specializations.map((spec, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4 text-[#264D88] mt-0.5 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expand Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalTerminal(terminal);
                  }}
                  className="mt-6 pt-4 w-full flex items-center justify-center text-sm transition-all duration-300 cursor-pointer group/btn bg-gradient-to-r from-[#264D88] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#264D88] text-white py-4 rounded-b-2xl font-bold shadow-lg hover:shadow-xl"
                >
                  <span>{t("terminals.viewDetails")}</span>
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTerminals.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t("terminals.noResults.title")}
            </h3>
            <p className="text-gray-600">
              {t("terminals.noResults.description")}
            </p>
          </div>
        )}
      </section>

      {/* Coverage Map Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              {t("terminals.coverage.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("terminals.coverage.subtitle")}
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#264D88]/20">
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              {/* SVG Map of Turkmenistan with Terminal Markers */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#264D88] mx-auto mb-4 animate-bounce" />
                  <p className="text-gray-600 font-semibold">
                    {t("terminals.coverage.mapPlaceholder")}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {terminals.length} {t("terminals.coverage.activeTerminals")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#264D88] via-[#1e3a8a] to-[#264D88] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            {t("terminals.cta.title")}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t("terminals.cta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/quote"
              className="bg-white text-[#264D88] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>{t("terminals.cta.getQuote")}</span>
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>{t("terminals.cta.contact")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalTerminal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setModalTerminal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl transform transition-all duration-500 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#264D88] via-[#1e3a8a] to-[#264D88] text-white p-6 rounded-t-3xl z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-black mb-2">
                    {modalTerminal.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <MapPin className="w-5 h-5" />
                    <span>{modalTerminal.city}</span>
                  </div>
                </div>
                <button
                  onClick={() => setModalTerminal(null)}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Photo Gallery */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  {t("terminals.gallery")}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {modalTerminal.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <img
                        src={image}
                        alt={`${modalTerminal.name} - ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#264D88]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  {t("terminals.contactInfo")}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#264D88] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t("terminals.address")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {modalTerminal.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-[#264D88] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t("terminals.phone")}
                      </p>
                      <a
                        href={`tel:${modalTerminal.phone}`}
                        className="text-sm text-[#264D88] hover:underline"
                      >
                        {modalTerminal.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-[#264D88] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t("terminals.email")}
                      </p>
                      <a
                        href={`mailto:${modalTerminal.email}`}
                        className="text-sm text-[#264D88] hover:underline"
                      >
                        {modalTerminal.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-5 h-5 text-[#264D88] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t("terminals.hours")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {modalTerminal.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-[#264D88] rounded-full mr-3"></span>
                  {t("terminals.services")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {modalTerminal.services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center space-x-2 bg-gradient-to-r from-[#264D88]/10 to-[#1e3a8a]/10 text-[#264D88] px-4 py-3 rounded-xl text-sm font-semibold border-2 border-[#264D88]/20"
                    >
                      {serviceIcons[service]}
                      <span>{t(`terminals.serviceTypes.${service}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  {t("terminals.specializations")}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {modalTerminal.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
                    >
                      <ChevronRight className="w-5 h-5 text-[#264D88] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-gradient-to-r from-[#264D88]/5 to-[#1e3a8a]/5 p-6 rounded-xl border-2 border-[#264D88]/20">
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8 text-[#264D88]" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t("terminals.capacity")}
                    </p>
                    <p className="text-2xl font-black text-[#264D88]">
                      {modalTerminal.capacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-3xl border-t border-gray-200">
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => setModalTerminal(null)}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  {t("common.close")}
                </button>
                <a
                  href="/quote"
                  className="px-6 py-3 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <span>{t("terminals.cta.getQuote")}</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalsPage;
