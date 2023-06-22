export interface IBuildPreview extends INewBuild {
  _id: number;
  isSaved: boolean;
  author?: IAuthor;
}

export interface INewBuild {
  name: string;
  perks: string[];
  description: string;
  authorID: string;
  saves: number;
  type: string;
}

export interface IUser extends IAuthor {
  googleId?: string;
  steamId?: string;
  savedPosts?: string[];
}

export interface IAuthor {
  username: string | undefined;
  _id: string | undefined;
}

export interface IKSToggleSelectionType {
  str: string;
  img: string;
}
