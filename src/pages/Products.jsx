import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase-config";
import ProductCard from "../components/ProductsComponents/ProductCard";
import AOS from 'aos';

export default function Products() {

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

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, "Fast"))
            const querySnapshot = await getDocs(q)
            const newData = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }); setData(newData);
            setFilter(newData);
        };
        getData();
    }, [])


    const priceFilter = (prix1, prix2) => {
        const dataCopy = [...data]
        const filtre = dataCopy.filter((produit) => produit.data.price > prix1 && produit.data.price <= prix2)
        setFilter(filtre)
    }

    const categoryFilter = (cat) => {
        const dataCopy = [...data]
        const filtre = dataCopy.filter((produit) => produit.data.categorie === cat)
        setFilter(filtre)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        const value = event.target.value.toLowerCase()
        setSearch(value)
        const dataCopy = [...data]
        const filtre = dataCopy.filter(produit => produit.data.title.toLowerCase().includes(value) || produit.data.categorie.toLowerCase().includes(value))
        setFilter(filtre)
    }


    return (
        <>
            <div className="container-fluid py-5 min-vh-100">
                <div className="container py-5">
                    <div className="row py-5" data-aos="fade-up" data-aos-delay="300">
                        <p className="display-3 text-center" >Retrouvez ici tout nos produits <img src="/assets/images/couverts.svg" alt="" /></p>
                        <hr />
                    </div>
                    <form className="d-flex" role="search" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="500">
                        <input 
                        className="form-control me-2 fs-5" 
                        type="search" 
                        placeholder="Rechercher" 
                        aria-label="Search" 
                        autoFocus
                        value={search}
                        onChange={handleChange}
                        />
                        <button className="btn btn-dark" type="submit" id="button-search"><i className="bi bi-search fs-4"></i></button>
                    </form>

                    <div className="d-flex" data-aos="fade-up" data-aos-delay="500">
                        <div className="dropdown py-2 me-2">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorie
                            </button>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={() => categoryFilter("menu")}>Menu</li>
                                <li className="dropdown-item" onClick={() => categoryFilter("burger")}>Burger</li>
                                <li className="dropdown-item" onClick={() => categoryFilter("pizza")}>Pizza</li>
                                <li className="dropdown-item" onClick={() => categoryFilter("snack")}>Snack</li>
                                <li className="dropdown-item" onClick={() => categoryFilter("boisson")}>Boissons</li>
                                <li className="dropdown-item" onClick={() => setFilter(data)}>Tout</li>
                            </ul>
                        </div>
                        <div className="dropdown py-2">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Prix
                            </button>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item" onClick={() => priceFilter(0, 10)}>0 à 10 €</li>
                                <li className="dropdown-item" onClick={() => priceFilter(11, 20)}>11 à 20 €</li>
                                <li className="dropdown-item" onClick={() => priceFilter(20, 100)}>plus de 20 €</li>
                                <li className="dropdown-item" onClick={() => setFilter(data)}>Tout</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="container">
                    <div className="row">
                        <p>Produits trouvés ({filter.length})</p>
                        {filter.map((products) => {
                            return (
                                <ProductCard products={products} key={products.id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}