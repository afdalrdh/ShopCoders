import React, { useEffect, useState } from 'react'
import TshirtCard from '../../components/TshirtCard'
import styles from "../../styles/Shoptshirts.module.css"
import Navbar from "../../components/Navbar.jsx"
import Products from "../../models/ProductSchema.js";
import mongoose from 'mongoose'
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/legacy/image'
import Head from 'next/head';

const Shophoodies = ({ allproducts }) => {

    const [creds, setcreds] = useState("");

    useEffect(() => {
        const usermail = localStorage.getItem("useremail");
        setcreds(usermail);
    }, []);




    return (
        <>

            <Head>

                <title>ShopCoders | TShirts </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />

            </Head>

            <Navbar />
            <div className={`container-fluid ${styles.shirtpage_parent}`}>

                {allproducts.map((item) => {
                    return (
                        // <TshirtCard key={product._id} product={product} />
                        <Link href={`/detailedproduct/${item.slug}&${creds}`} passHref={true} key={item._id}>




                            <div className={`card ${styles.itemscard_card}`} style={{ width: "18rem" }}>
                                <Image src={item.img} className={`card-img-top ${styles.itemscard_img}`} alt="..." height={300} width={300} />

                                <div className="card-body">

                                    <h5 className={`card-title ${styles.itemscard_title}`}>{item.name}</h5>




                                    <h5 className={styles.itemcard_price}>$ {item.price}</h5>

                                    <BsFillCartFill
                                        size={20}
                                        style={{ fill: "#C70A80", marginRight: "1rem", cursor: "pointer" }}
                                    />

                                    <BsFillHeartFill
                                        size={20}
                                        style={{ fill: "#F24C4C", marginRight: "5px", cursor: "pointer" }}
                                    />

                                </div>
                            </div>


                        </Link>
                    )

                })}


            </div>

        </>
    )
}

// we have used this in place of useeFFECT
// because we are not using useEffect in this page
// we are calling connecttomongo and connecting to the database, then we are getting the data from the database
// and we are storing and passing them as props !!

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }


    let allproducts = await Products.find({ category: "hoodies" });

    // res.status(200).json({ allproducts });
    return {
        props: { allproducts: JSON.parse(JSON.stringify(allproducts)) }, // will be passed to the page component as props
    }
}

export default Shophoodies