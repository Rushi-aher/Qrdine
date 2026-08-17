import { useEffect, useState } from "react";

import { getCategories } from "../../services/categoryService";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>

                Categories

            </h1>

            <br />

            {

                categories.map((category) => (

                    <div
                        key={category.id}
                        style={{
                            padding: "20px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "10px"
                        }}
                    >

                        <h3>

                            {category.name}

                        </h3>

                        <p>

                            {category.description}

                        </p>

                    </div>

                ))

            }

        </div>

    );

};

export default Categories;