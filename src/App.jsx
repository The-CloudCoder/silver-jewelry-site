import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const PRODUCTS = [
  { id: 'ring-01', title: 'Classic Silver Ring', price: 129.0, sku: 'SR-001', description: 'Sterling silver classic ring with polished finish. Comfortable fit for everyday wear.', image: '/images/Gemini_Generated_Image_er61zver61zver61.png' },
  { id: 'necklace-01', title: 'Moonlight Necklace', price: 199.0, sku: 'SN-002', description: 'Delicate silver chain with a moon-shaped pendant, handcrafted details.', image: '/images/Gemini_Generated_Image_u8anzju8anzju8an.png' },
  { id: 'bracelet-01', title: 'Celtic Silver Bracelet', price: 149.0, sku: 'SB-003', description: 'Intricately braided silver bracelet with oxidized accents.', image: '/images/Gemini_Generated_Image_dbm258dbm258dbm2.png' },
  { id: 'earrings-01', title: 'Petite Hoop Earrings', price: 89.0, sku: 'SE-004', description: 'Lightweight hoops in sterling silver — perfect for daily wear.', image: '/images/Gemini_Generated_Image_rc5n2arc5n2arc5n.png' },
  { id: 'pendant-01', title: 'Lotus Silver Pendant', price: 109.0, sku: 'SP-005', description: 'Symbolic lotus pendant with a satin finish and fine engraving.', image: '/images/Gemini_Generated_Image_xqq7kkxqq7kkxqq7.png' },
  { id: 'chain-01', title: 'Bold Silver Chain', price: 179.0, sku: 'SC-006', description: 'A sturdy, well-polished chain that complements any outfit.', image: '/images/Gemini_Generated_Image_w2ehohw2ehohw2eh.png' },
];

const CartContext = createContext();
function useCart(){ return useContext(CartContext); }
function CartProvider({ children }){
  const [cart, setCart] = useState(()=>{ try{ const raw=localStorage.getItem('sj_cart'); return raw?JSON.parse(raw):[] }catch(e){return []} });
  useEffect(()=>{ localStorage.setItem('sj_cart', JSON.stringify(cart)); }, [cart]);
  function addToCart(product, qty=1){ setCart(c=>{ const exists=c.find(i=>i.id===product.id); if(exists) return c.map(i=>i.id===product.id?{...i,qty:i.qty+qty}:i); return [...c,{ id: product.id, title: product.title, price: product.price, image: product.image, qty }]; }) }
  function updateQty(id, qty){ setCart(c=>c.map(i=>i.id===id?{...i,qty}:i)); }
  function removeItem(id){ setCart(c=>c.filter(i=>i.id!==id)); }
  function clearCart(){ setCart([]); }
  const total = cart.reduce((s,i)=>s + i.qty * i.price, 0);
  const count = cart.reduce((s,i)=>s + i.qty, 0);
  return <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, total, count }}>{children}</CartContext.Provider>
}

/* Components */
function Navbar(){
  const { count } = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Swarom silver</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">Cart <span className="badge bg-dark ms-1">{count}</span></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero(){ return (
  <section className="py-5 bg-light">
    <div className="container d-flex flex-column flex-lg-row align-items-center gap-4">
      <div className="flex-1">
        <h1 className="display-5 fw-bold">Timeless Silver Jewelry</h1>
        <p className="lead text-muted">Handcrafted sterling silver pieces — elegant, durable, and made to shine every day.</p>
        <Link to="/products" className="btn btn-dark btn-lg">Shop Collection</Link>
      </div>
      <div className="flex-1 text-center"><img src="/images/hero.png" alt="hero" className="img-fluid rounded" style={{maxHeight:320}}/></div>
    </div>
  </section>
) }

function ProductCard({ product }){ return (
  <div className="card h-100 shadow-sm">
    <img src={product.image} className="card-img-top" alt={product.title} style={{objectFit:'cover', height:260}}/>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text text-muted small">{product.description}</p>
      <div className="mt-auto d-flex justify-content-between align-items-center">
        <div className="fw-bold">₹{product.price.toFixed(2)}</div>
        <Link to={`/product/${product.id}`} className="btn btn-outline-dark btn-sm">View</Link>
      </div>
    </div>
  </div>
) }

/* Pages */
function Home(){ const featured = PRODUCTS.slice(0,3); return (
  <div>
    <Hero />
    <section className="container py-5">
      <h2 className="mb-4">Featured Products</h2>
      <div className="row g-4">{featured.map(p=>(
        <div key={p.id} className="col-12 col-sm-6 col-lg-4"><ProductCard product={p} /></div>
      ))}</div>
    </section>
    <section className="bg-white py-5 border-top"><div className="container"><h3>About Swarom silver.</h3><p className="text-muted">We craft high-quality sterling silver jewelry with attention to detail. Free shipping over ₹2,000. 30-day returns.</p></div></section>
  </div>
) }

function ProductsPage(){ return (
  <section className="container py-5">
    <h2 className="mb-4">All Products</h2>
    <div className="row g-4">{PRODUCTS.map(p=>(<div key={p.id} className="col-12 col-sm-6 col-lg-4"><ProductCard product={p} /></div>))}</div>
  </section>
) }

