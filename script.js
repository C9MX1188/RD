AOS.init({
  duration: 800, // مدة التأثير الافتراضية
});

let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

// لإظهار الصورة الأولى
showSlide(currentSlide);

// لتغيير الصورة كل فترة
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length; // الانتقال إلى الصورة التالية
  showSlide(currentSlide);
}, 5000); // كل 5 ثوانٍ



setInterval(updateMemberCount, 60000); // تحديث كل دقيقة
updateMemberCount(); // تحديث عند التحميل

