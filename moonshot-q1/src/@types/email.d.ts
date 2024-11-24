import { Dispatch, SetStateAction } from "react";

export interface EmailT {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
  read:boolean;
  favorite:boolean;
};

export interface EmailContentT extends EmailT {
  body: string;
}

export interface EmailBodyResT {
  id: string;
  body: string;
};

export type EmailFilterT = "read" | "unread" | "favorite" | "all";

export interface EmailContextT {
  emails: EmailT[] | null;
  selectedEmail: EmailContentT | null;
  setSelectedEmail: Dispatch<SetStateAction<EmailContent | null>>;
  filter: EmailFilterT;
  setFilter: Dispatch<SetStateAction<EmailFilterT>>;
  markRead: (email: EmailT) => void;
  markFavorite: (email: EmailT) => void;
  // page: number;
  // setPage: Dispatch<SetStateAction<number>>;
}