import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames/bind';
import SecurityRow from './SecurityRow';
import SaveModelPortfolioButton from './SaveModelPortfolioButton';
import DeleteModelPortfolioButton from './DeleteModelPortfolioButton';
import styles from '../../../css/components/portfolio/portfolio-table/portfolio-table';

const cx = classNames.bind(styles);

const PortfolioTable = ({selectedModelPortfolio, portfolio, portfolioSelect, saveModelPortfolio, deleteModelPortfolio, removeSecurity, securityTextFieldChange, fetchPrice}) => {
  const securityRows = portfolio.map((security, index) => {
    return (<SecurityRow
                         key={index}
                         security={security}
                         securitySelect={portfolioSelect.securitiesSelect[index]}
                         removeSecurity={removeSecurity}
                         securityTextFieldChange={securityTextFieldChange}
                         fetchPrice={fetchPrice} />);
  });

  return (
    <Table
         wrapperStyle={{ overflow: 'hidden' }}
         className={cx('table')}>
      <TableHeader
                 displaySelectAll={false}
                 adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn
                           data-tip
                           data-for="tooltipColumnHeaderSymbol"
                           className={cx('table-header-column')}>
          Symbol
          <ReactTooltip id="tooltipColumnHeaderSymbol">
            <p>
              Ticker symbol as shown on https://finance.yahoo.com.
            </p>
          </ReactTooltip>
          </TableHeaderColumn>
          <TableHeaderColumn
                           data-tip
                           data-for="tooltipColumnHeaderAllocation"
                           className={cx('table-header-column')}>
          Allocation
          <ReactTooltip id="tooltipColumnHeaderAllocation">
            <p>
              Percentage allocation of your portfolio this security should be.
            </p>
          </ReactTooltip>
          </TableHeaderColumn>
          <TableHeaderColumn
                           data-tip
                           data-for="tooltipColumnHeaderPrice"
                           className={cx('table-header-column')}>
          Price
          <ReactTooltip id="tooltipColumnHeaderPrice">
            <p>
              Price at which each unit will bought/sold.
              <br /> Prices are fetched from https://finance.yahoo.com.
            </p>
          </ReactTooltip>
          </TableHeaderColumn>
          <TableHeaderColumn
                           data-tip
                           data-for="tooltipColumnHeaderUnits"
                           className={cx('table-header-column')}>
          Units
          <ReactTooltip id="tooltipColumnHeaderUnits">
            <p>
              How many units of the security you currently own.
            </p>
          </ReactTooltip>
          </TableHeaderColumn>
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
  selectedModelPortfolio: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired,
  portfolioSelect: PropTypes.object.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  fetchPrice: PropTypes.func.isRequired,
};

export default PortfolioTable;
