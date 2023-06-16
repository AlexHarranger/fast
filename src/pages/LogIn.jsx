import AOS from 'aos';
import { useRef, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { addUser } from '../redux/Fast-slice';


export default function LogIn() {

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // className applied after initialization
        animatedClassName: 'aos-animate', // className applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing htmlFor AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    })

    const dispatch = useDispatch();
    const [validation, setValidation] = useState("");

    const navigate = useNavigate();

    const inputs = useRef([]);
    const addInputs = (element) => {
        if (element && !inputs.current.includes(element)) {
            inputs.current.push(element)
        }
    }

    const auth = getAuth();
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
                .then((result) => {
                    const user = result.user
                    dispatch(addUser({
                        id: user.uid,
                        email: user.email
                    }))
                }) 
            setValidation("")
            toast.success(`Bienvenue ${inputs.current[0].value} !`)
            setTimeout(() => {
                navigate('/')
            }, 2500)

        } catch (error) {
            if (error.code === "auth/wrong-password") {
                setValidation("mail / mot de passe incorrect")  
            }
        }
    }


    return (
        <>
            <div className="container-fluid bg-dark min-vh-100">
                <div className="row align-items-center min-vh-100">
                    <div className="col-md-4 offset-md-4 bg-light rounded py-5" id="form-container" data-aos="fade-up" data-aos-delay="300">
                        <form onSubmit={handleSubmit}>
                            <p className="fs-3 text-center">Me connecter</p>
                            <div className="mb-3 py-2">
                                <label htmlFor="email" className="form-label">Adresse e-mail</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" ref={addInputs} />
                            </div>
                            <div className="mb-3 py-2">
                                <label htmlFor="mdp" className="form-label">Mot de passe</label>
                                <input type="password" className="form-control" id="mdp" ref={addInputs} />
                                <p className='text-danger'>{validation}</p>
                            </div>
                            <div className="text-center py-2">
                                <button type="submit" className="btn btn-dark">Me connecter</button>
                                <NavLink className="ms-2" to="/signup">Je n'ai pas de compte</NavLink>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

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
