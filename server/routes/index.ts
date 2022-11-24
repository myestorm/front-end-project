import KoaRouter from '../core/router';

import Home from './home';
import File from './file';
import User from './user';

const appRouter = new KoaRouter();

appRouter
  .mount(Home)
  .mount(File)
  .mount(User);

export default appRouter.router;