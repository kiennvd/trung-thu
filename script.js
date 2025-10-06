 const starCount = window.innerWidth < 600 ? 80 : 200;
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.opacity = Math.random();
        document.body.appendChild(star);
    }

    const lanternImages = [];
    for (let i = 1; i <= 9; i++) lanternImages.push(`./img/lantern/ld (${i}).png`);

    const messages = [
        { text: "Chúc bạn Trung thu bình yên, dẫu mưa hay gió vẫn có những niềm vui nhỏ len lỏi trong lòng", img: "./img/YN1.jpg" },
        { text: "Trung thu trăng không cần thật tròn, chỉ cần bạn luôn giữ được nụ cười và niềm tin vào những điều tốt đẹp.", img: "./img/YN2.jpg" },
        { text: "Mong bạn học giỏi hơn mỗi ngày, bước đi vững vàng trên con đường mà bạn đã chọn.", img: "./img/YN3.jpg" },
        { text: "Trung thu là để nhớ về những điều trong sáng — mong lòng bạn cũng luôn trong trẻo như ánh đèn đêm nay.", img: "./img/YN4.jpg" },
        { text: "Hy vọng tương lai bạn đi qua sẽ ngập tràn ánh sáng, và luôn có người tốt bên cạnh giúp đỡ.", img: "./img/YN5.jpg" },
        { text: "Mong mọi ước mơ của bạn đều sớm thành hiện thực, dù là nhỏ bé nhất", img: "./img/YN6.jpg" },
        { text: "Trung thu này, chúc bạn an nhiên, tự tin, và luôn tin rằng ngày mai sẽ tốt hơn hôm nay.", img: "./img/YN7.jpg" },
        { text: "Ước rằng mọi điều tốt đẹp sẽ đến với bạn — bình yên trong tâm, hạnh phúc trong lòng, và thành công trên từng bước đi.", img: "./img/YN8.jpg" }
    ];

    const lanternsContainer = document.getElementById("lanternsContainer");
    let maxLanterns = window.innerWidth < 600 ? 15 : 30;
    let lanternInterval = null;

    function createLantern() {
        if (lanternsContainer.querySelectorAll(".lantern").length >= maxLanterns) return;

        let lantern = document.createElement("img");
        lantern.src = lanternImages[Math.floor(Math.random() * lanternImages.length)];
        lantern.className = "lantern";

        let startX = Math.random() * 85;
        lantern.style.left = startX + "vw";

        let driftX = (Math.random() - 0.5) * 50;
        lantern.style.setProperty('--x', driftX + 'vw');

        let duration = 10 + Math.random() * 10;
        lantern.style.animationDuration = duration + "s";

        lantern.addEventListener("click", () => {
            if (messages.length === 0) {
                showLastPopup();
            } else {
                let idx = Math.floor(Math.random() * messages.length);
                let randomMsg = messages[idx];
                
                // QUAN TRỌNG: Reset trạng thái ảnh trước khi update
                const popupImg = document.getElementById("popupImg");
                popupImg.classList.remove("loaded");
                popupImg.style.opacity = "0";
                
                // Update nội dung
                document.getElementById("popupText").innerText = randomMsg.text;
                popupImg.src = randomMsg.img;
                popupImg.alt = "Lời chúc Trung Thu";
                
                // Đợi ảnh load xong rồi mới hiện popup
                popupImg.onload = function() {
                    popupImg.classList.add("loaded");
                    popupImg.style.opacity = "1";
                    
                    // Force reflow để đảm bảo DOM update trước khi show popup
                    void document.getElementById("popup").offsetWidth;
                    
                    // Hiện popup sau khi mọi thứ đã sẵn sàng
                    setTimeout(() => {
                        document.getElementById("popup").classList.add("show");
                        document.getElementById("overlay").classList.add("show");
                    }, 50);
                };
                
                // Fallback nếu ảnh load lỗi
                popupImg.onerror = function() {
                    popupImg.classList.add("loaded");
                    popupImg.style.opacity = "1";
                    setTimeout(() => {
                        document.getElementById("popup").classList.add("show");
                        document.getElementById("overlay").classList.add("show");
                    }, 50);
                };
                
                messages.splice(idx, 1);
            }
        });

        lanternsContainer.appendChild(lantern);
        lantern.addEventListener("animationend", () => lantern.remove());
    }

    const song = document.getElementById("bgMusic");
    document.getElementById("releaseBtn").addEventListener("click", () => {
        showFirstPopup();
    });

    function closePopup() {
        document.getElementById("popup").classList.remove("show");
        document.getElementById("overlay").classList.remove("show");
        
        // Reset ảnh khi đóng popup
        const popupImg = document.getElementById("popupImg");
        popupImg.classList.remove("loaded");
        popupImg.style.opacity = "0";
    }

    document.getElementById("overlay").addEventListener("click", closePopup);

    function showHeartEffect(x, y) {
        let heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    const firstPopup = document.getElementById("firstPopup");
    const firstPopupText = document.getElementById("firstPopupText");
    const lastPopup = document.getElementById("lastPopup");
    const lastPopupText = document.getElementById("lastPopupText");

    function showFirstPopup() {
        firstPopupText.textContent = "Trung Thu năm nay không có trăng, nhưng vẫn có người âm thầm ước một điều – rằng những năm sau, khi bão qua, trời quang, bạn sẽ đọc lại lời chúc này và mỉm cười. Vì mình vẫn ở đó, chờ ánh trăng dành riêng cho chúng ta.";
        
        // Force reflow trước khi show
        void firstPopup.offsetWidth;
        
        setTimeout(() => {
            firstPopup.classList.add("show");
            document.getElementById("overlay").classList.add("show");
        }, 50);
        
        document.getElementById("releaseBtn").style.display = "none";
        document.getElementById("closeFirstPopupBtn").textContent = "Thả đèn";
    }

    function closeFirstPopup() {
        firstPopup.classList.remove("show");
        document.getElementById("overlay").classList.remove("show");
        startLanterns();
    }

    function showLastPopup() {
        lastPopupText.textContent = "Cảm ơn bạn đã xem hết điều mình muốn gửi gắm. Mong bạn luôn vui vẻ và hạnh phúc. Nếu có dịp, mình rất muốn cùng bạn đi chơi Trung Thu!";
        
        // Force reflow trước khi show
        void lastPopup.offsetWidth;
        
        setTimeout(() => {
            lastPopup.classList.add("show");
            document.getElementById("overlay").classList.add("show");
        }, 50);
    }

    function closeLastPopup() {
        lastPopup.classList.remove("show");
        document.getElementById("overlay").classList.remove("show");
    }

    function startLanterns() {
        document.getElementById("releaseBtn").style.display = "none";
        if (song) {
            song.currentTime = 57;
            song.play().catch(e => console.log("Autoplay blocked:", e));
        }
        lanternInterval = setInterval(() => {
            createLantern();
            if (lanternsContainer.querySelectorAll(".lantern").length >= maxLanterns) {
                clearInterval(lanternInterval);
            }
        }, 1200);
    }

    // Preload images để tăng tốc độ hiển thị
    function preloadImages() {
        messages.forEach(msg => {
            const img = new Image();
            img.src = msg.img;
        });
    }

    // Preload images khi trang load
    window.addEventListener('load', preloadImages);