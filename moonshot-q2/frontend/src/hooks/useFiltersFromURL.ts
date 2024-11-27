import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setBarChart, setFilters } from "../redux/features/dataset-slice";
import { useGetDatasetMutation } from "../redux/api/api-slice";

const useFiltersFromURL = () => {
  const dispatch = useAppDispatch();
  const [getDataset] = useGetDatasetMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const filters: any = {
      ageGroup: "none",
      gender: "none",
      dateRange: {},
    };

    if (searchParams.has("ageGroup")) {
      filters.ageGroup = searchParams.get("ageGroup");
    }
    if (searchParams.get("gender")) {
      filters.gender = searchParams.get("gender");
    }

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (startDate) {
      filters.dateRange.start = new Date(startDate).toISOString();
    }
    if (endDate) {
      filters.dateRange.end = new Date(endDate).toISOString();
    }
    const fetchFiltersAppliedData = async () => {
      const data = await getDataset({
        ...filters,
        dateRange: JSON.stringify(filters.dateRange),
      }).unwrap();
      dispatch(setBarChart(data));
    };
    fetchFiltersAppliedData();
    dispatch(setFilters(filters));

  }, []);
};

export default useFiltersFromURL;
