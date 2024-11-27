import { useEffect, useState } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import InfoBoard from '../../components/infoBoard/InfoBoard';
import Transactions from '../../components/transactions/Transactions';

import './Home.scss';

function App() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/transactions/recent')
      .then(res => res.json())
      .then(data => setTransaction(data));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ width: '84%', padding: '0 14px' }}>
          <InfoBoard />
          <Transactions
            heading="Latest Transactions"
            dataTransaction={transaction.slice(-8)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
