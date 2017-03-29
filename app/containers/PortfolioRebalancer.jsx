import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { investmentAmountTextFieldChange } from '../actions/investmentAmount';
import { changeAutocomplete, toggleModelPortfolioGroupOpenness, modelPortfoliosAutoCompleteSearchTextChange, createNewModelPortfolio, saveModelPortfolio, deleteModelPortfolio } from '../actions/modelPortfolios';
import { selectModelPortfolio, modelPortfolioNameTextFieldChange, addSecurity, removeSecurity, securityTextFieldChange, fetchPrice, setTradingCurrency } from '../actions/portfolios';
import { generateSteps, setScrolledToBttom, changeShowWholeUnits, changeShowPartialUnits, changeShowCashAmounts } from '../actions/rebalancings';
import ModelPortfoliosAutoComplete from '../components/portfolioselection/ModelPortfoliosAutoComplete';
import NewPortfolioButton from '../components/portfolioselection/NewPortfolioButton';
import Portfolio from '../components/portfolio/Portfolio';
import CurrencyDropDownMenu from '../components/portfolio/CurrencyDropDownMenu';
import InvestmentAmount from '../components/investmentamount/InvestmentAmount';
import GenerateStepsButton from '../components/investmentsteps/GenerateStepsButton';
import StepsListHeader from '../components/investmentsteps/StepsListHeader';
import { getPortfolioSelect } from '../selectors/index';
import styles from '../css/containers/portfolio-rebalancer';

const cx = classNames.bind(styles);

class PortfolioRebalancer extends Component {
  constructor(props) {
    super(props);
    this.handleOnGenerateSteps = this.handleOnGenerateSteps.bind(this);
  }

  componentDidUpdate() {
    if (this.props.view.justGeneratedSteps) {
      window.scrollTo(0, document.body.scrollHeight);
      this.props.setScrolledToBttom();
    }
  }

  componentDidMount() {
    //this.nameInput.focus();

  }

  getPortfolioView() {
    if (this.props.view.displayPortfolio) {
      return (
        <div>
          <Portfolio selectedModelPortfolio={ this.props.selectedModelPortfolio } modelPortfolioNameTextFieldChange={ this.props.modelPortfolioNameTextFieldChange } portfolio={ this.props.portfolio } portfolioSelect={ this.props.portfolioSelect }
            saveModelPortfolio={ this.props.saveModelPortfolio } deleteModelPortfolio={ this.props.deleteModelPortfolio } addSecurity={ this.props.addSecurity } removeSecurity={ this.props.removeSecurity } securityTextFieldChange={ this.props.securityTextFieldChange }
            fetchPrice={ this.props.fetchPrice } currencies={ this.props.currencies } />
          <form onSubmit={ this.handleOnGenerateSteps }>
            <CurrencyDropDownMenu currencies={ this.props.currencies } setTradingCurrency={ this.props.setTradingCurrency } />
            <InvestmentAmount investmentAmount={ this.props.investmentAmount } investmentAmountSelect={ this.props.portfolioSelect.investmentAmountSelect } investmentAmountTextFieldChange={ this.props.investmentAmountTextFieldChange } />
            <GenerateStepsButton visibility={ this.props.portfolioSelect.generateStepsButtonVisibility } generateSteps={ this.props.generateSteps } />
          </form>
          <StepsListHeader showWholeUnits={ this.props.rebalancing.showWholeUnits } showPartialUnits={ this.props.rebalancing.showPartialUnits } showCashAmounts={ this.props.rebalancing.showCashAmounts } changeShowWholeUnits={ this.props.changeShowWholeUnits }
            changeShowWholeUnits={ this.props.changeShowWholeUnits } changeShowPartialUnits={ this.props.changeShowPartialUnits } changeShowCashAmounts={ this.props.changeShowCashAmounts } rebalancingSteps={ this.props.rebalancingSteps }
          />
        </div>
        );
    }
    return null;
  }

  handleOnGenerateSteps(event) {
    event.preventDefault();
    this.props.generateSteps();
  }

  render() {
    return (
      <div className={ cx('portfolio-rebalancer-container') }>
        <div className={ cx('model-portfolio-selector-container') }>
          <ModelPortfoliosAutoComplete searchText={ this.props.modelPortfoliosAutoCompleteSearchText } onUpdateInput={ this.props.modelPortfoliosAutoCompleteSearchTextChange } modelPortfolios={ this.props.modelPortfolios } onItemTouch={ this.props.selectModelPortfolio } onNewRequest={ this.props.changeAutocomplete }
            toggleModelPortfolioGroupOpenness={ this.props.toggleModelPortfolioGroupOpenness } shouldOpenMenu={ this.props.portfolio.length === 0} />
          <NewPortfolioButton createNewModelPortfolio={ this.props.createNewModelPortfolio } />
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
  fetchPrice: PropTypes.func.isRequired,
  generateSteps: PropTypes.func.isRequired,
  setScrolledToBttom: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    modelPortfoliosAutoCompleteSearchText: state.modelPortfolio.modelPortfoliosAutoCompleteSearchText,
    modelPortfolios: state.modelPortfolio.modelPortfolios,
    displayModelPortfolios: state.modelPortfolio.displayModelPortfolios,
    email: state.user.email,
    selectedModelPortfolio: state.portfolio.selectedModelPortfolio,
    view: state.view.view,
    portfolio: state.portfolio.portfolio,
    investmentAmount: state.investmentAmount.investmentAmount,
    rebalancingSteps: state.rebalancing.rebalancingSteps,
    portfolioSelect: getPortfolioSelect(state),
    currencies: state.portfolio.currencies,
    rebalancing: state.rebalancing
  };
}

export default connect(mapStateToProps, {
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
  fetchPrice,
  generateSteps,
  setScrolledToBttom,
  changeAutocomplete,
  toggleModelPortfolioGroupOpenness,
  setTradingCurrency,
  changeShowWholeUnits,
  changeShowPartialUnits,
  changeShowCashAmounts
})(PortfolioRebalancer);
