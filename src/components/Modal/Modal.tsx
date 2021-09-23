import { ReactNode, useState } from "react";

type Handler = () => void;

type Props = {
  render: (closeHandler: Handler) => ReactNode;
};

export default function Modal({ render }: Props) {
  const [shown, setShown] = useState(true);

  function handleClose() {
    setShown(false);
  }

  if (shown) {
    return (
      <div className="fixed bg-gray-800 bg-opacity-80 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center">
        {render(handleClose)}
      </div>
    );
  } else {
    return null;
  }
}