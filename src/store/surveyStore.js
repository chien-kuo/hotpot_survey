import { create } from 'zustand';

export const useSurveyStore = create((set) => ({
  dataList: [],
  setDataList: (dataList) => set({ dataList }),
  loading: true,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));
