import React from 'react';
import '../../../style/App.css';
import { Footer } from '../layouts/Footer';
import { Header } from '../layouts/Header';
import { Features } from '../layouts/Features';
import { Languages } from '../layouts/Languages';

export const WelcomePage = () => {
  return (
    <div className='welcome'>
      <Header />
      <Features />
      <Languages />
      <Footer />
    </div>
  );
};
