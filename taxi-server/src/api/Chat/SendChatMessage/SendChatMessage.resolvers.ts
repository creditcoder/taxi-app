import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: checkAuthResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({
            id: args.chatId
          });
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user
              }).save();
              pubSub.publish("newChatMessage", {
                MessageSubscription: message
              });
              return {
                ok: true,
                error: null,
                message
              };
            } else {
              return {
                ok: false,
                error: "You are not participant of this chat",
                message: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Chat was not found",
              message: null
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            message: null
          };
        }
      }
    )
  }
};

export default resolvers;
