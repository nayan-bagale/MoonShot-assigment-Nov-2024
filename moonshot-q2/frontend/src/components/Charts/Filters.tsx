import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFilters } from '../../redux/features/dataset-slice';


export interface Filters {
    ageGroup: '15-25' | '>25' | 'none';
    gender: "Male" | "Female" | "none";
    dateRange: { start: string; end: string }; // ISO date strings
}


interface FilterProps {
    onApplyFilters: (filters: Filters) => void;
}

const FilterPanel: React.FC<FilterProps> = ({ onApplyFilters }) => {
    const { ageGroup, gender, date } = useAppSelector((state) => state.dataset.filtersData);
    const dispatch = useAppDispatch()

    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: new Date(date?.start), to: new Date(date?.start)
    });

    const handleSubmit = (e:any) => {
        e.preventDefault()

        dispatch(setFilters({
            ageGroup: e.target[0].value,
            gender: e.target[1].value,
            dateRange: { start: dateRange.from.toISOString(), end: dateRange.to.toISOString() } 
        }))
        onApplyFilters({ 
            ageGroup: e.target[0].value, 
            gender: e.target[1].value, 
            dateRange: { start: dateRange.from.toISOString(), end: dateRange.to.toISOString() } 
        });
    }
    console.log('Rendering')
    const handleDateRangeSelect = (range: { from?: Date; to?: Date }) => {
        setDateRange(range);
        console.log('Selected Date Range:', range); // Replace with API call or state update logic
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                <div className='flex flex-row gap-8  w-full'>
                    <div className=' flex flex-col w-full gap-4'>
                        {/* Age Group Filter */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Age Group</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {ageGroup.map((item) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>

                        {/* Gender Filter */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {gender.map((item) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>
                    </div>


                    {/* Date Range Selector */}
                    <div className=' flex w-full flex-col'>
                        <label className="block text-gray-700 font-medium mb-2">Date Range</label>
                        <div className="flex flex-col w-fit space-x-2">
                            <DayPicker
                                mode="range"
                                selected={dateRange}
                                defaultMonth={new Date(date?.start)}
                                startMonth={new Date(date?.start)}
                                endMonth={new Date(date?.end)}
                                onSelect={handleDateRangeSelect}
                                className="mt-2 border rounded-lg p-2 bg-white shadow-sm"
                                required
                            />
                            {dateRange.from && dateRange.to && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Selected: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    // onClick={applyFilters}
                    type='submit'
                >
                    Apply Filters
                </button>
            </form>


        </div>
    );
};

export default FilterPanel;
