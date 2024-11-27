import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { formInput } from './formInput';

import './FormRoom.scss';

const UpdateRoom = () => {
  const { id } = useParams();
  const [enteredInput, setEnteredInput] = useState('');
  const [inputEdit, setInputEdit] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/rooms/find/${id}`)
      .then(res => res.json())
      .then(data => {
        setRooms(data.roomNumbers.map(obj => String(obj.number)));
        setEnteredInput(data);
      });
  }, [id]);

  const handleChange = e => {
    setEnteredInput(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeRoom = e => {
    // arr value room update [100,102,103,104]
    const value = e.target.value.split(',');
    setRooms(value);
  };

  let formValid = false;

  const emptyKeys = Object.keys(enteredInput).find(
    key => enteredInput[key] === ''
  );

  if (!emptyKeys) {
    formValid = true;
  }

  const handleUpdate = e => {
    e.preventDefault();
    setInputEdit(true);
    if (!formValid) {
      return;
    }

    const newRoom = rooms.map(num => ({ number: +num }));

    const updateRoom = {
      infoRoom: {
        ...enteredInput,
        roomNumbers: newRoom,
      },
    };

    fetch(`http://localhost:5000/api/rooms/updateroom`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRoom),
    })
      .then(response => {
        if (response.ok) {
          navigate('/room');
        } else {
          throw Error('Update room failure!');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="newRoom">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="roomContainer">
          <h3>update room</h3>
          <div className="formWrapper">
            <form>
              {formInput.map(item => {
                return (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
                      value={enteredInput[item.id] ?? ''}
                      type={item.type}
                      onChange={handleChange}
                      placeholder={item.placeholder}
                    />
                    {inputEdit && enteredInput[item.id] === '' && (
                      <span style={{ color: 'red' }}>
                        {[item.id]} must not be empty!
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="formInput">
                <label>rooms</label>
                <textarea
                  id="roomNumbers"
                  onChange={handleChangeRoom}
                  style={{ maxWidth: '200px' }}
                  value={rooms.join(',') ?? ''}
                  placeholder="give comma between room numbers"
                ></textarea>
                {inputEdit && rooms.length === 0 && (
                  <span style={{ color: 'red' }}>
                    Please fill out this field!
                  </span>
                )}
              </div>
              <button className="btnSend" onClick={handleUpdate}>
                update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
