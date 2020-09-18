//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
let DiagnosticSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
    },
});

// Duplicate the ID field.
DiagnosticSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
DiagnosticSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const DiagnosticList = module.exports = mongoose.model('DiagnosticList', DiagnosticSchema);

module.exports.getAll = (query, callback) => {
    try {
        DiagnosticList.find(function (err, items) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, items, items.length);
            }
        });

    } catch (err) {
        console.log('err', err);
    }
};

module.exports.getById = (id, callback) => {
    let query = {
        _id: id
    };
    DiagnosticList.find(query, callback);
};

//newTask.save is used to insert the document into MongoDB
module.exports.add = (newItem, callback) => {
    newItem.save(callback);
};

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteById = (id, callback) => {
    let query = {
        _id: id
    };
    DiagnosticList.remove(query, callback);
};

// we will use findByIdAndUpdate() which will find and update in one shot
module.exports.updateById = (id, updatedItem, callback) => {
    DiagnosticList.findByIdAndUpdate(id, {
        $set: {
            title: updatedItem.title,
            description: updatedItem.description,
            category: updatedItem.category,
        }
    }, {
        new: true
    }, callback);
};