import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Support = () => {
  return (
    <div className='support-page task'>
      <Helmet>
        <title>Your donation keeps us going</title>
      </Helmet>
      <div className='task'>
        <h2>Support SortCode</h2>
        <p>
          We appreciate you reaching out to see how you can support Sultan Dev
        </p>
        <a href='blog.com'>See why we need contributions</a>
      </div>

      <section>
        <p>You can support us through any of the below options</p>

        <ul>
          <li>
            <b>Patreon</b>
            <a href='example.com'>Become a patron</a>
          </li>
          <li>
            <b>Paypal</b>
            <a href='paypal.com'>Send contributions via paypal</a>
          </li>
          <li>
            <b>BitCoin</b>
            <p>Our BitCoin wallet</p>
            <code>3EcfU5XAfmkvMbz4S4jhpr37BszFgH5pG2</code>
          </li>
        </ul>
      </section>

      <p>
        Whatever medium you use to make a contribution, please do let us know
        via our <a href='twitter.com'>Twitter Handle</a>, so we can personally
        appreciate and recognise you.
      </p>
      <h3>Thanks in advance</h3>
    </div>
  );
};
