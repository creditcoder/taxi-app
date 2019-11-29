import React from "react";
import Layout from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import styled from "../../typed-components";

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

const ChatPresenter: React.FC = () => (
  <Layout minHeight="80%">
    <Header title="Chat" />
    <Chat>
      <Message mine={true} text="Hello there" />
      <Message mine={false} text="Hello there" />
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
  </Layout>
);

export default ChatPresenter;
