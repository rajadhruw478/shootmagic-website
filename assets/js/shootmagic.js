const config = window.SHOOTMAGIC_CONFIG || {};
document.querySelectorAll('.wa-link').forEach(link => {
 if (config.whatsappNumber) {
 link.href='https://wa.me/'+config.whatsappNumber+'?text='+encodeURIComponent(link.dataset.message||'Hi, I am interested in Shootmagic software.');link.target='_blank';link.rel='noopener noreferrer';
 } else {link.href='contact.html';link.removeAttribute('target');}
});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const toggle=document.querySelector('.theme-toggle');
function setTheme(theme){document.documentElement.dataset.theme=theme;document.body.dataset.theme=theme;if(toggle){toggle.querySelector('span').textContent=theme==='dark'?'Light':'Dark';toggle.querySelector('i').className=theme==='dark'?'bi bi-sun':'bi bi-moon';toggle.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' theme');toggle.setAttribute('aria-pressed',String(theme==='light'));}try{localStorage.setItem('shootmagic-theme',theme)}catch(e){}}
setTheme(document.documentElement.dataset.theme||'dark');toggle?.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
const mobileToggle=document.querySelector('.mobile-nav-toggle');mobileToggle?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();mobileToggle.click();}});

// Progressive scroll reveal: content stays visible when JavaScript is unavailable.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:0.08});
 document.querySelectorAll('.feature-card,.plan-card,.product-card,.step,.info-box,.section-heading,.album-showcase').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%3)*70+'ms';observer.observe(el);});
}
