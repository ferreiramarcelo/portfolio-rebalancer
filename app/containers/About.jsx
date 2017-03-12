import React from 'react';
import Paper from 'material-ui/Paper';
import classNames from 'classnames/bind';
import styles from 'css/containers/about';

const cx = classNames.bind( styles );

const About = () => {
  return (
  <Paper className={ cx( 'paper' ) }>
    <div className={ cx( 'paper-insides' ) }>
    <h1 className={ cx( 'sub-heading' ) }>1. Purpose</h1>
    <p>
      Because the market is in constant flux, a portfolio's allocation may divert from its intended target allocation. Thus, occasional rebalancing is required to bring
      a portfolio back in line. This tool aims to simplify the rebalancing process as much as possible by providing model portfolio storage, real-time security prices,
      and automatic steps generation.
      <br /> This web app is also useful for knowing the exact number of units you need to buy or sell whenever you want to invest or take out money from your portfolio.
    </p>
    <h1 className={ cx( 'sub-heading' ) }>2. Usage</h1>
    <p>
      First, recreate your model portfolio either by using one of the default model portfolios available, or by starting from scratch. For each security, enter the symbol
      and the target allocation in the first two columns. If your allocations do not add up to 100, they will be normalized.
      <br /> Prices will automatically be fetched from <a href="https://finance.yahoo.com/">finance.yahoo.com</a> based on the symbols provided. Be sure to account for different
      exchanges, e.g. "Vanguard FTSE Global All Cap ex Canada Index ETF" has the symbol "VXC.TO" on Yahoo Finance. Then, enter the number of units you currently have
      of each security in the last column.
    </p>
    <p>
      Finally, enter how much cash you wish to invest or take out and press the "Generate Steps" button. A list of steps for rebalancing your portfolio will be generated.
      <br /> You can register to gain the ability to save model portfolios. Only model portfolio names, symbols, and allocations are saved. You can verify this from the&nbsp;
      <a href="https://github.com/AlexisDeschamps/portfolio-rebalancer">source code</a>.
    </p>
    <h1 className={ cx( 'sub-heading' ) }>3. Source code</h1>
    <p>
      You can view the source code here: <a href="https://github.com/AlexisDeschamps/portfolio-rebalancer">https://github.com/AlexisDeschamps/portfolio-rebalancer</a>.
    </p>
    <h1 className={ cx( 'sub-heading' ) }>4. Contact</h1>
    <p>
      Contact the author, Alexis Deschamps, at <a
                                                  href="mailto:descalexis@gmail.com"
                                                  target="_top">descalexis@gmail.com</a> with any feedback or questions.
    </p>
  </div>
  </Paper>
  );
};

export default About;
