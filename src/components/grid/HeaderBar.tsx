// src/components/layout/HeaderBar.tsx
import React, { useEffect, useState } from "react";

/* --------- CSS autónomo --------- */
const RM_CSS = `
/* NUEVO DISEÑO MENÚ MÓVIL */
.rm-mobile {
  padding-top: 24px;
  align-items: flex-start;
}

.rm-mobile img {
  width: 240px;
  margin: 0 auto 24px auto;
  display: block;
  animation: fadeInUp 0.4s ease forwards;
  animation-delay: 0.05s;
  opacity: 0;
}


.rm-mobile a {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937; /* gris oscuro */
  padding: 14px 24px;
  text-align: center;
}

.rm-mobile a.active {
  color: #6400ee; /* púrpura activo */
}

.rm-mobile a:hover {
  background: transparent;
  color: #6400ee;
}

.rm-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 28px;
  background: none;
  border: none;
  color: #111;
  cursor: pointer;
  
}

/* RESET LOCAL */
.rm-nav *{box-sizing:border-box;margin:0;padding:0}
.rm-nav ul{list-style:none}
.rm-nav a{text-decoration:none}
.rm-nav img{display:block;max-height:60px;width:auto}

/* CONTENEDOR */
.rm-nav{
  position:fixed;top:0;left:0;width:100%;z-index:100;
  background:#fff;border-bottom:1px solid #e5e7eb;
  box-shadow:0 0 15px rgba(0,0,0,.07);
  font:500 16px/1.3 "Roboto",Arial,sans-serif;
}

/* BARRA INTERNA */
.rm-nav-inner{
  max-width:1280px;height:70px;margin:0 auto;padding:0 24px;
  display:flex;align-items:center;justify-content:space-between;gap:2rem;
}

/* BRANDING */
.rm-brand{display:flex;align-items:center;gap:16px}
.rm-brand .mobile-logo{display:none}

/* MENÚ DESKTOP */
.rm-menu{display:flex;gap:0}
.rm-menu li{position:relative;padding:0 16px}
.rm-menu li+li::before{
  content:"|";position:absolute;left:0;top:50%;transform:translateY(-50%);
  color:#9ca3af;font-weight:400;
}
.rm-menu a{
  position:relative;color:#111827;padding-bottom:4px;transition:color .25s;
}
.rm-menu a::after{
  content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;
  background:#6400ee;transform:scaleX(0);transform-origin:center;
  transition:transform .25s;
}
.rm-menu a:hover{color:#6400ee}
.rm-menu a:hover::after{transform:scaleX(1)}

/* ICONO HAMBURGUESA */
.rm-burger{display:none;width:42px;height:42px;align-items:center;
  justify-content:center;border-radius:6px;border:1px solid transparent;
  transition:background .25s;
}
.rm-burger:hover{background:#f3f4f6}
.rm-burger span{position:relative;display:block;width:22px;height:2px;background:#111827}
.rm-burger span::before,.rm-burger span::after{
  content:"";position:absolute;width:22px;height:2px;background:#111827;left:0;
  transition:transform .25s;
}
.rm-burger span::before{top:-6px}
.rm-burger span::after{top:6px}

/* EXISTENTE RESPONSIVE */
@media(max-width:1024px){
  .rm-menu{display:none}
  .rm-burger{display:flex}
  .rm-brand img.desktop-logo{display:none}
  .rm-brand .mobile-logo{display:block}
}

/* Tablet */
@media(max-width:768px){
  .rm-nav-inner{height:64px;padding:0 16px}
  .rm-brand img{max-height:48px}
}
/* Móvil */
@media(max-width:640px){
  .rm-nav-inner{height:60px;padding:0 12px}
  .rm-brand img{max-height:42px}
  .rm-menu a{font-size:14px}
}

/* ── MENÚ MÓVIL ─────────────────────────────── */
/* MENÚ MÓVIL */
.rm-mobile{
  position:fixed;top:70px;left:0;width:100%;
  background:#fff;border-top:1px solid #e5e7eb;
  box-shadow:0 4px 12px rgba(0,0,0,.08);
  display:flex;flex-direction:column;
  z-index:9998;                   /* ← por encima de casi todo */
}
.rm-mobile.is-open{transform:translateY(0)}
.rm-mobile a{
  padding:16px 24px;border-bottom:1px solid #f3f4f6;
  color:#111827;font-size:15px;transition:background .25s,color .25s;
}
.rm-mobile a:hover{background:#f3f4f6;color:#6400ee}
@media(min-width:1025px){.rm-mobile{display:none}}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rm-mobile a {
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
}

.rm-mobile a:nth-child(3) { animation-delay: 0.1s; }
.rm-mobile a:nth-child(4) { animation-delay: 0.2s; }
.rm-mobile a:nth-child(5) { animation-delay: 0.3s; }
.rm-mobile a:nth-child(6) { animation-delay: 0.4s; }
.rm-mobile a:nth-child(7) { animation-delay: 0.5s; }
.rm-mobile a:nth-child(8) { animation-delay: 0.6s; }
.rm-mobile a:nth-child(9) { animation-delay: 0.7s; }
.rm-mobile a:nth-child(10) { animation-delay: 0.8s; }

`;

