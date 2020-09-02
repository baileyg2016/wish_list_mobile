const testImages = [
    'assets/images/bailey.jpg',
    'assets/images/logan.jpg',
    'assets/images/sharon.jpg',
    'assets/images/kendall.jpg',
    'assets/images/eric.jpg',
];

export const getRandomImage = () => {
    return `file:////Users/BaileySpell/repos/wish_list/mobileApp/${testImages[Math.floor(Math.random() * 4)]}`;
}

export const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }