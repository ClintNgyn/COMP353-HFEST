import FacilityTable from "./components/FacilitiesTable";

async function getFacilities() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/facilities`);
  return res.json();
}
async function getQuery8() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/facilities/query8`);
  return res.json();
}
async function getQuery18() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/facilities/query18`);
  return res.json();
}

export default async function FacilitiesPage() {
  const facilities = await getFacilities();
  const query8 = await getQuery8();
  const query18 = await getQuery18();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 max-h-screen p-10">
        <FacilityTable facilities={facilities} />
      </div>
    </div>
  );
}
