import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

import "./ProductTable.css";

const ProductTable = ({

    products,

    onEdit,

    onDelete,

}) => {

    return (

        <div className="product-table-wrapper">

            <table className="product-table">

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty-products"
                                    >

                                        No Menu Items Found

                                    </td>

                                </tr>

                            )

                            :

                            products.map(item => (

                                <tr key={item.id}>

                                    <td>

                                        <img

                                            src={

                                                item.image

                                                    ?

                                                    `${import.meta.env.VITE_API_URL}/${item.image}`

                                                    :

                                                    "https://placehold.co/70x70"

                                            }

                                            alt={item.name}

                                            className="product-image"

                                        />

                                    </td>

                                    <td>

                                        {item.name}

                                    </td>

                                    <td>

                                        {

                                            item.category_name

                                        }

                                    </td>

                                    <td>

                                        ₹ {item.price}

                                    </td>

                                    <td>

                                        <span

                                            className={

                                                item.available_quantity > 10

                                                    ?

                                                    "stock high"

                                                    :

                                                    item.available_quantity > 0

                                                        ?

                                                        "stock medium"

                                                        :

                                                        "stock low"

                                            }

                                        >

                                            {

                                                item.available_quantity

                                            }

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            item.is_available ?

                                                (

                                                    <span className="status active">

                                                        Available

                                                    </span>

                                                )

                                                :

                                                (

                                                    <span className="status inactive">

                                                        Out of Stock

                                                    </span>

                                                )

                                        }

                                    </td>

                                    <td>

                                        <div className="actions">

                                            <button

                                                className="edit-btn"

                                                onClick={() =>

                                                    onEdit(item)

                                                }

                                            >

                                                <FaEdit />

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={() =>

                                                    onDelete(item)

                                                }

                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ProductTable;