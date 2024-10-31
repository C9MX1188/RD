
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
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




// تهيئة Swiper
const swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 10000, // تغيير الصورة كل 10 ثواني
  },
});

// العناصر الخاصة بالصور
const images = document.querySelectorAll(".slider-image");
let currentIndex = 0;

// عرض الصورة الأولى عند بدء التحميل
images[currentIndex].classList.add("active");

// وظيفة لتغيير الصورة يدويًا
function changeImage(next = true) {
  // إخفاء الصورة الحالية
  images[currentIndex].classList.remove("active");

  // تحديث الفهرس لعرض الصورة التالية أو السابقة
  if (next) {
    currentIndex = (currentIndex + 1) % images.length;
  } else {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  // عرض الصورة الجديدة
  images[currentIndex].classList.add("active");
}

// إضافة حدث النقر على زر التالي
document.querySelector(".swiper-button-next").addEventListener("click", () => {
  changeImage();
  swiper.slideNext();
});

// إضافة حدث النقر على زر السابق
document.querySelector(".swiper-button-prev").addEventListener("click", () => {
  changeImage(false);
  swiper.slidePrev();
});

// تغيير الصورة تلقائيًا كل 10 ثوانٍ
setInterval(() => {
  changeImage();
  swiper.slideNext();
}, 10000);
