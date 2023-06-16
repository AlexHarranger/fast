import HomeCards from "../components/HomeComponents/HomeCards";
import AOS from 'aos';

export default function Home() {


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
            <div className="container-fluid">
                <div className="container py-5">
                    <div className="row min-vh-100 align-items-center">
                        <div className="col-sm-6">
                            <p className="display-3 fw-bold" data-aos="fade-up" data-aos-delay="300">Une petite faim ?</p>
                            <p className="fs-4 text-white py-3" data-aos="fade-up" data-aos-delay="600">Découvrez le meilleur fast-food de la région et commandez directement en ligne</p>
                            <button className="btn btn-dark fs-5" data-aos="fade-up" data-aos-delay="600">Voir nos produits <i className="bi bi-cup-straw fs-5"></i></button>
                        </div>
                        <div className="col-sm-6" data-aos="fade-down" data-aos-delay="300">
                            <img src="/assets/images/cheese2.png" alt="" className="w-100" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 position-relative">
                            <div className="position-relative">
                                <div className="col-sm-10" data-aos="fade-down" data-aos-delay="300">
                                    <img src="/assets/images/burger.jpg" alt="burger" className="w-100 rounded" />
                                </div>
                                <img src="/assets/images/fries.jpg" alt="fries" className="w-25 position-absolute end-0 bottom-50 rounded" data-aos="fade-down" data-aos-delay="400"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <p className="display-4 py-4" data-aos="fade-up" data-aos-delay="300">Des ingrédients de qualités</p>
                            <p className="text-white fs-" data-aos="fade-up" data-aos-delay="600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse expedita odio blanditiis quae est? In eum omnis sapiente pariatur, rerum odio nostrum error officiis perferendis doloribus quo porro dolorem a, saepe quidem non molestiae quae, incidunt recusandae? Velit harum, distinctio cupiditate odio nostrum et autem necessitatibus! Deleniti saepe libero quas!</p>
                            <button className="btn btn-dark fs-5" data-aos="fade-up" data-aos-delay="600">En savoir plus <i className="bi bi-arrow-right fs-5"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row py-5">
                        <p className="display-3 text-white text-center py-5" data-aos="fade-down" data-aos-delay="300">Prenez votre commande en ligne</p>
                        <div className="col-sm-4 text-center" data-aos="fade-up" data-aos-delay="300">
                            <img src="/assets/images/order.svg" alt="order" />
                            <p className="fs-4">Commander</p>
                            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis pariatur, nemo saepe repellat consequuntur natus. Totam obcaecati cumque delectus quibusdam cupiditate amet sint inventore illum!</p>
                        </div>
                        <div className="col-sm-4 text-center" data-aos="fade-up" data-aos-delay="400">
                            <img src="/assets/images/delivery.svg" alt="order" />
                            <p className="fs-4">Livraison</p>
                            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis pariatur, nemo saepe repellat consequuntur natus. Totam obcaecati cumque delectus quibusdam cupiditate amet sint inventore illum!</p>
                        </div>
                        <div className="col-sm-4 text-center" data-aos="fade-up" data-aos-delay="500">
                            <img src="/assets/images/manger.svg" alt="order" />
                            <p className="fs-4">Manger</p>
                            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis pariatur, nemo saepe repellat consequuntur natus. Totam obcaecati cumque delectus quibusdam cupiditate amet sint inventore illum!</p>
                        </div>
                    </div>
                </div>
            </div>

            <HomeCards />
        </>
    )
}