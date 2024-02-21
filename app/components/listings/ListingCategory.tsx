"use client";

import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description: string;
  label: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  description,
  label,
}) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl border-neutral-400">
      <div className="flex gap-4 items-center">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col gap-3 ">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-600 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
