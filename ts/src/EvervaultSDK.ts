// Evervault Ts SDK

import { AcquirerEntity } from './entity/AcquirerEntity'
import { BinLookupEntity } from './entity/BinLookupEntity'
import { CardEntity } from './entity/CardEntity'
import { CardArtEntity } from './entity/CardArtEntity'
import { ClientSideTokenEntity } from './entity/ClientSideTokenEntity'
import { CoreEntity } from './entity/CoreEntity'
import { CustomDomainEntity } from './entity/CustomDomainEntity'
import { FunctionRunEntity } from './entity/FunctionRunEntity'
import { MerchantEntity } from './entity/MerchantEntity'
import { NetworkTokenEntity } from './entity/NetworkTokenEntity'
import { NetworkTokenCryptogramEntity } from './entity/NetworkTokenCryptogramEntity'
import { PaymentEntity } from './entity/PaymentEntity'
import { RelayEntity } from './entity/RelayEntity'
import { ThreeDsSessionEntity } from './entity/ThreeDsSessionEntity'
import { WebhookEntity } from './entity/WebhookEntity'
import { WebhookEndpointEntity } from './entity/WebhookEndpointEntity'

export type * from './EvervaultTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { EvervaultEntityBase } from './EvervaultEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class EvervaultSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Entity access: `client.Acquirer().list()` / `client.Acquirer().load({ id })`.
  Acquirer(data?: any) {
    const self = this
    return new AcquirerEntity(self,data)
  }


  // Entity access: `client.BinLookup().list()` / `client.BinLookup().load({ id })`.
  BinLookup(data?: any) {
    const self = this
    return new BinLookupEntity(self,data)
  }


  // Entity access: `client.Card().list()` / `client.Card().load({ id })`.
  Card(data?: any) {
    const self = this
    return new CardEntity(self,data)
  }


  // Entity access: `client.CardArt().list()` / `client.CardArt().load({ id })`.
  CardArt(data?: any) {
    const self = this
    return new CardArtEntity(self,data)
  }


  // Entity access: `client.ClientSideToken().list()` / `client.ClientSideToken().load({ id })`.
  ClientSideToken(data?: any) {
    const self = this
    return new ClientSideTokenEntity(self,data)
  }


  // Entity access: `client.Core().list()` / `client.Core().load({ id })`.
  Core(data?: any) {
    const self = this
    return new CoreEntity(self,data)
  }


  // Entity access: `client.CustomDomain().list()` / `client.CustomDomain().load({ id })`.
  CustomDomain(data?: any) {
    const self = this
    return new CustomDomainEntity(self,data)
  }


  // Entity access: `client.FunctionRun().list()` / `client.FunctionRun().load({ id })`.
  FunctionRun(data?: any) {
    const self = this
    return new FunctionRunEntity(self,data)
  }


  // Entity access: `client.Merchant().list()` / `client.Merchant().load({ id })`.
  Merchant(data?: any) {
    const self = this
    return new MerchantEntity(self,data)
  }


  // Entity access: `client.NetworkToken().list()` / `client.NetworkToken().load({ id })`.
  NetworkToken(data?: any) {
    const self = this
    return new NetworkTokenEntity(self,data)
  }


  // Entity access: `client.NetworkTokenCryptogram().list()` / `client.NetworkTokenCryptogram().load({ id })`.
  NetworkTokenCryptogram(data?: any) {
    const self = this
    return new NetworkTokenCryptogramEntity(self,data)
  }


  // Entity access: `client.Payment().list()` / `client.Payment().load({ id })`.
  Payment(data?: any) {
    const self = this
    return new PaymentEntity(self,data)
  }


  // Entity access: `client.Relay().list()` / `client.Relay().load({ id })`.
  Relay(data?: any) {
    const self = this
    return new RelayEntity(self,data)
  }


  // Entity access: `client.ThreeDsSession().list()` / `client.ThreeDsSession().load({ id })`.
  ThreeDsSession(data?: any) {
    const self = this
    return new ThreeDsSessionEntity(self,data)
  }


  // Entity access: `client.Webhook().list()` / `client.Webhook().load({ id })`.
  Webhook(data?: any) {
    const self = this
    return new WebhookEntity(self,data)
  }


  // Entity access: `client.WebhookEndpoint().list()` / `client.WebhookEndpoint().load({ id })`.
  WebhookEndpoint(data?: any) {
    const self = this
    return new WebhookEndpointEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new EvervaultSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return EvervaultSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Evervault' }
  }

  toString() {
    return 'Evervault ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = EvervaultSDK


export {
  stdutil,
  config,

  BaseFeature,
  EvervaultEntityBase,

  EvervaultSDK,
  SDK,
}


