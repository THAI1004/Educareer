const fs = require('fs');

const html = fs.readFileSync('cauhoi/DISC-20cau.html', 'utf8');
const scriptSrcs = [];
const regex = /<script[^>]*src=["']([^"']+)["']/g;
let m;
while ((m = regex.exec(html)) !== null) {
  scriptSrcs.push(m[1]);
}
console.log('Script sources:', scriptSrcs);
