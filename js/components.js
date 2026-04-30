const TRANSLATIONS = {
    tr: {
        nav: [
            { label: 'Anasayfa', href: 'index.html', key: 'home' },
            { label: 'Hakkımızda', href: 'hakkimizda.html', key: 'about' },
            { label: 'Ürünlerimiz', href: 'urunler.html', key: 'products' },
            { label: 'Hizmetlerimiz', href: 'hizmetler.html', key: 'services' },
            { label: 'İnsan Kaynakları', href: 'insankaynaklari.html', key: 'hr' },
            { label: 'Referanslar', href: 'referanslar.html', key: 'refs' },
            { label: 'İletişim', href: 'iletisim.html', key: 'contact' },
        ],
        cta: "Bize Ulaşın",
        footerDesc: "15+ yıllık deneyimle veritabanı yönetimi, süreç iyileştirme, yazılım geliştirme ve uygulama alanlarında yenilikçi çözümler üretiyoruz.",
        footerPages: "Sayfalar",
        footerPolicies: "Politikalar",
        footerContact: "İletişim",
        footerRights: "© 2020 Miya Donanım Eğitim Yazılım Danışmanlık. Tüm hakları saklıdır.",
        privacyPolicy: "BGYS Politikası"
    },
    en: {
        nav: [
            { label: 'Home', href: 'home.html', key: 'home' },
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
        footerRights: "© 2020 Miya Hardware Training Software Consulting. All rights reserved.",
        privacyPolicy: "BGYS Policy"
    }
};

function getCurrentLang() {
    return window.location.pathname.includes('/en/') ? 'en' : 'tr';
}

function setupNavbarEvents() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('show');
    });
}

function initRollingStats() {
    const stats = document.querySelectorAll('.hero-stat-num');

    stats.forEach(stat => {
        const target = stat.getAttribute('data-target');
        if (!target) return;

        const digits = target.toString().split('');
        const fontSize = parseFloat(getComputedStyle(stat).fontSize) || 40;
        // Hakkımızda stats için kalın yap
          if (stat.closest('.sm')) {
              stat.style.fontWeight = '1000';
          }
        const rowH = fontSize * 1.1;

        stat.style.display = 'inline-flex';
        stat.style.flexDirection = 'row';
        stat.style.alignItems = 'flex-start';
        stat.style.overflow = 'hidden';
        stat.style.height = rowH + 'px';
        stat.style.lineHeight = rowH + 'px';

        stat.innerHTML = digits.map(d => {
            if (isNaN(d)) {
                return `<span style="display:block;height:${rowH}px;line-height:${rowH}px;">${d}</span>`;
            }
            const spans = [0,1,2,3,4,5,6,7,8,9,0].map(n =>
                `<span style="display:block;height:${rowH}px;line-height:${rowH}px;text-align:center;">${n}</span>`
            ).join('');
            return `<div class="digit-col" data-digit="${d}" style="display:flex;flex-direction:column;transform:translateY(0);transition:transform 1.5s cubic-bezier(0.12,0,0.39,1);will-change:transform;">${spans}</div>`;
        }).join('') + `<span style="display:block;height:${rowH}px;line-height:${rowH}px;">+</span>`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const fontSize = parseFloat(getComputedStyle(stat).fontSize) || 40;
                const rowH = fontSize * 1.1;

                setTimeout(() => {
                    stat.querySelectorAll('.digit-col').forEach(col => {
                        const d = parseInt(col.getAttribute('data-digit'));
                        col.style.transform = `translateY(-${d * rowH}px)`;
                    });
                }, 100);
            } else {
                entry.target.querySelectorAll('.digit-col').forEach(col => {
                    col.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.2 });

    stats.forEach(stat => observer.observe(stat));
}

window.addEventListener('load', initRollingStats);

function injectNavbar(activeKey, isRoot = false) {
    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang];

    const toggleTarget = lang === 'tr' ? 'en/home.html' : '../index.html';
    const langLabel = lang === 'tr' ? 'EN' : 'TR';

    const navLinks = t.nav.map(item => {
        let finalHref;
        if (lang === 'en') {
            finalHref = isRoot ? `en/${item.href}` : item.href;
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
          <a href="${isRoot ? (lang === 'en' ? 'en/home.html' : 'index.html') : (lang === 'en' ? 'home.html' : '../index.html')}" class="navbar-brand">
            <img src="${logoPng}" alt="miya" class="navbar-logo-2" onerror="this.onerror=null;this.src='${logoSvg}';" />
          </a>
          <div class="nav-links">${navLinks}</div>
          <div class="nav-cta">
            <a href="${toggleTarget}" class="lang-btn">${langLabel}</a>
            <a href="${lang === 'en' ? (isRoot ? 'en/contact.html' : 'contact.html') : (isRoot ? 'iletisim.html' : '../iletisim.html')}" class="btn-contact-nav">${t.cta}</a>
          </div>
          <div class="mobile-right">
            <a href="${toggleTarget}" class="lang-btn">${langLabel}</a>
            <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
          </div>
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
    const logoPng = isRoot ? 'images/miya_logo.png' : '../images/miya_logo.png';

    const addressText = lang === 'tr'
        ? "Kuşçular Mah. 8035/1 Sk. No:12/2 <br> Urla / İzmir <br> TÜRKİYE"
        : "Kuscular Mah. 8035/1 Sk. No:12/2 <br> Urla / Izmir <br> TURKIYE";

    const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href='${isRoot ? (lang === 'en' ? 'en/home.html' : 'index.html') : (lang === 'en' ? 'home.html' : '../index.html')}'>
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
              <span class="icon"><img src="/images/mailfooter.jfif" alt="Mail" style="width: 26px; height: 26px; border-radius: 50%;" /></span>
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

    initRollingStats();
}