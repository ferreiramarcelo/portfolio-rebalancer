import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SaveModelPortfolioButton from '../components/SaveModelPortfolioButton';
import SecurityRow from '../components/SecurityRow';
import AddSecurityButton from '../components/AddSecurityButton';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table';

const cx = classNames.bind(styles);

const PortfolioTableImmutable = ({portfolio, addSecurity, removeSecurity, onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError}) => {


    const securityRows = portfolio.map(security => {
        return <SecurityRow
        security={security}
                    removeSecurity={removeSecurity}
					onSecurityTextFieldChange={onSecurityTextFieldChange} 
					onSecurityTextFieldValid={onSecurityTextFieldValid} 
					onSecurityTextFieldError={onSecurityTextFieldError} />;
    });

  return (
      <Table  wrapperStyle={{ overflow: 'hidden' }}>
		<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
		  <TableRow>
              <TableHeaderColumn >Ticker</TableHeaderColumn>
              <TableHeaderColumn >Allocation</TableHeaderColumn>
              <TableHeaderColumn >Price</TableHeaderColumn>
              <TableHeaderColumn>Units</TableHeaderColumn>
              <TableHeaderColumn >
				<SaveModelPortfolioButton saveModelPortfolio={addSecurity}/>
			  </TableHeaderColumn>
			  </TableRow>
		</TableHeader>
		<TableBody  displayRowCheckbox={false}>
            {securityRows}
            <TableRow className={cx('TableRowAddSecurityButton')}>
                <TableRowColumn/>
                <TableRowColumn/>
                <TableRowColumn className={cx('TableRowAddSecurityButton')}>
			          <AddSecurityButton
                            addSecurity={addSecurity} />
                </TableRowColumn>
                <TableRowColumn/>
                <TableRowColumn/>
                <TableRowColumn/>
            </TableRow>
		</TableBody>
	  </Table>
  );
};

PortfolioTableImmutable.propTypes = {
    portfolio: PropTypes.array.isRequired,
    addSecurity: PropTypes.func.isRequired,
    removeSecurity: PropTypes.func.isRequired,
	onSecurityTextFieldChange: PropTypes.func.isRequired,
	onSecurityTextFieldValid: PropTypes.func.isRequired,
    onSecurityTextFieldError: PropTypes.func.isRequired,
};

export default PortfolioTableImmutable;
