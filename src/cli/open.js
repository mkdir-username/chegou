import { spawn } from 'node:child_process'
import { dirname } from 'node:path'

/**
 * abre o gerenciador de arquivos já com o arquivo selecionado
 * (no Linux não tem um jeito padrão de selecionar, então abre só a pasta)
 * @param {string} filePath caminho completo do arquivo que chegou
 */
export function revealFile(filePath) {
  const commands = {
    win32: ['explorer', ['/select,', filePath]],
    darwin: ['open', ['-R', filePath]],
  }
  const [command, args] = commands[process.platform] ?? ['xdg-open', [dirname(filePath)]]

  // sem shell: caminho com espaço ou caractere estranho não quebra nada
  try {
    const child = spawn(command, args, { detached: true, stdio: 'ignore' })
    child.on('error', () => {}) // sem gerenciador de arquivos (servidor, SSH): só não abre
    child.unref()
  } catch {}
}
