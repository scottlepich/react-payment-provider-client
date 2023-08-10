# WIP: @opentable/react-payment-provider-client
# DO NOT USE: incomplete

## React abstraction for payment provider strategies

- Meant to abstract provider implementation details away from OT react sites
- (TODO) Contains clients for OT payment providers

### Rationale and history

When integrating Stripe, the code for interacting with that service was tightly coupled with the one provider andscattered throughout a few codebases.

The intent of this lib is to abstract react implementation away from any particular OT code.

Anticipated places for use:

1. consumer-frontend
1. restref-site
1. gc-monorepo-admin (OT4R) 

### Usage
TODO: info about
- selecting a provider
- context
- provider events
- adding a provider

### Supported providers

#### Spreedly
So far we have spiked the form/iframe integration works in CFE network flow.

TODO:
- Complete transaction
- ...
- Other flows

##### Documentation

https://docs.spreedly.com/guides/adding-payment-methods/iframe/
https://docs.spreedly.com/reference/iframe/v1/#iframe-javascript-api

3DS journey
https://docs.spreedly.com/guides/spreedly-3dsecure2-web/#end-to-end-flow-diagram


#### Stripe
TODO

##### Documentation    
TODO