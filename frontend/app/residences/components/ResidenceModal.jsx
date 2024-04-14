"use client";

import useToast from "#/hooks/useToast";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FacilityModal({ residence, ...props }) {
  const formFieldsDefault = {
    residenceType: {
      label: "Type",
      placeholder: "Condo",
      autoFocus: true,
    },
    bedrooms: {
      label: "Bedrooms",
      placeholder: "10",
      type: "number",
    },
    homePhone: {
      label: "Phone",
      placeholder: "514-123-1233",
    },
    address: {
      label: "Address",
      placeholder: "123 Main Street",
    },
    city: {
      label: "City",
      placeholder: "Saint Laurent",
    },
    postalCode: {
      label: "Postal Code",
      placeholder: "H4R 1W5",
    },
    province: {
      label: "Province",
      placeholder: "ON",
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
      if (residence) {
        let finalResidence = {};
        Object.keys(formFieldsDefault).map((key) => {
          const userVal = formValues[key].value;
          switch (key) {
            case "bedrooms":
              finalResidence[key] = userVal === undefined || userVal === null ? residence[key] : Number(userVal);
              break;
            default:
              finalResidence[key] = userVal === undefined || userVal === null ? residence[key] : userVal;
          }
        });

        console.log(finalResidence);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/residences/${residence.id}
          `,
          finalResidence,
        );

        router.refresh();
        toast.show(res.data.message, "info");
        return callback();
      }

      //add new facility
      let finalResidence = {};
      Object.keys(formFieldsDefault).map((key) => {
        const userVal = formValues[key].value;
        switch (key) {
          case "bedrooms":
            finalResidence[key] = Number(userVal);
            break;
          default:
            finalResidence[key] = userVal;
        }
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/residences
        `,
        finalResidence,
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
              <ModalHeader>{!residence ? "Create a new Residence" : "Update Residence"}</ModalHeader>
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
                      defaultValue={residence && residence[key]}
                    />
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color={!residence ? "default" : "default"} variant="light" onPress={() => handleOnClose(onClose)}>
                {!residence ? "Close" : "Cancel"}
              </Button>
              <Button color={!residence ? "primary" : "secondary"} onPress={async () => handleSubmit(onClose)}>
                {!residence ? "Add" : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
