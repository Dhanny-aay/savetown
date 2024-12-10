import React from 'react'
import LoginPage from './components/adminLogin'
import Card from './components/card';
import TransactionTable from './components/transactionTable';


export default function page() {
  return (
        <div>
          {/* Cards Section */}
          <Card/>
          {/* Transactions Table */}
          <TransactionTable />
        </div>
  );
}
