"use client";

import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import beautify from "json-beautify";

export default function ResidencePage() {
  const scheduled = useSelector((state) => state.vaccinated);
  const json = beautify(scheduled, null, 2, 100);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="p-4 text-sm">
        <pre>{json}</pre>
      </div>
    </div>
  );
}
