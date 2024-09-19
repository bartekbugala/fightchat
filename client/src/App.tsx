import { useState, useEffect } from 'react';
import './App.css';
// import { useEffect } from 'react';
// import useExternalScript from './hooks/useExternalScript';
import * as io from 'socket.io-client';
const socket = io.connect('http://localhost:8080');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [msgEvents, setMsgEvents] = useState([]);
  const [value, setValue] = useState({ text: '' });
  const [isLoading, setIsLoading] = useState(false);

  // const externalScript = 'app.js';

  // const scriptStatus = useExternalScript(externalScript);
  // useEffect(() => {
  //   if (scriptStatus === 'ready') {
  //     // Do something with it
  //   }
  // }, [scriptStatus]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMsgEvent(value: string) {
      setMsgEvents((previous) => {
        if (previous.length === 0) return [value];
        if (previous.length > 0) return [...previous, value];
      });
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMsgEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMsgEvent);
    };
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('message', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <h1>pageworks - chat II</h1>
      <section className="row">
        <article className="chat">
          <ul id="chat-ul">
            {msgEvents.map((msg, idx) => (
              <li key={idx}>
                {msg.username}:
                {msg.text}
              </li>
            ))}
          </ul>
          <div className="row">
            <input
              onChange={(e) => setValue({ text: e.target.value })}
              placeholder="message"
              id="chat-input"
            />
            <button id="chat-button" onClick={onSubmit}>
              SEND IO
            </button>
          </div>
        </article>
        <article className="name">
          <ul id="name-ul"></ul>
          <div className="row" id="name-row">
            <input placeholder="input username" id="name-input" />
            <button id="name-button">SEND IO</button>
          </div>
        </article>
      </section>
    </>
  );
}

export default App;
