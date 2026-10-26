// EDIT THIS LIST when you build a new project. Each project automatically appears in the grid.
// Keep the skills list factual. Add skills only when they actually belong in your toolkit.
const skillGroups = [
 {name:'Network Security & Architecture',skills:['Palo Alto PAN-OS','Panorama','Next-Generation Firewalls','Firewall Policy Management','IDS/IPS','SSL/TLS Decryption','IPsec VPN','GRE VPN','Zero Trust','ZTNA','SASE','SWG','FWaaS','TCP/IP','Routing & Switching','VLANs','Inter-VLAN Routing','Subnetting','CIDR','ACLs','NAT','DNS','DHCP']},
 {name:'Detection, Monitoring & Response',skills:['Splunk','SIEM','ELK Stack','Elasticsearch','Logstash','Kibana','Wireshark','Extended Detection and Response (XDR)','Endpoint Detection and Response (EDR)','Nmap','Nessus','Vulnerability Assessment','Incident Response','Security Log Analysis']},
 {name:'Cloud & Identity',skills:['AWS','Azure','AWS IAM','Azure IAM','AWS Security Groups','VPC','CloudTrail','CloudWatch','Cloud Security','Network Segmentation','Identity Integration','Kerberos','Least Privilege']},
 {name:'Automation & Infrastructure',skills:['Python','Ansible','Terraform','REST APIs','Git','GitHub','Linux','Infrastructure as Code','Network Automation']},
 {name:'AI Security & Evaluation',skills:['AI Model Evaluation','AI Security','Adversarial Testing','Cybersecurity Reasoning Evaluation','Security Scenario Design','Technical Response Validation','Structured Security Data Analysis']}
];
const aliases={'ngfw':'Next-Generation Firewalls','fw':'Next-Generation Firewalls','palo alto':'Palo Alto PAN-OS','aws cloud':'AWS','iac':'Infrastructure as Code','elastic stack':'ELK Stack','packet analysis':'Wireshark','siem monitoring':'SIEM','penetration testing':'Vulnerability Assessment','zero trust network access':'ZTNA','security information event management':'SIEM'};
const grid=document.querySelector('#project-grid');
function renderProjects(category='All'){
 grid.replaceChildren();
 projects.filter(p=>category==='All'||p.category===category).forEach(project=>{
  const card=document.createElement('article');card.className='project-card';
  const visual=document.createElement('div');visual.className='project-visual';const picture=document.createElement('img');picture.className='project-icon-image';picture.src=project.image;picture.alt='Illustration representing '+project.title;picture.loading='lazy';visual.append(picture);
  const body=document.createElement('div');body.className='project-body';
  const cat=document.createElement('span');cat.className='project-category';cat.textContent=project.category;
  const heading=document.createElement('h3');heading.textContent=project.title;
  const desc=document.createElement('p');desc.textContent=project.summary;
  const tags=document.createElement('div');tags.className='tags';project.tags.forEach(t=>{const el=document.createElement('span');el.textContent=t;tags.append(el)});
  const trigger=document.createElement('button');trigger.className='project-open';trigger.type='button';trigger.setAttribute('aria-label','View details for '+project.title);trigger.textContent='View project details ↗';
  trigger.addEventListener('click',()=>openProject(project));
  body.append(cat,heading,desc,tags,trigger);card.append(visual,body);card.addEventListener('click',e=>{if(e.target!==trigger)openProject(project)});card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Open details for '+project.title);card.addEventListener('keydown',e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openProject(project)}});grid.append(card);
 });
}

