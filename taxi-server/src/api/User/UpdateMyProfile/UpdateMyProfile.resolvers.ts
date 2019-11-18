import User from "../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";
import clearNullArgs from "../../../utils/clearNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: checkAuthResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNullArgs: any = clearNullArgs(args);
         // to call beforeUpdate on user instance to hash password
        if (notNullArgs.password) {
          user.password = notNullArgs.password;
          user.save();
          delete notNullArgs.password;
        }
        try {
          await User.update({ id: user.id }, { ...notNullArgs });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
