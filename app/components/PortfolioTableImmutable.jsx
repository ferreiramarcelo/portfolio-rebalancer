import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SaveModelPortfolioButton from '../components/SaveModelPortfolioButton';
import DeleteModelPortfolioButton from '../components/DeleteModelPortfolioButton';
import SecurityRow from '../components/SecurityRow';
import AddSecurityButton from '../components/AddSecurityButton';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/portfolio-table';

const cx = classNames.bind(styles);

const PortfolioTableImmutable = ({portfolio, addSecurity, removeSecurity, securityTextFieldChange, securityTextFieldValid, securityTextFieldError}) => {


    const securityRows = portfolio.map(security => {
        return <SecurityRow
        security={security}
                    removeSecurity={removeSecurity}
					securityTextFieldChange={securityTextFieldChange} 
					securityTextFieldValid={securityTextFieldValid} 
					securityTextFieldError={securityTextFieldError} />;
    });

  return (
      <Table className={cx('Table')} wrapperStyle={{ overflow: 'hidden' }}>
		<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		  <TableRow>
              <TableHeaderColumn className={cx('TableHeaderColumn')}>Ticker</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumn')}>Allocation</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumn')}>Price</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumn')}>Units</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumnRemoveSecurity')} >
				<SaveModelPortfolioButton saveModelPortfolio={addSecurity}/>
				<DeleteModelPortfolioButton deleteModelPortfolio={addSecurity}/>
			  </TableHeaderColumn>
		</TableRow>
		</TableHeader>
		<TableBody  displayRowCheckbox={false}>
            {securityRows}
		</TableBody>
	  </Table>
  );
};

PortfolioTableImmutable.propTypes = {
    portfolio: PropTypes.array.isRequired,
    addSecurity: PropTypes.func.isRequired,
    removeSecurity: PropTypes.func.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,
	securityTextFieldValid: PropTypes.func.isRequired,
    securityTextFieldError: PropTypes.func.isRequired,
};

export default PortfolioTableImmutable;
