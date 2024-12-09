import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-company">
          <h3>3E-Asesorías & Consultorías</h3>
        </div>
        <div className="footer-info">
          <p>© {currentYear} | Todos los derechos reservados</p>
          <p>Autor: Ing. Eduardo E. Enríquez R.</p>
          <p>Freelance</p>
          <p>
            Email: <a href="mailto:rekineke@hotmail.com">rekineke@hotmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;