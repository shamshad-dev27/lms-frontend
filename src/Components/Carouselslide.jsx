function Carouselslide({image,slideNumber,totalSlide,titel,quart}){
    return(
          <div id={`slide${slideNumber}`} className="carousel-item relative w-full mb-10">
                <div className="card  w-140 text-center m-auto pt-20 ">
          <div className="flex flex-col items-center justify-center w-full">
        {/* Image BAHAR card se */}
      <div className="flex justify-center z-10">
        <img
          src={image}
          className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
        />
      </div>
        <div className="card-body items-center">
          <h2 className="card-title">{titel}</h2> 
         <p className="text-gray-400">{quart}</p>
          <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
        </div>
      {/* Next/Prev Buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href={`#slide${((slideNumber)%totalSlide-1+totalSlide)%totalSlide}`} className="btn btn-circle">❮</a>
        <a href={`#slide${(slideNumber)%totalSlide+1}`} className="btn btn-circle">❯</a>
      </div>

      </div>
    </div>
  </div>
    );
}

export default Carouselslide;