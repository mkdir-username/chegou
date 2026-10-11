import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const DEFAULTS = { openFolder: true }

function settingsDir() {
  if (process.env.CHEGOU_CONFIG_DIR) return process.env.CHEGOU_CONFIG_DIR
  if (process.platform === 'win32' && process.env.APPDATA) return join(process.env.APPDATA, 'chegou')
  return join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'chegou')
}

const file = () => join(settingsDir(), 'settings.json')

/** lê as preferências; arquivo faltando ou estragado = padrão */
export function loadSettings() {
  try {
    return { ...DEFAULTS, ...JSON.parse(readFileSync(file(), 'utf8')) }
  } catch {
    return { ...DEFAULTS }
  }
}

/**
 * @returns {boolean} conseguiu salvar?
 */
export function saveSettings(settings) {
  try {
    mkdirSync(settingsDir(), { recursive: true })
    writeFileSync(file(), JSON.stringify(settings, null, 2))
    return true
  } catch {
    return false
  }
}
