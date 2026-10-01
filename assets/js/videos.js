(()=>{
 function videoId(value){try{const u=new URL(value);if(u.hostname==='youtu.be')return u.pathname.split('/')[1];if(['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname))return u.searchParams.get('v')||u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];}catch{}return null;}
 document.querySelectorAll('[data-video-key]').forEach(item=>{
  const cfg=window.SHOOTMAGIC_VIDEOS?.[item.dataset.videoKey],id=videoId(cfg?.youtubeUrl||''),valid=id&&/^[\w-]{11}$/.test(id),button=item.querySelector('.video-play'),status=item.querySelector('.video-status');
  if(valid){const link=item.querySelector('.video-youtube');link.href='https://www.youtube.com/watch?v='+id;link.hidden=false;item.querySelector('.video-placeholder-label').textContent='YouTube video';}
  button.addEventListener('click',()=>{if(!valid){status.textContent='Video will be available here soon.';return;}const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1';frame.title=cfg.title||'Shootmagic video';frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';item.querySelector('.video-screen').replaceChildren(frame);});
 });
})();
