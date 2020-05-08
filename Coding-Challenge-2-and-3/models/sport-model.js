const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

const sportSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    num_players: {
        type: String
    }
});

const sportsCollection = mongoose.model('sports', sportSchema);

const Sports = {
    deleteSport: function(id)
    {
        return sportsCollection.deleteOne({id: id}).then(results => {
            return results;
        }).catch(e => {
            return e;
        });
    }
};

module.exports = {
    Sports
};