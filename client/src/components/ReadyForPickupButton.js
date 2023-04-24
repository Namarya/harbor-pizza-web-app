import React from 'react';
import { useDispatch } from 'react-redux';
import { markOrderAsReady } from '../actions/orderActions';

const ReadyForPickupButton = ({ orderId }) => {
  const dispatch = useDispatch();

  const handleMarkOrderAsReady = () => {
    dispatch(markOrderAsReady(orderId));
  };

  return (
    <button className='btn' onClick={handleMarkOrderAsReady}>
      Mark ready for pickup
    </button>
  );
};

export default ReadyForPickupButton;
