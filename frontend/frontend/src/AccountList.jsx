import { useState } from "react";
import React from "react";

const AccountList = ({ accounts, updateAccount, updateCallback }) => {

const onDelete = async (id) => {
    try {
        const options = {
            method: "DELETE"
        }
        const response = await fetch(`http://127.0.0.1:5000/remove_account/${id}`, options)
        if (response.status === 200) {
            updateCallback()
        } else{
            console.error("Failed to delete")
        }
    } catch (error) {
        alert(error)
    }
}

    return <div>
        <table>
            <thead>
                <tr>
                    <th>Website</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((account) => (
                    <tr key={account.id}>
                        <td>{account.siteName}</td>
                        <td>{account.email}</td>
                        <td>{account.password}</td>
                        <td>
                            <button className="update" onClick={() => updateAccount(account)}>Update</button>
                            <button className="delete" onClick={() => onDelete(account.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default AccountList