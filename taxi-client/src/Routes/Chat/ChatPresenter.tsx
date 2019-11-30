import React from "react";
import Layout from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import styled from "../../typed-components";
import { getChat, userProfile } from "../../types/api";

const Chat = styled.div`
  height: 65vh;
  overflow: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  text-align: center;
  padding: 0 20px;
`;

interface IProps {
  data?: getChat;
  loading: boolean;
  userData?: userProfile;
  messageText: string;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatPresenter: React.FC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onSubmit,
  onInputChange
}) => (
  <Layout minHeight="80%">
    {chat ? (
      <Header title="Chat" backTo={`/ride/${chat.rideId}`} />
    ) : (
      <Header title="Chat" />
    )}

    {!loading && chat && user && (
      <>
        <Chat>
          {chat.messages &&
            chat.messages.map(message => {
              if (message) {
                return (
                  <Message
                    key={message.id}
                    mine={user.id === message.userId}
                    text={message.text}
                  />
                );
              }
              return null;
            })}
        </Chat>
        <InputContainer>
          <Form submitFn={onSubmit}>
            <Input
              width="70%"
              placeholder="Type your message"
              onChange={onInputChange}
              value={messageText}
              name="message"
            />
          </Form>
        </InputContainer>
      </>
    )}
  </Layout>
);

export default ChatPresenter;
