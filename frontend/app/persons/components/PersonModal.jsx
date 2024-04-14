"use client";

import useToast from "#/hooks/useToast";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FacilityModal({ person, ...props }) {
  const formFieldsDefault = {
    firstName: {
      label: "firstName",
      placeholder: "firstName",
      autoFocus: true,
    },
    lastName: {
      label: "lastName",
      placeholder: "lastName",
    },
    dob: {
      label: "dob",
      placeholder: "dob",
    },
    ssn: {
      label: "ssn",
      placeholder: "ssn",
    },
    mainResidenceId: {
      label: "mainResidenceId",
      placeholder: "manResidenceId",
    },
    telephone: {
      label: "Phone",
      placeholder: "514-123-1233",
    },
    email: {
      label: "email",
      placeholder: "email",
    },
    occupation: {
      label: "occupation",
      placeholder: "occupation",
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
      //update
      if (person) {
        let finalPerson = {};
        Object.keys(formFieldsDefault).map((key) => {
          const userVal = formValues[key].value;
          switch (key) {
            case "mainResidenceId":
              finalPerson[key] = userVal === undefined || userVal === null ? person[key] : Number(userVal);
              break;
            default:
              finalPerson[key] = userVal === undefined || userVal === null ? person[key] : userVal;
          }
        });

        console.log(finalPerson);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/persons/${person.id}
          `,
          finalPerson,
        );

        router.refresh();
        toast.show(res.data.message, "info");
        return callback();
      }

      //add new facility
      let finalPerson = {};
      Object.keys(formFieldsDefault).map((key) => {
        const userVal = formValues[key].value;
        switch (key) {
          case "mainResidenceId":
            finalPerson[key] = Number(userVal);
            break;
          default:
            finalPerson[key] = userVal;
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/persons
        `,
        finalPerson,
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
              <ModalHeader>{!person ? "Create a new Person" : "Update Person"}</ModalHeader>
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
                      defaultValue={person && person[key]}
                    />
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color={!person ? "default" : "default"} variant="light" onPress={() => handleOnClose(onClose)}>
                {!person ? "Close" : "Cancel"}
              </Button>
              <Button color={!person ? "primary" : "secondary"} onPress={async () => handleSubmit(onClose)}>
                {!person ? "Add" : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
