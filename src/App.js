import React, { useEffect, useState } from 'react';
import { CustomerForm } from './components/CustomerForm';
import { Table } from './components/Table';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    document.title = "Klick App"
  }, [])
  return (
    <div>
      <CustomerForm users={users} setUsers={setUsers} />
      <Table users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;