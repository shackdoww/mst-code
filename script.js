const milestones = [
 {year:'1953',label:'Transistors',title:'Computers lose the tubes.',tag:'HARDWARE / SWITCHING',summary:'The Manchester transistor computer prototype demonstrated an alternative to vacuum-tube computing.',tech:'Transistors act as electronic switches. Their small size and low power needs helped reduce the space and heat associated with vacuum tubes. The first transistor had been demonstrated in 1947, before this era.',bottleneck:'Bulky, power-hungry circuitry → smaller solid-state components. Wiring many separate components remained a challenge.',impact:'More practical computers supported institutional data processing. Access still largely belonged to organizations with money and trained operators.'},
 {year:'1958–59',label:'Integrated circuits',title:'A circuit becomes a chip.',tag:'HARDWARE / INTEGRATION',summary:'Jack Kilby and Robert Noyce developed key approaches to the integrated circuit in 1958 and 1959.',tech:'Multiple electronic components could be formed on one semiconductor substrate. Silicon-based manufacturing enabled increasingly dense circuits with fewer external connections.',bottleneck:'Complex assembly of separate parts → integration on a chip. Manufacturing reliability and production cost still mattered.',impact:'Smaller electronics helped broaden computing applications. Semiconductor manufacturing and engineering became increasingly influential industries.'},
 {year:'1971',label:'Microprocessor',title:'The processor fits on silicon.',tag:'HARDWARE / COMPUTATION',summary:'Intel introduced the 4004, an early commercial single-chip microprocessor, for a calculator system.',tech:'The 4004 was a 4-bit CPU with approximately 2,300 transistors. It integrated central processing functions, while still requiring other chips for memory and input/output.',bottleneck:'A CPU assembled from many components → a programmable processor on one chip. Affordable complete systems were the next challenge.',impact:'Microprocessors supported embedded devices and helped make smaller computers possible, expanding opportunities for hardware and software development.'},
 {year:'1977',label:'Personal computers',title:'Computing comes closer to home.',tag:'HARDWARE / PERSONAL ACCESS',summary:'The Apple II, Commodore PET and TRS-80 marked an important wave of ready-made personal computers.',tech:'Microprocessors, RAM, keyboards and displays brought computing into smaller systems. Storage, memory and connectivity remained limited compared with modern machines.',bottleneck:'Institutional access → more individual ownership. Machines still needed useful software, skills and ways to exchange information.',impact:'People could learn programming and work with digital documents at home, school and work. Cost and access to training produced unequal opportunities.'},
 {year:'1989–91',label:'The early Web',title:'Documents gain a global address.',tag:'STANDARDS / HTTP + HTML',summary:'Tim Berners-Lee proposed the Web at CERN in 1989. A browser and server were working by late 1990, and the project reached the wider Internet in 1991.',tech:'URLs identify resources; HTTP carries requests and responses; HTML structures linked documents. These web technologies use the existing Internet, whose TCP/IP protocols connect networks.',bottleneck:'Information scattered across incompatible systems → linked documents using shared conventions. Ease of use and wider availability were still barriers.',impact:'Researchers could share and navigate information across computers. The same approach opened possibilities for wider publishing and learning.'},
 {year:'1993',label:'Wider adoption',title:'The Web opens its doors.',tag:'ACCESS / BROWSERS',summary:'CERN put its web software in the public domain on April 30. NCSA Mosaic helped popularize browsing with a graphical interface.',tech:'Browsers rendered linked text and images, making web navigation more approachable. Open web standards allowed different browsers and servers to communicate.',bottleneck:'Specialist tools and uncertainty about access → easier browsing and freely available web software. Finding trustworthy information became a growing challenge.',impact:'Publishing expanded beyond traditional gatekeepers. During the 1990s, websites supported new businesses and communities, while connectivity costs and digital literacy limited participation.'}
];

