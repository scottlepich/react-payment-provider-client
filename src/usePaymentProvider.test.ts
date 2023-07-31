import { renderHook } from "@testing-library/react";

import { usePaymentProvider } from "./index";

describe("usePaymentProvider", () => {
  describe.skip("Spreedly", () => {
    it("should export a spreedly hook", () => {
      // TODO
      // const { result } = renderHook(() => usePaymentProvider());
      // expect(result).toEqual({});
    });
    it("should export a spreedly context", () => {});
  });

  // TODO:
  describe.skip("Stripe", () => {
    it("should export a stripe hook", () => {});
    it("should export a stripe context ", () => {});
  });
});
