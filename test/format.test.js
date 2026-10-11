import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatMinutes, formatSize } from '../src/cli/ui.js'

test('formatSize: bytes, KB, MB e GB', () => {
  assert.equal(formatSize(0), '0 B')
  assert.equal(formatSize(512), '512 B')
  assert.equal(formatSize(810.5 * 1024), '810.5 KB')
  assert.equal(formatSize(2.3 * 1024 ** 2), '2.3 MB')
  assert.equal(formatSize(1.5 * 1024 ** 3), '1.5 GB')
})

test('formatMinutes: segundos, minutos e horas', () => {
  assert.equal(formatMinutes(0.5), '30 s')
  assert.equal(formatMinutes(10), '10 min')
  assert.equal(formatMinutes(60), '1 h')
  assert.equal(formatMinutes(90), '1 h 30 min')
})
