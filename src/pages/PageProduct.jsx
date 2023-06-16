import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/Fast-slice";
import { ToastContainer, toast } from 'react-toastify';
import AOS from 'aos';

export default function PageProduct() {

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

    const { id } = useParams();

    const [data, setData] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "Fast", id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setData([{ id: docSnap.id, data: docSnap.data() }])
            } else {
                console.log('pas de document')
            }
        };
        getData();
    }, [])

    return (
        <>
            <div className="container-fluid min-vh-100 py-5">
                <div className="container py-5">
                    {data.map((product) => {
                        return (
                            <div className="row py-5 align-items-center" key={product.id}>
                                <div className="col-sm-6 py-5" data-aos="fade-up" data-aos-delay="300">
                                    <img src={product.data.image} alt="" className="w-100" id="product-img"/>
                                </div>
                                <div className="col-sm-6" data-aos="fade-down" data-aos-delay="300">
                                    <p className="fs-2">{product.data.title}</p>
                                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio inventore velit numquam dignissimos vero eum suscipit expedita minima! Ut illum, minima porro sint reiciendis natus? Aperiam fugiat assumenda veniam non dolorem ipsa rerum, maxime cupiditate provident ullam asperiores modi corrupti maiores nulla sit voluptas? Explicabo facere incidunt debitis nihil deleniti.</p>
                                    <p className="card-text fs-4" id="card-price">{product.data.price} €</p>
                                    <div>
                                        <button className="btn btn-dark fs-4"
                                            onClick={() => dispatch(addToCart({
                                                id: product.id,
                                                price: product.data.price,
                                                title: product.data.title,
                                                image: product.data.image,
                                                qty: 1
                                            })) & toast.success(`Le produit ${product.data.title} a été ajouté au panier`)}
                                        >Ajouter au panier <i className="bi bi-bag-check"></i></button>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
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