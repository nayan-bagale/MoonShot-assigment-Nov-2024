import { FC, ReactNode } from "react"
import { cn } from "../../lib/utils";

interface ShortCardProps {
    children: ReactNode
    className?:string
    onClick?: () => void
    read?: boolean;
}

interface ShortCardComponent extends FC<ShortCardProps> {
    Avatar: FC<{ children: ReactNode }>;
    Container: FC<{ children: ReactNode }>;
    From: FC<{ children: ReactNode }>;
    Subject: FC<{ children: ReactNode }>;
    Body: FC<{ children: ReactNode }>;
    Badge: FC<{ children: ReactNode }>;
}

const ShortCard: ShortCardComponent = ({ children, className, onClick, read, ...props }) => {
    return (
        <div className={cn("overflow-hidden text-sm md:text-base border-Border border-2 gap-2 lg:gap-4 p-2 lg:p-3 lg:px-4 rounded-lg flex cursor-pointer ", read ? 'bg-Read-Background' : 'bg-white',className)} onClick={onClick} {...props} >
            {children}
        </div>
    )
}

const ShortAvatar: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className=' lg:text-2xl h-8 w-8 text-xl lg:h-12 lg:w-12 flex items-center justify-center text-white font-semibold bg-Accent rounded-full'>{children}</div>
    )
}
ShortCard.Avatar = ShortAvatar

const ShortCardContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className=' text-Text flex-1 w-full'>
            {children}
        </div>
    )
}

ShortCard.Container = ShortCardContainer

const ShortFrom: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            From: <span className='  font-bold'>{children} </span>
        </div>
    )
}

ShortCard.From = ShortFrom

const ShortSubject: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            Subject: <span className=' font-bold'>{children} </span>
        </div>
    )
}

ShortCard.Subject = ShortSubject

const ShortBody: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className=' py-2 text-ellipsis text-xs md:text-md overflow-hidden whitespace-nowrap max-w-[40ch]'>
        {children}
        </div>
    )
}

ShortCard.Body = ShortBody

const ShortBadge: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <div className=' text-Accent font-bold'>{children}</div>
    )
}

ShortCard.Badge = ShortBadge



export default ShortCard;