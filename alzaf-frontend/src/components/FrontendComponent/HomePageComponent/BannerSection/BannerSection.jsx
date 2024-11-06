import BannerCategory from "../CategoriesHome/BannerCategory";
import SliderHero from "./SliderHero";

export default async function BannerSection() {
  const res = await fetch(
    "https://api.shope.com.bd/api/v1/public/hero-categories",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  const slides = [
    {
      id: 1,
      backgroundImage: "/slide banner.png",
    },
    {
      id: 2,
      backgroundImage: "/slide banner1.png",
    },
    {
      id: 3,
      backgroundImage: "/slide banner2.png",
    },
  ];
  return (
    <div className="relative">
      <SliderHero slides={slides} />
      <div className="container mx-auto px-2">
        <div className="absolute top-0 z-50 container mx-auto px-2 h-full">
          <BannerCategory data={data}></BannerCategory>
        </div>
      </div>
    </div>
  );
}
