import { useMemo, useRef, useState } from 'react';
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  Coffee,
  CreditCard,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  User,
} from 'lucide-react';

type GalleryItem = {
  id: string;
  name: string;
  type: string;
  color: string;
  image: string;
};

const gallery: GalleryItem[] = [
  {
    id: 'blend-latino-dorado',
    name: 'Blend Latinoamericano',
    type: 'Arabica + Robusta',
    color: 'Dorado',
    image: '/assets/blend-latinoamericano-dorado.jpg',
  },
  {
    id: 'blend-latino-negro',
    name: 'Blend Latinoamericano',
    type: 'Arabica + Robusta',
    color: 'Negro',
    image: '/assets/blend-latinoamericano-negro.jpg',
  },
  {
    id: 'colombia-huila-amarillo',
    name: 'Colombia Huila',
    type: 'Arabica - Caturra',
    color: 'Amarillo',
    image: '/assets/colombia-huila-amarillo.png',
  },
  {
    id: 'arabica-crema',
    name: 'Arabica',
    type: 'Catuai Amarillo',
    color: 'Crema',
    image: '/assets/arabica-crema.jpg',
  },
  {
    id: 'robusta-blanco',
    name: 'Robusta',
    type: 'Fazenda Venturim',
    color: 'Blanco',
    image: '/assets/robusta-blanco.jpg',
  },
  {
    id: 'blend-dorado',
    name: 'Blend Clasico',
    type: 'Arabica 70% / Robusta 30%',
    color: 'Dorado',
    image: '/assets/blend-dorado.jpg',
  },
];

const accessories: GalleryItem[] = [
  {
    id: 'acc-dripper-perro',
    name: 'Cold Drip Perro',
    type: 'Cold drip ceramica',
    color: 'Turquesa',
    image: '/assets/acc-dripper-perro.jpg',
  },
  {
    id: 'acc-molino-vintage',
    name: 'Molino Vintage CAFE',
    type: 'Molino manivela',
    color: 'Madera',
    image: '/assets/acc-molino-vintage.jpg',
  },
  {
    id: 'acc-teteras-vidrio',
    name: 'Teteras de Vidrio',
    type: 'Infusor acero',
    color: 'Transparente',
    image: '/assets/acc-teteras-vidrio.jpg',
  },
  {
    id: 'acc-torre-cold-drip',
    name: 'Torre Cold Drip',
    type: 'Goteo lento',
    color: 'Vidrio / Madera',
    image: '/assets/acc-torre-cold-drip.jpg',
  },
  {
    id: 'acc-tetera-ceramica',
    name: 'Tetera Tea for One',
    type: 'Ceramica pintada',
    color: 'Rosa',
    image: '/assets/acc-tetera-ceramica.jpg',
  },
  {
    id: 'acc-molinos-manuales',
    name: 'Molinos Manuales',
    type: 'Molino portatil',
    color: 'Acero / Negro',
    image: '/assets/acc-molinos-manuales.jpg',
  },
];

const teas: GalleryItem[] = [
  {
    id: 'te-blue-collection',
    name: 'Basilur Blue Tea',
    type: 'Te verde premium',
    color: 'Blue Collection',
    image: '/assets/te-basilur-blue-collection.jpg',
  },
  {
    id: 'te-blue-akbar',
    name: 'Akbar Flavoured',
    type: 'Caramelo / Manzana',
    color: 'Surtido',
    image: '/assets/te-basilur-blue-akbar.jpg',
  },
  {
    id: 'te-bouquet',
    name: 'Basilur Bouquet',
    type: 'Ceylon Green Tea',
    color: 'Jasmine / Cream Fantasy',
    image: '/assets/te-basilur-bouquet.jpg',
  },
  {
    id: 'te-magic-fruits',
    name: 'Basilur Magic',
    type: 'Ceylon Black Tea',
    color: 'Fruits / Nights',
    image: '/assets/te-basilur-magic-fruits.jpg',
  },
];

