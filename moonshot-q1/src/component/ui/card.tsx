import { FC, ReactNode } from "react"
import { cn } from "../../lib/utils";

interface CardProps {
    children: ReactNode;
    onModelClose?: () => void;
    // className?: string;
    // onClick?: () => void;
    // read?: boolean;
}

type ComponentProps = FC<{ children: ReactNode }>;

interface CardComponent extends FC<CardProps> {
    Avatar: FC<{ children: ReactNode }>;
    Container: FC<{ children: ReactNode }>;
    Subject: FC<{ children: ReactNode }>;
    Date: FC<{ children: ReactNode }>;
    Body: FC<{ children: ReactNode, isLoading?: boolean }>;
    FavoriteButton: FC<{ isFavorite: boolean, toggleFavorite: () => void }>;
}

const Card: CardComponent = ({ children, onModelClose }) => {
    return (
        <div className=' top-1/2 z-20 lg:left-[45%] lg:-translate-x-0 -translate-x-1/2  left-1/2  transform  -translate-y-1/2 w-[90%] fixed lg:w-3/6 h-[85vh] border-Border border-2 flex p-4 lg:p-8 gap-3 pt-6 lg:gap-6 lg:pr-12  bg-white rounded-lg'>
            <button onClick={onModelClose} className=" absolute top-3 right-4">
                <img src="icons/cross-circle-svgrepo-com.svg" alt="cross" className=" h-6 w-6 " />
            </button>
            {children}
        </div>
    )
}

const CardAvatar: ComponentProps = ({ children }) => {
    return (
        <div className=' text-xl h-8 w-8 lg:h-12 lg:w-12 flex items-center justify-center text-white font-semibold bg-Accent rounded-full'>
            {children?.toString().charAt(0).toUpperCase()}
        </div>
    )
}

Card.Avatar = CardAvatar;

const CardContainer: ComponentProps = ({ children }) => {
    return (
        <div className=' flex flex-col w-full gap-2 lg:gap-5'>
            {children}
        </div>
    )

}

Card.Container = CardContainer;

const CardSubject: ComponentProps = ({ children }) => {
    return (
        <h1 className=' text-xl lg:text-3xl font-bold'>{children}</h1>
    )
}

Card.Subject = CardSubject;

const CardFavoriteButton: FC<{ isFavorite: boolean, toggleFavorite: () => void }> = ({ isFavorite, toggleFavorite }) => {
    return (
        <button
            className={cn(' text-white self-start lg:self-center font-medium px-3 py-1.5 text-xs rounded-full', isFavorite ? 'bg-Accent/40' : 'bg-Accent')}
            // disabled={isFavorite}
            onClick={toggleFavorite}
        >
            {!isFavorite ? 'Mark as favorite' : 'Unmark as favorite'}
        </button>

    )
}

Card.FavoriteButton = CardFavoriteButton;

const CardDate: ComponentProps = ({ children }) => {
    return (
        <div className=' flex gap-3'>
            {children}
        </div>
    )
}

Card.Date = CardDate;

const CardBody: FC<{ children: ReactNode, isLoading?: boolean }> = ({ children, isLoading }) => {

    if (isLoading) {
        return <p className="min-h-[85%]">Loading...</p>
    }
    return (
        <p className=" text-sm lg:text-base min-h-[85%] overflow-y-auto" dangerouslySetInnerHTML={{ __html: children?.toString() || '' }} />
    )
}

Card.Body = CardBody



export default Card;