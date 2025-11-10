import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Building2,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    partyName: "",
    shortname: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    country: "",
    phone1: "",
    phone2: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!formData.name.trim()) {
        setError(t("register.validation.nameRequired"));
        return false;
      }
      if (!formData.email) {
        setError(t("register.validation.emailRequired"));
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError(t("forms.invalidEmail"));
        return false;
      }
      if (!formData.password) {
        setError(t("register.validation.passwordRequired"));
        return false;
      }
      if (formData.password.length < 6) {
        setError(t("forms.passwordTooShort"));
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(t("forms.passwordsDoNotMatch"));
        return false;
      }
    }
    if (step === 2) {
      if (!formData.partyName.trim()) {
        setError(t("register.validation.partyNameRequired"));
        return false;
      }
      if (!formData.shortname.trim()) {
        setError(t("register.validation.shortnameRequired"));
        return false;
      }
    }
    if (step === 3) {
      if (!formData.address1.trim()) {
        setError(t("register.validation.address1Required"));
        return false;
      }
      if (!formData.city.trim()) {
        setError(t("register.validation.cityRequired"));
        return false;
      }
      if (!formData.country.trim()) {
        setError(t("register.validation.countryRequired"));
        return false;
      }
      if (!formData.phone1.trim()) {
        setError(t("register.validation.phone1Required"));
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      setError("");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setError("");

    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        customerId: 0,
        partyName: formData.partyName,
        shortname: formData.shortname,
        address1: formData.address1,
        address2: formData.address2 || "",
        address3: formData.address3 || "",
        city: formData.city,
        country: formData.country,
        phone1: formData.phone1,
        phone2: formData.phone2 || "",
      };

      const success = await register(registerData);
      if (success) {
        navigate("/dashboard");
      } else {
        setError(t("register.errors.registrationFailed"));
      }
    } catch (err: any) {
      setError(err.message || t("register.errors.genericError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#264D88] to-[#1e3a8a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#264D88] to-[#1e3a8a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white p-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              {t("auth.register")}
            </h2>
            <p className="text-center text-blue-100">
              {t("register.subtitle")}
            </p>

            {/* Progress Steps */}
            <div className="mt-6 flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep >= step
                          ? "bg-white text-[#264D88]"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {currentStep > step ? "✓" : step}
                    </div>
                    <span className="ml-2 text-sm hidden sm:inline">
                      {t(`register.steps.step${step}`)}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 w-16 transition-all ${
                        currentStep > step ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("register.steps.step1")}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("register.fields.name")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("register.fields.namePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("auth.email")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("auth.email")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("auth.password")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("auth.password")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("auth.confirmPassword")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("auth.confirmPassword")}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("register.steps.step2")}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="partyName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("register.fields.partyName")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="partyName"
                        name="partyName"
                        type="text"
                        required
                        value={formData.partyName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("register.fields.partyNamePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="shortname"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("register.fields.shortname")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="shortname"
                        name="shortname"
                        type="text"
                        required
                        value={formData.shortname}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("register.fields.shortnamePlaceholder")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address & Contact */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("register.steps.step3")}
                </h3>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="address1"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("register.fields.address1")} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="address1"
                        name="address1"
                        type="text"
                        required
                        value={formData.address1}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("register.fields.address1Placeholder")}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="address2"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("register.fields.address2")}
                      </label>
                      <input
                        id="address2"
                        name="address2"
                        type="text"
                        value={formData.address2}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("register.fields.address2Placeholder")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address3"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("register.fields.address3")}
                      </label>
                      <input
                        id="address3"
                        name="address3"
                        type="text"
                        value={formData.address3}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                        placeholder={t("register.fields.address3Placeholder")}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("register.fields.city")} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                          placeholder={t("register.fields.cityPlaceholder")}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("register.fields.country")} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="country"
                          name="country"
                          type="text"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                          placeholder={t("register.fields.countryPlaceholder")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone1"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("register.fields.phone1")} *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone1"
                          name="phone1"
                          type="tel"
                          required
                          value={formData.phone1}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                          placeholder={t("register.fields.phone1Placeholder")}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone2"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("register.fields.phone2")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone2"
                          name="phone2"
                          type="tel"
                          value={formData.phone2}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-transparent"
                          placeholder={t("register.fields.phone2Placeholder")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {t("common.previous")}
                  </button>
                )}
              </div>
              <div className="flex space-x-4">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white rounded-lg font-semibold hover:from-[#1e3a8a] hover:to-[#264D88] transition-all transform hover:scale-105"
                  >
                    {t("common.next")}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white rounded-lg font-semibold hover:from-[#1e3a8a] hover:to-[#264D88] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? t("common.loading")
                      : t("auth.signUp")}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("auth.hasAccount")}{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#264D88] hover:text-[#1e3a8a]"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {t("auth.signIn")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
