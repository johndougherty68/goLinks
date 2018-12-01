const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const level = process.env.LOG_LEVEL || 'debug';
require('winston-daily-rotate-file');

var options = {
    file: {
    level: level,
    filename: 'logs/urlMapper-%DATE%.log',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.simple()
    ),
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    json: true,
    maxsize: 15242880, // ~15MB
    maxFiles: 14,
    colorize: false,
    },
    console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    },
};

const logger = createLogger({
    transports: [
        new transports.DailyRotateFile(options.file),
        //new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
module.exports = logger