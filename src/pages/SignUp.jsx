import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const [validation, setValidation] = useState("")

    const inputs = useRef([]);
    const addInputs = (element) => {
        if (element && !inputs.current.includes(element)) {
            inputs.current.push(element)
        }
    }

    const navigate = useNavigate();

    const auth = getAuth();

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ((inputs.current[1].value.length && inputs.current[2].value.length) < 6) {
            return setValidation("votre mot de passe doit faire au moins 6 caractères")
        }
        else if (inputs.current[1].value !== inputs.current[2].value) {
            return setValidation("les mots de passes ne correspondent pas")
        }

        try {
            await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            setValidation("")
            toast.success("votre compte a bien été crée")
            setTimeout(() => {
                navigate('/login')
            }, 2500)
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                setValidation("le mail saisie est invalide")
            }
            else if (error.code === "auth/email-already-in-use") {
                setValidation("cette adresse mail est déjà utilisée")
            }

        }
    }


    return (
        <>
            <div className="container-fluid bg-dark min-vh-100">
                <div className="row min-vh-100 align-items-center">
                    <div className="col-md-4 offset-md-4 bg-light rounded py-5" data-aos="fade-up" data-aos-delay="300">
                        <form onSubmit={handleSubmit}>
                            <p className="fs-3 text-center">Créer mon compte</p>
                            <div className="mb-3 py-2">
                                <label htmlFor="email" className="form-label">Adresse e-mail</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" ref={addInputs} />
                            </div>
                            <div className="mb-3 py-2">
                                <label htmlFor="mdp" className="form-label">Mot de passe</label >
                                <input type="password" className="form-control" id="mdp" ref={addInputs} />
                                <div id="emailHelp" className="form-text">Votre mot de passe doit faire minimum 6 caractères</div>
                            </div>
                            <div className="mb-3 py-2">
                                <label htmlFor="mdp2" className="form-label">Confirmer mot de passe</label>
                                <input type="password" className="form-control" id="mdp2" ref={addInputs} />
                            </div>
                            <p className="text-danger">{validation}</p>
                            <div className="text-center py-2">
                                <button type="submit" className="btn btn-dark">Créer mon compte</button>
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

