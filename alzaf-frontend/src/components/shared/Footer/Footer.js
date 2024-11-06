import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 text-center gap-8 px-2">
        {/* Company Info */}
        <div>
          <div className="flex justify-center">
            <Image
              src="/alzaf_footer_logo.webp"
              alt="logo"
              height={120}
              width={120}
            />
          </div>
          <p className="mt-4">
            #4613, Dada Tower (2nd Floor)
            <br />
            Madhupur, Tangail Dhaka, Bangladesh.
          </p>
          <p className="mt-2">+8809613815815</p>
          <p className="mt-2">support@alzaf.com</p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About Alzaf
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Alzaf Payment
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Alzaf Blog
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Alzaf Apps
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-semibold mb-4">Customer Care</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                How to Buy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                How to Buy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="">
          <span className="font-semibold">Payment Method</span>
          <div className="flex items-center justify-center mt-2 space-x-4">
            <div className="p-2 rounded-md bg-white">
              <Image
                src="/city-bank.webp"
                alt="City"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </div>
            <div className="p-2 rounded-md bg-white">
              <Image
                src="/dbbl.webp"
                alt="DBBL"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </div>
            <div className="p-2 rounded-md bg-white">
              <Image
                src="/ncc-bank.webp"
                alt="NCC Bank"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </div>
            <div className="p-2 rounded-md bg-white">
              <Image
                src="/bkash.webp"
                alt="Bkash"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method & Download Apps */}
      <div className="container mx-auto px-6 mt-8 flex flex-col md:flex-row items-center justify-between  pt-6">
        <div className="mx-auto  mt-6 md:mt-0">
          <div className="text-center">
            <span className="font-semibold ">Download Apps</span>
            <div className="md:flex gap-x-6 mt-4">
              <div className="flex justify-between items-center gap-x-3 bg-black px-5 py-2 rounded-md">
                <FaApple className="text-4xl" />
                <div>
                  <p className="text-[12px]"> Download On</p>
                  <p>Apple Store</p>
                </div>
              </div>
              <div className="flex justify-between items-center gap-x-3 bg-black px-5 py-2 rounded-md mt-6 md:mt-0">
                <FaGooglePlay className="text-4xl" />
                <div>
                  <p className="text-[12px]"> Download On</p>
                  <p>Apple Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm  mt-8 text-white">
        &copy; 2024 Alzaf.com All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
