import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from '../components/EntryBox';
import ModelPortfoliosAutoComplete from '../components/ModelPortfoliosAutoComplete';
import ModelPortfoliosAutoCompleteImmutable from '../components/ModelPortfoliosAutoCompleteImmutable';
import PortfolioTable from '../components/PortfolioTable';
import PortfolioTableImmutable from '../components/PortfolioTableImmutable';
import MainSection from '../components/MainSection';
import Scoreboard from '../components/Scoreboard';
import { createTopic, typing, incrementCount,
  decrementCount, destroyTopic, selectModelPortfolio} from '../actions/topics';
import styles from '../css/components/vote';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import { Button } from 'react-toolbox/lib/button';


const cx = classNames.bind(styles);

class Vote extends Component {
	
	constructor(props) {
		super(props);
		var displayData = [];
		displayData.push({text: '', value: (<MenuItem primaryText="Current loading model portfolios..." disabled={true} />)});
		this.state = {displayModelPortfolios: displayData};		
	}
	
	componentDidMount() {	   
		var userEmail = "test2@gmail.com";
		var modelPortfolioData = this.props.topics;
		var defaultModelPortfolios = [];
		var userModelPortfolios = [];
		var displayModelPortfolios = [];
		for (var i = 0; i < modelPortfolioData.length; i++) {
			if (modelPortfolioData[i].user == null)
				defaultModelPortfolios.push(modelPortfolioData[i]);
			else if (modelPortfolioData[i].user == userEmail)
				userModelPortfolios.push(modelPortfolioData[i]);
		}
		defaultModelPortfolios.sort(function(a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
		userModelPortfolios.sort(function(a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
		if (userModelPortfolios.length == 0) {
			for (i = 0; i < defaultModelPortfolios.length; i++) {
				displayModelPortfolios.push({value: defaultModelPortfolios[i]._id, text: defaultModelPortfolios[i].name});
			}
		}
		else {
			displayModelPortfolios.push({text: '', value: (<MenuItem primaryText="Custom Model Portfolios" disabled="true" />)});
			for (i = 0; i < userModelPortfolios.length; i++) {
				displayModelPortfolios.push({text: userModelPortfolios[i].name, value: (<MenuItem primaryText={userModelPortfolios[i].name} leftIcon={<ContentCreate />} />)});
			}
			displayModelPortfolios.push({text: '', value: (<MenuItem primaryText="Default Model Portfolios" disabled="true" />)});
			for (i = 0; i < defaultModelPortfolios.length; i++) {
				displayModelPortfolios.push({text: defaultModelPortfolios[i].name, value: (<MenuItem primaryText={defaultModelPortfolios[i].name} leftIcon={<ActionGroupWork />} />)});
			}
		}
		this.setState({displayModelPortfolios: displayModelPortfolios});
	}
	
  render() {
    const {newTopic, topics, typing, createTopic, destroyTopic, incrementCount, decrementCount, selectedModelPortfolio, selectModelPortfolio } = this.props;
    return (
	<div>
		<ModelPortfoliosAutoCompleteImmutable
			selectModelPortfolio={selectModelPortfolio}
			displayModelPortfolios={this.state.displayModelPortfolios} />
		//<PortfolioTable selectedModelPortfolio={this.state.selectedModelPortfolio} />	
		<PortfolioTableImmutable
			selectedModelPortfolio={selectedModelPortfolio} />
      /*<div className={cx('vote')}>
        <EntryBox
          topic={newTopic}
          onEntryChange={typing}
          onEntrySave={createTopic} />
        <MainSection
          topics={topics}
          onIncrement={incrementCount}
          onDecrement={decrementCount}
          onDestroy={destroyTopic} />
        <Scoreboard topics={topics} />
      </div> */
	  </div>
    );
  }
}

Vote.propTypes = {
  topics: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newTopic: PropTypes.string,
  selectModelPortfolio: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic,
	selectedModelPortfolio: state.topic.selectedModelPortfolio
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createTopic, typing, incrementCount, decrementCount, destroyTopic, selectModelPortfolio })(Vote);
