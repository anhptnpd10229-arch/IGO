/* iGo – dữ liệu mẫu, biểu tượng, tiện ích */
const IC = {
  home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  orders: 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h7',
  chat: 'M21 12a8 8 0 0 1-11.6 7L3 21l2-5.5A8 8 0 1 1 21 12z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  back: 'M15 18l-6-6 6-6',
  next: 'M9 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9zM13.7 21a2 2 0 0 1-3.4 0',
  check: 'M5 13l4 4L19 7',
  pin: 'M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
  filter: 'M4 6h16M7 12h10M10 18h4',
  heart: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z',
  cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  card: 'M2 6h20v13H2zM2 10h20M6 15h4',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17v.01',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  logout: 'M9 21H5V3h4M16 17l5-5-5-5M21 12H9',
  camera: 'M3 8h4l2-3h6l2 3h4v12H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-1-3-2 .5-1.5-1.5.5-2-3-1-1 2h-2l-1-2-3 1 .5 2L6 8.5 4 8l-1 3 2 1v1l-2 1 1 3 2-.5L7.5 18l-.5 2 3 1 1-2h2l1 2 3-1-.5-2 1.5-1.5 2 .5 1-3-2-1z',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  doc: 'M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h5',
  truck: 'M2 6h11v10H2zM13 9h5l4 4v3h-9zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  hand: 'M12 3v9M8 6v7M16 6v7M4 11v3a7 7 0 0 0 7 7h2a7 7 0 0 0 7-7v-3',
  history: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  tag: 'M3 12V3h9l9 9-9 9zM7.5 7.5h.01',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3z'
};
const ico = (n, cls = '') => n === 'star'
  ? `<svg class="i f ${cls}" viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.9z"/></svg>`
  : `<svg class="i ${cls}" viewBox="0 0 24 24"><path d="${IC[n] || ''}"/></svg>`;

/* xe máy vẽ bằng SVG, đổi màu theo xe */
function bikeSvg(color = "#2a3a55", type = "Xe số", bg = true) {
  const body = type === 'Xe côn tay'
    ? `<path d="M70 120l30-28 44 2 24 18 22-4 14 20z" fill="${color}"/><path d="M96 90l28-14 30 6-10 14z" fill="#222"/>`
    : type === 'Xe ga'
    ? `<path d="M64 128c0-30 28-48 56-48h40l18 26 16 6v16z" fill="${color}"/><path d="M96 80l30-24 16 4-8 22z" fill="${color}" opacity=".85"/>`
    : `<path d="M76 118l24-26 52 2 26 24-12 10H92z" fill="${color}"/><rect x="98" y="82" width="46" height="12" rx="6" fill="#222"/>`;
  return `<svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${bg ? '<rect width="260" height="170" fill="#e8f1ff"/>' : ''}<ellipse cx="130" cy="150" rx="100" ry="8" fill="#c7d9f5"/>
  <g fill="#1b2437"><circle cx="64" cy="128" r="22"/><circle cx="196" cy="128" r="22"/></g><g fill="#cfd8e6"><circle cx="64" cy="128" r="10"/><circle cx="196" cy="128" r="10"/></g>
  ${body}<path d="M178 92l8-26 18-6" stroke="#333" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="206" cy="82" r="7" fill="#ffd54a"/><rect x="112" y="76" width="36" height="9" rx="4" fill="#111"/></svg>`;
}

