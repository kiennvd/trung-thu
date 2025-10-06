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

        // Giới hạn lantern không tràn màn hình
        let startX = Math.random() * 85; // 0% -> 85%
        lantern.style.left = startX + "vw";

        // random horizontal drift
        let driftX = (Math.random() - 0.5) * 50; // ±25vw
        lantern.style.setProperty('--x', driftX + 'vw');

        let duration = 10 + Math.random() * 10;
        lantern.style.animationDuration = duration + "s";

        lantern.addEventListener("click", () => {
            if (messages.length === 0) {
                showLastPopup();
            } else {
                let idx = Math.floor(Math.random() * messages.length);
                let randomMsg = messages[idx];
                document.getElementById("popupText").innerText = randomMsg.text;
                document.getElementById("popupImg").src = randomMsg.img;
                messages.splice(idx, 1); // Xóa lời chúc đã hiện
                document.getElementById("popup").classList.add("show");
                document.getElementById("overlay").classList.add("show");
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
        firstPopup.classList.add("show");
        document.getElementById("releaseBtn").style.display = "none";
        document.getElementById("closeFirstPopupBtn").textContent = "Thả đèn";
    }

    function closeFirstPopup() {
        firstPopup.classList.remove("show");
        startLanterns();
    }

    function showLastPopup() {
        lastPopupText.textContent = "Cảm ơn bạn đã xem hết điều mình muốn gửi gắm. Mong bạn luôn vui vẻ và hạnh phúc. Nếu có dịp, mình rất muốn cùng bạn đi chơi Trung Thu!";
        lastPopup.classList.add("show");
    }

    function closeLastPopup() {
        lastPopup.classList.remove("show");
    }

    function startLanterns() {
        document.getElementById("releaseBtn").style.display = "none";
        song.currentTime = 57;
        song.play();
        lanternInterval = setInterval(() => {
            createLantern();
            if (lanternsContainer.querySelectorAll(".lantern").length >= maxLanterns) {
                clearInterval(lanternInterval);
            }
        }, 1200);
    }