import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/entrybox';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const ModelPortfoliosAutoCompleteImmutable = ({selectModelPortfolio, modelPortfolios, userEmail}) => {
	
	const generateDisplayModelPortfolios = (modelPortfolios, userEmail) => {
		var defaultModelPortfolios = [];
		var userModelPortfolios = [];
		var displayModelPortfolios = [];
		for (var i = 0; i < modelPortfolios.length; i++) {
			if (modelPortfolios[i].userEmail == null)
				defaultModelPortfolios.push(modelPortfolios[i]);
			else if (modelPortfolios[i].userEmail == userEmail)
				userModelPortfolios.push(modelPortfolios[i]);
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
			    displayModelPortfolios.push({name: defaultModelPortfolios[i].name});
			}
		}
		else {
		    displayModelPortfolios.push({name: 'USER_MODEL_PORTFOLIOS_GROUP'});
			for (i = 0; i < userModelPortfolios.length; i++) {
			    displayModelPortfolios.push({name: userModelPortfolios[i].name, isUser: 1});
			}
			displayModelPortfolios.push({name: 'DEFAULT_MODEL_PORTFOLIOS_GROUP'});
			for (i = 0; i < defaultModelPortfolios.length; i++) {
			    displayModelPortfolios.push({name: defaultModelPortfolios[i].name, isUser: 0});
			}
		}
		return displayModelPortfolios;
	}
	
	const displayModelPortfolios = generateDisplayModelPortfolios(modelPortfolios, userEmail);
	
	const displayModelPortfoliosElements = displayModelPortfolios.map(modelPortfolio => {
	    switch (modelPortfolio.name) {
			case 'USER_MODEL_PORTFOLIOS_GROUP':
				return {text: '', value: (<MenuItem primaryText="Custom Model Portfolios" disabled={true} />)};
			case 'DEFAULT_MODEL_PORTFOLIOS_GROUP':
				return {text: '', value: (<MenuItem primaryText="Default Model Portfolios" disabled={true} />)};
			default:
        switch (modelPortfolio.isUser) {
                    case 0:
                        return {text: modelPortfolio.name, value: (<MenuItem primaryText={modelPortfolio.name} leftIcon={<ActionGroupWork />} />)};
			        case 1:
			            return {text: modelPortfolio.name, value: (<MenuItem primaryText={modelPortfolio.name} leftIcon={<EditorModeEdit />} />)};
			        default:
			            return {text: modelPortfolio.name, value: (<MenuItem primaryText={modelPortfolio.name} />)};
                }
		}
	});
	
	const handleOnNewRequest = (chosenRequest, index) => {
	    var selectedModelPortfolio;
	    for (var i = 0; i < modelPortfolios.length; i++) {
	        if (modelPortfolios[i].name == chosenRequest.text) {
	            selectedModelPortfolio = modelPortfolios[i];
	            break;
	        }               
	    }
	    selectModelPortfolio(selectedModelPortfolio);
	}
	

	return (
			<AutoComplete
				hintText="Select model portfolio..."
				filter={AutoComplete.caseInsensitiveFilter}
				openOnFocus={true}
				dataSource={displayModelPortfoliosElements}
				onNewRequest={handleOnNewRequest}
				fullWidth={true}
				style={{
					paddingRight: '5px',
				display: 'table-cell',
				}}
			/>
  );
};

ModelPortfoliosAutoCompleteImmutable.propTypes = {
  selectModelPortfolio: PropTypes.func.isRequired,
  modelPortfolios: PropTypes.array.isRequired,
  userEmail: PropTypes.string.isRequired
};

export default ModelPortfoliosAutoCompleteImmutable;
