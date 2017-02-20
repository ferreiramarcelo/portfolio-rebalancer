import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import classNames from 'classnames/bind';
import styles from '../../css/components/model-portfolios-autocomplete';

const cx = classNames.bind(styles);

const ModelPortfoliosAutoComplete = ({selectModelPortfolio, modelPortfolios, email}) => {
  const sortModelPortfoliosAlphabeticaly = function sortModelPortfoliosAlphabeticalyFunc(a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  };

   const generateDisplayModelPortfolios = (givenModelPortfolios, givenEmail) => {
    const defaultModelPortfolios = [];
    const userModelPortfolios = [];
    const displayModelPortfolios = [];
    for (let i = 0; i < givenModelPortfolios.length; i++) {
      if (!givenModelPortfolios[i].email) {
        defaultModelPortfolios.push(givenModelPortfolios[i]);
      } else if (givenModelPortfolios[i].email === givenEmail) {
        userModelPortfolios.push(givenModelPortfolios[i]);
      }
    }
    defaultModelPortfolios.sort(sortModelPortfoliosAlphabeticaly);
    userModelPortfolios.sort(sortModelPortfoliosAlphabeticaly);
    if (userModelPortfolios.length === 0) {
      for (let i = 0; i < defaultModelPortfolios.length; i++) {
        displayModelPortfolios.push({
          name: defaultModelPortfolios[i].name
        });
      }
    } else {
      displayModelPortfolios.push({
        name: 'USER_MODEL_PORTFOLIOS_GROUP'
      });
      for (let i = 0; i < userModelPortfolios.length; i++) {
        displayModelPortfolios.push({
          name: userModelPortfolios[i].name,
          isUser: 1
        });
      }
      displayModelPortfolios.push({
        name: 'DEFAULT_MODEL_PORTFOLIOS_GROUP'
      });
      for (let i = 0; i < defaultModelPortfolios.length; i++) {
        displayModelPortfolios.push({
          name: defaultModelPortfolios[i].name,
          isUser: 0
        });
      }
    }
    return displayModelPortfolios;
  };

  const displayModelPortfolios = generateDisplayModelPortfolios(modelPortfolios, email);

  const displayModelPortfoliosElements = displayModelPortfolios.map(modelPortfolio => {
    switch (modelPortfolio.name) {
      case 'USER_MODEL_PORTFOLIOS_GROUP':
        return {
          text: '',
          value: (<MenuItem
                            primaryText="Custom Model Portfolios"
                            disabled />)
        };
      case 'DEFAULT_MODEL_PORTFOLIOS_GROUP':
        return {
          text: '',
          value: (<MenuItem
                            primaryText="Default Model Portfolios"
                            disabled />)
        };
      default:
        switch (modelPortfolio.isUser) {
          case 0:
            return {
              text: modelPortfolio.name,
              value: (<MenuItem
                                primaryText={modelPortfolio.name}
                                leftIcon={<ActionGroupWork />} />)
            };
          case 1:
            return {
              text: modelPortfolio.name,
              value: (<MenuItem
                                primaryText={modelPortfolio.name}
                                leftIcon={<EditorModeEdit />} />)
            };
          default:
            return {
              text: modelPortfolio.name,
              value: (<MenuItem primaryText={modelPortfolio.name} />)
            };
        }
    }
  });

  const handleOnNewRequest = (chosenRequest) => {
    let selectedModelPortfolio;
    for (let i = 0; i < modelPortfolios.length; i++) {
      if (modelPortfolios[i].name === chosenRequest.text) {
        selectedModelPortfolio = modelPortfolios[i];
        break;
      }
    }
    selectModelPortfolio(selectedModelPortfolio);
  };


  return (
    <div className={cx('model-portfolios-autocomplete-container')}>
      <AutoComplete
                  hintText="Select model portfolio..."
                  filter={AutoComplete.caseInsensitiveFilter}
                  openOnFocus
                  dataSource={displayModelPortfoliosElements}
                  onNewRequest={handleOnNewRequest}
                  fullWidth />
    </div>
  );
};

ModelPortfoliosAutoComplete.propTypes = {
  selectModelPortfolio: PropTypes.func.isRequired,
  modelPortfolios: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired
};

export default ModelPortfoliosAutoComplete;
