import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NonExistingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login');
  });
  return (
    <main style={{
      padding: '1rem', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <p>
        Oops!!! No such page found!
      </p>
    </main>
  );
}

export default NonExistingPage;
