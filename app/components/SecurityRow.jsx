import React, { Component, PropTypes } from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TickerTextFieldImmutable from '../components/TickerTextFieldImmutable';
import AllocationTextFieldImmutable from '../components/AllocationTextFieldImmutable';
import PriceTextFieldImmutable from '../components/PriceTextFieldImmutable';
import UnitsTextFieldImmutable from '../components/UnitsTextFieldImmutable';
import RemoveSecurityButton from '../components/RemoveSecurityButton';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/security-row';

const cx = classNames.bind(styles);

const SecurityRow = ({security, removeSecurity, securityTextFieldChange, securityTextFieldValid, securityTextFieldError}) => {

    return (
	<TableRow id={'securityRow'+security.ticker} className={cx('TableRow')}>
		<TableRowColumn className={cx('TableRowColumn')}>
			<TickerTextFieldImmutable
				index={security.index}
				value={security.ticker.value}
				securityTextFieldChange={securityTextFieldChange} />
		</TableRowColumn>
		<TableRowColumn className={cx('TableRowColumn')}>
			<AllocationTextFieldImmutable
				index={security.index}
				value={security.allocation.value}
				valid={security.allocation.valid}
				errorText={security.allocation.errorText}
				securityTextFieldChange={securityTextFieldChange}
				securityTextFieldValid={securityTextFieldValid}
				securityTextFieldError={securityTextFieldError} />
		</TableRowColumn>
		<TableRowColumn className={cx('TableRowColumn')}>
			<PriceTextFieldImmutable w
				index={security.index}
				value={security.price.value}
				valid={security.price.valid}
				errorText={security.price.errorText}
				securityTextFieldChange={securityTextFieldChange}
				securityTextFieldValid={securityTextFieldValid}
				securityTextFieldError={securityTextFieldError} />
		</TableRowColumn>
		<TableRowColumn className={cx('TableRowColumn')}>
			<UnitsTextFieldImmutable
				index={security.index}
				value={security.units.value}
				valid={security.units.valid}
				errorText={security.units.errorText}
				securityTextFieldChange={securityTextFieldChange}
				securityTextFieldValid={securityTextFieldValid}
				securityTextFieldError={securityTextFieldError} />
		</TableRowColumn>
        <TableRowColumn className={cx('TableRowColumnRemoveLast')}>
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
    securityTextFieldChange: PropTypes.func.isRequired,
	securityTextFieldValid: PropTypes.func.isRequired,
    securityTextFieldError: PropTypes.func.isRequired,
};

export default SecurityRow;