/* iGo – các màn hình */
const SC = {}, SC_AFTER = {};

/* ---------- thành phần dùng chung ---------- */
const hidden = '<span class="ib" style="visibility:hidden"></span>';
const H = (t, right = '', back = true) => `<div class="hdr">${back ? `<button class="ib" data-a="back" aria-label="Quay lại">${ico('back')}</button>` : hidden}<h1>${t}</h1>${right || hidden}</div>`;
const TABR = [['home', 'Trang chủ', 'home'], ['rentals', 'Đơn thuê', 'orders'], ['chat', 'Trò chuyện', 'chat'], ['profile', 'Tài khoản', 'user']];
const TABO = [['o_home', 'Trang chủ', 'home'], ['o_orders', 'Đơn thuê', 'orders'], ['post', 'Đăng xe', 'plus', 'plus'], ['chat', 'Tin nhắn', 'chat'], ['profile', 'Tài khoản', 'user']];
const tabbar = a => `<nav class="tabs">${(S.role === 'owner' ? TABO : TABR).map(([n, l, i, c]) =>
  c ? `<button class="plus" data-a="post"><i>${ico(i)}</i><span>${l}</span></button>`
    : `<button class="${a === n ? 'on' : ''}" data-a="tab" data-n="${n}">${ico(i)}<span>${l}</span></button>`).join('')}</nav>`;
const photo = (b, i = 0) => {
  const p = b.photos && b.photos[i];
  if (!p) return bikeSvg(b.color, b.type);
  return p.startsWith('svg:') ? bikeSvg(p.slice(4), b.type) : `<img src="${p}" alt="">`;
};
const rating = b => b.reviews ? `${ico('star', 'star')} <b>${b.rating}</b> <span class="mu sm-t">(${b.reviews})</span>` : '<span class="tag ok">Mới</span>';
const bikeCard = b => `<div class="bike-card" data-a="open" data-n="detail" data-p='{"id":"${b.id}"}'>
  <div class="im">${photo(b)}</div>
  <div class="inf"><div class="row"><h3 class="sp">${esc(b.name)}</h3><button data-a="fav" data-id="${b.id}" style="color:${S.fav.includes(b.id) ? 'var(--err)' : '#b0bccd'}">${ico('heart', S.fav.includes(b.id) ? 'f' : '')}</button></div>
  <div style="margin:3px 0">${rating(b)}</div>
  <div class="sm-t mu">${ico('pin')}`.replace('<svg class="i"', '<svg class="i" style="width:13px;height:13px;vertical-align:-2px"') + ` ${esc(b.area)}</div>
  <div class="row" style="margin-top:6px"><span class="tag">${b.type}</span><span class="sp"></span><b class="pr">${fmt(b.price)}</b><span class="mu sm-t">/ngày</span></div></div></div>`;
const optBtn = (on, act, attrs, icon, title, sub, extra = '') => `<button class="opt ${on ? 'on' : ''}" data-a="${act}" ${attrs}><span class="ico">${ico(icon)}</span><span class="t"><b>${title}</b><small>${sub}</small></span>${extra}<span class="rd">${on ? ico('check') : ''}</span></button>`;
const field = (label, key, ph = '', type = 'text', val) => `<div class="field"><label>${label}</label><input class="inp" type="${type}" data-f="${key}" placeholder="${ph}" value="${esc(val != null ? val : U.f[key] || '')}"></div>`;
const bottom = (btn) => `<div class="bottom">${btn}</div>`;
const roleSwitch = () => `<button class="chip" data-a="role" style="background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.4);color:var(--pt);font-size:12px;padding:6px 10px">⇄ ${S.role === 'owner' ? 'Người thuê' : 'Chủ xe'}</button>`;
const statusTag = b => b.cancel ? '<span class="tag e">Đã hủy</span>' : b.status === 4 ? '<span class="tag ok">Đã hoàn thành</span>' : b.status === 3 ? '<span class="tag">Đang thuê</span>' : '<span class="tag w">Chờ nhận xe</span>';
const empty = (ic, t) => `<div class="empty">${ico(ic)}<div>${t}</div></div>`;

