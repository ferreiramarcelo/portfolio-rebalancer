import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import classNames from 'classnames/bind';
import ModelPortfolioNameTextField from './ModelPortfolioNameTextField';
import PortfolioTable from './portfoliotable/PortfolioTable';
import AddSecurityButton from './AddSecurityButton';
import styles from '../../css/components/portfolio/portfolio';

const cx = classNames.bind(styles);

const Portfolio = ({selectedModelPortfolio, modelPortfolioNameTextFieldChange, portfolio, portfolioSelect, saveModelPortfolio, deleteModelPortfolio, addSecurity, removeSecurity, securityTextFieldChange, fetchPrice, currencies}) => {
  return (
    <Paper className={cx('paper')}>
      <div className={cx('portfolio-container')}>
        <ModelPortfolioNameTextField value={selectedModelPortfolio.name} errorText={portfolioSelect.selectedModelPortfolioSelect.errorText} onChange={modelPortfolioNameTextFieldChange} />
        <PortfolioTable
selectedModelPortfolio={selectedModelPortfolio} portfolio={portfolio} portfolioSelect={portfolioSelect} saveModelPortfolio={saveModelPortfolio}
          deleteModelPortfolio={deleteModelPortfolio} addSecurity={addSecurity} removeSecurity={removeSecurity} securityTextFieldChange={securityTextFieldChange}
          fetchPrice={fetchPrice} currencies={currencies} />
        <div className={cx('add-security-container')}>
          <AddSecurityButton addSecurity={addSecurity} />
        </div>
      </div>
    </Paper>
    );
};

Portfolio.propTypes = {
  selectedModelPortfolio: PropTypes.object.isRequired,
  modelPortfolioNameTextFieldChange: PropTypes.func.isRequired,
  portfolio: PropTypes.array.isRequired,
  portfolioSelect: PropTypes.object.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
  addSecurity: PropTypes.func.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  fetchPrice: PropTypes.func.isRequired
};

export default Portfolio;
