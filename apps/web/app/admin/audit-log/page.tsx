"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";

const mockLogs = [
  { id: 1, timestamp: "2024-05-12 14:30:22", admin: "admin@ugcstars.com", action: "Approved Verification", target: "Creator: Ali Raza", details: "Assigned Nano slab", ip: "192.168.1.1" },
  { id: 2, timestamp: "2024-05-12 13:15:00", admin: "admin@ugcstars.com", action: "Settings Changed", target: "Platform Fee", details: "Changed from 8% to 10%", ip: "192.168.1.1" },
  { id: 3, timestamp: "2024-05-11 09:45:11", admin: "support@ugcstars.com", action: "Rejected KYC", target: "Creator: Usman Tariq", details: "Blurry CNIC image", ip: "10.0.0.5" },
];

export default function AuditLogPage() {
  const [data] = useState(mockLogs);

  const columns = [
    { key: "timestamp", header: "Timestamp", render: (row: any) => <span className="text-xs text-gray-500 font-mono">{row.timestamp}</span> },
    { key: "admin", header: "Admin User", render: (row: any) => <span className="text-sm font-medium">{row.admin}</span> },
    { key: "action", header: "Action", render: (row: any) => {
      let colorClass = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      if (row.action.includes("Approved")) colorClass = "bg-emerald/10 text-emerald border border-emerald/20";
      if (row.action.includes("Rejected")) colorClass = "bg-red-100 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400";
      if (row.action.includes("Settings")) colorClass = "bg-blue-100 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400";
      
      return <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>{row.action}</span>;
    }},
    { key: "target", header: "Target" },
    { key: "details", header: "Details", render: (row: any) => <span className="text-sm text-gray-600 dark:text-gray-400">{row.details}</span> },
    { key: "ip", header: "IP Address", render: (row: any) => <span className="text-xs text-gray-400 font-mono">{row.ip}</span> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">Audit Log</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track all administrative actions performed on the platform.</p>
      </div>

      <DataTable 
        data={data}
        columns={columns}
      />
    </div>
  );
}
