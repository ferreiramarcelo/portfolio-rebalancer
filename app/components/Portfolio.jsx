import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ModelPortfolioNameTextField from '../components/ModelPortfolioNameTextField';
import SaveModelPortfolioButton from '../components/SaveModelPortfolioButton';
import DeleteModelPortfolioButton from '../components/DeleteModelPortfolioButton';
import PortfolioTableImmutable from '../components/PortfolioTableImmutable';
import AddSecurityButton from '../components/AddSecurityButton';

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/portfolio-table';

const cx = classNames.bind(styles);

const Portfolio = ({modelPortfolioName, modelPortfolioNameTextFieldChange, portfolio, removeSecurity, securityTextFieldChange,
						securityTextFieldValid, securityTextFieldError, addSecurity}) => {

  return (
  <div >
	<br/>
				<ModelPortfolioNameTextField
					value={modelPortfolioName.value}
					modelPortfolioNameTextFieldChange={modelPortfolioNameTextFieldChange}/>
			<PortfolioTableImmutable
			portfolio={portfolio}
			addSecurity={addSecurity}
			removeSecurity={removeSecurity}
				securityTextFieldChange={securityTextFieldChange} 
				securityTextFieldValid={securityTextFieldValid} 
				securityTextFieldError={securityTextFieldError}	/>
				<div style={{textAlign: 'center'}}>
				<br/><br/>
			<AddSecurityButton
                            addSecurity={addSecurity} />
							</div>
							</div>
  );
};

Portfolio.propTypes = {
    modelPortfolioName: PropTypes.string.isRequired,
    modelPortfolioNameTextFieldChange: PropTypes.func.isRequired,
    portfolio: PropTypes.object.isRequired,
	removeSecurity: PropTypes.object.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,
	securityTextFieldValid: PropTypes.func.isRequired,
    securityTextFieldError: PropTypes.func.isRequired,
	addSecurity: PropTypes.func.isRequired,
};

export default Portfolio;
