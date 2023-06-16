import { NavLink } from "react-router-dom";

export default function BurgerCard({ burger }) {

    return (
        <div className="card h-100 py-4 burger-card" data-aos="fade-down" data-aos-delay="300">
            <img src={burger.data.image} className="card-img-top w-100 h-100" alt={burger.data.title} />
            <div className="card-body text-center">
                <h5 className="card-title fs-3">{burger.data.title}</h5>
                <p className="card-text fs-4 fw-bold" id="card-price">{burger.data.price} €</p>
                <NavLink to={`/produits/${burger.id}`} className="btn btn-dark fs-5">Voir le produit</NavLink>
            </div>
        </div>
    )
}