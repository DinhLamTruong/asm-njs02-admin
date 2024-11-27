import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import NewHotel from './pages/newHotel/NewHotel';
import UpdateHotel from './pages/newHotel/UpdateHotel';
import Room from './pages/room/Room';
import NewRooms from './pages/newRoom/NewRooms';
import UpdateRoom from './pages/newRoom/UpdateRoom';
import Transactions from './pages/transactions/Transactions';
import Login from './pages/login/Login';

import './App.css';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hotel"
            element={
              <ProtectedRoute>
                <Hotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newhotel"
            element={
              <ProtectedRoute>
                <NewHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotel/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateHotel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newroom"
            element={
              <ProtectedRoute>
                <NewRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
