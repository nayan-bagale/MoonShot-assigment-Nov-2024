import React, { useContext, useMemo, useState } from 'react';
import { EmailContentT, EmailContextT, EmailFilterT, EmailT } from '../@types/email';
import useFetchEmails from '../hook/useFetchEmails';

const EmailContext = React.createContext<EmailContextT>({});

const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [emails, setEmails] = useState<EmailT[] | null>(null);
    useFetchEmails(setEmails);
    const [selectedEmail, setSelectedEmail] = useState<EmailContentT | null>(null);
    const [filter, setFilter] = useState<EmailFilterT>('all');
    // const [page, setPage] = useState(1);

    const filteredEmails  = useMemo(() => {
        if(!emails) return []
        switch(filter){
            case 'all':
            return emails
            case 'read':
                return emails?.filter((item) => item.read)
            case 'unread':
                return emails?.filter((item) => !item.read)
            case 'favorite':
                return emails?.filter((item) => item.favorite)
            default:
                return emails
        }
    }, [filter, emails])

    const markRead = (email: EmailT) => {
       if (emails) {
           setEmails(emails.map((item) => {
               if (email?.id === item.id) {
                   return { ...item, read: true };
               }
               return item;
           }));
       }
    }

    const markFavorite = (email: EmailT) => {
        if (emails && selectedEmail){
            setEmails(emails.map((item) => {
                if (email?.id === item.id) {
                    return { ...item, favorite: !item.favorite };
                }
                return item;
            }))
            setSelectedEmail({ ...selectedEmail, favorite: !selectedEmail?.favorite })
        } 
    }


    return <EmailContext.Provider
        value={{ 
            emails: filteredEmails,
            markRead,
            markFavorite,
            selectedEmail,
            setSelectedEmail,
            filter,
            setFilter,
            // page,
            // setPage
         }}
    >
        {children}
    </EmailContext.Provider>;
};

export const useEmail = () => useContext(EmailContext);

export default EmailProvider;