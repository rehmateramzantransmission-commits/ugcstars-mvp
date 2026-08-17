"use client";

import { motion } from "motion/react";
import { StatCardAdmin } from "@/components/admin/stat-card-admin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Banknote, History } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Pending Verifications", value: 12, href: "/admin/verifications", isAlert: true },
    { title: "Pending KYC", value: 8, href: "/admin/kyc", isAlert: true },
    { title: "Pending Withdrawals", value: 450000, prefix: "Rs. ", href: "/admin/withdrawals", isAlert: true },
    { title: "Active Campaigns", value: 24, href: "/admin/campaigns" },
    { title: "Total Users", value: 1250 },
    { title: "Platform Revenue", value: 8500000, prefix: "Rs. " },
  ];

  const recentActivity = [
    { id: 1, action: "Approved Verification", target: "Ayesha Khan", time: "10 mins ago", type: "success" },
    { id: 2, action: "Processed Withdrawal", target: "Ali Raza (Rs. 50,000)", time: "1 hour ago", type: "info" },
    { id: 3, action: "Rejected KYC", target: "Usman Tariq", time: "2 hours ago", type: "danger" },
    { id: 4, action: "Updated Settings", target: "WHT Rate to 15%", time: "5 hours ago", type: "warning" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of platform metrics and pending actions.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/verifications">
            <Button variant="outline" className="gap-2 border-emerald text-emerald hover:bg-emerald/10">
              <Shield className="h-4 w-4" />
              Review Verifications
            </Button>
          </Link>
          <Link href="/admin/withdrawals">
            <Button className="gap-2 bg-emerald hover:bg-emerald/90 text-white">
              <Banknote className="h-4 w-4" />
              Process Withdrawals
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <StatCardAdmin {...stat} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-6 border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-clash text-xl font-semibold flex items-center gap-2 text-ink dark:text-paper">
              <History className="h-5 w-5 text-emerald" />
              Recent Activity
            </h2>
            <Link href="/admin/audit-log" className="text-sm text-emerald hover:underline font-medium">
              View all logs
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-emerald' :
                  activity.type === 'danger' ? 'bg-red-500' :
                  activity.type === 'warning' ? 'bg-saffron' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-ink dark:text-paper text-sm">{activity.action}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{activity.target}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
