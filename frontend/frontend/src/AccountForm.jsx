import React from "react";
import { useState } from "react";

const AccountForm = ({ existingAccount, updateCallback}) => {
    const [siteName, setSiteName] = useState(existingAccount.siteName || "")
    const [email, setEmail] = useState(existingAccount.email || "")
    const [password, setPassword] = useState(existingAccount.password || "")

    const updating = Object.entries(existingAccount).length !== 0 

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            siteName,
            email,
            password
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_account/${existingAccount.id}` : "add_account")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 200 & response.status !== 201){
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="siteName">Website:</label>
                <input type="text"
                    id="siteName"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    )


}

export default AccountForm