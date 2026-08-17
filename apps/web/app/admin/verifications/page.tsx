"use client";

import { useState } from "react";
import { DataTable } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";

// Mock Data
const mockVerifications = [
  { id: 1, name: "Ali Raza", socials: 2, followers: 45000, slab: "Nano", status: "Pending" },
  { id: 2, name: "Sara Khan", socials: 3, followers: 120000, slab: "Micro", status: "In Review" },
  { id: 3, name: "Zainab Tariq", socials: 1, followers: 8000, slab: "Nano", status: "Pending" },
];

export default function VerificationsPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(mockVerifications);

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "name", header: "Creator Name", render: (row: any) => <span className="font-semibold">{row.name}</span> },
    { key: "socials", header: "Linked Socials" },
    { key: "followers", header: "Total Followers", render: (row: any) => row.followers.toLocaleString() },
    { key: "slab", header: "Claimed Slab", render: (row: any) => <Badge variant="outline">{row.slab}</Badge> },
    { key: "status", header: "Status", render: (row: any) => (
      <Badge className={
        row.status === 'Pending' ? 'bg-saffron text-white' : 
        row.status === 'In Review' ? 'bg-blue-500 text-white' : 'bg-emerald text-white'
      }>
        {row.status}
      </Badge>
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
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-ink p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <h4 className="font-medium text-sm mb-3">Social Accounts</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Instagram</span><span>35,000</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">TikTok</span><span>10,000</span></div>
        </div>
      </div>
      <div className="bg-white dark:bg-ink p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <h4 className="font-medium text-sm mb-3">Slab Configuration</h4>
        <p className="text-xs text-gray-500 mb-2">Calculated slab based on combined follower count.</p>
        <div className="flex items-center gap-3">
          <select className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald dark:border-gray-800">
            <option>Nano (1k - 50k)</option>
            <option>Micro (50k - 250k)</option>
            <option>Macro (250k+)</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">Verifications Queue</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review and approve creator profiles and slab assignments.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search creators..." 
            className="pl-9 bg-white dark:bg-ink"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald dark:border-gray-800 dark:bg-ink">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="review">In Review</option>
          </select>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <DataTable 
          data={filteredData}
          columns={columns}
          expandableContent={expandableContent}
          emptyMessage="No pending verifications."
        />
      </motion.div>
    </div>
  );
}
