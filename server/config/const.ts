export type ICONSTType = {
  cookieTokenName: string,
  jwtSecret: string,
  koaKeys: string[]
};
export const jwtSecret = 'front_end_project_secret';
export const cookieTokenName = 'token';
export const koaKeys = ['front-end-project', 'totonoo.com'];
export default {
  cookieTokenName,
  jwtSecret,
  koaKeys
};
