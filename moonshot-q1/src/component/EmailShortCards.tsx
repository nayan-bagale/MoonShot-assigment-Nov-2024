import { Fragment } from 'react';
import { useEmail } from '../context/EmailContextAPI';
import ShortCard from './ui/short-card';
import { EmailT } from '../@types/email';
import { formatTimeStamp } from '../utils/formateTimeStamp';

const EmailShortCards = () => {
    const { emails, setSelectedEmail, markRead } = useEmail();

    const handleClick = (email: EmailT) => {
        setSelectedEmail(email)
        if (!email.read) {
            markRead(email);
        }
    }


    return (
        <Fragment>
            {emails?.map((item) => {
                const { id, subject, short_description, from, favorite, read, date } = item;
                const timeStamp = formatTimeStamp(new Date(date))
                return (
                    <ShortCard key={id} onClick={() => handleClick(item)} read={read}>
                        <ShortCard.Avatar>{from.name.charAt(0).toUpperCase()}</ShortCard.Avatar>
                        <ShortCard.Container>
                            <ShortCard.From>
                                {`${from.name} ${from.email}`}
                            </ShortCard.From>
                            <ShortCard.Subject>
                                {subject}
                            </ShortCard.Subject>
                            <ShortCard.Body>
                                {short_description}
                            </ShortCard.Body>
                            <div className=' flex gap-3'>
                                <div>
                                    {timeStamp.date}
                                </div>
                                <div>
                                    {timeStamp.time}
                                </div>
                                {favorite && <ShortCard.Badge>Favorite</ShortCard.Badge>}
                            </div>
                        </ShortCard.Container>
                    </ShortCard>
                )
            })}
        </Fragment>
    )
}

export default EmailShortCards