const fmt = n => Math.round(n).toLocaleString('vi-VN').replace(/,/g, '.') + 'đ';
const fmtK = n => Math.round(n / 1000) + 'k';
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
const dmy = s => { const d = parseYmd(s); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`; };

const COLORS = ['#c0392b', '#1f6feb', '#2e7d32', '#37474f', '#e08a1e', '#6a1b9a', '#00838f', '#8d6e63'];
const SEED_BIKES = [
  { id: 'b1', name: 'Honda Wave 110', type: 'Xe số', price: 99000, rating: 4.8, reviews: 120, plate: '59X1-123.45', year: 2022, cc: '110cc', cond: 'Xe mới, sạch sẽ', area: 'Quận 1, TP. Hồ Chí Minh', owner: 'Nguyễn Văn A', color: COLORS[0], photos: ['img/b1.jpg'], on: true },
  { id: 'b2', name: 'Yamaha Jupiter MX 135', type: 'Xe số', price: 105000, rating: 4.7, reviews: 86, plate: '59P2-456.78', year: 2021, cc: '135cc', cond: 'Tiết kiệm xăng, êm', area: 'Quận 3, TP. Hồ Chí Minh', owner: 'Trần Thị B', color: COLORS[1], photos: ['img/b2.jpg'], on: true },
  { id: 'b3', name: 'Honda Vision 110', type: 'Xe ga', price: 120000, rating: 4.9, reviews: 210, plate: '59H3-789.01', year: 2023, cc: '110cc', cond: 'Mới 95%', area: 'Quận 7, TP. Hồ Chí Minh', owner: 'Lê Minh C', color: COLORS[3], photos: ['img/b3.jpg'], on: true },
  { id: 'b4', name: 'Honda Air Blade 125', type: 'Xe ga', price: 140000, rating: 4.8, reviews: 64, plate: '59C1-234.56', year: 2023, cc: '125cc', cond: 'Sơn đẹp, máy êm', area: 'Hải Châu, Đà Nẵng', owner: 'Phạm Quốc D', color: COLORS[4], photos: ['img/b4.jpg'], on: true },
  { id: 'b5', name: 'Yamaha Exciter 155', type: 'Xe côn tay', price: 150000, rating: 4.9, reviews: 98, plate: '59D5-678.90', year: 2023, cc: '155cc', cond: 'Mạnh mẽ, phanh ABS', area: 'Cầu Giấy, Hà Nội', owner: 'Võ Thanh E', color: COLORS[5], photos: ['img/b5.jpg'], on: true },
  { id: 'b6', name: 'Honda Lead 125', type: 'Xe ga', price: 130000, rating: 4.6, reviews: 52, plate: '59E7-111.22', year: 2022, cc: '125cc', cond: 'Cốp rộng, đi phố tiện', area: 'Ba Đình, Hà Nội', owner: 'Đặng Thu F', color: COLORS[6], photos: ['img/b6.jpg'], on: true },
  { id: 'b7', name: 'Honda Winner X', type: 'Xe côn tay', price: 150000, rating: 4.8, reviews: 41, plate: '59F9-333.44', year: 2022, cc: '150cc', cond: 'Thể thao, đèn LED', area: 'Nha Trang, Khánh Hòa', owner: 'Bùi Hải G', color: COLORS[2], photos: ['img/b7.jpg'], on: true },
  { id: 'b8', name: 'Yamaha Mio S 125', type: 'Xe ga', price: 115000, rating: 4.5, reviews: 33, plate: '59K2-555.66', year: 2021, cc: '125cc', cond: 'Nhỏ gọn, nhẹ nhàng', area: 'Ninh Kiều, Cần Thơ', owner: 'Hồ Mỹ H', color: COLORS[7], photos: ['img/b8.jpg'], on: true }
];
const PRICE_RANGE = { 'Xe số': [99000, 115000], 'Xe ga': [110000, 140000], 'Xe côn tay': [130000, 150000] };
const STATUS = ['Đã đặt thuê', 'Đang xử lý', 'Sẵn sàng nhận xe', 'Đang thuê', 'Đã trả xe'];
const FAQ = [
  ['Hướng dẫn thuê xe', 'Chọn xe, chọn thời gian và hình thức nhận xe, xác nhận rồi thanh toán. Chủ xe sẽ xác nhận trong ít phút.'],
  ['Chính sách & điều khoản', 'Hủy miễn phí trước giờ nhận xe 24 giờ. Hủy muộn hơn sẽ tính phí 20% giá trị đơn.'],
  ['Câu hỏi thường gặp', 'Cần mang theo CCCD và giấy phép lái xe còn hạn khi nhận xe. Xe được bàn giao kèm 2 mũ bảo hiểm.'],
  ['Phí giao xe tận nơi', 'Phí giao xe tận nơi: 1–3km là 40.000đ, trên 3km là 60.000đ (tính một lượt).'],
  ['Bảo hiểm & sự cố', 'Mọi chuyến thuê đều có bảo hiểm cơ bản. Khi gặp sự cố hãy liên hệ ngay hỗ trợ 24/7.']
];
const SEED_OWNER_ORDERS = [
  { id: 'o1', bike: 'Honda Wave 110', color: COLORS[0], renter: 'Nguyễn Văn An', from: '2025-04-12', to: '2025-04-14', price: 297000, status: 'pending', photo: 'img/b1.jpg' },
  { id: 'o2', bike: 'Yamaha Jupiter MX 135', color: COLORS[1], renter: 'Trần Thị Bình', from: '2025-04-10', to: '2025-04-12', price: 220000, status: 'active', photo: 'img/b2.jpg' },
  { id: 'o3', bike: 'Honda Vision 110', color: COLORS[3], renter: 'Lê Minh Cường', from: '2025-04-08', to: '2025-04-10', price: 240000, status: 'done', photo: 'img/b3.jpg' }
];

/* 34 tỉnh, thành phố (sau sắp xếp đơn vị hành chính 2025) */
const PROVINCES = ['Hà Nội', 'TP. Hồ Chí Minh', 'Hải Phòng', 'Đà Nẵng', 'Cần Thơ', 'Huế',
  'Tuyên Quang', 'Lào Cai', 'Thái Nguyên', 'Phú Thọ', 'Bắc Ninh', 'Hưng Yên', 'Ninh Bình', 'Quảng Trị', 'Quảng Ngãi', 'Gia Lai', 'Khánh Hòa', 'Lâm Đồng',
  'Đắk Lắk', 'Đồng Nai', 'Tây Ninh', 'Vĩnh Long', 'Đồng Tháp', 'Cà Mau', 'An Giang', 'Điện Biên', 'Lai Châu', 'Sơn La', 'Lạng Sơn', 'Cao Bằng',
  'Quảng Ninh', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh'];
const norm = x => String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
