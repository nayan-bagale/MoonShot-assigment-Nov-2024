import { createSlice } from "@reduxjs/toolkit";

export interface DatasetState {
  barChart: {
    features: string[];
    times: number[];
  };
  lineChart: {
    times: string[];
    values: number[];
  };
  filtersApplied: {
    ageGroup: "15-25" | ">25" | "none";
    gender: "Male" | "Female" | "none";
    dateRange: { start: string; end: string } | {}; // ISO date strings
  };
  filtersData: {
    ageGroup: string[];
    gender: string[];
    date: {
      start: string;
      end: string;
    };
  };
}

const initialState: DatasetState = {
  barChart: {
    features: [],
    times: [],
  },
  lineChart: {
    times: [],
    values: [],
  },
  filtersApplied: {
    ageGroup: "none",
    gender: "none",
    dateRange: {},
  },
  filtersData: {
    ageGroup: [],
    gender: [],
    date: {
      start: "2022-10",
      end: "2022-10",
    },
  },
};

export const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setBarChart: (state, action) => {
      state.barChart.features = Object.keys(action.payload).map((key) =>
        key.toUpperCase()
      );
      state.barChart.times = Object.values(action.payload);
    },
    setLineChart: (state, action) => {
      state.lineChart.times = action.payload.times;
      state.lineChart.values = action.payload.values;
    },
    setFilterData: (state, action) => {
      state.filtersData = action.payload;
    },
    setFilters: (state, action) => {
      state.filtersApplied = action.payload;
    },
    setFilterAgeGroup: (state, action) => {
      state.filtersApplied.ageGroup = action.payload;
    },
    setFilterGender: (state, action) => {
      state.filtersApplied.gender = action.payload;
    },
    setFilterDateRange: (state, action) => {
      state.filtersApplied.dateRange = action.payload;
    },

  },
});

export const { setBarChart, setLineChart, setFilterData, setFilters, setFilterAgeGroup, setFilterDateRange, setFilterGender } =
  datasetSlice.actions;

export default datasetSlice.reducer;
