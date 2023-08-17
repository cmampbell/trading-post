import React, { isValidElement } from "react";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

// borrowed from: https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
// Used for testing to render components inside a Memory Router, which is necessary for
// components using react-router hooks.

export default renderWithRouter = (children, routes = []) => {
    const options = isValidElement(children)
        ? { element: children, path: '/' }
        : children;

    const router = createMemoryRouter([{ ...options }, ...routes],
        {
            initialEntries: [options.path],
            initialIndex: 1
        });

    return render(<RouterProvider router={router} />);
};