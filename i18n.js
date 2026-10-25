/* iGo – song ngữ Việt / English: dịch văn bản trong DOM theo từ điển (mặc định tiếng Việt) */
(() => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const EN = {
    /* chung */
    'Trang chủ': 'Home', 'Đơn thuê': 'Rentals', 'Trò chuyện': 'Chat', 'Tài khoản': 'Account', 'Tin nhắn': 'Messages', 'Đăng xe': 'Post bike',
    'Tiếp tục': 'Continue', 'Đăng ký': 'Sign up', 'Đăng nhập': 'Log in', 'Đăng xuất': 'Log out', 'Quay lại': 'Back', 'Thêm': 'Add', 'Áp dụng': 'Apply', 'Đặt lại': 'Reset', 'Xem tất cả': 'See all', 'Tất cả': 'All',
    'Thuê xe máy, dễ dàng': 'Motorbike rental made easy', 'An toàn · Minh bạch · Linh hoạt': 'Safe · Transparent · Flexible',
    '↺ Đặt lại dữ liệu demo': '↺ Reset demo data', 'iGo – Thuê xe máy, dễ dàng': 'iGo – Motorbike rental made easy',
    /* welcome / auth */
    'Hoặc tiếp tục với': 'Or continue with', 'Hoặc đăng nhập với': 'Or log in with', 'Đăng ký tài khoản': 'Create account', 'Khách thuê': 'Renter', 'Chủ xe': 'Bike owner',
    'Họ và tên': 'Full name', 'Số điện thoại': 'Phone number', 'Số điện thoại / Email': 'Phone number / Email', 'Email (không bắt buộc)': 'Email (optional)', 'Email': 'Email', 'Mật khẩu': 'Password', 'Tối thiểu 6 ký tự': 'At least 6 characters',
    'Tôi đồng ý với': 'I agree to the', 'Điều khoản': 'Terms', 'Chính sách': 'Policy', 'Đã có tài khoản?': 'Already have an account?', 'Chưa có tài khoản?': "Don't have an account?",
    'Xác thực mã OTP': 'Verify OTP', 'Vui lòng nhập mã xác thực được gửi': 'Please enter the verification code sent', 'về số điện thoại': 'to the phone number', '(Demo: nhập 6 chữ số bất kỳ)': '(Demo: enter any 6 digits)', 'Gửi lại mã': 'Resend code',
    'Nhớ tài khoản': 'Remember me', 'Quên mật khẩu?': 'Forgot password?', 'Để sau': 'Later',
    /* home / search */
    'Xin chào,': 'Hello,', 'Bạn': 'You', 'Tìm xe, địa điểm, loại xe…': 'Search bikes, places, types…', 'Ưu đãi hôm nay': "Today's offer", 'Giảm 20% cho thuê xe ngày': '20% off daily rentals', 'Áp dụng đến 31/12': 'Valid until 31/12',
    'Xe máy': 'Motorbike', 'Xe số': 'Manual', 'Xe ga': 'Scooter', 'Xe côn tay': 'Clutch bike', 'Xe được thuê nhiều': 'Most rented bikes',
    'Tìm kiếm xe': 'Search bikes', 'Tên xe, khu vực…': 'Bike name, area…', 'Địa điểm (tỉnh, thành phố)': 'Location (province / city)', 'Nhập tỉnh / thành phố…': 'Enter province / city…', 'Tất cả khu vực': 'All areas',
    'Gợi ý cho bạn': 'Suggested for you', 'Xe hot · Giá tốt · Giao nhanh': 'Hot bikes · Good price · Fast delivery', 'Kết quả tìm kiếm': 'Search results', 'Không tìm thấy xe phù hợp': 'No matching bikes found',
    'Lọc & sắp xếp': 'Filter & sort', 'Sắp xếp': 'Sort', 'Phù hợp nhất': 'Best match', 'Giá thấp → cao': 'Price: low → high', 'Giá cao → thấp': 'Price: high → low', 'Đánh giá cao': 'Top rated', 'Giá tối đa / ngày': 'Max price / day',
    'Mới': 'New', '/ngày': '/day', 'Giá từ': 'From',
    /* chi tiết xe */
    'Chi tiết xe': 'Bike details', 'Thông tin xe': 'Bike info', 'Biển số': 'Plate', 'Năm sản xuất': 'Year', 'Dung tích': 'Engine', 'Tình trạng': 'Condition', 'Mô tả': 'Description',
    'Địa điểm nhận xe': 'Pickup location', 'Giờ nhận:': 'Pickup from', '— Trả muộn nhất': '— Latest return', 'Không cọc': 'No deposit', 'Chủ xe không yêu cầu đặt cọc khi nhận xe.': 'The owner does not require a deposit at pickup.', 'Hoàn lại khi trả xe đúng tình trạng.': 'Refunded when the bike is returned in good condition.',
    'Đặc điểm & tiện nghi': 'Features & amenities', 'Chủ xe · Phản hồi nhanh': 'Owner · Replies quickly', 'Xe được bảo hiểm cơ bản, kèm 2 mũ bảo hiểm. Hủy miễn phí trước 24 giờ.': 'Basic insurance included with 2 helmets. Free cancellation up to 24 hours before.', 'Đặt thuê': 'Book now',
    'Tặng nhiên liệu': 'Fuel included', 'Không tặng nhiên liệu': 'Fuel not included', 'Đi được ngoài nội thành': 'Can leave the city', 'Chỉ trong nội thành': 'City only', 'Cho phép chở 2 người': 'Up to 2 riders', 'Chỉ chở 1 người': 'Single rider only',
    'Không giới hạn km': 'Unlimited km', 'Có giới hạn km': 'Limited km', 'Có sẵn mũ bảo hiểm': 'Helmet provided', 'Không kèm mũ bảo hiểm': 'No helmet', 'Kèm áo mưa': 'Raincoat included', 'Không kèm áo mưa': 'No raincoat',
    'Có giá gắn điện thoại': 'Phone holder', 'Không có giá gắn điện thoại': 'No phone holder', 'Không yêu cầu bằng lái': 'No license required', 'Yêu cầu bằng lái': 'License required',
    'Cốp rộng đựng đồ': 'Spacious storage', 'Không có cốp rộng': 'No large storage', 'Có khóa chống trộm': 'Anti-theft lock', 'Không có khóa chống trộm': 'No anti-theft lock', 'Có định vị GPS': 'GPS tracking', 'Không có định vị GPS': 'No GPS tracking',
    'Có cổng sạc USB': 'USB charging port', 'Không có cổng sạc USB': 'No USB port', 'Phanh ABS': 'ABS brakes', 'Không có phanh ABS': 'No ABS brakes', 'Có bảo hiểm xe': 'Bike insurance', 'Không có bảo hiểm xe': 'No bike insurance', 'Hỗ trợ cứu hộ 24/7': '24/7 roadside rescue', 'Không hỗ trợ cứu hộ': 'No roadside rescue',
    'Giao xe tận nơi (từ 40.000đ)': 'Delivery available (from 40,000đ)', 'Không giao xe tận nơi': 'No delivery',
    'Tặng khăn trùm đầu': 'Free head scarf', 'Có ngăn đựng áo mưa': 'Raincoat compartment', 'Giao nhận linh hoạt giờ hành chính': 'Flexible handover in office hours',
    'Xe mới, sạch sẽ': 'Like new, clean', 'Tiết kiệm xăng, êm': 'Fuel-efficient, smooth', 'Mới 95%': '95% like new', 'Sơn đẹp, máy êm': 'Nice paint, quiet engine', 'Mạnh mẽ, phanh ABS': 'Powerful, ABS brakes', 'Cốp rộng, đi phố tiện': 'Roomy storage, great for city', 'Thể thao, đèn LED': 'Sporty, LED lights', 'Nhỏ gọn, nhẹ nhàng': 'Compact and light', 'Hoạt động ổn định': 'Runs reliably',
    /* đặt thuê */
    'Chọn gói thuê': 'Choose rental plan', 'Thời gian thuê': 'Rental period', 'Số ngày thuê (tối đa 90 ngày)': 'Rental days (up to 90)', 'Giá thuê': 'Rental price', 'Tạm tính': 'Subtotal', 'Bảo hiểm chuyến đi': 'Trip insurance', 'Mua bảo hiểm': 'Buy insurance', 'Hỗ trợ khi xảy ra sự cố, hư hỏng, tai nạn · 15.000đ/ngày': 'Covers incidents, damage and accidents · 15,000đ/day', 'Thuê từ 3 ngày giảm 4%, từ 7 ngày giảm 5,5%. Giá chưa gồm phí giao xe (nếu có).': '4% off for 3+ days, 5.5% off for 7+ days. Delivery fee not included.',
    'Phương thức nhận xe': 'Pickup method', 'Tự đi lấy': 'Self pickup', 'Giao tận nơi': 'Delivery', 'Chủ xe giao xe đến địa điểm của bạn · 1–3km: 40.000đ · trên 3km: 60.000đ': 'Owner delivers to you · 1–3km: 40,000đ · over 3km: 60,000đ',
    'Khoảng cách giao xe': 'Delivery distance', 'Từ 1 – 3 km': '1 – 3 km', 'Trên 3 km': 'Over 3 km', 'Phí giao xe một lượt': 'One-way delivery fee', 'Địa chỉ nhận xe': 'Delivery address', 'Số nhà, đường, quận…': 'Street, district…',
    'Chọn ngày & giờ thuê': 'Choose date & time', 'Giờ nhận xe': 'Pickup time', 'Giờ trả xe': 'Return time', 'Nhận:': 'Pickup:', 'Trả:': 'Return:', 'Xác nhận đơn thuê': 'Confirm booking', 'Sửa thông tin': 'Edit details', 'Giờ': 'Time', 'Nhận xe': 'Pickup',
    'Giảm giá gói': 'Package discount', 'Tổng tiền': 'Total', 'Bạn cần xác nhận bằng lái xe trước khi thanh toán.': 'You need to verify your driver license before paying.',
    'Phương thức thanh toán': 'Payment method', 'Ví MoMo': 'MoMo wallet', 'Thanh toán nhanh, an toàn': 'Fast, secure payment', 'ZaloPay': 'ZaloPay', 'Liên kết ví ZaloPay': 'Linked ZaloPay wallet', 'Thẻ ngân hàng': 'Bank card', 'ATM / Visa / Mastercard': 'ATM / Visa / Mastercard', 'Tiền mặt': 'Cash', 'Trả tại điểm nhận xe': 'Pay at pickup',
    'Thông tin thanh toán được mã hóa & bảo mật.': 'Payment details are encrypted and secure.', 'Đang xử lý thanh toán…': 'Processing payment…', 'Vui lòng không đóng ứng dụng': 'Please do not close the app',
    'Đặt thuê thành công!': 'Booking successful!', 'Đặt thuê thành công': 'Booking successful', 'Mã đơn:': 'Order code:', 'Bạn sẽ nhận xe': 'You will pick up', 'lúc': 'at', 'ngày': 'on', 'tại': 'at', 'Xem chi tiết đơn': 'View order details', 'Về trang chủ': 'Back to home',
    /* theo dõi đơn */
    'Chi tiết đơn thuê': 'Order details', 'Theo dõi đơn thuê': 'Order tracking', 'Đã đặt thuê': 'Booked', 'Đang xử lý': 'Processing', 'Sẵn sàng nhận xe': 'Ready for pickup', 'Đang thuê': 'Renting', 'Đã trả xe': 'Returned',
    'Chờ nhận xe': 'Awaiting pickup', 'Đã hoàn thành': 'Completed', 'Hoàn thành': 'Completed', 'Đã hủy': 'Cancelled', '▶ Demo: chủ xe xác nhận / chuẩn bị xe': '▶ Demo: owner confirms / prepares bike', 'Hủy đơn': 'Cancel order',
    'Hướng dẫn hủy': 'Cancellation', 'Hướng dẫn nhận xe': 'Pickup guide', 'Liên hệ hỗ trợ': 'Contact support', 'Chat với chủ xe': 'Chat with owner', 'Trả xe': 'Return bike', 'Đánh giá chuyến đi': 'Rate your trip', 'Thuê lại xe này': 'Rent this bike again',
    'Đơn đã bị hủy': 'Order cancelled', 'Lý do:': 'Reason:', 'Bạn thanh toán tiền mặt nên không cần hoàn tiền.': 'You paid in cash, so no refund is needed.', 'Tiền sẽ được hoàn lại trong 1–3 ngày làm việc.': 'Your money will be refunded within 1–3 business days.',
    'Hủy đơn thuê': 'Cancel booking', 'Lý do hủy đơn': 'Cancellation reason', 'Thay đổi kế hoạch': 'Change of plans', 'Tìm được xe khác phù hợp hơn': 'Found a better bike', 'Đặt nhầm thời gian / địa điểm': 'Wrong time / place booked', 'Giá chưa phù hợp': 'Price not suitable', 'Lý do khác': 'Other reason', 'Nhập lý do của bạn…': 'Enter your reason…',
    'Giữ đơn': 'Keep order', 'Xác nhận hủy': 'Confirm cancel', 'Hủy miễn phí khi xe chưa được bàn giao.': 'Free cancellation before the bike is handed over.', 'Tiền sẽ hoàn lại trong 1–3 ngày làm việc.': 'Money will be refunded within 1–3 business days.',
    'Hướng dẫn': 'Guide', 'Xuất trình mã đơn': 'Show order code', 'Kiểm tra tình trạng xe trước khi nhận': 'Inspect the bike before pickup', 'Chụp ảnh xe (mọi góc) để đối chiếu khi trả': 'Photograph the bike (all angles) to compare at return', 'Ký biên bản bàn giao và nhận chìa khóa': 'Sign the handover form and receive the key',
    'Đã nhận xe': 'Picked up', 'Cần hỗ trợ? Liên hệ ngay': 'Need help? Contact us', 'Địa điểm trả xe': 'Return location', 'Thời gian dự kiến': 'Expected time', 'Vui lòng trả xe đúng giờ để tránh phụ phí. Đổ đầy xăng như lúc nhận (nếu có).': 'Please return on time to avoid extra fees. Refuel to the level at pickup (if any).',
    'Đánh giá của bạn': 'Your rating', 'Nhận xét (tùy chọn)': 'Review (optional)', 'Xe tốt, sạch sẽ. Chủ xe nhiệt tình!': 'Great bike, clean. Friendly owner!', 'Gửi đánh giá': 'Submit review',
    'Đơn thuê của tôi': 'My rentals', 'Bạn chưa có đơn thuê nào': 'You have no rentals yet', 'Đang thuê ': 'Renting',
    /* chat / trợ giúp / tài khoản */
    'Hỗ trợ khách hàng': 'Customer support', 'Nhập tin nhắn…': 'Type a message…', 'Xin chào! iGo có thể giúp gì cho bạn?': 'Hello! How can iGo help you?', 'Chào bạn, xe sẵn sàng nhé. Bạn cần hỗ trợ gì không?': 'Hi, the bike is ready. Anything I can help with?',
    'Cảm ơn bạn, mình đã nhận được tin nhắn.': 'Thanks, I received your message.', 'Mình sẽ phản hồi ngay trong ít phút nhé!': "I'll reply in a few minutes!", 'Bạn có thể gửi thêm thông tin chi tiết để mình hỗ trợ tốt hơn.': 'Feel free to send more details so I can help better.',
    'Trung tâm trợ giúp': 'Help center', 'Hướng dẫn thuê xe': 'How to rent', 'Chính sách & điều khoản': 'Policies & terms', 'Câu hỏi thường gặp': 'FAQ', 'Phí giao xe tận nơi': 'Delivery fee', 'Bảo hiểm & sự cố': 'Insurance & incidents', 'Gửi yêu cầu hỗ trợ': 'Send support request',
    'Chọn xe, chọn thời gian và hình thức nhận xe, xác nhận rồi thanh toán. Chủ xe sẽ xác nhận trong ít phút.': 'Pick a bike, time and pickup method, confirm and pay. The owner confirms within minutes.',
    'Hủy miễn phí trước giờ nhận xe 24 giờ. Hủy muộn hơn sẽ tính phí 20% giá trị đơn.': 'Free cancellation 24 hours before pickup. Later cancellations incur a 20% fee.',
    'Cần mang theo CCCD và giấy phép lái xe còn hạn khi nhận xe. Xe được bàn giao kèm 2 mũ bảo hiểm.': 'Bring your ID and a valid driver license at pickup. The bike comes with 2 helmets.',
    'Phí giao xe tận nơi: 1–3km là 40.000đ, trên 3km là 60.000đ (tính một lượt).': 'Delivery fee: 40,000đ for 1–3km, 60,000đ for over 3km (one way).',
    'Mọi chuyến thuê đều có bảo hiểm cơ bản. Khi gặp sự cố hãy liên hệ ngay hỗ trợ 24/7.': 'Every rental includes basic insurance. In case of an incident, contact 24/7 support right away.',
    'Chuyển sang Chủ xe': 'Switch to Owner', 'Chuyển sang Người thuê': 'Switch to Renter', 'Người thuê': 'Renter', 'Đã xác minh': 'Verified', 'Chưa xác minh': 'Not verified',
    'Thông tin cá nhân': 'Personal info', 'Giấy phép lái xe': 'Driver license', 'Xác minh danh tính': 'Identity verification', 'Lịch sử giao dịch': 'Transaction history', 'Thông báo': 'Notifications', 'Cài đặt': 'Settings', 'Lưu thay đổi': 'Save changes',
    'Chọn phương thức mặc định khi đặt thuê.': 'Choose your default payment method.', 'Mặc định': 'Default', 'Đã xác nhận bằng lái': 'License verified', 'Số giấy phép lái xe': 'Driver license number', '12 chữ số': '12 digits', 'Hạng bằng': 'License class', 'Mặt trước': 'Front', 'Mặt sau': 'Back',
    'Bạn cần xác nhận bằng lái xe hợp lệ (hạng A1 trở lên) trước khi thuê xe.': 'You need a valid driver license (class A1 or above) before renting.', 'Cập nhật': 'Update', 'Xác nhận bằng lái': 'Verify license', 'Đang xác thực bằng lái…': 'Verifying license…', 'Dùng ảnh mẫu (demo)': 'Use sample photos (demo)',
    'Ngôn ngữ': 'Language', 'Tiếng Việt': 'Tiếng Việt', 'Thông báo đẩy': 'Push notifications', 'Thông báo qua email': 'Email notifications', 'Âm thanh': 'Sound', 'iGo · phiên bản 1.0': 'iGo · version 1.0', 'Ảnh xe: Wikimedia Commons (CC BY / BY-SA / CC0) – xem img/CREDITS.md': 'Bike photos: Wikimedia Commons (CC BY / BY-SA / CC0) – see img/CREDITS.md',
    'Chào mừng đến với iGo': 'Welcome to iGo', 'Thuê xe máy dễ dàng, an toàn và minh bạch.': 'Easy, safe and transparent motorbike rental.', 'Giảm 20% cho thuê xe ngày ': '20% off daily rentals', 'Áp dụng đến hết 31/12 cho đơn từ 3 ngày.': 'Valid until 31/12 for rentals of 3+ days.', 'Cập nhật chính sách': 'Policy update', 'Chính sách hủy đơn mới đã có hiệu lực.': 'The new cancellation policy is now in effect.',
    'Đã hủy đơn': 'Order cancelled', 'Đơn thuê đã được hủy thành công.': 'Your booking was cancelled successfully.', 'Đơn đã hủy. Tiền sẽ được hoàn lại trong 1–3 ngày làm việc.': 'Order cancelled. Money will be refunded within 1–3 business days.', 'Đã nhận xe ': 'Picked up', 'Chúc bạn có chuyến đi an toàn!': 'Have a safe trip!', 'Hãy đánh giá chuyến đi của bạn.': 'Please rate your trip.',
    /* chủ xe */
    'Xác minh CCCD': 'ID verification', 'CCCD': 'ID card', 'Hộ chiếu': 'Passport', 'Ảnh selfie cùng giấy tờ': 'Selfie with your ID', 'Ảnh mặt trước': 'Front photo', 'Ảnh mặt sau': 'Back photo', 'Hệ thống sẽ tự động xác thực trong vài phút. Ảnh không được lưu trên thiết bị.': 'Verification is automatic and takes a few minutes. Photos are not stored on this device.', 'Hệ thống đang xác thực…': 'Verifying…',
    'Bạn chưa xác minh danh tính.': 'You have not verified your identity.', 'Xác minh': 'Verify', 'Xe đăng': 'Bikes', 'Đơn chờ': 'Pending', 'Doanh thu': 'Revenue', 'Xe của tôi': 'My bikes', '+ Đăng xe': '+ Post bike', 'Bạn chưa đăng xe nào': 'You have not posted any bikes', 'Đăng xe cho thuê': 'Post a bike for rent',
    'Đang hiển thị': 'Visible', 'Đã ẩn': 'Hidden', 'Đơn đang chờ xác nhận': 'Orders awaiting confirmation', 'Quản lý đơn thuê': 'Manage rentals', 'Đang hoạt động': 'Active', 'Lịch sử': 'History', 'Chưa có đơn nào': 'No orders yet',
    'Chờ xác nhận': 'Pending', 'Hoàn tất': 'Done', 'Đã từ chối': 'Declined', 'Từ chối': 'Decline', 'Xác nhận': 'Confirm', 'Khách:': 'Renter:',
    'Đăng xe mới': 'Post a new bike', 'Thông tin xe ': 'Bike info', 'Giá & hình thức': 'Price & method', 'Tên xe': 'Bike name', 'Loại xe': 'Bike type', 'Tình trạng xe': 'Bike condition', 'Tốt, hoạt động ổn định': 'Good, runs reliably', 'Ảnh xe': 'Photos', 'Mẹo: ảnh đẹp giúp tăng tỷ lệ thuê xe. Ảnh rõ nét, không mờ, không chỉnh sửa quá đà.': 'Tip: good photos increase bookings. Use sharp, unedited pictures.',
    'Hình thức cho thuê': 'Rental method', 'Bạn có thể chọn 1 hoặc cả 2 hình thức.': 'You can choose one or both methods.', 'Khách đến lấy xe tại địa điểm của bạn': 'Renter picks up at your location', 'Phí giao: 1–3km 40.000đ · trên 3km 60.000đ': 'Delivery fee: 1–3km 40,000đ · over 3km 60,000đ', 'Phí giao xe do iGo quy định: 1–3km': 'Delivery fee set by iGo: 1–3km', ', trên 3km': ', over 3km',
    'Lịch cho thuê': 'Rental calendar', 'Chọn kiểu rồi chạm vào ngày để áp dụng.': 'Pick a mode, then tap days to apply.', 'Tự lấy': 'Self pickup', 'Không cho thuê': 'Unavailable', 'Cả hai': 'Both', 'Cả tháng': 'Whole month', 'Thứ 2–Thứ 6': 'Mon–Fri', 'Cuối tuần': 'Weekends', 'Có cho thuê (tự lấy)': 'Available (self pickup)', 'Có cho thuê (giao tận nơi)': 'Available (delivery)',
    'Thiết lập giá': 'Set price', 'Giá thuê (1 ngày) – tự đặt giá': 'Daily price – set your own', 'Giá gợi ý giúp xe dễ được thuê hơn. Bạn có thể đặt giá tùy ý và đổi lại sau.': 'A suggested price helps your bike get booked. You can set any price and change it later.', 'Tỉnh / Thành phố': 'Province / City', 'Quận / Huyện': 'District', 'Địa chỉ nhận xe (số nhà, đường)': 'Pickup address (street)', 'Mô tả (tùy chọn)': 'Description (optional)', 'Xe êm, tiết kiệm xăng, phù hợp đi làm, đi lại…': 'Smooth, fuel-efficient, great for commuting…',
    'Giờ nhận xe từ': 'Pickup from', 'Trả muộn nhất': 'Latest return', 'Đặt cọc': 'Deposit', 'Chạm để bật / tắt tiện nghi': 'Tap to toggle amenities', 'Tiện nghi khác': 'Other amenities', 'VD: Tặng khăn trùm đầu': 'e.g. Free head scarf', 'Mục "Giao xe tận nơi" lấy theo hình thức cho thuê đã chọn ở bước trước.': 'The "Delivery" item follows the rental method chosen earlier.',
    'Hợp đồng cho thuê xe': 'Rental agreement', 'Hợp đồng cho thuê xe iGo': 'iGo bike rental agreement', 'Xe': 'Bike', 'Hình thức': 'Method', 'Số ngày mở cho thuê': 'Days open for rent', 'Phân chia trách nhiệm hai bên': 'Responsibilities of both parties', 'Quy định hủy / hoàn tiền': 'Cancellation / refund rules', 'Bảo hiểm (nếu có)': 'Insurance (if any)', 'Cam kết tình trạng xe': 'Bike condition commitment',
    'Tôi đã đọc và đồng ý với các điều khoản': 'I have read and agree to the terms', 'Xác nhận & đăng bài': 'Confirm & publish', 'Đăng bài thành công!': 'Posted successfully!', 'Bài đăng của bạn đã hiển thị cho khách thuê.': 'Your listing is now visible to renters.', 'Xem bài đăng của tôi': 'View my listings', 'Đã hiển thị cho khách thuê.': 'is now visible to renters.', 'đã hiển thị cho khách thuê.': 'is now visible to renters.', 'Đăng bài thành công': 'Listing published',
    'Đang thuê ': 'Renting', 'Thông báo ': 'Notifications',
    /* toast / thông báo lỗi */
    'Vui lòng nhập họ và tên': 'Please enter your full name', 'Số điện thoại chưa hợp lệ': 'Invalid phone number', 'Số điện thoại / email chưa hợp lệ': 'Invalid phone / email', 'Mật khẩu tối thiểu 6 ký tự': 'Password must be at least 6 characters', 'Hãy đồng ý Điều khoản & Chính sách': 'Please accept the Terms & Policy',
    'Đăng nhập thành công': 'Logged in successfully', 'Xác thực thành công': 'Verified successfully', 'Đã gửi lại mã (demo: nhập 6 số bất kỳ)': 'Code resent (demo: enter any 6 digits)', 'Đăng xuất khỏi iGo?': 'Log out of iGo?', 'Xóa toàn bộ dữ liệu demo?': 'Delete all demo data?',
    'Nhập địa chỉ giao xe': 'Enter the delivery address', 'Xe không rảnh trong khoảng ngày này': 'Bike unavailable in this period', 'Cần xác nhận bằng lái xe trước khi thanh toán': 'Verify your license before paying', 'Vui lòng chọn lý do hủy đơn': 'Please choose a cancellation reason', 'Cảm ơn bạn đã đánh giá!': 'Thanks for your review!',
    'Đã xác nhận nhận xe': 'Pickup confirmed', 'Đã chuyển sang Chủ xe': 'Switched to Owner', 'Đã chuyển sang Người thuê': 'Switched to Renter', 'Đã lưu thông tin': 'Information saved', 'Email chưa hợp lệ': 'Invalid email', 'Số GPLX gồm 9–12 chữ số': 'License number must be 9–12 digits', 'Cần ảnh mặt trước và mặt sau bằng lái': 'Front and back license photos are required', 'Đã xác nhận bằng lái xe': 'License verified',
    'Cần đủ ảnh mặt trước, mặt sau và selfie': 'Front, back and selfie photos are required', 'Xác minh thành công!': 'Verification successful!', 'Nhập tên xe (VD: Honda Wave 110)': 'Enter bike name (e.g. Honda Wave 110)', 'Nhập biển số xe': 'Enter plate number', 'Cần ít nhất 3 ảnh xe': 'At least 3 photos are required', 'Tối đa 6 ảnh': 'Up to 6 photos', 'Chọn ít nhất 1 hình thức cho thuê': 'Choose at least 1 rental method', 'Chọn ít nhất 1 ngày cho thuê': 'Choose at least 1 rental day',
    'Giá thuê tối thiểu 10.000đ': 'Minimum price is 10,000đ', 'Nhập tên tiện nghi': 'Enter an amenity name', 'Tối đa 8 tiện nghi khác': 'Up to 8 other amenities', 'Giờ trả muộn nhất phải sau giờ nhận xe': 'Latest return must be after pickup time', 'Hãy xác nhận đã đọc và đồng ý điều khoản': 'Please confirm you agree to the terms', 'Đã hiện bài đăng': 'Listing shown', 'Đã ẩn bài đăng': 'Listing hidden', 'Xóa bài đăng này?': 'Delete this listing?',
    'Đã xác nhận đơn': 'Order confirmed', 'Đơn đã hoàn tất': 'Order completed', 'Đã từ chối đơn': 'Order declined', 'Tính năng sẽ sớm có mặt': 'Coming soon', 'Bộ nhớ đầy – hãy dùng ảnh nhỏ hơn': 'Storage full – use smaller photos', 'Không tìm thấy': 'Not found', 'Xe không còn tồn tại': 'This bike no longer exists', '(Xe đã gỡ)': '(Bike removed)',
    /* lịch */
    'T2': 'Mon', 'T3': 'Tue', 'T4': 'Wed', 'T5': 'Thu', 'T6': 'Fri', 'T7': 'Sat', 'CN': 'Sun',
    /* tên riêng thường gặp */
    'Nguyễn Văn An': 'Nguyen Van An', 'Trần Thị Bình': 'Tran Thi Binh', 'Lê Minh Cường': 'Le Minh Cuong'
  };
  const plural = (n, w) => n + ' ' + w + (+n === 1 ? '' : 's');
  const RULES = [
    [/^Tháng (\d+)\/(\d+)$/, (m, y) => MONTHS[m - 1] + ' ' + y],
    [/^(\d+) ngày$/, n => plural(n, 'day')],
    [/^(\d+) ngày\)$/, n => plural(n, 'day') + ')'],
    [/^\((\d+) xe\)$/, n => '(' + plural(n, 'bike') + ')'],
    [/^\((\d+) ngày\)$/, n => '(' + plural(n, 'day') + ')'],
    [/^Giá thuê \((\d+) ngày\)$/, n => 'Rental price (' + plural(n, 'day') + ')'],
    [/^Bảo hiểm chuyến đi \((\d+) ngày\)$/, n => 'Trip insurance (' + plural(n, 'day') + ')'],
    [/^Giá thuê \($/, () => 'Rental price ('],
    [/^Giảm giá gói \(([\d,]+%)\)$/, p => 'Package discount (' + p + ')'],
    [/^Tiết kiệm ([\d,]+%)$/, p => 'Save ' + p],
    [/^Phí giao xe \((.+)\)$/, p => 'Delivery fee (' + p.replace('trên', 'over') + ')'],
    [/^Đã hủy đơn (#\w+)$/, c => 'Order ' + c + ' cancelled'],
    [/^Cập nhật đơn (#\w+)$/, c => 'Order ' + c + ' updated'],
    [/^Đặt cọc ([\d.]+đ)$/, v => 'Deposit ' + v],
    [/^Đăng nhập bằng (.+)$/, p => 'Logged in with ' + p],
    [/^Gửi lại mã \(00:(\d+)\)$/, s => 'Resend code (00:' + s + ')'],
    [/^Gửi lại mã \(00:$/, () => 'Resend code (00:'],
    [/^Thanh toán ([\d.]+đ)$/, v => 'Pay ' + v],
    [/^Gợi ý cho (.+): ([\d]+k – [\d]+k)\/ngày$/, (t, r) => 'Suggested for ' + t + ': ' + r + '/day'],
    [/^(\d+)\/6 · tối thiểu 3\)$/, n => n + '/6 · min 3)'],
    [/^\((\d+)\/6 · tối thiểu 3\)$/, n => '(' + n + '/6 · min 3)'],
    [/^Hướng dẫn thuê xe \((.+)\)$/, x => 'How to rent (' + x + ')'],
    [/^Số GPLX (\d+) · Hạng (\w+)$/, (n, c) => 'License no. ' + n + ' · Class ' + c],
    [/^Đơn (#\w+) – (.+) đã được ghi nhận\.$/, (c, b) => 'Order ' + c + ' – ' + b + ' has been recorded.'],
    [/^Đã hủy đơn (#\w+)$/, c => 'Order ' + c + ' cancelled'],
    [/^Xe (.+) đã hiển thị cho khách thuê\.$/, b => b + ' is now visible to renters.'],
    [/^(.+) đã hiển thị cho khách thuê\.$/, b => b + ' is now visible to renters.'],
    [/^Giá từ$/, () => 'From'],
    [/^Giao xe tận nơi \(từ ([\d.]+đ)\)$/, v => 'Delivery available (from ' + v + ')'],
    [/^Đang thuê \((\d+)\)$/, n => 'Renting (' + n + ')'],
    [/^\((\d+)\) Đang hoạt động$/, n => '(' + n + ') Active'],
    [/^\((\d+)\) Lịch sử$/, n => '(' + n + ') History'],
    [/^⇄ (.+)$/, x => '⇄ ' + tr(x)],
    [/^(.+) ✓$/, x => tr(x) + ' ✓'],
    [/^(.+)\/ngày$/, x => x + '/day'],
    [/^lúc (\S+) ngày (\S+)\.$/, (t, d) => 'at ' + t + ' on ' + d + '.'],
    [/^Lý do: (.+)$/, x => 'Reason: ' + tr(x)],
    [/^Khách: (.+)$/, x => 'Renter: ' + x],
    [/^Giờ nhận: (\S+) — Trả muộn nhất (\S+)$/, (a, b) => 'Pickup from ' + a + ' — latest return ' + b],
    [/^Tại địa điểm của chủ xe \((.+)\)$/, x => "At the owner's location (" + x + ')'],
    [/^Giá thuê \((\d+) ngày\)$/, n => 'Rental price (' + plural(n, 'day') + ')']
  ];
  Object.assign(EN, {
    'Đã đọc tất cả': 'Mark all as read', 'Địa chỉ giao xe': 'Delivery address', 'Máy êm, tiết kiệm xăng': 'Quiet and fuel-efficient', 'Sơn đẹp, bảo dưỡng định kỳ': 'Nice paint, regularly serviced',
    'Chạy ổn định, phanh tốt': 'Runs steadily, good brakes', 'Nhỏ gọn, dễ đi phố': 'Compact, easy in the city', 'Giờ nhận': 'Pickup', 'Trả': 'Return'
  });
  const HAS_VI = /[À-ỹà-ỹĐđ]/;
  const lang = () => (typeof S !== 'undefined' && S.lang) || 'vi';
  const missing = window.__missing = new Set();

  function tr(s) {
    if (s == null) return s;
    const str = String(s), k = str.trim();
    if (!k || !HAS_VI.test(k)) return str;
    const one = x => {
      if (EN[x] !== undefined) return EN[x];
      for (const [re, f] of RULES) { const m = x.match(re); if (m) return f(...m.slice(1)); }
      return undefined;
    };
    let r = one(k);
    if (r === undefined && /[.!?]\s/.test(k)) {
      const parts = k.split(/(?<=[.!?])\s+/), out = parts.map(p => one(p.trim()));
      if (out.every(x => x !== undefined)) r = out.join(' ');
    }
    if (r === undefined) { r = k.replace(/\d{1,3}(?:\.\d{3})+(?=đ)/g, m => m.replace(/\./g, ',')); if (/[À-ỹà-ỹĐ]|đ(?!\/)/.test(r.replace(/\d+đ|\d+k/g, ''))) missing.add(k); return str.replace(k, r); }
    return str.replace(k, r.replace(/\d{1,3}(?:\.\d{3})+(?=đ)/g, m => m.replace(/\./g, ',')));
  }
  window.tr = s => lang() === 'en' ? tr(s) : s;

  function node(n) {
    if (n.nodeType === 3) {
      if (n.__o === undefined) { if (lang() !== 'en') return; const t = tr(n.nodeValue); if (t !== n.nodeValue) { n.__o = n.nodeValue; n.nodeValue = t; } }
      else if (lang() === 'en') { const t = tr(n.__o); if (n.nodeValue !== t) n.nodeValue = t; }
      else { n.nodeValue = n.__o; n.__o = undefined; }
    } else if (n.nodeType === 1) {
      for (const a of ['placeholder', 'title', 'aria-label']) {
        if (!n.hasAttribute(a)) continue;
        const key = 'data-o-' + a;
        if (lang() === 'en') { const o = n.hasAttribute(key) ? n.getAttribute(key) : n.getAttribute(a); const t = tr(o); if (t !== o) { n.setAttribute(key, o); n.setAttribute(a, t); } }
        else if (n.hasAttribute(key)) { n.setAttribute(a, n.getAttribute(key)); n.removeAttribute(key); }
      }
      if (n.tagName === 'OPTION' && n.hasAttribute('value') && n.parentNode && n.parentNode.tagName === 'DATALIST') return;
    }
  }
  function walk(root) {
    node(root);
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) node(n);
  }
  window.i18nApply = root => walk(root || document.body);

  const obs = new MutationObserver(ms => { if (lang() !== 'en') return; for (const m of ms) m.addedNodes.forEach(n => walk(n)); });
  window.setLang = l => {
    S.lang = l; save();
    document.documentElement.lang = l;
    walk(document.body);
    document.title = l === 'en' ? 'iGo – Motorbike rental made easy' : 'iGo – Thuê xe máy, dễ dàng';
  };
  window.i18nStart = () => { obs.observe(document.body, { childList: true, subtree: true }); document.documentElement.lang = lang(); if (lang() === 'en') { walk(document.body); document.title = 'iGo – Motorbike rental made easy'; } };
  const oc = window.confirm.bind(window); window.confirm = m => oc(window.tr(m));
})();
