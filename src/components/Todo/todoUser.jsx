import React from "react";

export const TodoUser = ({ user, click }) => {
  const completed = user.tasks.filter((t) => t.status === true);
  const rate = Math.ceil(((completed.length * 100) / user.tasks.length) | 0);

  return (
    <tr onClick={() => click(user.id)}>
      <td>{user.name}</td>
      <td>{rate}</td>
    </tr>
  );
};
