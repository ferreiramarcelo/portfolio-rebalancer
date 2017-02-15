import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/modelPortfolio';
import * as types from 'types';

describe('ModelPortfolios reducer', () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function createModelPortfolio() {
    return Array(5).join().split(',')
    .map(() => {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
  }

  const modelPortfolio = createModelPortfolio();

  function createData() {
    return {
      text: createModelPortfolio(),
      id: md5.hash(createModelPortfolio()),
      count: Math.floor(Math.random() * 100)
    };
  }

  const data = createData();

  function createModelPortfolios(x) {
    const arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(createData());
    }
    return arr;
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        modelPortfolios: [],
        newModelPortfolio: ''
      }
    );
  });

  it('Should add a new modelPortfolio to an empty initial state', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: 1,
        text: modelPortfolio
      })
    ).toEqual({
        modelPortfolios: [
          {
            id: data.id,
            count: 1,
            text: modelPortfolio
          }
        ],
        newModelPortfolio: ''
    });
  });

  it('Should handle TYPING', () => {
    expect(
      reducer(undefined, {
        type: types.TYPING,
        newModelPortfolio: modelPortfolio
      })
    ).toEqual({
        modelPortfolios: [],
        newModelPortfolio: modelPortfolio
    });
  });

  it('Should handle CREATE_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_REQUEST
      })
    ).toEqual({
        modelPortfolios: [],
        newModelPortfolio: ''
    });
  });

  it('Should handle REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_SUCCESS,
        data: modelPortfolio
      })
    ).toEqual({
        modelPortfolios: modelPortfolio,
        newModelPortfolio: ''
    });
  });

  it('Should handle CREATE_TOPIC_REQUEST', () => {
    const modelPortfolios = createModelPortfolios(20);
    const newModelPortfolios = [...modelPortfolios, data];
    expect(
      reducer({
        modelPortfolios
      },
      {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text

      })
    ).toEqual({
        newModelPortfolio: '',
        modelPortfolios: newModelPortfolios
    });
  });

  it('should handle CREATE_TOPIC_FAILURE', () => {
    const modelPortfolios = createModelPortfolios(20);
    modelPortfolios.push(data);
    const newModelPortfolios = [...modelPortfolios];
    expect(
      reducer({
        modelPortfolios,
        newModelPortfolio: modelPortfolio
      },
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id
      })
    ).toEqual({
        modelPortfolios: newModelPortfolios.pop() && newModelPortfolios,
        newModelPortfolio: modelPortfolio
    });
  });

  it('should handle DESTROY_TOPIC', () => {
    const modelPortfolios = createModelPortfolios(20);
    modelPortfolios.push(data);
    const newModelPortfolios = [...modelPortfolios];
    expect(
      reducer({
        modelPortfolios,
        newModelPortfolio: modelPortfolio
      },
      {
        type: types.DESTROY_TOPIC,
        id: modelPortfolios[modelPortfolios.length - 1].id,
      })
    ).toEqual({
        modelPortfolios: newModelPortfolios.pop() && newModelPortfolios,
        newModelPortfolio: modelPortfolio
    });
  });

  it('should handle INCREMENT_COUNT', () => {
    const modelPortfolios = createModelPortfolios(20);
    const newModelPortfolios = [...modelPortfolios];
    modelPortfolios.push(data);
    const newData = Object.assign({}, data);
    newData.count++;
    newModelPortfolios.push(newData);

    expect(
      reducer({
        modelPortfolios,
        newModelPortfolio: modelPortfolio
      },
      {
        type: types.INCREMENT_COUNT,
        id: modelPortfolios[modelPortfolios.length - 1].id,
      })
    ).toEqual({
        modelPortfolios: newModelPortfolios,
        newModelPortfolio: modelPortfolio
    });
  });

  it('should handle DECREMENT_COUNT', () => {
    const modelPortfolios = createModelPortfolios(20);
    const newModelPortfolios = [...modelPortfolios];
    modelPortfolios.push(data);
    const newData = Object.assign({}, data);
    newData.count--;
    newModelPortfolios.push(newData);

    expect(
      reducer({
        modelPortfolios,
        newModelPortfolio: modelPortfolio
      },
      {
        type: types.DECREMENT_COUNT,
        id: modelPortfolios[modelPortfolios.length - 1].id,
      })
    ).toEqual({
        modelPortfolios: newModelPortfolios,
        newModelPortfolio: modelPortfolio
    });
  });
});
