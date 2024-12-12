import React from 'react'

const ImageComponent = ({ src, alt, className }) => {
  let imagePath = '';
  try {
    imagePath = `../../../assets/images/`+src;
    console.error("Gambar tidak ditemukan:", imagePath);
    return <img src={imagePath} alt={alt || "Image"} className={className} />;
  } catch (error) {
    console.error("Gambar tidak ditemukan:", imagePath);
    return <p>Error: Gambar tidak ditemukan</p>;
  }
};

export default ImageComponent;