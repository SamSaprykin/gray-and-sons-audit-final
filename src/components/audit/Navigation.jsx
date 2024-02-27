"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { useIsInsideMobileNavigation } from "@/components/audit/MobileNavigation";
import { Tag } from "@/components/audit/Tag";
import { remToPx } from "@/lib/remToPx";

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current;
  return condition ? initialValue : value;
}

function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden mb-0">
      <Link
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition",
        isAnchorLink ? "pl-7" : "pl-4",
        active
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  );
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2);
  let offset = remToPx(0.25);
  let activePageIndex = group.links.findIndex((link) => link.href === pathname);
  let top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-[2px] w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  );
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation();
  let [pathname, sections] = useInitialValue(
    [usePathname()],
    isInsideMobileNavigation
  );

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1;

  return (
    <div className={clsx("relative mt-6", className)}>
      <motion.h2
        layout="position"
        className="text-xs md:text-sm font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent list-none">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}





export const navigation = [
  {
    title: "",
    links: [
      { title: "ℹ️ General Information", href: "/" },
    ]
  },
  {
    title: "UI/UX Audit",
    links: [
      { title: "ℹ️ UI/UX", href: "/ui-ux" },
      { title: "💯 Visual issues mobile/desktop", href: "/ui-ux/visual"},
      { title: "💯  Headings structure + Wave Check", href: "/ui-ux/headings-wave"},
      { title: "💯 Forms", href: "/ui-ux/forms"},
      { title: "💯 Internal links", href: "/ui-ux/internal-links"},
    ],
  },
  {
    title: "SEO Audit",
    links: [
      { title: "⭕ SEO", href: "/seo" },
      { title: "✅ Redirects and urls structure check", href: "/seo/redirects" },
      { title: "⭕ H1 headings", href: "/seo/h1-headings" },
      { title: "⭕ Metadata and Structured data check", href: "/seo/metadata" },
      { title: "🔜 List of keywords to track website position", href: "/seo/keywords" },
      { title: "🔜 Setting up the service for tracking positions", href: "/seo/tracking-positions" },
      { title: "🔜 Old Website traffic audit and expectations", href: "/seo/traffic-audit" },
      { title: "🔜 Daily monitoring of the situation on the site", href: "/seo/monitoring" },
      { title: "⭕ Pages structure and recommendations", href: "/seo/page-structure-recomendations" },
    ],
  },
  {
    title: "Performance Audit",
    links: [
      { title: "⭕ General", href: "/performance/general" },
      { title: "⭕ Lighthouse report", href: "/performance/lighthouse" },
      { title: "⭕ GTmetrix report", href: "/performance/gtmetrix" },
      { title: "⭕ Packages audit", href: "/performance/packages"},
      { title: "⭕ Code", href: "/performance/code" },
    ],
  },
];

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? "md:mt-0" : ""}
          />
        ))}
      </ul>
    </nav>
  );
}
