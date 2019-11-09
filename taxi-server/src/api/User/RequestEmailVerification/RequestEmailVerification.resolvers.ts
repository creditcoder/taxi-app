import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { RequestEmailVerificationResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: checkAuthResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;
        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email
            });
            if (oldVerification) {
              oldVerification.remove();
            }
            const newVerification = await Verification.create({
              payload: user.email,
              target: "EMAIL"
            }).save();
            await sendVerificationEmail(user.fullName, newVerification.key);
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
        } else {
          return {
            ok: false,
            error: "That user has no email"
          };
        }
      }
    )
  }
};

export default resolvers;
