//get the class 
const Logger = require('./EventModule');
//create obj
const logger = new Logger();
//register lisener
logger.on('messagedLogged', (arg) => {
    console.log('Listener called', arg);
});
logger.log('Responding to event');