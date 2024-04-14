import FacilityTable from "./components/EmployeeTable";

async function getInfected() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/infected`);
  return res.json();
}
export default async function FacilitiesPage() {
  const facilities = await getInfected();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 max-h-screen p-10">
        <FacilityTable facilities={facilities} />
      </div>
    </div>
  );
}
