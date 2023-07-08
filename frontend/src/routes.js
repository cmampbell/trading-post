import App from "./App";
import TradePage from "./TradePage";
import CameraScan from "./CameraScan"
// import AddCardModal from "./AddCardModal";

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: '/',
                element: <TradePage />,
            },
            {
                path:'/camera',
                element: <CameraScan/>
            }
        ]
    }
];

export default routes;