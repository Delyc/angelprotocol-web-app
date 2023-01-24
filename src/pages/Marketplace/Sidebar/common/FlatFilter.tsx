import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { GroupProps } from "./types";
import { Checkbox, Drawer } from ".";

export function FlatFilter<T>(props: GroupProps<T>) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <Listbox
      as="div"
      className="grid gap-6 px-2 py-4 border-b border-gray-l2 dark:border-bluegray"
      multiple
      value={props.selectedValues}
      onChange={props.onChange}
    >
      <Drawer isOpen={isOpen} toggle={toggle}>
        <span className="font-bold text-xs font-heading uppercase">
          {props.label}
        </span>
      </Drawer>

      {isOpen && (
        <Listbox.Options static className="flex flex-col gap-4">
          {props.options.map((option) => (
            <Listbox.Option
              value={option.value}
              key={option.key}
              className="flex items-center gap-4 w-fit h-8 p-1 text-sm font-normal font-body cursor-pointer capitalize"
            >
              {({ selected }) => (
                <>
                  <Checkbox checked={selected} readOnly />
                  {option.displayText}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      )}
    </Listbox>
  );
}