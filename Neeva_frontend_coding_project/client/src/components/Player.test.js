import renderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { expect, jest } from "@jest/globals";
import { act } from "react-dom/test-utils";
import Player from "./Player";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("the player should render correctly", async () => {
    const fakeImageLinks = {
        frames: [],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeImageLinks),
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<Player />, container);
    });

    expect(container).toMatchSnapshot();

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});
