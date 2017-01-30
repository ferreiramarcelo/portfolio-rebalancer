import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ModelPortfoliosAutoCompleteImmutable from '../components/ModelPortfoliosAutoCompleteImmutable';
import NewPortfolioButton from '../components/NewPortfolioButton';
import Portfolio from '../components/Portfolio';
import InvestmentAmount from '../components/InvestmentAmount';
import GenerateStepsButton from '../components/GenerateStepsButton';
import StepsList from '../components/StepsList';
import TickerTextFieldImmutable from '../components/TickerTextFieldImmutable';
import { createTopic, typing, incrementCount,
  decrementCount, destroyTopic,
  selectModelPortfolio, createNewPortfolio, modelPortfolioNameTextFieldChange, addSecurity, removeSecurity,
  securityTextFieldChange, securityTextFieldValid, securityTextFieldError,
  saveModelPortfolio} from '../actions/topics';
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
      const {newTopic, topics, modelPortfolioName, portfolio, investmentAmount, investmentSteps, view, userEmail, createTopic, destroyTopic, incrementCount, decrementCount,
	  selectModelPortfolio, createNewPortfolio, modelPortfolioNameTextFieldChange, addSecurity, removeSecurity,
          securityTextFieldChange, securityTextFieldValid, securityTextFieldError,
      investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError,
      generateSteps, saveModelPortfolio }= this.props;
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
              userEmail={userEmail}
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
				userEmail={userEmail}
				/>
			<NewPortfolioButton createNewPortfolio={createNewPortfolio} />
			</div>
			<Portfolio
				modelPortfolioName={modelPortfolioName}
				modelPortfolioNameTextFieldChange={modelPortfolioNameTextFieldChange}
				portfolio={portfolio}
				addSecurity={addSecurity}
				removeSecurity={removeSecurity}
				securityTextFieldChange={securityTextFieldChange}
				securityTextFieldValid={securityTextFieldValid}
				securityTextFieldError={securityTextFieldError}
				addSecurity={addSecurity}
				saveModelPortfolio={saveModelPortfolio}/>
			<br/><br/>
            <InvestmentAmount
                    investmentAmount={investmentAmount}
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
						investmentSteps={investmentSteps}
						portfolio={portfolio} />

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
			securityTextFieldChange={securityTextFieldChange}
			securityTextFieldValid={securityTextFieldValid}
			securityTextFieldError={securityTextFieldError}	/>
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

	modelPortfolioName: PropTypes.object.isRequired,
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
	modelPortfolioNameTextFieldChange: PropTypes.func.isRequired,
    addSecurity: PropTypes.func.isRequired,
    removeSecurity: PropTypes.func.isRequired,
    investmentAmountTextFieldChange: PropTypes.func.isRequired,
    investmentAmountTextFieldValid: PropTypes.func.isRequired,
    investmentAmountTextFieldError: PropTypes.func.isRequired,
	securityTextFieldChange: PropTypes.func.isRequired,
	securityTextFieldValid: PropTypes.func.isRequired,
	securityTextFieldError: PropTypes.func.isRequired,
	generateSteps: PropTypes.func.isRequired,
	saveModelPortfolio: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic,
	modelPortfolioName: state.topic.modelPortfolioName,
    portfolio: state.topic.portfolio,
    investmentAmount: state.investmentAmount.investmentAmount,
	investmentSteps: state.investmentSteps.investmentSteps,
    view: state.view.view,
	userEmail: state.user.userEmail,
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createTopic, typing, incrementCount, decrementCount, destroyTopic,
    selectModelPortfolio, createNewPortfolio, modelPortfolioNameTextFieldChange, addSecurity, removeSecurity,
    securityTextFieldChange, securityTextFieldValid, securityTextFieldError,
    investmentAmountTextFieldChange, investmentAmountTextFieldValid, investmentAmountTextFieldError,
    generateSteps, saveModelPortfolio })(Vote);
