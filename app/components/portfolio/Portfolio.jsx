import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import classNames from 'classnames/bind';
import ModelPortfolioNameTextField from './ModelPortfolioNameTextField';
import PortfolioTable from './portfoliotable/PortfolioTable';
import AddSecurityButton from './AddSecurityButton';
import styles from '../../css/components/portfolio/portfolio';

const cx = classNames.bind(styles);

const Portfolio = ({selectedModelPortfolio, modelPortfolioNameTextFieldChange, portfolio, portfolioSelect, saveModelPortfolio, deleteModelPortfolio, addSecurity, removeSecurity, securityTextFieldChange}) => {
  return (
    <Card className={cx('card')}>
      <div className={cx('portfolio-container')}>
        <ModelPortfolioNameTextField
                                   value={selectedModelPortfolio.name}
                                   errorText={portfolioSelect.selectedModelPortfolioSelect.errorText}
                                   onChange={modelPortfolioNameTextFieldChange} />
        <PortfolioTable
                      portfolioSelect={portfolioSelect}
                      portfolio={portfolio}
                      addSecurity={addSecurity}
                      removeSecurity={removeSecurity}
                      securityTextFieldChange={securityTextFieldChange}
                      saveModelPortfolio={saveModelPortfolio}
                      deleteModelPortfolio={deleteModelPortfolio}
                      selectedModelPortfolio={selectedModelPortfolio} />
        <div style={{ textAlign: 'center', margin: '24px' }}>
          <AddSecurityButton addSecurity={addSecurity} />
        </div>
      </div>
    </Card>
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
  securityTextFieldChange: PropTypes.func.isRequired
};

export default Portfolio;
