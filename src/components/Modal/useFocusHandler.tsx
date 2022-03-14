import { MutableRefObject, useCallback, useEffect, useRef } from "react";

const TAB_KEY = "Tab";
const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

export default function useFocusHandler() {
  const ref = useRef<HTMLDivElement>();

  const focusHandler = (
    currentRef?: MutableRefObject<HTMLDivElement | undefined>
  ) => {
    if (currentRef) ref.current = currentRef?.current;
    handler();
  };

  // hook to trap focus within modal
  const handler = useCallback(
    (evt?: KeyboardEvent) => {
      const focusableElements = Array.from(
        ref?.current?.querySelectorAll(focusableElementsString) || []
      );

      const firstTabStop = focusableElements[0] as HTMLElement;
      const lastTabStop = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (focusableElements.length === 0) return;

      if (!evt) {
        firstTabStop.focus();
        return;
      }

      // TAB
      if (evt.key === TAB_KEY) {
        // SHIFT + TAB
        if (evt.shiftKey) {
          if (document.activeElement === firstTabStop) {
            evt.preventDefault();
            lastTabStop.focus();
          }
        } else {
          if (document.activeElement === lastTabStop) {
            evt.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!ref) return;
    handler();
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return focusHandler;
}