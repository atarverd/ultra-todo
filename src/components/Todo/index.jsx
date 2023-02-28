import React, { useState, useEffect } from "react";
import { TodoUser } from "./todoUser";
import "./styles.css";
import { Modal } from "../Modal";
import { db } from "../../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";

export const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [users, setUsers] = useState([]);

  const handleModalToggle = (id) => {
    setSelected(id);
    setShowModal((o) => !o);
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        result.push({ ...doc.data(), id: doc.id });
      });
      setUsers(result);
      console.log(result);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Completion Rate(%)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TodoUser user={user} key={user.id} click={handleModalToggle} />
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          selectedId={selected}
          users={users}
          handleModalToggle={handleModalToggle}
        />
      )}
    </>
  );
};
