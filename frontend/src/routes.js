import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage";
import UserRegisterForm from "./UserRegisterForm";
import WebcamCardReader from "./WebcamCardReader";
import UserLoginForm from "./UserLoginForm";
import HomePage from "./HomePage";
import CardBinder from "./CardBinder";
import EditCollectionCardForm from "./EditCollectionCardForm";
import EditWantListCardForm from "./EditWantListCardForm";
import Api from './Api';

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
                    return Api.getUser(params.userId)
                }
            },
            {
                path: '/users/:userId/collection',
                element: <CardBinder
                    binderType={'collection'}
                    addCard={
                        (userId, card) =>
                            Api.addCardToCollection(userId, card)
                    }
                    editCard={
                        (userId, card, editData) =>
                            Api.editCardInCollection(userId, card, editData)
                    }
                    removeCard={
                        (cardId) =>
                            Api.removeCardFromCollection(cardId)
                    }
                    Form={EditCollectionCardForm}
                />,
                loader: ({ params }) => {
                    return Api.getUserCollection(params.userId);
                }
            },
            {
                // For trade might not need the props
                path: '/users/:userId/for-trade',
                element: <CardBinder
                    binderType={'trade'}
                    addCard={Api.addCardToCollection}
                    editCard={Api.editCardInCollection}
                    removeCard={Api.removeCardFromCollection}
                    Form={EditCollectionCardForm}
                />,
                loader: ({ params }) => {
                    return Api.getUserCardsForTrade(params.userId);
                }
            },
            {
                path: '/users/:userId/want-list',
                element: <CardBinder
                    binderType={'want'}
                    addCard={(userId, card) => Api.addCardToWantList(userId, card)}
                    editCard={Api.editCardInWantList}
                    removeCard={Api.removeCardFromWantList}
                    Form={EditWantListCardForm}
                />,
                loader: ({ params }) => {
                    return Api.getUserWantList(params.userId);
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