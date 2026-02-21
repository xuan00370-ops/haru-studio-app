export function normalizeServiceName(name) {
    if (!name) return 'Dịch vụ khác';
    const n = name.toLowerCase();
    if (n.includes('quay') && n.includes('ps')) return 'Quay PS';
    if (n.includes('chụp') && n.includes('ps')) return 'Chụp PS';
    if (n.includes('quay') && n.includes('tt')) return 'Quay TT';
    if (n.includes('chụp') && n.includes('tt')) return 'Chụp TT';
    if (n.includes('la vela')) return 'Quay PS (La Vela)';
    return name;
}

export function calculateDeadlines(dateStr) {
    if (!dateStr) return { photo: '-', video: '-' };
    const baseDate = new Date(dateStr);

    const photoDate = new Date(baseDate);
    photoDate.setDate(photoDate.getDate() + 7);

    const videoDate = new Date(baseDate);
    videoDate.setDate(videoDate.getDate() + 20);

    return {
        photo: photoDate.toLocaleDateString('vi-VN'),
        video: videoDate.toLocaleDateString('vi-VN'),
        photoRaw: photoDate,
        videoRaw: videoDate
    };
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(amount || 0).replace('₫', 'đ');
}

export function generateId() {
    return Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Date.now().toString(36).substr(-4).toUpperCase();
}

export function validateJob(job) {
    const errors = [];
    if (!job.client) errors.push('Tên khách hàng không được để trống');
    if (!job.date) errors.push('Ngày tổ chức không được để trống');
    if (!job.services || job.services.length === 0) errors.push('Phải có ít nhất một dịch vụ');
    return errors;
}
