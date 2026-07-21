
import { Context } from './Context'


class EvervaultError extends Error {

  isEvervaultError = true

  sdk = 'Evervault'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EvervaultError
}

