const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe