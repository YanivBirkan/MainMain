"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomID(){
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function fixedLorem(count) {
    const s = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
    const words = s.split(' ');
    
    // Create an array of the requested size, pulling words by wrapping around with modulo (%)
    return Array.from({ length: count }, (_, i) => words[i % words.length]).join(' ');
}
//random img srcs

const imgsSrc = [
  "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
  "https://cdn-icons-png.flaticon.com/512/5432/5432699.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdb2sBaBkSYrR12AZggSktGUULmschV0c7HIFKD4CXOA&s=10",
  "https://cdn-icons-png.flaticon.com/512/8244/8244573.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlctLtK4wm3UXjzkCEr0CluHwkH9spLAIYW9D8jS30Yw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWpFChWjK6ClJ27GDA8f0iyug6UdMc5Ho5f2CYJJqSg&s=10"
]

//create 2 books for all books was removed
function create2Books(){
  return[
    {
        id: getRandomID(),
        title: 'The Adventure of aaa',
        price: 120,
        imgUrl: imgsSrc[getRandomInt(0,5)],
        details:fixedLorem(getRandomInt(40,70)),
        rating: 3

    }, 
    {
        id: getRandomID(),
        title: 'My World Atlas',
        price: 80,
        imgUrl: imgsSrc[getRandomInt(0,5)],
        details:fixedLorem(getRandomInt(40,70)),
        rating: 3

    }  
  ];
}