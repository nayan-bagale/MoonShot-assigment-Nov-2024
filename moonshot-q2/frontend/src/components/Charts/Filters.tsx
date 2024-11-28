import React from 'react';
import { setFilterAgeGroup, setFilterGender } from '../../redux/features/dataset-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import DatePicker from './DatePicker';
import ShareChartButton from './ShareChartButton';


export interface Filters {
    ageGroup: '15-25' | '>25' | 'none';
    gender: "Male" | "Female" | "none";
    dateRange: { start: string; end: string }; // ISO date strings
}


const FilterPanel: React.FC = () => {
    const { ageGroup: ageGroupList, gender: genderList } = useAppSelector((state) => state.dataset.filtersData);
    const dispatch = useAppDispatch()
    const { ageGroup, gender } = useAppSelector((state) => state.dataset.filtersApplied);

    return (
        <div className="p-4 border flex flex-row gap-8 border-gray-300 rounded-lg shadow-sm bg-white mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
            {/* Age Group Filter */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Age Group</label>
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={ageGroup}
                    onChange={(e) => {
                        dispatch(setFilterAgeGroup(e.target.value))
                    }}
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

            <DatePicker />
            <ShareChartButton />
        </div>
    );
};

export default FilterPanel;
