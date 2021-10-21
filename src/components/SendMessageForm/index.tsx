import { FormEvent, useContext, useState } from "react";
import { VscSignOut, VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../contexts/auth";
import { api } from "../../services/api";
import style from "./styles.module.scss";

const SendMessageForm = () => {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("message", { message });

    setMessage("");
  }

  return (
    <div className={style.sendMessageFormWrapper}>
      <button onClick={signOut} className={style.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={style.userInformation}>
        <div className={style.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={style.userName}>{user?.name}</strong>
        <span className={style.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form className={style.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
};

export { SendMessageForm };