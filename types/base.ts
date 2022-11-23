// API 同一返回格式
export interface IResponeBodyType<T> {
  code: number;
  msg: string;
  data?: T;
};
