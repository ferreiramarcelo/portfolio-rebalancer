import _ from 'lodash';
import ModelPortfolio from '../models/modelPortfolio';

export function all(req, res) {
  ModelPortfolio.find({}).exec((err, modelPortfolios) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(modelPortfolios);
  });
}

export function add(req, res) {
  ModelPortfolio.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

export function update(req, res) {
  const query = { id: req.params.id };
  const isFull = req.body.isFull;
  const omitKeys = ['id', 'id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    ModelPortfolio.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else {
    ModelPortfolio.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

export function remove(req, res) {
  const query = { id: req.params.id };
  ModelPortfolio.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove
};
