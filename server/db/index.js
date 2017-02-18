import { DB_TYPE } from '../config/appConfig';
import { DB_TYPES } from '../config/constants';

let dbConfig = require('./mongo').default;

export const connect = dbConfig.connect;
export const controllers = dbConfig.controllers;
export const passport = dbConfig.passport;
export const session = dbConfig.session;
