"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

const NavItems = ({ className }) => {
  const pathname = usePathname();
  const navLinks = [
    {
      id: 1,
      url: "/shop",
      label: (
        <>
          <div className="flex items-center ">
            <p>Language </p>
            <IoIosArrowDown />
          </div>
        </>
      ),
    },
    { id: 2, url: "/shop", label: "Help Center" },
    { id: 3, url: "/shop", label: "Helpline: 0964781656" },
    { id: 4, url: "/shop", label: "Become a Seller" },
    { id: 5, url: "/shop", label: "Order Track" },
  ];

  return (
    <div className="flex flex-col items-center md:flex-row pt-8">
      <div className="flex flex-col items-center md:flex-row">
        <div className=" block md:hidden   ">
          <div className="flex w-full max-w-sm items-center space-x-4 mb-4">
            <div className="relative ">
              <div className=" bg-[#F5F5F5] p-2 rounded-lg">
                <FaRegUser className="text-2xl" />
              </div>
              <p className="text-[12px] bg-[#F97316] px-[4px] py-[3px]  text-white rounded-full absolute top-[-15] right-[-10]">
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
      <div className="flex flex-col items-center md:flex-row">
        {navLinks.map((link) => (
          <Button asChild variant="link" key={link.id}>
            <Link href={link.url} className="font-semibold">
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="text-orange-500 text-sm">
        <Link href="/login" className="font-semibold text-orange-500">
          Login
        </Link>
      </div>
      <div className="text-orange-500 text-sm mt-2">
        <Link href="/registration" className="font-semibold text-orange-500">
          Sign Up
        </Link>
      </div>
      <div className="mt-2 block md:hidden">
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
    </div>
  );
};

export default NavItems;
