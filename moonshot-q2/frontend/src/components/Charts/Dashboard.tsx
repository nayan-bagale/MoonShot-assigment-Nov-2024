import { useEffect, useLayoutEffect } from 'react';
import { useGetDatasetMutation, useGetFiltersMutation } from '../../redux/api/api-slice';
import { setBarChart, setFilterData, setFilters, setLineChart } from '../../redux/features/dataset-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BarChart from './BarChart';
import LineChart from './LineChart';
import FilterPanel, { Filters } from './Filters';
import useFiltersFromURL from '../../hooks/useFiltersFromURL';
import useFetchFiltersAppliedData from '../../hooks/useFetchFiltersAppliedData';

const Dashboard = () => {
    const barChartData = useAppSelector((state) => state.dataset.barChart)
    const lineChartData = useAppSelector((state) => state.dataset.lineChart)
    const filters = useAppSelector((state) => state.dataset.filtersApplied)
    const [getDataset] = useGetDatasetMutation();
    const [getFilters] = useGetFiltersMutation();

    const dispatch = useAppDispatch();
    useFiltersFromURL();
    useFetchFiltersAppliedData();

    useLayoutEffect(() => {
        const fetchDataset = async () => {
            const barChartRes = await getDataset('').unwrap();
            dispatch(setBarChart(barChartRes));
            const filtersRes = await getFilters('').unwrap();
            dispatch(setFilterData(filtersRes))
        }
        fetchDataset()
    }, []);

    const handleBarClick = async (category: string) => {
        const data = await getDataset({ ...filters, dateRange: JSON.stringify(filters.dateRange), feature: category }).unwrap();
        const times: number[] = [], values: string[] = [];
        data.map((item: any) => {
            times.push(item.day.split('T')[0])
            values.push(item[category.toLowerCase()])
        })
        dispatch(setLineChart({ times, values }))
    };


    return (
        <div className=' flex justify-center flex-col gap-10'>
            <div>
                <FilterPanel />
            </div>
            <div className=' flex justify-center gap-10'>
                <div>
                    <h3>Bar Chart</h3>
                    <BarChart data={barChartData.times} labels={barChartData.features} onBarClick={handleBarClick} />
                </div>
                <div>
                    <h3>Line Chart</h3>
                    <LineChart data={lineChartData.values} labels={lineChartData.times} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
