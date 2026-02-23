export const mockData = {
    // Centralized Job Store with Month/Year derived from date
    jobs:     [
        {
            "id": "AUTO1",
            "jobNo": 1,
            "client": "kim luyến",
            "date": "2026-01-04",
            "phone": "",
            "venue": "",
            "package": 0,
            "deposit": 0,
            "status": "Mới",
            "eventType": "",
            "isTrash": false,
            "visibility": true,
            "timeline": {
                "le": "",
                "tiec": "",
                "type": "both"
            },
            "deliverables": [],
            "services": [
                {
                    "service": "QUAY PS",
                    "staff": "Can quay ps",
                    "cost": 3000000,
                    "paid": false,
                    "edit": 1500000,
                    "date": "2026-01-04"
                },
                {
                    "service": "CHỤP PS",
                    "staff": "Can quay ps",
                    "cost": 2500000,
                    "paid": false,
                    "edit": 500000,
                    "date": "2026-01-04"
                },
                {
                    "service": "QUAY TT",
                    "staff": "Can quay ps",
                    "cost": 2000000,
                    "paid": false,
                    "edit": 1000000,
                    "date": "2026-01-04"
                },
                {
                    "service": "CHỤP TT",
                    "staff": "Can quay ps",
                    "cost": 1700000,
                    "paid": false,
                    "edit": 300000,
                    "date": "2026-01-04"
                },
                {
                    "service": "TẶNG 100 ẢNH",
                    "staff": "Can quay ps",
                    "cost": 0,
                    "paid": false,
                    "edit": 0,
                    "date": "2026-01-04"
                }
            ]
        }
    ],
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
