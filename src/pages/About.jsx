import { NavLink } from "react-router-dom";
import AOS from 'aos';

export default function About() {

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

    return (
        <>

            <div className="container-fluid min-vh-100 py-5">
                <div className="container py-4">
                    <div className="row min-vh-100 align-items-center">
                        <div className="col-sm-6" data-aos="fade-down" data-aos-delay="300">
                            <img src="/assets/images/chef.png" alt="chef" className="w-100 rounded" />
                        </div>
                        <div className="col-sm-6 py-4" data-aos="fade-up" data-aos-delay="300">
                            <p className="display-3 fw-bold" >Un chef passioné</p>
                            <p className="fs-4 text-white py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa recusandae laudantium, vero omnis cupiditate blanditiis pariatur aut a eveniet illo obcaecati et velit dolor quis saepe sit quas modi qui in molestias. Nam vitae excepturi eos inventore atque veritatis reprehenderit asperiores, eaque assumenda dolor necessitatibus accusantium rerum porro earum perferendis.</p>
                            <NavLink to="/produits" className="btn btn-dark fs-5" >Voir nos produits <i className="bi bi-cup-straw fs-5"></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid min-vh-100 py-5">
                <div className="container py-4">
                    <div className="row min-vh-100 align-items-center">
                        <div className="col-sm-6" data-aos="fade-down" data-aos-delay="300">
                            <img src="/assets/images/online.jpg" alt="order" className="w-100 rounded" />
                        </div>
                        <div className="col-sm-6 py-4" data-aos="fade-up" data-aos-delay="300">
                            <p className="display-3 fw-bold" >Créer votre compte facilement</p>
                            <p className="fs-4 text-white py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa recusandae laudantium, vero omnis cupiditate blanditiis pariatur aut a eveniet illo obcaecati et velit dolor quis saepe sit quas modi qui in molestias. Nam vitae excepturi eos inventore atque veritatis reprehenderit asperiores, eaque assumenda dolor necessitatibus accusantium rerum porro earum perferendis.</p>
                            <NavLink to="/signup" className="btn btn-dark fs-5" >Créer mon compte<i className="bi bi-person-fill-check"></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row align-items-center" data-aos="fade-down" data-aos-delay="300">
                        <div className="col-sm-6">
                            <img src="/assets/images/dinner3.png" alt="dinner" className="w-100 " />
                        </div>
                        <div className="col-sm-6" data-aos="fade-up" data-aos-delay="300">
                            <p className="display-3 fw-bold" >Large gamme de produits</p>
                            <p className="fs-4 text-white py-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, laudantium iure soluta dolore velit ea accusantium fugit tenetur dolorum aperiam harum repellendus unde sequi autem eos voluptatibus incidunt adipisci architecto! Nihil ratione libero culpa odio? Esse dolorem necessitatibus quis quibusdam, doloremque similique, velit omnis nostrum tempora, iure quod illo cum.</p>
                            <NavLink to="/produits" className="btn btn-dark fs-5" >Voir nos produits <i className="bi bi-cup-straw fs-5"></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}