import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import weatherDashboardReducer from '../features/weather-dashboard/weatherDashboardSlice';

export const store = configureStore({
  reducer: {
    weatherDashboard: weatherDashboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;