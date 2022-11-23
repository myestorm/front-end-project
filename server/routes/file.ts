import { relative } from 'node:path';
import { Context, Next } from 'koa';
import { prefix, post } from '../core/router';
import { uploadDir } from '../config/koaBody';

import type { File as FormidableFile } from 'formidable';
import type { IResponeBodyType } from '@t/base';
import type { IFileUploadResponeBodyDataType } from '@t/file';

@prefix('/file')
export default class Home {
  @post('/upload')
  async Upload (ctx: Context, next: Next) {
    const file = ctx.request?.files?.file as unknown as FormidableFile;
    const dimain = '/';

    let body: IResponeBodyType<IFileUploadResponeBodyDataType>
    if (file) {
      let filepath = relative(uploadDir, file.filepath);
      filepath = filepath.replace(/\\/g, '/');
      body = {
        code: 0,
        msg: 'success',
        data: {
          dimain,
          filepath
        }
      };
    } else {
      body = {
        code: 1,
        msg: '上传失败'
      };
    }
    ctx.body = body;
    await next();
  }
};
