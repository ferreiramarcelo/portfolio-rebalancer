import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

const About = () => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About Portfolio Rebalancer</h1>
      <h1 className={cx('header2')}>1. Purpose</h1>
      <p>
      Because the market is in constant flux, a portfolio's allocation may divert from its intended target allocation. Thus, occasional rebalancing is required to bring
      a portfolio back in line. This tool aims to simplify the rebalancing process as much as possible by providing model portfolio storage, real-time security prices,
      and automatic steps generation.
    </p>
      <h1 className={cx('header2')}>2. Usage</h1>
      <p>
      Because the market is in constant flux, a portfolio's allocation may divert from its intended target allocation. Thus, occasional rebalancing is required to bring
      a portfolio back in line. This tool aims to simplify the rebalancing process as much as possible by providing model portfolio storage, real-time security prices,
      and automatic steps generation.
    </p>
      <h1 className={cx('header2')}>3. Technologies used</h1>
      <p>
      Because the market is in constant flux, a portfolio's allocation may divert from its intended target allocation. Thus, occasional rebalancing is required to bring
      a portfolio back in line. This tool aims to simplify the rebalancing process as much as possible by providing model portfolio storage, real-time security prices,
      and automatic steps generation.
    </p>
      <h1 className={cx('header2')}>4. Contact</h1>
      <p>
      Because the market is in constant flux, a portfolio's allocation may divert from its intended target allocation. Thus, occasional rebalancing is required to bring
      a portfolio back in line. This tool aims to simplify the rebalancing process as much as possible by providing model portfolio storage, real-time security prices,
      and automatic steps generation.
    </p>
    </div>
  );
};

export default About;
