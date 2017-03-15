import mongoose from 'mongoose';

const ModelPortfolioSchema = new mongoose.Schema({
  id: String,
  name: String,
  displayName: String,
  email: String,
  securities: [{
		symbol: String,
		allocation: {type: Number, min: 0, max: 100},
	}]
});

ModelPortfolioSchema.add({
  subGroups: [ModelPortfolioSchema],
  modelPortfolios: [ModelPortfolioSchema],
});

export default mongoose.model('ModelPortfolio', ModelPortfolioSchema);
