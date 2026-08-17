import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import ProductTable from "../../components/admin/ProductTable";
import ProductModal from "../../components/admin/ProductModal";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";

import "./Products.css";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {

        loadProducts();

        loadCategories();

    }, []);

    const loadProducts = async () => {

        try {

            const data = await getProducts();

            setProducts(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleAdd = () => {

        setEditingProduct(null);

        setOpenModal(true);

    };

    const handleEdit = (product) => {

        setEditingProduct(product);

        setOpenModal(true);

    };

    const handleDelete = async (product) => {

        if (!window.confirm(`Delete "${product.name}" ?`))
            return;

        try {

            await deleteProduct(product.id);

            loadProducts();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete item.");

        }

    };

    const handleSave = async (formData) => {

        try {

            if (editingProduct) {

                await updateProduct(
                    editingProduct.id,
                    formData
                );

            }

            else {

                await createProduct(formData);

            }

            setOpenModal(false);

            loadProducts();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Unable to save item."
            );

        }

    };

    const filteredProducts = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <div className="products-page">

            <div className="products-header">

                <div>

                    <h1>

                        Menu Items

                    </h1>

                    <p>

                        Manage your restaurant menu.

                    </p>

                </div>

                <button onClick={handleAdd}>

                    <FaPlus />

                    Add Item

                </button>

            </div>

            <div className="products-toolbar">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Menu Item..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

            </div>

            <ProductTable

                products={filteredProducts}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <ProductModal

                open={openModal}

                onClose={() => setOpenModal(false)}

                onSave={handleSave}

                editingProduct={editingProduct}

                categories={categories}

            />

        </div>

    );

};

export default Products;