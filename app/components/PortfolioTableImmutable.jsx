import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import SaveModelPortfolioButton from '../components/SaveModelPortfolioButton';
import DeleteModelPortfolioButton from '../components/DeleteModelPortfolioButton';
import SecurityRow from '../components/SecurityRow';
import AddSecurityButton from '../components/AddSecurityButton';
import ReactTooltip from 'react-tooltip'

import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-table/portfolio-table';
const cx = classNames.bind( styles );

const PortfolioTableImmutable = ({portfolioSelect, portfolio, addSecurity, removeSecurity, securityTextFieldChange, securityTextFieldValid, securityTextFieldError, saveModelPortfolio, deleteModelPortfolio, selectedModelPortfolio}) => {


  const securityRows = portfolio.map( (security, index) => {
    return <SecurityRow
                        security={ security }
                        securitySelect={portfolioSelect.securitiesSelect[index]}
                        removeSecurity={ removeSecurity }
                        securityTextFieldChange={ securityTextFieldChange }
                        securityTextFieldValid={ securityTextFieldValid }
                        securityTextFieldError={ securityTextFieldError } />;
  } );

  return (
  <Table
         className={ cx( 'Table' ) }
         wrapperStyle={ { overflow: 'hidden' } }>
    <TableHeader
                 displaySelectAll={ false }
                 adjustForCheckbox={ false }>
      <TableRow>
        <TableHeaderColumn
                           className={ cx( 'TableHeaderColumn' ) }
                           data-tip
                           data-for='tooltipColumnHeaderSymbol'>
          Symbol
        </TableHeaderColumn>
        <ReactTooltip id='tooltipColumnHeaderSymbol'>
          <p>
            Ticker symbol as shown on https://finance.yahoo.com.
          </p>
        </ReactTooltip>
        <TableHeaderColumn
                           className={ cx( 'TableHeaderColumn' ) }
                           data-tip
                           data-for='tooltipColumnHeaderAllocation'>
          Allocation
        </TableHeaderColumn>
        <ReactTooltip id='tooltipColumnHeaderAllocation'>
          <p>
            Percentage allocation of your portfolio this security should be.
          </p>
        </ReactTooltip>
        <TableHeaderColumn
                           className={ cx( 'TableHeaderColumn' ) }
                           data-tip
                           data-for='tooltipColumnHeaderPrice'>
          Price
        </TableHeaderColumn>
        <ReactTooltip id='tooltipColumnHeaderPrice'>
          <p>
            The price at which each unit will be purchased and sold.
          </p>
          <p>
            Prices are automatically fetched from https://finance.yahoo.com based on the symbol symbol provided.
          </p>
        </ReactTooltip>
        <TableHeaderColumn
                           className={ cx( 'TableHeaderColumn' ) }
                           data-tip
                           data-for='tooltipColumnHeaderUnits'>
          Units
        </TableHeaderColumn>
        <ReactTooltip id='tooltipColumnHeaderUnits'>
          <p>
            How many units of the security you currently own.
          </p>
        </ReactTooltip>
        <TableHeaderColumn className={ cx( 'TableHeaderColumnLast' ) }>
          <SaveModelPortfolioButton
                                    visibility={ portfolioSelect.saveModelPortfolioButtonVisibility }
                                    portfolio={ portfolio }
                                    selectedModelPortfolio={ selectedModelPortfolio }
                                    saveModelPortfolio={ saveModelPortfolio } />
          <DeleteModelPortfolioButton
                                      id={ selectedModelPortfolio.id }
                                      deleteModelPortfolio={ deleteModelPortfolio }
                                      visibility={ portfolioSelect.deleteModelPortfolioButtonVisibility } />
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={ false }>
      { securityRows }
    </TableBody>
  </Table>
  );
};

PortfolioTableImmutable.propTypes = {
  portfolioSelect: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired,
  addSecurity: PropTypes.func.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  securityTextFieldValid: PropTypes.func.isRequired,
  securityTextFieldError: PropTypes.func.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  selectedModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired
};

export default PortfolioTableImmutable;
