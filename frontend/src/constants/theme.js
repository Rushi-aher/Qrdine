import { useState } from "react";

import {
    FaPlus,
    FaSearch
} from "react-icons/fa";

import "./Products.css";

const demoProducts = [

    {
        id: 1,
        name: "Veg Burger",
        category: "Burger",
        price: 149,
        stock: 25
    },

    {
        id: 2,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        stock: 18
    },

    {
        id: 3,
        name: "French Fries",
        category: "Snacks",
        price: 99,
        stock: 40
    }

];

const Products = () => {

    const [search, setSearch] = useState("");

    const filteredProducts = demoProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="products-page">

            <div className="products-header">

                <div>

                    <h1>

                        Products

                    </h1>

                    <p>

                        Manage your restaurant menu.

                    </p>

                </div>

                <button>

                    <FaPlus />

                    Add Product

                </button>

            </div>

            <div className="products-toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>

            </div>

            <table className="products-table">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredProducts.map(product=>(

                            <tr key={product.id}>

                                <td>{product.name}</td>

                                <td>{product.category}</td>

                                <td>₹{product.price}</td>

                                <td>{product.stock}</td>

                                <td>

                                    <button>

                                        Edit

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default Products;