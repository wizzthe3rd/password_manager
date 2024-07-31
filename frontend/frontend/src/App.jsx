import { useState, useEffect } from "react";
import "./App.css";
import AccountList from "./AccountList";
import AccountForm from "./AccountForm";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch("http://127.0.0.1:5000/accounts");
    const data = await response.json();
    setAccounts(data.accounts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAccount({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (account) => {
    if (isModalOpen) return;
    setCurrentAccount(account);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchAccounts();
  };

  return (
    <div className="container">
      <div className="menu-deader">
        <h2>Accounts</h2>
        <button className="create_button" onClick={openCreateModal}>+</button>
      </div>

      <AccountList
        accounts={accounts}
        updateAccount={openEditModal}
        updateCallback={onUpdate}
      />

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <AccountForm
              existingAccount={currentAccount}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
