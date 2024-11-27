import { useState, useEffect } from 'react';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Transaction from '../../components/transactions/Transactions';

import './Transaction.scss';

function Transactions() {
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => setTransaction(data));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ width: '84%', padding: '10px 14px' }}>
          <Transaction
            heading="Transactions List"
            dataTransaction={transaction}
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
