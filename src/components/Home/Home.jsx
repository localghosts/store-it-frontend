import React from 'react';
import './Home.css';
import Catalog from './Catalog/Catalog';

function Home() {
  return (
    <div className="content">
      <div className="catalogArea">
        <Catalog />
      </div>
    </div>
  );
}

export default Home;