// Keep the short explanation first; original research remains available on demand.
const explanations = [
 {short:'A smaller switch made smaller computers possible.',analogy:'Think of replacing a bulky light switch with a tiny one. A transistor controls an electrical signal.',before:'Bulky vacuum tubes',after:'Small electronic switches',symbol:'⏻'},
 {short:'Many electronic parts could share one chip.',analogy:'Instead of wiring every part separately, build many parts together on one small base.',before:'Many separate components',after:'One integrated circuit',symbol:'▦'},
 {short:'The CPU could fit on a single chip.',analogy:'The CPU follows instructions. Putting it on one chip helped make compact computers practical.',before:'CPU spread across components',after:'A microprocessor',symbol:'▣'},
 {short:'More people could use a computer of their own.',analogy:'Computing moved closer to desks, classrooms and homes, though owning a computer was still expensive.',before:'Mostly institutional access',after:'More personal ownership',symbol:'⌨'},
 {short:'Shared rules let computers exchange linked pages.',analogy:'URL = the address. HTTP = the way to ask and reply. HTML = the structure of the page.',before:'Scattered documents',after:'Pages connected by links',symbol:'↗'},
 {short:'Easier browsers helped more people explore the Web.',analogy:'A graphical browser made pages easier to navigate, while freely available web software encouraged adoption.',before:'Specialist tools',after:'More approachable browsing',symbol:'◎'}
];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
function animateIn(element) {
 if (!motionPreference.matches && element.animate) element.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'cubic-bezier(.2,.7,.2,1)'});
}
let selected = 0;
const timeline = document.querySelector('#timeline');
milestones.forEach((m,i)=>{
 const button=document.createElement('button');
 button.innerHTML=`<span class="milestone-number">0${i+1}</span><b>${m.year}</b><small>${m.label}</small>`;
 button.addEventListener('click',()=>render(i));
 button.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowRight') next=Math.min(milestones.length-1,i+1);
  if(event.key==='ArrowLeft') next=Math.max(0,i-1);
  if(event.key==='Home') next=0;
  if(event.key==='End') next=milestones.length-1;
  if(next!==undefined){event.preventDefault();render(next);timeline.children[next].focus();}
 });
 timeline.append(button);
});
function render(index){
 selected=index;
 const m=milestones[index],e=explanations[index],detail=document.querySelector('#detail');
 detail.innerHTML=`<div class="milestone-intro"><p class="year">${m.year}</p><span class="tag">${m.tag}</span><h3 class="detail-title">${m.title}</h3><p class="detail-summary">${m.summary}</p></div><div class="lesson"><div class="idea-heading"><span class="idea-symbol" aria-hidden="true">${e.symbol}</span><span class="eyebrow">THE BIG IDEA</span></div><h3>${e.short}</h3><p>${e.analogy}</p><div class="before-after"><div><span>BEFORE</span><b>${e.before}</b></div><span aria-hidden="true">→</span><div><span>AFTER</span><b>${e.after}</b></div></div><details><summary>Explore the technology & impact</summary><div class="facts"><div><h4>How it works</h4><p>${m.tech}</p></div><div><h4>What problem did it solve?</h4><p>${m.bottleneck}</p></div><div><h4>People, power & labor</h4><p>${m.impact}</p></div></div></details></div>`;
 [...timeline.children].forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
 document.querySelector('#progress-fill').style.width=`${(index+1)/milestones.length*100}%`;
 document.querySelector('#counter').textContent=`${index+1} / ${milestones.length}`;
 document.querySelector('#previous').disabled=index===0;
 document.querySelector('#next').disabled=index===milestones.length-1;
 animateIn(detail);
}
document.querySelector('#previous').addEventListener('click',()=>render(Math.max(0,selected-1)));
document.querySelector('#next').addEventListener('click',()=>render(Math.min(milestones.length-1,selected+1)));
render(0);
const connections=[
 {problem:'Computers were bulky and produced a lot of heat.',solution:'Transistors replaced vacuum tubes in many applications.',next:'But connecting lots of separate parts was still difficult.'},
 {problem:'Many separate parts meant complicated wiring.',solution:'Integrated circuits packed components together. Microprocessors put a CPU on a chip.',next:'But people still needed affordable, useful complete computers.'},
 {problem:'Information was scattered across different computers.',solution:'Web standards let browsers request and link documents over the Internet.',next:'But cost, digital skills and trustworthy information remained challenges.'}
];
function showConnection(index){
 const c=connections[index],panel=document.querySelector('#connection-detail');
 panel.innerHTML=`<div><span class="card-number">THE PROBLEM</span><h3>${c.problem}</h3></div><div class="solution"><span class="card-number">THE BREAKTHROUGH</span><h3>${c.solution}</h3></div><p class="next-challenge"><b>The next challenge</b> ${c.next}</p>`;
 document.querySelectorAll('[data-connection]').forEach((b,i)=>b.setAttribute('aria-pressed',String(index===i)));
 animateIn(panel);
}
document.querySelectorAll('[data-connection]').forEach(button=>button.addEventListener('click',()=>showConnection(Number(button.dataset.connection))));
showConnection(0);
let requestStep=0;
let packetAnimation;
const requestButton=document.querySelector('#request');
const initialExplanation=document.querySelector('#demo-explanation').textContent;
const steps=[
 {explanation:'1. Request: the browser uses the URL to ask the server for a document. Like asking a library for a specific book.',code:'BROWSER → SERVER\nGET /index.html\n\n“Please send me this document.”',button:'2. Receive the response →'},
 {explanation:'2. Response: the server sends back HTML. A 200 OK status means this request succeeded.',code:'SERVER → BROWSER\n200 OK\nContent-Type: text/html\n\n<h1>Hello, world!</h1>\n<a href="next.html">Another page</a>',button:'3. Build the page →'},
 {explanation:'3. Render: the browser reads the HTML and displays the page. Following a link starts another request.',code:'BROWSER\nRead HTML → build the page\n\nThe document is now ready to view.',button:'Restart the exchange ↺'}
];
function resetDemo(){
 requestStep=0;
 if(packetAnimation)packetAnimation.cancel();
 document.querySelector('#network').textContent='Ready. Click “Send a request” to begin.';
 document.querySelector('#demo-explanation').textContent=initialExplanation;
 requestButton.textContent='1. Send a request →';
 document.querySelector('#page-preview').hidden=true;
 document.querySelectorAll('.demo-steps li').forEach(item=>item.removeAttribute('aria-current'));
 document.querySelectorAll('.endpoint').forEach(node=>node.classList.remove('active'));
}
function advanceDemo(){
 if(requestStep===3){resetDemo();return;}
 const step=steps[requestStep];
 document.querySelector('#network').textContent=step.code;
 document.querySelector('#demo-explanation').textContent=step.explanation;
 requestButton.textContent=step.button;
 document.querySelectorAll('.demo-steps li').forEach((item,i)=>{if(i===requestStep)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});
 document.querySelector('#browser-node').classList.toggle('active',requestStep!==1);
 document.querySelector('#server-node').classList.toggle('active',requestStep===1);
 if(packetAnimation)packetAnimation.cancel();
 if(requestStep<2 && !motionPreference.matches){
  const packet=document.querySelector('#packet');
  if(packet.animate)packetAnimation=packet.animate([{left:requestStep===0?'0%':'100%',opacity:0},{opacity:1,offset:.15},{opacity:1,offset:.85},{left:requestStep===0?'100%':'0%',opacity:0}],{duration:850,easing:'ease-in-out'});
 }
 document.querySelector('#page-preview').hidden=requestStep!==2;
 if(requestStep===2)animateIn(document.querySelector('#page-preview'));
 requestStep++;
}
requestButton.addEventListener('click',advanceDemo);
document.querySelector('#reset-demo').addEventListener('click',resetDemo);
document.querySelector('#follow-link').addEventListener('click',()=>{resetDemo();advanceDemo();requestButton.focus();});
motionPreference.addEventListener('change',()=>{if(motionPreference.matches && packetAnimation)packetAnimation.cancel();});
// Reveal once, with a visible fallback when observers or motion are unavailable.
if('IntersectionObserver' in window && !motionPreference.matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){animateIn(entry.target);observer.unobserve(entry.target);}}),{threshold:.12});
 document.querySelectorAll('main > section').forEach(section=>observer.observe(section));
}
let scrollQueued=false;
function updateReading(){const range=document.documentElement.scrollHeight-innerHeight;document.querySelector('#reading-fill').style.transform=`scaleX(${range>0?Math.min(1,Math.max(0,scrollY/range)):0})`;scrollQueued=false;}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateReading);}},{passive:true});
addEventListener('resize',updateReading);
updateReading();
