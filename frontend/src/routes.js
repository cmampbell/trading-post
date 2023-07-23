import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage";
import UserRegisterForm from "./UserRegisterForm";
import WebcamCardReader from "./WebcamCardReader";
import UserLoginForm from "./UserLoginForm";
import HomePage from "./HomePage";
import CardBinder from "./CardBinder";
import SetSelectField from "./FormInputs/SetSelectField";
import FoilSelectField from "./FormInputs/FoilSelectField";
import QualitySelectField from "./FormInputs/QualitySelectField";
import QuantitySelectField from "./FormInputs/QuantitySelectField";
import ForTradeField from "./FormInputs/ForTradeField";
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
                element: <TradePage fields={[SetSelectField, FoilSelectField, QualitySelectField, QuantitySelectField]}/>,
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
                        (userId, cardId) =>
                            Api.removeCardFromCollection(userId, cardId)
                    }
                    addFields={[SetSelectField, QualitySelectField, FoilSelectField, QuantitySelectField, ForTradeField, ]}
                    editFields={[QualitySelectField, FoilSelectField, QuantitySelectField, ForTradeField]}
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
                    addCard={()=> null}
                    editCard={
                        (userId, card, editData) =>
                            Api.editCardInCollection(userId, card, editData)
                    }
                    removeCard={
                        (userId, card, editData) =>
                            Api.editCardInCollection(userId, card, {forTrade: false})
                    }
                    editFields={[ForTradeField]}
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
                    editCard={(userId, card, cardData) => Api.editCardInWantList(userId, card, cardData)}
                    removeCard={(userId, cardId) => Api.removeCardFromWantList(userId, cardId)}
                    addFields={[SetSelectField, FoilSelectField, QuantitySelectField]}
                    editFields={[FoilSelectField, QuantitySelectField]}
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