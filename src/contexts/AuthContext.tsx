import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type { AxiosInstance } from "axios";
import { getApiUrl } from "../config/api";

const axiosClient: AxiosInstance = axios.create({
  baseURL: getApiUrl("customers"),
  withCredentials: true,
  headers: {
    // Keep headers simple; JSON will still trigger CORS preflight on cross-origin
    "Content-Type": "application/json",
  },
});

interface User {
  id: string;
  email: string;
  name?: string;
  customerId?: number;
  partyName?: string;
  shortname?: string;
  [key: string]: any;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  customerId: number;
  partyName: string;
  shortname: string;
  address1: string;
  address2?: string;
  address3?: string;
  city: string;
  country: string;
  phone1: string;
  phone2?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on app load
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const { data } = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      const accessToken: string | undefined = data?.accessToken;
      const account = data?.account as
        | { id?: number | string; name?: string; email?: string }
        | undefined;

      if (!accessToken || !account) {
        throw new Error("Login failed");
      }

      const mappedUser: User = {
        id: String(account.id ?? ""),
        email: account.email ?? email,
        name: account.name,
      };

      setToken(accessToken);
      setUser(mappedUser);
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mappedUser));
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);

      const response = await axiosClient.post("/auth/register", data);
      const accessToken: string | undefined = response.data?.accessToken;
      const account = response.data?.account as
        | { id?: number | string; name?: string; email?: string }
        | undefined;

      if (!accessToken || !account) {
        throw new Error("Registration failed");
      }

      const mappedUser: User = {
        id: String(account.id ?? ""),
        email: account.email ?? data.email,
        name: account.name ?? data.name,
      };

      setToken(accessToken);
      setUser(mappedUser);
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mappedUser));
      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
