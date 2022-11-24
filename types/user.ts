export interface IUserType {
  id: number;
  email: string,
  username: string,
  nickname: string,
  avatar: string
};

export type IUserCreateType = Omit<IUserType, 'id' | 'avatar'>;
export type IUserUpdateType = Omit<Partial<IUserType>, 'id'>;
