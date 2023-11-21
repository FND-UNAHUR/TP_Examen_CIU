// marketplace/client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function App() {
  const [products, setProducts] = useState([]);
  const [showSellForm, setShowSellForm] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleSellClick = () => {
    setShowSellForm(true);
    setShowFavorites(false);
  };

  const handlePublicationsClick = () => {
    setShowSellForm(false);
    setShowFavorites(false);
  };

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleToggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Marketplace</h1>
        <ButtonGroup>
          <Button variant="primary" onClick={handleSellClick}>
            Vender
          </Button>
          <Button variant="secondary" onClick={handlePublicationsClick}>
            Publicaciones
          </Button>
          <Button variant="info" onClick={handleUserClick}>
            {userName}
          </Button>
          <Dropdown as={ButtonGroup} show={showUserMenu} onClick={() => setShowUserMenu(!showUserMenu)}>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => console.log("Clic en Compras")}>Compras</Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Clic en Preguntas")}>Preguntas</Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Clic en Opiniones")}>Opiniones</Dropdown.Item>
              <Dropdown.Item onClick={() => setShowFavorites(!showFavorites)}>
                Favoritos ({favorites.length})
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      </div>
      {showSellForm ? (
        <div>
          <h2>Formulario de Venta</h2>
          {/* ... (código del formulario de venta) */}
        </div>
      ) : showFavorites ? (
        <div>
          <h2>Favoritos</h2>
          <div className="row">
            {products
              .filter(product => favorites.includes(product.id) || favorites.includes(`new${product.id}`))
              .map(product => (
                <div key={product.id} className="col-md-3 mb-4 position-relative">
                  <div className="card">
                    <img src="https://via.placeholder.com/150" className="card-img-top" alt={product.name} />
                    <button
                      className="btn btn-warning star-button"
                      onClick={() => handleToggleFavorite(product.id)}
                      style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none' }}
                    >
                      <FontAwesomeIcon
                        icon={favorites.includes(product.id) ? solidStar : regularStar}
                        style={{ fontSize: '24px', color: 'gold' }}
                      />
                    </button>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-3 mb-4 position-relative">
            <div className="card">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={product.name} />
              <button
                className="btn btn-warning star-button"
                onClick={() => handleToggleFavorite(product.id)}
                style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none' }}
              >
                <FontAwesomeIcon
                  icon={favorites.includes(product.id) ? solidStar : regularStar}
                  style={{ fontSize: '24px', color: 'gold' }}
                />
              </button>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Nueva publicación 1 */}
        <div key="new1" className="col-md-3 mb-4 position-relative">
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="New Product 1" />
            <button
              className="btn btn-warning star-button"
              onClick={() => handleToggleFavorite("new1")}
              style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none' }}
            >
              <FontAwesomeIcon
                icon={favorites.includes("new1") ? solidStar : regularStar}
                style={{ fontSize: '24px', color: 'gold' }}
              />
            </button>
            <div className="card-body">
              <h5 className="card-title">New Product 1</h5>
              <p className="card-text">$10</p>
            </div>
          </div>
        </div>
        {/* Nueva publicación 2 */}
        <div key="new2" className="col-md-3 mb-4 position-relative">
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="New Product 2" />
            <button
              className="btn btn-warning star-button"
              onClick={() => handleToggleFavorite("new2")}
              style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none' }}
            >
              <FontAwesomeIcon
                icon={favorites.includes("new2") ? solidStar : regularStar}
                style={{ fontSize: '24px', color: 'gold' }}
              />
            </button>
            <div className="card-body">
              <h5 className="card-title">New Product 2</h5>
              <p className="card-text">$15</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default App;

