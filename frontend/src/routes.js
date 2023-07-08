import App from "./App";
import TradePage from "./TradePage";

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: '/',
                element: <TradePage />,
            }
        ]
    }
];

export default routes;