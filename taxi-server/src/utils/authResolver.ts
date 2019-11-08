const checkAuthResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("Proceeding refused. No user token found");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default checkAuthResolver;
