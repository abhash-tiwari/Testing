import React, { useState } from 'react';
import './PlanPricing.css';
import { plans } from '../../data/planPricingData';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

const PlanOption = ({ title, price, duration, features, isSelected, onSelect }) => (
  <div className={`plan-option ${isSelected ? 'selected' : ''}`}>
    <h3>{title}</h3>
    <p className="price">₹{price}</p>
    <p className="duration">{duration}</p>
    <button onClick={onSelect}>
      {isSelected ? 'Selected' : 'Select'}
    </button>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>
          <span className="check-icon">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

const SignupModal = ({ onClose, prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setMessage('Please accept the terms and conditions.');
      return;
    }

    const templateParams = {
      email,
      message: 'Thank you for your interest!',
    };

    emailjs.send('service_1ca8g0m', 'template_cvo8y6i', templateParams, 'uN3lMUILysdLVn5BA')
      .then((response) => {
        setMessage('Thank you for your interest');
        setTimeout(() => {
          onClose();
        }, 2000);
      }, (error) => {
        setMessage('An error occurred, please try again.');
      });
  };

  const transition = { type: 'spring', duration: 3 };

  return (
    <div className="modal-overlay">
      <motion.div className="modal-content" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}>
        <div className="modal-header">
          <h2>Get Started</h2>
          <button onClick={onClose} className='btn'>X</button>
        </div>
        <form onSubmit={sendEmail}>
          <p>Enter Your Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <label htmlFor="terms">I agree to Terms & Conditions</label>
          </div>
          <button className="continue-button" type="submit">
            Continue
          </button>
          {message && <p>{message}</p>}
        </form>
      </motion.div>
    </div>
  );
};

const PlanPricing = () => {
  const { user, isAuthenticated } = useAuth0();
  const [selectedPlan, setSelectedPlan] = useState('PREMIUM');
  const [showModal, setShowModal] = useState(false);

  const prefilledEmail = isAuthenticated ? user.email : '';

  return (
    <div className="pcontainer">
        <div className='pp-heading'>
        <hr className='hr-p'/>
      <h1>Select Your Plan</h1>
      <hr className='hr-p'/>
        </div>
      <motion.div className="freak-plan-pricing" initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2, ease: 'easeInOut' }}>
       
      <div className="plan-options">
        {plans.map((plan, index) => (
          <PlanOption
            key={index}
            {...plan}
            isSelected={selectedPlan === plan.title.toUpperCase()}
            onSelect={() => setSelectedPlan(plan.title.toUpperCase())}
          />
        ))}
      </div>
      <div className="selected-plan">
        <h2>Selected Plan: {selectedPlan}</h2>
        <button
          className="proceed-button"
          onClick={() => setShowModal(true)}
        >
          Proceed
        </button>
      </div>
      {showModal && <SignupModal onClose={() => setShowModal(false)} prefilledEmail={prefilledEmail} />}
    </motion.div>
    </div>
    
  );
};

export default PlanPricing;
