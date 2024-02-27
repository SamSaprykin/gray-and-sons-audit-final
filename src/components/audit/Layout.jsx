import Link from "next/link";
import { motion } from "framer-motion";

import { Header } from "@/components/audit/Header";
import { Navigation } from "@/components/audit/Navigation";
import Image from "next/image";
import TaskList from "@/components/audit/TaskList";

export function Layout({ children }) {
  return (
    <div className="h-full lg:ml-72 xl:ml-80">
      <motion.header
        layoutScroll
        className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
      >
        <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
          <div className="hidden lg:flex">
            <Link href="/" aria-label="Home" className="flex gap-x-2 items-center">
              <Image
                src="https://cdn.grayandsons.com/o/favicon_32x32_71a2c8d52d.png"
                width={30}
                height={30}
                className="mb-0"
                alt="logo"
              />
              <span className="text-sm text-black font-medium">Gray and Sons migration audit</span>
            </Link>
          </div>
          <Header />
          <Navigation className="hidden lg:mt-10 lg:block" />
        </div>
      </motion.header>
      <div className="relative flex h-full flex-col px-4 pt-24 sm:px-6 lg:px-8 mb-12 >*">
        <main className="flex-auto [&>img]:max-w-[20px]">{children}</main>
        <TaskList />
      </div>
    </div>
  );
}
