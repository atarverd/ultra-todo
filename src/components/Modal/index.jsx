import React, { useState, useEffect } from "react";
import { TodoStatus } from "../Todo/todoStatus";
import "./styles.css";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const Modal = ({ selectedId, users, handleModalToggle }) => {
  const [task, setTask] = useState("");
  const [addTodo, setAddTodo] = useState(false);
  const [user, setUser] = useState({});
  const userRef = doc(db, "users", selectedId);

  const handleAdd = () => {
    setAddTodo((o) => !o);
  };

  const addTask = async () => {
    if (task) {
      setAddTodo(false);
      await updateDoc(userRef, {
        tasks: [
          { title: task, status: false, id: uuidv4() },
          ...users.find((u) => u.id === selectedId).tasks,
        ],
      });
      setTask("");
    }
  };

  const changeStatus = async (id) => {
    const newArr = user.tasks.map((user) => {
      if (user.id === id) {
        user.status = true;
      }
      return user;
    });

    await updateDoc(userRef, {
      tasks: newArr,
    });
  };

  useEffect(() => {
    setUser(users.find((user) => user.id === selectedId));
  }, [users]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleModalToggle}>
          &times;
        </span>
        {addTodo ? (
          <div className="modal-input-div">
            <input
              value={task}
              className="modal-input"
              placeholder="New to-do description"
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="btn modal-add-btn" onClick={addTask}>
              ✓
            </button>
          </div>
        ) : (
          <button className="btn modal-add-btn" onClick={handleAdd}>
            +
          </button>
        )}
        <h1 className="modal-header-text">To-Do list for {user.name}</h1>
        {user.tasks?.map((el, i) => (
          <TodoStatus
            id={el.id}
            key={i}
            title={el.title}
            status={el.status}
            changeStatus={changeStatus}
          />
        ))}
      </div>
    </div>
  );
};
