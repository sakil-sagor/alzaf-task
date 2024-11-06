"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { customLoader } from "@/utils/customLoader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import NavItems from "./NavItems";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // If scrolling down
      setIsVisible(false);
    } else {
      // If scrolling up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <nav
      className={`fixed z-50 w-full bg-white py-2 shadow-lg backdrop-blur-md duration-300 ${
        isVisible ? "top-0" : "-top-24"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            loader={customLoader}
            src="logo.png"
            width={80}
            height={80}
            alt=""
          />
        </Link>

        <div className="hidden md:block  ">
          <NavItems />
        </div>

        <div className="hidden md:block  ">
          <Link href="/AboutUs#contact-section">
            {" "}
            <Button>Contact Us</Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <RiMenu3Line className="size-5" />
          </SheetTrigger>
          <SheetContent>
            <NavItems />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
