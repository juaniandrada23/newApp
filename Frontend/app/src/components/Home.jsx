import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="header-content">
                    <h1 className="logo">MJ de la Joyería</h1>
                    <nav className="nav-links">
                        <Link to="/shop" className="nav-link">Shop</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </nav>
                </div>
            </header>
            <main className="home-main">
                <div className="hero-section">
                    <h2 className="main-title">Discover Exquisite Jewelry Collections</h2>
                    <p className="main-description">Emprendimiento con 8 años de trayectoria, ubicado en La Rioja, Argentina. Explora nuestra exclusiva colección y encuentra la pieza perfecta para adornarte o regalar a un ser querido.</p>
                    <Link to="/shop" className="shop-button">Start Shopping</Link>
                </div>
                <section className="features-section">
                    <div className="feature">
                        <h3 className="feature-title">Quality Craftsmanship</h3>
                        <p className="feature-description">Each piece is meticulously crafted with the finest materials.</p>
                    </div>
                    <div className="feature">
                        <h3 className="feature-title">Exclusive Designs</h3>
                        <p className="feature-description">Unique and elegant designs that you won't find anywhere else.</p>
                    </div>
                    <div className="feature">
                        <h3 className="feature-title">Customer Satisfaction</h3>
                        <p className="feature-description">Our top priority is to provide you with a delightful shopping experience.</p>
                    </div>
                </section>
            </main>
            <footer className="home-footer">
                <div className="footer-content">
                    &copy; 2024 MJ de la Joyería. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
};

export default Home;
