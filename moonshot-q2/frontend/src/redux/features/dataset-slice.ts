import { createSlice } from "@reduxjs/toolkit";

interface DatasetState {
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
    }

  },
});

export const { setBarChart, setLineChart, setFilterData, setFilters } =
  datasetSlice.actions;

export default datasetSlice.reducer;
