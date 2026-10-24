/* iGo – lõi ứng dụng: trạng thái, điều hướng, hành động */
const KEY = 'igo.v5';
const today = ymd(new Date());

function seed() {
  return {
    role: 'renter', user: null, verified: false,
    bikes: JSON.parse(JSON.stringify(SEED_BIKES)),
    bookings: [], ownerOrders: JSON.parse(JSON.stringify(SEED_OWNER_ORDERS)), fav: [],
    notifs: [
      { id: 1, t: 'Chào mừng đến với iGo', d: 'Thuê xe máy dễ dàng, an toàn và minh bạch.', ic: 'bell', un: true },
      { id: 2, t: 'Giảm 20% cho thuê xe ngày', d: 'Áp dụng đến hết 31/12 cho đơn từ 3 ngày.', ic: 'tag', un: true },
      { id: 3, t: 'Cập nhật chính sách', d: 'Chính sách hủy đơn mới đã có hiệu lực.', ic: 'doc', un: false }
    ],
    chat: {
      support: [{ me: 0, t: 'Xin chào! iGo có thể giúp gì cho bạn?', at: '09:00' }],
      owner: [{ me: 0, t: 'Chào bạn, xe sẵn sàng nhé. Bạn cần hỗ trợ gì không?', at: '09:05' }]
    },
    settings: { push: true, email: false, sound: true }
  };
}
function load() { try { const j = JSON.parse(localStorage.getItem(KEY)); if (j && j.bikes) return j; } catch (e) {} return seed(); }
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Bộ nhớ đầy – hãy dùng ảnh nhỏ hơn'); } }

/* trạng thái tạm (không lưu) */
const U = { area: '', f: {}, q: '', type: 'Tất cả', sort: 'best', maxP: 150000, rt: 0, ot: 0, bk: null, pd: null, ids: {}, cal: null, faq: -1 };

const $ = s => stack.length ? stack[stack.length - 1].el.querySelector(s) : null;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const bikeOf = id => S.bikes.find(b => b.id === id);
const nowT = () => { const d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };

/* ---------- điều hướng ---------- */
const stack = [];
const appEl = document.getElementById('app');
function mk(name, params) {
  const el = document.createElement('section');
  el.className = 'screen';
  el.innerHTML = SC[name](params || {});
  return el;
}
function hook(name, el, params) { if (SC_AFTER[name]) SC_AFTER[name](el, params || {}); }
function go(name, params) {
  const cur = stack[stack.length - 1];
  const el = mk(name, params);
  el.classList.add('enter');
  appEl.appendChild(el);
  stack.push({ name, params: params || {}, el });
  void el.offsetWidth;
  el.classList.remove('enter');
  if (cur) { cur.el.classList.add('leave'); setTimeout(() => { if (stack[stack.length - 1].el !== cur.el) cur.el.style.visibility = 'hidden'; }, 340); }
  hook(name, el, params);
}
function back() {
  if (stack.length < 2) return;
  const cur = stack.pop(), prev = stack[stack.length - 1];
  prev.el.style.visibility = '';
  void prev.el.offsetWidth;
  prev.el.classList.remove('leave');
  cur.el.classList.add('out');
  setTimeout(() => cur.el.remove(), 340);
}
function root(name, params) {
  const old = stack.splice(0, stack.length);
  const el = mk(name, params);
  el.classList.add('fade');
  appEl.appendChild(el);
  stack.push({ name, params: params || {}, el });
  void el.offsetWidth;
  el.classList.remove('fade');
  setTimeout(() => old.forEach(o => o.el.remove()), 260);
  hook(name, el, params);
}
function refresh() {
  const t = stack[stack.length - 1]; if (!t) return;
  const b = t.el.querySelector('.body, .msgs'), y = b ? b.scrollTop : 0;
  t.el.innerHTML = SC[t.name](t.params);
  const nb = t.el.querySelector('.body, .msgs'); if (nb) nb.scrollTop = y;
  hook(t.name, t.el, t.params);
}

