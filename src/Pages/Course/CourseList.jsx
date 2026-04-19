import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
  const dispatch = useDispatch();
  const { CourseData } = useSelector((state) => state?.courses);

  async function loadCourse() {
    await dispatch(getAllCourse());
  }

  useEffect(() => {
    loadCourse();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-16 px-4 md:px-12 flex flex-col gap-10 text-white bg-[#020617] relative">
        
        {/* Background Subtle Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-yellow-500/5 blur-[120px] rounded-full -z-0"></div>

        {/* Header Section */}
        <header className="z-10 space-y-4">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight">
            Explore the courses made by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              Industry Experts
            </span>
          </h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto text-lg">
            Discover a wide range of courses designed to help you master new skills 
            and advance your career in the tech world.
          </p>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full"></div>
        </header>

        {/* Courses Grid Container */}
        <div className="z-10 mb-20 flex flex-wrap gap-10 justify-center items-center">
          {CourseData && CourseData.length > 0 ? (
            CourseData.map((element) => (
              <div key={element._id} className="transition-all duration-300 hover:transform hover:-translate-y-2">
                <CourseCard data={element} />
              </div>
            ))
          ) : (
            /* Loading/Empty State Skeleton */
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
                <p className="text-xl font-medium italic">Fetching excellence for you...</p>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;