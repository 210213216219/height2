import heights from "./height2.json";
import mstns from "../../equine-mstn-list/resources/mstn.json"

let total = heights.length;
let css = (await Bun.file("main4.css").text()).replaceAll(/\n| {2}|\s(?={)|(?<=\:)\s/g, "");
let html = (await Bun.file("main.htm").text()).replaceAll(/\n/g, "").replaceAll("$total", total).replace("/*css*/", css).replace("/*js*/", "");
let mstning =v=> v && (v = v.mstn) ? v == "CC" ? " b" : v == "CT" ? " c" : " d" : "";
let mstn = mstns.map(v => v[0]);
let hrefing =(href, name)=> `<a href=${href.slice(href[12] == "j" ? -11 : 6)}${mstning(mstn.find(v => v.name == name))}>`;

let heightHTML = html + "HEIGHT  / <a href=//ariamaranai.github.io/equine-height-list/weight/ target=_parent>WEIGHT</a>  / <a href=//ariamaranai.github.io/equine-height-list/bmi/ target=_parent>BMI</a>  / <a href=//ariamaranai.github.io/>@ariamaranai</a>";

for (let i = 0, h = 155; i < heights.length; ++i) {
  let item = heights[i];
  {
    let {name: name, year: year, cnty: cnty, href: href,
         hh: hh, wt: wt, bmi: bmi, trust: trust
        } = item[0];
    bmi && (item[0].bmi = wt ? (wt / ((hh / 100) ** 2)) + .05 : 0);
    wt = (trust ? `<i>${hh}\u000a${wt}</i>` : `<i>${hh}\u000a${wt}</i>`);
    heightHTML += `<p${h != hh ? " a" : ""}>${hrefing(href, name)}${wt}<b>${name}\u000a2002.JPN</b>\u0009152.3`;
    h = hh;
  }//<s>${bmi ? bmi.toFixed(1) : 0}</s>
  {
    let {name: name, year: year, cnty: cnty, href: href,
      hh: hh, wt: wt, bmi: bmi, trust: trust
     } = item[1];
     bmi && (item[0].bmi = wt ? (wt / ((hh / 100) ** 2)) + .05 : 0);
    wt = (trust ? `<i>${hh}\u000a${wt}</i>` : `<i>${hh}\u000a${wt}</i>`);
    heightHTML += `${hrefing(href, name)}${wt}<b>${name}\u000a2002.JPN</b>\u0009162.4`;
  }
  {
    let {name: name, year: year, cnty: cnty, href: href,
      hh: hh, wt: wt, bmi: bmi, trust: trust
     } = item[2];
     bmi && (item[0].bmi = wt ? (wt / ((hh / 100) ** 2)) + .05 : 0);
     wt = (trust ? `<i>${hh}\u000a${wt}</s></i>` : `<i>${hh}\u000a${wt}</i>`);
    heightHTML += `${hrefing(href, name)}${wt}<b>${name}\u000a2002.JPN</b>\u0009146.4</a>`;
  }
}

Bun.write("../index4.htm", heightHTML);
console.log(`size: ${Bun.gzipSync(Buffer.from(heightHTML)).length}`);