"use client";

import { useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";

import useRenderCell from "#/hooks/useRenderCell";

export default function FacilityTable({ facilities }) {
  const columnDefinitions = [
    { key: "province", label: "Province" },
    { key: "totalNumberOfFacilities", label: "Number Of Facilities" },
    { key: "totalNumberOfEmployees", label: "Number Of Employees" },
    { key: "totalNumberOfCurrentlyInfectedEmployees", label: "Number Of Infected Employees " },
    { key: "maxCapacity", label: "Max Capacity of all Facilities" },
    { key: "totalHoursScheduled", label: "Total Hours Scheduled" },
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
        <h2 className="font-extrabold text-2xl">Query #18</h2>
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
              <div className="px-5 text-center">{col.label}</div>
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={items}>
          {(item) => (
            <TableRow className="border-b-1" key={item.province}>
              {(columnKey) => (
                <TableCell className="text-center">
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
