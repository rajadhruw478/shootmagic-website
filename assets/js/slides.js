document.querySelectorAll('.direct-slider').forEach(root=>{
 const track=root.querySelector('.slide-track'),slides=[...track.querySelectorAll('.direct-slide')],dots=[...root.querySelectorAll('.slide-dot')],count=slides.length;
 if(!count)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let index=0,position=1,busy=false,paused=reduced,hover=false,fallback;
 const first=slides[0].cloneNode(true),last=slides[count-1].cloneNode(true);
 for(const clone of [first,last]){clone.classList.add('slide-clone');clone.setAttribute('aria-hidden','true');clone.inert=true;clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));}
 track.prepend(last);track.append(first);
 function paint(animate){track.style.transition=animate&&!reduced?'transform .65s cubic-bezier(.2,.7,.2,1)':'none';track.style.transform=`translateX(-${position*100}%)`;}
 function sync(){slides.forEach((s,n)=>s.setAttribute('aria-hidden',String(n!==index)));dots.forEach((d,n)=>{d.classList.toggle('active',n===index);d.setAttribute('aria-pressed',String(n===index));});const label=root.querySelector('.slide-count');if(label)label.textContent=`${index+1} / ${count}`;}
 function settle(){clearTimeout(fallback);if(position===0)position=count;else if(position===count+1)position=1;paint(false);busy=false;}
 function show(i){if(busy||count<2)return;busy=true;if(i===index+1)position++;else if(i===index-1)position--;else position=((i%count+count)%count)+1;index=(i%count+count)%count;paint(true);sync();if(reduced)settle();else fallback=setTimeout(settle,750);}
 track.addEventListener('transitionend',e=>{if(e.target===track&&e.propertyName==='transform')settle();});
 root.querySelector('.slide-prev')?.addEventListener('click',()=>show(index-1));root.querySelector('.slide-next')?.addEventListener('click',()=>show(index+1));dots.forEach((d,n)=>d.addEventListener('click',()=>show(n)));
 root.addEventListener('keydown',e=>{if(e.target.matches('img'))return;if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}});
 let start;root.addEventListener('touchstart',e=>start=e.changedTouches[0].clientX,{passive:true});root.addEventListener('touchend',e=>{if(start===undefined)return;const dx=e.changedTouches[0].clientX-start;if(Math.abs(dx)>50)show(index+(dx<0?1:-1));start=undefined;},{passive:true});
 const pause=root.querySelector('.slide-pause');function syncPause(){if(pause){pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-pressed',String(paused));}}pause?.addEventListener('click',()=>{paused=!paused;syncPause();});root.addEventListener('pointerenter',()=>hover=true);root.addEventListener('pointerleave',()=>hover=false);
 if(root.dataset.autoplay==='true')setInterval(()=>{if(!paused&&!hover&&!root.contains(document.activeElement)&&!document.hidden&&!document.querySelector('dialog[open]'))show(index+1);},2000);
 if(root.classList.contains('banner-slider'))slides.forEach(slide=>{const img=slide.querySelector('img');img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Next banner');img.addEventListener('click',()=>show(index+1));img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(index+1);}});});
 paint(false);syncPause();sync();
});
