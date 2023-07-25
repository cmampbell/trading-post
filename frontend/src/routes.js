import App from "./App";
import HomePage from "./HomePage/HomePage";
import TradePage from "./TradePage/TradePage";
import UserPage from "./Users/UserPage"
import UserRegisterForm from "./Users/UserRegisterForm";
import UserLoginForm from "./Users/UserLoginForm";
import CardBinder from "./CardBinder/CardBinder";
import WebcamCardReader from "./_common/AddCardModal/WebcamCardReader";
import SetSelectField from "./_common/CardForm/FormInputs/SetSelectField";
import FoilSelectField from "./_common/CardForm/FormInputs/FoilSelectField";
import QualitySelectField from "./_common/CardForm/FormInputs/QualitySelectField";
import QuantitySelectField from "./_common/CardForm/FormInputs/QuantitySelectField";
import ForTradeField from "./_common/CardForm/FormInputs/ForTradeField";
import Api from './Api/Api';

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