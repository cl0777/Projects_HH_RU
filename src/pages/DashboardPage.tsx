import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import {
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
} from "lucide-react";

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    {
      label: t("dashboard.stats.activeShipments"),
      value: "3",
      icon: <Truck className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      label: t("dashboard.stats.pendingQuotes"),
      value: "2",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      label: t("dashboard.stats.completedShipments"),
      value: "5",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      label: t("dashboard.stats.totalShipments"),
      value: "20",
      icon: <Package className="w-6 h-6" />,
      color: "bg-purple-500",
    },
  ];

  const recentShipments = [
    {
      id: "SH001",
      destination: "New York, USA",
      status: "in_transit",
      statusText: t("dashboard.shipmentStatus.inTransit"),
      date: "2025-01-15",
      estimatedDelivery: "2025-01-20",
    },
    {
      id: "SH002",
      destination: "London, UK",
      status: "pending",
      statusText: t("dashboard.shipmentStatus.pending"),
      date: "2025-01-14",
      estimatedDelivery: "2025-01-18",
    },
    {
      id: "SH003",
      destination: "Tokyo, Japan",
      status: "delivered",
      statusText: t("dashboard.shipmentStatus.delivered"),
      date: "2025-01-10",
      estimatedDelivery: "2025-01-12",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "in_transit":
        return <Truck className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.welcome")},{" "}
            {user?.name || user?.partyName || user?.email}!
          </h1>
          <p className="text-gray-600 mt-2">{t("dashboard.subtitle")}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t("dashboard.profile.title")}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#264D88] to-[#1e3a8a] rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.partyName ||
                        user?.name ||
                        t("dashboard.profile.noCompany")}
                    </h3>
                    {user?.shortname && (
                      <p className="text-sm text-gray-600">{user.shortname}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || t("dashboard.profile.noName")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("dashboard.profile.contactPerson")}
                      </p>
                    </div>
                  </div>

                  {user?.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  )}

                  {user?.phone1 && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <p className="text-sm text-gray-600">{user.phone1}</p>
                    </div>
                  )}

                  {user?.city && user?.country && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">{user.address1}</p>
                        <p className="text-sm text-gray-600">
                          {user.city}, {user.country}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Shipments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("dashboard.recentShipments.title")}
                </h2>
                <a
                  href="/quote"
                  className="text-sm font-medium text-[#264D88] hover:text-[#1e3a8a]"
                >
                  {t("dashboard.recentShipments.viewAll")}
                </a>
              </div>
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#264D88] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-[#264D88]" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {shipment.id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {shipment.destination}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                          shipment.status
                        )}`}
                      >
                        {getStatusIcon(shipment.status)}
                        <span>{shipment.statusText}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">
                          {t("dashboard.recentShipments.shippedDate")}
                        </p>
                        <p className="text-gray-900 font-medium">
                          {shipment.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">
                          {t("dashboard.recentShipments.estimatedDelivery")}
                        </p>
                        <p className="text-gray-900 font-medium">
                          {shipment.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t("dashboard.quickActions.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/quote"
              className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#264D88] hover:bg-blue-50 transition-all group"
            >
              <div className="w-10 h-10 bg-[#264D88] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {t("dashboard.quickActions.requestQuote")}
                </p>
                <p className="text-sm text-gray-600">
                  {t("dashboard.quickActions.getQuoteDesc")}
                </p>
              </div>
            </a>
            <a
              href="/terminals"
              className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#264D88] hover:bg-blue-50 transition-all group"
            >
              <div className="w-10 h-10 bg-[#264D88] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {t("dashboard.quickActions.findTerminal")}
                </p>
                <p className="text-sm text-gray-600">
                  {t("dashboard.quickActions.findTerminalDesc")}
                </p>
              </div>
            </a>
            <a
              href="/contact"
              className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#264D88] hover:bg-blue-50 transition-all group"
            >
              <div className="w-10 h-10 bg-[#264D88] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {t("dashboard.quickActions.contactSupport")}
                </p>
                <p className="text-sm text-gray-600">
                  {t("dashboard.quickActions.contactSupportDesc")}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
