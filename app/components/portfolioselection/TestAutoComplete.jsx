import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import NavigationSubdirectoryArrowRight from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import classNames from 'classnames/bind';
import styles from '../../css/components/portfolioselection/model-portfolios-auto-complete';

const cx = classNames.bind( styles );



const TestAutoComplete = ({searchText, onUpdateInput, dataSource, onNewRequest}) => {

  const dataSource3 = [
    {
      text: '',
      value: <MenuItem
                       primaryText="Canadian Couch Potato"
                       rightIcon={ <NavigationExpandLess /> } />
    },
    {
      text: '',
      value: <MenuItem
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       rightIcon={ <NavigationExpandMore /> }
                       primaryText="TD e-Series Funds" />
    },
    {
      text: '',
      value: <MenuItem
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       rightIcon={ <NavigationExpandMore /> }
                       primaryText="Exchange Traded Funds" />
    },
    {
      text: '',
      value: <MenuItem
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       style={ { paddingLeft: '60px' } }
                       rightIcon={ <NavigationExpandMore /> }
                       primaryText="2016" />
    },
    {
      text: '',
      value: <MenuItem
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       style={ { paddingLeft: '60px' } }
                       rightIcon={ <NavigationExpandMore /> }
                       primaryText="2017" />
    },
    {
      text: '',
      value: <MenuItem
                       primaryText="Aggressive"
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       style={ { paddingLeft: '120px' } } />
    },
    {
      text: '',
      value: <MenuItem
                       primaryText="Conservative"
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       style={ { paddingLeft: '120px' } } />
    },
    {
      text: '',
      value: <MenuItem
                       primaryText="Cautious"
                       leftIcon={ <NavigationSubdirectoryArrowRight /> }
                       style={ { paddingLeft: '120px' } } />
    },
  ];

  const dataSource4 = [
    {
      text: '',
      value: <MenuItem
                       primaryText="Canadian Couch Potato"
                       rightIcon={ <NavigationExpandMore /> }
                       onTouchTap={ onNewRequest }
                     />
    },
  ];

  const handleOnNewRequest = function handleOnNewRequest( chosenRequest ) {
    return false;
  };

  const exampleModelPortfolio = {
    id: 'xd',
    position: [
      0,
      0,
      0
    ],
    displayName: 'Aggressive'
  };

  const exampleModelPortfolio2 = {
    id: 'xd2',
    position: [
      0,
      0,
      1
    ],
    displayName: 'Conservative'
  };

  const exampleChildCategory = {
    position: [
      0,
      0
    ],
    open: true,
    displayName: 'Exchange Traded Funds',
    children: [
      exampleModelPortfolio,
      exampleModelPortfolio2
    ]
  };

  const exampleChildCategory2 = {
    position: [
      0,
      1
    ],
    open: false,
    displayName: 'TD e-Series Funds',
    children: []
  };

  const exampleGroup = {
    position: [
      0
    ],
    open: true,
    displayName: 'Canadian Couch Potato',
    children: [
      exampleChildCategory,
      exampleChildCategory2
    ]
  };

  const exampleGroup2 = {
    position: [
      0
    ],
    open: false,
    displayName: 'Canadian Portfolio Manager',
    children: [
      exampleChildCategory2
    ]
  };

  const exampleDisplayModelPortfolios = [exampleGroup, exampleGroup2];




  const processDisplayModelPortfolioElementRecursive = function processDisplayModelPortfolioElementRecursive( displayModelPortfolioElement, depth, displayModelPortfolioComponents ) {
    let onTouchTap = null;
    let leftIcon = null;
    let rightIcon = null;
    let displayClass = '';
    if ( displayModelPortfolioElement.children ) {
      //onTouchTap = openModelPortfolioGroup(displayModelPortfolioElement.position);
      if ( displayModelPortfolioElement.open ) {
        rightIcon = <NavigationExpandLess />;
      } else {
        rightIcon = <NavigationExpandMore />;
      }
    }
    if ( depth > 0 ) {
      leftIcon = <NavigationSubdirectoryArrowRight />;
      displayClass = 'model-portfolios-auto-complete-menu-item-child';
    }
    displayModelPortfolioComponents.push( {
      text: '',
      value: <MenuItem
                       onTouchTap={ displayModelPortfolioElement.setOpen }
                       primaryText={ displayModelPortfolioElement.displayName }
                       leftIcon={ leftIcon }
                       rightIcon={ rightIcon }
                       style={ { paddingLeft: (depth - 1) * 60 + 'px' } }
                       className={cx(displayClass)} />
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
                floatingLabelText="Same text, different values"
                filter={ AutoComplete.noFilter }
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
