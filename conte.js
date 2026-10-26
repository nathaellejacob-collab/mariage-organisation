(function(){
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
/* fond : chateau + etoiles */
function bg(){if(document.getElementById('conte-bg'))return;var d=el('div');d.id='conte-bg';d.appendChild(el('div','castle'));
var p=[[3,12],[6,40],[2,66],[8,84],[94,10],[97,38],[92,62],[95,86],[12,24],[88,28],[15,92],[85,94],[22,6],[78,8],[50,4],[30,50],[70,48],[4,52],[96,52]];
p.forEach(function(q,i){var s=el('i',null,i%3?'✦':'✧');s.style.left=q[0]+'%';s.style.top=q[1]+'%';s.style.fontSize=(9+i%4*3)+'px';s.style.animationDelay=(i*0.37)+'s';s.style.animationDuration=(2.6+i%5*0.5)+'s';d.appendChild(s)});
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
var last=null;function tabFx(){var c=window.CURRENT_TAB;if(last!==null&&c!==last){var m=document.getElementById('main');if(m){var r=m.getBoundingClientRect();spark(r.left+r.width/2,Math.max(r.top,60)+30,14)}}last=c}
/* intro */
function intro(){var ok=true;try{ok=!sessionStorage.getItem('conte_intro');sessionStorage.setItem('conte_intro','1')}catch(e){}
if(!ok||document.getElementById('conte-intro'))return;var d=el('div');d.id='conte-intro';d.innerHTML='<div class="t">Il était une fois…</div>';for(var i=0;i<46;i++){var s=el('span','is',i%3?'\u2726':'\u2727');s.style.left=(Math.random()*96+1)+'%';s.style.top=(Math.random()*94+2)+'%';s.style.fontSize=(10+Math.random()*20)+'px';s.style.color=i%7===0?'#2B2622':'#E3AAA5';s.style.animationDelay=(Math.random()*2.8)+'s';s.style.animationDuration=(2+Math.random()*2)+'s';d.appendChild(s)}document.body.appendChild(d);
function go(){d.classList.add('out');setTimeout(function(){d.remove()},1100)}d.addEventListener('click',go);setTimeout(go,2900)}
function run(){bg();sub();toastFix();tabFx()}
function init(){bg();intro();run();new MutationObserver(function(){run()}).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
