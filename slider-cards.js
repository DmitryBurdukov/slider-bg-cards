const sliderWrapper = document.querySelector('.slider__wrapper'),
      prevButton = document.querySelector('.prev'),
      nextButton = document.querySelector('.next'),
      opacityLayer = document.querySelector('.slider__opacity-layer'),
      imagesArray = [
        {img: 'https://images.unsplash.com/photo-1530999811698-221aa9eb1739?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         title: "Древний город",
         description: ''
        },
        {img: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         title: "Вид на горы",
         description: ''
        }, 
        {img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         title: "Путешествие по воде",
         description: ''
        }, 
        {img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         title: "Вершина мира",
         description: ''
        },
        {img: 'https://images.unsplash.com/photo-1543443436-bc6deeff2eb5?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: "Вечер на берегу",
        description: ''
       }];
      
let initialSlideIndex,
    interval;

for (let i = 0; i < imagesArray.length; i++) {
    createElements('div', 'slider__item', sliderWrapper, imagesArray[i], initialSlideIndex = 0, i, true);
    createElements('div', 'slider__opacity-item', opacityLayer, imagesArray[i], null, i);
}
const slides = document.querySelectorAll('.slider__item');

nextButton.addEventListener('click', (e) => {clearInterval(interval);changeSlide(++initialSlideIndex, 'next')});
prevButton.addEventListener('click', (e) => {clearInterval(interval);changeSlide(--initialSlideIndex, 'prev')});
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.code === 'ArrowRight') {changeSlide(++initialSlideIndex, 'next')}
});
window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {changeSlide(--initialSlideIndex, 'prev')}
});

function createElements(selector, className, wrapperElememt, data, activeIndex, i, text) {
    const element = document.createElement(selector);
    setBackground(element, data.img);
    element.classList.add(className);
    if (activeIndex === i) {
        setActiveSlide(element);
        changeBG(opacityLayer, activeIndex, 'breakTransition')
    }
    if (text) {
        element.textContent = data.title;
    }
    wrapperElememt.append(element);
}

function setBackground(element, image) {
    element.style.background = `url(${image}) 50% 50%/cover no-repeat`;
}

function setActiveSlide(cardItem) {
    cardItem.classList.add('active');
    // cardItem.style.zIndex = '3';
    console.log(cardItem.style.zIndex)
}

function changeSlide(index, direction) {
    if (index < 0) {
        index = imagesArray.length - 1;
    }
    if (index === imagesArray.length ) {
        index = 0;
    }
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (index === i) {
            slide.style.zIndex = 4;
            slide.classList.add('active');
        }
    })
    initialSlideIndex = index;
    changeBG(opacityLayer, initialSlideIndex);
    setPosition(slides, false, direction)
}

function changeBG(element, index, breakTransition) {
    if (breakTransition) {
        element.style.transition = 'none';
        element.style.marginLeft = `${-index*100}vw`;
    }
    else {
        element.style.marginLeft = `${-index*100}vw`;
        element.style.transition = 'margin-left 0.6s ease-in-out'
    }
}

function setPosition(slidesArray, isInit, direction) {
    if (isInit) {
        for (i = 1, start = 42.5; i <= slidesArray.length; i++, start+=20) {
            slidesArray[i - 1].style.left = `${(start) - initialSlideIndex * 20}%`;
            if (parseInt(slidesArray[i - 1].style.left) >= 100) {
                slidesArray[i - 1].style.left = `${(parseInt(slidesArray[i - 1].style.left) - 20 * slidesArray.length)}%`;
            }
            if (parseInt(slidesArray[i - 1].style.left) < 0) {
                slidesArray[i - 1].style.left = `${(parseInt(slidesArray[i - 1].style.left) + 20 * slidesArray.length)}%`;
            }
        }
    }
    else {
        if (direction === 'next') {
            for (i = 1, start = 40; i <= slidesArray.length; i++, start+=22) {
                slidesArray[i - 1].style.left = `${parseInt(slidesArray[i - 1].style.left) - 20}%`;
                slidesArray[i - 1].style.zIndex = 2;
                if (parseInt(slidesArray[i - 1].style.left) < 0) {
                    slidesArray[i - 1].style.left = `${(parseInt(slidesArray[i - 1].style.left) + 20 * slidesArray.length)}%`;
                    slidesArray[i - 1].style.zIndex = 1;
                }
            }
        } else if (direction === 'prev') {
            for (i = 1, start = 40; i <= slidesArray.length; i++, start+=22) {
                slidesArray[i - 1].style.left = `${parseInt(slidesArray[i - 1].style.left) + 20}%`;
                slidesArray[i - 1].style.zIndex = 2;
                if (parseInt(slidesArray[i - 1].style.left) >= 100) {
                    slidesArray[i - 1].style.left = `${(parseInt(slidesArray[i - 1].style.left) - 20 * slidesArray.length)}%`
                    slidesArray[i - 1].style.zIndex = 1;
                }
            }
        }

    }
}

setPosition(slides, true);

function autoChangeSlide(isAuto = false) {
    interval = setInterval(() => {
        changeSlide(++initialSlideIndex, 'next')
    }, 3000);
}
autoChangeSlide(true)

