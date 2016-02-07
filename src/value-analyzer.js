import _ from 'lodash'
import Joi from 'joi';

const isEmail = value => Joi.validate(value, Joi.string().email()).error === null;
const isUri = value => Joi.validate(value, Joi.string().uri()).error === null;
const isGuid = value => Joi.validate(value, Joi.string().guid()).error === null;
const isIsoDate = value => Joi.validate(value, Joi.string().isoDate()).error === null;

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

    const type = [ifNull, ifUndefined, ifString,
       ifBoolean, ifInteger, ifNumber, ifDate, ifRegex, ifArray, ifObject].join(' ').trim().replace(/\s+/g,' ');
    const ifGuid = isGuid(v) ? 'GUID' : '';
    const ifEmail = isEmail(v) ? 'email' : '';
    const ifUri = isUri(v) ? 'URI' : '';
    const ifIsoDate = isIsoDate(v) ? 'iso-date' : '';

    const format = [ifEmail, ifGuid, ifUri, ifIsoDate].join('');

    return {type, format};
  }
  return {analyze}
}
