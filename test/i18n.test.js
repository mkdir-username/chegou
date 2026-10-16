import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import en from '../src/i18n/en.js'
import ru from '../src/i18n/ru.js'
import { detectLang, setLang, t } from '../src/i18n/index.js'

const keys = (node, prefix = '') =>
  Object.entries(node).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k
    const isPlural = v && typeof v === 'object' && 'other' in v
    return v && typeof v === 'object' && !isPlural ? keys(v, path) : [path]
  })

function pageLocales(...codes) {
  const window = {}
  for (const code of codes) runInNewContext(readFileSync(`public/i18n/${code}.js`, 'utf8'), { window })
  return window.CHEGOU_LOCALES
}

test('ru no terminal: mesmas chaves que en', () => {
  assert.deepEqual(keys(ru).sort(), keys(en).sort())
})

test('ru na página do celular: mesmas chaves que en', () => {
  const { en: pageEn, ru: pageRu } = pageLocales('en', 'ru')
  assert.deepEqual(keys(pageRu).sort(), keys(pageEn).sort())
})

test('ru: plural com one/few/many', () => {
  setLang('ru')
  assert.equal(t('goodbye.files', { n: 1 }), '1 файл')
  assert.equal(t('goodbye.files', { n: 3 }), '3 файла')
  assert.equal(t('goodbye.files', { n: 5 }), '5 файлов')
  assert.equal(t('goodbye.files', { n: 21 }), '21 файл')
})

test('comando se chama qrdrop em todos os idiomas', () => {
  for (const lang of ['ru', 'en', 'pt']) {
    setLang(lang)
    assert.match(t('help'), /qrdrop --relay/)
    assert.doesNotMatch(t('help'), /chegou/)
    assert.match(t('activity.opened'), /qrdrop --open/)
  }
  const page = pageLocales('en', 'ru', 'pt')
  for (const lang of ['en', 'ru', 'pt']) {
    assert.match(page[lang].boot.hostTunnel, /^qrdrop/)
    assert.match(page[lang].errors.network, /qrdrop/)
  }
})

test('en continua com one/other', () => {
  setLang('en')
  assert.equal(t('goodbye.files', { n: 1 }), '1 file')
  assert.equal(t('goodbye.files', { n: 0 }), '0 files')
})

test('dica do relay próprio existe e não fala de Cloudflare', () => {
  for (const lang of ['ru', 'en', 'pt']) {
    setLang(lang)
    const hint = t('prompt.relayHint')
    assert.notEqual(hint, 'prompt.relayHint')
    assert.doesNotMatch(hint, /Cloudflare|100/)
  }
})

test('detectLang reconhece ru_RU.UTF-8', () => {
  assert.equal(detectLang('ru_RU.UTF-8'), 'ru')
})
