import mongoose from 'mongoose';
import ModelPortfolio from './modelPortfolio';

const ModelPortfolio34Schema = new mongoose.Schema({
  id: String,
  name: String,
  displayName: String,
  subGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ModelPortfolioGroup' }],
  modelPortfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ModelPortfolioGroup' }],
  securities: [{
		symbol: String,
		allocation: {type: Number, min: 0, max: 100},
	}]
});

export default mongoose.model('ModelPortfolio345', ModelPortfolio34Schema);
