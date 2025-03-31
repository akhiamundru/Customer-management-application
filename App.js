import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/customers/")
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleAddCustomer = () => {
        axios.post("http://127.0.0.1:8000/customers/", { name, email })
            .then(res => setCustomers([...customers, res.data]))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Customer Management</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleAddCustomer}>Add Customer</button>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.name} - {customer.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
