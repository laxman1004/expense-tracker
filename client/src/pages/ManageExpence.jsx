import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const ManageExpense = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchExpense = async () => {
        try {
          const { data } = await API.get(`/expenses/${id}`);
          setFormData({
            ...data,
            date: data.date.split('T')[0],
          });
        } catch (err) {
          setError('Failed to fetch expense details');
        }
      };
      fetchExpense();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        await API.put(`/expenses/${id}`, formData);
      } else {
        await API.post('/expenses', formData);
      }
      navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
      <h2>{isEditMode ? 'Edit Expense' : 'Add Expense'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Category</label>
          <input type="text" name="category" placeholder="e.g., Food, Transport, Lifestyle" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Payment Method</label>
          <input type="text" name="paymentMethod" placeholder="e.g., Credit Card, UPI, Cash" value={formData.paymentMethod} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Saving...' : 'Save Expense'}
        </button>
      </form>
    </div>
  );
};

export default ManageExpense;
