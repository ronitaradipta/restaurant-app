const getRatingStar = (rating) => {
  const starCount = Math.floor(rating);
  let stars = '';
  for (let i = 0; i < starCount; i++) {
    stars += '<i class="fa-solid fa-star" style="color: #f5b700"></i>';
  }
  if (rating % 1 !== 0) {
    stars
      += '<i class="fa-solid fa-star-half-stroke" style="color: #f5b700"></i>';
  }
  return stars;
};

export default getRatingStar;
