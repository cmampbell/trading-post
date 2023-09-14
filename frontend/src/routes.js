import App from "./App";
import HomePage from "./HomePage/HomePage";
import TradePage from "./TradePage/TradePage";
import UserPage from "./Users/UserPage"
import UserRegisterForm from "./Users/UserRegisterForm";
import UserLoginForm from "./Users/UserLoginForm";
import CardBinder from "./CardBinder/CardBinder";
import WebcamCardReader from "./_common/AddCardModal/WebcamCardReader";
import Api from './Api/Api';
import CardCollection from "./Api/CardCollectionService";
import User from "./Api/UserService";
import WantList from "./Api/WantListService";
import ErrorBoundary from "./ErrorBoundary";

const routes = [
    {
        element: <App />,
        loader: () => {
            const localStorageToken = localStorage.getItem('token');

            Api.token = localStorageToken;

            const localStorageCurrUser = JSON.parse(localStorage.getItem('currUser'));

            return [localStorageToken, localStorageCurrUser];
        },
        path: '/',
        errorElement: <ErrorBoundary/>,
        children: [
            {
                path: '/',
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
                    getCardWithCamera={(name) => console.log(name)}
                    closeCameraModal={() => null}
                    setSearchInput={(() => null)}
                />
            },
            {
                path: '/users/:userId',
                element: <UserPage />,
                loader: ({ params }) => {
                    return User.getUser(params.userId)
                }
            },
            {
                path: '/users/:userId/collection',
                element: <CardBinder
                    binderType={'collection'}
                    service={CardCollection}
                                    />,
                loader: ({ params }) => {
                    return CardCollection.getUserCollection(params.userId);
                }
            },
            {
                // For trade might not need the props
                path: '/users/:userId/for-trade',
                element: <CardBinder
                    binderType={'trade'}
                    service={CardCollection}
                />,
                loader: ({ params }) => {
                    return CardCollection.getUserCardsForTrade(params.userId);
                }
            },
            {
                path: '/users/:userId/want-list',
                element: <CardBinder
                    binderType={'want'}
                    service={WantList}
                />,
                loader: ({ params }) => {
                    return WantList.getUserWantList(params.userId);
                }
            },
            {
                path: '/register',
                element: <UserRegisterForm />
            },
            {
                path: '/login',
                element: <UserLoginForm />
            },
        ]
    }
];

export default routes;