import { MouseEventHandler } from "react";

export interface IBuildPreview extends INewBuild {
  _id: string;
  isSaved: boolean;
  author?: IAuthor;
}

export interface INewBuild {
  name: string;
  perkIDs: string[];
  description: string;
  authorID: string;
  saves: number;
  type: string;
}

export interface IUser extends IAuthor {
  googleId?: string;
  steamId?: string;
  savedPosts?: string[];
  profilePic?: string;
  followers?: number;
  following?: string[];
}

export interface IAuthor {
  _id: string | undefined;
  username: string | undefined;
}

export interface IKSToggleSelectionType {
  str: string;
  img: string;
}

export interface IPerkSlot {
  perk?: IPerk;
  key: number;
  slotNumber: number;
  isSelected: boolean;
  handleClick?: (slotNumber: number) => MouseEventHandler;
}

export interface IPerk {
  _id: string;
  imgUrl?: string;
  name?: string;
  desc?: string;
  owner?: string;
  role?: string;
}
