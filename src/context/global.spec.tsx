import React, { useContext } from "react";
import { render, fireEvent } from "@testing-library/react";
import GlobalStateProvider, {
  GlobalContext,
  GlobalDispatch,
  GlobalActionType,
} from "./global";

describe("GlobalStateProvider", () => {
  const TestComponent = () => {
    const state = useContext(GlobalContext);
    const dispatch = useContext(GlobalDispatch);

    return (
      <div>
        <p data-testid="lang">{state.langCode}</p>
        <button
          onClick={() =>
            dispatch({
              type: GlobalActionType.SetLang,
              payload: { value: "fr" },
            })
          }
        >
          <span data-testid="language">Set {state.language}</span>
        </button>
      </div>
    );
  };

  it.only("should provide initial state", () => {
    const { getByTestId } = render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>
    );

    expect(getByTestId("lang")).toHaveTextContent("de");
    expect(getByTestId("language")).toHaveTextContent("German");
  });

  it("should update the state when dispatching an action", () => {
    const { getByTestId, getByText } = render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>
    );

    fireEvent.click(getByText("Set French"));

    expect(getByTestId("lang")).toHaveTextContent("en");
  });

  /**
   * TODO: need to add ErrorBoundary
   */
  it.skip("should throw an error when dispatching an invalid action", () => {
    const InvalidActionComponent = () => {
      const dispatch = useContext(GlobalDispatch);

      React.useEffect(() => {
        try {
          dispatch({
            type: "invalid_action" as GlobalActionType,
            payload: { value: "fr" },
          });
        } catch (error) {
          console.log(error)
        }
      }, [dispatch]);

      return <div>Test Invalid Action</div>;
    };

    expect(() =>
      render(
        <GlobalStateProvider>
          <InvalidActionComponent />
        </GlobalStateProvider>
      )
    ).toThrow("Invalid Action");
  });
});
