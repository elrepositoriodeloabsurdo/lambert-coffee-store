import { useMemo, useRef, useState } from 'react';
import {
  Banknote,
  Bot,
  ChevronLeft,
  ChevronRight,
  Coffee,
  CreditCard,
  KeyRound,
  Mail,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from 'lucide-react';

type GalleryItem = {
  id: string;
  name: string;
  type: string;
  color: string;
  image: string;
};

type Product = {
  id: string;
  name: string;
  origin: string;
  label: string;
  labelClass: string;
  profile: string;
  description: string;
  roast: string;
  image: string;
  stock: number;
  prices: Record<string, number>;
};

type CartItem = {
  productId: string;
  format: string;
  qty: number;
};

type PaymentMethod = 'tuu' | 'transbank' | 'transfer';

const whatsappContactNumber = '+56912345678';
const whatsappNumber = whatsappContactNumber.replace('+', '');
const tuuCheckoutUrl = import.meta.env.VITE_TUU_CHECKOUT_URL || '';
const transbankCheckoutUrl = import.meta.env.VITE_TRANSBANK_CHECKOUT_URL || '';
const defaultHeroVideoUrl = '/assets/lambert-hero.mp4';
const heroVideoUrl = import.meta.env.VITE_HERO_VIDEO_URL?.trim() || defaultHeroVideoUrl;

const coffeePrices = { '250g': 9990, '500g': 18990, '1kg': 34990 };

const products: Product[] = [
  {
    id: 'colombia-huila',
    name: 'Colombia Huila',
    origin: 'Huila, Colombia',
    label: 'Etiqueta dorada',
    labelClass: 'gold-label',
    profile: 'Caturra, chocolate y naranja',
    description: 'Café de especialidad con acidez elegante, cuerpo sedoso y final dulce para filtrados premium.',
    roast: 'Medio claro',
    image: '/assets/colombia-huila-amarillo.png',
    stock: 18,
    prices: coffeePrices,
  },
  {
    id: 'blend-latinoamericano',
    name: 'Blend Latinoamericano',
    origin: 'Latinoamérica',
    label: 'Etiqueta dorada',
    labelClass: 'gold-label',
    profile: 'Cacao, miel y caramelo',
    description: 'Mezcla balanceada para uso diario con crema estable, aroma tostado y sabor persistente.',
    roast: 'Medio',
    image: '/assets/blend-latinoamericano-dorado.jpg',
    stock: 24,
    prices: coffeePrices,
  },
  {
    id: 'arabica-100',
    name: 'Arábico 100%',
    origin: 'Catuai Amarillo',
    label: 'Etiqueta blanca',
    labelClass: 'white-label',
    profile: 'Chocolate, miel y caramelo',
    description: 'Perfil limpio y aromático para espresso moderno, prensa francesa y molienda fresca en casa.',
    roast: 'Medio',
    image: '/assets/arabica-crema.jpg',
    stock: 15,
    prices: coffeePrices,
  },
  {
    id: 'blend-brasileno',
    name: 'Blend Brasileño',
    origin: 'Brasil',
    label: 'Etiqueta negra',
    labelClass: 'black-label',
    profile: 'Chocolate, avellana y frutos secos',
    description: 'Café intenso, cremoso y de baja acidez para quienes buscan una taza con carácter.',
    roast: 'Medio alto',
    image: '/assets/blend-dorado.jpg',
    stock: 20,
    prices: coffeePrices,
  },
  {
    id: 'robusta',
    name: 'Robusta',
    origin: 'Fazenda Venturim',
    label: 'Empaque negro',
    labelClass: 'dark-pack',
    profile: 'Chocolate, avellana y frutos secos',
    description: 'Mayor cuerpo, potencia y rendimiento para mezclas, espresso clásico y cafeteras automáticas.',
    roast: 'Alto',
    image: '/assets/robusta-blanco.jpg',
    stock: 12,
    prices: coffeePrices,
  },
];

const accessories: GalleryItem[] = [
  {
    id: 'acc-dripper-perro',
    name: 'Cold Drip Perro',
    type: 'Cold drip cerámica',
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
    type: 'Cerámica pintada',
    color: 'Rosa',
    image: '/assets/acc-tetera-ceramica.jpg',
  },
  {
    id: 'acc-molinos-manuales',
    name: 'Molinos Manuales',
    type: 'Molino portátil',
    color: 'Acero / Negro',
    image: '/assets/acc-molinos-manuales.jpg',
  },
];

const teas: GalleryItem[] = [
  {
    id: 'te-blue-collection',
    name: 'Basilur Blue Tea',
    type: 'Té verde premium',
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

const workflowSteps = [
  { icon: KeyRound, title: 'Autenticación', text: 'Registro, correo de bienvenida, inicio de sesión y recuperación por email.' },
  { icon: ShoppingBag, title: 'Carrito dinámico', text: 'Miniatura, variedad, formato, cantidades, valor unitario y subtotal actualizado.' },
  { icon: Receipt, title: 'Facturación', text: 'Checkbox para solicitar factura con razón social, RUT empresa, giro y dirección tributaria.' },
  { icon: Truck, title: 'Post-compra', text: 'Número de compra, boleta o factura por correo y tracking automático del pedido.' },
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
  const coffeeRef = useRef<HTMLDivElement>(null);
  const accessoriesRef = useRef<HTMLDivElement>(null);
  const teasRef = useRef<HTMLDivElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('tuu');
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [customer, setCustomer] = useState({
    fullName: '',
    rut: '',
    email: '',
    phone: '',
    shippingAddress: '',
    billingAddress: '',
    companyName: '',
    companyRut: '',
    companyActivity: '',
    taxAddress: '',
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
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

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
    orderLines || 'Necesito ayuda para elegir café.',
    total > 0 ? `Total estimado: ${formatCurrency(total)}` : '',
    customer.fullName ? `Nombre: ${customer.fullName}` : '',
    customer.rut ? `RUT: ${customer.rut}` : '',
    customer.shippingAddress ? `Dirección: ${customer.shippingAddress}` : '',
    invoiceRequested ? 'Solicita factura' : 'Solicita boleta',
  ]
    .filter(Boolean)
    .join('%0A');

  const checkoutHref =
    paymentMethod === 'tuu'
      ? tuuCheckoutUrl || `https://wa.me/${whatsappNumber}?text=${whatsappMessage}%0A%0AMétodo: TUU`
      : paymentMethod === 'transbank'
        ? transbankCheckoutUrl || `https://wa.me/${whatsappNumber}?text=${whatsappMessage}%0A%0AMétodo: Webpay Plus`
        : `https://wa.me/${whatsappNumber}?text=${whatsappMessage}%0A%0AMétodo: Transferencia bancaria`;

  const renderCarousel = (items: GalleryItem[], ref: React.RefObject<HTMLDivElement | null>, label: string) => (
    <div className="carousel" aria-label={label}>
      <button type="button" className="carousel-nav prev" onClick={() => scrollCarousel(ref, 3, -1)} aria-label="Anterior">
        <ChevronLeft size={22} />
      </button>
      <div className="carousel-track" ref={ref}>
        {items.map((item) => (
          <figure className="carousel-card" key={item.id}>
            <figcaption>
              <span className="carousel-type">{item.type}</span>
              <strong>{item.name}</strong>
              <span className="carousel-color">{item.color}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <button type="button" className="carousel-nav next" onClick={() => scrollCarousel(ref, 3, 1)} aria-label="Siguiente">
        <ChevronRight size={22} />
      </button>
    </div>
  );

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#inicio" aria-label="Lambert Coffee inicio">
          <img src="/assets/logo-lambert.jpg" alt="Lambert Coffee" />
          <span>Lambert Coffee</span>
        </a>
        <div className="topbar-actions">
          <a className="icon-btn" href="#checkout" aria-label="Carrito de compra">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
          <a className="icon-btn round-icon" href="#cuenta" aria-label="Cuenta de usuario">
            <User size={20} />
          </a>
        </div>
      </nav>

      <section id="inicio" className="hero">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={heroVideoUrl} type="video/mp4" />
          Tu navegador no puede reproducir el video de portada.
        </video>
        <div className="hero-overlay" />
        <div className="hero-logo-card">
          <img src="/assets/logo-lambert.jpg" alt="Logo Lambert Coffee" />
          <span>Especialidad · Chile</span>
        </div>
        <div className="hero-content">
          <p className="eyebrow">Café de especialidad premium</p>
          <h1>Elegancia oscura, sabor dorado.</h1>
        </div>
      </section>

      <section id="catalogo" className="gallery">
        <div className="gallery-head">
          <h2>Café de Especialidad</h2>
        </div>
        {renderCarousel(
          products.map((product) => ({
            id: product.id,
            name: product.name,
            type: product.origin,
            color: product.label,
            image: product.image,
          })),
          coffeeRef,
          'Carrusel de café de especialidad',
        )}
      </section>

      <section className="gallery accessories">
        <div className="gallery-head">
          <h2>Accesorios de preparación</h2>
          <p>Drippers, molinos, teteras y equipos para elevar la preparación diaria.</p>
        </div>
        {renderCarousel(accessories, accessoriesRef, 'Carrusel de accesorios')}
      </section>

      <section className="gallery teas">
        <div className="gallery-head">
          <h2>Selección de té</h2>
          <p>Colecciones premium para complementar la experiencia Lambert.</p>
        </div>
        {renderCarousel(teas, teasRef, 'Carrusel de té')}
      </section>

      <section id="productos" className="section product-section">
        <div className="section-heading">
          <p className="eyebrow">Catálogo, precios e inventario</p>
          <h2>Formatos predefinidos para todas las variedades</h2>
          <p>250 gr: $9.990 CLP · 500 gr: $18.990 CLP · 1 kg: $34.990 CLP</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art">
                <img src={product.image} alt={product.name} />
                <span className={`label-chip ${product.labelClass}`}>{product.label}</span>
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <p className="origin">{product.origin}</p>
                  <span>{product.stock} unidades</span>
                </div>
                <h3>{product.name}</h3>
                <p className="profile">{product.profile}</p>
                <p>{product.description}</p>
                <div className="roast-stock">
                  <Coffee size={18} /> Tueste {product.roast} · Stock sincronizado
                </div>
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

      <section id="ia-stock" className="section intelligence-section">
        <div className="ai-card">
          <div>
            <p className="eyebrow">Marcha blanca</p>
            <h2>Agente IA de ventas y stock</h2>
            <p>
              El asistente queda anclado junto a WhatsApp para orientar compras, revisar disponibilidad de productos y
              prevenir quiebres de stock durante la sincronización viva del inventario.
            </p>
          </div>
          <div className="stock-board">
            {products.map((product) => (
              <div key={product.id}>
                <span>{product.name}</span>
                <strong>{product.stock} disponibles</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cuenta" className="section workflow-section">
        <div className="section-heading">
          <p className="eyebrow">Workflows y lógica de negocio</p>
          <h2>Cuenta, carrito, checkout y post-compra</h2>
        </div>
        <div className="workflow-grid">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="workflow-card">
                <Icon size={24} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
        <div className="auth-panel">
          <div>
            <Mail size={20} />
            <strong>Registro + activación por correo</strong>
            <span>Modal preparado para capturar datos básicos, validar sesión y recuperar contraseña.</span>
          </div>
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
                  const lineTotal = product.prices[item.format] * item.qty;
                  return (
                    <div className="cart-row" key={`${item.productId}-${item.format}`}>
                      <img src={product.image} alt={product.name} />
                      <div className="cart-info">
                        <strong>{product.name}</strong>
                        <span>
                          {item.format} · Unitario {formatCurrency(product.prices[item.format])} · Subtotal{' '}
                          {formatCurrency(lineTotal)}
                        </span>
                      </div>
                      <div className="qty-control">
                        <button type="button" onClick={() => updateQty(item.productId, item.format, -1)} aria-label="Restar">
                          <Minus size={14} />
                        </button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => updateQty(item.productId, item.format, 1)} aria-label="Sumar">
                          <Plus size={14} />
                        </button>
                        <button type="button" className="trash" onClick={() => removeItem(item.productId, item.format)} aria-label="Eliminar">
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
                <span>Envío</span>
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
              <h2>Pago y envío</h2>
            </div>

            <div className="form-grid">
              <label>
                Nombre y Apellido *
                <input required value={customer.fullName} onChange={(event) => setCustomer({ ...customer, fullName: event.target.value })} />
              </label>
              <label>
                RUT *
                <input
                  required
                  pattern="^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-?[0-9kK]$"
                  placeholder="12.345.678-9"
                  value={customer.rut}
                  onChange={(event) => setCustomer({ ...customer, rut: event.target.value })}
                />
              </label>
              <label>
                Teléfono *
                <input required value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} />
              </label>
              <label>
                Correo electrónico *
                <input
                  required
                  type="email"
                  value={customer.email}
                  onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                />
              </label>
              <label className="wide">
                Dirección de Envío *
                <input
                  required
                  value={customer.shippingAddress}
                  onChange={(event) => setCustomer({ ...customer, shippingAddress: event.target.value })}
                />
              </label>
              <label className="wide">
                Dirección de Facturación *
                <input
                  required
                  value={customer.billingAddress}
                  onChange={(event) => setCustomer({ ...customer, billingAddress: event.target.value })}
                />
              </label>
              <label className="checkbox-label wide">
                <input type="checkbox" checked={invoiceRequested} onChange={(event) => setInvoiceRequested(event.target.checked)} />
                Solicitar Factura
              </label>
              {invoiceRequested && (
                <div className="invoice-grid wide">
                  <label>
                    Razón Social
                    <input value={customer.companyName} onChange={(event) => setCustomer({ ...customer, companyName: event.target.value })} />
                  </label>
                  <label>
                    RUT Empresa
                    <input value={customer.companyRut} onChange={(event) => setCustomer({ ...customer, companyRut: event.target.value })} />
                  </label>
                  <label>
                    Giro
                    <input
                      value={customer.companyActivity}
                      onChange={(event) => setCustomer({ ...customer, companyActivity: event.target.value })}
                    />
                  </label>
                  <label>
                    Dirección Tributaria
                    <input value={customer.taxAddress} onChange={(event) => setCustomer({ ...customer, taxAddress: event.target.value })} />
                  </label>
                </div>
              )}
              <label className="wide">
                Notas del pedido
                <textarea rows={3} value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} />
              </label>
              <label className="checkbox-label wide legal">
                <input type="checkbox" checked={legalAccepted} onChange={(event) => setLegalAccepted(event.target.checked)} />
                Acepto Términos, Condiciones y Política de Privacidad *
              </label>
            </div>

            <div className="payment-grid">
              <button type="button" className={paymentMethod === 'transfer' ? 'selected' : ''} onClick={() => setPaymentMethod('transfer')}>
                <Banknote size={18} /> Transferencia
              </button>
              <button type="button" className={paymentMethod === 'transbank' ? 'selected' : ''} onClick={() => setPaymentMethod('transbank')}>
                <CreditCard size={18} /> Webpay Plus
              </button>
              <button type="button" className={paymentMethod === 'tuu' ? 'selected' : ''} onClick={() => setPaymentMethod('tuu')}>
                <CreditCard size={18} /> TUU
              </button>
            </div>

            {paymentMethod === 'transfer' && (
              <div className="transfer-box">
                <strong>Transferencia Bancaria Directa</strong>
                <p>Banco: por definir · Cuenta: por definir · RUT: por definir · Email: ventas@lambertcoffee.cl</p>
              </div>
            )}

            <div className="checkout-actions">
              <a className={`primary-btn ${!legalAccepted ? 'disabled' : ''}`} href={checkoutHref} target="_blank" rel="noreferrer">
                <CreditCard size={18} /> Finalizar pedido
              </a>
              <a className="secondary-btn" href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> Enviar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="section contact-section">
        <div>
          <p className="eyebrow">Flujo post-compra</p>
          <h2>Compra confirmada, documento y tracking</h2>
          <p>
            Al aprobarse la transacción, la plataforma queda preparada para generar número de compra, enviar boleta o
            factura al correo del cliente y despachar el enlace de seguimiento del pedido.
          </p>
        </div>
        <a className="icon-action" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> Hablar por WhatsApp
        </a>
      </section>

      <div className="floating-actions" aria-label="Accesos rápidos">
        <a href="#ia-stock" className="float-btn ai-float">
          <Bot size={20} /> IA Stock
        </a>
        <a href={`https://wa.me/${whatsappNumber}`} className="float-btn whatsapp-float" target="_blank" rel="noreferrer">
          <MessageCircle size={20} /> WhatsApp
        </a>
      </div>

      <footer>
        <div className="footer-grid">
          <strong>Lambert Coffee</strong>
          <span>Dark mode · Amarillo/Dorado · Café de especialidad</span>
          <a href="#ia-stock">
            <PackageCheck size={16} /> Asistente IA y stock
          </a>
        </div>
      </footer>
    </main>
  );
}
