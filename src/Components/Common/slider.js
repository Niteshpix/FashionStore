function Slider(props) {
  let { images } = props;

  return (
    <div className="col-sm-12">
      <div className="slider-container">
        <div className="slider">
          {images && images.map((image, index) => {
            if (index % 2 === 0) {
              if (index + 1 < images.length) {
                return (
                  <div className="row" key={index}>
                    <div className="col-sm-6">
                      <img src={image.src} alt={image.alt} />
                    </div>
                    <div className="col-sm-6">
                      <img
                        src={images[index + 1].src}
                        alt={images[index + 1].alt}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="row" key={index}>
                    <div className="col-sm-12">
                      <img src={image.src} alt={image.alt} />
                    </div>
                  </div>
                );
              }
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Slider;
