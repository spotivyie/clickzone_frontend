import { useEffect } from "react";

export default function useDropdownToggle(open, setOpen, dropdownRef) {
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
        };

        if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen, dropdownRef]);
}
