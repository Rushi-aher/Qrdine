import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categoryService";

import "./Categories.css";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

        }

    };

    const resetForm = () => {

        setName("");
        setDescription("");
        setEditingId(null);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        setLoading(true);

        try {

            if (editingId) {

                await updateCategory(
                    editingId,
                    {
                        name: name.trim(),
                        description: description.trim(),
                    }
                );

            } else {

                await createCategory({
                    name: name.trim(),
                    description: description.trim(),
                });

            }

            resetForm();

            await loadCategories();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Unable to save category."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleEdit = (category) => {

        setEditingId(category.id);

        setName(category.name);

        setDescription(
            category.description || ""
        );

    };

    const handleDelete = async (category) => {

        if (category.name === "Fast Food") {

            alert(
                "The default Fast Food category cannot be deleted."
            );

            return;

        }

        if (
            !window.confirm(
                `Delete "${category.name}"?`
            )
        ) {
            return;
        }

        try {

            await deleteCategory(category.id);

            await loadCategories();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Unable to delete category."
            );

        }

    };

    return (

        <div className="categories-page">

            <div className="categories-header">

                <div>

                    <h1>
                        Categories
                    </h1>

                    <p>
                        Manage your restaurant food categories.
                    </p>

                </div>

            </div>


            <div className="category-form-card">

                <h2>
                    {editingId
                        ? "Edit Category"
                        : "Add Category"
                    }
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        <FaPlus />

                        {editingId
                            ? "Update Category"
                            : "Add Category"
                        }

                    </button>

                    {editingId && (

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>


            <div className="categories-list">

                {categories.map((category) => (

                    <div
                        className="category-card"
                        key={category.id}
                    >

                        <div>

                            <h3>
                                {category.name}
                            </h3>

                            <p>
                                {category.description ||
                                    "No description"}
                            </p>

                        </div>

                        <div className="category-actions">

                            <button
                                className="edit-category"
                                onClick={() =>
                                    handleEdit(category)
                                }
                            >
                                <FaEdit />
                            </button>

                            <button
                                className="delete-category"
                                onClick={() =>
                                    handleDelete(category)
                                }
                            >
                                <FaTrash />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Categories;