/* ---------- toast & sheet ---------- */
let tt;
function toast(m) { const e = document.getElementById('toast'); e.textContent = m; e.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => e.classList.remove('on'), 2200); }
const sheetEl = document.getElementById('sheet');
function openSheet(html) { sheetEl.innerHTML = `<div class="sheet">${html}</div>`; sheetEl.classList.add('on'); }
function closeSheet() { sheetEl.classList.remove('on'); }
sheetEl.addEventListener('click', e => { if (e.target === sheetEl) closeSheet(); });

/* ---------- tiện ích nghiệp vụ ---------- */
function notify(t, d, ic = 'bell') { S.notifs.unshift({ id: Date.now() + Math.random(), t, d, ic, un: true }); }
function quote(bk, bike) {
  const base = bike.price * bk.days;
  const disc = bk.days >= 7 ? 0.055 : bk.days >= 3 ? 0.04 : 0;
  const rent = Math.round(base * (1 - disc) / 1000) * 1000;
  const ship = bk.method === 'deliver' ? (bk.dist === 'far' ? 60000 : 40000) : 0;
  return { base, disc, rent, ship, total: rent + ship };
}
function dayOk(bike, d, method) {
  if (!bike.avail) return true;
  const m = bike.avail[d];
  return !!m && m !== 'off' && (m === 'both' || m === method);
}
function newCode() { return '#IGO' + String(Math.floor(10000 + Math.random() * 89999)); }

function readImg(file, cb, max = 640) {
  const r = new FileReader();
  r.onload = () => {
    const im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.width, im.height));
      const c = document.createElement('canvas'); c.width = im.width * k; c.height = im.height * k;
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      cb(c.toDataURL('image/jpeg', 0.7));
    };
    im.src = r.result;
  };
  r.readAsDataURL(file);
}

