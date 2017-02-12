import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ModelPortfoliosAutoCompleteImmutable from '../components/ModelPortfoliosAutoCompleteImmutable';
import NewPortfolioButton from '../components/NewPortfolioButton';
import Portfolio from '../components/Portfolio';
import InvestmentAmount from '../components/InvestmentAmount';
import GenerateStepsButton from '../components/GenerateStepsButton';
import StepsList from '../components/StepsList';
import SymbolTextField from '../components/SymbolTextField';
import { createTopic, typing, incrementCount, decrementCount, destroyTopic, selectModelPortfolio, createNewPortfolio, selectedModelPortfolioTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange, saveModelPortfolio, deleteModelPortfolio } from '../actions/topics';
import { investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError } from '../actions/investmentAmount';
import { generateSteps } from '../actions/investmentSteps';
import classNames from 'classnames/bind';
import styles from '../css/components/vote';
import { getPortfolioSelect } from '../selectors/index'

const cx = classNames.bind(styles);

class Vote extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {newTopic, topics, selectedModelPortfolio, portfolio, investmentAmount, investmentSteps, view, email, createTopic, destroyTopic, incrementCount, decrementCount, selectModelPortfolio, createNewPortfolio, selectedModelPortfolioTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange, investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError, generateSteps, saveModelPortfolio, portfolioSelect, deleteModelPortfolio} = this.props;
    if (!view.displayTable && !view.displaySteps) {
      return (
        <div style={ { display: 'table', width: '100%', height: '20px' } }>
          <ModelPortfoliosAutoCompleteImmutable selectModelPortfolio={ selectModelPortfolio } modelPortfolios={ topics } email={ email } />
          <NewPortfolioButton createNewPortfolio={ createNewPortfolio } />
        </div>
      )
    } else {
      return (
        <div id="PortfolioRebalancer">
          <div style={ { display: 'table', width: '100%', height: '20px' } }>
            <ModelPortfoliosAutoCompleteImmutable selectModelPortfolio={ selectModelPortfolio } modelPortfolios={ topics } email={ email } />
            <NewPortfolioButton createNewPortfolio={ createNewPortfolio } />
          </div>
          <br></br>
          <br></br>
          <Portfolio portfolioSelect={ portfolioSelect } selectedModelPortfolio={ selectedModelPortfolio } selectedModelPortfolioTextFieldChange={ selectedModelPortfolioTextFieldChange } portfolio={ portfolio }
            addSecurity={ addSecurity } removeSecurity={ removeSecurity } securityTextFieldChange={ securityTextFieldChange } addSecurity={ addSecurity } saveModelPortfolio={ saveModelPortfolio }
            deleteModelPortfolio={ deleteModelPortfolio } />
          <br/>
          <br/>
          <InvestmentAmount investmentAmount={ investmentAmount } investmentAmountSelect={portfolioSelect.investmentAmountSelect} investmentAmountTextFieldChange={ investmentAmountTextFieldChange } />
          <br></br>
          <br></br>
          <GenerateStepsButton visibility={ portfolioSelect.generateStepsButtonVisibility } generateSteps={ generateSteps } investmentAmount={investmentAmount} portfolio={portfolio} />
          <StepsList investmentSteps={ investmentSteps } portfolio={ portfolio } />
        </div>
      )
    }
  }
}

Vote.propTypes = {
  newTopic: PropTypes.string,
  topics: PropTypes.array.isRequired,

  selectedModelPortfolio: PropTypes.object.isRequired,
  portfolio: PropTypes.array.isRequired,
  investmentAmount: PropTypes.object.isRequired,
  investmentSteps: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,

  typing: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired,
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

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic,
    selectedModelPortfolio: state.topic.selectedModelPortfolio,
    portfolio: state.topic.portfolio,
    investmentAmount: state.investmentAmount.investmentAmount,
    investmentSteps: state.investmentSteps.investmentSteps,
    view: state.view.view,
    email: state.user.email,
    portfolioSelect: getPortfolioSelect(state)
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {
  createTopic,
  typing,
  incrementCount,
  decrementCount,
  destroyTopic,
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
})(Vote);
