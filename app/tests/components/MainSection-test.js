import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainSection from '../components/MainSection';
import ModelPortfolioItem from '../components/ModelPortfolioItem';

const emptyData = [];
const modelPortfolioItemData = [{
  text: '',
  id: '',
  index: 0,
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
}];
const stubFunctions = {
  onIncrement: () => {},
  onDecrement: () => {},
  onDestroy: () => {}
};

describe('<MainSection />', () => {
  describe('With ModelPortfolios', () => {
    it('should render <ModelPortfolioItem> list items', () => {
      expect(mount(<MainSection modelPortfolios={modelPortfolioItemData} {...stubFunctions} />).find(ModelPortfolioItem).length).toBe(1);
    });
  });

  describe('Without ModelPortfolios', () => {
    it('should not render <ModelPortfolioItem> list items', () => {
      expect(mount(<MainSection modelPortfolios={emptyData} {...stubFunctions} />).find(ModelPortfolioItem).length).toBe(0);
    });
  });
});
