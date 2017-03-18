import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import classNames from 'classnames/bind';
import styles from '../../css/components/portfolioselection/new-portfolio-button';

const cx = classNames.bind(styles);

const CurrencyDropDownMenu = ({ currencies, setTradingCurrency }) => {
  const getCurrencyDropDownMenu = function getDropDownMenu() {
    if (currencies.listOfDistinctCurrencies.length < 2) {
      return null;
    }
    const getDropDownMenuItems = function getDropDownMenuItems(givenCurrencies) {
      const dropDownMenuItems = [];
      for (const currency in givenCurrencies.listOfDistinctCurrencies) {
        if (givenCurrencies.listOfDistinctCurrencies.hasOwnProperty(currency)) {
          dropDownMenuItems.push(<MenuItem
                                  value={currency}
                                  primaryText={currency} />);
        }
      }
      return dropDownMenuItems;
    };
    const dropDownMenuItems = getDropDownMenuItems(currencies);

    const handleChange = function handleChange(event, index, value) {
      setTradingCurrency(value);
    };
    return (<div>             <span>Trading currency:</span>
      <DropDownMenu value={currencies.tradingCurrency} onChange={handleChange}>
        {dropDownMenuItems}
      </DropDownMenu></div>);
  };
  const currencyDropDownMenu = getCurrencyDropDownMenu();

  return (
    <div>
      {currencyDropDownMenu}
    </div>
  );
};

CurrencyDropDownMenu.propTypes = {
  createNewModelPortfolio: PropTypes.func.isRequired,
};

export default CurrencyDropDownMenu;
