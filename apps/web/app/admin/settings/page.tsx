"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { motion } from "motion/react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="font-clash text-3xl font-bold text-ink dark:text-paper">Platform Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Configure global platform parameters and rules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-6 border-gray-200 dark:border-gray-800">
            <h2 className="font-clash text-xl font-semibold mb-4 text-ink dark:text-paper">Financial Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform Fee (%)</label>
                <Input type="number" defaultValue={10} className="w-full max-w-xs" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WHT Filer Rate (%)</label>
                <Input type="number" defaultValue={10} className="w-full max-w-xs" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WHT Non-Filer Rate (%)</label>
                <Input type="number" defaultValue={20} className="w-full max-w-xs" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Withdrawal Amount (PKR)</label>
                <Input type="number" defaultValue={5000} className="w-full max-w-xs" />
              </div>
              <Button className="mt-4 bg-emerald hover:bg-emerald/90 text-white gap-2">
                <Save className="h-4 w-4" /> Save Financials
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card className="p-6 border-gray-200 dark:border-gray-800">
            <h2 className="font-clash text-xl font-semibold mb-4 text-ink dark:text-paper">Feature Flags</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-medium text-sm text-ink dark:text-paper">Maintenance Mode</h4>
                  <p className="text-xs text-gray-500">Show maintenance page to all non-admin users.</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="font-medium text-sm text-ink dark:text-paper">Registration Open</h4>
                  <p className="text-xs text-gray-500">Allow new users to sign up.</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-5 rounded-full bg-emerald cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-sm text-ink dark:text-paper">Withdrawals Enabled</h4>
                  <p className="text-xs text-gray-500">Allow creators to request payouts.</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle3" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label htmlFor="toggle3" className="toggle-label block overflow-hidden h-5 rounded-full bg-emerald cursor-pointer"></label>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
