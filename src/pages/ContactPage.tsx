import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-[#264D88]" />,
      title: t("contact.headquarters"),
      details: [
        t("contact.addressLine1", "123 Logistics Street"),
        t("contact.addressLine2", "Global City, GC 12345"),
        t("contact.addressCountry", "United States"),
      ],
    },
    {
      icon: <Phone className="w-6 h-6 text-[#264D88]" />,
      title: t("contact.phone"),
      details: [
        t("contact.phoneMain1", "+99364108586"),
        t("contact.phoneMain2", "+99371713777"),
        t("contact.phoneEmergency", "Emergency: +99364949363"),
      ],
    },
    {
      icon: <Mail className="w-6 h-6 text-[#264D88]" />,
      title: t("contact.email"),
      details: [
        t("contact.emailInfo", "info@htl-tm.com"),
        t("contact.emailSupport", "md@htl-tm.com"),
        t("contact.emailSales", "sales@htl-tm.com"),
      ],
    },
    {
      icon: <Clock className="w-6 h-6 text-[#264D88]" />,
      title: t("contact.businessHours"),
      details: [
        t("contact.hoursWeekdays", "Monday - Friday: 8:00 AM - 6:00 PM"),
        t("contact.hoursSaturday", "Saturday: 9:00 AM - 4:00 PM"),
        t("contact.hoursSunday", "Sunday: Closed"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {info.icon}
                  <h3 className="text-lg font-semibold text-gray-900 ml-3">
                    {info.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contact.sendMessage")}
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("contact.messageSent")}
                  </h3>
                  <p className="text-gray-600">
                    {t("contact.messageSentSubtitle")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.fullName")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.emailAddress")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.company")}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.phoneNumber")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.subject")} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent transition-colors"
                    >
                      <option value="">
                        {t("contact.form.selectSubject")}
                      </option>
                      <option value="quote">
                        {t("contact.form.requestQuote")}
                      </option>
                      <option value="support">
                        {t("contact.form.customerSupport")}
                      </option>
                      <option value="partnership">
                        {t("contact.form.partnership")}
                      </option>
                      <option value="general">
                        {t("contact.form.general")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.message")} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent transition-colors resize-none"
                      placeholder={t("contact.form.messagePlaceholder")}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white py-4 px-6 rounded-lg font-semibold hover:from-[#1e3a8a] hover:to-[#264D88] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t("contact.form.sendButton")}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contact.findUs", "Find Us")}
              </h2>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-[#264D88]" />
                  <p className="text-lg font-medium">
                    {t("contact.mapPlaceholder", "Interactive Map Placeholder")}
                  </p>
                  <p className="text-sm">
                    {t("contact.mapRecommended", "600x400px recommended")}
                  </p>
                  <p className="text-xs mt-2">
                    {t(
                      "contact.mapIntegration",
                      "Google Maps or similar integration"
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("contact.quickContact", "Quick Contact")}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#264D88]" />
                    <span className="text-gray-600">
                      {t("contact.phoneMain2", "+1 (555) 123-4567")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#264D88]" />
                    <span className="text-gray-600">
                      {t("contact.emailInfo", "info@htl-tm.com")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-[#264D88]" />
                    <span className="text-gray-600">
                      {t("contact.emergencySupport", "24/7 Emergency Support")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
