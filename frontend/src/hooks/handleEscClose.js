import { useEffect } from "react";

function HandleEscClose(
  {
    isOpen,
    onClose,
  }) {
    useEffect(() => {
      const closeByEsc = (e) => (e.key === "Escape" ? onClose() : null);

      if (isOpen) {        
        document.body.addEventListener("keydown", closeByEsc);
        return () => {
          document.body.removeEventListener("keydown", closeByEsc);
        }; 
      };
    }, [isOpen]);
  };

export default HandleEscClose;
