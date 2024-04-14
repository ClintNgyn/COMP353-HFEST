import ResidencesTable from "./components/ResidencesTable";

async function getResidences() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/residences`, { cache: "no-cache" });
  return res.json();
}

export default async function FacilitiesPage() {
  const residences = await getResidences();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 max-h-screen p-10">
        <ResidencesTable residences={residences} />
      </div>
    </div>
  );
}
