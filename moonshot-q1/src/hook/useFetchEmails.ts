import { SetStateAction, useEffect, useState } from "react";
import { EmailT } from "../@types/email";

type EmailRes = {
  list: EmailT[];
}

const useFetchEmails = (setData: {
  (value: SetStateAction<EmailT[] | null>): void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL!}`);
        const emails:EmailRes = await res.json();
        setData(emails.list.map((item) => ({...item, read:false, favorite:false })));
      } catch (e: any) {
        console.log(e);
        setIsError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmails();
  }, []);

  return { isLoading, isError };
};

export default useFetchEmails;
