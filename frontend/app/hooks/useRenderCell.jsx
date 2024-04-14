import { VerticalDotsIcon } from "#/components/common/VerticalDots";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useCallback } from "react";

/**
 * @param {Function} onEditPress - Callback function that gets called when the "View" option is pressed.
 * @param {Function} onEditPress - Callback function that gets called when the "Edit" option is pressed.
 * @param {Function} onDeletePress - Callback function that gets called when the "Delete" option is pressed.
 * @returns {Function} A function that accepts an item and a column key, and returns the rendered cell content.
 */
export default function useRenderCell({ actions } = { actions: { onViewPress: () => {}, onEditPress: () => {}, onDeletePress: () => {} } }) {
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown placement="left" showArrow offset={20}>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" aria-labelledby="Actions">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Edit and Delete">
                <DropdownItem id={item.id} onPress={actions.onViewPress}>
                  View
                </DropdownItem>
                <DropdownItem id={item.id} onPress={actions.onEditPress}>
                  Edit
                </DropdownItem>
                <DropdownItem id={item.id} onPress={actions.onDeletePress} className="text-danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  });

  return renderCell;
}
