import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import './Room.scss';

const Room = () => {
  const navigate = useNavigate();
  const [infoRoom, setInfoRoom] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/rooms/all-room')
      .then(res => res.json())
      .then(data => {
        setInfoRoom(data);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'title',
      headerName: 'Title',
      width: 220,
      editable: true,
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: 340,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 60,
      editable: true,
    },
    {
      field: 'maxPeople',
      headerName: 'Max People',
      width: 100,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: params => {
        return (
          <div>
            <button
              className="buttonDelete"
              onClick={() => handleClickDelete(params)}
            >
              Delete
            </button>
            <button
              className="buttonDelete"
              onClick={() => handleClickEdit(params)}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];
  const rows = infoRoom.map(item => {
    return {
      id: item._id,
      ...item,
    };
  });

  const handleClickDelete = params => {
    const confirm = window.confirm('Do you delete rooms?');
    if (!confirm) return;
    const roomDelete = infoRoom.find(item => item._id === params.id);
    const isReservations = roomDelete.roomNumbers.some(
      item => item.unavailableDates.length > 0
    );
    if (isReservations) return alert('Room is being booked!');

    fetch(`http://localhost:5000/api/rooms/delete-room/${params.row.hotel}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: params.id }),
    })
      .then(response => {
        if (response.ok) {
          setInfoRoom(infoRoom.filter(item => item._id !== params.id));
        } else {
          throw Error('Delete room failure!');
        }
      })
      .catch(err => console.log(err));
  };

  const handleClickEdit = params => {
    navigate(`/room/edit/${params.row.id}`);
  };

  const handleAddRoom = () => {
    navigate('/newroom');
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
            <h3>rooms List</h3>
            <button onClick={handleAddRoom}>Add new</button>
          </div>
          <Box sx={{ height: 400, width: '100%', padding: '10px 20px' }}>
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
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Room;
