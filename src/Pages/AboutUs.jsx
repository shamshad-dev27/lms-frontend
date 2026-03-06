import HomeLayout from "../Layouts/HomeLayout";
import AboutImage from '../Assets/Image/AboutImage.png'
import Carouselslide from "../Components/Carouselslide";
import { celebrities } from "../CelebrityData/CelebrityData";
function AboutUs(){
   
 return(
    <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-white">
       <div className="flex items-center py-23">
             <section className="w-1/2 space-y-10">
        <h1 className="text-5xl text-yellow-500 font-semibold">Affordable and quality education</h1>
        <p className="text-xl tex-gray-200">
            our goal is to provide the affordable  and quality education to the world.
            we are providing the platform for the aspiring teachers and students to share 
            their skills, creativity and knowledge to each other to empower and contribute 
            in the growth and wellness of mankind.
        </p>
        </section>
        <div className="w-auto m-auto">
        <img className="drop-shadow-2xl" id="text1" style={{
            filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
        }} 
        alt="about main image"
         src={AboutImage}/>
        
        </div>
       </div>
    <div className="carousel w-1/2 m-auto ">
     { celebrities&&celebrities.map((cele)=><Carouselslide key={cele.SliceNumber} titel={cele.titel} quart={cele.description} image={cele.image}
     slideNumber={cele.SliceNumber} totalSlide={cele.totalSlide}
     />)}
</div>
 </div>
    </HomeLayout>
 );
}

export default AboutUs;