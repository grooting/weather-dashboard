import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIdx, setIdx } from './weatherDashboardSlice';

export function BottomNav() {
  const dispatch = useAppDispatch();
  const idx = useAppSelector(selectIdx);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={idx}
        onChange={(event, newValue) => {
          dispatch(setIdx(newValue));
        }}
      >
        <BottomNavigationAction label="Current" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}