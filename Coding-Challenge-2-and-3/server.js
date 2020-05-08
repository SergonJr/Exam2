const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();


app.delete('/sports/delete', (req, res) => {
    let id = req.params.id;

    if (!id)
    {
        res.statusMessage = "Id not sent in params";
        return res.status(406).json();
    }

    let sportId = req.params.sportId;

    if (!sportId)
    {
        res.statusMessage = "Sport Id not sent in params";
        return res.status(406).json();
    }

    if (id != sportId)
    {
        res.statusMessage = "IDs do not match";
        return res.status(409).json();
    }

    let sportToRemove = sports.findIndex( (sport) => {
        if (sport.id === id && sport.sportId === sportId)
        {
            return true;
        }
    });

    if (sportToRemove < 0)
    {
        res.statusMessage = "Sport not found";
        return res.status(404).json();
    }

    sports.splice(sportToRemove, 1);
    return res.status(204).end();
})

app.delete('/sportsMongo/delete', (req, res) => {
    let id = req.params.id;

    Sports.deleteSport(id).then(result => {
        if (result.deletedCount > 0)
        {
            return res.status(200).end();
        }
        else
        {
            res.statusMessage = "The sport was not found";
            return res.status(404).json();
        }
    }).catch(e => {
        res.statusMessage = "Something went wrong with the db";
        return res.status(409).json();
    })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});