import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/audit/Button";
import { navigation } from "@/components/audit/Navigation";

function PageLink({ label, page, previous = false }) {
  return (
    <>
      <Button
        href={page.href}
        aria-label={`${label}: ${page.title}`}
        variant="secondary"
        arrow={previous ? "left" : "right"}
      >
        {label}
      </Button>
      <Link
        href={page.href}
        tabIndex={-1}
        aria-hidden="true"
        className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
      >
        {page.title}
      </Link>
    </>
  );
}

function PageNavigation() {
  let pathname = usePathname();
  let allPages = navigation.flatMap((group) => group.links);
  let currentPageIndex = allPages.findIndex((page) => page.href === pathname);

  if (currentPageIndex === -1) {
    return null;
  }

  let previousPage = allPages[currentPageIndex - 1];
  let nextPage = allPages[currentPageIndex + 1];

  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className="flex gap-x-8">
      {previousPage && (
        <div className="flex flex-col items-start gap-3 md:w-1/2">
          <PageLink label="Previous" page={previousPage} previous />
        </div>
      )}
      {nextPage && (
        <div className="ml-auto flex flex-col items-end gap-3 md:w-1/2">
          <PageLink label="Next" page={nextPage} />
        </div>
      )}
    </div>
  );
}

function SmallPrint() {
  return (
    <div className="flex flex-col gap-5 border-t border-zinc-900/5 pt-8 dark:border-white/5">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Markavo® is a registered trademark. Copyright ©{" "}
        {new Date().getFullYear()}. All rights reserved.
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Disclaimer: The information contained in this website and provided by
        interactive artificial intelligence chatbots is offered for
        informational purposes only - it should not be construed as legal
        advice. Your use of this website does not establish an attorney-client
        relationship until all legal fees have been paid and a lawyer or firm
        has decided that they are willing and able to accept the engagement
        after a conflict check. Your use of this website is subject to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <PageNavigation />
      <SmallPrint />
    </footer>
  );
}
