import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import NavigationSubdirectoryArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import SocialGroup from 'material-ui/svg-icons/social/group';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import classNames from 'classnames/bind';
import AutoComplete from './CustomMaterialUIAutoComplete';
import styles from '../../css/components/portfolioselection/model-portfolios-auto-complete';

const cx = classNames.bind(styles);

const TestAutoComplete = ({searchText, onUpdateInput, modelPortfolios, onItemTouch, toggleModelPortfolioGroupOpenness}) => {
  const handleOnNewRequest = function handleOnNewRequest(chosenRequest) {
    return false;
  };

  const processDisplayModelPortfolioElementRecursiveEmptySearchText = function processDisplayModelPortfolioElementRecursiveEmptySearchText(displayModelPortfolioElement, depth, displayModelPortfolioComponents) {
    let isGroup = false;
    let onTouchTap = null;
    let leftIcon = null;
    let rightIcon = null;
    let displayClass = '';
    if (displayModelPortfolioElement.children.length > 0) {
      isGroup = true;
      onTouchTap = function onTouchTap() {
        toggleModelPortfolioGroupOpenness(displayModelPortfolioElement.position);
      };
      if (displayModelPortfolioElement.open) {
        rightIcon = <NavigationExpandLess />;
      } else {
        rightIcon = <NavigationExpandMore />;
      }
    } else {
      onTouchTap = function onTouchTap() {
        onItemTouch(displayModelPortfolioElement.modelPortfolio);
      };
    }
    if (displayModelPortfolioElement.position.length - 1 > 0) {
      leftIcon = <NavigationSubdirectoryArrowRight />;
      displayClass = 'model-portfolios-auto-complete-menu-item-nested';
    }
    displayModelPortfolioComponents.push({
      text: '',
      value: <MenuItem isGroup={ isGroup } onTouchTap={ onTouchTap } primaryText={ displayModelPortfolioElement.displayName } leftIcon={ leftIcon } rightIcon={ rightIcon }
               className={ cx('model-portfolios-auto-complete-menu-item',
                             'model-portfolios-auto-complete-menu-item-level-' + (displayModelPortfolioElement.position.length - 1).toString(),
                             displayClass) } />
    });
    if (displayModelPortfolioElement.children) {
      if (displayModelPortfolioElement.open) {
        for (const child of displayModelPortfolioElement.children) {
          processDisplayModelPortfolioElementRecursiveEmptySearchText(child, depth + 1, displayModelPortfolioComponents);
        }
      }
    }
  };

  const processDisplayModelPortfolioElementRecursiveWithSearchText = function processDisplayModelPortfolioElementRecursiveWithSearchText(modelPortfolio, isDefault, displayModelPortfolioComponents) {
    if (isDefault && (modelPortfolio.subGroups.length > 0 || modelPortfolio.modelPortfolios.length > 0)) {
      for (const subGroup of modelPortfolio.subGroups) {
        processDisplayModelPortfolioElementRecursiveWithSearchText(subGroup, true, displayModelPortfolioComponents);
      }
      for (const modelPortfolio of modelPortfolio.modelPortfolios) {
        processDisplayModelPortfolioElementRecursiveWithSearchText(modelPortfolio, true, displayModelPortfolioComponents);
      }
    } else {
      const onTouchTap = function onTouchTap() {
        onItemTouch(modelPortfolio);
      };
      const leftIcon = isDefault ? <SocialGroup /> : <EditorModeEdit />;
      displayModelPortfolioComponents.push({
        text: modelPortfolio.name,
        value: <MenuItem onTouchTap={ onTouchTap } primaryText={ modelPortfolio.name } leftIcon={ leftIcon } className={ cx('model-portfolios-auto-complete-menu-item') } />
      });
    }
  };

  const getDisplayModelPortfoliosComponents = function getDisplayModelPortfoliosComponents(givenSearchText, modelPortfolios) {
    const displayModelPortfolioComponents = [];
    if (!modelPortfolios.displayModelPortfolios || !modelPortfolios.userModelPortfolios || !modelPortfolios.defaultModelPortfolios) {
      return displayModelPortfolioComponents;
    }
    if (!givenSearchText) {
      for (const displayModelPortfolio of modelPortfolios.displayModelPortfolios) {
        processDisplayModelPortfolioElementRecursiveEmptySearchText(displayModelPortfolio, 0, displayModelPortfolioComponents);
      }
    } else {
      for (const userModelPortfolio of modelPortfolios.userModelPortfolios) {
        processDisplayModelPortfolioElementRecursiveWithSearchText(userModelPortfolio, false, displayModelPortfolioComponents);
      }
      for (const defaultModelPortfolio of modelPortfolios.defaultModelPortfolios) {
        processDisplayModelPortfolioElementRecursiveWithSearchText(defaultModelPortfolio, true, displayModelPortfolioComponents);
      }
    }
    return displayModelPortfolioComponents;
  };
  const displayModelPortfolioComponents = getDisplayModelPortfoliosComponents(searchText, modelPortfolios);

  return (
    <AutoComplete searchText={ searchText } onUpdateInput={ onUpdateInput } floatingLabelText="Select model portfolio..." filter={ AutoComplete.fuzzyFilter } menuCloseDelay={ 50 }
      openOnFocus dataSource={ displayModelPortfolioComponents } open={ false } onNewRequest={ handleOnNewRequest } fullWidth />
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
