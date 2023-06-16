import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase-config";
import BurgerCard from "./BurgerCard";

export default function HomeCards() {

    const [data, setData] = useState([]);


    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, "Fast"), where("categorie","==", "burger"))
            const querySnapshot = await getDocs(q)
            const newData = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }); setData(newData)
        };
        getData();
    }, [])

    return (
        <>
            <div className="container">
                <p className="display-4 text-center text-white py-5" data-aos="fade-down" data-aos-delay="300">Découvrez nos burgers</p>
                <div className="row">
                    {data.map((burger) => {
                        return (
                                <div className="col-sm-4 my-2" key={burger.id}>
                                    <BurgerCard burger={burger} />
                                </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}