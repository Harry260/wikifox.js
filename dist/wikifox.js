/*!
    * WikipieJS v1.0.8
    * https://github.com/Harry260
    * https://github.com/harry260/wikipie.js
    * https://www.npmjs.com/package/wikipie
    * Licensed MIT © Harry Tom
*/

class Wikipedia{constructor(t="en"){Object.values(wikiApp.availableWikipedia).includes(t)?this.wiki=t:(console.error("Wiki Error:","Wikipedia not found. Initializing Wikipedia [en]. Refer WP CODES from https://en.wikipedia.org/wiki/List_of_Wikipedias"),this.wiki="en")}getArticle(t){var e=this.wiki;return t?fetch(`https://${e}.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${t}`).then(function(t){return t.json()}).then(function(t){var i=t.query.pages,r=i[Object.keys(i)[0]],a={status:"success",data:{title:r.title,content:r.extract,id:r.pageid,url:`http://${e}.wikipedia.org/?curid=`+r.pageid}},n=a.data.title;return"Undefined"!==n&&void 0!==n&&void 0!==a.data.content||(a=wikiApp.createErrorObj(`Page with the title [${n}] does not exist`)),a}).catch(t=>{if(t)return Obj=wikiApp.createErrorObj(t),Obj}):wikiApp.createErrorObj("Page title cannot be null.")}searchArticles(t){var e=this.wiki;return t?fetch(`https://${e}.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=revisions&list=search&srsearch=${t}`).then(function(t){return t.json()}).then(function(t){var i=t.query.search,r={};return i.forEach(function(t){r[t.title]={title:t.title,page:t.pageid,words:t.wordcount,snippet:wikiApp.stripHTML(t.snippet),url:`http://${e}.wikipedia.org/?curid=`+t.pageid}}),{status:"success",data:{results:r}}}).catch(t=>{if(t)return Obj=wikiApp.createErrorObj(t),Obj}):wikiApp.createErrorObj("Page title cannot be null.")}getImages(t){return t?fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${t}&format=json&prop=images&origin=*`).then(function(t){return t.json()}).then(function(e){var i=[],r=e.query.pages;return(r[Object.keys(r)[0]]="-1")?wikiApp.createErrorObj(`Page with the title [${t}] does not exist`):(r[Object.keys(r)[0]].images.forEach(function(t,e){i.push(" https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/"+t.title+"&origin=*")}),{page:Object.keys(r)[0],images:Object.assign({},i)})}).catch(t=>{if(t)return Obj=wikiApp.createErrorObj(t),Obj}):wikiApp.createErrorObj("Page title cannot be null.")}getOnThisDay(t={}){const e=new Date;var i=t.type||"events",r=t.day||e.getDate(),a=t.month||e.getMonth()+1;return"events"!==i&&"deaths"!==i&&"births"!==i?wikiApp.createErrorObj(`Parameter Error - [${i}] is not a valid category [events/deaths/births]`):wikiApp.isBetween(r,0,32)&&wikiApp.isBetween(a,0,12)?fetch(`https://cdn.jsdelivr.net/gh/harrify-apis/historyjs/${i}/${a}_${r}.json`).then(function(t){return t.json()}).then(function(t){var e=t;return{date:e.date,url:e.wikipedia,type:i,data:e[i]}}).catch(t=>{if(t)return Obj=wikiApp.createErrorObj(t),Obj}):wikiApp.createErrorObj("Parameter Error - Parameter should be in the format (date [d], month [m]).\nExample (1, 12) which means December 1st")}getPDF(t,e=!0){var i=`https://en.wikipedia.org/api/rest_v1/page/pdf/${t}`;return fetch(i).then(function(t){return t.json()}).then(function(){return wikiApp.createErrorObj("Wiki Error: Page not found")}).catch(()=>(!1!==e&&window.location.assign(i),{status:"success",title:t,url:i}))}}const wikiApp={createErrorObj(t){var e={status:"failed",data:t};return console.error("Wiki Error /",t),e},stripHTML:function(t){try{var e=document.createElement("div");return e.innerHTML=t,e.innerText}catch{return t}},isBetween:function(t,e,i){return t>e&&t<i},availableWikipedia:["en","fr","de","es","ja","ru","pt","zh","it","fa","ar","pl","nl","uk","id","he","vi","tr","sv","ko","cs","fi","hu","ca","hi","simple","no","bn","th","el","ro","da","az","sr","bg","ms","et","hr","hy","sk","ml","eu","sl","eo","lt","ta","sq","lv","be","gl","ka","ur","kk","mk","uz","te","mr","sh","arz","af","bs","ceb","kn","ha","nn","is","la","my","sw","ast","tl","jv","ba","as","ckb","azb","si","cy","sco","ne","br","tt","als","ga","oc","mn","so","gu","pa","ky","war","an","ku","dag","lb","tg","bar","km","yo","su","min","ps","bcl","pnb","nds","tk","mg","fy","or","ang","hif","io","cv","ce","ht","lmo","wuu","am","ig","yi","qu","bh","ban","mzn","ary","sah","ia","vec","ace","lo","scn","fo","sa","kw","diq","gn","sd","hyw","eml","ie","rw","mai","szl","vo","ay","sat","co","sc","xmf","new","zu","hsb","lij","os","gd","ak","hak","vls","bi","frp","mt","nap","sn","vep","crh","li","pms","ilo","ks","cdo","nah","bo","wa","pam","myv","mi","frr","bpy","lad","se","fur","gag","smn","pcd","udm","bug","avk","chr","gan","kv","mhr","tw","kab","mnw","tcy","ug","ab","ln","lfn","pap","dty","dz","haw","gv","rue","bjn","cu","szy","bxr","ny","dv","gor","kl","rn","lld","ext","ksh","ady","av","ch","chy","cr","dsb","kbp","csb","kg","jbo","mwl","pdc","rm","shi","iu","mad","nov","arc","tpi","ts","tyv","zea","shn","glk","mrj","na","nv","nrm","sm","tet","bm","pag","wo","awa","ff","got","inh","krc","kaa","lbe","lez","pih","xh","fj","jam","kbd","xal","om","ss","tn","rmy","gom","din","ee","ik","olo","mdf","nqo","ti","lg","nia","koi","ltg","pnt","to","za","skr","ki","stq","st","ty","atj","nso","pi","srn","ve","gcr","pfl","sg","tum","nostalgia"]};