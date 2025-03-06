import React, { useState } from "react";

function PlantCard({ plant }) {
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
    </li>
  );
}

export default PlantCard;
