import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { logOut } from "../redux/Fast-slice";
import { ToastContainer, toast } from 'react-toastify';

export default function Header() {

    const cart = useSelector((state) => state.fast.cartData);
    const user = useSelector((state) => state.fast.userInfo);

    const auth = getAuth();
    const Deco = () => signOut(auth)

    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await Deco()
            .then(() => {
                dispatch(logOut())
                toast.error("deconnexion réussie")
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand fs-2 title" to="/">Fast-<span className="text-white">Eat</span></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" id="button-hamburger">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end nav-mobile" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title fs-3 title" id="offcanvasNavbarLabel">Fast-<span className="text-white">Eat</span></h5>
                            <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item py-3">
                                    <NavLink className="nav-link active fs-5" aria-current="page" to="/" id="navlink">Home</NavLink>
                                </li>
                                <li className="nav-item py-3">
                                    <NavLink className="nav-link active fs-5" aria-current="page" to="/produits" id="navlink">Produits</NavLink>
                                </li>
                                <li className="nav-item py-3">
                                    <NavLink className="nav-link active fs-5 me-3" aria-current="page" to="/about" id="navlink">A propos</NavLink>
                                </li>
                                <div className="py-3">
                                    {cart.length === 0 ?  <NavLink to="/panier" className="btn btn-dark"><i className="bi bi-bag fs-5"></i></NavLink>
                                     :  
                                    <NavLink to="/panier" className="btn btn-dark position-relative"><i className="bi bi-bag fs-5"></i><p className="bg-danger rounded-circle position-absolute top-0 end-0 w-50">{cart.length}</p></NavLink> }
                                   
                                   {user ? <button className="btn btn-danger ms-2" onClick={handleSignOut}>{user.email}<i class="bi bi-box-arrow-right fs-5 ms-2"></i></button>
                                    : 
                                    <NavLink to="/login" className="btn btn-dark ms-2"><i className="bi bi-person-circle fs-5"></i></NavLink> }
                                    
                                </div>

                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}