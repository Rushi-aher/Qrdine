import { useEffect, useState } from "react";

import "./ProductModal.css";

const ProductModal = ({
    open,
    onClose,
    onSave,
    editingProduct,
    categories,
}) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        available_quantity: "",
        category_id: "",
        is_available: true,
        image: null,
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {

        if (!open) return;

        if (editingProduct) {

            setFormData({
                name: editingProduct.name || "",
                description: editingProduct.description || "",
                price: editingProduct.price ?? "",
                available_quantity:
                    editingProduct.available_quantity ?? "",
                category_id:
                    editingProduct.category_id ?? "",
                is_available:
                    editingProduct.is_available ?? true,
                image: null,
            });

            setPreview(
                editingProduct.image
                    ? `${import.meta.env.VITE_API_URL}/${editingProduct.image}`
                    : ""
            );

        } else {

            setFormData({
                name: "",
                description: "",
                price: "",
                available_quantity: "",
                category_id: "",
                is_available: true,
                image: null,
            });

            setPreview("");
        }

    }, [editingProduct, open]);

    if (!open) {
        return null;
    }

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({
            ...formData,
            image: file,
        });

        setPreview(URL.createObjectURL(file));
    };

    const submit = () => {

        if (!formData.name.trim()) {
            alert("Please enter product name.");
            return;
        }

        if (!formData.category_id) {
            alert("Please select a category.");
            return;
        }

        if (!formData.price) {
            alert("Please enter price.");
            return;
        }

        if (formData.available_quantity === "") {
            alert("Please enter available quantity.");
            return;
        }

        if (!editingProduct && !formData.image) {
            alert("Please select a product image.");
            return;
        }

        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append(
            "available_quantity",
            formData.available_quantity
        );
        data.append("category_id", formData.category_id);
        data.append("is_available", formData.is_available);

        if (formData.image) {
            data.append("image", formData.image);
        }

        onSave(data);
    };

    return (

        <div className="modal-overlay">

            <div className="product-modal">

                <div className="modal-header">

                    <div>
                        <h2>
                            {editingProduct
                                ? "Edit Menu Item"
                                : "Add Menu Item"}
                        </h2>

                        <p>
                            {editingProduct
                                ? "Update your menu item details."
                                : "Add a new item to your restaurant menu."}
                        </p>
                    </div>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <div className="form-group">

                    <label>
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />

                </div>


                <div className="form-row">

                    <div className="form-group">

                        <label>
                            Price (₹)
                        </label>

                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Available Quantity
                        </label>

                        <input
                            type="number"
                            name="available_quantity"
                            placeholder="Enter quantity"
                            min="0"
                            value={formData.available_quantity}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Category
                    </label>

                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </div>


                <div className="availability-toggle">

                    <span>Product is available</span>

                    <label className="toggle-switch">

                        <input
                            type="checkbox"
                            name="is_available"
                            checked={formData.is_available}
                            onChange={handleChange}
                        />

                        <span className="toggle-slider"></span>

                    </label>

                </div>


                <div className="form-group">

                    <label>
                        Product Image
                    </label>

                    <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                </div>


                {preview && (

                    <div className="image-preview-container">

                        <img
                            src={preview}
                            alt="Product preview"
                            className="preview-image"
                        />

                    </div>

                )}


                <div className="modal-buttons">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="save-btn"
                        onClick={submit}
                    >
                        {editingProduct
                            ? "Update Item"
                            : "Add Item"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductModal;