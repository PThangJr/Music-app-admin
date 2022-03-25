import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

const EnhancedTableToolbar = ({ numberSelected = 0, onCreate, title = '' }) => {
  const handleCreate = () => {
    if (typeof onCreate === 'function') {
      onCreate();
    }
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numberSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numberSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numberSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      {numberSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Button onClick={handleCreate} variant="contained" startIcon={<AddBoxIcon />}>
        Create
      </Button>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
