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
    const size = type === 'array object'  || type === 'object' ? _.size(v): _.size(`${v}`);
    return {type, format, size};
  }

  const analyzeObject = (v, stack, current, analyzed) => {
    const keys = _.keys(v).sort() ;
    _.forEach(keys, key => {
      const keyCurrent = _.cloneDeep(current).push(key);
      const value = v[key];
      doDeepAnalyze(value, stack, keyCurrent);
    });
  }

  const analyzeArray = (v, stack, current, analyzed) => {
    let keyCurrent = 0;
    _.forEach(v, value => {
      keyCurrent++;
      doDeepAnalyze(value, stack, keyCurrent);
    });
  }

  const analyzeValue = (v, stack, current, analyzed) => {
    const path = current.join('/');
    const type = v.type;
    const size = v.size;
    stack.push({path, type, size});
  }

  const doDeepAnalyze = (v, stack, current) => {
    const analyzed = analyze(v);
    switch(analyzed.type) {
      case 'object': analyzeObject(v, stack, current, analyzed); break;
      case 'array object': analyzeArray(v, stack, current, analyzed); break;
      case '': ; break;
      default: analyzeValue(v, stack, current, analyzed); break;

    }
  }
  const deepAnalyze = v => {
    const stack = [];
    return doDeepAnalyze(v, stack, []);
    return stack;
  }
  return {analyze, deepAnalyze}
}
