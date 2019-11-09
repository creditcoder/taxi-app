import User from "../../../entities/User";
import { UpdateMyProfileMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: checkAuthResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }) => {
        const user: User = req.user;
        await User.update({ id: user.id }, { ...args });
      }
    )
  }
};

export default resolvers;
