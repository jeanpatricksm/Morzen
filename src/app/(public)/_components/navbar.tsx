"use client";
import { ArrowUpRight, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINKS = [
  {
    href: "/#visao",
    title: "Por aqui",
  },
  {
    href: "/#software",
    title: "O que fazemos",
  },
  {
    href: "/#fundadores",
    title: "Pessoas",
  },
  {
    href: "/#acompanhar",
    title: "Ficar por perto",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The project form is a focused page with its own header.
  if (pathname === "/new_project") return null;

  return (
    <header
      className={`morzen-nav-in morzen-nav fixed top-0 z-50 flex h-16 w-full items-center px-5 text-black sm:h-20 lg:px-8 ${
        isScrolled ? "morzen-nav-scrolled" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="group flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          aria-label="Morzen"
        >
          <Image
            src="/morzen_mark.png"
            alt=""
            width={54}
            height={40}
            priority
            className="h-auto w-[46px] object-contain sm:w-[52px]"
          />
        </Link>
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}

function DesktopNavbar() {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {LINKS.map((l, i) => (
        <Link
          key={i}
          href={l.href}
          className="text-sm font-medium text-black transition hover:text-black/62 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          {l.title}
        </Link>
      ))}
      <Link
        href="/new_project"
        className="morzen-liquid-button morzen-liquid-button-dark ml-2 inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-black transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        Conversar sobre um projeto
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="morzen-liquid-button morzen-liquid-button-light size-11 rounded-full text-black"
            aria-label="Abrir menu"
          >
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          aria-description="Mobile navigation"
          className="bg-[#f7f8ff] text-black"
        >
          <SheetHeader>
            <SheetTitle className="text-black">Morzen</SheetTitle>
          </SheetHeader>
          <nav className="container mx-auto flex flex-col items-center gap-3 px-4 py-4">
            {LINKS.map((l, i) => (
              <Button
                key={i}
                variant="ghost"
                className="h-12 w-full justify-start rounded-xl text-base text-black hover:bg-black/5"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => {
                    router.push(l.href, { scroll: true });
                  }, 200);
                }}
              >
                {l.title}
              </Button>
            ))}
            <Link
              href="/new_project"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Button className="morzen-liquid-button morzen-liquid-button-dark h-12 w-full rounded-full text-black">
                Começar projeto
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
