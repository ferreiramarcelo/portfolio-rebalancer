import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ModelPortfolioNameTextField from './ModelPortfolioNameTextField';
import PortfolioTable from './portfoliotable/PortfolioTable';
import AddSecurityButton from './AddSecurityButton';

import classNames from 'classnames/bind';
import styles from '../../css/components/portfolio-table/portfolio-table';

const cx = classNames.bind(styles);

const Portfolio = ({portfolioSelect, selectedModelPortfolio, selectedModelPortfolioTextFieldChange, portfolio, removeSecurity, securityTextFieldChange, addSecurity, saveModelPortfolio, deleteModelPortfolio}) => {
  return (
    <Card className={cx('Card')}>
      <div className={cx('PortfolioDiv')}>
        <br />
        <ModelPortfolioNameTextField
                                   selectedModelPortfolio={selectedModelPortfolio}
                                   selectedModelPortfolioTextFieldChange={selectedModelPortfolioTextFieldChange} />
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
  portfolioSelect: PropTypes.object.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired,
  selectedModelPortfolioTextFieldChange: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
  removeSecurity: PropTypes.object.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  addSecurity: PropTypes.func.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired
};

export default Portfolio;