/* ---------- hành động ---------- */
const A = {
  back,
  tab: d => root(d.n),
  open: d => go(d.n, d.p ? JSON.parse(d.p) : {}),
  sheetclose: closeSheet,
  role() {
    S.role = S.role === 'owner' ? 'renter' : 'owner'; save();
    toast(S.role === 'owner' ? 'Đã chuyển sang Chủ xe' : 'Đã chuyển sang Người thuê');
    root(S.role === 'owner' ? 'o_home' : 'home');
  },
  /* xác thực */
  rrole: d => { U.f.rrole = d.v; refresh(); },
  register() {
    const f = readForm(['name', 'phone', 'email', 'pw']);
    if (!f.name) return toast('Vui lòng nhập họ và tên');
    if (!/^\+?\d{9,12}$/.test(f.phone.replace(/\s/g, ''))) return toast('Số điện thoại chưa hợp lệ');
    if (f.pw.length < 6) return toast('Mật khẩu tối thiểu 6 ký tự');
    if (!U.f.terms) return toast('Hãy đồng ý Điều khoản & Chính sách');
    U.pend = { name: f.name, phone: f.phone, email: f.email, role: U.f.rrole === 'owner' ? 'owner' : 'renter' };
    go('otp');
  },
  terms() { U.f.terms = !U.f.terms; refresh(); },
  remember() { U.f.rem = U.f.rem === false; refresh(); },
  resend() { toast('Đã gửi lại mã (demo: nhập 6 số bất kỳ)'); },
  login() {
    const f = readForm(['phone', 'pw']);
    if (f.phone.replace(/\D/g, '').length < 9) return toast('Số điện thoại / email chưa hợp lệ');
    if (f.pw.length < 6) return toast('Mật khẩu tối thiểu 6 ký tự');
    if (!S.user) S.user = { name: 'Nguyễn Mai Anh', phone: f.phone, email: 'maianh@gmail.com' };
    save(); toast('Đăng nhập thành công'); root(S.role === 'owner' ? 'o_home' : 'home');
  },
  social(d) {
    if (!S.user) S.user = { name: 'Nguyễn Mai Anh', phone: '+84 987 654 321', email: 'maianh@gmail.com' };
    save(); toast('Đăng nhập bằng ' + d.v); root(S.role === 'owner' ? 'o_home' : 'home');
  },
  logout() {
    if (!confirm('Đăng xuất khỏi iGo?')) return;
    S.user = null; save(); root('welcome');
  },
  /* tìm kiếm & lọc */
  type: d => { U.type = d.v; refresh(); },
  quick: d => { U.type = d.v; U.q = ''; U.area = ''; go('search'); },
  filter() {
    const sorts = [['best', 'Phù hợp nhất'], ['asc', 'Giá thấp → cao'], ['desc', 'Giá cao → thấp'], ['rate', 'Đánh giá cao']];
    openSheet(`<h3>Lọc & sắp xếp</h3><div class="b sm-t mu" style="margin-bottom:8px">Sắp xếp</div>
      <div class="chips" style="flex-wrap:wrap;margin-bottom:16px">${sorts.map(([k, l]) => `<button class="chip ${U.sort === k ? 'on' : ''}" data-a="sort" data-v="${k}">${l}</button>`).join('')}</div>
      <div class="row"><span class="b sm-t mu">Giá tối đa / ngày</span><span class="sp"></span><b class="pr" id="mp">${fmt(U.maxP)}</b></div>
      <input type="range" min="99000" max="150000" step="1000" value="${U.maxP}" data-in="maxP">
      <div class="row" style="margin-top:14px"><button class="btn g" data-a="fclear">Đặt lại</button><button class="btn" data-a="sheetclose">Áp dụng</button></div>`);
  },
  sort(d) { U.sort = d.v; A.filter(); refreshRes(); },
  fclear() { U.area = ''; U.sort = 'best'; U.maxP = 150000; U.type = 'Tất cả'; closeSheet(); refresh(); },
  fav(d, ev) {
    ev && ev.stopPropagation();
    const i = S.fav.indexOf(d.id); i < 0 ? S.fav.push(d.id) : S.fav.splice(i, 1); save(); refresh();
  },
  /* đặt thuê */
  book(d) {
    U.bk = { bikeId: d.id, days: 1, start: today, time: '10:00', rtime: '17:00', method: 'self', dist: 'near', address: 'Quận 1, TP. Hồ Chí Minh', pay: S.defPay || 'momo' };
    const b = bikeOf(d.id);
    if (b.self === false) U.bk.method = 'deliver';
    go('duration');
  },
  days(d) { U.bk.days = +d.v; refresh(); },
  daysn(d) { U.bk.days = Math.min(90, Math.max(1, U.bk.days + +d.v)); refresh(); },
  dist(d) { U.bk.dist = d.v; refresh(); },
  method(d) { U.bk.method = d.v; refresh(); },
  pay(d) { U.bk.pay = d.v; refresh(); },
  toPickup() { go('pickup'); },
  toDate() {
    if (U.bk.method === 'deliver') { const a = ($('#addr') || {}).value; if (!a || !a.trim()) return toast('Nhập địa chỉ giao xe'); U.bk.address = a.trim(); }
    const s = parseYmd(U.bk.start); U.cal = { y: s.getFullYear(), m: s.getMonth() };
    go('datetime');
  },
  calnav(d) { let { y, m } = U.cal; m += +d.n; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } U.cal = { y, m }; refresh(); },
  day(d) {
    const bike = bikeOf(U.bk.bikeId);
    for (let i = 0; i < U.bk.days; i++) if (!dayOk(bike, addDays(d.d, i), U.bk.method)) return toast('Xe không rảnh trong khoảng ngày này');
    U.bk.start = d.d; refresh();
  },
  times() { U.bk.time = $('#t1').value; U.bk.rtime = $('#t2').value; go('confirm'); },
  edit() { go('duration'); },
  async payNow() {
    openSheet(`<div style="text-align:center;padding:24px 0"><div class="spin"></div><b>Đang xử lý thanh toán…</b><div class="mu sm-t" style="margin-top:4px">Vui lòng không đóng ứng dụng</div></div>`);
    await new Promise(r => setTimeout(r, 1400));
    const bk = U.bk, bike = bikeOf(bk.bikeId), q = quote(bk, bike);
    const b = { id: 'r' + Date.now(), code: newCode(), bikeId: bk.bikeId, days: bk.days, start: bk.start, end: addDays(bk.start, bk.days - 1), time: bk.time, rtime: bk.rtime, method: bk.method, dist: bk.dist, address: bk.address, pay: bk.pay, total: q.total, status: 0, rated: false, at: Date.now() };
    S.bookings.unshift(b);
    if (bike.mine) S.ownerOrders.unshift({ id: 'o' + Date.now(), bid: b.id, bike: bike.name, color: bike.color, renter: S.user ? S.user.name : 'Khách', from: b.start, to: b.end, price: b.total, status: 'pending', photo: bike.photos[0] });
    notify('Đặt thuê thành công', `Đơn ${b.code} – ${bike.name} đã được ghi nhận.`, 'check');
    save(); closeSheet(); go('success', { id: b.id });
  },
  adv(d) {
    const b = S.bookings.find(x => x.id === d.id); if (!b || b.status >= 2) return;
    b.status++; notify('Cập nhật đơn ' + b.code, STATUS[b.status], 'orders'); save(); refresh();
  },
  cancel(d) { U.f.reason = ''; go('cancel', { id: d.id }); },
  reason(d) { U.f.reason = d.v; refresh(); },
  cancelok(d) {
    const b = S.bookings.find(x => x.id === d.id); if (!b) return;
    if (!U.f.reason) return toast('Vui lòng chọn lý do hủy đơn');
    b.cancel = true; b.reason = U.f.reason === 'Lý do khác' ? (($('#rsn') || {}).value || 'Lý do khác') : U.f.reason; b.cancelAt = Date.now();
    S.ownerOrders.forEach(o => { if (o.bid === b.id) o.status = 'cancel'; });
    notify('Đã hủy đơn ' + b.code, b.pay === 'cash' ? 'Đơn thuê đã được hủy thành công.' : 'Đơn đã hủy. Tiền sẽ được hoàn lại trong 1–3 ngày làm việc.', 'bell');
    save(); toast('Đã hủy đơn ' + b.code); back(); refresh();
  },
  picked(d) { const b = S.bookings.find(x => x.id === d.id); b.status = 3; notify('Đã nhận xe', 'Chúc bạn có chuyến đi an toàn!', 'check'); save(); toast('Đã xác nhận nhận xe'); back(); refresh(); },
  returned(d) { const b = S.bookings.find(x => x.id === d.id); b.status = 4; notify('Đã trả xe', 'Hãy đánh giá chuyến đi của bạn.', 'star'); save(); go('rate', { id: d.id }); },
  star(d) { U.f.stars = +d.v; refresh(); },
  rate(d) {
    const b = S.bookings.find(x => x.id === d.id), n = U.f.stars || 5;
    b.rated = true; b.stars = n; b.review = ($('#rv') || {}).value || ''; save();
    toast('Cảm ơn bạn đã đánh giá!'); U.f.stars = 0; root('rentals');
  },
  rt: d => { U.rt = +d.v; refresh(); },
  rebook: d => A.book({ id: d.id }),
  /* chat */
  send() {
    const inp = $('#cin'), who = stack[stack.length - 1].params.who || 'support', t = inp.value.trim(); if (!t) return;
    S.chat[who].push({ me: 1, t, at: nowT() }); inp.value = ''; save(); drawMsgs();
    const rep = ['Cảm ơn bạn, mình đã nhận được tin nhắn.', 'Mình sẽ phản hồi ngay trong ít phút nhé!', 'Bạn có thể gửi thêm thông tin chi tiết để mình hỗ trợ tốt hơn.'];
    setTimeout(() => { S.chat[who].push({ me: 0, t: rep[Math.floor(Math.random() * rep.length)], at: nowT() }); save(); drawMsgs(); }, 900);
  },
  faq(d) { U.faq = U.faq === +d.v ? -1 : +d.v; refresh(); },
  readall() { S.notifs.forEach(n => n.un = false); save(); refresh(); },
  readn(d) { const n = S.notifs.find(x => x.id == d.id); if (n) n.un = false; save(); refresh(); },
  setting(d) { S.settings[d.k] = !S.settings[d.k]; save(); refresh(); },
  infosave() {
    const f = readForm(['iname', 'iphone', 'iemail']);
    if (!f.iname) return toast('Vui lòng nhập họ và tên');
    if (!/^\+?\d{9,12}$/.test(f.iphone.replace(/\s/g, ''))) return toast('Số điện thoại chưa hợp lệ');
    if (f.iemail && !/^\S+@\S+\.\S+$/.test(f.iemail)) return toast('Email chưa hợp lệ');
    S.user = { name: f.iname, phone: f.iphone, email: f.iemail }; save(); toast('Đã lưu thông tin'); back(); refresh();
  },
  defpay(d) { S.defPay = d.v; save(); refresh(); },
  licsample() { U.ids.lfront = U.ids.lback = 'svg'; U.f.lno = U.f.lno || '790123456789'; refresh(); },
  async licok(d) {
    const no = (readForm(['lno']).lno || '').replace(/\s/g, '');
    if (!/^\d{9,12}$/.test(no)) return toast('Số GPLX gồm 9–12 chữ số');
    if (!(U.ids.lfront && U.ids.lback)) return toast('Cần ảnh mặt trước và mặt sau bằng lái');
    openSheet(`<div style="text-align:center;padding:24px 0"><div class="spin"></div><b>Đang xác thực bằng lái…</b></div>`);
    await new Promise(r => setTimeout(r, 1300));
    S.license = { no, cls: $('#lcls').value }; save(); closeSheet(); toast('Đã xác nhận bằng lái xe');
    if (d.next) { stack.pop().el.remove(); const t = stack[stack.length - 1]; t.el.style.visibility = ''; t.el.classList.remove('leave'); go('pay'); } else { back(); refresh(); }
  },
  toPay() { if (!S.license && !featOf(bikeOf(U.bk.bikeId)).nolicense) { toast('Cần xác nhận bằng lái xe trước khi thanh toán'); return go('license', { next: 1 }); } go('pay'); },
  soon: () => toast('Tính năng sẽ sớm có mặt'),
  /* ---- chủ xe ---- */
  post() {
    if (!S.user) return root('welcome');
    if (!S.verified) return go('o_verify', { next: 1 });
    U.f.pname = U.f.pplate = U.f.pcond = null;
    U.pd = { name: '', type: 'Xe số', plate: '', year: '2022', cc: '110cc', cond: '', photos: [], self: true, deliver: false, avail: {}, brush: 'self', price: 99000, area: '', addr: '', openT: '07:00', closeT: '21:00', deposit: 0, feat: Object.assign({}, FEAT_DEF), extra: [], dist: 'Quận 1', prov: 'TP. Hồ Chí Minh', desc: '' };
    go('o_info');
  },
  idtype(d) { U.f.idt = d.v; refresh(); },
  idsample() { ['front', 'back', 'selfie'].forEach(k => U.ids[k] = 'svg'); refresh(); },
  async idnext(d) {
    if (!(U.ids.front && U.ids.back && U.ids.selfie)) return toast('Cần đủ ảnh mặt trước, mặt sau và selfie');
    openSheet(`<div style="text-align:center;padding:24px 0"><div class="spin"></div><b>Hệ thống đang xác thực…</b></div>`);
    await new Promise(r => setTimeout(r, 1500));
    S.verified = true; save(); closeSheet(); toast('Xác minh thành công!');
    if (d.next) { stack.pop().el.remove(); stack[stack.length - 1].el.style.visibility = ''; stack[stack.length - 1].el.classList.remove('leave'); A.post(); } else root('o_home');
  },
  photosample() { while (U.pd.photos.length < 3) U.pd.photos.push('svg:' + COLORS[U.pd.photos.length * 2 % COLORS.length]); refresh(); },
  rmphoto(d, ev) { ev && ev.stopPropagation(); U.pd.photos.splice(+d.i, 1); refresh(); },
  infoNext() {
    const rf = readForm(['pname', 'pplate', 'pcond']), f = { name: rf.pname, plate: rf.pplate, cond: rf.pcond }; Object.assign(U.pd, f, { type: $('#ptype').value, year: $('#pyear').value });
    if (!f.name) return toast('Nhập tên xe (VD: Honda Wave 110)');
    if (!f.plate) return toast('Nhập biển số xe');
    if (U.pd.photos.length < 3) return toast('Cần ít nhất 3 ảnh xe');
    U.pd.price = U.pd.price || PRICE_RANGE[U.pd.type][0];
    go('o_method');
  },
  pm(d) { U.pd[d.k] = !U.pd[d.k]; refresh(); },
  methodNext() {
    if (!U.pd.self && !U.pd.deliver) return toast('Chọn ít nhất 1 hình thức cho thuê');
    U.pd.brush = U.pd.self && U.pd.deliver ? 'both' : U.pd.self ? 'self' : 'deliver';
    const n = new Date(); U.cal = { y: n.getFullYear(), m: n.getMonth() }; go('o_calendar');
  },
  brush(d) { U.pd.brush = d.v; refresh(); },
  pday(d) { const a = U.pd.avail; if (U.pd.brush === 'off') delete a[d.d]; else a[d.d] = U.pd.brush; refresh(); },
  fill(d) {
    const { y, m } = U.cal, n = new Date(y, m + 1, 0).getDate(), a = U.pd.avail;
    for (let i = 1; i <= n; i++) {
      const s = `${y}-${pad(m + 1)}-${pad(i)}`, w = new Date(y, m, i).getDay();
      if (s < today) continue;
      const hit = d.v === 'all' || (d.v === 'wd' && w >= 1 && w <= 5) || (d.v === 'we' && (w === 0 || w === 6));
      if (hit) { if (U.pd.brush === 'off') delete a[s]; else a[s] = U.pd.brush; }
    }
    refresh();
  },
  calNext() { if (!Object.keys(U.pd.avail).length) return toast('Chọn ít nhất 1 ngày cho thuê'); go('o_price'); },
  ppr(d) { const el = $('#pr'); U.pd.price = +el.value; $('#prv').textContent = fmt(U.pd.price); },
  pstep(d) { U.pd.price = Math.max(10000, (U.pd.price || 0) + +d.v); refresh(); },
  priceNext() { if (!(U.pd.price >= 10000)) return toast('Giá thuê tối thiểu 10.000đ'); U.pd.prov = $('#pprov').value; U.pd.dist = ($('#parea').value || '').trim(); U.pd.area = (U.pd.dist ? U.pd.dist + ', ' : '') + U.pd.prov; U.pd.desc = $('#pdesc').value.trim(); U.pd.addr = ($('#paddr').value || '').trim(); go('o_feat'); },
  addextra() { const v = ($('#pextra').value || '').trim(); if (!v) return toast('Nhập tên tiện nghi'); if (U.pd.extra.length >= 8) return toast('Tối đa 8 tiện nghi khác'); U.pd.extra.push(v); refresh(); },
  rmextra(d) { U.pd.extra.splice(+d.i, 1); refresh(); },
  pf(d) { U.pd.feat[d.k] = !U.pd.feat[d.k]; refresh(); },
  pdep(d) { U.pd.deposit = +d.v; refresh(); },
  featNext() { U.pd.openT = $('#popen').value; U.pd.closeT = $('#pclose').value; if (U.pd.closeT <= U.pd.openT) return toast('Giờ trả muộn nhất phải sau giờ nhận xe'); go('o_contract'); },
  agree() { U.f.agree = !U.f.agree; refresh(); },
  publish() {
    if (!U.f.agree) return toast('Hãy xác nhận đã đọc và đồng ý điều khoản');
    const p = U.pd;
    S.bikes.unshift({ id: 'm' + Date.now(), name: p.name, type: p.type, price: p.price, rating: 0, reviews: 0, plate: p.plate, year: +p.year, cc: p.cc, cond: p.cond || 'Hoạt động ổn định', area: p.area, addr: p.addr, openT: p.openT, closeT: p.closeT, deposit: p.deposit, feat: p.feat, extra: p.extra, owner: S.user.name, color: COLORS[Math.floor(Math.random() * COLORS.length)], photos: p.photos, avail: p.avail, self: p.self, deliver: p.deliver, desc: p.desc, mine: true, on: true });
    notify('Đăng bài thành công', `${p.name} đã hiển thị cho khách thuê.`, 'check');
    U.f.agree = false; save(); go('o_done');
  },
  bikeon(d) { const b = bikeOf(d.id); b.on = !b.on; save(); toast(b.on ? 'Đã hiện bài đăng' : 'Đã ẩn bài đăng'); refresh(); },
  bikedel(d) { if (!confirm('Xóa bài đăng này?')) return; S.bikes = S.bikes.filter(b => b.id !== d.id); save(); refresh(); },
  ot: d => { U.ot = +d.v; refresh(); },
  oact(d) {
    const o = S.ownerOrders.find(x => x.id === d.id);
    o.status = d.s; save();
    toast(d.s === 'active' ? 'Đã xác nhận đơn' : d.s === 'done' ? 'Đơn đã hoàn tất' : 'Đã từ chối đơn'); refresh();
  }
};

