import { MouseEventHandler } from "react";

export interface IBuildPreview extends INewBuild {
  _id: string;
  isSaved: boolean;
  saves: number;
  author?: IAuthor;
}

export interface INewBuild {
  name: string;
  perkIDs: string[];
  description: string | undefined;
  authorID: string;
  type: string;
}

export interface IUser extends IAuthor {
  googleId?: string;
  steamId?: string;
  savedPosts?: string[];
  profilePic?: string;
  followers?: number;
  saveCount?: number;
  postCount?: number;
  following?: string[];
}

export interface IAuthor {
  _id: string | undefined;
  username: string | undefined;
}

export enum RoleENUM {
  Survivor = "Survivor",
  Killer = "Killer",
}
export interface IKSToggleSelectionType {
  role: RoleENUM;
  img: string;
}

export enum PreviewGridQueryType {
  all = "posts",
  savedPosts = "savedPosts",
  authorPosts = "authorPosts",
  recentPosts = "recentPosts",
  hotPosts = "hotPosts",
  followingPosts = "followingPosts",
  searchPosts = "searchPosts",
}

export interface IPerkSlot {
  perk?: IPerk;
  key: number;
  slotNumber: number;
  isSelected: boolean;
  allowHover: boolean;
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
