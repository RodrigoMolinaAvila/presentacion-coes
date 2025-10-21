
class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
          backdrop-filter: blur(12px);
          color: #f1f5f9;
          padding: 2rem 0;
          text-align: center;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 40;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        footer.visible {
          transform: translateY(0);
        }
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .affiliations {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          opacity: 0.8;
        }
        .affiliation-item {
          font-size: 0.875rem;
          color: #94a3b8;
        }
        .contact-info {
          font-size: 0.75rem;
          opacity: 0.6;
          color: #64748b;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-link {
          color: #64748b;
          opacity: 0.7;
          transition: all 0.2s;
          padding: 0.5rem;
          border-radius: 0.375rem;
          background: rgba(148, 163, 184, 0.1);
        }
        .social-link:hover {
          opacity: 1;
          color: #f1f5f9;
          background: rgba(148, 163, 184, 0.2);
        }
      </style>
      <footer id="footer">
        <div class="container">
          <div class="footer-content">
            <div class="affiliations">
              <span class="affiliation-item">Centro de Estudios de Conflicto y Cohesión Social</span>
              <span class="affiliation-item">Universidad de Chile</span>
              <span class="affiliation-item">Pontificia Universidad Católica de Chile</span>
            </div>
            <div class="contact-info">
              contacto@coes.cl | +56 2 1234 5678
            </div>
            <div class="social-links">
              <a href="#" class="social-link">
                <i data-feather="twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i data-feather="github"></i>
              </a>
              <a href="#" class="social-link">
                <i data-feather="linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
    
    // Show footer on last slide
    if (window.APP_STATE) {
      window.APP_STATE.dispatch.on('slideChange', (slideIndex) => {
        const footer = this.shadowRoot.getElementById('footer');
        if (slideIndex === 10) { // Last slide (0-indexed)
          footer.classList.add('visible');
        } else {
          footer.classList.remove('visible');
        }
      });
    }
  }
}

customElements.define('custom-footer', CustomFooter);