import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { openSshRelay } from '../src/net/ssh-relay.js'

const sshBin = fileURLToPath(new URL('./fixtures/fake-ssh', import.meta.url))
const base = { host: 'vps', remotePort: 18080, url: 'https://relay.example:8444', sshBin }
const withMode = (mode, extra = {}) => ({ ...base, env: { ...process.env, FAKE_SSH: mode }, ...extra })

test('relay ssh: devolve a url quando o túnel fica pronto e fecha o processo', async () => {
  const relay = await openSshRelay(8080, withMode('ok'))
  assert.equal(relay.url, 'https://relay.example:8444')
  const exited = new Promise((resolve) => relay.child.once('exit', resolve))
  await relay.close()
  await exited
  assert.ok(relay.child.exitCode !== null || relay.child.signalCode !== null)
})

test('relay ssh: falha com a mensagem do ssh quando o encaminhamento é recusado', async () => {
  await assert.rejects(openSshRelay(8080, withMode('fail')), /remote port forwarding failed/)
})

test('relay ssh: desiste depois do timeout se o ssh não responde', async () => {
  await assert.rejects(openSshRelay(8080, withMode('hang', { timeoutMs: 300 })), /timeout|tempo|время/i)
})
