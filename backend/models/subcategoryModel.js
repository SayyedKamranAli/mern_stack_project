const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, 'Name should have more than 4 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
        maxLength: [100, 'Title cannot exceed 100 characters'],
        minLength: [4, 'Title should have more than 4 characters']
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active'
    },
    profile: String,
    profileName: String,

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null // Generates a new ObjectId by default
    }
});

module.exports = mongoose.model('SubCategory', SubcategorySchema);
