import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetChat: checkAuthResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ["messages"] }
          );
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                ok: true,
                error: null,
                chat
              };
            } else {
              return {
                ok: false,
                error: "You are not participant of this chat",
                chat: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Chat was not found",
              chat: null
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            chat: null
          };
        }
      }
    )
  }
};

export default resolvers;
