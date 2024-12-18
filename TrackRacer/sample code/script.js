// script.js
document.addEventListener("DOMContentLoaded", () => {
    const mascot = document.querySelector('.mascot');
    let position = 0; // ตำแหน่งปัจจุบันของ Mascot
    const stepSize = 50; // ระยะที่เดินต่อก้าว (เป็นหน่วย px)
  
    function moveMascot() {
      // เพิ่มตำแหน่ง
      position += stepSize;
  
      // อัปเดตตำแหน่งของ Mascot
      mascot.style.left = `${position}px`;
  
      // ตรวจสอบว่าหลุดขอบหรือไม่
      const containerWidth = document.querySelector('.container').clientWidth;
      if (position >= containerWidth) {
        position = 0; // กลับไปเริ่มต้นทางซ้าย
      }
    }
  
    // ตั้งเวลาให้ทำงานทุก 30 นาที (30 * 60 * 1000 ms)
    //setInterval(moveMascot, 30 * 60 * 1000);
    setInterval(moveMascot, 1000);

  });
  
