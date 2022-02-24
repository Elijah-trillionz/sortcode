import React from 'react';
import system from '../../../assets/imgs/system.jpeg';
import pc from '../../../assets/imgs/pc.jpeg';
import laptop from '../../../assets/imgs/laptop.jpeg';

export const Features = () => {
  return (
    <div className='feature-container'>
      <section>
        <div className='image'>
          <img src={system} alt='' />
        </div>
        <div className='about'>
          <h2>Coding Tasks</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
            aliquam minus, voluptatem quia placeat nesciunt? Blanditiis pariatur
            qui itaque ab quaerat magni sed eum reprehenderit.
          </p>
          <a href='/signup' className='action diff'>
            Get Started
          </a>
        </div>
      </section>
      <section>
        <div className='image'>
          <img src={laptop} alt='' />
        </div>
        <div className='about'>
          <h2>Coding Quiz</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam est
            vero neque temporibus dolore. Harum, reprehenderit eligendi
            repudiandae voluptatem fuga omnis laboriosam! Corporis, temporibus
            quisquam.
          </p>
          <a href='/signup' className='action diff'>
            Get Started
          </a>
        </div>
      </section>
      <section>
        <div className='image'>
          <img src={pc} alt='' />
        </div>
        <div className='about'>
          <h2>See Other's Solution</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
            aliquam minus, voluptatem quia placeat nesciunt? Blanditiis pariatur
            qui itaque ab quaerat magni sed eum reprehenderit.
          </p>
          <a href='/signup' className='action diff'>
            Get Started
          </a>
        </div>
      </section>
      <section>
        <div className='image'>
          <img src={system} alt='' />
        </div>
        <div className='about'>
          <h2>Leaderboard</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
            aliquam minus, voluptatem quia placeat nesciunt? Blanditiis pariatur
            qui itaque ab quaerat magni sed eum reprehenderit.
          </p>
          <a href='/signup' className='action diff'>
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};
