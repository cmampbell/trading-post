import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage";
import UserRegisterForm from "./UserRegisterForm";
import WebcamCardReader from "./WebcamCardReader";
import UserLoginForm from "./UserLoginForm";
import HomePage from "./HomePage";
import CardBinder from "./CardBinder";
import Api from './Api';

const routes = [
    {
        element: <App/>,
        loader: () => {
            const localStorageToken = localStorage.getItem('token');
        
            Api.token = localStorageToken;

            const localStorageCurrUser = JSON.parse(localStorage.getItem('currUser'));

            return [localStorageToken, localStorageCurrUser];
        },
        path: '/',
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
                element: <CardBinder pageType={'collection'} />,
                loader: ({params}) => {
                    return Api.getUserCollection(params.userId);
                }
            },
            {
                path: '/users/:userId/for-trade',
                element: <CardBinder pageType={'trade list'}/>,
                loader: ({params}) => {
                    return Api.getUserCardsForTrade(params.userId);
                }
            },
            {
                path: '/users/:userId/want-list',
                element: <CardBinder pageType={'want list'}/>,
                loader: ({ params }) => {
                    return Api.getUserWantList(params.userId);
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