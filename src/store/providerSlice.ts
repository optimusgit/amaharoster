import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Provider {
  id: number;
  name: string;
  provider_usertype: string;
  is_inhouse: boolean;
  image: string;
  clinic_details: {
    id: number;
    name: string;
  };
  availabilities: any;
}

interface ProviderState {
  providers: Provider[];
  filtered: Provider[];
  search: string;
  filters: {
    type: string;
    service: string;
    center: string;
  };
}

const initialState: ProviderState = {
  providers: [],
  filtered: [],
  search: "",
  filters: {
    type: "",
    service: "",
    center: "",
  },
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProviders(state, action: PayloadAction<Provider[]>) {
      state.providers = action.payload;
      state.filtered = action.payload;
    },
    searchByName(state, action: PayloadAction<string>) {
      const searchtext = action.payload.toLowerCase();
      state.search = searchtext;
      state.filtered = state.providers.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchtext);
        const matchesType = state.filters.type
          ? p.provider_usertype === state.filters.type
          : true;

        return matchesName && matchesType;
      });
    },
    setTypeFilter(state, action: PayloadAction<string>) {
      state.filters.type = action.payload;

      const searchtext = state.search.toLowerCase();

      state.filtered = state.providers.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchtext);
        const matchesType = state.filters.type
          ? p.provider_usertype === state.filters.type
          : true;

        return matchesName && matchesType;
      });
    },
    setServiceFilter(state, action: PayloadAction<string>) {
      state.filters.service = action.payload;

      const searchtext = state.search.toLowerCase();

      state.filtered = state.providers.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchtext);
        const matchesType = state.filters.type
          ? p.provider_usertype === state.filters.type
          : true;

        return matchesName && matchesType;
      });
    },

    setCenterFilter(state, action: PayloadAction<string>) {
      state.filters.center = action.payload;

      const searchtext = state.search.toLowerCase();

      state.filtered = state.providers.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(searchtext);
        const matchesType = state.filters.type
          ? p.provider_usertype === state.filters.type
          : true;
        const matchesCenter = state.filters.center
          ? p.clinic_details.name === state.filters.center
          : true;

        return matchesName && matchesType && matchesCenter;
      });
    },
  },
});

export const {
  setProviders,
  searchByName,
  setTypeFilter,
  setServiceFilter,
  setCenterFilter,
} = providerSlice.actions;
export default providerSlice.reducer;
