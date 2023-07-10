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
                // this is for manual camera testing purposes
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