/* --------- Componente --------- */
export default function HeaderBar() {
  const [open, setOpen] = useState(false);

  /* Inyectar estilos una sola vez */
  useEffect(() => {
    const styleTag = document.getElementById("rm-navbar-style") || document.createElement("style");
    if (!styleTag.id) {
      styleTag.id = "rm-navbar-style";
      styleTag.textContent = RM_CSS;
      document.head.appendChild(styleTag);
    }
  }, []);

  const items = [
    { label: "Inicio",       href: "#" },
    { label: "P+AE",         href: "https://emprende.ucontinental.edu.pe/" },
    { label: "Aprendiendo",  href: "https://fablab.ucontinental.edu.pe/rutamaker/aprendiendo/" },
    { label: "Aplicando",    href: "https://fablab.ucontinental.edu.pe/rutamaker/aplicando/" },
    { label: "Impactando",   href: "https://fablab.ucontinental.edu.pe/rutamaker/impactando/" },
    { label: "Proyectos",    href: "https://fablab.ucontinental.edu.pe/rutamaker/proyectos/" },
    { label: "Resultados",   href: "https://fablab.ucontinental.edu.pe/rutamaker/resultados/" },
    { label: "Contáctanos",  href: "https://fablab.ucontinental.edu.pe/rutamaker/contactanos/" },
  ];

  return (
    <>
      {/* ─── Barra Fija ─── */}
      <nav className="rm-nav">
        <div className="rm-nav-inner">
          {/* Branding */}
          <a href="#" className="rm-brand">
            <img
              className="desktop-logo"
              src="https://fablab.ucontinental.edu.pe/rutamaker/wp-content/uploads/2021/07/fab-lab-black.png"
              alt="Ruta Maker"
            />
            <img
              className="mobile-logo"
              src="https://fablab.ucontinental.edu.pe/rutamaker/wp-content/uploads/2021/08/logo-fablab-nueva-tipo.png"
              alt="Ruta Maker"
            />
          </a>

          {/* Menú desktop */}
          <ul className="rm-menu">
            {items.map((it) => (
              <li key={it.label}><a href={it.href}>{it.label}</a></li>
            ))}
          </ul>

          {/* Hamburguesa */}
          <button
            className="rm-burger"
            aria-label="Menú móvil"
            onClick={() => setOpen(o => !o)}
          >
            <span></span>
          </button>
        </div>
      </nav>

      {/* ─── Menú móvil ─── */}
     {open && (
  <div className="rm-mobile">
    {/* Botón cerrar */}
    <button
      className="rm-close-btn"
      onClick={() => setOpen(false)}
      aria-label="Cerrar menú"
    >
      &times;
    </button>

    {/* Logo móvil */}
    <img
      src="https://fablab.ucontinental.edu.pe/rutamaker/wp-content/uploads/2021/07/fab-lab-black.png"
      alt="Ruta Maker"
    />

    {/* Enlaces */}
    {items.map(it => (
      <a
        key={it.label}
        href={it.href}
        className={it.label === "Inicio" ? "active" : ""}
        onClick={() => setOpen(false)}
      >
        {it.label}
      </a>
    ))}
  </div>
)}

    </>
  );
}
