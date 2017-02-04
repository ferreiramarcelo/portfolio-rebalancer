import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TickerTextFieldImmutable from '../components/TickerTextFieldImmutable';
import AllocationTextField from '../components/AllocationTextField';
import PriceTextField from '../components/PriceTextField';
import PriceProgress from '../components/PriceProgress';
import UnitsTextField from '../components/UnitsTextField';
import RemoveSecurityButton from '../components/RemoveSecurityButton';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/security-row';

const cx = classNames.bind( styles );

const SecurityRow = ({security, removeSecurity, securityTextFieldChange}) => {

  return (<TableRow
                    id={ 'securityRow' + security.ticker }
                    className={ cx( 'TableRow' ) }>
            <TableRowColumn className={ cx( 'TableRowColumn' ) }>
              <TickerTextFieldImmutable
                                        index={ security.index }
                                        value={ security.ticker.value }
                                        securityTextFieldChange={ securityTextFieldChange } />
            </TableRowColumn>
            <TableRowColumn className={ cx( 'TableRowColumn' ) }>
              <AllocationTextField
                                   index={ security.index }
                                   allocation={ security.allocation }
                                   securityTextFieldChange={ securityTextFieldChange } />
            </TableRowColumn>
            <TableRowColumn id='testerino' className={ cx( 'TableRowColumn' ) }>
              <div id='testerino'>
              <PriceTextField
                              index={ security.index }
                              price={ security.price }
                              securityTextFieldChange={ securityTextFieldChange } />
                            </div>
            </TableRowColumn>
            <TableRowColumn className={ cx( 'TableRowColumn' ) }>
              <UnitsTextField
                              index={ security.index }
                              units={ security.units }
                              securityTextFieldChange={ securityTextFieldChange } />
            </TableRowColumn>
            <TableRowColumn className={ cx( 'TableRowColumnRemoveLast' ) }>
              <RemoveSecurityButton
                                    index={ security.index }
                                    removeSecurity={ removeSecurity } />
            </TableRowColumn>
          </TableRow>);
};

SecurityRow.propTypes = {
  security: PropTypes.object.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired
};

export default SecurityRow;
