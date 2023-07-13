import App from "./App";
import TradePage from "./TradePage";
import UserPage from "./UserPage";
import UserRegisterForm from "./UserRegisterForm";
import WebcamCardReader from "./WebcamCardReader";
import UserLoginForm from "./UserLoginForm";

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
            },
            {
                path:'/user',
                element: <UserPage />
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