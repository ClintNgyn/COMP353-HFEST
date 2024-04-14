"use client";
import { useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";

import useRenderCell from "#/hooks/useRenderCell";

export default function FacilityTable({ facilities }) {
  const columnDefinitions = [
    { key: "id", label: "ID" },
    { key: "facilityType", label: "Type" },
    { key: "facilityName", label: "Facility Name" },
    { key: "generalManagerName", label: "General Manager" },
    { key: "numberOfEmployees", label: "Number Of Employees" },
    { key: "numberOfDoctors", label: "Number Of Doctors" },
    { key: "numberOfNurses", label: "Number Of Nurses" },
    { key: "capacity", label: "Capacity" },
    { key: "telephone", label: "Telephone" },
    { key: "website", label: "Website" },
    { key: "city", label: "City" },
    { key: "province", label: "Province" },
    { key: "postalCode", label: "Postal Code" },
  ];

  const ROWS_PER_PAGE = 5;

  const [page, setPage] = useState(1);
  const PAGES = Math.ceil(facilities.length / ROWS_PER_PAGE);
  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return facilities.slice(start, end);
  }, [page, facilities]);

  const renderCell = useRenderCell();

  return (
    <div>
      <div className={`flex justify-between items-center mb-4 px-1`}>
        <h2 className="font-extrabold text-2xl">Query #8</h2>
      </div>
      <Table
        radius="lg"
        shadow="md"
        isHeaderSticky
        bottomContentPlacement="outside"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination isCompact showControls showShadow color="secondary" page={page} total={PAGES} onChange={(page) => setPage(page)} />
          </div>
        }
        classNames={{
          wrapper: "min-h-[18rem]",
        }}
      >
        <TableHeader columns={columnDefinitions}>
          {(col) => (
            <TableColumn className="bg-gray-200" key={col.key}>
              <div className="px-3 text-pretty">{col.label}</div>
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={items}>
          {(item) => (
            <TableRow className="border-b-1" key={item.id}>
              {(columnKey) => (
                <TableCell className="">
                  <span className="text-xs text-nowrap">{renderCell(item, columnKey)}</span>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
