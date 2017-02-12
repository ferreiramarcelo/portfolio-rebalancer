/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const Topic = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  securities: [{
		symbol: String,
		allocation: {type: Number, min: 0, max: 100},
	}]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('modelportfolio', Topic);
