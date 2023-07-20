import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage";
import UserRegisterForm from "./UserRegisterForm";
import WebcamCardReader from "./WebcamCardReader";
import UserLoginForm from "./UserLoginForm";
import HomePage from "./HomePage";
import CollectionPage from "./CollectionPage"
import ForTradePage from "./ForTradePage";
import Api from './Api';

const routes = [
    {
        element: <App/>,
        children: [
            {
                path:'/',
                element: <HomePage />
            },
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
                path:'/users/:userId',
                element: <UserPage />,
                loader: ({ params }) => {
                    return Api.getUser(params.userId)
                }
            },
            {
                path: '/users/:userId/collection',
                element: <CollectionPage />,
                loader: ({params}) => {
                    return Api.getUserCollection(params.userId);
                }
            },
            {
                path: '/users/:userId/collection',
                element: <ForTradePage />,
                loader: ({params}) => {
                    return Api.getUserCardForTrade(params.userId);
                }
            }, 
            {
                path: '/register',
                element: <UserRegisterForm/>
            },
            {
                path: '/login',
                element: <UserLoginForm/>
            },
        ]
    }
];

export default routes;