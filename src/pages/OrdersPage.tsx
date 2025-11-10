import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { Package, Truck, Clock, CheckCircle } from "lucide-react";
import { getApiUrl } from "../config/api";

interface Order {
  id: string | number;
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  weightKg: number;
  shipmentType: string;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  declaredValueUsd?: number;
  description?: string;
  totalAmount?: number;
  timeline?: string;
  status?: "pending" | "in_transit" | "delivered" | string;
  createdAt?: string;
}

const OrdersPage: React.FC = () => {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError("");
        const { data } = await axios.get(getApiUrl("orders"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setOrders(Array.isArray(data) ? data : data?.orders || []);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load orders"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  const getStatus = (status?: string) => {
    switch (status) {
      case "delivered":
        return {
          text: t("dashboard.shipmentStatus.delivered"),
          icon: <CheckCircle className="w-4 h-4" />,
          cls: "bg-green-100 text-green-800",
        };
      case "in_transit":
        return {
          text: t("dashboard.shipmentStatus.inTransit"),
          icon: <Truck className="w-4 h-4" />,
          cls: "bg-blue-100 text-blue-800",
        };
      case "pending":
      default:
        return {
          text: t("dashboard.shipmentStatus.pending"),
          icon: <Clock className="w-4 h-4" />,
          cls: "bg-yellow-100 text-yellow-800",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("nav.dashboard")} - Orders
          </h1>
          <p className="text-gray-600 mt-2">Your recent and past orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const st = getStatus(order.status);
            return (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-[#264D88]" />
                    <span className="font-semibold text-gray-900">
                      #{order.id}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center space-x-1 ${st.cls}`}
                  >
                    {st.icon}
                    <span>{st.text}</span>
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm mt-2">
                  <div>
                    <p className="text-gray-500">From</p>
                    <p className="text-gray-900 font-medium">
                      {order.originCity}, {order.originCountry}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">To</p>
                    <p className="text-gray-900 font-medium">
                      {order.destinationCity}, {order.destinationCountry}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Weight</p>
                    <p className="text-gray-900 font-medium">
                      {order.weightKg} kg
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm mt-2">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="text-gray-900 font-medium">
                      {order.shipmentType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Timeline</p>
                    <p className="text-gray-900 font-medium">
                      {order.timeline || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="text-gray-900 font-medium">
                      $
                      {order.totalAmount?.toFixed?.(2) ??
                        order.totalAmount ??
                        0}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {orders.length === 0 && (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
              No orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
