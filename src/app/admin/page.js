import React from 'react'
import LoginPage from './components/adminLogin'
import Sidebar from './components/sidebar'
import Card from './components/card';
import TransactionTable from './components/transactionTable';
import AdminNavBar from './components/adminNavBar';


export default function page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white">
        <AdminNavBar/>
        <div className="p-8">
          {/* Cards Section */}
          <Card/>
          {/* Transactions Table */}
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}
