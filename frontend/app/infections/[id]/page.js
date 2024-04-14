"use client";

import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import beautify from "json-beautify";

export default function ResidencePage() {
  const scheduled = useSelector((state) => state.infected);
  const _json = beautify(scheduled, null, 2, 5);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="">
        <pre>{_json}</pre>
      </div>
    </div>
  );
}
