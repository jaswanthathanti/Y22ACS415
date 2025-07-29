class Logger {
  constructor() {
    this.logs = [];
  }

  log(message, level = "info", data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, data };
    this.logs.push(logEntry);

    console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, data);
  }

  info(message, data) {
    this.log(message, "info", data);
  }

  warn(message, data) {
    this.log(message, "warn", data);
  }

  error(message, data) {
    this.log(message, "error", data);
  }

  getLogs() {
    return this.logs;
  }
}

export const logger = new Logger();