function ProductDetail(){
  const { id } = useParams(); const product = PRODUCTS.find(p=>p.id===id); const { addToCart } = useCart(); const [qty,setQty]=useState(1); const navigate = useNavigate();
  if(!product) return <div className="container py-5">Product not found.</div>;
  function handleAdd(){ addToCart(product, qty); navigate('/cart'); }
  return (
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-md-6 text-center"><img src={product.image} alt={product.title} className="img-fluid rounded" style={{maxHeight:480}}/></div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">SKU: {product.sku}</p>
          <h3 className="fw-bold">₹{product.price.toFixed(2)}</h3>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex align-items-center gap-2 mt-4">
            <label className="me-2">Qty:</label>
            <input type="number" className="form-control" style={{width:100}} min="1" value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)||1))} />
            <button className="btn btn-dark ms-3" onClick={handleAdd}>Add to Cart</button>
          </div>
          <div className="mt-4">
            <h6>Related</h6>
            <div className="d-flex gap-3 mt-2">
              {PRODUCTS.filter(p=>p.id!==product.id).slice(0,3).map(rp=>(
                <Link key={rp.id} to={`/product/${rp.id}`} className="text-decoration-none text-dark"><div style={{width:80}}><img src={rp.image} alt={rp.title} className="img-fluid rounded"/></div></Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CartPage(){
  const { cart, updateQty, removeItem, total, clearCart } = useCart(); const navigate = useNavigate();
  function handleCheckout(){ navigate('/checkout'); }
  return (
    <section className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      {cart.length===0 ? (<div className="alert alert-info">Your cart is empty. <Link to="/products">Shop products</Link></div>) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="list-group">
              {cart.map(it=>(
                <div key={it.id} className="list-group-item d-flex gap-3 align-items-center">
                  <img src={it.image} alt={it.title} style={{width:96,height:96,objectFit:'cover'}} className="rounded" />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">{it.title}</h5>
                        <p className="small text-muted mb-1">₹{it.price.toFixed(2)}</p>
                        <div className="d-flex align-items-center gap-2">
                          <input type="number" min="1" value={it.qty} onChange={(e)=> updateQty(it.id, Math.max(1, Number(e.target.value)||1))} style={{width:80}} className="form-control form-control-sm" />
                          <button className="btn btn-sm btn-outline-danger" onClick={()=> removeItem(it.id)}>Remove</button>
                        </div>
                      </div>
                      <div className="fw-bold">₹{(it.price*it.qty).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card p-3 shadow-sm">
              <h5>Order Summary</h5>
              <div className="d-flex justify-content-between mt-2"><div>Subtotal</div><div className="fw-bold">₹{total.toFixed(2)}</div></div>
              <button className="btn btn-dark w-100 mt-3" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* Checkout page with simple form */
function CheckoutPage(){
  const { cart, total, clearCart } = useCart(); const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', address:'', city:'', postal:'', country:'' });
  function update(k,v){ setForm(f=>({...f,[k]:v})); }
  function handleSubmit(e){
    e.preventDefault();
    // In real app: validate + call payment API
    const order = { customer: form, items: cart, total, date: new Date().toISOString() };
    console.log('Order (demo):', order);
    alert('Order placed! Thank you. (Demo) — check console for order payload.');
    clearCart();
    navigate('/');
  }
  return (
    <section className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      {cart.length===0 ? <div className="alert alert-info">Your cart is empty. <Link to="/products">Shop products</Link></div> :
      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><label className="form-label">Full name</label><input required className="form-control" value={form.name} onChange={(e)=>update('name', e.target.value)} /></div>
            <div className="mb-3"><label className="form-label">Email</label><input required type="email" className="form-control" value={form.email} onChange={(e)=>update('email', e.target.value)} /></div>
            <div className="mb-3"><label className="form-label">Address</label><input required className="form-control" value={form.address} onChange={(e)=>update('address', e.target.value)} /></div>
            <div className="row">
              <div className="col-md-4 mb-3"><label className="form-label">City</label><input required className="form-control" value={form.city} onChange={(e)=>update('city', e.target.value)} /></div>
              <div className="col-md-4 mb-3"><label className="form-label">Postal code</label><input required className="form-control" value={form.postal} onChange={(e)=>update('postal', e.target.value)} /></div>
              <div className="col-md-4 mb-3"><label className="form-label">Country</label><input required className="form-control" value={form.country} onChange={(e)=>update('country', e.target.value)} /></div>
            </div>
            <button className="btn btn-primary" type="submit">Place Order (Demo)</button>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm">
            <h5>Order Summary</h5>
            <ul className="list-group mb-3">
              {cart.map(i=> <li key={i.id} className="list-group-item d-flex justify-content-between">{i.title} <span>₹{(i.price*i.qty).toFixed(2)}</span></li>)}
            </ul>
            <div className="d-flex justify-content-between"><div>Total</div><div className="fw-bold">₹{total.toFixed(2)}</div></div>
          </div>
        </div>
      </div>
      }
    </section>
  );
}

/* App */
export default function App(){
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <footer className="bg-white border-top py-4 mt-5">
            <div className="container d-flex justify-content-between align-items-center">
              <div><div className="fw-bold">Swarom silver.</div><div className="text-muted small">© {new Date().getFullYear()} Swarom silver.</div></div>
              <div className="small text-muted">Built with ❤️ </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}
