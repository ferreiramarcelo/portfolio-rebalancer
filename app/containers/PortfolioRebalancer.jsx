import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import classNames from 'classnames/bind';
import { investmentAmountTextFieldChange } from '../actions/investmentAmount';
import { createNewModelPortfolio, saveModelPortfolio, deleteModelPortfolio } from '../actions/modelPortfolios';
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

const cx = classNames.bind(styles);

class PortfolioRebalancer extends Component {

  componentDidUpdate() {
    const {view, setScrolledToBttom} = this.props;
    if (view.justGeneratedSteps) {
      const scroll = Scroll.animateScroll;
      scroll.scrollToBottom();
      setScrolledToBttom();
    }
  }

  render() {
    const {modelPortfolios, selectedModelPortfolio, portfolio, investmentAmount, rebalancingSteps, view, email, selectModelPortfolio, createNewModelPortfolio, modelPortfolioNameTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange, investmentAmountTextFieldChange, generateSteps, saveModelPortfolio, portfolioSelect, deleteModelPortfolio} = this.props;
    if (!view.displayPortfolio) {
      return (
        <div className={cx('model-portfolio-selector-container')}>
          <ModelPortfoliosAutoComplete
                                     selectModelPortfolio={selectModelPortfolio}
                                     modelPortfolios={modelPortfolios}
                                     email={email} />
          <NewPortfolioButton createNewModelPortfolio={createNewModelPortfolio} />
        </div>
      );
    }
    return (
      <div>
        <div className={cx('model-portfolio-selector-container')}>
          <ModelPortfoliosAutoComplete
                                     selectModelPortfolio={selectModelPortfolio}
                                     modelPortfolios={modelPortfolios}
                                     email={email} />
          <NewPortfolioButton createNewModelPortfolio={createNewModelPortfolio} />
        </div>
        <Portfolio
                 portfolioSelect={portfolioSelect}
                 selectedModelPortfolio={selectedModelPortfolio}
                 modelPortfolioNameTextFieldChange={modelPortfolioNameTextFieldChange}
                 portfolio={portfolio}
                 addSecurity={addSecurity}
                 removeSecurity={removeSecurity}
                 securityTextFieldChange={securityTextFieldChange}
                 addSecurity={addSecurity}
                 saveModelPortfolio={saveModelPortfolio}
                 deleteModelPortfolio={deleteModelPortfolio} />
        <InvestmentAmount
                        investmentAmount={investmentAmount}
                        investmentAmountSelect={portfolioSelect.investmentAmountSelect}
                        investmentAmountTextFieldChange={investmentAmountTextFieldChange} />
        <GenerateStepsButton
                           visibility={portfolioSelect.generateStepsButtonVisibility}
                           generateSteps={generateSteps} />
        <StepsList rebalancingSteps={rebalancingSteps} />
      </div>
    );
  }
}

PortfolioRebalancer.propTypes = {
  investmentAmountTextFieldChange,
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

function mapStateToProps(state) {
  return {
    modelPortfolios: state.modelPortfolio.modelPortfolios,
    selectedModelPortfolio: state.portfolio.selectedModelPortfolio,
    portfolio: state.portfolio.portfolio,
    investmentAmount: state.investmentAmount.investmentAmount,
    rebalancingSteps: state.rebalancing.rebalancingSteps,
    view: state.view.view,
    email: state.user.email,
    portfolioSelect: getPortfolioSelect(state)
  };
}

export default connect(mapStateToProps, {
  investmentAmountTextFieldChange,
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
})(PortfolioRebalancer);
