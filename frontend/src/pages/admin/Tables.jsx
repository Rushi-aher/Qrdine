import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import api from "../../services/api";

import "./Tables.css";

const Tables = () => {

    const [tables, setTables] = useState([]);

    const [tableNumber, setTableNumber] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    useEffect(() => {

        loadTables();

    }, []);


    const loadTables = async () => {

        try {

            const response = await api.get("/tables");

            setTables(response.data);

        }

        catch (error) {

            console.error(
                "Tables Error:",
                error
            );

            setError(
                "Unable to load tables."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const handleAddTable = async (e) => {

        e.preventDefault();

        if (!tableNumber) {

            return;

        }

        setSaving(true);

        setError("");

        setMessage("");


        try {

            const response = await api.post(
                "/tables",
                {
                    table_number: Number(tableNumber),
                }
            );

            setTables((previous) => [

                ...previous,

                response.data,

            ]);

            setTableNumber("");

            setMessage(
                "Table added successfully."
            );

        }

        catch (error) {

            console.error(
                "Add Table Error:",
                error
            );

            setError(

                error.response?.data?.detail ||

                "Unable to add table."

            );

        }

        finally {

            setSaving(false);

        }

    };


    const handleDeleteTable = async (tableId) => {

        try {

            await api.delete(
                `/tables/${tableId}`
            );

            setTables((previous) =>

                previous.filter(
                    (table) => table.id !== tableId
                )

            );

            setMessage(
                "Table deleted successfully."
            );

        }

        catch (error) {

            console.error(
                "Delete Table Error:",
                error
            );

            setError(

                error.response?.data?.detail ||

                "Unable to delete table."

            );

        }

    };


    const getMenuUrl = (tableId) => {

        return `${window.location.origin}/menu?table=${tableId}`;

    };


    if (loading) {

        return (

            <div className="tables-page">

                <h2>
                    Loading tables...
                </h2>

            </div>

        );

    }


    return (

        <div className="tables-page">

            <div className="tables-header">

                <div>

                    <h1>
                        Tables
                    </h1>

                    <p>
                        Manage your restaurant tables.
                    </p>

                </div>

            </div>


            {message && (

                <div className="tables-success">

                    {message}

                </div>

            )}


            {error && (

                <div className="tables-error">

                    {error}

                </div>

            )}


            <form
                className="add-table-form"
                onSubmit={handleAddTable}
            >

                <input
                    type="number"
                    min="1"
                    placeholder="Enter table number"
                    value={tableNumber}
                    onChange={(e) =>
                        setTableNumber(e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={saving}
                >

                    {saving
                        ? "Adding..."
                        : "Add Table"
                    }

                </button>

            </form>


            {tables.length === 0 ? (

                <div className="no-tables">

                    <h2>
                        No tables yet
                    </h2>

                    <p>
                        Add your first table above.
                    </p>

                </div>

            ) : (

                <div className="tables-grid">

                    {tables.map((table) => (

                        <div
                            className="table-card"
                            key={table.id}
                        >

                            <div className="table-number">

                                Table {table.table_number}

                            </div>

                            <div className="table-id">

                                ID: {table.id}

                            </div>

                            <div className="table-qr">

                                <QRCodeCanvas
                                    value={getMenuUrl(table.id)}
                                    size={180}
                                />

                            </div>

                            <p className="qr-url">

                                Scan to open menu

                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    handleDeleteTable(
                                        table.id
                                    )
                                }
                            >

                                Delete

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};


export default Tables;