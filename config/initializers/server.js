import path         from 'path'
import express      from 'express'
import bodyParser   from 'body-parser'
import config       from 'nconf'
import logger       from'../../lib/logger'
import routes       from '../../app/routes/index'

export default function () {
    var app = express();
    
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    logger.info('[PUBLIC DIR] ' + path.join(config.get('PUBLIC_DIR')));
    app.use(express.static(config.get('PUBLIC_DIR'))); //static files
    
    // Error handler
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: (app.get('env') === 'development' ? err : {})
        });
        next(err);
    });
    
    // REGISTERING ROUTES -------------------------------
    // all of our routes will be prefixed with /api
    app.use('/api', routes)
    
    // START THE SERVER
    // =============================================================================
    app.listen(config.get('NODE_PORT'));
    logger.info('[SERVER] Listening on port ' + config.get('NODE_PORT'));
    
    return app
    // if (cb) {
    //     return cb();
    // }
}