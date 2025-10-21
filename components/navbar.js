
class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
          backdrop-filter: blur(12px);
          padding: 1rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .logo {
          color: #f1f5f9;
          font-weight: bold;
          font-size: 1.25rem;
          letter-spacing: -0.025em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .nav-btn {
          color: #94a3b8;
          padding: 0.5rem;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(148, 163, 184, 0.1);
        }
        .nav-btn:hover {
          background: rgba(148, 163, 184, 0.2);
          color: #f1f5f9;
        }
        .progress-container {
          width: 120px;
          height: 4px;
          background: rgba(148, 163, 184, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #fbb4ae, #b3cde3);
          transition: width 0.3s ease;
        }
        .slide-indicator {
          color: #64748b;
          font-size: 0.875rem;
          font-family: monospace;
        }
      </style>
      <nav>
        <div class="container">
          <div class="nav-content">
            <div class="logo">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="10" r="8" stroke="#fbb4ae" stroke-width="2" fill="none"/>
                <circle cx="10" cy="10" r="3" fill="#b3cde3"/>
              </svg>
              COES 2024
            </div>
            <div class="controls">
              <button class="nav-btn" id="nav-prev">
                <i data-feather="chevron-left"></i>
              </button>
              <div class="progress-container">
                <div class="progress-bar" style="width: 9%"></div>
              </div>
              <span class="slide-indicator">1/11</span>
              <button class="nav-btn" id="nav-next">
                <i data-feather="chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;

    // Add event listeners to shadow DOM elements
    this.shadowRoot.getElementById('nav-prev').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('prev-slide'));
    });

    this.shadowRoot.getElementById('nav-next').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('next-slide'));
    });

    // Update progress bar based on current slide
    this.updateProgressBar();
    
    // Listen for slide changes
    if (window.APP_STATE) {
      window.APP_STATE.dispatch.on('slideChange', () => {
        this.updateProgressBar();
      });
    }
  }

  updateProgressBar() {
    const progressBar = this.shadowRoot.querySelector('.progress-bar');
    const indicator = this.shadowRoot.querySelector('.slide-indicator');
    const progress = ((window.APP_STATE?.currentSlide || 0) + 1) / 11 * 100;
    progressBar.style.width = `${progress}%`;
    indicator.textContent = `${(window.APP_STATE?.currentSlide || 0) + 1}/11`;
  }
}

customElements.define('custom-navbar', CustomNavbar);