import winston from 'winston'

let logger
const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
        const {
            timestamp, level, message
        } = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');
        // return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        return `${ts} [${level}]: ${message}`;
    }),
);

if (!logger) 
{
    logger = winston.createLogger({
        level: 'info',
        format: format,
    
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.Console()
            //   new winston.transports.File({ filename: 'error.log', level: 'error' }),
            //   new winston.transports.File({ filename: 'combined.log' })
        ]
    });
}

export default logger