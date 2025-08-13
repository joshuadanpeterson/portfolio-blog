// src/app/_components/navbar.tsx
"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu } from "lucide-react";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar: FC = () => {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/posts", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent">
      <div className="flex items-center justify-between mt-16 mb-16 md:mb-12">
        <div className="flex items-center">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-foreground">
            josh
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l) => (
                <NavigationMenuItem key={l.href}>
                  <Link href={l.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={clsx(
                        "px-3 py-2 rounded-md text-lg underline underline-offset-2 transition-colors",
                        pathname === l.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {l.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-3">
                {links.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <Link
                      href={l.href}
                      className={clsx(
                        "px-2 py-2 rounded-md text-lg underline underline-offset-2",
                        pathname === l.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-2">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
