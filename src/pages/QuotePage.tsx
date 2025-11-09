import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Truck,
  Package,
  MapPin,
  Calculator,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const QuotePage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipment Details mapped to backend schema
    originCity: "",
    originCountry: "",
    destinationCity: "",
    destinationCountry: "",
    weightKg: "",
    lengthCm: "",
    widthCm: "",
    heightCm: "",
    shipmentType: "",
    declaredValueUsd: "",
    description: "",
    totalAmount: 0,
    timeline: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        originCity: formData.originCity,
        originCountry: formData.originCountry,
        destinationCity: formData.destinationCity,
        destinationCountry: formData.destinationCountry,
        weightKg: Number(formData.weightKg) || 0,
        shipmentType: formData.shipmentType,
        lengthCm: Number(formData.lengthCm) || 0,
        widthCm: Number(formData.widthCm) || 0,
        heightCm: Number(formData.heightCm) || 0,
        declaredValueUsd: Number(formData.declaredValueUsd) || 0,
        description: formData.description,
        totalAmount: 0,
        timeline: formData.timeline,
      };

      await axios.post("http://localhost:3030/api/v1/orders", payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to submit quote"
      );
    }
  };

  const services = [
    "Express Delivery",
    "Insurance Coverage",
    "Packaging Service",
    "Customs Clearance",
    "Real-time Tracking",
    "White Glove Service",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Quote Requested!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your request. Our logistics experts will review your
            requirements and provide you with a customized quote within 24
            hours.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#264D88] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-gray-600">
                  We'll review your shipment details
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#264D88] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-gray-600">
                  Calculate the best route and pricing
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#264D88] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-gray-600">
                  Send you a detailed quote via email
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("quote.title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {t("quote.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep
                      ? "bg-[#264D88] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step <= currentStep ? "text-[#264D88]" : "text-gray-500"
                  }`}
                >
                  {step === 1
                    ? t("quote.steps.shipmentDetails")
                    : t("quote.steps.services")}
                </span>
                {step < 2 && (
                  <div
                    className={`w-8 h-0.5 ml-4 ${
                      step < currentStep ? "bg-[#264D88]" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Step 1: Shipment Details */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipment Details
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origin City *
                      </label>
                      <input
                        type="text"
                        name="originCity"
                        required
                        value={formData.originCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origin Country *
                      </label>
                      <input
                        type="text"
                        name="originCountry"
                        required
                        value={formData.originCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination City *
                      </label>
                      <input
                        type="text"
                        name="destinationCity"
                        required
                        value={formData.destinationCity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination Country *
                      </label>
                      <input
                        type="text"
                        name="destinationCountry"
                        required
                        value={formData.destinationCountry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg) *
                      </label>
                      <input
                        type="number"
                        name="weightKg"
                        required
                        value={formData.weightKg}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipment Type *
                      </label>
                      <select
                        name="shipmentType"
                        required
                        value={formData.shipmentType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="air">Air</option>
                        <option value="sea">Sea</option>
                        <option value="road">Road</option>
                        <option value="express">Express</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions (cm)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        name="lengthCm"
                        value={formData.lengthCm}
                        onChange={handleInputChange}
                        placeholder="Length"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                      <input
                        type="number"
                        name="widthCm"
                        value={formData.widthCm}
                        onChange={handleInputChange}
                        placeholder="Width"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                      <input
                        type="number"
                        name="heightCm"
                        value={formData.heightCm}
                        onChange={handleInputChange}
                        placeholder="Height"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Declared Value (USD)
                      </label>
                      <input
                        type="number"
                        name="declaredValueUsd"
                        value={formData.declaredValueUsd}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="Express">Express</option>
                        <option value="Standard">Standard</option>
                        <option value="Economy">Economy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipment Details */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipment Details
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origin *
                      </label>
                      <input
                        type="text"
                        name="origin"
                        required
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination *
                      </label>
                      <input
                        type="text"
                        name="destination"
                        required
                        value={formData.destination}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg) *
                      </label>
                      <input
                        type="number"
                        name="weight"
                        required
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipment Type *
                      </label>
                      <select
                        name="shipmentType"
                        required
                        value={formData.shipmentType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="document">Document</option>
                        <option value="package">Package</option>
                        <option value="freight">Freight</option>
                        <option value="hazardous">Hazardous Material</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions (cm)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        name="dimensions.length"
                        value={formData.dimensions.length}
                        onChange={handleInputChange}
                        placeholder="Length"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                      <input
                        type="number"
                        name="dimensions.width"
                        value={formData.dimensions.width}
                        onChange={handleInputChange}
                        placeholder="Width"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                      <input
                        type="number"
                        name="dimensions.height"
                        value={formData.dimensions.height}
                        onChange={handleInputChange}
                        placeholder="Height"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Declared Value ($)
                      </label>
                      <input
                        type="number"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="urgent">Same Day</option>
                        <option value="express">1-2 Days</option>
                        <option value="standard">3-5 Days</option>
                        <option value="economy">1-2 Weeks</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Additional Services */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Additional Services
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Services
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <label
                          key={service}
                          className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => handleServiceChange(service)}
                            className="w-4 h-4 text-[#264D88] border-gray-300 rounded focus:ring-[#264D88]"
                          />
                          <span className="text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Any special handling requirements, delivery instructions, or additional information..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#264D88] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1e3a8a] transition-colors flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#1e3a8a] hover:to-[#264D88] transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Get Quote</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;