function readForm(keys) {
  const o = {}; keys.forEach(k => { const e = $('[data-f="' + k + '"]'); o[k] = e ? e.value.trim() : ''; U.f[k] = o[k]; }); return o;
}
function drawMsgs() {
  const m = $('.msgs'); if (!m) return;
  const who = stack[stack.length - 1].params.who || 'support';
  m.innerHTML = msgHtml(S.chat[who]); m.scrollTop = m.scrollHeight;
}
function refreshRes() { const r = $('#res'); if (r) r.innerHTML = resHtml(); }

/* ---------- sự kiện ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-a]'); if (!t) return;
  const fn = A[t.dataset.a]; if (fn) fn(t.dataset, e);
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'ptype') U.pd.type = t.value; else if (t.id === 'pyear') U.pd.year = t.value;
  if (t.dataset.in === 'q') { U.q = t.value; refreshRes(); }
  else if (t.dataset.in === 'area') { U.area = t.value; refreshRes(); }
  else if (t.dataset.in === 'maxP') { U.maxP = +t.value; document.getElementById('mp').textContent = fmt(U.maxP); refreshRes(); }
  else if (t.dataset.in === 'pr') { U.pd.price = +t.value; document.getElementById('prv').textContent = fmt(U.pd.price || 0); }
  else if (t.dataset.f) U.f[t.dataset.f] = t.value;
});
document.addEventListener('change', e => {
  const t = e.target; if (!t.dataset.up || !t.files[0]) return;
  const k = t.dataset.up;
  readImg(t.files[0], url => {
    if (k === 'photo') { if (U.pd.photos.length >= 6) return toast('Tối đa 6 ảnh'); U.pd.photos.push(url); } else U.ids[k] = url;
    refresh();
  }, k === 'photo' ? 640 : 480);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'cin') A.send();
  if (e.key === 'Escape') closeSheet();
});
document.getElementById('reset').onclick = () => { if (confirm('Xóa toàn bộ dữ liệu demo?')) { localStorage.removeItem(KEY); location.reload(); } };
setInterval(() => { document.getElementById('clock').textContent = nowT(); }, 30000);
document.getElementById('clock').textContent = nowT();

window.addEventListener('load', () => {
  if (!S.user) root('welcome'); else root(S.role === 'owner' ? 'o_home' : 'home');
});
