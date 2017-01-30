/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const Topic = new mongoose.Schema({
  _id: String,
  name: String,
  userEmail: String,
  securities: [{
		ticker: String,
		allocation: {type: Number, min: 0, max: 100},
	}]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('test_modelportfolio', Topic);

