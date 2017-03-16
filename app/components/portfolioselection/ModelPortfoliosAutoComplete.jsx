import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionGroupWork from 'material-ui/svg-icons/action/group-work';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import classNames from 'classnames/bind';
import styles from '../../css/components/portfolioselection/model-portfolios-auto-complete';

const cx = classNames.bind( styles );

const ModelPortfoliosAutoComplete = ({searchText, onUpdateInput, modelPortfolios, email, selectModelPortfolio}) => {
  const getDefaultModelPortfolios = function getDefaultModelPortfolios( givenModelPortfolios ) {
    const defaultModelPortfolios = [];
    for (let i = 0; i < givenModelPortfolios.length; i++) {
      if ( !givenModelPortfolios[ i ].email ) {
        defaultModelPortfolios.push( givenModelPortfolios[ i ] );
      }
    }
    return defaultModelPortfolios;
  };
  const defaultModelPortfolios = getDefaultModelPortfolios( modelPortfolios );

  const getUserModelPortfolios = function getUserModelPortfolios( givenModelPortfolios, givenEmail ) {
    const userModelPortfolios = [];
    for (let i = 0; i < givenModelPortfolios.length; i++) {
      if ( givenModelPortfolios[ i ].email === givenEmail ) {
        userModelPortfolios.push( givenModelPortfolios[ i ] );
      }
    }
    return userModelPortfolios;
  };
  const userModelPortfolios = getUserModelPortfolios( modelPortfolios, email );

  const sortModelPortfoliosAlphabeticaly = function sortModelPortfoliosAlphabeticaly( modelPortfolioA, modelPortfolioB ) {
    const modelPortfolioNameA = modelPortfolioA.name.toUpperCase();
    const modePortfolioNameB = modelPortfolioB.name.toUpperCase();
    if ( modelPortfolioNameA < modePortfolioNameB ) {
      return -1;
    } else if ( modelPortfolioNameA > modePortfolioNameB ) {
      return 1;
    }
    return 0;
  };

  const generateDisplayModelPortfolios = function generateDisplayModelPortfolios( givenDefaultModelPortfolios, givenUserModelPorfolios ) {
    givenDefaultModelPortfolios.sort( sortModelPortfoliosAlphabeticaly );
    givenUserModelPorfolios.sort( sortModelPortfoliosAlphabeticaly );
    const displayModelPortfolios = [];
    if ( givenUserModelPorfolios.length === 0 ) {
      for (let i = 0; i < givenDefaultModelPortfolios.length; i++) {
        displayModelPortfolios.push( {
          name: givenDefaultModelPortfolios[ i ].name
        } );
      }
    } else {
      displayModelPortfolios.push( {
        name: 'USER_MODEL_PORTFOLIOS_GROUP'
      } );
      for (let i = 0; i < givenUserModelPorfolios.length; i++) {
        displayModelPortfolios.push( {
          name: givenUserModelPorfolios[ i ].name,
          isCustom: 1
        } );
      }
      displayModelPortfolios.push( {
        name: 'DEFAULT_MODEL_PORTFOLIOS_GROUP'
      } );
      for (let i = 0; i < givenDefaultModelPortfolios.length; i++) {
        displayModelPortfolios.push( {
          name: givenDefaultModelPortfolios[ i ].name,
          isCustom: 0
        } );
      }
    }
    return displayModelPortfolios;
  };

  const displayModelPortfolios = generateDisplayModelPortfolios( defaultModelPortfolios, userModelPortfolios );

  const displayModelPortfoliosElements = displayModelPortfolios.map( (modelPortfolio) => {
    switch (modelPortfolio.name) {
      case 'USER_MODEL_PORTFOLIOS_GROUP':
        return {
          text: '',
          value: (<MenuItem
                            disabled
                            primaryText="Custom Model Portfolios" />)
        };
      case 'DEFAULT_MODEL_PORTFOLIOS_GROUP':
        return {
          text: '',
          value: (<MenuItem
                            disabled
                            primaryText="Default Model Portfolios" />)
        };
      default:
        switch (modelPortfolio.isCustom) {
          case 0:
            return {
              text: modelPortfolio.name,
              value: (<MenuItem
                                primaryText={ modelPortfolio.name }
                                leftIcon={ <ActionGroupWork /> }
                                className={ cx( 'model-portfolios-auto-complete-menu-item' ) } />)
            };
          case 1:
            return {
              text: modelPortfolio.name,
              value: (<MenuItem
                                primaryText={ modelPortfolio.name }
                                leftIcon={ <EditorModeEdit /> }
                                className={ cx( 'model-portfolios-auto-complete-menu-item' ) } />)
            };
          default:
            return {
              text: modelPortfolio.name,
              value: (<MenuItem
                                primaryText={ modelPortfolio.name }
                                className={ cx( 'model-portfolios-auto-complete-menu-item' ) } />)
            };
        }
    }
  } );

  const handleOnNewRequest = function handleOnNewRequest( chosenRequest ) {
    for (let i = 0; i < userModelPortfolios.length; i++) {
      if ( userModelPortfolios[ i ].name === chosenRequest.text ) {
        selectModelPortfolio( userModelPortfolios[ i ] );
        return;
      }
    }
    for (let i = 0; i < defaultModelPortfolios.length; i++) {
      if ( defaultModelPortfolios[ i ].name === chosenRequest.text ) {
        selectModelPortfolio( defaultModelPortfolios[ i ] );
        return;
      }
    }
  };

  return (
  <div className={ cx( 'model-portfolios-auto-complete-container' ) }>
    <AutoComplete
                  searchText={ searchText }
                  onUpdateInput={ onUpdateInput }
                  dataSource={ displayModelPortfoliosElements }
                  onNewRequest={ handleOnNewRequest }
                  filter={ AutoComplete.caseInsensitiveFilter }
                  hintText="Select model portfolio..."
                  openOnFocus
                  fullWidth />
  </div>
  );
};

ModelPortfoliosAutoComplete.propTypes = {
  searchText: PropTypes.string.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
  modelPortfolios: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  selectModelPortfolio: PropTypes.func.isRequired
};

export default ModelPortfoliosAutoComplete;
