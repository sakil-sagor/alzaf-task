"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IoCartOutline } from "react-icons/io5";
import CategoryBar from "./CategoryBar";

const NavItems = ({ onNavItemClick }) => {
  return (
    <div className="flex flex-col items-center md:flex-row pt-8">
      <div className="flex flex-col items-center md:flex-row">
        <div className=" block md:hidden   ">
          <div className="flex w-full max-w-sm items-center space-x-4 mb-4">
            <div className="relative ">
              <div className=" bg-[#F5F5F5] p-2 rounded-lg">
                <FaRegUser className="text-2xl" />
              </div>
              <p className="text-[12px] bg-[#F97316] px-[4px] py-[3px]  text-white rounded-full absolute top-[-10px] right-[-8px]">
                20
              </p>
            </div>
            <div className="bg-[#F5F5F5] p-2 rounded-lg">
              <IoIosHeartEmpty className="text-2xl" />
            </div>
            <div className="bg-[#F5F5F5] p-2 rounded-lg">
              <IoCartOutline className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-orange-500 text-sm my-2 ">
        <Link
          href="/"
          className="font-semibold text-orange-500  px-3 py-2 bg-gray-300 rounded-md block"
          onClick={onNavItemClick}
        >
          Home
        </Link>
      </div>
      <div>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <p className="text-orange-500 font-semibold my-2 px-3 py-2 bg-gray-300 rounded-md">
              Categories
            </p>
          </SheetTrigger>
          <SheetContent side="left">
            <CategoryBar></CategoryBar>
          </SheetContent>
        </Sheet>
      </div>
      <div className="text-orange-500 text-sm my-2">
        <Link
          href="/login"
          className="font-semibold text-orange-500 my-2 px-3 py-2 bg-gray-300 rounded-md block"
          onClick={onNavItemClick}
        >
          Login
        </Link>
      </div>
      <div className="text-orange-500 text-sm my-2 ">
        <Link
          href="/registration"
          className="font-semibold text-orange-500  px-3 py-2 bg-gray-300 rounded-md block"
          onClick={onNavItemClick}
        >
          Sign Up
        </Link>
      </div>
      <div className="mt-2 block md:hidden">
        <Link href="/shop">
          {" "}
          <div>
            <Image
              src="/Group 48099301.png"
              alt="vector"
              width={150}
              height={150}
              onClick={onNavItemClick}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavItems;
