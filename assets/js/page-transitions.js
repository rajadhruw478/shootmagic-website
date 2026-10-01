// Local page navigation: gentle dissolve with normal links as the fallback.
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const main=document.querySelector('main');
 if(!main||reduced)return;
 let leaving=false;
 window.addEventListener('pageshow',()=>{leaving=false;main.classList.remove('page-leaving');});
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||link.target&&link.target!=='_self'||link.hasAttribute('download'))return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||!url.pathname.endsWith('.html')||url.pathname===location.pathname)return;
  if(leaving){event.preventDefault();return;}
  event.preventDefault();leaving=true;main.classList.add('page-leaving');
  setTimeout(()=>location.assign(url.href),180);
 });
})();
