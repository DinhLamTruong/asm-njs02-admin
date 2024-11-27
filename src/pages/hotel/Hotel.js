import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import './Hotel.scss';

const Hotel = () => {
  const navigate = useNavigate();
  const [datasHotel, setDatasHotel] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/hotels/all')
      .then(res => res.json())
      .then(data => setDatasHotel(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => setTransaction(data));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 160 },
    {
      field: 'name',
      headerName: 'Name',
      width: 240,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 80,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 240,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 110,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <>
            <button
              className="buttonDelete"
              onClick={() => handleClickDelete(params)}
            >
              Delete
            </button>
            <button className="buttonEdit" onClick={() => handleEdit(params)}>
              Edit
            </button>
          </>
        );
      },
    },
  ];

  const rows = datasHotel.map(item => {
    return {
      id: item._id,
      ...item,
    };
  });
  const handleClickDelete = params => {
    const confirm = window.confirm('Do you delete hotel?');
    if (!confirm) return;

    const hasTransaction = transaction.some(
      item => item.hotel._id === params.row.id
    );
    if (hasTransaction) return alert('The hotel currently has a transaction!');

    fetch(`http://localhost:5000/api/hotels/${params.row.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDatasHotel(
            datasHotel.filter(Hotel => Hotel._id !== params.row.id)
          );
        } else {
          throw Error('Delete hotel failure!');
        }
      })
      .catch(err => console.log(err));
  };
  const handleEdit = params => {
    navigate(`/hotel/edit/${params.row.id}`);
  };

  const handleAddHotel = () => {
    navigate('/newhotel');
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ width: '84%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 20px 0 20px',
            }}
          >
            <h3>Hotels List</h3>
            <button onClick={handleAddHotel}>Add new</button>
          </div>
          <Box sx={{ height: 400, width: '100%', padding: '10px 20px' }}>
            <DataGrid
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
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
