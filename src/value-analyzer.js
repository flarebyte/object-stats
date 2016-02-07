import _ from 'lodash'
import Joi from 'joi';

const isEmail = value => Joi.validate(value, Joi.string().email()).error === null;
const isUri = value => Joi.validate(value, Joi.string().uri()).error === null;
const isGuid = value => Joi.validate(value, Joi.string().guid()).error === null;
const isIsoDate = value => Joi.validate(value, Joi.string().isoDate()).error === null;
const isHexa = value => Joi.validate(value, Joi.string().hex()).error === null;
const makeName = list =>  list.join(' ').trim().replace(/\s+/g,' ');

export default function (conf) {
  const analyze = v => {
    const ifNull = _.isNull(v) ? 'null' : '';
    const ifUndefined = _.isUndefined(v) ? 'undefined' : '';
    const ifString = _.isString(v) ? 'string' : '';
    const ifBoolean = _.isBoolean(v) ? 'boolean' : '';
    const ifInteger = _.isInteger(v) ? 'integer' : '';
    const ifNumber = _.isNumber(v) ? 'number' : '';
    const ifDate = _.isDate(v) ? 'date' : '';
    const ifRegex = _.isRegExp(v) ? 'regex' : '';
    const ifArray = _.isArray(v) ? 'array' : '';
    const ifObject = _.isObject(v) ? 'object' : '';
    const ifFunction = _.isFunction(v) ? 'function' : '';

    const type = makeName([ifNull, ifUndefined, ifString,
       ifBoolean, ifInteger, ifNumber, ifDate, ifRegex, ifArray, ifFunction, ifObject]);
    const ifGuid = isGuid(v) ? 'GUID' : '';
    const ifEmail = isEmail(v) ? 'email' : '';
    const ifUri = isUri(v) ? 'URI' : '';
    const ifIsoDate = isIsoDate(v) ? 'iso-date' : '';
    const ifHexa = isHexa(v) ? 'hexa' : '';

    const format = makeName([ifEmail, ifHexa, ifGuid, ifUri, ifIsoDate]);
    const size = type === 'array object'  || type === 'object' ? _.size(v) : _.size(`${v}`);
    return {type, format, size};
  }
  return {analyze}
}
