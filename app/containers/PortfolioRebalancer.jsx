import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import classNames from 'classnames/bind';
import { investmentAmountTextFieldChange } from '../actions/investmentAmount';
import { modelPortfoliosAutoCompleteSearchTextChange, createNewModelPortfolio, saveModelPortfolio, deleteModelPortfolio } from '../actions/modelPortfolios';
import { selectModelPortfolio, modelPortfolioNameTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange } from '../actions/portfolios';
import { generateSteps, setScrolledToBttom } from '../actions/rebalancings';
import ModelPortfoliosAutoComplete from '../components/portfolioselection/ModelPortfoliosAutoComplete';
import NewPortfolioButton from '../components/portfolioselection/NewPortfolioButton';
import Portfolio from '../components/portfolio/Portfolio';
import InvestmentAmount from '../components/investmentamount/InvestmentAmount';
import GenerateStepsButton from '../components/investmentsteps/GenerateStepsButton';
import StepsList from '../components/investmentsteps/StepsList';
import { getPortfolioSelect } from '../selectors/index';
import styles from '../css/containers/portfolio-rebalancer';

const cx = classNames.bind( styles );

class PortfolioRebalancer extends Component {

  getPortfolioView() {
    const {view, selectedModelPortfolio, modelPortfolioNameTextFieldChange, portfolio, portfolioSelect, saveModelPortfolio, deleteModelPortfolio, addSecurity, removeSecurity, securityTextFieldChange,
       investmentAmount, investmentAmountSelect, investmentAmountTextFieldChange,
        generateSteps, rebalancingSteps} = this.props;
    if ( view.displayPortfolio ) {
      return (
      <div>
        <Portfolio
                   selectedModelPortfolio={ selectedModelPortfolio }
                   modelPortfolioNameTextFieldChange={ modelPortfolioNameTextFieldChange }
                   portfolio={ portfolio }
                   portfolioSelect={ portfolioSelect }
                   saveModelPortfolio={ saveModelPortfolio }
                   deleteModelPortfolio={ deleteModelPortfolio }
                   addSecurity={ addSecurity }
                   removeSecurity={ removeSecurity }
                   securityTextFieldChange={ securityTextFieldChange } />
        <InvestmentAmount
                          investmentAmount={ investmentAmount }
                          investmentAmountSelect={ portfolioSelect.investmentAmountSelect }
                          investmentAmountTextFieldChange={ investmentAmountTextFieldChange } />
        <GenerateStepsButton
                             visibility={ portfolioSelect.generateStepsButtonVisibility }
                             generateSteps={ generateSteps } />
        <StepsList rebalancingSteps={ rebalancingSteps } />
      </div>
      );
    }
  }
  
  componentDidUpdate() {
    const {view, setScrolledToBttom} = this.props;
    if ( view.justGeneratedSteps ) {
      const scroll = Scroll.animateScroll;
      scroll.scrollToBottom();
      setScrolledToBttom();
    }
  }

  render() {
    const {modelPortfoliosAutoCompleteSearchText, modelPortfoliosAutoCompleteSearchTextChange, selectModelPortfolio, modelPortfolios, email, createNewModelPortfolio} = this.props;
    return (
    <div>
      <div className={ cx( 'model-portfolio-selector-container' ) }>
        <ModelPortfoliosAutoComplete
                                     searchText={ modelPortfoliosAutoCompleteSearchText }
                                     onUpdateInput={ modelPortfoliosAutoCompleteSearchTextChange }
                                     selectModelPortfolio={ selectModelPortfolio }
                                     modelPortfolios={ modelPortfolios }
                                     email={ email } />
        <NewPortfolioButton createNewModelPortfolio={ createNewModelPortfolio } />
      </div>
      { this.getPortfolioView() }
    </div>
    );
  }
}

PortfolioRebalancer.propTypes = {
  modelPortfoliosAutoCompleteSearchText: PropTypes.string.isRequired,
  modelPortfolios: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  selectedModelPortfolio: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired,
  portfolioSelect: PropTypes.object.isRequired,
  investmentAmount: PropTypes.object.isRequired,
  rebalancingSteps: PropTypes.object.isRequired,
  investmentAmountTextFieldChange: PropTypes.func.isRequired,
  modelPortfoliosAutoCompleteSearchTextChange: PropTypes.func.isRequired,
  createNewModelPortfolio: PropTypes.func.isRequired,
  saveModelPortfolio: PropTypes.func.isRequired,
  deleteModelPortfolio: PropTypes.func.isRequired,
  selectModelPortfolio: PropTypes.func.isRequired,
  modelPortfolioNameTextFieldChange: PropTypes.func.isRequired,
  addSecurity: PropTypes.func.isRequired,
  removeSecurity: PropTypes.func.isRequired,
  securityTextFieldChange: PropTypes.func.isRequired,
  generateSteps: PropTypes.func.isRequired,
  setScrolledToBttom: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    modelPortfoliosAutoCompleteSearchText: state.modelPortfolio.modelPortfoliosAutoCompleteSearchText,
    modelPortfolios: state.modelPortfolio.modelPortfolios,
    email: state.user.email,
    selectedModelPortfolio: state.portfolio.selectedModelPortfolio,
    view: state.view.view,
    portfolio: state.portfolio.portfolio,
    portfolioSelect: getPortfolioSelect( state ),
    investmentAmount: state.investmentAmount.investmentAmount,
    rebalancingSteps: state.rebalancing.rebalancingSteps,
  };
}

export default connect( mapStateToProps, {
  investmentAmountTextFieldChange,
  modelPortfoliosAutoCompleteSearchTextChange,
  createNewModelPortfolio,
  saveModelPortfolio,
  deleteModelPortfolio,
  selectModelPortfolio,
  modelPortfolioNameTextFieldChange,
  addSecurity,
  removeSecurity,
  securityTextFieldChange,
  generateSteps,
  setScrolledToBttom,
} )( PortfolioRebalancer );
