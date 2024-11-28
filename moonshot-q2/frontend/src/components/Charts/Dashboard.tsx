import useFiltersInitialFetchAndAppliedFetch from '../../hooks/useFiltersInitialFetchAndAppliedFetch';
import { useGetDatasetMutation } from '../../redux/api/api-slice';
import { setLineChart } from '../../redux/features/dataset-slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BarChart from './BarChart';
import FilterPanel from './Filters';
import LineChart from './LineChart';

const Dashboard = () => {
    const barChartData = useAppSelector((state) => state.dataset.barChart)
    const lineChartData = useAppSelector((state) => state.dataset.lineChart)
    const filters = useAppSelector((state) => state.dataset.filtersApplied)
    const [getDataset, { isLoading: isLoadingLineChart }] = useGetDatasetMutation();

    const dispatch = useAppDispatch();
    const { isLoading } = useFiltersInitialFetchAndAppliedFetch();


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
            <div className=' flex justify-center flex-col lg:flex-row gap-10'>
                {!isLoading && (
                    <>
                        <div>
                            <h3>Bar Chart</h3>
                            <BarChart data={barChartData.times} labels={barChartData.features} onBarClick={handleBarClick} />
                        </div>
                        {isLoadingLineChart ? (<div>Loading...</div>) : (<div>
                            <h3>Line Chart</h3>
                            <LineChart data={lineChartData.values} labels={lineChartData.times} />
                        </div>)}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
