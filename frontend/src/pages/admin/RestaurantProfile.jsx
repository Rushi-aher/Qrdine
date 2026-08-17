import { useEffect, useState } from "react";

import api from "../../services/api";

import "./RestaurantProfile.css";


const RestaurantProfile = () => {

    const [logo, setLogo] = useState(null);

    const [banner, setBanner] = useState(null);

    const [form, setForm] = useState({

        name: "",
        description: "",
        address: "",
        phone: "",
        opening_time: "",
        closing_time: "",

    });

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    useEffect(() => {

        loadRestaurant();

    }, []);


    const loadRestaurant = async () => {

        try {

            const response = await api.get("/restaurants/me");

            const restaurant = response.data;

            setForm({

                name: restaurant.name || "",

                description: restaurant.description || "",

                address: restaurant.address || "",

                phone: restaurant.phone || "",

                opening_time: restaurant.opening_time || "",

                closing_time: restaurant.closing_time || "",

            });

        }

        catch (error) {

            console.error("Restaurant Error:", error);

            setError(
                "Unable to load restaurant information."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        setMessage("");

        setError("");


        try {

            const formData = new FormData();

            formData.append(
                "name",
                form.name
            );

            formData.append(
                "description",
                form.description
            );

            formData.append(
                "address",
                form.address
            );

            formData.append(
                "phone",
                form.phone
            );

            formData.append(
                "opening_time",
                form.opening_time
            );

            formData.append(
                "closing_time",
                form.closing_time
            );


            if (logo) {

                formData.append(
                    "logo",
                    logo
                );

            }


            if (banner) {

                formData.append(
                    "banner",
                    banner
                );

            }


            await api.put(
                "/restaurants/me",
                formData
            );


            setMessage(
                "Restaurant profile updated successfully."
            );

            setLogo(null);

            setBanner(null);

        }

        catch (error) {

            console.error(
                "Update Restaurant Error:",
                error
            );

            setError(

                error.response?.data?.detail ||

                "Unable to update restaurant."

            );

        }

        finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <div className="restaurant-profile">

                <h2>Loading...</h2>

            </div>

        );

    }


    return (

        <div className="restaurant-profile">

            <div className="restaurant-profile-header">

                <h1>
                    Restaurant Profile
                </h1>

                <p>
                    Manage your restaurant information.
                </p>

            </div>


            {message && (

                <div className="profile-success">

                    {message}

                </div>

            )}


            {error && (

                <div className="profile-error">

                    {error}

                </div>

            )}


            <form
                className="restaurant-profile-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>
                        Restaurant Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Address
                    </label>

                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Phone
                    </label>

                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="time-row">

                    <div className="form-group">

                        <label>
                            Opening Time
                        </label>

                        <input
                            type="time"
                            name="opening_time"
                            value={form.opening_time}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Closing Time
                        </label>

                        <input
                            type="time"
                            name="closing_time"
                            value={form.closing_time}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label>
                        Restaurant Logo
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setLogo(e.target.files[0])
                        }
                    />

                </div>


                <div className="form-group">

                    <label>
                        Restaurant Banner
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setBanner(e.target.files[0])
                        }
                    />

                </div>


                <button
                    type="submit"
                    disabled={saving}
                >

                    {saving
                        ? "Saving..."
                        : "Save Changes"
                    }

                </button>

            </form>

        </div>

    );

};


export default RestaurantProfile;