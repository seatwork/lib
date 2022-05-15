class Heatmap{constructor(t={}){this.options=__merge(Heatmap.DEFAULT_OPTIONS,t),this.spacing=this.options.lattice.size+this.options.lattice.spacing,this.svg=new Element("svg",{xmlns:"http://www.w3.org/2000/svg",style:Heatmap.DEFAULT_STYLES.svg}),this.buildWeeks(),this.buildDates(),this.svg.setAttribute({width:this.canvasWidth,height:8*this.spacing})}buildWeeks(){const t=this.options.lang.days;if(!Array.isArray(t))throw new Error('lang["days"] must be an array');this.weekWidth=0,t.forEach((t,e)=>{this.weekWidth=Math.max(this.weekWidth,5*(t.length-1));let s=new Element("text",{x:0,y:Heatmap.HEADER_HEIGHT+(e+1)*this.spacing});s.setText(t),this.svg.append(s)})}buildDates(){let t=new Date,e=this.format(t);t.setFullYear(t.getFullYear()-1);let s=0,i=-1;for(let a=1;a<=54;a++){s=a*this.spacing+this.weekWidth;let h=new Element("g",{transform:`translate(${s}, ${this.spacing})`});this.svg.append(h);for(let n=1==a?t.getDay():0;n<=6;n++){let l=this.format(t),o=new Element("rect",{x:0,y:n*this.spacing,width:this.options.lattice.size,height:this.options.lattice.size,onmouseover:"this.style.opacity=1",onmouseout:"this.style.opacity=0.6","data-date":l,style:__merge(Heatmap.DEFAULT_STYLES.rect,{fill:this.options.lattice.color})}),r=new Element("title");r.setText(l);let p=this.options.data[l];p&&(r.setText(r.text+"\n"+p.title),o.setClick("location.href=this.dataset.link"),o.setAttribute({"data-link":p.url,style:{fill:this.options.lattice.highlightColor,cursor:"pointer"}})),o.append(r),h.append(o);let c=t.getMonth();if(i!=c&&(i=c,this.buildMonths(c,s)),l==e)return void(this.canvasWidth=(a+1)*this.spacing+this.weekWidth);t.setDate(t.getDate()+1)}}}buildMonths(t,e){const s=this.options.lang.months;if(!Array.isArray(s))throw new Error('lang["months"] must be an array');let i=new Element("text",{x:e,y:Heatmap.HEADER_HEIGHT});i.setText(s[t]),this.svg.append(i)}format(t){let e=t.getMonth()+1,s=t.getDate();return t.getFullYear()+"/"+(e<10?"0"+e:e)+"/"+(s<10?"0"+s:s)}toSVG(){return this.svg.toXml()}}Heatmap.HEADER_HEIGHT=10,Heatmap.DEFAULT_OPTIONS={data:{},lattice:{size:12,spacing:3,highlightColor:"#cd4230",color:"#ddd"},lang:{days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},Heatmap.DEFAULT_STYLES={svg:{fill:"#999","font-size":"11px"},rect:{opacity:.6,transition:"all .3s"}};class Element{constructor(t,e={}){this.tag=t,this.attrs=e,this.children=[]}append(t){this.children.push(t)}setText(t){this.text=t}setClick(t){this.attrs.onclick=t}setAttribute(t){this.attrs=__merge(this.attrs,t)}toXml(){if(this.attrs.style){const t=[];for(let e in this.attrs.style)t.push(`${e}:${this.attrs.style[e]}`);this.attrs.style=t.join(";")}let t=[];for(let e in this.attrs)t.push(` ${e}="${this.attrs[e]}"`);t=t.join("");const e=[];return e.push(`<${this.tag}${t}>`),this.text?e.push(this.text):this.children.forEach(t=>e.push(t.toXml())),e.push(`</${this.tag}>`),e.join("")}}function __merge(...t){const e={},s=t=>t&&"object"==typeof t&&!t.length;return t.forEach(t=>{for(let i in t){const a=t[i];s(e[i])&&s(a)?e[i]=__merge(e[i],a):a&&(e[i]=a)}}),e}