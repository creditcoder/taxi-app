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
}

const ChatPresenter: React.FC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {}
}) => (
  <Layout minHeight="80%">
    <Header title="Chat" />
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
          <Form submitFn={null}>
            <Input
              width="70%"
              onChange={() => {
                return;
              }}
              value="Hello"
              name="message"
            />
          </Form>
        </InputContainer>
      </>
    )}
  </Layout>
);

export default ChatPresenter;
