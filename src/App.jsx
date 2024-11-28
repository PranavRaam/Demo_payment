import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';
import PaymentStatus from './components/PaymentStatus';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaymentForm />} />
                <Route path="/callback" element={<PaymentStatus />} />
            </Routes>
        </Router>
    );
};

export default App;
