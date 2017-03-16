import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import NavigationSubdirectoryArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import classNames from 'classnames/bind';
import AutoComplete from './CustomMaterialUIAutoComplete';
import styles from '../../css/components/portfolioselection/model-portfolios-auto-complete';

const cx = classNames.bind( styles );

const TestAutoComplete = ({searchText, onUpdateInput, dataSource, onItemTouch, toggleModelPortfolioGroupOpenness}) => {
  const handleOnNewRequest = function handleOnNewRequest( chosenRequest ) {
    return false;
  };

  const processDisplayModelPortfolioElementRecursive = function processDisplayModelPortfolioElementRecursive( displayModelPortfolioElement, depth, displayModelPortfolioComponents ) {
    let isGroup = false;
    let onTouchTap = null;
    let leftIcon = null;
    let rightIcon = null;
    let displayClass = '';
    if ( displayModelPortfolioElement.children.length > 0 ) {
      isGroup = true;
      onTouchTap = function onTouchTap() {
        toggleModelPortfolioGroupOpenness( displayModelPortfolioElement.position );
      }
      if ( displayModelPortfolioElement.open ) {
        rightIcon = <NavigationExpandLess />;
      } else {
        rightIcon = <NavigationExpandMore />;
      }
    } else {
      onTouchTap = function onTouchTap() {
        onItemTouch( displayModelPortfolioElement.modelPortfolio );
      }
    }
    if ( displayModelPortfolioElement.position.length - 1> 0 ) {
      leftIcon = <NavigationSubdirectoryArrowRight />;
      displayClass = 'model-portfolios-auto-complete-menu-item-nested';

    }
    displayModelPortfolioComponents.push( {
      text: '',
      value: <MenuItem
                       isGroup={isGroup}
                       onTouchTap={ onTouchTap }
                       primaryText={ displayModelPortfolioElement.displayName }
                       leftIcon={ leftIcon }
                       rightIcon={ rightIcon }
                       className={ cx( 'model-portfolios-auto-complete-menu-item',
                        'model-portfolios-auto-complete-menu-item-level-' + (displayModelPortfolioElement.position.length - 1).toString(),
                         displayClass) } />
    } );
    if ( displayModelPortfolioElement.children ) {
      if ( displayModelPortfolioElement.open ) {
        for (const child of displayModelPortfolioElement.children) {
          processDisplayModelPortfolioElementRecursive( child, depth + 1, displayModelPortfolioComponents );
        }
      }
    }
  };

  const getDisplayModelPortfoliosComponents = function getDisplayModelPortfoliosComponents( displayModelPortfolios ) {
    const displayModelPortfolioComponents = [];
    for (const displayModelPortfolio of displayModelPortfolios) {
      processDisplayModelPortfolioElementRecursive( displayModelPortfolio, 0, displayModelPortfolioComponents );
    }
    return displayModelPortfolioComponents;
  };
  const displayModelPortfolioComponents = getDisplayModelPortfoliosComponents( dataSource );

  return (
  <AutoComplete
                searchText={ searchText }
                onUpdateInput={ onUpdateInput }
                floatingLabelText="Select model portfolio..."
                filter={ AutoComplete.caseInsensitiveFilter }
                menuCloseDelay={ 50 }
                openOnFocus={ true }
                dataSource={ displayModelPortfolioComponents }
                open={ false }
                onNewRequest={ handleOnNewRequest }
                fullWidth />
  );
};

TestAutoComplete.propTypes = {
  searchText: PropTypes.string.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
  modelPortfolios: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  selectModelPortfolio: PropTypes.func.isRequired
};

export default TestAutoComplete;
