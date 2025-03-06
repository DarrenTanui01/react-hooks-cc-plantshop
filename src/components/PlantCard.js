import React, { useState } from "react";

function PlantCard({ plant, setPlants }) {
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(plant.price);

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handlePriceUpdate() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(price) }),
    });
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants((plants) => plants.filter((p) => p.id !== plant.id));
    });
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>
        Price: $
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          onBlur={handlePriceUpdate}
        />
      </p>
      {inStock ? (
        <button className="primary" onClick={() => setInStock(false)}>
          In Stock
        </button>
      ) : (
        <button>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
