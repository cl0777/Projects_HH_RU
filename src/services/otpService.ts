import axios from "axios";

// OTP API base URL - can be configured via environment variable
const OTP_API_BASE_URL =
  `${import.meta.env.VITE_API_BASE_URL}/messages` ||
  "http://localhost:3000/api/v1/messages";

const otpClient = axios.create({
  baseURL: OTP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface SendOTPResponse {
  success: boolean;
  message: string;
  email: string;
  expiresIn: number;
}

export interface CheckOTPResponse {
  success: boolean;
  message: string;
  email: string;
}

export interface OTPError {
  statusCode: number;
  message: string;
}

/**
 * Send OTP to user's email
 */
export const sendOTP = async (email: string): Promise<SendOTPResponse> => {
  try {
    const response = await otpClient.post<SendOTPResponse>("/otp/send", {
      email: email.toLowerCase().trim(),
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Failed to send OTP";
    throw new Error(errorMessage);
  }
};

/**
 * Verify OTP code
 */
export const checkOTP = async (
  email: string,
  otp: string
): Promise<CheckOTPResponse> => {
  try {
    const response = await otpClient.post<CheckOTPResponse>("/otp/check", {
      email: email.toLowerCase().trim(),
      otp: otp.trim(),
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to verify OTP";

    // Extract attempts remaining from error message if available
    const attemptsMatch = errorMessage.match(/(\d+) attempts remaining/);
    const attemptsRemaining = attemptsMatch ? parseInt(attemptsMatch[1]) : null;

    const otpError: Error & { attemptsRemaining?: number } = new Error(
      errorMessage
    );
    if (attemptsRemaining !== null) {
      (otpError as any).attemptsRemaining = attemptsRemaining;
    }

    throw otpError;
  }
};
