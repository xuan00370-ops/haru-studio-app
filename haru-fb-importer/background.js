// background.js

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.includes("facebook.com")) {
        // 1. Inject script to scrape Facebook
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
    } else {
        // Basic interaction warning if not on FB
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => alert("Haru: Tiện ích này chỉ dùng được trên trang Facebook. Vui lòng mở 1 bài viết Facebook rồi ấn lại nhé!")
        });
    }
});

// Listener to receive data from Facebook content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FB_IMAGES') {
        const importData = message.data;
        const isLocal = false; // Thay thành true nếu muốn test ở localhost
        const haruDomain = isLocal ? "http://localhost:5173" : "https://service.haruweddingfilm.com";

        // 2. Open new tab to Haru App with query param ?fb_import=open
        chrome.tabs.create({ url: `${haruDomain}/?fb_import=open` }, (newTab) => {
            // 3. Wait for the Haru tab to load entirely and then pass data
            const checkTabLoaded = (tabId, changeInfo, tab) => {
                if (tabId === newTab.id && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(checkTabLoaded);

                    // Execute script on Haru Domain to inject data into LocalStorage
                    chrome.scripting.executeScript({
                        target: { tabId: newTab.id },
                        func: (data) => {
                            // Lưu vào localStorage của domain Haru
                            localStorage.setItem('haru_fb_import', JSON.stringify(data));
                            // Kích hoạt 1 Custom Event lên window để UI Haru biết mà bật Modal
                            window.dispatchEvent(new CustomEvent('haruExternalImport', { detail: data }));
                        },
                        args: [importData] // stringify / object
                    });
                }
            };

            chrome.tabs.onUpdated.addListener(checkTabLoaded);
        });
    }
});
