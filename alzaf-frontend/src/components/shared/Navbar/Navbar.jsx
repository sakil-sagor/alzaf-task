"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";

import { customLoader } from "@/utils/customLoader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
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
        isVisible ? "top-2" : "-top-24"
      }`}
    >
      <div className="flex items-center justify-between container mx-auto gap-x-10 px-2">
        <Link className="" href="/">
          <Image
            loader={customLoader}
            src="/alzaf-logo.png"
            width={80}
            height={80}
            alt=""
          />
        </Link>

        <div className="  grow ">
          <div className="flex w-full  items-center">
            <Input
              type="email"
              placeholder="Search Product"
              className="mr-0 rounded-r-none bg-[#EFF0F5] "
            />
            <Button
              className="bg-[#F97316] ml-[-5px] hover:bg-orange-600"
              type="submit"
            >
              <CiSearch />
            </Button>
          </div>
        </div>
        <div className="hidden md:block  ">
          <div className="flex w-full max-w-sm items-center space-x-4">
            <div>
              <div className="relative bg-[#F5F5F5] p-2 rounded-lg">
                <FaRegUser />
              </div>
              <p className="text-[8px] bg-[#F97316] px-[4px] py-[3px]  text-white rounded-full absolute top-0  ml-6">
                20
              </p>
            </div>
            <div className="bg-[#F5F5F5] p-2 rounded-lg">
              <IoIosHeartEmpty />
            </div>
            <div className="bg-[#F5F5F5] p-2 rounded-lg">
              <IoCartOutline />
            </div>
          </div>
        </div>

        <div className="hidden md:block  ">
          <Link href="/AboutUs#contact-section">
            {" "}
            <div>
              <Image
                src="/Group 48099301.png"
                alt="vector"
                width={150}
                height={150}
              />
            </div>
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
