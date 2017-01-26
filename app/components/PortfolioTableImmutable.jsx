import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
              <TableHeaderColumn className={cx('TableHeaderColumn')} tooltip="Ticker symbol as shown on https://finance.yahoo.com/. ">Ticker</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumn')} tooltip="Percentage allocation of the portfolio this security should be.">Allocation</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumPrice')} tooltip="Price at which each unit will be bought.">Price</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumPriceProgress')} ></TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumPriceRightSpace')}></TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumn')} tooltip="Number of units of the security you currently have.">Units</TableHeaderColumn>
              <TableHeaderColumn className={cx('TableHeaderColumnRemoveSecurity')} ></TableHeaderColumn>
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
