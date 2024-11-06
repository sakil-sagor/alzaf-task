"use client";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

const CategoryItem = ({ category, level = 0 }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="flex items-center cursor-pointer">
        <p className={`mr-4 font-light text-sm pl-${level * 4}`}>
          {category.title}
        </p>
        {category.childrens && <MdArrowForwardIos />}
      </div>
      {isActive && category.childrens && (
        <div
          className={`absolute top-0 left-full w-48 bg-white shadow-lg z-10 duration-300`}
        >
          {category.childrens.map((subCategory, index) => (
            <CategoryItem
              key={index}
              category={subCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
