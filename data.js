export const mockData = {
    // Centralized Job Store with Month/Year derived from date
    jobs: [
        // --- JANUARY 2026 ---
        {
            id: '59T7',
            jobNo: 1,
            client: 'Hà Mi',
            date: '2026-01-18',
            phone: '0901234567',
            venue: '797 Xô Viết Nghệ Tĩnh P26 Q Bình Thạnh / Capella ParkView',
            package: 20400000,
            deposit: 4080000,
            status: 'Đã hoàn thành',
            eventType: 'Lễ Tiệc truyền thống',
            isTrash: false,
            visibility: true,
            timeline: { le: '05:00', tiec: '18:00', type: 'both' },
            deliverables: [
                { title: 'Google Drive', link: 'https://drive.google.com/...' },
                { title: 'Gallery', link: 'https://gallery.haru.vn/...' }
            ],
            services: [
                { service: 'QUAY PS', staff: 'CAN', cost: 3000000, paid: true, edit: 500000, date: '2026-01-18' },
                { service: 'QUAY TT', staff: 'HIẾU', cost: 2000000, paid: true, edit: 1000000, date: '2026-01-18' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: true, edit: 500000, date: '2026-01-18' },
                { service: 'CHỤP TT', staff: 'BÌNH', cost: 1700000, paid: true, edit: 300000, date: '2026-01-18' }
            ]
        },
        {
            id: '004T1',
            jobNo: 2,
            client: 'Phương Linh',
            date: '2026-01-17',
            phone: '0987654321',
            venue: 'GEM CENTER, Quận 1',
            package: 13000000,
            deposit: 2600000,
            status: 'Đã hoàn thành',
            eventType: 'Tiệc tối tại nhà hàng',
            isTrash: false,
            visibility: true,
            timeline: { le: '08:00', tiec: '11:00', type: 'both' },
            deliverables: [],
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: true, edit: 1500000, date: '2026-01-17' },
                { service: 'CHỤP PS', staff: 'TUẤN ANH', cost: 2500000, paid: true, edit: 500000, date: '2026-01-17' },
                { service: 'CHỤP TT', staff: 'LONG', cost: 1700000, paid: true, edit: 300000, date: '2026-01-17' }
            ]
        },

        // --- FEBRUARY 2026 ---
        {
            id: '87T11',
            jobNo: 1,
            client: 'Mai Nguyễn',
            date: '2026-02-06',
            phone: '0762722931',
            venue: '134 Trần Văn Dư, Quận Tân Bình, TPHCM',
            package: 4000000,
            deposit: 800000,
            status: 'Nhận feedback',
            eventType: 'Lễ dạm ngõ + Tiệc tại nhà',
            isTrash: false,
            visibility: true,
            timeline: { le: '05:00', tiec: '09:30', type: 'le' },
            deliverables: [],
            services: [
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: true, edit: 500000, date: '2026-02-06' }
            ]
        },
        {
            id: '85T11',
            jobNo: 4,
            client: 'Minh Trí',
            date: '2026-02-07',
            phone: '0932813131',
            venue: '139 Lý Chính Thắng, Quận 3 / 4S Linh Đông, Thủ Đức',
            package: 17000000,
            deposit: 3400000,
            status: 'Nhận feedback',
            eventType: 'Lễ xuất giá + Tiệc nhà hàng',
            isTrash: false,
            visibility: true,
            timeline: { le: '05:00', tiec: '09:30', type: 'both' },
            deliverables: [],
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: true, edit: 1500000, date: '2026-02-07' },
                { service: 'QUAY PS', staff: 'BÌNH', cost: 3000000, paid: true, edit: 1500000, date: '2026-02-07' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: true, edit: 800000, date: '2026-02-07' },
                { service: 'CHỤP TT', staff: 'NGỌC TUYỀN', cost: 1700000, paid: true, edit: 0, date: '2026-02-07' }
            ]
        },
        {
            id: '86T11',
            jobNo: 2,
            client: 'Phương Chi',
            date: '2026-02-08',
            phone: '0901139195',
            venue: '52/3 TX38 Thạnh Xuân, Quận 12, TP HCM',
            package: 8500000,
            deposit: 1700000,
            status: 'Chưa gửi',
            eventType: 'Quay phim phóng sự cưới',
            isTrash: false,
            visibility: true,
            timeline: { le: '05:00', tiec: '18:00', type: 'both' },
            deliverables: [],
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: false, edit: 1500000, date: '2026-02-08' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: false, edit: 500000, date: '2026-02-08' }
            ]
        },
        {
            id: '99M3',
            jobNo: 1,
            client: 'Thùy Dương (DEMO 30D)',
            date: '2026-03-22',
            phone: '0933445566',
            venue: 'InterContinental Saigon',
            package: 25000000,
            deposit: 5000000,
            status: 'Sắp diễn ra',
            eventType: 'Wedding Luxury',
            isTrash: false,
            visibility: true,
            timeline: { le: '04:00', tiec: '18:30', type: 'both' },
            deliverables: [],
            services: [
                { service: 'QUAY PS', staff: 'CAN', cost: 3000000, paid: false, edit: 100000, date: '2026-03-22' }
            ]
        },
        // --- MARCH 2026 ---
        {
            id: 'M01',
            jobNo: 1,
            client: 'Bích An Haruwedding',
            date: '2026-03-01',
            phone: '0906347428',
            venue: 'Nhà hàng Hương Cau 2, 86 Tân Canh',
            package: 3000000,
            deposit: 0,
            status: 'Sắp diễn ra',
            eventType: 'Thôi nôi',
            isTrash: false,
            visibility: true,
            timeline: { le: '17:00', tiec: '17:00', type: 'le' },
            services: [
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: false, edit: 500000, date: '2026-03-01' }
            ]
        },
        {
            id: 'M08',
            jobNo: 2,
            client: 'Hoàng Nhật Sinh',
            date: '2026-03-08',
            phone: '0909109960',
            venue: 'Hiệp Thành 13, Q12 / Nhơn Trạch, Đồng Nai',
            package: 15000000,
            deposit: 3000000,
            status: 'Sắp diễn ra',
            eventType: 'Đám cưới',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '11:00', type: 'both' },
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: false, edit: 1000000, date: '2026-03-08' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: false, edit: 500000, date: '2026-03-08' },
                { service: 'CHỤP TT', staff: 'BÌNH', cost: 1700000, paid: false, edit: 300000, date: '2026-03-08' }
            ]
        },
        {
            id: 'M14A',
            jobNo: 3,
            client: 'Vy Phạm',
            date: '2026-03-14',
            phone: '0983082810',
            venue: 'Studio / Ngoại cảnh',
            package: 5000000,
            deposit: 1000000,
            status: 'Sắp diễn ra',
            eventType: 'Pre-wedding',
            isTrash: false,
            visibility: true,
            timeline: { le: '08:00', tiec: '08:00', type: 'le' },
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: false, edit: 1000000, date: '2026-03-14' }
            ]
        },
        {
            id: 'M14B',
            jobNo: 4,
            client: 'Duyên',
            date: '2026-03-14',
            phone: '0989499084',
            venue: '80 Lãnh Binh Thăng / La Vela',
            package: 22000000,
            deposit: 4400000,
            status: 'Sắp diễn ra',
            eventType: 'Đám cưới',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '18:00', type: 'both' },
            services: [
                { service: 'QUAY PS', staff: 'XUÂN', cost: 3000000, paid: false, edit: 1000000, date: '2026-03-14' },
                { service: 'CHỤP PS', staff: 'HIẾU', cost: 2500000, paid: false, edit: 500000, date: '2026-03-14' },
                { service: 'CHỤP TT', staff: 'BÌNH', cost: 1700000, paid: false, edit: 300000, date: '2026-03-14' }
            ]
        },
        {
            id: 'M10',
            jobNo: 5,
            client: 'Vân Hồ (Lễ)',
            date: '2026-03-10',
            phone: '0349347261',
            venue: '25/63/1 đường số 6, Hiệp Bình',
            package: 6500000,
            deposit: 1300000,
            status: 'Sắp diễn ra',
            eventType: 'Đám cưới (Lễ)',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '11:00', type: 'le' },
            services: [
                { service: 'QUAY PS', staff: 'XUÂN', cost: 3000000, paid: false, edit: 800000, date: '2026-03-10' },
                { service: 'CHỤP PS', staff: 'HÙNG', cost: 2500000, paid: false, edit: 500000, date: '2026-03-10' }
            ]
        },
        {
            id: 'M15',
            jobNo: 6,
            client: 'Vân Hồ (Tiệc)',
            date: '2026-03-15',
            phone: '0349347261',
            venue: 'Le Jardin - 195 Quốc Lộ 13',
            package: 7500000,
            deposit: 1500000,
            status: 'Sắp diễn ra',
            eventType: 'Đám cưới (Tiệc)',
            isTrash: false,
            visibility: true,
            timeline: { le: '17:00', tiec: '18:00', type: 'tiec' },
            services: [
                { service: 'QUAY PS', staff: 'TIẾN', cost: 3000000, paid: false, edit: 800000, date: '2026-03-15' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: false, edit: 500000, date: '2026-03-15' }
            ]
        },
        {
            id: 'M22',
            jobNo: 7,
            client: 'Trần Thư',
            date: '2026-03-22',
            phone: '0379900566',
            venue: 'Phan Huy Ích, HCM / Suối Cát, Đồng Nai',
            package: 12000000,
            deposit: 2400000,
            status: 'Sắp diễn ra',
            eventType: 'Lễ gia tiên 2 nhà',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '11:00', type: 'both' },
            services: [
                { service: 'QUAY PS', staff: 'XUÂN', cost: 3000000, paid: false, edit: 1000000, date: '2026-03-22' },
                { service: 'CHỤP PS', staff: 'TRỐNG', cost: 2500000, paid: false, edit: 500000, date: '2026-03-22' },
                { service: 'CHỤP TT', staff: 'BÌNH', cost: 1700000, paid: false, edit: 300000, date: '2026-03-22' }
            ]
        },
        {
            id: 'M29',
            jobNo: 8,
            client: 'Ngọc Châu',
            date: '2026-03-29',
            phone: '0797718270',
            venue: 'Linh Xuân, HCM / Thủ Đức',
            package: 15000000,
            deposit: 3000000,
            status: 'Sắp diễn ra',
            eventType: 'Đám cưới',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '11:00', type: 'both' },
            services: [
                { service: 'QUAY PS', staff: 'XUÂN', cost: 3000000, paid: false, edit: 1000000, date: '2026-03-29' },
                { service: 'CHỤP PS', staff: 'NGỌC TUYỀN', cost: 2500000, paid: false, edit: 500000, date: '2026-03-29' }
            ]
        },
        // --- APRIL 2026 ---
        {
            id: '009T2',
            jobNo: 9,
            client: 'Hoàng Nam',
            date: '2026-04-26',
            phone: '0932813131',
            venue: '49 tổ 2, ấp 3, Vĩnh Cửu, Đồng Nai, Việt Nam',
            address: '49 tổ 2, ấp 3, Vĩnh Cửu, Đồng Nai',
            package: 18500000,
            deposit: 5000000,
            status: 'Sắp diễn ra',
            eventType: 'Lễ cưới',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '11:00', type: 'both' },
            notes: 'CD: Trần Thị Minh Ngọc 0762722931 · CR: Nguyễn Hoàng Nam 0932813131 · xe thống 500k · l2: 10 củ · gửi demo',
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: false, edit: 800000, date: '2026-04-26' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: false, edit: 500000, date: '2026-04-26' },
                { service: 'CHỤP TT', staff: 'BÌNH', cost: 1500000, paid: false, edit: 0, date: '2026-04-26' }
            ]
        },
        // --- MAY 2026 ---
        {
            id: '73T9',
            jobNo: 10,
            client: 'Thu Minh',
            date: '2026-05-16',
            phone: '0335276418',
            venue: '162/88 Nguyễn Văn Lượng, P17, Q.Gò Vấp / NHÀ HÀNG HƯƠNG PHỐ, A12 Phan Văn Trị, P.Hạnh Thông',
            address: '162/88 Nguyễn Văn Lượng, P17, Q.Gò Vấp',
            package: 20000000,
            deposit: 4000000,
            status: 'Sắp diễn ra',
            eventType: 'Lễ sáng tiệc trưa',
            isTrash: false,
            visibility: true,
            timeline: { le: '06:00', tiec: '11:00', type: 'both' },
            notes: 'CD: PHẠM THU MINH · CR: NGUYỄN VĂN HOÀNG DƯƠNG 0335276418',
            services: [
                { service: 'QUAY PS', staff: 'THỐNG', cost: 3000000, paid: false, edit: 800000, date: '2026-05-16' },
                { service: 'QUAY PS', staff: 'BÌNH', cost: 3000000, paid: false, edit: 800000, date: '2026-05-16' },
                { service: 'CHỤP PS', staff: 'XUÂN', cost: 2500000, paid: false, edit: 500000, date: '2026-05-16' },
                { service: 'CHỤP TT', staff: 'NGỌC TUYỀN', cost: 1700000, paid: false, edit: 300000, date: '2026-05-16' }
            ]
        },
        {
            id: '003T1b',
            jobNo: 11,
            client: 'Vy Phạm',
            date: '2026-05-16',
            phone: '0983082810',
            venue: '4-13 Lô G, Chung cư Đồng Diều, P.Chánh Hưng / White Palace Võ Văn Kiệt',
            address: 'Chung cư Đồng Diều, P.Chánh Hưng / White Palace Võ Văn Kiệt',
            package: 25000000,
            deposit: 5000000,
            status: 'Sắp diễn ra',
            eventType: 'Sáng gia tiên tối tiệc',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '18:00', type: 'both' },
            notes: 'CD Phạm Lê Nhật Vy 0983082810 · CR Nguyễn Trường Duy 0375106444 · TT lần 2: 3.600k sau quay pre · TT lần 3: 11.400k sau cưới',
            services: [
                { service: 'QUAY PS', staff: 'NHO', cost: 3000000, paid: false, edit: 800000, date: '2026-05-16' },
                { service: 'QUAY TT', staff: '', cost: 2000000, paid: false, edit: 700000, date: '2026-05-16' },
                { service: 'CHỤP PS', staff: 'BẢO', cost: 2500000, paid: false, edit: 500000, date: '2026-05-16' },
                { service: 'CHỤP TT', staff: '', cost: 1700000, paid: false, edit: 300000, date: '2026-05-16' }
            ]
        },
        // --- JUNE 2026 ---
        {
            id: '010T2',
            jobNo: 12,
            client: 'Diệu Nghi Planner',
            date: '2026-06-06',
            phone: '0818797768',
            venue: 'Maison de charm - 793/57/16 Trần Xuân Soạn, P.Tân Hưng, Q7, TP.HCM',
            address: 'Maison de charm, Trần Xuân Soạn, Q7',
            package: 21000000,
            deposit: 4200000,
            status: 'Sắp diễn ra',
            eventType: 'Chi tiệc',
            isTrash: false,
            visibility: true,
            timeline: { tiec: '18:00', type: 'party' },
            notes: 'CR: Đặng Quang Bảo 0818797768 · CD: Tô Thị Ngọc Hương 0971170705',
            services: [
                { service: 'QUAY PS', staff: '', cost: 3000000, paid: false, edit: 800000, date: '2026-06-06' },
                { service: 'QUAY PS', staff: '', cost: 3000000, paid: false, edit: 800000, date: '2026-06-06' },
                { service: 'CHỤP PS', staff: '', cost: 2500000, paid: false, edit: 500000, date: '2026-06-06' },
                { service: 'CHỤP TT', staff: '', cost: 1700000, paid: false, edit: 300000, date: '2026-06-06' }
            ]
        },
        {
            id: '008T2b',
            jobNo: 13,
            client: 'Mỹ Thanh',
            date: '2026-06-20',
            phone: '0562535455',
            venue: '149/9 Lý Thánh Tông, P.Phú Thạnh / Nhà hàng Diamond Âu Cơ',
            address: '149/9 Lý Thánh Tông, P.Phú Thạnh / Diamond Âu Cơ',
            package: 14000000,
            deposit: 2800000,
            status: 'Sắp diễn ra',
            eventType: 'Đám cưới',
            isTrash: false,
            visibility: true,
            timeline: { le: '07:00', tiec: '11:00', type: 'both' },
            notes: 'Mỹ Thanh 0562535455 · Zalo: 09243419030 · CR: Huỳnh Văn Trí · Tặng clip ngắn',
            services: [
                { service: 'QUAY TT', staff: '', cost: 2000000, paid: false, edit: 700000, date: '2026-06-20' },
                { service: 'CHỤP PS', staff: '', cost: 2500000, paid: false, edit: 500000, date: '2026-06-20' },
                { service: 'CHỤP TT', staff: '', cost: 1700000, paid: false, edit: 300000, date: '2026-06-20' }
            ]
        }
    ],
    // Monthly Costs & Metadata
    financeMetadata: {
        '2026-1': { ads: 0, office: 15000000 },
        '2026-2': { ads: 4425000, office: 15000000 },
        '2026-3': { ads: 0, office: 10000000 },
        '2026-4': { ads: 0, office: 0 },
        '2026-5': { ads: 0, office: 0 },
        '2026-6': { ads: 0, office: 0 }
    },
    staff: [
        { id: 1, name: 'XUÂN', role: 'Photo Lead', phone: '0901234567', bank: { no: '001100...', name: 'LE MINH XUAN', bank: 'VCB' } },
        { id: 2, name: 'THỐNG', role: 'Cinema Lead', phone: '0902345678', bank: { no: '123456...', name: 'VAN THONG', bank: 'ACB' } },
        { id: 3, name: 'BÌNH', role: 'Photographer / Asst', phone: '0903456789', bank: { no: '9021...', name: 'QUOC BINH', bank: 'TIMO' } },
        { id: 4, name: 'HIẾU', role: 'Cinema', phone: '0904567890', bank: { no: 'Sacombank...', name: 'TRONG HIEU', bank: 'SCB' } },
        { id: 5, name: 'CAN', role: 'Cinema', phone: '0905671234', bank: { no: 'Techcombank...', name: 'HOANG CAN', bank: 'TCB' } },
        { id: 6, name: 'NGỌC TUYỀN', role: 'Photographer', phone: '', bank: { no: '', name: '', bank: '' } },
        { id: 7, name: 'NHO', role: 'Cinema', phone: '', bank: { no: '', name: '', bank: '' } },
        { id: 8, name: 'BẢO', role: 'Photographer', phone: '', bank: { no: '', name: '', bank: '' } }
    ],
    settings: {
        rates: {
            'QUAY PS': 3000000,
            'CHỤP PS': 2500000,
            'CHỤP TT': 1700000,
            'QUAY TT': 2000000
        }
    }
};
