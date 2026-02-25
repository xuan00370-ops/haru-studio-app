// content.js - Chạy trên Facebook

(function () {
    const images = Array.from(document.querySelectorAll('img'));

    // Facebook thường dùng thẻ img, chúng ta chỉ lấy file có định dạng hợp lệ hoặc đủ lớn
    const validImages = images.filter(img => {
        // Bỏ qua icon siêu nhỏ của FB
        const isBig = img.naturalWidth > 150 && img.naturalHeight > 150;
        const isSrcFB = img.src.includes('scontent') || img.src.includes('fbcdn');
        return isBig && isSrcFB && !img.src.includes('emoji');
    }).map(img => img.src);

    // Xóa trùng lặp src
    const uniqueImages = [...new Set(validImages)];

    if (uniqueImages.length === 0) {
        alert("Haru Importer: Không tìm thấy bức ảnh (đủ lớn) nào trong trang này. Vui lòng thử click mở hẳn ảnh lên hoặc trượt trang để FB load ảnh.");
        return;
    }

    // Cố gắng tìm nội dung text post (Dựa vào thẻ div có data-ad-preview)
    let description = document.title;
    const postTextEls = document.querySelectorAll('div[data-ad-preview="message"]');
    if (postTextEls && postTextEls.length > 0) {
        description = postTextEls[0].innerText || postTextEls[0].textContent;
    }

    // Đẩy về background
    chrome.runtime.sendMessage({
        type: 'FB_IMAGES',
        data: {
            url: window.location.href,
            description: description,
            images: uniqueImages
        }
    });
})();
