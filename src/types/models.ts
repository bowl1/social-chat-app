export type UserProfile = {
  id: string;
  firebaseUid?: string;
  email: string;
  username: string;
  avatar?: string | null;
  gender?: string | null;
  language?: string | null;
  country?: string | null;
};

export type Group = {
  objectId: string;
  name: string;
  isDefault: boolean;
};

export type PostContent = {
  text?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
};

export type Post = {
  objectId: string;
  userName: string;
  userAvatar: string | null;
  content: PostContent;
  group: string;
  likes: string[];
};

export type Comment = {
  id: string;
  author: string;
  avatar: string | null;
  content: PostContent;
  parentId: string | null;
  replies: Comment[];
};
