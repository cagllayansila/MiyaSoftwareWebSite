/* =============================================
   MIYA YAZILIM - Shared Components JS
   Navbar + Footer injection (Multi-language Support)
   ============================================= */

const TRANSLATIONS = {
    tr: {
        nav: [
            { label: 'Anasayfa', href: 'index.html', key: 'home' },
            { label: 'Hakkımızda', href: 'pages/about.html', key: 'about' },
            { label: 'Ürünlerimiz', href: 'pages/products.html', key: 'products' },
            { label: 'Hizmetlerimiz', href: 'pages/services.html', key: 'services' },
            { label: 'İnsan Kaynakları', href: 'pages/hr.html', key: 'hr' },
            { label: 'Referanslar', href: 'pages/references.html', key: 'refs' },
            { label: 'İletişim', href: 'pages/contact.html', key: 'contact' },
        ],
        cta: "Bize Ulaşın",
        footerDesc: "15+ yıllık deneyimle veritabanı yönetimi, süreç iyileştirme, yazılım geliştirme ve uygulama alanlarında yenilikçi çözümler üretiyoruz.",
        footerPages: "Sayfalar",
        footerPolicies: "Politikalar",
        footerContact: "İletişim",
        footerRights: "© 2024 Miya Donanım Eğitim Yazılım Danışmanlık. Tüm hakları saklıdır.",
        privacyPolicy: "Gizlilik Politikası"
    },
    en: {
        nav: [
            { label: 'Home', href: 'index.html', key: 'home' },
            { label: 'About Us', href: 'about.html', key: 'about' },
            { label: 'Products', href: 'products.html', key: 'products' },
            { label: 'Services', href: 'services.html', key: 'services' },
            { label: 'Human Resources', href: 'hr.html', key: 'hr' },
            { label: 'References', href: 'references.html', key: 'refs' },
            { label: 'Contact', href: 'contact.html', key: 'contact' },
        ],
        cta: "Contact Us",
        footerDesc: "We produce innovative solutions in database management, process improvement, and software development with 15+ years of experience.",
        footerPages: "Pages",
        footerPolicies: "Policies",
        footerContact: "Contact",
        footerRights: "© 2024 Miya Hardware Training Software Consulting. All rights reserved.",
        privacyPolicy: "Privacy Policy"
    }
};

// Sayfanın hangi dilde olduğunu URL'den anlayan yardımcı fonksiyon
function getCurrentLang() {
    return window.location.pathname.includes('/en/') ? 'en' : 'tr';
}

function injectNavbar(activeKey, isRoot = false) {
    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang];
    const basePath = isRoot ? '' : '../';
    
    // Dil değiştirme butonu için hedef URL belirleme
    const toggleTarget = lang === 'tr' ? '/en/index.html' : '/index.html';
    const langLabel = lang === 'tr' ? 'EN' : 'TR';

    // Linkleri oluştururken root ve dil klasörüne göre href'leri düzenle
    const navLinks = t.nav.map(item => {
    let finalHref;
    
    if (lang === 'en') {
       
        if (isRoot) {
            finalHref = `en/${item.href}`;
        } else {
            finalHref = item.href;
        }
    } else {
        
        finalHref = isRoot ? item.href : `../${item.href}`;
        
    }

    return `<a href="${finalHref}" class="${item.key === activeKey ? 'active' : ''}">${item.label}</a>`;
}).join('');

    const logoPng = isRoot ? 'images/miya_logo_2.png' : '../images/miya_logo_2.png';
    const logoSvg = isRoot ? 'images/miya-logo-2.svg' : '../images/miya-logo-2.svg';

    const navHTML = `
        <nav class="navbar" id="mainNavbar">
          <div class="container">
            <a href="${isRoot ? 'index.html' : '../index.html'}" class="navbar-brand">
              <img src="${logoPng}" alt="miya" class="navbar-logo-2" onerror="this.onerror=null;this.src='${logoSvg}';" />
            </a>
            <div class="nav-links">${navLinks}</div>
            <div class="nav-cta">
              <a href="${toggleTarget}" class="lang-btn">${langLabel}</a>
              <a href="${lang === 'en' ? (isRoot ? 'en/contact.html' : 'contact.html') : (isRoot ? 'pages/contact.html' : '../pages/contact.html')}" class="btn-contact-nav">${t.cta}</a>
            </div>
            <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
          </div>
        </nav>
        <div class="mobile-nav" id="mobileNav">${navLinks}</div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    setupNavbarEvents();
}

function injectFooter(isRoot = false) {
    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang];
    const basePath = isRoot ? '' : '../';
    const logoPng = isRoot ? 'images/miya_logo.png' : '../images/miya_logo.png';

    const addressText = lang === 'tr' 
        ? "Kuşçular Mah. 8035/1 Sk. No:2/12 <br> Urla / İzmir" 
        : "Kuşçular Mah. 8035/1 St. No:2/12 <br> Urla / Izmir";

    const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          
          <div class="footer-brand">
            <a href="${isRoot ? 'index.html' : '../index.html'}">
              <img src="${logoPng}" alt="miya" class="footer-logo-img" style="height: 120px; width: auto; margin-bottom: 20px; display: block;" />
            </a>
            <p class="footer-desc">${t.footerDesc}</p>
          </div>

          <div class="footer-col">
            <h4>${t.footerPages}</h4>
            <ul>
                ${t.nav.map(item => {
                    let href = isRoot ? (lang === 'en' ? 'en/'+item.href : item.href) : item.href;
                    return `<li><a href="${href}">${item.label}</a></li>`;
                }).join('')}
            </ul>
          </div>

          <div class="footer-col">
            <h4>${t.footerPolicies}</h4>
            <ul>
              <li><a href="https://miyayazilim.com.tr/files/BGYS-Politika-en.pdf" target="_blank">BGYS Policy</a></li>
              <li><a href="https://miyayazilim.com.tr/files/BGYS-Politika-en.pdf" target="_blank">${t.privacyPolicy}</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>${t.footerContact}</h4>
            <div class="footer-contact-item" style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;">
              <span class="icon"><img src="/images/foothome.jfif" alt="Home" style="width: 26px; height: 26px; border-radius: 50%;" /></span>
              <span style="font-size: 14px; line-height: 1.4;">${addressText}</span>
            </div>
            <div class="footer-contact-item" style="display: flex; gap: 10px; align-items: center;">
              <span class="icon"><img src="/images/mailfooter.jfif" alt="Home" style="width: 26px; height: 26px; border-radius: 50%;" /></span>
              <a href="mailto:info@miyayazilim.com.tr" style="color:rgba(255,255,255,0.6); text-decoration: none; font-size: 14px;">info@miyayazilim.com.tr</a>
            </div>
          </div>

        </div>

        <div class="footer-bottom" style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
          <span style="font-size: 13px; color: rgba(255,255,255,0.4);">${t.footerRights}</span>
        </div>
      </div>
    </footer>`;

    const oldFooter = document.querySelector('.footer');
    if (oldFooter) oldFooter.remove();
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function setupNavbarEvents() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if(!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('show');
    });
}