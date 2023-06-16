import { NavLink } from "react-router-dom";

export default function ProductCard({ products }) {

    return (
        <div className="col-sm-4 py-2 my-4">
            <div className="card h-100" data-aos="fade-up" data-aos-delay="300">
                <img src={products.data.image} className="card-img-top w-100" alt={products.data.title} id="img-card"/>
                    <div className="card-body text-center">
                        <h5 className="card-title fs-4">{products.data.title}</h5>
                        <p className="card-text fs-4" id="card-price">{products.data.price} €</p>
                        <NavLink to={`/produits/${products.id}`} className="btn btn-dark fs-5">Voir le produit</NavLink>
                    </div>
            </div>
        </div>
    )
}