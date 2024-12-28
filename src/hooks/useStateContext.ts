import { useContext } from "react";
import { StateWithActions } from "../types/context";
import { StateContext } from "../context/StateContext";

export function useStateContext(): StateWithActions {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("StateContext is not available");
  }

  return context;
}
