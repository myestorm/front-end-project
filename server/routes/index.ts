import KoaRouter from '../core/router';

import Home from './home';
import File from './file';

const appRouter = new KoaRouter();

appRouter
  .mount(Home)
  .mount(File);

export default appRouter.router;