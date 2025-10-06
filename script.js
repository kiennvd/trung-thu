// Biến toàn cục
let originalMessages = [];
let currentMessages = [];
const lanternImages = [];
let maxLanterns = window.innerWidth < 600 ? 15 : 30;
let lanternInterval = null;
let song; // Khai báo song ở global scope

// Khởi tạo messages
function initializeMessages() {
    originalMessages = [
        { text: "Chúc bạn Trung thu bình yên, dẫu mưa hay gió vẫn có những niềm vui nhỏ len lỏi trong lòng", img: "./img/YN1.jpg" },
        { text: "Trung thu trăng không cần thật tròn, chỉ cần bạn luôn giữ được nụ cười và niềm tin vào những điều tốt đẹp.", img: "./img/YN2.jpg" },
        { text: "Mong bạn học giỏi hơn mỗi ngày, bước đi vững vàng trên con đường mà bạn đã chọn.", img: "./img/YN3.jpg" },
        { text: "Trung thu là để nhớ về những điều trong sáng — mong lòng bạn cũng luôn trong trẻo như ánh đèn đêm nay.", img: "./img/YN4.jpg" },
        { text: "Hy vọng tương lai bạn đi qua sẽ ngập tràn ánh sáng, và luôn có người tốt bên cạnh giúp đỡ.", img: "./img/YN5.jpg" },
        { text: "Mong mọi ước mơ của bạn đều sớm thành hiện thực, dù là nhỏ bé nhất", img: "./img/YN6.jpg" },
        { text: "Trung thu này, chúc bạn an nhiên, tự tin, và luôn tin rằng ngày mai sẽ tốt hơn hôm nay.", img: "./img/YN7.jpg" },
        { text: "Ước rằng mọi điều tốt đẹp sẽ đến với bạn — bình yên trong tâm, hạnh phúc trong lòng, và thành công trên từng bước đi.", img: "./img/YN8.jpg" }
    ];
    currentMessages = [...originalMessages];
}

// Hàm xem lại lời chúc
function restartMessages() {
    currentMessages = [...originalMessages];
    closeLastPopup();
    setTimeout(() => createLantern(), 500);
}

// Tạo sao - TỐI ƯU CHO ĐIỆN THOẠI
function createStars() {
    const isMobile = window.innerWidth < 600;
    const starCount = isMobile ? 40 : 80;
    const twinkleRatio = isMobile ? 0.2 : 0.3;

    for (let i = 0; i < starCount; i++) {
        let star = document.createElement("div");
        star.className = "star";
        
        if (Math.random() < twinkleRatio) {
            const twinkleTypes = ['twinkle-slow', 'twinkle-medium'];
            const randomType = twinkleTypes[Math.floor(Math.random() * twinkleTypes.length)];
            star.classList.add(randomType);
            star.style.animationDelay = `${Math.random() * 25}s`;
        }
        
        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        const size = isMobile ? (Math.random() * 1 + 0.8) : (Math.random() * 1.2 + 1);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        document.body.appendChild(star);
    }
}

// Tạo mây
function createClouds() {
    const cloudsContainer = document.createElement('div');
    cloudsContainer.id = 'cloudsContainer';
    document.body.appendChild(cloudsContainer);
    
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = `cloud cloud-${i+1}`;
        cloud.style.top = `${Math.random() * 40 + 10}%`;
        cloud.style.animationDuration = `${Math.random() * 30 + 40}s`;
        cloud.style.animationDelay = `${Math.random() * 20}s`;
        cloudsContainer.appendChild(cloud);
    }
}

// Tạo lồng đèn
function createLantern() {
    if (document.getElementById("lanternsContainer").querySelectorAll(".lantern").length >= maxLanterns) return;

    let lantern = document.createElement("img");
    lantern.src = lanternImages[Math.floor(Math.random() * lanternImages.length)];
    lantern.className = "lantern";

    lantern.style.left = Math.random() * 85 + "vw";
    lantern.style.setProperty('--x', (Math.random() - 0.5) * 50 + 'vw');
    lantern.style.animationDuration = 10 + Math.random() * 10 + "s";

    lantern.addEventListener("click", handleLanternClick);
    document.getElementById("lanternsContainer").appendChild(lantern);
    lantern.addEventListener("animationend", () => {
        if (lantern.parentNode) {
            lantern.remove();
        }
    });
}

