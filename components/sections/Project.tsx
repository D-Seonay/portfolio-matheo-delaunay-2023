// Project.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GrGithub } from 'react-icons/gr';
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectProps {
  number: number;
  category: string;
  title: string;
  imageSrc: string;
  description: string;
  githubLink?: string;
}

const ProjectNumber: React.FC<ProjectProps> = ({
  number,
  category,
  title,
  imageSrc,
  description,
  githubLink,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const xProgess = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [3, 6]);

  return (
    <motion.div
    ref={ref}
    style={{
      x: xProgess,
      scale: scaleProgess,
      opacity: opacityProgess,
    }}
    className="mb-3 sm:mb-8"
  >
      <div className="w-[373px] h-[600px] p-1 rounded-xl my-9 md:m-9 flex-col justify-start items-start gap-[21px] inline-flex transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-tr from-neutral-800 to-neutral-500  hover:from-secondary hover:to-primary hover:shadow-2xl">
        <div className="flex flex-col justify-evenly align-start bg-black-100 p-3 rounded-lg w-full h-full">
          <div className="justify-center items-center inline-flex ">
            <div
              className="w-[46px] h-[46px] text-white text-[25px] font-normal"
            >
              0{number}-{' '}
            </div>
            <div
              className="w-[117px] h-[46px] text-primary text-[25px] font-normal"
            >
              {category}
            </div>
          </div>
          <div className="w-full h-[300px] rounded-[10px] overflow-hidden">
            <Image src={imageSrc} alt={title} width={373} height={300} />
          </div>
          <div>
            <div className="text-[20px] font-bold text-primary">{title}</div>
            <div className="text-[15px] text-white">{description}</div>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-[20px] text-white">
              <Link href={`/project${number}`}>Learn more</Link>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-[20px] text-white mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:text-primary"> 
                <Link href={githubLink ?? ""}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Github'
                      >
                  <GrGithub size={30} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { ProjectNumber };
