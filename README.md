# WIP: @opentable/react-payment
# DO NOT USE: incomplete

## React abstraction for payment provider strategies

- Meant to abstract provider implementation details away from OT react sites
- Creates a Payment Provider hook and context for use in OT React sites 
- (TODO) Contains clients for OT payment providers

## Rationale and history

When integrating Stripe, the code for interacting with that service was tightly coupled with one provider (Stripe) and scattered throughout a few codebases.

Most payment providers use a similar mechanism for handling credit card information. Usually sensitive Credit Card information is only entered into iframes to the Provider's domain, and an obfuscated token is sent back to us for use and storage.

Since this interaction is so similar with different providers, we can wrap it with our own component library and include that in multiple OT sites.

In this way we can abstract implementation of `n` payment providers away from OT react code.

Anticipated places for use:

1. consumer-frontend
1. restref-site
1. gc-monorepo-admin (OT4R) 

-------------------------------------------------------------------------------

## Usage
TODO: Add detail and diagrams 

- Context
- Hook
- Selecting a provider
- Provider events
- Adding a provider
- ?

-------------------------------------------------------------------------------

## Supported providers

### Spreedly
So far we have spiked the form/iframe integration works in CFE network flow.

The Spreedly script is included, `window.Spreedly` exists, and it replaces empty DOM elements with spreedly domain iframe content.

Using a test form hacked into 

Spike is successful, next steps will be to attempt to integrate this lib with CFE in the network flow.

TODO:
- Complete transaction with token
- Other payment flows in CFE
- Use in other OT react sites

#### Documentation
- [Spreedly iframe payment guide](https://docs.spreedly.com/guides/adding-payment-methods/iframe/)
- [Spreedly iframe JS API](https://docs.spreedly.com/reference/iframe/v1/#iframe-javascript-api)
- [Spreedly iframe 3DS journey diagram](https://docs.spreedly.com/guides/spreedly-3dsecure2-web/#end-to-end-flow-diagram)


### Stripe
TODO

#### Documentation
TODO
