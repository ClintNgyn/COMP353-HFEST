"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";

import { useDisclosure } from "@nextui-org/react";
import useRenderCell from "#/hooks/useRenderCell";
import useToast from "#/hooks/useToast";

import ResidenceModal from "./PersonModal";
import { setPerson } from "#/(redux)/slices/personSlice";

export default function ResidenceTable({ persons }) {
  const columnDefinitions = [
    { key: "actions", label: "Actions" },
    { key: "id", label: "ID" },
    { key: "mainResidenceId", label: "mainResidenceId" },
    { key: "firstName", label: "firstName" },
    { key: "occupation", label: "occupation" },
    { key: "dob", label: "dob" },
    { key: "ssn", label: "ssn" },
    { key: "telephone", label: "telephone" },
    { key: "email", label: "email" },
  ];

  const ROWS_PER_PAGE = 4;

  const [page, setPage] = useState(1);
  const PAGES = Math.ceil(persons.length / ROWS_PER_PAGE);
  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return persons.slice(start, end);
  }, [page, persons]);

  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalPerson, setModalPerson] = useState(null);

  const dispatch = useDispatch();
  const onViewPress = async (e) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL}/persons/${e.target.id}`);
    dispatch(setPerson(res.data));
    console.log(res.data);
    router.push(`/persons/${e.target.id}`);
  };

  const onNewPress = (e) => {
    // open the addFacility modal
    setModalPerson(null);
    onOpen();
  };
  const onEditPress = async (e) => {
    // open the addFacility modal with this facility's values
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].id == e.target.id);
      if (persons[i].id == e.target.id) {
        setModalPerson(persons[i]);
        console.log(modalPerson);
        break;
      }
    }

    onOpen();
  };
  const onDeletePress = async (e) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASEURL}/persons/${e.target.id}`);
      router.refresh();
      toast.show(res.data.message, "success");
    } catch (error) {
      console.error(error);
    }
  };

  const renderCell = useRenderCell({ actions: { onViewPress, onEditPress, onDeletePress } });

  return (
    <div className="">
      <ResidenceModal person={modalPerson} isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className={`flex justify-between items-center mb-4 px-1`}>
        <h2 className="font-extrabold text-2xl">List of Persons</h2>
        <Button onPress={onNewPress} color="secondary" variant="solid" size="md" radius="md">
          New +
        </Button>
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
            <TableRow className="border-b-1" key={item.id}>
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
