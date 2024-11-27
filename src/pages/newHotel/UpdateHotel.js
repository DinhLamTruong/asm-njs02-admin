import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { formInput } from './formInput';

import './formHotel.scss';

const UpdateHotel = () => {
  const { id } = useParams();
  const [enteredInput, setEnteredInput] = useState('');
  const [images, setImages] = useState([]);
  const [inputEdit, setInputEdit] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [existingRooms, setExistingRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/hotels/find/${id}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.photos);
        setEnteredInput(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/rooms/list-room-hotel/${id}`)
      .then(res => res.json())
      .then(data => {
        setExistingRooms(data.listRoomOfHotel);
        setListRoom(data.availableRooms);
      });
  }, [id]);

  const handleChange = e => {
    setEnteredInput(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeImage = e => {
    const value = e.target.value.trim().split('\n\n');
    setImages(value);
  };

  const handleSelect = e => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setEnteredInput(prev => ({ ...prev, [e.target.id]: value }));
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

    const updateHotel = {
      infoHotel: {
        ...enteredInput,
        photos: images,
      },
    };

    fetch(`http://localhost:5000/api/hotels/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateHotel),
    })
      .then(response => {
        if (response.ok) {
          navigate('/hotel');
        } else {
          throw Error('Update hotel failure!');
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
          <h3>Update hotel</h3>
          <div className="formWrapper">
            <form>
              {formInput.map(item => {
                return (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
                      value={enteredInput[item.id] ?? ''}
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
                  id="photos"
                  className="fileUpdate"
                  onChange={handleChangeImage}
                  value={images?.join('\n\n') ?? ''}
                  placeholder="Link images"
                ></textarea>
                {inputEdit && images[0] === '' && (
                  <span style={{ color: 'red' }}>
                    Please fill out this field!
                  </span>
                )}
              </div>
              <div className="formInput">
                <label>featured</label>
                <select value={enteredInput?.featured}>
                  <option value={false}>no</option>
                  <option value={true}>yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label htmlFor="rooms">rooms</label>
                <select
                  id="rooms"
                  multiple
                  name="rooms"
                  size="5"
                  onChange={handleSelect}
                  value={enteredInput.rooms}
                >
                  {/* Render các phòng hiện có */}
                  {existingRooms.length > 0 &&
                    existingRooms.map(room => (
                      <option key={room._id} value={room._id} disabled>
                        {room.title}
                      </option>
                    ))}

                  {/* Render các phòng mới có thể thêm */}
                  {listRoom.map(room => {
                    return (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btnSend" onClick={handleUpdate}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHotel;
