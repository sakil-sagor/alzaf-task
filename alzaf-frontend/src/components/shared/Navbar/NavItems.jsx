"use client";

import { customLoader } from "@/utils/customLoader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

const NavItems = ({ className }) => {
  const pathname = usePathname();

  const navLinks = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "/services", label: "Services" },
    // { id: 3, url: "/projects", label: "Project" },
    { id: 4, url: "/projectShowcase", label: "Project Showcase" },
    { id: 5, url: "/successStory", label: "Success" },
    { id: 6, url: "/blogs", label: "Blog" },
    { id: 7, url: "/about-us", label: "About Us" },
    { id: 8, url: "/contactUs", label: "Contact Us" },
    { id: 9, url: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div className="flex flex-col items-center md:flex-row pt-8">
      <div className="mb-8">
        <Link className="" href="/">
          <Image
            loader={customLoader}
            src="/alzaf-logo.png"
            width={120}
            height={120}
            alt=""
          />
        </Link>
      </div>
      <div className="flex flex-col items-center md:flex-row">
        <div className=" block md:hidden   ">
          <div className=" w-full max-w-sm items-center space-y-4">
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
