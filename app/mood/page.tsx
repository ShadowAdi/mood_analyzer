"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { moods } from "@/lib/moods";
import { MoodType } from "@/types/mood";
import MoodCard from "@/components/global/MoodCard";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  comment: z.string().optional(),
});

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedMood) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/mood", {
        emoji: selectedMood.emoji,
        label: selectedMood.label,
        comment: values.comment || "",
      });

      if (response.data.success) {
        toast("Mood Posted");
        form.reset();
        setSelectedMood(null);
      }
    } catch (error: any) {
      console.error("Error submitting mood:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while submitting your mood.";
      toast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen w-full items-center space-y-4 justify-center p-4">
      <div className="flex flex-col space-y-3 items-center justify-center">
        <h1 className="text-4xl xl:text-5xl text-black dark:text-white font-bold">
          Submit your mood
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col w-full max-w-xl"
        >
          <div className="space-y-1">
            <h3 className="text-base font-medium text-center text-black dark:text-white">
              Select your mood:
            </h3>
            <div className="grid grid-cols-2 items-center justify-center gap-4">
              {moods.map((mood) => (
                <MoodCard
                  key={mood.id}
                  moodData={mood}
                  isSelected={selectedMood?.id === mood.id}
                  onClick={handleMoodSelect}
                />
              ))}
            </div>
            {selectedMood && (
              <p className="text-sm text-center text-green-600 dark:text-green-400">
                You selected: {selectedMood.label} {selectedMood.emoji}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about how you're feeling..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row space-x-4 items-center justify-between ">
            <Link href={"/admin"} className="w-full flex-1">
              <Button className=" px-6 py-3 w-full cursor-pointer  text-white ">
                <span className="text-base text-white">Admin</span>
              </Button>
            </Link>

            <Button
              type="submit"
              className="w-full flex-1 cursor-pointer"
              disabled={isSubmitting || !selectedMood}
            >
              {isSubmitting ? "Submitting..." : "Submit Mood"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default MoodPage;
