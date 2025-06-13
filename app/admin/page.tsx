"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface MoodData {
  id: string;
  moodId: string;
  emoji: string;
  label: string;
  comment?: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  MoodData: MoodData[];
  length: number;
}

const AdminPage = () => {
  const [moods, setMoods] = useState<MoodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMoods = async (isRefresh = false) => {
    try {
      if (isRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      const response = await axios.get<ApiResponse>("/api/mood");

      if (response.data.success) {
        setMoods(response.data.MoodData);

        if (isRefresh) {
          toast("Data refreshed", {
            description: `Loaded ${response.data.length} mood entries`,
          });
        }
      }
    } catch (error: any) {
      console.error("Error fetching moods:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch mood data";

      toast("Error loading data", {
        description: errorMessage,
        richColors: true,
        
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleRefresh = () => {
    fetchMoods(true);
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), "MMM dd, yyyy 'at' hh:mm a");
    } catch (error) {
      return timestamp;
    }
  };

  const getMoodBadgeVariant = (moodLabel: string) => {
    switch (moodLabel.toLowerCase()) {
      case "happy":
        return "default";
      case "neutral":
        return "secondary";
      case "sad":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading mood data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze mood submissions
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          className="flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh Data
        </Button>
      </div>

      {moods.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No mood data available</p>
          <p className="text-sm text-muted-foreground mt-2">
            Mood submissions will appear here once users start submitting
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              A list of all mood submissions ({moods.length} total)
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mood</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moods.map((mood) => (
                <TableRow key={mood.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {mood.comment ? (
                      <div className="max-w-xs">
                        <p className="truncate" title={mood.comment}>
                          {mood.comment}
                        </p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic">
                        No comment
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatTimestamp(mood.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getMoodBadgeVariant(mood.label)}>
                      {mood.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
