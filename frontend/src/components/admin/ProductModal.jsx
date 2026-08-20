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

                name: editingProduct.name,

                description: editingProduct.description,

                price: editingProduct.price,

                available_quantity: editingProduct.available_quantity,

                category_id: editingProduct.category_id,

                is_available: editingProduct.is_available,

                image: null,

            });

            setPreview(

                editingProduct.image

                    ? `${import.meta.env.VITE_API_URL}/${editingProduct.image}`

                    : ""

            );

        }

        else {

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

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({

            ...formData,

            image: file,

        });

        setPreview(

            URL.createObjectURL(file)

        );

    };

    const submit = () => {

        const data = new FormData();

        data.append(

            "name",

            formData.name

        );

        data.append(

            "description",

            formData.description

        );

        data.append(

            "price",

            formData.price

        );

        data.append(

            "available_quantity",

            formData.available_quantity

        );

        data.append(

            "category_id",

            formData.category_id

        );

        data.append(

            "is_available",

            formData.is_available

        );

        if (formData.image) {

            data.append(

                "image",

                formData.image

            );

        }

        onSave(data);

    };

    return (

        <div className="modal-overlay">

            <div className="product-modal">

                <h2>

                    {

                        editingProduct

                            ? "Edit Menu Item"

                            : "Add Menu Item"

                    }

                </h2>

                <input

                    placeholder="Name"

                    value={formData.name}

                    onChange={(e) =>

                        setFormData({

                            ...formData,

                            name: e.target.value,

                        })

                    }

                />

                <textarea

                    placeholder="Description"

                    value={formData.description}

                    onChange={(e) =>

                        setFormData({

                            ...formData,

                            description: e.target.value,

                        })

                    }

                />

                <input

                    type="number"

                    placeholder="Price"

                    value={formData.price}

                    onChange={(e) =>

                        setFormData({

                            ...formData,

                            price: e.target.value,

                        })

                    }

                />

                <input

                    type="number"

                    placeholder="Available Quantity"

                    value={formData.available_quantity}

                    onChange={(e) =>

                        setFormData({

                            ...formData,

                            available_quantity: e.target.value,

                        })

                    }

                />

                <select

                    value={formData.category_id}

                    onChange={(e) =>

                        setFormData({

                            ...formData,

                            category_id: e.target.value,

                        })

                    }

                >

                    <option value="">

                        Select Category

                    </option>

                    {

                        categories.map(category => (

                            <option

                                key={category.id}

                                value={category.id}

                            >

                                {category.name}

                            </option>

                        ))

                    }

                </select>

                <label className="availability">

                    <input

                        type="checkbox"

                        checked={formData.is_available}

                        onChange={(e) =>

                            setFormData({

                                ...formData,

                                is_available: e.target.checked,

                            })

                        }

                    />

                    Available

                </label>

                <input

                    type="file"

                    accept="image/*"

                    onChange={handleImage}

                />

                {

                    preview && (

                        <img

                            src={preview}

                            alt="preview"

                            className="preview-image"

                        />

                    )

                }

                <div className="modal-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="save-btn"

                        onClick={submit}

                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ProductModal;