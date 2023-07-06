import App from "./App";
import TradePage from "./TradePage";
// import AddCardModal from "./AddCardModal";

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: '/',
                element: <TradePage />,
                // children: [
                //     {
                //         path:'/addcard',
                //         element: <AddCardModal />
                //     }
                // ]
            },
        ]
    }
];

export default routes;