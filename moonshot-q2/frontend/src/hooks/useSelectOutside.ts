import React, { useEffect } from 'react'

interface UseSelectOutsideProps {
    ref: React.RefObject<HTMLElement>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useSelectOutside = ({ ref, setIsOpen }: UseSelectOutsideProps): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export default useSelectOutside