"use client";

import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import beautify from "json-beautify";
import { useEffect } from "react";

export default function PersonPage() {
  const person = useSelector((state) => state.person);

  const _json = beautify(person, null, 2, 100);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="p-4 text-sm">
        <pre>{_json}</pre>
      </div>
    </div>
  );
}
