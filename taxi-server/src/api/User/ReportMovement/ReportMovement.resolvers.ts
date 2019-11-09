import User from "../../../entities/User";
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";
import clearNullArgs from "../../../utils/clearNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: checkAuthResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNullArgs = clearNullArgs(args);
        try {
          await User.update({ id: user.id }, { ...notNullArgs });
          pubSub.publish("driverUpdate", { DriversSubscription: user });
          return {
            ok: true,
            error: null
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message
          };
        }
      }
    )
  }
};

export default resolvers;
