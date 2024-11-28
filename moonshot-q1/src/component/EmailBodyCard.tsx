import { useEffect, useState } from 'react';
import { EmailBodyResT } from '../@types/email';
import { useEmail } from '../context/EmailContextAPI';
import useFetchEmailBody from '../hook/useFetchEmailBody';
import { formatTimeStamp } from '../utils/formateTimeStamp';
import Card from './ui/card';

const EmailBodyCard = () => {
    const [getEmailBody, { isLoading, isError }] = useFetchEmailBody();
    const { selectedEmail, setSelectedEmail, markFavorite } = useEmail();
    const [emailBody, setEmailBody] = useState<EmailBodyResT | null>(null);

    useEffect(() => {
        if (!selectedEmail) return
        const handleEmailBody = async () => {
            const emailBodyRes = await getEmailBody(selectedEmail?.id);
            setEmailBody(emailBodyRes)
        }
        handleEmailBody()
    }, [selectedEmail?.id, getEmailBody])

    const handleFavorite = () => {
        if (selectedEmail) {
            markFavorite(selectedEmail);
        }
    }
    
    const timeStamp = selectedEmail ? formatTimeStamp(new Date(selectedEmail.date)) : { date: '', time: '' }

    return (
        <Card onModelClose={() => setSelectedEmail(null)}>
            <Card.Avatar>{selectedEmail?.from.name}</Card.Avatar>
            <Card.Container>
                <div className=' flex w-full flex-col lg:flex-row justify-between pr-4'>
                    <Card.Subject>{selectedEmail?.subject}</Card.Subject>
                    <Card.FavoriteButton
                        isFavorite={selectedEmail?.favorite ?? false}
                        toggleFavorite={handleFavorite}
                    />
                </div>
                <Card.Date>
                    <div>{timeStamp?.date}</div>
                    <div>{timeStamp?.time}</div>
                </Card.Date>
                {isError && <p>{isError}</p>}
                <Card.Body isLoading={isLoading}>
                    {emailBody?.body}
                </Card.Body>
            </Card.Container>
        </Card>
    )
}

export default EmailBodyCard