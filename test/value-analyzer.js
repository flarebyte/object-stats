import test from 'tape'
import valueAnalyzer from '../src/value-analyzer.js'

const conf = {};
const vAnalyzer = valueAnalyzer(conf);

test('Value Analyzer should detect null', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(null).type, 'null', 'null')
})

test('should detect undefined', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(conf.none).type, 'undefined', 'undefined')
})

test('should detect number', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(12.4).type, 'number', 'number')
})

test('should detect integer', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(12).type, 'integer number', 'integer')
})

test('should detect boolean', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(true).type, 'boolean', 'boolean')
})

test('should detect string', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze('some string').type, 'string', 'string')
})

test('should detect Regex', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(/a/).type, 'regex object', 'regex')
})

test('should detect Date', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze(new Date()).type, 'date object', 'date')
})

test('should detect array', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze([12]).type, 'array object', 'array')
})

test('should detect object', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze({}).type, 'object', 'object')
})

test('should detect email', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze('yu@website.com').format, 'email', 'email')
})

test('should detect URI', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze('dc:title').format, 'URI', 'URI')
})

test('should detect UUID', (t) => {
  t.plan(2)
  t.equal(vAnalyzer.analyze('e6dc6b62-cdd2-44e2-b202-070351b02ef7').format, 'GUID', 'GUID')
  t.equal(vAnalyzer.analyze('e6dc6b62cdd244e2b202070351b02ef7').format, 'GUID', 'GUID')
})

test('should detect iso date', (t) => {
  t.plan(1)
  t.equal(vAnalyzer.analyze('2016-02-06T20:37:47+00:00').format, 'iso-date', 'iso-date')
})
