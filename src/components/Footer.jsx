export default function Footer () {
    
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container py-5">
                <hr />
                    <div className="row py-5 text-center">
                        <div className="col-sm-3 py-2">
                        <a className="navbar-brand fs-2 title" href="#">Fast-<span className="text-white">Eat</span></a>
                        </div>
                        <div className="col-sm-3 py-2">
                            <li className="text-white fs-5 py-2">Recrutement</li>
                            <li className="text-white fs-5 py-2">Contact</li>
                            <li className="text-white fs-5 py-2">Restaurants</li>
                        </div>
                        <div className="col-sm-3 py-2">
                            <li className="text-white fs-5 py-2">Team</li>
                            <li className="text-white fs-5 py-2">Société</li>
                            <li className="text-white fs-5 py-2">A propos</li>
                        </div>
                        <div className="col-sm-3 py-2">
                        <button className="btn btn-dark"><i className="bi bi-facebook fs-4"></i></button>
                        <button className="btn btn-dark ms-2"><i className="bi bi-twitter fs-4"></i></button>
                        <button className="btn btn-dark ms-2"><i className="bi bi-instagram fs-4"></i></button>
                        <button className="btn btn-dark ms-2"><i className="bi bi-linkedin fs-4"></i></button>
                        </div>
                    </div>
                    <hr /> 
                    Copyright © 2023 Fast-Eat - All rights reserved
                </div>
            </div>
        </>
    )
}