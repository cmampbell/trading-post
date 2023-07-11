import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage"
import WebcamCardReader from "./WebcamCardReader";

const routes = [
    {
        element: <App/>,
        children: [
            {
                path: '/trade',
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
            },
            {
                path:'/',
                element: <UserPage />
            }
        ]
    }
];

export default routes;