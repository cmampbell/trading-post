import App from "./App";
import TradePage from "./TradePage";
import WebcamCardReader from "./WebcamCardReader";

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: '/',
                element: <TradePage />,
            },
            {
                path: '/camera',
                element: <WebcamCardReader
                                getCardWithCamera={(name)=> console.log(name)}
                                closeCameraModal={()=> null}
                                setSearchInput={(()=> null)}
                        />
            }
        ]
    }
];

export default routes;