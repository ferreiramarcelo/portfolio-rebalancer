import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import SecurityRow from './SecurityRow';
import SaveModelPortfolioButton from './SaveModelPortfolioButton';
import DeleteModelPortfolioButton from './DeleteModelPortfolioButton';
import styles from '../../../css/components/portfolio/portfolio-table/portfolio-table';

const cx = classNames.bind(styles);

const PortfolioTable = ({portfolio, portfolioSelect, removeSecurity, securityTextFieldChange, saveModelPortfolio, deleteModelPortfolio, selectedModelPortfolio}) => {
  const securityRows = portfolio.map((security, index) => {
    return (<SecurityRow
                         security={security}
                         securitySelect={portfolioSelect.securitiesSelect[index]}
                         removeSecurity={removeSecurity}
                         securityTextFieldChange={securityTextFieldChange} />);
  });

  return (
    <Table
         className={cx('table')}
         wrapperStyle={{ overflow: 'hidden' }}>
      <TableHeader
                 displaySelectAll={false}
                 adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn
                           className={cx('table-header-column')}
                           data-tip
                           data-for="tooltipColumnHeaderSymbol">
          Symbol
        </TableHeaderColumn>
          <ReactTooltip id="tooltipColumnHeaderSymbol">
            <p>
            Ticker symbol as shown on https://finance.yahoo.com.
          </p>
          </ReactTooltip>
          <TableHeaderColumn
                           className={cx('table-header-column')}
                           data-tip
                           data-for="tooltipColumnHeaderAllocation">
          Allocation
        </TableHeaderColumn>
          <ReactTooltip id="tooltipColumnHeaderAllocation">
            <p>
            Percentage allocation of your portfolio this security should be.
          </p>
          </ReactTooltip>
          <TableHeaderColumn
                           className={cx('table-header-column')}
                           data-tip
                           data-for="tooltipColumnHeaderPrice">
          Price
        </TableHeaderColumn>
          <ReactTooltip id="tooltipColumnHeaderPrice">
            <p>
            Price at which each unit will bought/sold.
            <br /> Prices are fetched from https://finance.yahoo.com.
          </p>
          </ReactTooltip>
          <TableHeaderColumn
                           className={cx('table-header-column')}
                           data-tip
                           data-for="tooltipColumnHeaderUnits">
          Units
        </TableHeaderColumn>
          <ReactTooltip id="tooltipColumnHeaderUnits">
            <p>
            How many units of the security you currently own.
          </p>
          </ReactTooltip>
          <TableHeaderColumn className={cx('table-header-column-last')}>
            <SaveModelPortfolioButton
                                    visibility={portfolioSelect.saveModelPortfolioButtonSelect.visibility}
                                    tooltip={portfolioSelect.saveModelPortfolioButtonSelect.tooltip}
                                    portfolio={portfolio}
                                    selectedModelPortfolio={selectedModelPortfolio}
                                    saveModelPortfolio={saveModelPortfolio} />
            <DeleteModelPortfolioButton
                                      id={selectedModelPortfolio.id}
                                      deleteModelPortfolio={deleteModelPortfolio}
                                      visibility={portfolioSelect.deleteModelPortfolioButtonVisibility} />
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        { securityRows }
      </TableBody>
    </Table>
  );
};

PortfolioTable.propTypes = {
  portfolio: PropTypes.object.isRequired,
  portfolioSelect: PropTypes.object.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired
};

export default PortfolioTable;
