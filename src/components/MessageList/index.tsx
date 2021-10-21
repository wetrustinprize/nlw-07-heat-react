import style from "./style.module.scss";
import io from "socket.io-client";
import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

const socket = io("http://localhost:4000");
const messageQueue: Message[] = [];

socket.on("new_message", (newMessage: Message) => {
  messageQueue.push(newMessage);
});

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages((prevState) =>
          [messageQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messageQueue.shift();
      }
    }, 3000);
  }, [messageQueue]);

  useEffect(() => {
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  });

  return (
    <div className={style.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={style.messageList}>
        {messages.map((message) => {
          return (
            <li key={message.id} className={style.message}>
              <p className={style.messageContent}>{message.text}</p>
              <div className={style.messageUser}>
                <div className={style.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { MessageList };
