import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList';
import ManageExpense from './pages/ManageExpense';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes with React Router */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
        <Route path="/expenses/add" element={<ProtectedRoute><ManageExpense /></ProtectedRoute>} />
        <Route path="/expenses/:id/edit" element={<ProtectedRoute><ManageExpense /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
