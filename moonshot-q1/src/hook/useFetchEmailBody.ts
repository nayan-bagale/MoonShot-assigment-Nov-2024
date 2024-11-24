import { useCallback, useState } from "react";
import { EmailBodyResT } from "../@types/email";

type FetchEmailBodyT = [
  (id: string) => Promise<EmailBodyResT | null>,
  { isLoading: boolean; isError: any; }
] 

const useFetchEmailBody = (): FetchEmailBodyT => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>(null);

  const fetchEmailBody = useCallback(
    async (id: string): Promise<EmailBodyResT | null> => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL!}/?id=${id}`
        );
        const emailBody: EmailBodyResT = await res.json();
        return emailBody;
      } catch (e) {
        console.log(e);
        setIsError(e);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return [fetchEmailBody, { isLoading, isError }];
};

export default useFetchEmailBody;
