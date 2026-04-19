import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DeleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LectureSlice";
import DoubtSolver from "../ChartBoart/DoubtSolver";

function DisplayLecture() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lecture } = useSelector((s) => s?.lecture);
  const { role } = useSelector((s) => s?.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(DeleteCourseLecture({ courseId, lectureId }));
    await dispatch(getCourseLecture(state?._id));
  }

  useEffect(() => {
    if (!state) navigate("/");
    dispatch(getCourseLecture(state?._id));
  }, []);

  const activeLecture = lecture?.[currentVideo];

  return (
    <HomeLayout>
      <div className="relative min-h-screen bg-[#0f172a] text-slate-200 px-6 py-10 pb-20 overflow-x-hidden font-sans">

        {/* Background grid */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
          aria-hidden="true"
        />

        {/* ── Course Title ── */}
        <div className="relative z-10 text-center mb-10">
          <span className="block text-[10px] tracking-[0.18em] uppercase text-slate-500 mb-2">
            Course
          </span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent leading-tight">
            {state?.title}
          </h1>
        </div>

        {lecture && lecture.length > 0 ? (
          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── LEFT: Video + Info ── */}
            <div className="flex flex-col gap-5">

              {/* Video player */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
                <video
                  key={activeLecture?.lecture?.secure_url}
                  className="w-full block aspect-video object-cover bg-black"
                  src={activeLecture?.lecture?.secure_url}
                  controls
                  disablePictureInPicture
                  controlsList="nodownload"
                  muted
                />
              </div>

              {/* Lecture info card */}
              <div className="bg-[#1e293b] border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    ▶ Now Playing
                  </span>
                  <span className="text-xs text-slate-500">
                    {currentVideo + 1} / {lecture.length}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                  {activeLecture?.title || "—"}
                </h2>

                <div className="h-px bg-white/[0.07] mb-4" />

                <p className="text-[10px] tracking-[0.12em] uppercase text-slate-500 mb-2">
                  Description
                </p>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-4">
                  {activeLecture?.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* ── RIGHT: Lecture List ── */}
            <aside className="lg:sticky lg:top-20">
              <div className="bg-[#1e293b] border border-white/[0.07] rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
                  <h3 className="text-[15px] font-semibold text-slate-100">
                    Lecture List
                  </h3>
                  {role === "ADMIN" && (
                    <button
                      onClick={() =>
                        navigate("/course/addlecture", { state: { ...state } })
                      }
                      className="text-xs font-semibold text-amber-400 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                    >
                      + Add Lecture
                    </button>
                  )}
                </div>

                {/* List */}
                <ul className="max-h-[430px] overflow-y-auto divide-y divide-white/[0.05]">
                  {lecture.map((lect, ind) => {
                    const isActive = ind === currentVideo;
                    return (
                      <li key={lect._id}>
                        <button
                          onClick={() => setCurrentVideo(ind)}
                          className={`w-full flex items-center gap-3 px-5 py-[13px] text-left transition-all border-l-[3px] hover:bg-white/[0.04] ${
                            isActive
                              ? "bg-amber-500/[0.07] border-amber-500"
                              : "border-transparent"
                          }`}
                        >
                          {/* Number badge */}
                          <span
                            className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold transition-colors ${
                              isActive
                                ? "bg-amber-500 text-[#0f172a]"
                                : "bg-[#0f172a] text-slate-500 border border-white/10"
                            }`}
                          >
                            {ind + 1}
                          </span>

                          {/* Title */}
                          <span
                            className={`flex-1 text-[13px] font-medium leading-snug ${
                              isActive ? "text-amber-400" : "text-slate-400"
                            }`}
                          >
                            {lect?.title}
                          </span>

                          {/* Active dot */}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          )}
                        </button>

                        {/* Admin delete */}
                        {role === "ADMIN" && (
                          <button
                            onClick={() =>
                              onLectureDelete(state?._id, lect?._id)
                            }
                            className="mx-5 mb-2.5 w-[calc(100%-40px)] block py-1.5 rounded-lg text-xs font-medium text-red-400 bg-red-500/[0.07] border border-red-500/[0.18] hover:bg-red-500/10 transition-colors"
                          >
                            Delete Lecture
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        ) : (
          /* ── Empty State ── */
          <div className="relative z-10 flex flex-col items-center justify-center gap-5 min-h-[320px]">
            <span className="text-5xl">📭</span>
            <p className="text-slate-500 text-base">No lectures added yet.</p>
            {role === "ADMIN" && (
              <button
                onClick={() =>
                  navigate("/course/addlecture", { state: { ...state } })
                }
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-[#0f172a] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                + Add First Lecture
              </button>
            )}
          </div>
        )}

        {/* ── Doubt Solver ── */}
        <div className="relative z-10 max-w-6xl mx-auto mt-7">
          <DoubtSolver
            courseTitle={state?.title}
            lectureTitle={activeLecture?.title || "Course"}
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default DisplayLecture;