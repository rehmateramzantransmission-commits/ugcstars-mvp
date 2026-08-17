"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle, XCircle } from "lucide-react";

const mockKyc = [
  { id: 1, name: "Ali Raza", cnicName: "ALI RAZA", date: "2024-05-12", status: "Pending", isFiler: "Unknown" },
  { id: 2, name: "Sara Khan", cnicName: "SARA KHAN", date: "2024-05-11", status: "Pending", isFiler: "Filer" },
];

export default function KYCPage() {
  const [data, setData] = useState(mockKyc);

  const columns = [
    { key: "name", header: "Creator Profile", render: (row: any) => <span className="font-semibold">{row.name}</span> },
    { key: "cnicName", header: "CNIC Name" },
    { key: "date", header: "Submission Date" },
    { key: "isFiler", header: "FBR Status", render: (row: any) => (
      <Badge variant="outline" className={row.isFiler === 'Filer' ? 'text-emerald border-emerald' : 'text-gray-500'}>
        {row.isFiler}
      </Badge>
    )},
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

  const expandableContent = (row: any) => (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div className="w-64 h-40 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-300 dark:border-gray-700">
           <span className="text-gray-400 text-sm">CNIC Front (Mock)</span>
        </div>
        <div className="w-64 h-40 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-300 dark:border-gray-700">
           <span className="text-gray-400 text-sm">CNIC Back (Mock)</span>
        </div>
        <div className="w-40 h-40 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-300 dark:border-gray-700">
           <span className="text-gray-400 text-sm">Selfie (Mock)</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div className="text-sm"><span className="text-gray-500 mr-2">CNIC Number:</span><span className="font-mono">35202-*******-1</span></div>
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Set Filer Status:</span>
          <select className="h-8 rounded-md border border-gray-200 bg-transparent px-2 text-xs focus:ring-emerald">
            <option>Unknown</option>
            <option>Filer</option>
            <option>Non-Filer</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">KYC Approvals</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Verify identities and tax filer statuses for creators.</p>
      </div>

      <div className="bg-saffron/10 border border-saffron/30 rounded-lg p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-saffron-dark dark:text-saffron">Strict Data Privacy Required</h3>
          <p className="text-xs text-saffron-dark/80 dark:text-saffron/80 mt-1">
            Handle CNIC data with care. All images are encrypted at rest and watermarked. Do not download or screenshot KYC documents.
          </p>
        </div>
      </div>

      <DataTable 
        data={data}
        columns={columns}
        expandableContent={expandableContent}
      />
    </div>
  );
}
