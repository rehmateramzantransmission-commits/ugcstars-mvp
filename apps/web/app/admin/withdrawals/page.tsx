"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const mockWithdrawals = [
  { id: 1, name: "Ali Raza", amount: 25000, method: "JazzCash", account: "0300*******", kyc: "Verified", date: "2024-05-12", status: "Pending" },
  { id: 2, name: "Sara Khan", amount: 150000, method: "Bank Transfer", account: "PK54MEZN*******", kyc: "Verified", date: "2024-05-11", status: "Pending" },
];

export default function WithdrawalsPage() {
  const [data, setData] = useState(mockWithdrawals);

  const columns = [
    { key: "name", header: "Creator", render: (row: any) => <span className="font-semibold">{row.name}</span> },
    { key: "amount", header: "Amount", render: (row: any) => <span className="font-medium text-emerald">Rs. {row.amount.toLocaleString()}</span> },
    { key: "method", header: "Method", render: (row: any) => (
      <span className="text-sm text-gray-600 dark:text-gray-300">{row.method}</span>
    )},
    { key: "account", header: "Account No", render: (row: any) => <span className="font-mono text-xs">{row.account}</span> },
    { key: "kyc", header: "KYC Status", render: (row: any) => (
      <Badge variant="outline" className="border-emerald text-emerald bg-emerald/5">{row.kyc}</Badge>
    )},
    { key: "date", header: "Request Date" },
    { key: "status", header: "Status", render: (row: any) => (
      <Badge className="bg-saffron text-white">{row.status}</Badge>
    )},
    { key: "actions", header: "Actions", render: (row: any) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="text-emerald border-emerald hover:bg-emerald/10 px-2 h-8">
          <CheckCircle className="h-4 w-4 mr-1" /> Approve
        </Button>
        <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10 px-2 h-8">
          <XCircle className="h-4 w-4 mr-1" /> Reject
        </Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">Withdrawals</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage creator payout requests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-ink p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Pending</p>
          <p className="text-2xl font-clash font-bold text-saffron">Rs. 175,000</p>
        </div>
        <div className="bg-white dark:bg-ink p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Approved Today</p>
          <p className="text-2xl font-clash font-bold text-emerald">Rs. 45,000</p>
        </div>
        <div className="bg-white dark:bg-ink p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Processed This Month</p>
          <p className="text-2xl font-clash font-bold text-ink dark:text-paper">Rs. 1,250,000</p>
        </div>
      </div>

      <DataTable 
        data={data}
        columns={columns}
      />
    </div>
  );
}
