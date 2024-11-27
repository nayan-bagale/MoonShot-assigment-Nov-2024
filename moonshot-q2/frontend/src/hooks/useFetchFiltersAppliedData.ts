import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetDatasetMutation } from "../redux/api/api-slice";
import { setBarChart } from "../redux/features/dataset-slice";

const useFetchFiltersAppliedData = () => {
  const filters = useAppSelector((state) => state.dataset.filtersApplied);
  const dispatch = useAppDispatch();
  const [getDataset] = useGetDatasetMutation();

  useEffect(() => {
    const fetchFiltersAppliedData = async () => {
      const data = await getDataset({
        ...filters,
        dateRange: JSON.stringify(filters.dateRange),
      }).unwrap();
      dispatch(setBarChart(data));
    };

    // Update the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    if (filters.ageGroup) {
      searchParams.set("ageGroup", filters.ageGroup);
    }
    if (filters.gender) {
      searchParams.set("gender", filters.gender);
    }
    if (filters.dateRange && 'start' in filters.dateRange) {
      searchParams.set("startDate", filters.dateRange.start.split("T")[0])
    }
    if (filters.dateRange && 'end' in filters.dateRange) {
      searchParams.set("endDate", filters.dateRange.end.split("T")[0])
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);

    fetchFiltersAppliedData();
  }, [filters]);
};

export default useFetchFiltersAppliedData;
