import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetDatasetMutation, useGetFiltersMutation } from "../redux/api/api-slice";
import { setBarChart, setFilterData, setFilters } from "../redux/features/dataset-slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const useFiltersFromURL = () => {
  const dispatch = useAppDispatch();
  const [getDataset] = useGetDatasetMutation();
  const [cookie, setCookie] = useCookies(["preferences"]);
  const [getFilters, {isLoading}] = useGetFiltersMutation();
  const filters = useAppSelector((state) => state.dataset.filtersApplied);


  useEffect(() => {
    const fetchDataset = async () => {
      const filtersRes = await getFilters("").unwrap();
      dispatch(setFilterData(filtersRes));
    };
    const searchParams = new URLSearchParams(window.location.search);
    const filters: any = {
      ageGroup: "none",
      gender: "none",
      dateRange: {},
    };

    if (searchParams.has("ageGroup")) {
      filters.ageGroup = searchParams.get("ageGroup");
    }
    if (searchParams.has("gender")) {
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

    if (
      filters.ageGroup === "none" &&
      filters.gender === "none" &&
      Object.keys(filters.dateRange).length === 0
    ) {
      if (cookie.preferences) {
        const cookieFilters = cookie.preferences;
        console.log(cookieFilters);
        filters.ageGroup = cookieFilters.ageGroup;
        filters.gender = cookieFilters.gender;
        if (cookieFilters.dateRange.start && cookieFilters.dateRange.end) {
          filters.dateRange = {
            start: cookieFilters.dateRange.start,
            end: cookieFilters.dateRange.end,
          };
        }
      }
    }else{
    const fetchFiltersAppliedData = async () => {
      const data = await getDataset({
        ...filters,
        dateRange: JSON.stringify(filters.dateRange),
      }).unwrap();
      dispatch(setBarChart(data));
    };
    fetchFiltersAppliedData();
    }

    fetchDataset();
    dispatch(setFilters(filters));
  }, []);

  useEffect(() => {
    const fetchFiltersAppliedData = async () => {
      const data = await getDataset({
        ...filters,
        dateRange: JSON.stringify(filters.dateRange),
      }).unwrap();
      dispatch(setBarChart(data));
    };
    console.log({ filters });

    setCookie("preferences", JSON.stringify(filters), { path: "/" });

    // // Update the URL search parameters
    // const searchParams = new URLSearchParams(window.location.search);
    // if (filters.ageGroup) {
    //   searchParams.set("ageGroup", filters.ageGroup);
    // }
    // if (filters.gender) {
    //   searchParams.set("gender", filters.gender);
    // }
    // if (filters.dateRange && 'start' in filters.dateRange) {
    //   searchParams.set("startDate", filters.dateRange.start.split("T")[0])
    // }
    // if (filters.dateRange && 'end' in filters.dateRange) {
    //   searchParams.set("endDate", filters.dateRange.end.split("T")[0])
    // }
    // const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    // window.history.replaceState(null, "", newUrl);

    fetchFiltersAppliedData();
  }, [filters]);

  return {isLoading}

};

export default useFiltersFromURL;