// Xử lý click lồng đèn
function handleLanternClick() {
    if (currentMessages.length === 0) {
        showLastPopup();
    } else {
        let idx = Math.floor(Math.random() * currentMessages.length);
        let randomMsg = currentMessages[idx];
        
        const popupImg = document.getElementById("popupImg");
        popupImg.classList.remove("loaded");
        popupImg.style.opacity = "0";
        
        document.getElementById("popupText").innerText = randomMsg.text;
        popupImg.src = randomMsg.img;
        popupImg.alt = "Lời chúc Trung Thu";
        
        popupImg.onload = function() {
            popupImg.classList.add("loaded");
            popupImg.style.opacity = "1";
            void document.getElementById("popup").offsetWidth;
            setTimeout(() => {
                document.getElementById("popup").classList.add("show");
                document.getElementById("overlay").classList.add("show");
            }, 50);
        };
        
        popupImg.onerror = function() {
            popupImg.classList.add("loaded");
            popupImg.style.opacity = "1";
            setTimeout(() => {
                document.getElementById("popup").classList.add("show");
                document.getElementById("overlay").classList.add("show");
            }, 50);
        };
        
        currentMessages.splice(idx, 1);
    }
}

// Popup functions
function showFirstPopup() {
    document.getElementById("firstPopupText").textContent = "Trung Thu năm nay không có trăng, nhưng vẫn có người âm thầm ước một điều – rằng những năm sau, khi bão qua, trời quang, bạn sẽ đọc lại lời chúc này và mỉm cười. Vì mình vẫn ở đó, chờ ánh trăng dành riêng cho chúng ta.";
    
    void document.getElementById("firstPopup").offsetWidth;
    setTimeout(() => {
        document.getElementById("firstPopup").classList.add("show");
        document.getElementById("overlay").classList.add("show");
    }, 50);
    
    document.getElementById("releaseBtn").style.display = "none";
    document.getElementById("closeFirstPopupBtn").textContent = "Thả đèn";
}

function closeFirstPopup() {
    document.getElementById("firstPopup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
    startLanterns();
}

function showLastPopup() {
    document.getElementById("lastPopupText").textContent = "Cảm ơn bạn đã xem hết điều mình muốn gửi gắm. Mong bạn luôn vui vẻ và hạnh phúc. Nếu có dịp, mình rất muốn cùng bạn đi chơi Trung Thu!";
    
    void document.getElementById("lastPopup").offsetWidth;
    setTimeout(() => {
        document.getElementById("lastPopup").classList.add("show");
        document.getElementById("overlay").classList.add("show");
    }, 50);
}

function closeLastPopup() {
    document.getElementById("lastPopup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

function closePopup() {
    document.getElementById("popup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
    
    const popupImg = document.getElementById("popupImg");
    popupImg.classList.remove("loaded");
    popupImg.style.opacity = "0";
}

// Hiệu ứng trái tim
function showHeartEffect(x, y) {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 1200);
}

// Bắt đầu thả đèn
function startLanterns() {
    document.getElementById("releaseBtn").style.display = "none";
    if (song) {
        song.currentTime = 57;
        song.play().catch(e => console.log("Autoplay blocked:", e));
    }
    lanternInterval = setInterval(() => {
        createLantern();
        if (document.getElementById("lanternsContainer").querySelectorAll(".lantern").length >= maxLanterns) {
            clearInterval(lanternInterval);
        }
    }, 1200);
}

// Preload images
function preloadImages() {
    originalMessages.forEach(msg => {
        const img = new Image();
        img.src = msg.img;
    });
    
    lanternImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo hình ảnh lồng đèn
    for (let i = 1; i <= 9; i++) {
        lanternImages.push(`./img/lantern/ld (${i}).png`);
    }

    // Gán giá trị cho biến song
    song = document.getElementById("bgMusic");

    // Event listeners
    document.getElementById("releaseBtn").addEventListener("click", showFirstPopup);
    document.getElementById("overlay").addEventListener("click", closePopup);

    // Khởi chạy
    createClouds();
    createStars();
    initializeMessages();
    preloadImages();
});