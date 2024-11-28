import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useSelectOutside from '../../hooks/useSelectOutside';
import { setFilterDateRange } from '../../redux/features/dataset-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const DatePicker = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { date } = useAppSelector((state) => state.dataset.filtersData);
    const { dateRange } = useAppSelector((state) => state.dataset.filtersApplied);
    const ref = useRef(null);
    const dispatch = useAppDispatch()
    const dateRangeFrom = new Date(dateRange?.start || Date.now());
    const dateRangeTo = new Date(dateRange?.end || Date.now());
    const handleDateRangeSelect = (range: { from?: Date; to?: Date }) => {
        const date = {
            start: range.from?.toISOString() || '',
            end: range.to?.toISOString() || '',
        }
        dispatch(setFilterDateRange(date));
    };

    useSelectOutside({ref, setIsOpen});

    return (
        <div className="relative self-end inline-block text-left">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-md font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
                {(dateRange?.start && dateRange?.end) ? (
                    <p className="text-sm text-gray-600 mt-2">
                        Selected: {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
                    </p>
                ): (
                    <p>Date Picker:</p>
                )}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div 
                // className=' flex w-full flex-col'
                    className="absolute right-0 z-10 mt-0 w-fit"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    ref={ref}
                >
                {/* <label className="block text-gray-700 font-medium mb-2">Date Range</label> */}
                {/* <div className="flex flex-col w-fit space-x-2"> */}
                    <DayPicker
                        mode="range"
                        selected={{ from: dateRangeFrom, to: dateRangeTo }}
                        defaultMonth={new Date(date?.start)}
                        startMonth={new Date(date?.start)}
                        endMonth={new Date(date?.end)}
                        onSelect={handleDateRangeSelect}
                        className="mt-2 border rounded-lg p-2 bg-white shadow-sm"
                        required
                    />
                    
                {/* </div> */}
            </div>
        )}
        </div>
    )
}

export default DatePicker