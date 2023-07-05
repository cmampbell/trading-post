import React, { isValidElement } from "react";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";


// borrowed from: https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/

export default renderWithRouter = (children, routes=[]) => {
    // options creating routes for valid children
    // else keep children as they are
    // first argument is a full route

    const options = isValidElement(children)
            ? { element: children, path: '/'}
            : children;

    // spread out the options here
    // the options are a route object
    // then routes are spread and passed after
    const router = createMemoryRouter([{...options}, ...routes],
        {
        initialEntries: [options.path],
        initialIndex: 1
    }
    );

    return render(<RouterProvider router={router}/>);
}