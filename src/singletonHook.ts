import {
  createContext,
  createElement,
  FunctionComponent,
  ReactNode,
  useContext,
} from "react";

// Based on https://gist.github.com/malj/463d5473b13864d7dbd2d256ef0f3577
export const createSingletonHook = <P, S>(
  useHook: (props: P) => S,
): [() => S, FunctionComponent<{ children: ReactNode }>] => {
  const Context = createContext<S | undefined>(undefined);

  const SingletonHookProvider: FunctionComponent<{ children: ReactNode }> = ({
    children,
    ...props
  }) => {
    const value = useHook(props as P);
    return createElement(Context.Provider, { value }, children);
  };

  const useSingletonHook = (): S => {
    const value = useContext(Context);
    if (typeof value === "undefined") {
      throw new Error(
        "Component with usePaymentProvider (hook) must be a wrapped in a PaymentProvider (context)",
      );
    }
    return value;
  };

  return [useSingletonHook, SingletonHookProvider];
};
