import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ModelPortfoliosAutoCompleteImmutable from '../components/ModelPortfoliosAutoCompleteImmutable';
import NewPortfolioButton from '../components/NewPortfolioButton';
import PortfolioTableImmutable from '../components/PortfolioTableImmutable';
import InvestmentAmountTextField from '../components/InvestmentAmountTextField';
import GenerateStepsButton from '../components/GenerateStepsButton';
import StepsList from '../components/StepsList';
import TickerTextFieldImmutable from '../components/TickerTextFieldImmutable';
import { createTopic, typing, incrementCount,
  decrementCount, destroyTopic,
  selectModelPortfolio, createNewPortfolio, addSecurity, removeSecurity,
  onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError} from '../actions/topics';
import { investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError } from '../actions/investmentAmount';
import { generateSteps } from '../actions/investmentSteps';
import classNames from 'classnames/bind';
import styles from '../css/components/vote';


const cx = classNames.bind(styles);

class Vote extends Component {
	
	constructor(props) {
		super(props);
		this.state = {email: "test2@gmail.com", initialInvestmentAmount: 0};	
	}
	
  render() {
      const {newTopic, topics, portfolio, investmentAmount, investmentSteps, view, createTopic, destroyTopic, incrementCount, decrementCount, 
	  selectModelPortfolio, createNewPortfolio, addSecurity, removeSecurity,
          onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError,
      investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError,
      generateSteps }= this.props;
      if (!view.displayTable && !view.displaySteps) {
          return (
          <div style={{
              display: 'table',
              width: '100%',
              height: '20px'
          }}>
              <ModelPortfoliosAutoCompleteImmutable
              selectModelPortfolio={selectModelPortfolio}
              modelPortfolios={topics}
              userEmail={this.state.email}
              />
          <NewPortfolioButton createNewPortfolio={createNewPortfolio} />
          </div>
          )
      }
	  else if (view.displayTable && !view.displaySteps)
		return (
		<div>
			<div style={{
				display: 'table',
					width: '100%',
					height: '20px'
				}}>
			<ModelPortfoliosAutoCompleteImmutable
				selectModelPortfolio={selectModelPortfolio}
				modelPortfolios={topics}
				userEmail={this.state.email}
				/>
			<NewPortfolioButton createNewPortfolio={createNewPortfolio} />
			</div>
			<br></br>
				<TickerTextFieldImmutable />
			<PortfolioTableImmutable
			portfolio={portfolio}
			addSecurity={addSecurity}
			removeSecurity={removeSecurity}
				onSecurityTextFieldChange={onSecurityTextFieldChange} 
				onSecurityTextFieldValid={onSecurityTextFieldValid} 
				onSecurityTextFieldError={onSecurityTextFieldError}	/>
            <p style={{
                display: 'inline-block',
                paddingRight: '10px',
            }}>How much cash are you investing? (Negative to take out)</p>
            <InvestmentAmountTextField
                    value={investmentAmount.value}
                    errorText={investmentAmount.errorText}
                    investmentAmountTextFieldChange={investmentAmountTextFieldChange}
                    investmentAmountTextFieldValid={investmentAmountTextFieldValid}
                    investmentAmountTextFieldError={investmentAmountTextFieldError} />
            <br></br>
            <br></br>
            <GenerateStepsButton
              portfolio={portfolio}
              investmentAmount={investmentAmount}
              generateSteps={generateSteps} />
			      <StepsList
						investmentSteps={investmentSteps} />

		  </div>
		)
		else
			return (
                <div>
			<div style={{
			display: 'table',
			width: '100%',
			height: '20px'
			}}>
			<ModelPortfoliosAutoCompleteImmutable
			selectModelPortfolio={selectModelPortfolio}
			modelPortfolios={topics}
			userEmail={this.state.email}
            />
        <NewPortfolioButton createNewPortfolio={createNewPortfolio} />
        </div>
        <PortfolioTableImmutable
			portfolio={portfolio}
			addSecurity={addSecurity}
			removeSecurity={removeSecurity}
			onSecurityTextFieldChange={onSecurityTextFieldChange} 
			onSecurityTextFieldValid={onSecurityTextFieldValid} 
			onSecurityTextFieldError={onSecurityTextFieldError}	/>
        <p style={{
            display: 'inline-block',
            paddingRight: '10px',
        }}>How much cash are you investing? (Negative to take out)</p>
        <InvestmentAmountTextField
                value={investmentAmount.value}
			valid={investmentAmount.valid}
			errorText={investmentAmount.errorText}
			investmentAmountTextFieldChange={investmentAmountTextFieldChange}
			investmentAmountTextFieldValid={investmentAmountTextFieldValid}
			investmentAmountTextFieldError={investmentAmountTextFieldError} />
    <br></br>
    <GenerateStepsButton
			portfolio={portfolio}
            investmentAmount={investmentAmount}
              generateSteps={generateSteps} />
    <StepsList />
  </div>
		)
  }
}

Vote.propTypes = {
    newTopic: PropTypes.string,
    topics: PropTypes.array.isRequired,

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
    addSecurity: PropTypes.func.isRequired,
    removeSecurity: PropTypes.func.isRequired,
    investmentAmountTextFieldChange: PropTypes.func.isRequired,
    investmentAmountTextFieldValid: PropTypes.func.isRequired,
    investmentAmountTextFieldError: PropTypes.func.isRequired,
	onSecurityTextFieldChange: PropTypes.func.isRequired,
	onSecurityTextFieldValid: PropTypes.func.isRequired,
	onSecurityTextFieldError: PropTypes.func.isRequired,
	generateSteps: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic,
    portfolio: state.topic.portfolio,
    investmentAmount: state.investmentAmount.investmentAmount,
	investmentSteps: state.investmentSteps.investmentSteps,
    view: state.view.view,
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createTopic, typing, incrementCount, decrementCount, destroyTopic,
    selectModelPortfolio, createNewPortfolio, addSecurity, removeSecurity, 
    onSecurityTextFieldChange, onSecurityTextFieldValid, onSecurityTextFieldError,
    investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError,
    generateSteps })(Vote);
