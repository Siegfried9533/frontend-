"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function InvoiceSummaryCard({ title, amount, lastUpdate }: { title: string; amount: string; lastUpdate: string }) {
    return (
        <Card className="w-full shadow-sm">
            <CardContent className="p-4">
                <h4 className="text-sm font-medium text-gray-500">{title}</h4>
                <p className="text-2xl font-bold">{amount}</p>
                <p className="text-xs text-gray-400">Last update: {lastUpdate}</p>
            </CardContent>
        </Card>
    );
}
export default InvoiceSummaryCard;