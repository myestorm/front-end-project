export interface IUserType {
  id: number;
  username: string,
  password: string,
  email: string,
  cellphone: string,
  nickname: string,
  avatar: string
};

export type IUserCreateType = Omit<IUserType, 'id' | 'avatar'> & {
  avatar?: string
};
export type IUserUpdateType = Omit<Partial<IUserType>, 'id'>;

export type IUserSigninType = Pick<IUserType, 'username' | 'password'>;
