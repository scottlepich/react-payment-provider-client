import { renderHook } from "@testing-library/react";

import { usePaymentProvider } from "./index";

describe("usePaymentProvider", () => {
  describe("Spreedly", () => {
    it("should export a spreedly hook", () => {
      // TODO
      // const { result } = renderHook(() => usePaymentProvider());
      // expect(result).toEqual({});
    });
    it("should export a spreedly context", () => {});
  });

  // TODO:
  describe("Stripe", () => {
    it("should export a stripe hook", () => {});
    it("should export a stripe context ", () => {});
  });
});
