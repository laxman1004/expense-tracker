import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Dashboard.css'; // Importing the separate CSS file

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await API.get('/expenses');
        setExpenses(data);
      } catch (err) {
        setError('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalRecords = expenses.length;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <p className="loading-state">Loading summary...</p>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-brand">Expense Tracker</h3>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/expenses" className="nav-link">Expenses</Link></li>
            <li><Link to="/expenses/add" className="nav-link">Add Expense</Link></li>
            <li className="logout-item">
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>Dashboard Overview</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Expenses</h4>
            <h2 className="amount-highlight">₹ {totalAmount.toLocaleString()}</h2>
          </div>
          <div className="stat-card">
            <h4>Total Records</h4>
            <h2>{totalRecords}</h2>
          </div>
        </div>

        <h3>Recent Expenses</h3>
        <ul className="expense-list">
          {expenses.slice(0, 5).map((exp) => (
            <li key={exp._id} className="expense-item">
              <span><strong>{exp.title}</strong> <span className="category-tag">({exp.category})</span></span>
              <span className="expense-amount">₹ {exp.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;

