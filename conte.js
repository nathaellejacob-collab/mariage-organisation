(function(){
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
/* fond : chateau + etoiles */
function bg(){if(document.getElementById('conte-bg'))return;var d=el('div');d.id='conte-bg';d.appendChild(el('div','castle'));var L=el('div','stars');d.appendChild(L);
var p=[[3,12],[6,40],[2,66],[8,84],[94,10],[97,38],[92,62],[95,86],[12,24],[88,28],[15,92],[85,94],[22,6],[78,8],[50,4],[30,50],[70,48],[4,52],[96,52]];
p.forEach(function(q,i){var s=el('i',null,i%3?'✦':'✧');s.style.left=q[0]+'%';s.style.top=q[1]+'%';s.style.fontSize=(9+i%4*3)+'px';s.style.animationDelay=(i*0.37)+'s';s.style.animationDuration=(2.6+i%5*0.5)+'s';L.appendChild(s)});
document.body.appendChild(d)}
/* sous-titres conte */
var SUB={'Invités':'Les invités du grand bal','Planning':'Le fil de la plus belle des journées','Cérémonie':'Là où les promesses sont faites','Animations':'Un peu de magie pour tous','Trousse de secours':'Pour que rien ne vienne troubler le conte',"Demoiselles d'honneur":'Les fidèles compagnes de la princesse','Témoins':'Les fidèles amis du prince','Prestataires':'Les artisans du royaume','Plan de table':'Où chacun trouvera sa place dans le conte','Chambres':'Les chambres du château','To do list':'Les quêtes à accomplir','Budget':'Le trésor du royaume','Administration':'Les coulisses du royaume'};
function sub(){var m=document.getElementById('main');if(!m)return;var h=m.querySelector('h2.display');if(!h||h.dataset.cs)return;var t=h.textContent.trim();var s=SUB[t];if(!s)return;h.dataset.cs='1';var p=el('p','conte-sub',s),sep=el('div','conte-sep');var host=h,pe=h.parentElement;if(pe&&pe!==m&&getComputedStyle(pe).display.indexOf('flex')>=0)host=pe;host.insertAdjacentElement('afterend',p);p.insertAdjacentElement('afterend',sep)}
/* etincelles */
function spark(x,y,n){for(var i=0;i<n;i++){var s=el('span','cspark',i%2?'✦':'✧');var a=Math.random()*6.28,r=30+Math.random()*50;s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',Math.cos(a)*r+'px');s.style.setProperty('--dy',Math.sin(a)*r+'px');s.style.fontSize=(9+Math.random()*10)+'px';document.body.appendChild(s);setTimeout(function(e){e.remove()},1000,s)}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.btn');if(b)spark(e.clientX,e.clientY,9)},true);
/* confirmations en conte */
var MAP=[[/enregistr|sauvegard/i,'Inscrit dans le grand livre'],[/ajout/i,'Ajouté au royaume'],[/supprim|retir/i,'Disparu dans un nuage d’étoiles'],[/copi/i,'Copié par magie']];
function toastFix(){var t=document.querySelector('.toast');if(!t||t.dataset.c===t.textContent)return;var x=t.textContent;for(var i=0;i<MAP.length;i++){if(MAP[i][0].test(x)&&x.indexOf('royaume')<0&&x.indexOf('livre')<0){t.textContent=MAP[i][1];break}}t.dataset.c=t.textContent}
/* changement d'onglet */
function wave(){var W=window.innerWidth,H=window.innerHeight,b=el('div','cwave');document.body.appendChild(b);setTimeout(function(){b.remove()},1300);for(var i=0;i<38;i++){var x=Math.random()*W,s=el('span','cwst',i%2?'✦':'✧');s.style.left=x+'px';s.style.top=(Math.random()*H)+'px';s.style.fontSize=(10+Math.random()*16)+'px';s.style.color=i%6===0?'#2B2622':'#E3AAA5';s.style.animationDelay=(x/W*0.7)+'s';document.body.appendChild(s);setTimeout(function(e){e.remove()},1800,s)}}
var last=null;function tabFx(){var c=window.CURRENT_TAB;if(last!==null&&c!==last){var m=document.getElementById('main');if(m){var r=m.getBoundingClientRect();wave()}}last=c}
/* compte a rebours scintillant */
var cdPrev=null;function cdWatch(){var n=document.querySelectorAll('.hero-countdown .display');if(!n.length){cdPrev=null;return}var v=[].map.call(n,function(e){return e.textContent});if(cdPrev&&cdPrev.length===v.length){for(var i=0;i<v.length;i++){if(v[i]!==cdPrev[i]){var r=n[i].getBoundingClientRect();cdBurst(r.left+r.width/2,r.top+r.height/2)}}}cdPrev=v}
function cdBurst(x,y){for(var i=0;i<12;i++){var s=el('span','cspark cdw',i%2?'\u2726':'\u2727');var a=Math.random()*6.28,d=24+Math.random()*34;s.style.left=x+'px';s.style.top=y+'px';s.style.fontSize=(9+Math.random()*9)+'px';s.style.setProperty('--dx',Math.cos(a)*d+'px');s.style.setProperty('--dy',Math.sin(a)*d+'px');document.body.appendChild(s);setTimeout(function(e){e.remove()},1200,s)}}
/* mot du jour */
var MOTS=['Chaque jour, une étoile de plus s\u2019allume dans le ciel du conte','Les cloches du château s\u2019accordent déjà','Dans le royaume, on prépare la plus belle des fêtes','Un voeu fait aujourd\u2019hui se réalisera le grand jour','La fée marraine veille sur chaque détail','Les carrosses sont presque prêts','Le bal approche, le coeur du prince bat plus fort','La princesse choisit sa plus belle étoile','Tout le royaume attend le grand jour','Un peu de magie et tout s\u2019arrange','Les invités du royaume se préparent à venir','Le conte s\u2019écrit un peu plus chaque jour','Bientôt, la plus belle page du livre','Les lanternes du château s\u2019allument une à une'];
function motJour(){var c=document.querySelector('#main > .fade > .card:first-child');if(!c||!c.querySelector('h1.display'))return;var d=new Date(),k=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()))/864e5)%MOTS.length;var m=c.querySelector('.mot-jour');if(!m){m=el('div','mot-jour');c.appendChild(m)}if(m.textContent!==MOTS[k])m.textContent=MOTS[k]}
/* prenoms ecrits a la plume */
var written=false;function plume(){if(written||document.getElementById('conte-intro'))return;var h=document.querySelector('#main > .fade > .card:first-child h1.display');if(!h)return;written=true;h.classList.add('cwrite');var p=el('span','cpen','\u2726');h.appendChild(p);setTimeout(function(){h.classList.remove('cwrite');p.remove()},3000)}
/* parallaxe, ciel qui rosit, etoile filante, tintement */
function setPar(x,y){var b=document.getElementById('conte-bg');if(b){b.style.setProperty('--px',x+'px');b.style.setProperty('--py',y+'px')}}
document.addEventListener('pointermove',function(e){var W=window.innerWidth||1,H=window.innerHeight||1;setPar(-(e.clientX/W-.5)*30,-(e.clientY/H-.5)*30)},{passive:true});
window.addEventListener('deviceorientation',function(e){if(e.gamma==null)return;setPar(-Math.max(-30,Math.min(30,e.gamma))*.6,-Math.max(-30,Math.min(30,(e.beta||0)-40))*.6)},{passive:true});
function sky(){var b=document.getElementById('conte-bg');if(!b)return;var h=document.documentElement,m=Math.max(1,h.scrollHeight-window.innerHeight),s=Math.max(0,Math.min(1,(window.pageYOffset||h.scrollTop)/m));b.style.setProperty('--sc',s.toFixed(3))}
window.addEventListener('scroll',sky,{passive:true});window.addEventListener('resize',sky);
function shootStar(){var s=el('div','cshoot');s.style.top=(8+Math.random()*30)+'%';document.body.appendChild(s);setTimeout(function(){s.remove()},1500)}
document.addEventListener('change',function(e){var t=e.target;if(t&&t.type==='checkbox'&&t.checked&&window.CURRENT_TAB==='taches'){shootStar();chime()}},true);
var AC=null,SND=false;try{SND=localStorage.getItem('conte_snd')==='1'}catch(e){}
function chime(){if(!SND)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();[1318.5,1976,2637].forEach(function(f,i){var o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+i*.07;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.06,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+1.2)})}catch(e){}}
document.addEventListener('click',function(e){if(SND&&e.target.closest&&e.target.closest('.btn'))chime()},true);
function sndBtn(){if(document.getElementById('sndbtn'))return;var b=el('button','',SND?'\u266A':'\u266A');b.id='sndbtn';b.type='button';b.title='Tintement magique';b.setAttribute('aria-pressed',SND?'true':'false');if(!SND)b.className='off';b.onclick=function(){SND=!SND;try{localStorage.setItem('conte_snd',SND?'1':'0')}catch(e){}b.className=SND?'':'off';b.setAttribute('aria-pressed',SND?'true':'false');if(SND)chime()};document.body.appendChild(b)}
function tilt(){[].forEach.call(document.querySelectorAll('#main .card:not(.ctilt)'),function(c){if(c.offsetHeight&&c.offsetHeight<280)c.classList.add('ctilt')})}
/* intro */
function intro(){var ok=true;try{ok=!sessionStorage.getItem('conte_intro');sessionStorage.setItem('conte_intro','1')}catch(e){}
if(!ok||document.getElementById('conte-intro'))return;var d=el('div');d.id='conte-intro';d.innerHTML='<div class="t">Il était une fois…</div>';for(var i=0;i<46;i++){var s=el('span','is',i%3?'\u2726':'\u2727');s.style.left=(Math.random()*96+1)+'%';s.style.top=(Math.random()*94+2)+'%';s.style.fontSize=(10+Math.random()*20)+'px';s.style.color=i%7===0?'#2B2622':'#E3AAA5';s.style.animationDelay=(Math.random()*2.8)+'s';s.style.animationDuration=(2+Math.random()*2)+'s';d.appendChild(s)}document.body.appendChild(d);
function go(){d.classList.add('out');setTimeout(function(){d.remove()},1100)}d.addEventListener('click',go);setTimeout(go,2900)}
function run(){bg();sub();toastFix();tabFx();cdWatch();motJour();plume();sky();sndBtn();tilt()}
function init(){bg();intro();run();new MutationObserver(function(){run()}).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
