"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Eye } from "lucide-react";

export function StatsCards() {
  const [totalUsers, setTotalUsers] = useState<string>("...");
  const [totalTemplates, setTotalTemplates] = useState<string>("...");
  const [revenue, setRevenue] = useState<string>("...");
  const [pendingPayments, setPendingPayments] = useState<string>("...");

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("token");
      if (!token) {
        setTotalUsers("N/A");
        setTotalTemplates("N/A");
        setRevenue("N/A");
        setPendingPayments("N/A");
        return;
      }

      try {
        // Users
        const usersRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats/users-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const usersData = await usersRes.json();
        setTotalUsers(Number(usersData.count).toLocaleString());

        // Templates
        const templatesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats/templates-count`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const templatesData = await templatesRes.json();
        setTotalTemplates(Number(templatesData.count).toLocaleString());

        // Revenue
        const revenueRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats/revenue`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const revenueData = await revenueRes.json();
        setRevenue(`₱${Number(revenueData.total).toLocaleString()}`);

        // Pending payments
        const pendingRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats/pending-payments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const pendingData = await pendingRes.json();
        setPendingPayments(Number(pendingData.count).toLocaleString());
      } catch (error) {
        console.error(error);
        setTotalUsers("N/A");
        setTotalTemplates("N/A");
        setRevenue("N/A");
        setPendingPayments("N/A");
      }
    }

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      bgColor: "from-violet-500 to-violet-900",
    },
    {
      title: "Total Templates",
      value: totalTemplates,
      icon: FileText,
      bgColor: "from-blue-500 to-blue-900",
    },
    {
      title: "Revenue",
      value: revenue,
      icon: () => <span className="text-md font-sm text-white">₱</span>,
      bgColor: "from-green-400 to-green-700",
    },
    {
      title: "Number of Pending Payments",
      value: pendingPayments,
      icon: Eye,
      bgColor: "from-yellow-400 to-yellow-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className={`bg-gradient-to-b  ${stat.bgColor}`}>
            <CardHeader className="flex h-[50px] flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 text-md text-gray-400 text-white`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
