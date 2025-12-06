import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react";
import { sendOTP, checkOTP } from "../services/otpService";

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onError?: (error: string) => void;
  onBack?: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerified,
  onError,
  onBack,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(
    null
  );
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasSentInitialOTP = useRef(false);

  // Timer countdown
  useEffect(() => {
    if (otpSent && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpSent, timeRemaining]);

  // Auto-send OTP on mount (only once)
  useEffect(() => {
    if (email && !hasSentInitialOTP.current) {
      hasSentInitialOTP.current = true;
      handleSendOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendOTP = async () => {
    // Prevent multiple simultaneous sends
    if (isSending) return;

    setIsSending(true);
    setError("");
    setSuccess(false);
    setAttemptsRemaining(null);
    setOtp(["", "", "", "", "", ""]);
    setTimeRemaining(600);

    try {
      await sendOTP(email);
      setOtpSent(true);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Focus first input
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      const errorMessage = err.message || t("otp.errors.sendFailed");
      setError(errorMessage);
      // Reset the flag on error so user can retry
      if (!hasSentInitialOTP.current) {
        hasSentInitialOTP.current = false;
      }
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOTP(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (digits.length === 6) {
      const newOtp = digits.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      handleVerifyOTP(digits);
    }
  };

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp.join("");
    if (code.length !== 6) {
      setError(t("otp.validation.incomplete"));
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      await checkOTP(email, code);
      setSuccess(true);
      setTimeout(() => {
        onVerified();
      }, 500);
    } catch (err: any) {
      const errorMessage = err.message || t("otp.errors.verificationFailed");
      setError(errorMessage);

      // Extract attempts remaining
      if (err.attemptsRemaining !== undefined) {
        setAttemptsRemaining(err.attemptsRemaining);
      } else {
        const attemptsMatch = errorMessage.match(/(\d+) attempts remaining/);
        if (attemptsMatch) {
          setAttemptsRemaining(parseInt(attemptsMatch[1]));
        }
      }

      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("otp.title")}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {t("otp.description", { email })}
        </p>
      </div>

      {/* Email Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
        <Mail className="h-5 w-5 text-blue-600 mr-3" />
        <div>
          <p className="text-sm font-medium text-blue-900">{email}</p>
          <p className="text-xs text-blue-700">{t("otp.emailSent")}</p>
        </div>
      </div>

      {/* Success Message */}
      {success && !isLoading && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2" />
          <span>{t("otp.sentSuccess")}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <p>{error}</p>
            {attemptsRemaining !== null && attemptsRemaining > 0 && (
              <p className="text-sm mt-1">
                {t("otp.attemptsRemaining", { count: attemptsRemaining })}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Timer */}
      {otpSent && timeRemaining > 0 && (
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>
            {t("otp.timeRemaining")}: {formatTime(timeRemaining)}
          </span>
        </div>
      )}

      {timeRemaining === 0 && otpSent && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-sm text-yellow-800 mb-2">{t("otp.expired")}</p>
          <button
            type="button"
            onClick={handleSendOTP}
            disabled={isSending}
            className="text-sm text-yellow-900 font-medium hover:underline disabled:opacity-50"
          >
            {isSending ? t("otp.sending") : t("otp.resend")}
          </button>
        </div>
      )}

      {/* OTP Input Fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("otp.enterCode")}
        </label>
        <div className="flex justify-center space-x-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={isLoading || timeRemaining === 0}
              className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#264D88] focus:border-[#264D88] disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => handleVerifyOTP()}
          disabled={
            isLoading || otp.join("").length !== 6 || timeRemaining === 0
          }
          className="flex-1 px-6 py-3 bg-gradient-to-r from-[#264D88] to-[#1e3a8a] text-white rounded-lg font-semibold hover:from-[#1e3a8a] hover:to-[#264D88] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? t("otp.verifying") : t("otp.verify")}
        </button>

        <button
          type="button"
          onClick={handleSendOTP}
          disabled={isSending || timeRemaining > 540} // Disable if less than 1 minute has passed
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSending ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {t("otp.sending")}
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("otp.resend")}
            </>
          )}
        </button>
      </div>

      {/* Back Button */}
      {onBack && (
        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-[#264D88] transition-colors"
          >
            {t("otp.changeEmail")}
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
