import { useState, useEffect } from 'react';
import {
  PersonOutline,
  ShoppingCartOutlined,
  MonetizationOnOutlined,
  AccountBalanceWalletOutlined,
} from '@mui/icons-material';

import './InfoBoard.css';

const InfoBoard = () => {
  const [businessInfo, setBusinessInfo] = useState();

  const fetchBusinessInfo = () => {
    fetch('http://localhost:5000/api/business-information')
      .then(res => res.json())
      .then(data => setBusinessInfo(data));
  };

  useEffect(() => {
    fetchBusinessInfo();
  }, []);

  return (
    <div className="infoBoard">
      <div className="boardItem">
        <div className="boardContent">
          <div>users</div>
          <div className="number">{businessInfo?.users}</div>
          <div>
            <PersonOutline className="boardUser icon" />
          </div>
        </div>
      </div>

      <div className="boardItem">
        <div className="boardContent">
          <div>orders</div>
          <div className="number">{businessInfo?.orders}</div>
          <div>
            <ShoppingCartOutlined className="boardOrder icon" />
          </div>
        </div>
      </div>

      <div className="boardItem">
        <div className="boardContent">
          <div>earnings</div>
          <div className="number">
            <span
              style={{
                fontSize: '22px',
                fontWeight: '300',
                marginRight: '4px',
              }}
            >
              $
            </span>
            {businessInfo?.earnings}
          </div>
          <div>
            <MonetizationOnOutlined className="boardEarning icon" />
          </div>
        </div>
      </div>

      <div className="boardItem">
        <div className="boardContent">
          <div>balance</div>
          <div className="number">
            <span
              style={{
                fontSize: '22px',
                fontWeight: '300',
                marginRight: '4px',
              }}
            >
              $
            </span>
            {businessInfo?.balance}
          </div>
          <div>
            <AccountBalanceWalletOutlined className="boardBlance icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
