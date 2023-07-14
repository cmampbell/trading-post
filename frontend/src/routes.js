import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage";
import UserRegisterForm from "./UserRegisterForm";
import WebcamCardReader from "./WebcamCardReader";
import UserLoginForm from "./UserLoginForm";
import HomePage from "./HomePage";
import CollectionPage from "./CollectionPage"
import Api from './Api'

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
                path:'/users/:id',
                element: <UserPage />,
                loader: ({ params }) => {
                    return Api.getUser(params.id)
                }
            },
            {
                path: '/users/:id/collection',
                element: <CollectionPage />,
                // loader: ({params}) => {
                //     return Api.getUserCollection(params.id)
                // }
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