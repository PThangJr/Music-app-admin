import { Checkbox, ImageListItem, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const EnhancedTableBody = (props) => {
  const { data = [], headCells = [], dataTable = [] } = props;
  const handleUpdate = (item) => {
    if (props.onUpdate) {
      props.onUpdate(item);
    }
  };
  const handleDelete = (item) => {
    if (props.onDelete) {
      props.onDelete(item);
    }
  };
  return (
    <TableBody>
      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
   rows.slice().sort(getComparator(order, orderBy)) */}
      {/* {stableSort(rows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
      {dataTable.map((row, index) => {
        // const isItemSelected = isSelected(row.name);
        const labelId = `enhanced-table-checkbox-${index}`;
        const fullData = data.find((item) => item?._id === row.id);
        // console.log(row[headCells[4].id]());
        return (
          <TableRow
            hover
            role="checkbox"
            // aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id || index}
            // selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                // checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
                // onClick={(event) => handleClick(event, row.name)}
              />
            </TableCell>
            {/* <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              // onClick={(event) => handleClick(event, row.name)}
            >
              {row.id}
            </TableCell> */}
            {Object.keys(row).map((rowItem, indexRowItem) => {
              return (
                <TableCell
                  key={`tablecell-${rowItem}`}
                  align="left"
                  sx={{
                    minWidth: '200px',
                    maxWidth: '450px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  {typeof row[headCells[indexRowItem].id] === 'function'
                    ? row[headCells[indexRowItem].id]()
                    : row[headCells[indexRowItem].id]}
                </TableCell>
              );
            })}
            {/* <TableCell
              align="left"
              sx={{ width: '100px', borderRadius: '10px', overflow: 'hidden' }}
            >
              <ImageListItem>
                {typeof row[headCells[1].id] === 'function' ? (
                  row[headCells[1].id]()
                ) : (
                  <img src={row[headCells[1].id] || ''} alt="" />
                )}
              </ImageListItem>
            </TableCell> */}

            {/* <TableCell align="left">
              {typeof row[headCells[2].id] === 'function'
                ? row[headCells[2].id]()
                : row[headCells[2].id]}
            </TableCell>
            <TableCell align="left">
              {typeof row[headCells[3].id] === 'function'
                ? row[headCells[3].id]()
                : row[headCells[3].id]}
            </TableCell>
            <TableCell align="left">
              {typeof row[headCells[4].id] === 'function'
                ? row[headCells[4].id]()
                : row[headCells[4].id]}
            </TableCell> */}
            <TableCell align="left" sx={{ minWidth: '150px' }}>
              <SettingsIcon sx={{ marginRight: '10px' }} onClick={() => handleUpdate(fullData)} />
              <DeleteIcon sx={{ marginRight: '10px' }} onClick={() => handleDelete(fullData)} />
              <InfoIcon />
            </TableCell>
          </TableRow>
        );
      })}
      {/* {emptyRows > 0 && (
    <TableRow
      style={{
        height: (dense ? 33 : 53) * emptyRows,
      }}
    >
      <TableCell colSpan={6} />
    </TableRow>
  )} */}
    </TableBody>
  );
};

export default EnhancedTableBody;
