import { useDispatch, useSelector } from "react-redux";
import { decreamentQty, deleteProduct, increamentQty } from "../redux/Fast-slice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
import {useNavigate} from 'react-router-dom';
import AOS from 'aos';

export default function Cart() {

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
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });


    const cart = useSelector((state) => state.fast.cartData);
    const user = useSelector((state) => state.fast.userInfo)
    const dispatch = useDispatch();

    const [total, setTotal] = useState();
    const [delivery, setDelivery] = useState();
    const [payNow, setPayNow] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        let livraison = 0
        if (cart.length === 0) {
            livraison = 0
            setDelivery(livraison)
        } else {
            livraison = 3
            setDelivery(livraison)
        }
    }, [cart]);

    useEffect(() => {
        let totalPrice = 0
        cart.map((products) => {
            totalPrice += (products.qty * products.price)
            return totalPrice
        }); setTotal(totalPrice)
    }, [cart]);

    const handleCheckout = () => {
        if (!user) {
            toast.error("Veuillez vous connecter afin de valider votre panier")
            setTimeout(() => {
                navigate("/login")
            }, 2500)
        } else if (cart.length === 0) {
            toast.error("Vous n'avez pas de produit dans votre panier")
            setTimeout(() => {
                navigate('/produits')
            }, 2500)
        } else {
            setPayNow(true)
        }
    }

    return (
        <>
            <div className="container-fluid min-vh-100 py-5">
                <div className="container py-5">
                    <div className="row" data-aos="fade-down" data-aos-delay="300">
                        <p className="display-4 text-center py-2">Mon Panier <img src="/assets/images/cart.svg" alt="cart" /></p>
                        <hr />
                        <div className="col-sm-8" data-aos="fade-up" data-aos-delay="300">
                            {cart.map((products) => {
                                return (
                                    <div className="row py-4" key={products.id}>
                                        <div className="col-sm-4">
                                            <img src={products.image} alt="" className="w-100" />
                                            <button className="btn btn-danger"
                                                onClick={() => dispatch(deleteProduct(products)) & toast.error(`Le produit ${products.title} a été supprimé du panier`)}
                                            ><i className="bi bi-trash"></i></button>
                                        </div>
                                        <div className="col-sm-8">
                                            <p className="fs-4">{products.title}</p>
                                            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repudiandae facere natus non vero illo, provident rerum sed corporis distinctio, minus iusto sequi iste dicta.</p>
                                            <p>{products.price} €</p>
                                            <div className="d-flex">
                                                <button className="btn btn-dark" onClick={() => dispatch(increamentQty(products))}><i className="bi bi-plus fs-5"></i></button>
                                                <p className="fs-5 align-self-center ms-2 text-white mt-2">{products.qty}</p>
                                                <button className="btn btn-dark ms-2" onClick={() => dispatch(decreamentQty(products))}><i className="bi bi-dash fs-5"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>

                        <div className="col-sm-4 py-5" data-aos="fade-down" data-aos-delay="300">
                            <p className="text-center fs-4">Recapitulatif du panier</p>
                            <hr />
                            {cart.map((products) => {
                                return (
                                    <div className="row py-4" key={products.id}>
                                        <div className="col-sm-4 text-center">
                                            <img src={products.image} alt="" className="w-50" />
                                        </div>
                                        <div className="col-sm-8 text-center">
                                            <p className="fs-4">{products.title}</p>
                                            <p>{products.price * products.qty} € (quantité : {products.qty})</p>
                                        </div>
                                    </div>

                                )
                            })}
                            <hr />
                            <div className="text-center">
                                <p>Frais de livraison : {delivery} €</p>
                                <p className="fs-4">Total du panier : {total + delivery} € </p>
                                <button className="btn btn-dark fs-4" onClick={handleCheckout}>Valider mon panier</button>
                                {payNow && total > 0 && (
                                    <div className="py-4">
                                        <StripeCheckout
                                            stripeKey='pk_test_51NDof8Ck8KvJC5xMfa8aQctm8iPkD7yNeUe7CbTYZYw5u08qRCJCQmtTOUlVRgKHDU53bwiSwFr3Xwu4aNR8dP0q00TQpsiopC'
                                            name="FAST-EAT"
                                            amount={(total + delivery) * 100}
                                            label="payer"
                                            description={`paiement total de ${total + delivery} €`}
                                            email={user.email} />
                                    </div>
                                )}
                            </div>
                        </div>
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