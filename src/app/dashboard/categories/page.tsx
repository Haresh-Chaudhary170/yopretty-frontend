"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import CategoryTable from "./components/CategoryTable";

type Category = {
  id: string;
  name: string;
};


const Categories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [filter, setFilter] = useState(""); // Search filter
  const [filteredData, setFilteredData] = useState<Category[]>([]);

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      // setIsLoading(true);
      try {
        const response = await axios.get("/api/categories");
        setFilteredData(response.data.categories)
        setData(response.data.categories);
      } catch {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filtered = data.filter((event) => {
        const matchesSearch =
          (event.name?.toLowerCase().includes(filter.toLowerCase()) || false)

        return matchesSearch;
      });

      setFilteredData(filtered);
    }
  }, [filter, data]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <PageTitle title="Category" />
        <Link
          href="/admin/categories/add"
          className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-3 rounded-lg"
        >
          <span>+ </span>Add Category
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name"
        className="border px-2 py-2 rounded-xl w-72"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <CategoryTable data={filteredData} />
    </div>
  );
};

export default Categories;
