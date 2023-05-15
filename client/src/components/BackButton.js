import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; 

const BackButton = () => {
  let navigate = useNavigate();

  return (
    <button className="backButton" onClick={() => navigate(-1)}>Back</button>
  );
};

export default BackButton;
