import { SubscribeToMoreOptions } from "apollo-boost";
import React from "react";
import { Mutation, MutationFn, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "../../sharedQueries";
import {
  getChat,
  getChatVariables,
  sendMessage,
  sendMessageVariables,
  userProfile
} from "../../types/api";
import ChatPresenter from "./ChatPresenter";
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from "./ChatQueries";

class ProfileQuery extends Query<userProfile> {}

class ChatQuery extends Query<getChat, getChatVariables> {}

class SendMessageMutation extends Mutation<sendMessage, sendMessageVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  message: string;
}

class ChatContainer extends React.Component<IProps, IState> {
  public sendMessageFn: MutationFn;
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.chatId) {
      props.history.push("/");
    }
    this.state = {
      message: ""
    };
  }

  public render() {
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    const { message } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery query={GET_CHAT} variables={{ chatId: Number(chatId) }}>
            {({ data, loading, subscribeToMore }) => {
              const subscribeToMoreOptions: SubscribeToMoreOptions = {
                document: SUBSCRIBE_TO_MESSAGES,
                updateQuery: (prevState, { subscriptionData }) => {
                  if (!subscriptionData) {
                    return prevState;
                  }
                  const {
                    data: { MessageSubscription }
                  } = subscriptionData;
                  const {
                    GetChat: {
                      chat: { messages }
                    }
                  } = prevState;
                  const newMessageId = MessageSubscription.id;
                  const latestMessage = messages[messages.length - 1];
                  if (messages.length > 0) {
                    const latestMessageId = latestMessage.id;
                    if (newMessageId === latestMessageId) {
                      return;
                    }
                  }

                  const newObject = Object.assign({}, prevState, {
                    GetChat: {
                      ...prevState.GetChat,
                      chat: {
                        ...prevState.GetChat.chat,
                        messages: [
                          ...prevState.GetChat.chat.messages,
                          MessageSubscription
                        ]
                      }
                    }
                  });
                  return newObject;
                }
              };
              subscribeToMore(subscribeToMoreOptions);
              return (
                <SendMessageMutation mutation={SEND_MESSAGE}>
                  {sendMessageFn => {
                    this.sendMessageFn = sendMessageFn;
                    return (
                      <ChatPresenter
                        userData={userData}
                        data={data}
                        loading={loading}
                        onInputChange={this.onInputChange}
                        messageText={message}
                        onSubmit={this.onSubmit}
                      />
                    );
                  }}
                </SendMessageMutation>
              );
            }}
          </ChatQuery>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState(({
      [name]: value
    } as unknown) as IState);
  };

  public onSubmit = () => {
    const { message } = this.state;
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    if (message !== "") {
      this.setState({
        message: ""
      });
      this.sendMessageFn({
        variables: {
          chatId: Number(chatId),
          text: message
        }
      });
    }
  };
}

export default ChatContainer;
