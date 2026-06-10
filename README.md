# Lambert Coffee Store

Proyecto web React + Vite listo para catalogo, carrito y checkout inicial.

## Incluye

- Landing de venta con video de portada y logo local.
- Catalogo editable de cafe por formato y precio.
- Carrito con subtotal, envio y total.
- Checkout con datos del cliente.
- Metodos de pago preparados: Tuu, Transbank y transferencia.
- Boton de WhatsApp con resumen automatico del pedido.

## Configuracion

1. Copia `.env.example` como `.env.local`.
2. Cambia `VITE_WHATSAPP_NUMBER` por el numero real, sin `+`.
3. Agrega `VITE_TUU_CHECKOUT_URL` si tienes link de checkout Tuu.
4. Agrega `VITE_TRANSBANK_CHECKOUT_URL` si tienes un link o endpoint propio para Transbank.
5. Agrega `VITE_HERO_VIDEO_URL` con una URL publica del video del hero. Puede ser YouTube (`watch`, `shorts` o `youtu.be`) o un archivo mp4/webm publico.


## Despliegue fullstack local

Para ver el diseño en un servidor local que también expone APIs de prueba de inventario y órdenes:

```bash
npm install
npm run deploy:local
```

Abre `http://localhost:3000` en el navegador. El servidor Express entrega el build de Vite desde `dist/` y deja disponibles estos endpoints locales:

- `GET /api/health`: estado del servidor local.
- `GET /api/inventory`: inventario de marcha blanca para el asistente IA/stock.
- `POST /api/orders`: creación simulada de pedido con número de compra y tracking local.

Si solo quieres correr el frontend en modo desarrollo con recarga rápida, usa `npm run dev`.

## Desarrollo

```bash
npm install
npm run dev
```

## Produccion

```bash
npm run build
```

La carpeta final para subir queda en `dist/`.
