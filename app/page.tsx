import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-screen items-center space-y-7 justify-center overflow-x-hidden ">
      <div className="flex flex-col space-y-3 items-center justify-center">
        <h1 className="text-4xl xl:text-5xl text-black dark:text-white font-bold ">
          Welcome to MoodSubmitter
        </h1>
        <p className="text-base text-stone-900 dark:text-shadow-white font-normal">
          You Can Submit Your Mood Here so we can use that to analyze the
          Mood!!!
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-x-4 items-center justify-between ">
        <Link href={"/admin"} className="w-full flex-1">
          <Button className=" px-6 py-3 w-full cursor-pointer  text-white ">
            <span className="text-base text-white">Admin</span>
          </Button>
        </Link>

        <Link href={"/mood"} className="w-full flex-1">
          <Button className=" px-6 py-3 w-full cursor-pointer  text-white ">
            Submit Mood 
          </Button>
        </Link>
      </div>
    </main>
  );
}
