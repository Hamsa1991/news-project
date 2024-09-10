import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout(){

    const {token} = useStateContext();

    if(token){
        return <Navigate to={"/"} />
    }

    return (
        <div>
            <div className="container-fluid">

                <div className="row align-items-center py-2 px-lg-5">
                    <div className="col-lg-4">
                        <a href="" className="navbar-brand d-none d-lg-block">
                            <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room
                            </h1>
                        </a>
                    </div>

                </div>
            </div>
            <div className="container-fluid p-0 mb-3">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg-5">
                    <a href="" className="navbar-brand d-block d-lg-none">
                        <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room</h1>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                </nav>
            </div>
            <div className="login-signup-form">
                <div className="form">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
