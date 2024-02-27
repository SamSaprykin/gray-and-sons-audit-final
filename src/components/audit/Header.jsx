import { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";


import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore
} from "@/components/audit/MobileNavigation";

function TopLevelNavItem({ href, children }) {
  return (
    <li className="mb-0">
      <Link
        href={href}
        className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-0"
      >
        {children}
      </Link>
    </li>
  );
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
  let isInsideMobileNavigation = useIsInsideMobileNavigation();

  let { scrollY } = useScroll();
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
        !isInsideMobileNavigation &&
          "backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80",
        isInsideMobileNavigation
          ? "bg-white dark:bg-zinc-900"
          : "bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
      )}
      style={{
        "--bg-opacity-light": bgOpacityLight,
        "--bg-opacity-dark": bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          "absolute inset-x-0 top-full h-px transition",
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            "bg-zinc-900/7.5 dark:bg-white/7.5"
        )}
      />

      <div className="flex w-full justify-between items-center gap-8 lg:hidden">
        <Link href="/" aria-label="Home" className="w-[120px]">
          <Image
            src="https://cdn.grayandsons.com/o/favicon_32x32_71a2c8d52d.png"
            alt="website audit"
            width={30}
            height={30}
            className="mb-0"
          />
        </Link>
        <div className="absolute right-4">
          <MobileNavigation />
        </div>
      </div>
    </motion.div>
  );
});
