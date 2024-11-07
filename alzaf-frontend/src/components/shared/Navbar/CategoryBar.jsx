"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CategorySideItems from "./CategorySideItems";

// Main CategoryBar component
const CategoryBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.shope.com.bd/api/v1/public/hero-categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <CategorySideItems key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryBar;
