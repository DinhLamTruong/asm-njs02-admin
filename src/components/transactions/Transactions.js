import React from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import './Transactions.css';

const Transactions = ({ heading, dataTransaction }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'user',
      headerName: 'User',
      width: 100,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Hotel',
      width: 200,
      editable: true,
    },
    {
      field: 'room',
      headerName: 'Room',
      width: 110,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'Date',
      width: 180,
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Price',
      type: 'Number',
      width: 80,
      editable: true,
    },
    {
      field: 'payment',
      headerName: 'Payment Method',
      width: 100,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: params => {
        return (
          <div className="cellAction">
            <button className={`statusBtn ${params.row.status}`}>
              {params.row.status}
            </button>
          </div>
        );
      },
    },
  ];

  const rows = dataTransaction?.map(item => {
    const price = `$${item.price}`;
    const formattedDateStart = format(new Date(item.dateStart), 'dd/MM/yyyy');
    const formattedDateEnd = format(new Date(item.dateEnd), 'dd/MM/yyyy');

    return {
      id: item._id,
      total: price,
      date: `${formattedDateStart} - ${formattedDateEnd}`,
      ...item,
    };
  });

  return (
    <div className="transaction">
      <div className="transactionContent">
        <h3>{heading}</h3>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            className="datagrid"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={row => row.id}
            getRowStatus={row => row.Status}
          />
        </Box>
      </div>
    </div>
  );
};

export default Transactions;
