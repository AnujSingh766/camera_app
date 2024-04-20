<div className="gallery">
{capturedImages.map((image, index) => (
  <div className="image-container" key={index} style={{ paddingBottom: `calc(100% / (${image.aspectRatio}))` }}>
    <img className="image" src={image.src} alt={`Captured ${index}`} />
    <div className="delete-overlay" onClick={() => handleDelete(index)}>Delete</div>
  </div>
))}
</div>