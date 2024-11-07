"use client";

import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

const CategorySideItems = ({ category }) => {
  console.log(category);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        className={`cursor-pointer p-1 flex items-center bottom-1 border-b-2  justify-between ${
          category.childrens && "text-orange-600"
        } `}
      >
        {category.title}
        {category.childrens && (
          <MdArrowForwardIos className="text-orange-600" />
        )}
      </div>
      {isOpen && category.childrens && category.childrens.length > 0 && (
        <div style={{ paddingLeft: "20px" }}>
          {category.childrens.map((child) => (
            <CategorySideItems key={child.id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySideItems;
