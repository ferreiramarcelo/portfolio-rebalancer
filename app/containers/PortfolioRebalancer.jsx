import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ModelPortfoliosAutoCompleteImmutable from '../components/ModelPortfoliosAutoCompleteImmutable';
import NewPortfolioButton from '../components/NewPortfolioButton';
import Portfolio from '../components/Portfolio';
import InvestmentAmount from '../components/InvestmentAmount';
import GenerateStepsButton from '../components/GenerateStepsButton';
import StepsList from '../components/StepsList';
import SymbolTextField from '../components/SymbolTextField';
import { createModelPortfolio, typing, incrementCount, decrementCount, destroyModelPortfolio, selectModelPortfolio, createNewPortfolio, selectedModelPortfolioTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange, saveModelPortfolio, deleteModelPortfolio } from '../actions/modelPortfolios';
import { investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError } from '../actions/investmentAmount';
import { generateSteps } from '../actions/investmentSteps';
import classNames from 'classnames/bind';
import styles from '../css/components/portfolio-rebalancer';
import { getPortfolioSelect } from '../selectors/index'

const cx = classNames.bind( styles );

class PortfolioRebalancer extends Component {

  constructor( props ) {
    super( props );
  }

  render() {
    const {newModelPortfolio, modelPortfolios, selectedModelPortfolio, portfolio, investmentAmount, investmentSteps, view, email, createModelPortfolio, destroyModelPortfolio, incrementCount, decrementCount, selectModelPortfolio, createNewPortfolio, selectedModelPortfolioTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange, investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError, generateSteps, saveModelPortfolio, portfolioSelect, deleteModelPortfolio} = this.props;
    if ( !view.displayTable && !view.displaySteps ) {
      return (
      <div style={ { display: 'table', width: '100%', height: '20px' } }>
        <ModelPortfoliosAutoCompleteImmutable
                                              selectModelPortfolio={ selectModelPortfolio }
                                              modelPortfolios={ modelPortfolios }
                                              email={ email } />
        <NewPortfolioButton createNewPortfolio={ createNewPortfolio } />
      </div>
      )
    } else {
      return (
      <div id="PortfolioRebalancer">
        <div style={ { display: 'table', width: '100%', height: '20px' } }>
          <ModelPortfoliosAutoCompleteImmutable
                                                selectModelPortfolio={ selectModelPortfolio }
                                                modelPortfolios={ modelPortfolios }
                                                email={ email } />
          <NewPortfolioButton createNewPortfolio={ createNewPortfolio } />
        </div>
        <br></br>
        <br></br>
        <Portfolio
                   portfolioSelect={ portfolioSelect }
                   selectedModelPortfolio={ selectedModelPortfolio }
                   selectedModelPortfolioTextFieldChange={ selectedModelPortfolioTextFieldChange }
                   portfolio={ portfolio }
                   addSecurity={ addSecurity }
                   removeSecurity={ removeSecurity }
                   securityTextFieldChange={ securityTextFieldChange }
                   addSecurity={ addSecurity }
                   saveModelPortfolio={ saveModelPortfolio }
                   deleteModelPortfolio={ deleteModelPortfolio } />
        <br/>
        <br/>
        <InvestmentAmount
                          investmentAmount={ investmentAmount }
                          investmentAmountSelect={ portfolioSelect.investmentAmountSelect }
                          investmentAmountTextFieldChange={ investmentAmountTextFieldChange } />
        <br></br>
        <br></br>
        <GenerateStepsButton
                             visibility={ portfolioSelect.generateStepsButtonVisibility }
                             generateSteps={ generateSteps }
                             investmentAmount={ investmentAmount }
                             portfolio={ portfolio } />
        <StepsList investmentSteps={ investmentSteps } />
      </div>
      )
    }
  }
}

PortfolioRebalancer.propTypes = {
  newModelPortfolio: PropTypes.string,
  modelPortfolios: PropTypes.array.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired,
  investmentAmount: PropTypes.object.isRequired,
  investmentSteps: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  typing: PropTypes.func.isRequired,
  createModelPortfolio: PropTypes.func.isRequired,
  destroyModelPortfolio: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  selectModelPortfolio: PropTypes.func.isRequired,
  createNewPortfolio: PropTypes.func.isRequired,
  selectedModelPortfolioTextFieldChange: PropTypes.func.isRequired,
  addSecurity: PropTypes.func.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  investmentAmountTextFieldChange: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  generateSteps: PropTypes.func.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
  return {
    modelPortfolios: state.modelPortfolio.modelPortfolios,
    newModelPortfolio: state.modelPortfolio.newModelPortfolio,
    selectedModelPortfolio: state.modelPortfolio.selectedModelPortfolio,
    portfolio: state.modelPortfolio.portfolio,
    investmentAmount: state.investmentAmount.investmentAmount,
    investmentSteps: state.investmentSteps.investmentSteps,
    view: state.view.view,
    email: state.user.email,
    portfolioSelect: getPortfolioSelect( state )
  };
}

export default connect( mapStateToProps, {
  createModelPortfolio,
  typing,
  incrementCount,
  decrementCount,
  destroyModelPortfolio,
  selectModelPortfolio,
  createNewPortfolio,
  selectedModelPortfolioTextFieldChange,
  addSecurity,
  removeSecurity,
  securityTextFieldChange,
  investmentAmountTextFieldChange,
  generateSteps,
  saveModelPortfolio,
  deleteModelPortfolio
} )( PortfolioRebalancer );
