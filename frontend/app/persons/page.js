import PersonsTable from "./components/PersonsTable";

async function getPersons() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/persons`, { cache: "no-cache" });
  return res.json();
}

export default async function PersonsPage() {
  const persons = await getPersons();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 max-h-screen p-10">
        <PersonsTable persons={persons} />
      </div>
    </div>
  );
}
