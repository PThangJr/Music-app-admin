import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import EnhancedTableBody from './components/EnhancedTableBody';
import EnhancedTableHead from './components/EnhancedTableHead';
import EnhancedTableToolbar from './components/EnhancedTableToolbar';

const TableData = ({ headCells = [], dataTable = [], onUpdate, onDelete, onCreate, data }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar onCreate={onCreate} />
        <TableContainer>
          <Table>
            <EnhancedTableHead headCells={headCells} />
            <EnhancedTableBody
              onUpdate={onUpdate}
              onDelete={onDelete}
              headCells={headCells}
              dataTable={dataTable}
              data={data}
            ></EnhancedTableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TableData;
