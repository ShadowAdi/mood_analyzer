import { MoodData } from "@/utils/MoodData";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.emoji) {
      return NextResponse.json(
        {
          success: false,
          error: "Emoji is required",
          message: "Please provide an emoji in your request",
        },
        { status: 400 }
      );
    }
    if (!body.label) {
      return NextResponse.json(
        {
          success: false,
          error: "Label is required",
          message: "Please provide a label in your request",
        },
        { status: 400 }
      );
    }
    const newMood = {
      emoji: body.emoji.trim(),
      label: body.label.trim(),
      comment: body.comment ? body.comment.trim() : "",
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    MoodData.push(newMood);
    return NextResponse.json(
      {
        message: "Mood Is Created",
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating Mood:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Something went wrong while creating the post",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sortedMoodData = [...MoodData].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return NextResponse.json(
      {
        MoodData:sortedMoodData,
        success: true,
        length: MoodData.length,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error getting mood data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Something went wrong while getting the mood data",
      },
      { status: 500 }
    );
  }
}
