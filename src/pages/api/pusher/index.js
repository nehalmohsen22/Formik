import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: '1491481',
  key: '74b83b4b3cf043d70186',
  secret: '1c62948d0602872e30cd',
  cluster: 'eu',
  useTLS: true,
});

export default async function handler(req, res) {
  const { message } = req.body;
  await pusher
    .trigger('chat-suiiz', 'message', {
      message,
    })
    .then((data) => {
      console.log(data);
    });
  res.json({ message });

  res.end();
}
