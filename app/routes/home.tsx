import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rezume" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  
  return <motion.main
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="bg-[url('/images/bg-main.svg')] bg-cover"
>
    <Navbar />

    <section className="main-section">
      <section className="text-center py-16 flex flex-col items-center gap-6">
  <h1 className="text-4xl sm:text-5xl font-bold text-gradient max-w-3xl leading-tight">
    Land Your Dream Job with Smart Resume Feedback
  </h1>
  <p className="text-lg text-dark-200 max-w-xl">
    Upload your resume and get personalized AI-powered feedback to stand out.
  </p>
  <Link to="/upload" className="primary-button w-fit text-lg font-semibold">
    Get Started
  </Link>
</section>

<section className="flex flex-col items-center gap-10 py-12">
  <h2 className="text-3xl font-semibold text-center">Why Rezume?</h2>
  <div className="flex gap-6 flex-wrap justify-center">
    <div className="p-6 rounded-xl gradient-border text-center max-w-xs">
      <h3 className="text-xl font-bold">AI Scoring</h3>
      <p>Get resume scores based on key job-readiness metrics.</p>
    </div>
    <div className="p-6 rounded-xl gradient-border text-center max-w-xs">
      <h3 className="text-xl font-bold">Instant Feedback</h3>
      <p>Identify skill gaps and improve instantly.</p>
    </div>
    <div className="p-6 rounded-xl gradient-border text-center max-w-xs">
      <h3 className="text-xl font-bold">Application Tracker</h3>
      <p>Keep tabs on your job hunt progress with ease.</p>
    </div>
  </div>
</section>


    {auth.isAuthenticated && resumes.length > 0 && (
  <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 mt-12 gap-4">
    <h2 className="text-2xl sm:text-3xl font-semibold">
      View Your Resume Feedback
    </h2>
    <p className="text-sm sm:text-base text-dark-200 max-w-xl">
      Track your progress, identify strengths, and improve your resume with AI insights.
    </p>
    <Link
      to="/my-resumes"
      className="primary-button w-fit text-lg font-semibold"
    >
      Go to My Resumes
    </Link>
  </section>
)}


      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </motion.main>
}
