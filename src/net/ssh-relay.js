import { spawn } from 'node:child_process'

/**
 * comando remoto: espera a porta encaminhada abrir, avisa "ready" e segura a sessão no stdin.
 * quando o chegou morre (até com kill -9) o pipe fecha, o cat recebe EOF e o ssh libera a porta
 * @param {number} remotePort
 */
function remoteCommand(remotePort) {
  return [
    `for i in $(seq 50); do ss -ltn | grep -q '127.0.0.1:${remotePort} ' && break; sleep 0.1; done`,
    'echo ready',
    'exec cat >/dev/null',
  ].join('; ')
}

/**
 * relay pelo seu próprio servidor: ssh -R expõe o chegou numa porta do VPS,
 * e um proxy HTTPS lá (Caddy) publica essa porta em `url`
 * @param {number} port porta local do chegou
 * @param {{ host: string, remotePort: number, url: string, sshBin?: string, timeoutMs?: number, env?: NodeJS.ProcessEnv }} options
 * @returns {Promise<{ url: string, child: import('node:child_process').ChildProcess, close: () => Promise<void> }>}
 */
export function openSshRelay(port, { host, remotePort, url, sshBin = 'ssh', timeoutMs = 20_000, env = process.env }) {
  const args = [
    '-T',
    '-o', 'BatchMode=yes',
    // conexão própria: num ControlMaster compartilhado o -R fica preso no mestre depois que o chegou sai
    '-o', 'ControlMaster=no',
    '-o', 'ControlPath=none',
    '-o', 'ExitOnForwardFailure=yes',
    '-o', 'ServerAliveInterval=15',
    '-o', 'ServerAliveCountMax=3',
    '-R', `127.0.0.1:${remotePort}:127.0.0.1:${port}`,
    host,
    remoteCommand(remotePort),
  ]
  const child = spawn(sshBin, args, { stdio: ['pipe', 'pipe', 'pipe'], env })

  const close = async () => {
    child.stdin.end()
    if (child.exitCode === null && child.signalCode === null) child.kill()
  }

  return new Promise((resolve, reject) => {
    let stderr = ''
    let settled = false

    const finish = (err) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (!err) return resolve({ url, child, close })
      close()
      reject(err)
    }

    const timer = setTimeout(() => finish(new Error(`ssh ${host}: timeout ${timeoutMs} ms`)), timeoutMs)

    child.stdout.on('data', (chunk) => {
      if (String(chunk).includes('ready')) finish()
    })
    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })
    child.on('error', (err) => finish(err))
    child.on('exit', (code) => {
      const lastLine = stderr.trim().split('\n').pop()
      finish(new Error(lastLine || `ssh ${host}: exit ${code}`))
    })
  })
}
