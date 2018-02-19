import { join, normalize } from 'path';

export const FOLDER_DIST = join(process.cwd(), 'dist');
export const FOLDER_CLIENT = 'client';
export const FOLDER_SERVER = 'server';
export const FILES_FOLDER_PATH = normalize(join(`${__dirname}`, '/files'));
