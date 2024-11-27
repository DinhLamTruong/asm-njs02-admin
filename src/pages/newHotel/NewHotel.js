import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formInput } from './formInput';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import './formHotel.scss';

const NewHotel = () => {
  const [enteredInput, setEnteredInput] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    price: '',
    title: '',
    featured: 'false',
  });
  const [rooms, setRooms] = useState([]);
  const [inputEdit, setInputEdit] = useState(false);
  const [datasRoom, setDatasRoom] = useState([]);
  const [images, setImages] = useState([]);
  const [availableRooms, setAvailableRooms] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms/list-room')
      .then(res => res.json())
      .then(data => {
        setAvailableRooms(data.message);
        setDatasRoom(data);
      });
  }, []);

  const handleChange = e => {
    setEnteredInput(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleChangeImage = e => {
    const value = e.target.value.trim().split('\n\n');
    setImages(value);
  };
  const handleSelect = e => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setRooms(value);
  };

  let formValid = false;

  const emptyKeys = Object.keys(enteredInput).find(
    key => enteredInput[key] === ''
  );

  if (!emptyKeys && rooms.length > 0 && images.length > 0) {
    formValid = true;
  }

  const handleSend = e => {
    e.preventDefault();
    setInputEdit(true);

    if (!formValid) {
      return;
    }

    const newHotel = {
      infoHotel: {
        ...enteredInput,
        cheapestPrice: enteredInput.price,
        photos: images,
        rooms,
      },
    };

    fetch(`http://localhost:5000/api/hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHotel),
    })
      .then(response => {
        if (response.ok) {
          navigate('/hotel');
        } else {
          throw Error('Create hotel failure!');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="newHotel">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="newHotelContainer">
          <h3>add new product</h3>
          <div className="formWrapper">
            <form>
              {formInput.map(item => {
                return (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
                      onChange={handleChange}
                      type={item.type}
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
                <label>images</label>
                <textarea
                  id="file"
                  onChange={handleChangeImage}
                  placeholder="Please end a link with 2 enter."
                ></textarea>
                {inputEdit && images.length === 0 && (
                  <span style={{ color: 'red' }}>
                    Please fill out this field!
                  </span>
                )}
              </div>
              <div className="formInput">
                <label>featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>no</option>
                  <option value={true}>yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label htmlFor="rooms">
                  rooms{' '}
                  {<span style={{ color: 'red' }}>{availableRooms}</span> || ''}
                </label>
                <select
                  multiple
                  id="rooms"
                  name="rooms"
                  size="5"
                  onChange={handleSelect}
                >
                  {datasRoom.length > 0 &&
                    datasRoom.map(room => {
                      return (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      );
                    })}
                </select>
                {inputEdit && rooms.length === 0 && (
                  <span style={{ color: 'red' }}>Please select a room!</span>
                )}
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

export default NewHotel;