// In-page accessible project dialog. No navigation or paid service required.
const modalBackdrop=document.querySelector('#project-modal-backdrop');
const modalDialog=document.querySelector('#project-modal');
const modalContent=document.querySelector('#modal-content');
const modalClose=document.querySelector('#modal-close');
let returnFocus=null;
function modalEl(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n}
function openProject(project){
 returnFocus=document.activeElement;
 modalContent.replaceChildren();
 const title=modalEl('h2','',project.title);title.id='modal-title';modalContent.append(modalEl('span','eyebrow',project.category),title,modalEl('p','modal-lead',project.summary));
 const art=modalEl('div','modal-project-art');const picture=modalEl('img','modal-project-image');picture.src=project.image;picture.alt='Illustration representing '+project.title;art.append(picture);modalContent.append(art);
 const details=modalEl('section','modal-detail');details.append(modalEl('h3','','What I built'));const list=modalEl('ul');(project.details||[]).forEach(item=>list.append(modalEl('li','',item)));details.append(list);modalContent.append(details);
 const outcome=modalEl('section','modal-detail');outcome.append(modalEl('h3','','Results & outcomes'),modalEl('p','',project.outcome||'Project details and documentation are available in the repository.'));modalContent.append(outcome);
 const tech=modalEl('section','modal-detail');tech.append(modalEl('h3','','Tools & technologies'));const tags=modalEl('div','tags');(project.tags||[]).forEach(t=>tags.append(modalEl('span','',t)));tech.append(tags);modalContent.append(tech);
 const note=modalEl('p','modal-image-note',project.url?'Illustration shown above. Project-specific screenshots and diagrams can be added when available.':'Illustration shown above. A public GitHub repository is not available for this project. Supporting screenshots or documentation can be added later.');modalContent.append(note);
 if(project.url){const footer=modalEl('div','modal-actions');const github=modalEl('a','button primary','Explore on GitHub ↗');github.href=project.url;github.target='_blank';github.rel='noopener noreferrer';footer.append(github);modalContent.append(footer)}
 modalBackdrop.hidden=false;document.body.classList.add('modal-active');document.querySelector('#modal-scroll').scrollTop=0;modalClose.focus();
}
function closeProject(){if(modalBackdrop.hidden)return;modalBackdrop.hidden=true;document.body.classList.remove('modal-active');if(returnFocus&&returnFocus.isConnected)returnFocus.focus()}
modalClose.addEventListener('click',closeProject);
modalBackdrop.addEventListener('mousedown',e=>{if(e.target===modalBackdrop)closeProject()});
document.addEventListener('keydown',e=>{if(modalBackdrop.hidden)return;if(e.key==='Escape'){e.preventDefault();closeProject()}if(e.key==='Tab'){
 const items=[...modalDialog.querySelectorAll('button,a[href]')].filter(n=>!n.disabled);if(!items.length)return;const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
}});

renderProjects();
document.querySelectorAll('#project-filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('#project-filters button').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');renderProjects(btn.dataset.category)}));
const groups=document.querySelector('#skills-categories');
skillGroups.forEach(group=>{const card=document.createElement('article');card.className='skill-group';const title=document.createElement('h3');title.textContent=group.name;const list=document.createElement('div');list.className='skill-list';group.skills.forEach(skill=>{const tag=document.createElement('span');tag.textContent=skill;list.append(tag)});card.append(title,list);groups.append(card)});
const queryEl=document.querySelector('#skill-query'),resultEl=document.querySelector('#skill-result');
function searchSkill(){const q=queryEl.value.trim().toLowerCase();resultEl.classList.remove('found');if(!q){resultEl.textContent='Enter a skill or technology to search.';return}const matches=[];skillGroups.forEach(g=>g.skills.forEach(s=>{if(s.toLowerCase().includes(q)||q.includes(s.toLowerCase())&&s.length>2)matches.push(s)}));if(aliases[q]&&!matches.includes(aliases[q]))matches.push(aliases[q]);const uniq=[...new Set(matches)];if(uniq.length){resultEl.classList.add('found');resultEl.textContent='✓ Yes! '+uniq.slice(0,5).join(', ')+' '+(uniq.length===1?'is':'are')+' included in my documented tech stack.'}else{resultEl.textContent='“'+queryEl.value.trim()+'” is not currently listed in my tech stack. I enjoy learning related technologies and am always open to expanding my skills.'}}
document.querySelector('#skill-form').addEventListener('submit',e=>{e.preventDefault();searchSkill()});document.querySelectorAll('[data-try]').forEach(b=>b.addEventListener('click',()=>{queryEl.value=b.dataset.try;searchSkill()}));
const menu=document.querySelector('#menu-panel'),toggle=document.querySelector('#menu-toggle'),close=document.querySelector('#close-menu'),backdrop=document.querySelector('#menu-backdrop');let menuWasFocused=null;function setMenu(open){menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');backdrop.hidden=!open;document.body.style.overflow=open?'hidden':'';if(open){menuWasFocused=document.activeElement;close.focus()}else if(menuWasFocused){menuWasFocused.focus()}}toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));close.addEventListener('click',()=>setMenu(false));backdrop.addEventListener('click',()=>setMenu(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))setMenu(false);if(e.key==='Tab'&&menu.classList.contains('open')){const focusables=[...menu.querySelectorAll('a,button')];const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const els=document.querySelectorAll('.reveal');els.forEach(el=>el.classList.add('pre-reveal'));const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target)}})},{threshold:.08});els.forEach(el=>io.observe(el));}


