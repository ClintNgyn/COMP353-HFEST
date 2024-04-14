"use client";

import useToast from "#/hooks/useToast";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FacilityModal({ facility, ...props }) {
  const formFieldsDefault = {
    id: {
      label: "Id",
      readOnly: true,
      isClearable: false,
      className: "hidden",
    },
    employeeId: {
      label: "employeeId",
      placeholder: "employeeId",
      autoFocus: true,
    },
    facilityId: {
      label: "facilityId",
      placeholder: "facilityId",
    },
    startAt: {
      label: "startAt",
      placeholder: "startAt",
    },
    workRole: {
      label: "workRole",
      placeholder: "workRole",
    },
    endAt: {
      label: "endAt",
      placeholder: "endAt",
    },
  };

  const [formValues, setFormValues] = useState(formFieldsDefault);

  const toast = useToast();
  const router = useRouter();

  const handleFormChange = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: {
        ...formValues[key],
        value: value,
      },
    });
  };
  const handleOnOpen = (callback) => {
    setFormValues(formFieldsDefault);
    callback(); // open modal
  };
  const handleOnClose = (callback) => {
    setFormValues(formFieldsDefault);
    callback(); // close modal
  };
  const handleSubmit = async (callback) => {
    try {
      //update facility
      if (facility) {
        let finalFacility = {};
        Object.keys(formFieldsDefault).map((key) => {
          const userVal = formValues[key].value;
          finalFacility[key] = userVal === undefined || userVal === null ? facility[key] : userVal;
        });

        console.log(JSON.stringify(finalFacility));
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/scheduled/${facility.id}
          `,
          finalFacility,
        );

        router.refresh();
        toast.show(res.data.message, "info");
        return callback();
      }

      //add new facility
      let finalFacility = {};
      Object.keys(formFieldsDefault).map((key) => {
        const userVal = formValues[key].value;
        switch (key) {
          case "facilityId":
            finalFacility[key] = Number(userVal);
            break;
          default:
            finalFacility[key] = userVal;
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/scheduled
        `,
        finalFacility,
      );

      router.refresh();
      toast.show(res.data.message, "info");
      return callback();
    } catch (error) {
      toast.show(error.message, "error");
      console.error(error);
    }
  };

  return (
    <Modal {...props} onOpenChange={() => handleOnOpen(props.onOpenChange)}>
      <ModalContent className="py-2 h-[28rem] min-w-[35rem] overflow-auto absolute">
        {(onClose) => (
          <>
            <div className="flex border-b-2 items-center justify-between  mb-2">
              <ModalHeader>{!facility ? "Create a new Schedule" : "Update Schedule"}</ModalHeader>
            </div>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.keys(formFieldsDefault).map((key) => {
                  {
                    /* console.log(formValues[key]); */
                  }
                  return (
                    <Input
                      isRequired
                      isClearable
                      {...formValues[key]}
                      onValueChange={(value) => handleFormChange(key, value)}
                      classNames={{ input: ["text-xs"], label: ["text-xs"] }}
                      defaultValue={facility && facility[key]}
                    />
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color={!facility ? "default" : "default"} variant="light" onPress={() => handleOnClose(onClose)}>
                {!facility ? "Close" : "Cancel"}
              </Button>
              <Button color={!facility ? "primary" : "secondary"} onPress={async () => handleSubmit(onClose)}>
                {!facility ? "Add" : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
