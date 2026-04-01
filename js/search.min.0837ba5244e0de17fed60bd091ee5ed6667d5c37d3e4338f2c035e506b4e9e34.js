(function(){"use strict";const p="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js",j="/search-index.json";let i=null,y=[],e=-1,n=[];const o=document.getElementById("search-overlay"),l=document.getElementById("search-backdrop"),s=document.getElementById("search-input"),a=document.getElementById("search-results"),t=document.getElementById("search-empty"),m=document.getElementById("search-toggle");if(!o||!s)return;function h(){o.classList.add("active"),document.body.style.overflow="hidden",setTimeout(()=>s.focus(),50),v()}function r(){o.classList.remove("active"),document.body.style.overflow="",s.value="",f(),e=-1}m&&m.addEventListener("click",h),l&&l.addEventListener("click",r),document.addEventListener("keydown",t=>{if((t.metaKey||t.ctrlKey)&&t.key==="k"&&(t.preventDefault(),o.classList.contains("active")?r():h()),t.key==="Escape"&&r(),!o.classList.contains("active"))return;t.key==="ArrowDown"?(t.preventDefault(),e=Math.min(e+1,n.length-1),u()):t.key==="ArrowUp"?(t.preventDefault(),e=Math.max(e-1,0),u()):t.key==="Enter"&&e>=0&&n[e]&&n[e].click()});function v(){if(i)return;Promise.all([g(p),fetch(j).then(e=>e.json())]).then(([e,t])=>{y=t,i=new Fuse(t,{keys:[{name:"title",weight:.5},{name:"summary",weight:.3},{name:"tags",weight:.1},{name:"categories",weight:.1}],threshold:.35,includeScore:!0,ignoreLocation:!0,minMatchCharLength:2}),s.value.trim()&&c(s.value.trim())}).catch(e=>{console.warn("Search failed to initialize:",e)})}function g(e){return new Promise((t,n)=>{if(document.querySelector(`script[src="${e}"]`)){t();return}const s=document.createElement("script");s.src=e,s.onload=t,s.onerror=n,document.head.appendChild(s)})}s.addEventListener("input",t=>{const n=t.target.value.trim();if(e=-1,n.length<2){f();return}i&&c(n)});function c(e){const t=i.search(e,{limit:10});b(t)}function f(){a.innerHTML="",t&&(t.style.display="none"),n=[]}function b(e){if(a.innerHTML="",n=[],e.length===0){t&&(a.appendChild(t),t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center");return}t&&(t.style.display="none"),e.forEach((e)=>{const s=e.item,o=document.createElement("a");o.href=s.permalink,o.className="search-result-item",o.innerHTML=`
        <div class="result-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
        <div class="result-content">
          <div class="result-title">${d(s.title)}</div>
          ${s.summary?`<div class="result-summary">${d(s.summary.substring(0,150))}</div>`:""}
          <div class="result-meta">
            ${s.section?`<span>${s.section}</span>`:""}
            ${s.date?`<span>${s.date}</span>`:""}
          </div>
        </div>
        <div class="result-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      `,o.addEventListener("click",r),a.appendChild(o),n.push(o)})}function u(){n.forEach((t,n)=>{t.classList.toggle("focused",n===e)}),n[e]&&n[e].scrollIntoView({block:"nearest"})}function d(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}})()