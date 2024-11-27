import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { formInput } from './formInput';

import './FormRoom.scss';

const NewRooms = () => {
  const [enteredInput, setEnteredInput] = useState({
    title: '',
    desc: '',
    price: '',
    maxPeople: '',
    hotel: '',
  });
  const [datasHotel, setDatasHotel] = useState([]);
  const [inputEdit, setInputEdit] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleChange = e => {
    setEnteredInput(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/hotels/all')
      .then(res => res.json())
      .then(data => setDatasHotel(data));
  }, []);

  const handleChangeRoom = e => {
    const value = e.target.value
      .split(',')
      .map(number => ({ number: +number }));
    setRooms(value);
  };

  let formValid = false;

  // const emptyKeys = Object.keys(enteredInput).find(
  //   key => key !== 'hotel' && enteredInput[key] === ''
  // );
  const emptyKeys = Object.entries(enteredInput).find(
    ([key, value]) => key !== 'hotel' && value === ''
  );

  if (!emptyKeys) {
    formValid = true;
  }

  const handleSend = e => {
    e.preventDefault();
    setInputEdit(true);
    if (!formValid) {
      return;
    }
    const newRoom = {
      infoRoom: enteredInput,
      roomNumbers: rooms,
      isUsed: true,
    };

    fetch(`http://localhost:5000/api/rooms/new-room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRoom),
    })
      .then(response => {
        if (response.ok) {
          navigate('/room');
        } else {
          throw Error('Create room failure!');
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
          <h3>add new room</h3>
          <div className="formWrapper">
            <form>
              {formInput.map(item => {
                return (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
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
                  onChange={handleChangeRoom}
                  style={{ maxWidth: '200px' }}
                  placeholder="give comma between room numbers"
                ></textarea>
                {inputEdit && rooms.length === 0 && (
                  <span style={{ color: 'red' }}>
                    Please fill out this field!
                  </span>
                )}
              </div>
              <div className="formInput">
                <label>choose a hotel</label>
                <select id="hotel" onChange={handleChange}>
                  <option value={''}>------Select Hotel------</option>
                  {datasHotel.map(hotel => {
                    return (
                      <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btnSend" onClick={handleSend}>
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRooms;
