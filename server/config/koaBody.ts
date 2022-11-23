import { parse, join, format } from 'node:path';
import fs from 'node:fs';
import { HttpMethodEnum } from 'koa-body';
import dayjs from 'dayjs';

import type { File as FormidableFile } from 'formidable';

const env = process.env.NODE_ENV;
const resourceDir = env === 'dev' ? '../../resource' : '../../../resource';
export const uploadDir = join(__dirname, resourceDir);

export default {
  multipart: true,
  formidable: {
    uploadDir: uploadDir,
    maxFields: 500,
    keepExtensions: true,
    maxFieldsSize: 5 * 1024 * 1024,
    onFileBegin (name: string, file: FormidableFile) {
      // 设置上传位置
      const dirName = dayjs(new Date()).format('YYYYMMDD');
      const filepath = parse(file.filepath);
      filepath.dir = join(filepath.dir, dirName);
      if (!fs.existsSync(filepath.dir)) {
        fs.mkdirSync(filepath.dir);
      }
      file.filepath = format(filepath);
    }
  },
  parsedMethods: [HttpMethodEnum.POST, HttpMethodEnum.GET, HttpMethodEnum.PUT, HttpMethodEnum.DELETE, HttpMethodEnum.HEAD, HttpMethodEnum.PATCH]
};
