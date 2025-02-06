import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelected((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selected={selected}
        />

        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}

        <button className="button" onClick={handleShowAddFriend}>{`${
          showAddFriend ? "Close" : "Add Friend"
        }`}</button>
      </div>
      {selected && <Form selected={selected} />}
    </div>
  );
}

function FriendList({ friends, onSelection, selected }) {
  return (
    <>
      {friends.map((friend) => (
        <ul>
          <Friend
            friend={friend}
            onSelection={onSelection}
            selected={selected}
          />
        </ul>
      ))}
    </>
  );
}

function Friend({ friend, onSelection, selected }) {
  return (
    <li className={`${friend.id === selected?.id ? "selected" : ""}`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>{friend.balance}</p>
      <button className="button" onClick={() => onSelection(friend)}>
        Select
      </button>
    </li>
  );
}

function Form({ selected }) {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selected.name} </h2>
      <label>💰 Bill value</label>
      <input type="text" />
      <label>🧍‍♀️ Your expense</label>
      <input type="text" />
      <label>👫 {selected.name}'s expense</label>
      <input disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>{selected?.name}</option>
      </select>
    </form>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}
