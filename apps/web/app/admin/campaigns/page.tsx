"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Flag, Ban } from "lucide-react";

const mockCampaigns = [
  { id: 1, title: "Summer Glow Skincare", brand: "Lumiere Pk", budget: 50000, status: "Active", slots: "3/5", date: "2024-05-10" },
  { id: 2, title: "Eid Collection Launch", brand: "Khaadi", budget: 250000, status: "Flagged", slots: "10/10", date: "2024-05-08" },
];

export default function CampaignsPage() {
  const [data, setData] = useState(mockCampaigns);

  const columns = [
    { key: "title", header: "Campaign Title", render: (row: any) => <span className="font-medium text-ink dark:text-paper">{row.title}</span> },
    { key: "brand", header: "Brand" },
    { key: "budget", header: "Budget", render: (row: any) => <span>Rs. {row.budget.toLocaleString()}</span> },
    { key: "slots", header: "Slots (Filled/Total)" },
    { key: "date", header: "Created Date" },
    { key: "status", header: "Status", render: (row: any) => (
      <Badge className={
        row.status === 'Active' ? 'bg-emerald text-white' : 
        row.status === 'Flagged' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
      }>
        {row.status}
      </Badge>
    )},
    { key: "actions", header: "Actions", render: (row: any) => (
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-emerald">
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-saffron">
          <Flag className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-red-500">
          <Ban className="h-4 w-4" />
        </Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">Campaign Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor and moderate brand campaigns.</p>
      </div>

      <DataTable 
        data={data}
        columns={columns}
      />
    </div>
  );
}
