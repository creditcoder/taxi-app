import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";
import clearNullArgs from "../../../utils/clearNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: checkAuthResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              const notNullArgs: any = clearNullArgs(args);
              delete notNullArgs.placeId;
              await Place.update({ id: args.placeId }, { ...notNullArgs });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place was not found"
            };
          }
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
