const amqplib = require('amqplib/callback_api');
import { registerMail } from '../utils/user.util';
const queue = 'register';

//sender callback
export const sender = (data) => amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err,channel1) => {
        if (err) throw err;
        channel1.assertQueue(queue);
        channel1.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    
    });
});

//receiver callback
const receiver = () => amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch2) => {
    if (err) throw err;
    
    ch2.assertQueue(queue);
    ch2.consume(queue, (data) => {
      if (data !== null) {
        const msg = JSON.parse(data.content.toString());
        ch2.ack(data);
        registerMail(msg.EmailId);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });
});

receiver();