import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ message, timestamp, level }) => {
      return trataLogInfo(message, timestamp, level);
    })
  ),
  transports: [new transports.Console()]
});

const errorLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.printf(({ message, timestamp, level }) => {
      return trataLogError(message, timestamp, level);
    })
  ),
  transports: [new transports.Console()]
});

function trataLogInfo(message: string, timestamp: string, level: string) {
  return `{${chalk.magenta('message')}:${message}, ${chalk.blue('timestamp')}:${timestamp}, ${chalk.yellow('level')}:${level}}`;
}

function trataLogError(message: string, timestamp: string, level: string) {
  return `{${chalk.red('message')}:${message}, ${chalk.red('timestamp')}:${timestamp}, ${chalk.red('level')}:${level}}`;
}

export { logger, errorLogger };
