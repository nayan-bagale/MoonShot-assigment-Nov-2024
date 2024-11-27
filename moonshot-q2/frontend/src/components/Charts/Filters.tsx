import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { setFilterAgeGroup, setFilterDateRange, setFilterGender } from '../../redux/features/dataset-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ShareChartButton from './ShareChartButton';


export interface Filters {
    ageGroup: '15-25' | '>25' | 'none';
    gender: "Male" | "Female" | "none";
    dateRange: { start: string; end: string }; // ISO date strings
}


const FilterPanel: React.FC = () => {
    const { ageGroup: ageGroupList, gender: genderList, date } = useAppSelector((state) => state.dataset.filtersData);
    const dispatch = useAppDispatch()

    const { ageGroup, gender, dateRange } = useAppSelector((state) => state.dataset.filtersApplied);

    const dateRangeFrom = new Date(dateRange?.start || Date.now());
    const dateRangeTo = new Date(dateRange?.end || Date.now());

    const handleDateRangeSelect = (range: { from?: Date; to?: Date }) => {
        const date = {
            start: range.from?.toISOString() || '',
            end: range.to?.toISOString() || '',
        }
        dispatch(setFilterDateRange(date));
        // console.log('Selected Date Range:', range); // Replace with API call or state update logic
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
            <div className="flex w-full flex-col gap-4">
                <div className='flex flex-row gap-8  w-full'>
                    <div className=' flex flex-col w-full gap-4'>
                        {/* Age Group Filter */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Age Group</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={ageGroup}
                                onChange={(e) => dispatch(setFilterAgeGroup(e.target.value))}
                            >
                                {ageGroupList.map((item) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>

                        {/* Gender Filter */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={gender}
                                onChange={(e) => dispatch(setFilterGender(e.target.value))}
                            >
                                {genderList.map((item) => (<option value={item}>{item}</option>))}
                            </select>
                        </div>
                    </div>

                    {/* Date Range Selector */}
                    <div className=' flex w-full flex-col'>
                        <label className="block text-gray-700 font-medium mb-2">Date Range</label>
                        <div className="flex flex-col w-fit space-x-2">
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
                            {dateRange.from && dateRange.to && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Selected: {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ShareChartButton />
        </div>
    );
};

export default FilterPanel;
