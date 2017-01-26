import React, { Component, PropTypes } from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TickerTextFieldImmutable from '../components/TickerTextFieldImmutable';
import AllocationTextFieldImmutable from '../components/AllocationTextFieldImmutable';
import PriceTextFieldImmutable from '../components/PriceTextFieldImmutable';
import UnitsTextFieldImmutable from '../components/UnitsTextFieldImmutable';
import RemoveSecurityButton from '../components/RemoveSecurityButton';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames/bind';
import styles from '../css/components/security-row';

const cx = classNames.bind(styles);

const SecurityRow = ({security, removeSecurity, onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError}) => {

    return (
	<TableRow id={'securityRow'+security.ticker} className={cx('TableRow')}>
		<TableRowColumn className={cx('TableRowColumnTextField')}>
			<TickerTextFieldImmutable
				index={security.index}
				value={security.ticker.value}
				onSecurityTextFieldChange={onSecurityTextFieldChange} />
		</TableRowColumn>
		<TableRowColumn className={cx('TableRowColumnTextField')}>
			<AllocationTextFieldImmutable
				index={security.index}
				value={security.allocation.value}
				valid={security.allocation.valid}
				errorText={security.allocation.errorText}
				onSecurityTextFieldChange={onSecurityTextFieldChange}
				onSecurityTextFieldValid={onSecurityTextFieldValid}
				onSecurityTextFieldError={onSecurityTextFieldError} />
		</TableRowColumn>
		<TableRowColumn className={cx('TableRowColumnPriceTextField')}>
			<PriceTextFieldImmutable w
				index={security.index}
				value={security.price.value}
				valid={security.price.valid}
				errorText={security.price.errorText}
				onSecurityTextFieldChange={onSecurityTextFieldChange}
				onSecurityTextFieldValid={onSecurityTextFieldValid}
				onSecurityTextFieldError={onSecurityTextFieldError} />
		</TableRowColumn>
        <TableRowColumn className={cx('TableRowColumnPriceProgress')}>
        </TableRowColumn>
        <TableRowColumn className={cx('TableRowColumnPriceRightSpace')}>
        </TableRowColumn>
		<TableRowColumn  className={cx('TableRowColumnTextField')}>
			<UnitsTextFieldImmutable
				index={security.index}
				value={security.units.value}
				valid={security.units.valid}
				errorText={security.units.errorText}
				onSecurityTextFieldChange={onSecurityTextFieldChange}
				onSecurityTextFieldValid={onSecurityTextFieldValid}
				onSecurityTextFieldError={onSecurityTextFieldError} />
		</TableRowColumn>
        <TableRowColumn className={cx('TableRowColumnRemoveSecurity')}>
            <RemoveSecurityButton
				index={security.index}
				removeSecurity={removeSecurity} />
        </TableRowColumn>
	</TableRow>
    );
};

SecurityRow.propTypes = {
    security: PropTypes.object.isRequired,
    removeSecurity: PropTypes.func.isRequired,
    onSecurityTextFieldChange: PropTypes.func.isRequired,
	onSecurityTextFieldValid: PropTypes.func.isRequired,
    onSecurityTextFieldError: PropTypes.func.isRequired,
};

export default SecurityRow;