function calHtml(cls, act) {
  const { y, m } = U.cal, off = (new Date(y, m, 1).getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
  let g = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(w => `<div class="dw">${w}</div>`).join('') + '<div></div>'.repeat(off);
  for (let i = 1; i <= n; i++) { const s = `${y}-${pad(m + 1)}-${pad(i)}`; g += `<button class="d ${cls(s)}" data-a="${act}" data-d="${s}">${i}</button>`; }
  return `<div class="cal"><div class="ch"><button class="ib" data-a="calnav" data-n="-1">${ico('back')}</button>Tháng ${m + 1}/${y}<button class="ib" data-a="calnav" data-n="1">${ico('next')}</button></div><div class="g">${g}</div></div>`;
}

/* ---------- xác thực ---------- */
SC.welcome = () => `<div class="hero"><div class="mt"></div><div class="bk">${bikeSvg('#e5484d', 'Xe ga', false)}</div>
  <div class="lg"><b>iGo</b><p>Thuê xe máy, dễ dàng<br><small style="font-weight:500;opacity:.9">An toàn · Minh bạch · Linh hoạt</small></p></div>
  <button class="btn" data-a="open" data-n="register">Đăng ký</button>
  <button class="btn o" data-a="open" data-n="login" style="margin-bottom:14px">Đăng nhập</button>
  <div class="sm-t" style="text-align:center;margin-bottom:8px;color:#35507a">Hoặc tiếp tục với</div>
  <div class="soc"><button data-a="social" data-v="Google"><b style="color:#ea4335">G</b> Google</button><button data-a="social" data-v="Apple"> Apple</button></div></div>`;

SC.register = () => `${H('Đăng ký tài khoản')}<div class="body">
  <div class="seg"><button class="${U.f.rrole !== 'owner' ? 'on' : ''}" data-a="rrole" data-v="renter">Khách thuê</button><button class="${U.f.rrole === 'owner' ? 'on' : ''}" data-a="rrole" data-v="owner">Chủ xe</button></div>
  ${field('Họ và tên', 'name', 'Nguyễn Mai Anh')}${field('Số điện thoại', 'phone', '+84 987 654 321', 'tel')}${field('Email (không bắt buộc)', 'email', 'maianh@gmail.com', 'email')}${field('Mật khẩu', 'pw', 'Tối thiểu 6 ký tự', 'password')}
  <button class="chk ${U.f.terms ? 'on' : ''}" data-a="terms"><span class="bx">${ico('check')}</span><span>Tôi đồng ý với <b class="pr">Điều khoản</b> & <b class="pr">Chính sách</b></span></button>
  <button class="btn" data-a="register" style="margin-top:10px">Đăng ký</button>
  <p class="sm-t mu" style="text-align:center;margin-top:14px">Đã có tài khoản? <b class="pr" data-a="open" data-n="login">Đăng nhập</b></p></div>`;

SC.otp = () => `${H('Xác thực mã OTP')}<div class="body"><p class="mu" style="text-align:center;margin-top:10px;font-size:14px">Vui lòng nhập mã xác thực được gửi<br>về số điện thoại <b>${esc(U.pend ? U.pend.phone : '')}</b><br><small>(Demo: nhập 6 chữ số bất kỳ)</small></p>
  <div class="otp">${[0, 1, 2, 3, 4, 5].map(i => `<input inputmode="numeric" maxlength="1" data-o="${i}">`).join('')}</div>
  <p class="sm-t mu" style="text-align:center" id="cd">Gửi lại mã (00:45)</p></div>`;
SC_AFTER.otp = el => {
  const ins = [...el.querySelectorAll('[data-o]')], cd = el.querySelector('#cd'); let s = 45;
  const iv = setInterval(() => { if (!el.isConnected) return clearInterval(iv); s--; cd.innerHTML = s > 0 ? `Gửi lại mã (00:${pad(s)})` : '<b class="pr" data-a="resend">Gửi lại mã</b>'; if (s <= 0) clearInterval(iv); }, 1000);
  ins.forEach((inp, i) => {
    inp.oninput = () => {
      inp.value = inp.value.replace(/\D/g, '');
      if (inp.value && ins[i + 1]) ins[i + 1].focus();
      if (ins.every(x => x.value)) {
        const p = U.pend; S.user = { name: p.name, phone: p.phone, email: p.email }; S.role = p.role; save();
        toast('Xác thực thành công'); p.role === 'owner' ? root('o_verify', { first: 1 }) : root('home');
      }
    };
    inp.onkeydown = e => { if (e.key === 'Backspace' && !inp.value && ins[i - 1]) ins[i - 1].focus(); };
  });
  setTimeout(() => ins[0].focus(), 350);
};

SC.login = () => `${H('Đăng nhập')}<div class="body">
  ${field('Số điện thoại / Email', 'phone', '+84 987 654 321')}${field('Mật khẩu', 'pw', '••••••••', 'password')}
  <button class="chk ${U.f.rem !== false ? 'on' : ''}" data-a="remember"><span class="bx">${ico('check')}</span>Nhớ tài khoản</button>
  <button class="btn" data-a="login" style="margin-top:8px">Đăng nhập</button>
  <p class="pr b" style="text-align:center;margin:14px 0;font-size:14px" data-a="soon">Quên mật khẩu?</p>
  <p class="mu sm-t" style="text-align:center;margin-bottom:12px">Hoặc đăng nhập với</p>
  <div class="soc"><button data-a="social" data-v="Google"><b style="color:#ea4335">G</b> Google</button><button data-a="social" data-v="Apple"> Apple</button></div>
  <p class="sm-t mu" style="text-align:center;margin-top:18px">Chưa có tài khoản? <b class="pr" data-a="open" data-n="register">Đăng ký</b></p></div>`;

/* ---------- người thuê ---------- */
SC.home = () => {
  const top = [...S.bikes].filter(b => b.on).sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  const unread = S.notifs.some(n => n.un);
  return `<div class="body tabpad"><div class="hbar"><div class="row"><div class="sp"><div style="font-size:12px;opacity:.85">Xin chào,</div><b style="font-size:18px">${esc(S.user ? S.user.name : 'Bạn')} 👋</b></div>${roleSwitch()}<button class="ib" data-a="open" data-n="notifs" style="margin-left:6px;color:var(--navy)">${ico('bell')}${unread ? '<i class="dot"></i>' : ''}</button></div>
  <div class="sbox" data-a="open" data-n="search">${ico('search')}<span>Tìm xe, địa điểm, loại xe…</span></div></div>
  <div class="promo"><div class="sp"><div style="font-size:12px;opacity:.8">Ưu đãi hôm nay</div><b>Giảm 20% cho thuê xe ngày</b><div style="font-size:12px;opacity:.8">Áp dụng đến 31/12</div></div><div style="width:90px;flex:none">${bikeSvg('#ff8a3d', 'Xe ga', false)}</div></div>
  <div class="cats">${[['Xe máy', 'Tất cả', 'home'], ['Xe số', 'Xe số', 'gear'], ['Xe ga', 'Xe ga', 'bike'], ['Xe côn tay', 'Xe côn tay', 'bolt']].map(([l, v], i) => `<button data-a="quick" data-v="${v}"><span class="c">${i === 0 ? ico('search') : `<span style="font-size:22px">🏍️</span>`}</span>${l}</button>`).join('')}</div>
  <h2 class="sec">Xe được thuê nhiều <a data-a="open" data-n="search">Xem tất cả</a></h2>${top.map(bikeCard).join('')}</div>${tabbar('home')}`;
};

const areas = () => [...new Set(S.bikes.filter(b => b.on).map(b => b.area.split(',')[0].trim()))].sort();
function filtered() {
  const q = U.q.trim().toLowerCase();
  let r = S.bikes.filter(b => b.on && (U.type === 'Tất cả' || b.type === U.type) && (!U.area || norm(b.area).includes(norm(U.area))) && b.price <= U.maxP && (!q || norm(b.name + ' ' + b.area + ' ' + b.type).includes(norm(q))));
  const k = U.sort; if (k === 'asc') r.sort((a, b) => a.price - b.price); if (k === 'desc') r.sort((a, b) => b.price - a.price); if (k === 'rate') r.sort((a, b) => b.rating - a.rating);
  return r;
}
const resHtml = () => { const r = filtered(); return `<h2 class="sec" style="margin-top:6px">Kết quả tìm kiếm <span class="mu sm-t" style="font-weight:500">(${r.length} xe)</span></h2>` + (r.length ? r.map(bikeCard).join('') : empty('search', 'Không tìm thấy xe phù hợp')); };
SC.search = () => `${H('Tìm kiếm xe', `<button class="ib" data-a="filter">${ico('filter')}</button>`)}<div class="body">
  <div class="sbox" style="border:1.5px solid var(--ln)">${ico('search')}<input data-in="q" placeholder="Tên xe, khu vực…" value="${esc(U.q)}"></div>
  <div class="field" style="margin:10px 0 0"><label>Địa điểm (34 tỉnh, thành phố)</label><input class="inp" list="provs" data-in="area" placeholder="Nhập tỉnh / thành phố…" value="${esc(U.area)}" autocomplete="off"><datalist id="provs">${PROVINCES.map(p => `<option value="${p}">`).join('')}</datalist></div>
  <div class="chips" style="margin:12px 0">${['Tất cả', 'Xe số', 'Xe ga', 'Xe côn tay'].map(t => `<button class="chip ${U.type === t ? 'on' : ''}" data-a="type" data-v="${t}">${t}</button>`).join('')}</div>
  <div class="promo" style="background:#fff3df;color:var(--tx);background-image:none"><div class="sp"><b>Gợi ý cho bạn</b><div class="sm-t mu">Xe hot · Giá tốt · Giao nhanh</div></div>${ico('bulb')}</div>
  <div id="res">${resHtml()}</div></div>`;

SC.detail = p => {
  const b = bikeOf(p.id); if (!b) return H('Không tìm thấy') + empty('search', 'Xe không còn tồn tại');
  const n = Math.max(1, (b.photos || []).length);
  return `${H('Chi tiết xe', `<button class="ib" data-a="fav" data-id="${b.id}" style="color:${S.fav.includes(b.id) ? 'var(--err)' : 'var(--mu)'}">${ico('heart', S.fav.includes(b.id) ? 'f' : '')}</button>`)}<div class="body">
  <div class="gal">${photo(b)}<span class="cnt">1/${n}</span></div>
  <div class="row"><h2 class="sp" style="font-size:20px">${esc(b.name)}</h2><span class="tag">${b.type}</span></div>
  <div style="margin:6px 0 4px">${rating(b)}</div><div class="mu sm-t">${esc(b.area)}</div>
  <div class="row" style="margin:10px 0"><b class="pr" style="font-size:24px">${fmt(b.price)}</b><span class="mu">/ngày</span></div>
  <div class="card"><h2 class="sec" style="margin:0 0 10px">Thông tin xe</h2><div class="spec"><div><span>Biển số</span>${esc(b.plate)}</div><div><span>Năm sản xuất</span>${b.year}</div><div><span>Dung tích</span>${esc(b.cc)}</div><div><span>Tình trạng</span>${esc(b.cond)}</div></div></div>
  ${b.desc ? `<div class="card"><b>Mô tả</b><p class="mu sm-t" style="margin-top:4px">${esc(b.desc)}</p></div>` : ''}
  <div class="card row"><div class="avatar" style="width:44px;height:44px;font-size:18px">${esc(b.owner[0])}</div><div class="sp"><b>${esc(b.owner)}</b><div class="sm-t mu">Chủ xe · Phản hồi nhanh</div></div><button class="ib" data-a="open" data-n="chat" data-p='{"who":"owner"}'>${ico('chat')}</button></div>
  <div class="card bd row sm-t mu">${ico('shield')}<span>Xe được bảo hiểm cơ bản, kèm 2 mũ bảo hiểm. Hủy miễn phí trước 24 giờ.</span></div></div>
  ${bottom(`<div><div class="sm-t mu">Giá từ</div><b class="pr" style="font-size:18px">${fmtK(b.price)}/ngày</b></div><button class="btn" data-a="book" data-id="${b.id}">Đặt thuê</button>`)}`;
};

SC.duration = () => {
  const bk = U.bk, b = bikeOf(bk.bikeId), q = quote({ days: bk.days, method: 'self' }, b);
  return `${H('Chọn gói thuê')}<div class="body">
  <div class="bike-card" style="cursor:default"><div class="im" style="width:80px;height:70px">${photo(b)}</div><div class="inf"><h3>${esc(b.name)}</h3><div class="mu sm-t">${esc(b.area)}</div><b class="pr">${fmt(b.price)}/ngày</b></div></div>
  <h2 class="sec">Thời gian thuê</h2>
  <div class="card" style="text-align:center"><div class="mu sm-t">Số ngày thuê (tối đa 90 ngày)</div>
  <div class="stepper"><button data-a="daysn" data-v="-1">−</button><b>${bk.days} ngày</b><button data-a="daysn" data-v="1">+</button></div>
  <div class="chips" style="justify-content:center;flex-wrap:wrap">${[1, 2, 3, 5, 7, 14, 30].map(d => `<button class="chip ${bk.days === d ? 'on' : ''}" data-a="days" data-v="${d}">${d} ngày</button>`).join('')}</div></div>
  <div class="card"><div class="sum"><span class="mu">Giá thuê</span><span>${fmt(q.base)}</span></div>${q.disc ? `<div class="sum ok"><span>Giảm giá gói (${Math.round(q.disc * 1000) / 10}%)</span><span>-${fmt(q.base - q.rent)}</span></div>` : ''}<div class="sum t"><span>Tạm tính</span><span class="pr">${fmt(q.rent)}</span></div></div>
  <div class="card bd row sm-t mu">${ico('tag')}<span>Thuê từ 3 ngày giảm 4%, từ 7 ngày giảm 5,5%. Giá chưa gồm phí giao xe (nếu có).</span></div></div>
  ${bottom('<button class="btn" data-a="toPickup">Tiếp tục</button>')}`;
};

SC.pickup = () => {
  const bk = U.bk, b = bikeOf(bk.bikeId);
  return `${H('Phương thức nhận xe')}<div class="body">
  ${b.self !== false ? optBtn(bk.method === 'self', 'method', 'data-v="self"', 'hand', 'Tự đi lấy', `Tại địa điểm của chủ xe (${esc(b.area)})`, '') : ''}
  ${b.deliver !== false ? optBtn(bk.method === 'deliver', 'method', 'data-v="deliver"', 'truck', 'Giao tận nơi', 'Chủ xe giao xe đến địa điểm của bạn · 1–3km: 40.000đ · trên 3km: 60.000đ') : ''}
  ${bk.method === 'deliver' ? `<div class="field"><label>Địa chỉ nhận xe</label><input class="inp" id="addr" value="${esc(bk.address)}" placeholder="Số nhà, đường, quận…"></div><h2 class="sec" style="margin-top:0">Khoảng cách giao xe</h2>${optBtn(bk.dist !== 'far', 'dist', 'data-v="near"', 'pin', 'Từ 1 – 3 km', 'Phí giao xe một lượt', '<b class="pr">40.000đ</b>')}${optBtn(bk.dist === 'far', 'dist', 'data-v="far"', 'pin', 'Trên 3 km', 'Phí giao xe một lượt', '<b class="pr">60.000đ</b>')}` : ''}</div>
  ${bottom('<button class="btn" data-a="toDate">Tiếp tục</button>')}`;
};

const TIMES = Array.from({ length: 33 }, (_, i) => `${pad(6 + Math.floor(i / 2))}:${i % 2 ? '30' : '00'}`);
SC.datetime = () => {
  const bk = U.bk, b = bikeOf(bk.bikeId), end = addDays(bk.start, bk.days - 1);
  const cls = s => s < today || !dayOk(b, s, bk.method) ? 'x' : s === bk.start ? 'sel' : s > bk.start && s <= end ? 'rg' : '';
  const sel = (id, v) => `<select class="inp" id="${id}">${TIMES.map(t => `<option ${t === v ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
  return `${H('Chọn ngày & giờ thuê')}<div class="body">${calHtml(cls, 'day')}
  <div class="row"><div class="field sp"><label>Giờ nhận xe</label>${sel('t1', bk.time)}</div><div class="field sp"><label>Giờ trả xe</label>${sel('t2', bk.rtime)}</div></div>
  <div class="card bd sm-t">Nhận: <b>${dmy(bk.start)} ${bk.time}</b><br>Trả: <b>${dmy(end)} ${bk.rtime}</b> (${bk.days} ngày)</div></div>
  ${bottom('<button class="btn" data-a="times">Tiếp tục</button>')}`;
};

SC.confirm = () => {
  const bk = U.bk, b = bikeOf(bk.bikeId), q = quote(bk, b), end = addDays(bk.start, bk.days - 1);
  return `${H('Xác nhận đơn thuê')}<div class="body">
  <div class="bike-card" style="cursor:default"><div class="im" style="width:80px;height:70px">${photo(b)}</div><div class="inf"><h3>${esc(b.name)}</h3><b class="pr">${fmt(b.price)}/ngày</b></div></div>
  <div class="card"><div class="sum"><span class="mu">Thời gian thuê</span><b>${dmy(bk.start)} – ${dmy(end)}</b></div><div class="sum"><span class="mu">Giờ</span><b>${bk.time} – ${bk.rtime}</b></div><div class="sum"><span class="mu">Nhận xe</span><b style="text-align:right;max-width:60%">${bk.method === 'self' ? 'Tự đi lấy' : 'Giao tận nơi'}<br><small class="mu" style="font-weight:500">${esc(bk.method === 'self' ? b.area : bk.address)}</small></b></div></div>
  ${S.license ? '' : `<div class="card row sm-t" style="background:#fff3d1">${ico('shield')}<span class="sp">Bạn cần xác nhận bằng lái xe trước khi thanh toán.</span></div>`}<div class="card"><div class="sum"><span class="mu">Giá thuê (${bk.days} ngày)</span><span>${fmt(q.base)}</span></div>${q.disc ? `<div class="sum ok"><span>Giảm giá gói</span><span>-${fmt(q.base - q.rent)}</span></div>` : ''}${q.ship ? `<div class="sum"><span class="mu">Phí giao xe (${bk.dist === 'far' ? 'trên 3km' : '1–3km'})</span><span>${fmt(q.ship)}</span></div>` : ''}<div class="sum t"><span>Tổng tiền</span><span class="pr">${fmt(q.total)}</span></div></div></div>
  ${bottom('<button class="btn g" data-a="edit" style="flex:.8">Sửa thông tin</button><button class="btn" data-a="toPay">Tiếp tục</button>')}`;
};

SC.pay = () => {
  const bk = U.bk, q = quote(bk, bikeOf(bk.bikeId));
  const m = [['momo', 'Ví MoMo', 'Thanh toán nhanh, an toàn', 'phone'], ['zalo', 'ZaloPay', 'Liên kết ví ZaloPay', 'phone'], ['card', 'Thẻ ngân hàng', 'ATM / Visa / Mastercard', 'card'], ['cash', 'Tiền mặt', 'Trả tại điểm nhận xe', 'tag']];
  return `${H('Phương thức thanh toán')}<div class="body">${m.map(([k, t, s, i]) => optBtn(bk.pay === k, 'pay', `data-v="${k}"`, i, t, s)).join('')}
  <div class="card bd row sm-t mu">${ico('lock')}<span>Thông tin thanh toán được mã hóa & bảo mật.</span></div></div>
  ${bottom(`<button class="btn" data-a="payNow">Thanh toán ${fmt(q.total)}</button>`)}`;
};

SC.success = p => { const b = S.bookings.find(x => x.id === p.id), bike = bikeOf(b.bikeId); return `<div class="body" style="padding-top:20px"><div class="ok-ring"><i>${ico('check')}</i></div>
  <h2 style="text-align:center">Đặt thuê thành công!</h2><p class="mu" style="text-align:center;margin:8px 0 4px">Mã đơn: <b class="pr">${b.code}</b></p>
  <p class="mu sm-t" style="text-align:center;margin-bottom:20px">Bạn sẽ nhận xe <b>${esc(bike.name)}</b> lúc ${b.time} ngày ${dmy(b.start)}${b.method === 'self' ? ' tại ' + esc(bike.area) : ''}.</p>
  <button class="btn" data-a="open" data-n="track" data-p='{"id":"${b.id}"}' style="margin-bottom:10px">Xem chi tiết đơn</button><button class="btn o" data-a="tab" data-n="home">Về trang chủ</button></div>`; };

SC.track = p => {
  const b = S.bookings.find(x => x.id === p.id), bike = bikeOf(b.bikeId);
  const steps = STATUS.map((s, i) => `<div class="st ${i < b.status || (i === b.status && b.status === 4) ? 'done' : i === b.status ? 'cur' : 'wait'}"><span class="dt">${i < b.status || (i === b.status && b.status === 4) ? ico('check') : ''}</span><b>${s}</b>${i <= b.status ? `<small>${dmy(b.start)} · ${b.time}</small>` : ''}</div>`).join('');
  const act = b.cancel ? `<button class="btn" data-a="rebook" data-id="${bike.id}">Thuê lại xe này</button>` : b.status < 2 ? `<button class="btn g" data-a="adv" data-id="${b.id}">▶ Demo: chủ xe xác nhận / chuẩn bị xe</button><button class="btn err" data-a="cancel" data-id="${b.id}" style="margin-top:8px">Hủy đơn</button>`
    : b.status === 2 ? `<button class="btn" data-a="open" data-n="guide" data-p='{"id":"${b.id}"}'>Hướng dẫn nhận xe</button><button class="btn err" data-a="cancel" data-id="${b.id}" style="margin-top:8px">Hủy đơn</button>`
    : b.status === 3 ? `<button class="btn" data-a="open" data-n="ret" data-p='{"id":"${b.id}"}'>Trả xe</button>`
    : !b.rated ? `<button class="btn" data-a="open" data-n="rate" data-p='{"id":"${b.id}"}'>Đánh giá chuyến đi</button>` : `<button class="btn" data-a="rebook" data-id="${bike.id}">Thuê lại xe này</button>`;
  return `${H('Chi tiết đơn thuê')}<div class="body"><div class="card row"><div class="im" style="width:64px;height:54px;border-radius:10px;overflow:hidden">${photo(bike)}</div><div class="sp"><b>${esc(bike.name)}</b><div class="sm-t mu">${b.code} · ${fmt(b.total)}</div></div>${statusTag(b)}</div>
  ${b.cancel ? `<div class="banner"><b>Đơn đã bị hủy</b><div class="sm-t" style="margin-top:4px">Lý do: ${esc(b.reason || '')}</div><div class="sm-t">${b.pay === 'cash' ? 'Bạn thanh toán tiền mặt nên không cần hoàn tiền.' : 'Tiền sẽ được hoàn lại trong 1–3 ngày làm việc.'}</div></div>` : `<h2 class="sec">Theo dõi đơn thuê</h2><div class="tl">${steps}</div>`}${act}
  <div class="row" style="margin-top:12px"><button class="btn o sm" style="flex:1" data-a="open" data-n="help">Liên hệ hỗ trợ</button><button class="btn sm" style="flex:1" data-a="open" data-n="chat" data-p='{"who":"owner"}'>Chat với chủ xe</button></div></div>`;
};

const REASONS = ['Thay đổi kế hoạch', 'Tìm được xe khác phù hợp hơn', 'Đặt nhầm thời gian / địa điểm', 'Giá chưa phù hợp', 'Lý do khác'];
SC.cancel = p => { const b = S.bookings.find(x => x.id === p.id), bike = bikeOf(b.bikeId);
  return `${H('Hủy đơn thuê')}<div class="body"><div class="card row"><div class="im" style="width:64px;height:54px;border-radius:10px;overflow:hidden">${photo(bike)}</div><div class="sp"><b>${esc(bike.name)}</b><div class="sm-t mu">${b.code} · ${fmt(b.total)}</div></div></div>
  <h2 class="sec" style="margin-top:4px">Lý do hủy đơn</h2>${REASONS.map(r => `<button class="opt ${U.f.reason === r ? 'on' : ''}" data-a="reason" data-v="${r}"><span class="t"><b>${r}</b></span><span class="rd">${U.f.reason === r ? ico('check') : ''}</span></button>`).join('')}
  ${U.f.reason === 'Lý do khác' ? '<textarea class="inp" id="rsn" placeholder="Nhập lý do của bạn…"></textarea>' : ''}
  <div class="card bd sm-t mu" style="margin-top:10px">Hủy miễn phí khi xe chưa được bàn giao. ${b.pay === 'cash' ? '' : 'Tiền sẽ hoàn lại trong 1–3 ngày làm việc.'}</div></div>
  ${bottom(`<button class="btn g" data-a="back" style="flex:.7">Giữ đơn</button><button class="btn ${U.f.reason ? '' : 'dis'}" data-a="cancelok" data-id="${b.id}" style="background:var(--err)">Xác nhận hủy</button>`)}`; };

SC.guide = p => { const b = S.bookings.find(x => x.id === p.id), bike = bikeOf(b.bikeId); return `${H('Hướng dẫn nhận xe')}<div class="body">
  <div class="card">${optBtn(true, 'soon', '', 'pin', b.method === 'self' ? 'Địa điểm nhận xe' : 'Địa chỉ giao xe', esc(b.method === 'self' ? bike.area : b.address)).replace('<span class="rd"><svg', '<span class="rd" style="display:none"><svg')}</div>
  <h2 class="sec">Hướng dẫn</h2><div class="card"><ol style="padding-left:20px;line-height:1.9;font-size:14px"><li>Xuất trình mã đơn <b>${b.code}</b></li><li>Kiểm tra tình trạng xe trước khi nhận</li><li>Chụp ảnh xe (mọi góc) để đối chiếu khi trả</li><li>Ký biên bản bàn giao và nhận chìa khóa</li></ol></div>
  <button class="btn" data-a="picked" data-id="${b.id}">Đã nhận xe</button><p class="pr b" style="text-align:center;margin-top:12px;font-size:14px" data-a="open" data-n="help">Cần hỗ trợ? Liên hệ ngay</p></div>`; };

SC.ret = p => { const b = S.bookings.find(x => x.id === p.id), bike = bikeOf(b.bikeId); return `${H('Trả xe')}<div class="body">
  <div class="card"><div class="sum"><span class="mu">Địa điểm trả xe</span><b>${esc(bike.area)}</b></div><div class="sum"><span class="mu">Thời gian dự kiến</span><b>${b.rtime} – ${dmy(b.end)}</b></div></div>
  <div class="card bd row sm-t mu">${ico('bulb')}<span>Vui lòng trả xe đúng giờ để tránh phụ phí. Đổ đầy xăng như lúc nhận (nếu có).</span></div>
  <button class="btn" data-a="returned" data-id="${b.id}">Đã trả xe</button></div>`; };

SC.rate = p => { const b = S.bookings.find(x => x.id === p.id), bike = bikeOf(b.bikeId), n = U.f.stars || 5; return `${H('Đánh giá chuyến đi')}<div class="body">
  <div class="card row"><div class="im" style="width:64px;height:54px;border-radius:10px;overflow:hidden">${photo(bike)}</div><div><b>${esc(bike.name)}</b><div class="sm-t mu">${fmt(bike.price)}/ngày</div></div></div>
  <p class="b" style="text-align:center;margin-top:8px">Đánh giá của bạn</p><div class="stars">${[1, 2, 3, 4, 5].map(i => `<button class="${i <= n ? 'on' : ''}" data-a="star" data-v="${i}">${ico('star')}</button>`).join('')}</div>
  <div class="field"><label>Nhận xét (tùy chọn)</label><textarea class="inp" id="rv" placeholder="Xe tốt, sạch sẽ. Chủ xe nhiệt tình!"></textarea></div>
  <button class="btn" data-a="rate" data-id="${b.id}">Gửi đánh giá</button></div>`; };

SC.rentals = () => {
  const l = S.bookings.filter(b => U.rt === 0 || (U.rt === 1 ? b.status < 4 && !b.cancel : U.rt === 2 ? b.status === 4 && !b.cancel : b.cancel));
  return `<div class="hdr"><h1 style="text-align:left;padding-left:6px">Đơn thuê của tôi</h1></div><div class="body tabpad">
  <div class="seg">${['Tất cả', 'Đang thuê', 'Hoàn thành', 'Đã hủy'].map((t, i) => `<button class="${U.rt === i ? 'on' : ''}" data-a="rt" data-v="${i}">${t}</button>`).join('')}</div>
  ${l.length ? l.map(b => { const k = bikeOf(b.bikeId) || { name: '(Xe đã gỡ)', color: '#999', type: 'Xe số', photos: [] }; return `<div class="bike-card" data-a="open" data-n="track" data-p='{"id":"${b.id}"}'><div class="im" style="width:84px;height:76px">${photo(k)}</div><div class="inf"><div class="row"><h3 class="sp">${esc(k.name)}</h3>${statusTag(b)}</div><div class="sm-t mu" style="margin:3px 0">${dmy(b.start)} – ${dmy(b.end)}</div><b class="pr">${fmt(b.total)}</b> <span class="mu sm-t">· ${b.code}</span></div></div>`; }).join('') : empty('orders', 'Bạn chưa có đơn thuê nào')}</div>${tabbar('rentals')}`;
};

const msgHtml = l => l.map(m => `<div class="msg ${m.me ? 'me' : 'them'}">${esc(m.t)}<small>${m.at}</small></div>`).join('');
SC.chat = p => { const who = p.who || 'support', tab = !p.who; return `${tab ? '<div class="hdr"><h1 style="text-align:left;padding-left:6px">Hỗ trợ khách hàng</h1></div>' : H(who === 'owner' ? 'Chat với chủ xe' : 'Hỗ trợ khách hàng')}
  <div class="msgs">${msgHtml(S.chat[who])}</div>
  <div class="cbar" style="${tab ? 'margin-bottom:78px' : ''}"><input class="inp" id="cin" placeholder="Nhập tin nhắn…" autocomplete="off"><button class="ib" data-a="send">${ico('send')}</button></div>${tab ? tabbar('chat') : ''}`; };
SC_AFTER.chat = el => { const m = el.querySelector('.msgs'); m.scrollTop = m.scrollHeight; };

SC.help = () => `${H('Trung tâm trợ giúp')}<div class="body">${FAQ.map(([q, a], i) => `<div class="faq ${U.faq === i ? 'on' : ''}"><button data-a="faq" data-v="${i}">${q}${ico('next')}</button><p>${a}</p></div>`).join('')}
  <button class="btn" data-a="open" data-n="chat" style="margin-top:8px">Gửi yêu cầu hỗ trợ</button></div>`;

SC.profile = () => { const u = S.user || { name: 'Khách', phone: '' }, own = S.role === 'owner';
  const mi = (ic, t, a, n, p) => `<button class="mi" data-a="${a}" ${n ? `data-n="${n}"` : ''} ${p ? `data-p='${p}'` : ''}>${ico(ic)}<span class="sp">${t}</span>${ico('next')}</button>`;
  return `<div class="hdr"><h1 style="text-align:left;padding-left:6px">Tài khoản</h1></div><div class="body tabpad">
  <div class="card row" style="padding:16px"><div class="avatar">${esc(u.name.trim().split(' ').pop()[0] || 'A')}</div><div class="sp"><b style="font-size:17px">${esc(u.name)}</b><div class="sm-t mu">${esc(u.phone)}</div>${own ? `<span class="tag ${S.verified ? 'ok' : 'w'}" style="margin-top:4px">${S.verified ? 'Đã xác minh' : 'Chưa xác minh'}</span>` : ''}</div></div>
  <button class="btn g" data-a="role" style="margin-bottom:10px">⇄ Chuyển sang ${own ? 'Người thuê' : 'Chủ xe'}</button>
  <div class="card" style="padding:4px 14px">${mi('user', 'Thông tin cá nhân', 'open', 'info')}${own ? '' : mi('doc', 'Giấy phép lái xe' + (S.license ? ' ✓' : ''), 'open', 'license')}${mi('card', 'Phương thức thanh toán', 'open', 'paymeth')}${own ? mi('shield', 'Xác minh danh tính', 'open', 'o_verify') : mi('history', 'Lịch sử giao dịch', 'tab', 'rentals')}${mi('bell', 'Thông báo', 'open', 'notifs')}${mi('help', 'Trung tâm trợ giúp', 'open', 'help')}${mi('gear', 'Cài đặt', 'open', 'settings')}</div></div>${tabbar('profile')}`; };

SC.notifs = () => `${H('Thông báo', `<button class="ib" data-a="readall" title="Đã đọc tất cả">${ico('check')}</button>`)}<div class="body">${S.notifs.map(n => `<div class="ntf ${n.un ? 'un' : ''}" data-a="readn" data-id="${n.id}"><span class="ic">${ico(n.ic)}</span><div class="sp"><b style="font-size:14px">${esc(n.t)}</b><div class="sm-t mu">${esc(n.d)}</div></div>${n.un ? '<i class="dot" style="position:static;width:9px;height:9px;border-radius:50%;background:var(--err)"></i>' : ''}</div>`).join('')}</div>`;

SC.settings = () => { const row = (k, t) => `<div class="mi" style="cursor:default"><span class="sp">${t}</span><button class="sw ${S.settings[k] ? 'on' : ''}" data-a="setting" data-k="${k}"></button></div>`;
  return `${H('Cài đặt')}<div class="body"><div class="card" style="padding:4px 14px"><div class="mi" style="cursor:default"><span class="sp">Ngôn ngữ</span><span class="mu">Tiếng Việt</span></div>${row('push', 'Thông báo đẩy')}${row('email', 'Thông báo qua email')}${row('sound', 'Âm thanh')}</div>
  <button class="btn err" data-a="logout" style="margin-top:12px">${ico('logout')} Đăng xuất</button><p class="sm-t mu" style="text-align:center;margin-top:16px">iGo · phiên bản 1.0<br>Ảnh xe: Wikimedia Commons (CC BY / BY-SA / CC0) – xem img/CREDITS.md</p></div>`; };

/* ---------- chủ xe ---------- */
SC.o_verify = p => { const t = U.f.idt || 'cccd', I = U.ids;
  const ck = (k, l) => `<div class="row" style="padding:5px 0"><span style="color:${I[k] ? 'var(--ok)' : '#c4cfdf'}">${ico('check')}</span><span>${l}</span></div>`;
  return `${p.first ? H('Xác minh CCCD', '', false) : H('Xác minh CCCD')}<div class="body">
  <div class="seg"><button class="${t === 'cccd' ? 'on' : ''}" data-a="idtype" data-v="cccd">CCCD</button><button class="${t === 'pp' ? 'on' : ''}" data-a="idtype" data-v="pp">Hộ chiếu</button></div>
  <div class="row" style="align-items:stretch">${up('front', 'Mặt trước')}${up('back', 'Mặt sau')}</div><div style="margin-top:10px">${up('selfie', 'Ảnh selfie cùng giấy tờ')}</div>
  <div class="card" style="margin-top:12px">${ck('front', 'Ảnh mặt trước')}${ck('back', 'Ảnh mặt sau')}${ck('selfie', 'Ảnh selfie cùng giấy tờ')}</div>
  <p class="pr b" style="text-align:center;font-size:13px;margin-bottom:10px" data-a="idsample">Dùng ảnh mẫu (demo)</p>
  <p class="sm-t mu" style="text-align:center;margin-bottom:12px">Hệ thống sẽ tự động xác thực trong vài phút. Ảnh không được lưu trên thiết bị.</p>
  <button class="btn ${I.front && I.back && I.selfie ? '' : 'dis'}" data-a="idnext" ${p.next ? 'data-next="1"' : ''}>Tiếp tục</button>${p.first ? '<p class="mu sm-t" style="text-align:center;margin-top:12px" data-a="tab" data-n="o_home">Để sau</p>' : ''}</div>`; };

const stepper = n => `<div class="steps">${['Thông tin xe', 'Giá & hình thức', 'Hoàn tất'].map((t, i) => `${i ? `<span class="ln ${n > i ? 'on' : ''}"></span>` : ''}<div class="s ${n >= i + 1 ? 'on' : ''}"><i>${i + 1}</i>${t}</div>`).join('')}</div>`;
SC.o_info = () => { const d = U.pd;
  return `${H('Đăng xe mới')}<div class="body">${stepper(1)}
  ${field('Tên xe', 'pname', 'Honda Wave 110', 'text', U.f.pname != null ? U.f.pname : d.name)}
  <div class="row"><div class="field sp"><label>Loại xe</label><select class="inp" id="ptype">${Object.keys(PRICE_RANGE).map(t => `<option ${d.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div><div class="field sp"><label>Năm sản xuất</label><select class="inp" id="pyear">${Array.from({ length: 12 }, (_, i) => 2025 - i).map(y => `<option ${+d.year === y ? 'selected' : ''}>${y}</option>`).join('')}</select></div></div>
  ${field('Biển số', 'pplate', '59X1-123.45', 'text', U.f.pplate != null ? U.f.pplate : d.plate)}${field('Tình trạng xe', 'pcond', 'Tốt, hoạt động ổn định', 'text', U.f.pcond != null ? U.f.pcond : d.cond)}
  <h2 class="sec" style="margin-top:4px">Ảnh xe <span class="mu sm-t" style="font-weight:500">(${d.photos.length}/6 · tối thiểu 3)</span></h2>
  <div class="ph">${d.photos.map((p, i) => `<div class="t">${p.startsWith('svg:') ? bikeSvg(p.slice(4), d.type) : `<img src="${p}">`}<button class="x" data-a="rmphoto" data-i="${i}">✕</button></div>`).join('')}${d.photos.length < 6 ? `<label class="t add">${ico('plus')}<input type="file" accept="image/*" data-up="photo"></label>` : ''}</div>
  <p class="pr b" style="font-size:13px;margin:10px 0" data-a="photosample">Dùng ảnh mẫu (demo)</p>
  <div class="card bd row sm-t mu">${ico('bulb')}<span>Mẹo: ảnh đẹp giúp tăng tỷ lệ thuê xe. Ảnh rõ nét, không mờ, không chỉnh sửa quá đà.</span></div></div>${bottom('<button class="btn" data-a="infoNext">Tiếp tục</button>')}`; };

SC.o_method = () => { const d = U.pd;
  return `${H('Hình thức cho thuê')}<div class="body">${stepper(2)}<p class="mu sm-t" style="margin-bottom:10px">Bạn có thể chọn 1 hoặc cả 2 hình thức.</p>
  ${optBtn(d.self, 'pm', 'data-k="self"', 'hand', 'Tự đi lấy', 'Khách đến lấy xe tại địa điểm của bạn', '').replace('rd">', 'rd">')}
  ${optBtn(d.deliver, 'pm', 'data-k="deliver"', 'truck', 'Giao tận nơi', 'Phí giao: 1–3km 40.000đ · trên 3km 60.000đ')}
  <div class="card bd sm-t mu">Phí giao xe do iGo quy định: 1–3km <b class="pr">40.000đ</b>, trên 3km <b class="pr">60.000đ</b>.</div></div>${bottom('<button class="btn" data-a="methodNext">Tiếp tục</button>')}`; };

SC.o_calendar = () => { const d = U.pd, a = d.avail;
  const cls = s => s < today ? 'x' : a[s] === 'self' ? 'self' : a[s] === 'deliver' ? 'del' : a[s] === 'both' ? 'both' : '';
  const br = [['self', 'Tự lấy', d.self], ['deliver', 'Giao tận nơi', d.deliver], ['both', 'Cả hai', d.self && d.deliver], ['off', 'Không cho thuê', true]].filter(x => x[2]);
  return `${H('Lịch cho thuê')}<div class="body">${stepper(2)}<p class="mu sm-t" style="margin-bottom:8px">Chọn kiểu rồi chạm vào ngày để áp dụng.</p>
  <div class="chips" style="margin-bottom:10px">${br.map(([k, l]) => `<button class="chip ${d.brush === k ? 'on' : ''}" data-a="brush" data-v="${k}">${l}</button>`).join('')}</div>${calHtml(cls, 'pday')}
  <div class="chips"><button class="chip" data-a="fill" data-v="all">Cả tháng</button><button class="chip" data-a="fill" data-v="wd">Thứ 2–Thứ 6</button><button class="chip" data-a="fill" data-v="we">Cuối tuần</button></div>
  <div class="lg2"><div><i style="background:#d9f5e7"></i>Có cho thuê (tự lấy)</div><div><i style="background:#d6e6ff"></i>Có cho thuê (giao tận nơi)</div><div><i style="background:#eef0f4"></i>Không cho thuê</div></div></div>${bottom('<button class="btn" data-a="calNext">Tiếp tục</button>')}`; };

SC.o_price = () => { const d = U.pd, r = PRICE_RANGE[d.type];
  return `${H('Thiết lập giá')}<div class="body">${stepper(2)}
  <div class="card" style="text-align:center"><div class="mu sm-t">Giá thuê (1 ngày) – tự đặt giá</div>
  <div class="pnum"><button data-a="pstep" data-v="-5000">−</button><input class="inp" id="pr" type="number" inputmode="numeric" min="10000" step="1000" value="${d.price}" data-in="pr"><button data-a="pstep" data-v="5000">+</button></div>
  <b class="pr" id="prv">${fmt(d.price)}</b><div class="sm-t mu" style="margin-top:6px">Gợi ý cho ${d.type.toLowerCase()}: ${fmtK(r[0])} – ${fmtK(r[1])}/ngày</div></div>
  ${d.deliver ? `<div class="card row"><span class="sp">Giao tận nơi</span><b class="pr" style="text-align:right;font-size:13px">1–3km: 40.000đ<br>&gt;3km: 60.000đ</b></div>` : ''}
  <div class="field"><label>Tỉnh / Thành phố</label><select class="inp" id="pprov">${PROVINCES.map(p => `<option ${d.prov === p ? 'selected' : ''}>${p}</option>`).join('')}</select></div>
  <div class="field"><label>Quận / Huyện / Địa chỉ lấy xe</label><input class="inp" id="parea" value="${esc(d.dist)}" placeholder="Quận 1"></div>
  <div class="field"><label>Mô tả (tùy chọn)</label><textarea class="inp" id="pdesc" placeholder="Xe êm, tiết kiệm xăng, phù hợp đi làm, đi lại…">${esc(d.desc)}</textarea></div>
  <div class="card bd row sm-t mu">${ico('bulb')}<span>Giá gợi ý giúp xe dễ được thuê hơn. Bạn có thể đặt giá tùy ý và đổi lại sau.</span></div></div>${bottom('<button class="btn" data-a="priceNext">Tiếp tục</button>')}`; };

SC.o_contract = () => { const d = U.pd, ok = U.f.agree, days = Object.keys(d.avail).length;
  return `${H('Hợp đồng cho thuê xe')}<div class="body">${stepper(3)}
  <div class="card"><div style="text-align:center;color:var(--pt)">${ico('doc')}</div><b style="display:block;text-align:center;margin:4px 0 10px">Hợp đồng cho thuê xe iGo</b>
  <div class="sum"><span class="mu">Xe</span><b>${esc(d.name)}</b></div><div class="sum"><span class="mu">Biển số</span><b>${esc(d.plate)}</b></div><div class="sum"><span class="mu">Giá thuê</span><b class="pr">${fmt(d.price)}/ngày</b></div><div class="sum"><span class="mu">Hình thức</span><b>${[d.self && 'Tự lấy', d.deliver && 'Giao tận nơi'].filter(Boolean).join(' + ')}</b></div><div class="sum"><span class="mu">Số ngày mở cho thuê</span><b>${days} ngày</b></div></div>
  <div class="card">${['Phân chia trách nhiệm hai bên', 'Quy định hủy / hoàn tiền', 'Bảo hiểm (nếu có)', 'Cam kết tình trạng xe'].map(t => `<div class="row" style="padding:5px 0"><span class="ok">${ico('check')}</span>${t}</div>`).join('')}</div>
  <button class="chk ${ok ? 'on' : ''}" data-a="agree"><span class="bx">${ico('check')}</span><span>Tôi đã đọc và đồng ý với các điều khoản</span></button></div>${bottom(`<button class="btn ${ok ? '' : 'dis'}" data-a="publish">Xác nhận & đăng bài</button>`)}`; };

SC.o_done = () => `<div class="body" style="padding-top:30px"><div class="ok-ring"><i>${ico('check')}</i></div><h2 style="text-align:center">Đăng bài thành công!</h2><p class="mu" style="text-align:center;margin:8px 0 22px">Bài đăng của bạn đã hiển thị cho khách thuê.</p>
  <button class="btn" data-a="tab" data-n="o_home" style="margin-bottom:10px">Xem bài đăng của tôi</button><button class="btn o" data-a="tab" data-n="o_orders">Quản lý đơn thuê</button></div>`;

SC.o_home = () => {
  const mine = S.bikes.filter(b => b.mine), os = S.ownerOrders, rev = os.filter(o => o.status !== 'pending' && o.status !== 'cancel').reduce((s, o) => s + o.price, 0), pend = os.filter(o => o.status === 'pending');
  return `<div class="body tabpad"><div class="hbar"><div class="row"><div class="sp"><div style="font-size:12px;opacity:.85">Chủ xe</div><b style="font-size:18px">${esc(S.user ? S.user.name : 'Bạn')}</b></div>${roleSwitch()}<button class="ib" data-a="open" data-n="notifs" style="margin-left:6px;color:var(--navy)">${ico('bell')}${S.notifs.some(n => n.un) ? '<i class="dot"></i>' : ''}</button></div></div>
  ${S.verified ? '' : `<div class="card row" style="background:#fff3d1"><span>${ico('shield')}</span><span class="sp sm-t">Bạn chưa xác minh danh tính.</span><button class="btn sm" data-a="open" data-n="o_verify">Xác minh</button></div>`}
  <div class="stat"><div><b>${mine.length}</b><span>Xe đăng</span></div><div><b>${pend.length}</b><span>Đơn chờ</span></div><div><b>${fmtK(rev)}</b><span>Doanh thu</span></div></div>
  <h2 class="sec">Xe của tôi <a data-a="post">+ Đăng xe</a></h2>
  ${mine.length ? mine.map(b => `<div class="bike-card" style="cursor:default"><div class="im">${photo(b)}</div><div class="inf"><h3>${esc(b.name)}</h3><div class="mu sm-t">${esc(b.plate)} · ${fmt(b.price)}/ngày</div><div class="row" style="margin-top:8px"><span class="tag ${b.on ? 'ok' : 'w'}">${b.on ? 'Đang hiển thị' : 'Đã ẩn'}</span><span class="sp"></span><button class="ib" data-a="bikeon" data-id="${b.id}">${ico(b.on ? 'eye' : 'lock')}</button><button class="ib" data-a="bikedel" data-id="${b.id}" style="color:var(--err)">${ico('trash')}</button></div></div></div>`).join('') : `<div class="card" style="text-align:center"><div class="mu" style="margin-bottom:10px">Bạn chưa đăng xe nào</div><button class="btn sm" data-a="post">Đăng xe cho thuê</button></div>`}
  ${pend.length ? `<h2 class="sec">Đơn đang chờ xác nhận <a data-a="tab" data-n="o_orders">Xem tất cả</a></h2>${pend.slice(0, 2).map(orderCard).join('')}` : ''}</div>${tabbar('o_home')}`;
};
const ostat = { pending: ['w', 'Chờ xác nhận'], active: ['', 'Đang thuê'], done: ['ok', 'Hoàn tất'], cancel: ['e', 'Đã từ chối'] };
const orderCard = o => `<div class="bike-card" style="cursor:default;align-items:flex-start"><div class="im" style="width:76px;height:68px">${o.photo && !o.photo.startsWith('svg:') ? `<img src="${o.photo}">` : bikeSvg(o.color, 'Xe số')}</div><div class="inf"><div class="row"><h3 class="sp">${esc(o.bike)}</h3><span class="tag ${ostat[o.status][0]}">${ostat[o.status][1]}</span></div><div class="sm-t mu" style="margin:2px 0">Khách: ${esc(o.renter)}</div><div class="sm-t mu">${dmy(o.from)} – ${dmy(o.to)}</div><div class="row" style="margin-top:6px"><b class="pr">${fmt(o.price)}</b><span class="sp"></span>
  ${o.status === 'pending' ? `<button class="btn sm err" data-a="oact" data-id="${o.id}" data-s="cancel" style="height:32px;padding:0 10px">Từ chối</button><button class="btn sm" data-a="oact" data-id="${o.id}" data-s="active" style="height:32px;padding:0 12px">Xác nhận</button>` : o.status === 'active' ? `<button class="btn sm" data-a="oact" data-id="${o.id}" data-s="done" style="height:32px">Hoàn tất</button>` : ''}</div></div></div>`;
SC.o_orders = () => { const l = S.ownerOrders.filter(o => U.ot === 0 ? o.status === 'pending' || o.status === 'active' : o.status === 'done' || o.status === 'cancel');
  return `<div class="hdr"><h1 style="text-align:left;padding-left:6px">Quản lý đơn thuê</h1></div><div class="body tabpad"><div class="seg">${['Đang hoạt động', 'Lịch sử'].map((t, i) => `<button class="${U.ot === i ? 'on' : ''}" data-a="ot" data-v="${i}">${t}</button>`).join('')}</div>
  ${l.length ? l.map(orderCard).join('') : empty('orders', 'Chưa có đơn nào')}</div>${tabbar('o_orders')}`; };

SC.info = () => { const u = S.user || { name: '', phone: '', email: '' };
  return `${H('Thông tin cá nhân')}<div class="body"><div style="text-align:center;margin:6px 0 16px"><div class="avatar" style="margin:0 auto">${esc((u.name.trim().split(' ').pop() || 'A')[0])}</div></div>
  ${field('Họ và tên', 'iname', 'Nguyễn Mai Anh', 'text', u.name)}${field('Số điện thoại', 'iphone', '+84 987 654 321', 'tel', u.phone)}${field('Email', 'iemail', 'maianh@gmail.com', 'email', u.email || '')}
  <button class="btn" data-a="infosave">Lưu thay đổi</button></div>`; };
SC.paymeth = () => { const m = [['momo', 'Ví MoMo', 'phone'], ['zalo', 'ZaloPay', 'phone'], ['card', 'Thẻ ngân hàng', 'card'], ['cash', 'Tiền mặt', 'tag']];
  return `${H('Phương thức thanh toán')}<div class="body"><p class="mu sm-t" style="margin-bottom:10px">Chọn phương thức mặc định khi đặt thuê.</p>${m.map(([k, t, i]) => optBtn((S.defPay || 'momo') === k, 'defpay', `data-v="${k}"`, i, t, k === (S.defPay || 'momo') ? 'Mặc định' : '')).join('')}</div>`; };

/* ---------- xác nhận bằng lái xe ---------- */
const up = (k, lb) => { const I = U.ids; return `<label class="up ${I[k] ? 'has' : ''}">${I[k] && I[k] !== 'svg' ? `<img src="${I[k]}">` : ''}${I[k] ? ico('check') : ico('camera')}<span>${lb}</span><input type="file" accept="image/*" data-up="${k}"></label>`; };
SC.license = p => { const L = S.license, I = U.ids, ready = I.lfront && I.lback;
  return `${H('Giấy phép lái xe')}<div class="body">
  ${L ? `<div class="card row" style="background:#e0f7ec"><span class="ok">${ico('shield')}</span><div class="sp"><b>Đã xác nhận bằng lái</b><div class="sm-t mu">Số GPLX ${esc(L.no)} · Hạng ${esc(L.cls)}</div></div></div>` : `<div class="card bd row sm-t mu">${ico('shield')}<span>Bạn cần xác nhận bằng lái xe hợp lệ (hạng A1 trở lên) trước khi thuê xe.</span></div>`}
  <div class="field"><label>Số giấy phép lái xe</label><input class="inp" data-f="lno" inputmode="numeric" placeholder="12 chữ số" value="${esc(U.f.lno != null ? U.f.lno : L ? L.no : '')}"></div>
  <div class="field"><label>Hạng bằng</label><select class="inp" id="lcls">${['A1', 'A2', 'A', 'B1', 'B2'].map(c => `<option ${(L ? L.cls : 'A1') === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
  <div class="row" style="align-items:stretch">${up('lfront', 'Mặt trước')}${up('lback', 'Mặt sau')}</div>
  <p class="pr b" style="text-align:center;font-size:13px;margin:12px 0" data-a="licsample">Dùng ảnh mẫu (demo)</p>
  <button class="btn ${ready ? '' : 'dis'}" data-a="licok" ${p.next ? 'data-next="1"' : ''}>${L ? 'Cập nhật' : 'Xác nhận bằng lái'}</button></div>`; };
