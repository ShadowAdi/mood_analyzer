import React from "react";
import { Card } from "../ui/card";
import { MoodType } from "@/types/mood";
import { cn } from "@/lib/utils";

interface MoodCardProps {
  moodData: MoodType;
  isSelected?: boolean;
  onClick?: (mood: MoodType) => void;
}

const MoodCard = ({ moodData, isSelected = false, onClick }: MoodCardProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col items-center px-4 py-3 rounded-lg justify-center  cursor-pointer transition-all hover:shadow-md max-w-md",
        isSelected &&
          "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20"
      )}
      onClick={() => onClick?.(moodData)}
    >
      <span className="text-2xl">{moodData.emoji}</span>
      <span className="text-lg text-black dark:text-white font-medium">
        {moodData.label}
      </span>
    </Card>
  );
};

export default MoodCard;
