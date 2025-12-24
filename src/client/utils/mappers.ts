export const extractAuthorInfo = (author: any) => {
  if (!author) {
    return {
      username: "Guest",
      avatarUrl: "https://avatar.iran.liara.run/public",
    };
  }

  return {
    username: author.username || "Guest",
    avatarUrl: author.avatar || "https://avatar.iran.liara.run/public",
  };
};
