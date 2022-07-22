/* eslint-disable no-console */
import { EOL } from 'os';
import * as path from 'path';

import { outputFile, readdir, readFile, stat } from 'fs-extra';

const getAllFiles = async (
  dirPath: string,
  arrayOfFiles: Array<string> = [],
  extension?: string,
): Promise<Array<string>> => {
  const files = await readdir(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, '/', file);
    const fileStats = await stat(filePath);

    if (fileStats.isDirectory()) {
      arrayOfFiles = await getAllFiles(filePath, arrayOfFiles, extension);
    } else if (!extension || file.endsWith(extension)) {
      arrayOfFiles.push(filePath);
    }
  }

  return arrayOfFiles;
};

void (async (): Promise<void> => {
  const basePath = './src/modules';
  const prismaFiles: Array<string> = [];

  const files = await getAllFiles(basePath, prismaFiles, '.prisma');
  console.info(`Found ${files.length} prisma models:`, files);

  const data = await Promise.all(files.map((p) => readFile(p)));
  await outputFile('./prisma/schema.prisma', data.join(EOL));
  console.info('Prisma schemas merged');
})();