type Product = {
  id: string;
  name: string;
  origin: string;
  profile: string;
  description: string;
  roast: string;
  prices: Record<string, number>;
};

type CartItem = {
  productId: string;
  format: string;
  qty: number;
};

type PaymentMethod = 'tuu' | 'transbank' | 'transfer';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '56912345678';
const tuuCheckoutUrl = import.meta.env.VITE_TUU_CHECKOUT_URL || '';
const transbankCheckoutUrl = import.meta.env.VITE_TRANSBANK_CHECKOUT_URL || '';

const products: Product[] = [
  {
    id: 'brasil-cerrado',
    name: 'Brasil Cerrado',
    origin: 'Minas Gerais, Brasil',
    profile: 'Chocolate, nuez tostada, baja acidez',
    description: 'Un cafe amable, dulce y estable para espresso, moka y cafeteras automaticas.',
    roast: 'Medio',
    prices: { '250g': 8990, '500g': 15990, '1kg': 28990 },
  },
  {
    id: 'colombia-huila',
    name: 'Colombia Huila',
    origin: 'Huila, Colombia',
    profile: 'Caramelo, frutos rojos, acidez brillante',
    description: 'Perfil expresivo para filtrados y espresso moderno, con final limpio y dulce.',
    roast: 'Medio claro',
    prices: { '250g': 9990, '500g': 17990, '1kg': 32990 },
  },
  {
    id: 'blend-casa',
    name: 'Blend Casa',
    origin: 'Brasil + Colombia',
    profile: 'Cacao, panela, cuerpo cremoso',
    description: 'La mezcla Lambert para todos los dias: balance, crema y gran rendimiento.',
    roast: 'Medio alto',
    prices: { '250g': 9490, '500g': 16990, '1kg': 30990 },
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

const getProduct = (id: string) => products.find((product) => product.id === id)!;

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const accessoriesRef = useRef<HTMLDivElement>(null);
  const teasRef = useRef<HTMLDivElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('tuu');
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProduct(item.productId);
        return sum + product.prices[item.format] * item.qty;
      }, 0),
    [cart],
  );
  const shipping = subtotal >= 35000 || subtotal === 0 ? 0 : 3990;
  const total = subtotal + shipping;

  const addToCart = (productId: string, format: string) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId && item.format === format);
      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.format === format ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...current, { productId, format, qty: 1 }];
    });
  };

  const updateQty = (productId: string, format: string, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId && item.format === format
            ? { ...item, qty: Math.max(0, item.qty + change) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (productId: string, format: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId || item.format !== format));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, perRow: number, direction: number) => {
    const node = ref.current;
    if (!node) return;
    node.scrollBy({ left: (node.clientWidth / perRow) * direction, behavior: 'smooth' });
  };

  const orderLines = cart
    .map((item) => {
      const product = getProduct(item.productId);
      return `${item.qty} x ${product.name} ${item.format} - ${formatCurrency(product.prices[item.format] * item.qty)}`;
    })
    .join('%0A');

  const whatsappMessage = [
    'Hola Lambert Coffee, quiero comprar:',
    orderLines || 'Necesito ayuda para elegir cafe.',
    total > 0 ? `Total estimado: ${formatCurrency(total)}` : '',
    customer.name ? `Nombre: ${customer.name}` : '',
    customer.address ? `Direccion: ${customer.address}` : '',
    customer.notes ? `Notas: ${customer.notes}` : '',
  ]
    .filter(Boolean)
    .join('%0A');

  const checkoutHref =
    paymentMethod === 'tuu'
      ? tuuCheckoutUrl || `https://wa.me/${whatsappNumber}?text=${whatsappMessage}%0A%0AMetodo: Tuu`
      : paymentMethod === 'transbank'
        ? transbankCheckoutUrl || `https://wa.me/${whatsappNumber}?text=${whatsappMessage}%0A%0AMetodo: Transbank`
        : `https://wa.me/${whatsappNumber}?text=${whatsappMessage}%0A%0AMetodo: Transferencia bancaria`;

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#inicio" aria-label="Lambert Coffee inicio">
          <img src="/assets/logo-lambert.jpg" alt="Lambert Coffee" />
          <span>Lambert Coffee</span>
        </a>
        <div className="nav-links">
          <a href="#productos">Comprar</a>
          <a href="#checkout">Pago</a>
          <a href="#contacto">Contacto</a>
        </div>
        <div className="topbar-actions">
          <a className="icon-btn" href="#checkout" aria-label="Carrito de compra">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
          <button type="button" className="icon-btn" aria-label="Cuenta de usuario">
            <User size={20} />
          </button>
        </div>
      </nav>

      <section id="inicio" className="hero">
        <video className="hero-video" src="/assets/lambert-hero.mp4" autoPlay muted loop playsInline />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Cafe de especialidad tostado en Chile</p>
          <h1>Lambert Coffee</h1>
          <p className="hero-copy">
            Compra cafe en grano listo para moler en casa, oficina o cafeteria. Carrito listo para vender con
            transferencia, WhatsApp, Tuu y Transbank.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#productos">
              <ShoppingBag size={18} />
              Comprar cafe
            </a>
            <a className="secondary-btn" href="#checkout">
              <CreditCard size={18} />
              Ver pagos
            </a>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="gallery-head">
          <p className="eyebrow">Nuestra linea</p>
          <h2>Cafes Lambert por tipo, color y nombre</h2>
        </div>
        <div className="carousel">
          <button
            type="button"
            className="carousel-nav prev"
            onClick={() => scrollCarousel(carouselRef, 3, -1)}
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="carousel-track" ref={carouselRef}>
            {gallery.map((item) => (
              <figure className="carousel-card" key={item.id}>
                <div className="carousel-img">
                  <img src={item.image || '/placeholder.svg'} alt={`${item.name} ${item.color}`} />
                </div>
                <figcaption>
                  <span className="carousel-type">{item.type}</span>
                  <strong>{item.name}</strong>
                  <span className="carousel-color">Color: {item.color}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            type="button"
            className="carousel-nav next"
            onClick={() => scrollCarousel(carouselRef, 3, 1)}
            aria-label="Siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      <section className="gallery accessories">
        <div className="gallery-head">
          <p className="eyebrow">Gama de accesorios</p>
          <h2>Accesorios de cafe Lambert</h2>
        </div>
        <div className="carousel">
          <button
            type="button"
            className="carousel-nav prev"
            onClick={() => scrollCarousel(accessoriesRef, 3, -1)}
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="carousel-track" ref={accessoriesRef}>
            {accessories.map((item) => (
              <figure className="carousel-card" key={item.id}>
                <div className="carousel-img">
                  <img src={item.image || '/placeholder.svg'} alt={`${item.name} ${item.color}`} />
                </div>
                <figcaption>
                  <span className="carousel-type">{item.type}</span>
                  <strong>{item.name}</strong>
                  <span className="carousel-color">Color: {item.color}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            type="button"
            className="carousel-nav next"
            onClick={() => scrollCarousel(accessoriesRef, 3, 1)}
            aria-label="Siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      <section className="gallery teas">
        <div className="gallery-head">
          <p className="eyebrow">Seleccion de te</p>
          <h2>Te</h2>
        </div>
        <div className="carousel">
          <button
            type="button"
            className="carousel-nav prev"
            onClick={() => scrollCarousel(teasRef, 3, -1)}
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="carousel-track" ref={teasRef}>
            {teas.map((item) => (
              <figure className="carousel-card" key={item.id}>
                <div className="carousel-img">
                  <img src={item.image || '/placeholder.svg'} alt={`${item.name} ${item.color}`} />
                </div>
                <figcaption>
                  <span className="carousel-type">{item.type}</span>
                  <strong>{item.name}</strong>
                  <span className="carousel-color">Color: {item.color}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            type="button"
            className="carousel-nav next"
            onClick={() => scrollCarousel(teasRef, 3, 1)}
            aria-label="Siguiente"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      <section id="productos" className="section">
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art">
                <Coffee size={44} />
                <span>{product.roast}</span>
              </div>
              <div className="product-body">
                <p className="origin">{product.origin}</p>
                <h3>{product.name}</h3>
                <p className="profile">{product.profile}</p>
                <p>{product.description}</p>
                <div className="format-grid">
                  {Object.entries(product.prices).map(([format, price]) => (
                    <button key={format} type="button" onClick={() => addToCart(product.id, format)}>
                      <span>{format}</span>
                      <strong>{formatCurrency(price)}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="checkout" className="section checkout-section">
        <div className="checkout-layout">
          <aside className="cart-panel">
            <div className="panel-title">
              <ShoppingBag size={20} />
              <h2>Carrito</h2>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Agrega productos para preparar el pedido.</p>
            ) : (
              <div className="cart-list">
                {cart.map((item) => {
                  const product = getProduct(item.productId);
                  return (
                    <div className="cart-row" key={`${item.productId}-${item.format}`}>
                      <div>
                        <strong>{product.name}</strong>
                        <span>
                          {item.format} · {formatCurrency(product.prices[item.format])}
                        </span>
                      </div>
                      <div className="qty-control">
                        <button type="button" onClick={() => updateQty(item.productId, item.format, -1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => updateQty(item.productId, item.format, 1)}>
                          <Plus size={14} />
                        </button>
                        <button type="button" className="trash" onClick={() => removeItem(item.productId, item.format)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="totals">
              <div>
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div>
                <span>Envio</span>
                <strong>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong>
              </div>
              <div className="grand-total">
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
            </div>
          </aside>

          <div className="checkout-panel">
            <div className="panel-title">
              <ShieldCheck size={20} />
              <h2>Datos y pago</h2>
            </div>

            <div className="form-grid">
              <label>
                Nombre
                <input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={customer.email}
                  onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                />
              </label>
              <label>
                Telefono
                <input value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} />
              </label>
              <label>
                Direccion
                <input value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} />
              </label>
              <label className="wide">
                Notas del pedido
                <textarea
                  rows={3}
                  value={customer.notes}
                  onChange={(event) => setCustomer({ ...customer, notes: event.target.value })}
                />
              </label>
            </div>

            <div className="payment-grid">
              <button
                type="button"
                className={paymentMethod === 'tuu' ? 'selected' : ''}
                onClick={() => setPaymentMethod('tuu')}
              >
                <CreditCard size={18} />
                Tuu
              </button>
              <button
                type="button"
                className={paymentMethod === 'transbank' ? 'selected' : ''}
                onClick={() => setPaymentMethod('transbank')}
              >
                <CreditCard size={18} />
                Transbank
              </button>
              <button
                type="button"
                className={paymentMethod === 'transfer' ? 'selected' : ''}
                onClick={() => setPaymentMethod('transfer')}
              >
                <Banknote size={18} />
                Transferencia
              </button>
            </div>

            {paymentMethod === 'transfer' && (
              <div className="transfer-box">
                <strong>Datos de transferencia</strong>
                <p>Banco: por definir · Cuenta: por definir · RUT: por definir · Email: ventas@lambertcoffee.cl</p>
              </div>
            )}

            <div className="checkout-actions">
              <a className="primary-btn" href={checkoutHref} target="_blank" rel="noreferrer">
                <CreditCard size={18} />
                Finalizar pedido
              </a>
              <a
                className="secondary-btn"
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Enviar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="section contact-section">
        <div>
          <p className="eyebrow">Integracion comercial</p>
          <h2>Preparado para vender</h2>
          <p>
            Conecta `VITE_TUU_CHECKOUT_URL`, `VITE_TRANSBANK_CHECKOUT_URL` y `VITE_WHATSAPP_NUMBER` en `.env`.
            Para produccion, el siguiente paso es sumar un backend que cree transacciones seguras con cada pasarela.
          </p>
        </div>
        <a className="icon-action" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          <MessageCircle size={18} />
          Hablar por WhatsApp
        </a>
      </section>
    </main>
  );
}
