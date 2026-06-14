/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Star, Award, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <div className="my-8">
      {/* Grid of Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => {
          const isHovered = hoveredProjectId === proj.id;
          return (
            <div
              key={proj.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredProjectId(proj.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              {/* Card Body */}
              <button
                id={`project-card-${proj.id}`}
                onClick={() => setSelectedProject(proj)}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white border border-stone-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-center relative cursor-pointer group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 transform"
                style={{
                  transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.06)' : '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                {/* Visual Icon with Sleek Gradient Backplate */}
                <div className={`w-16 h-16 md:w-18 md:h-18 rounded-xl bg-gradient-to-br ${proj.iconBg} flex items-center justify-center text-3xl md:text-4xl shadow-inner relative overflow-hidden transition-transform duration-300 group-hover:rotate-1`}>
                  <span className="z-10">{proj.iconContent}</span>
                  {/* Subtle glass reflection shimmer */}
                  <div className="absolute top-0 left-0 w-full h-[50%] bg-white/20 skew-y--12 -translate-y-4"></div>
                  {/* Glowing core */}
                  <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-white/40 blur-xs"></div>
                </div>

                {/* Micro tech indicators inside icon corners */}
                <div className="absolute top-1.5 right-1.5 flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 opacity-60"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-60"></div>
                </div>
              </button>

              {/* Title & Date */}
              <div className="text-center mt-2.5">
                <span className="block text-xs font-sans font-medium text-stone-800 tracking-tight group-hover:text-stone-900 leading-tight">
                  {proj.title}
                </span>
                <span className="block text-[10px] font-mono text-stone-400 mt-0.5">
                  {proj.year}
                </span>
              </div>

              {/* Hover Popover Tooltip (Sleek overlay) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl p-3 shadow-xl z-30 pointer-events-none"
                  >
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 border-4 border-transparent border-t-zinc-900"></div>
                    <span className="text-[10px] font-mono tracking-widest text-[#d9383a] uppercase font-bold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> 悬停查看详情
                    </span>
                    <p className="text-xs font-sans font-medium mt-1 text-white">{proj.subtitle}</p>
                    <p className="text-[11px] font-sans text-stone-300 mt-1 leading-normal border-t border-zinc-800 pt-1">
                      {proj.summary}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.techStack.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[9px] font-mono bg-zinc-800 text-stone-300 px-1.5 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Expandable Project Folder Modal System (Vivid OS feel) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-[#3a3530]/40 backdrop-blur-xs flex items-center justify-center z-55 p-4 overflow-y-auto">
            {/* Backdrop click to dismiss */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)}></div>
            
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#FAF9F5] border-2 border-stone-800 text-stone-800 rounded-2xl w-full max-w-2xl h-auto shadow-2xl relative overflow-hidden z-20 flex flex-col font-sans"
            >
              {/* Vintage Mac OS-style titlebar bar */}
              <div className="bg-stone-800 text-white px-4 py-3 flex items-center justify-between border-b-2 border-stone-800">
                <div className="flex items-center gap-2">
                  {/* Small colored window controller dots */}
                  <div className="flex gap-1.5">
                    <button onClick={() => setSelectedProject(null)} className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600 cursor-pointer"></button>
                    <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500"></div>
                  </div>
                  <span className="font-mono text-xs text-stone-300 ml-2 tracking-tight">
                  项目案例文档 // {selectedProject.id}.rtf
                </span>
                </div>
                <button
                  id="close-project-modal-btn"
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Window Body */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
                {/* Header info */}
                <div className="flex items-start gap-4 md:gap-5 pb-5 border-b border-stone-200">
                  <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${selectedProject.iconBg} flex items-center justify-center text-3xl shadow-md`}>
                    {selectedProject.iconContent}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-orange-600 text-xs md:text-sm font-mono mt-0.5 font-medium">
                      {selectedProject.subtitle} • {selectedProject.year}项目
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedProject.techStack.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-stone-100 text-stone-600 border border-stone-200 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid of specifications */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  
                  {/* Left Specs */}
                  <div className="md:col-span-4 space-y-4 font-sans text-xs">
                    {/* Role Panel */}
                    <div className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-4">
                      <span className="text-[10px] font-mono text-stone-400 tracking-wider block mb-1">
                        ● 我的角色
                      </span>
                      <p className="font-semibold text-stone-800 text-sm flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-orange-500" />
                        {selectedProject.role}
                      </p>
                    </div>

                    {/* Timeline Panel */}
                    <div className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-4">
                      <span className="text-[10px] font-mono text-stone-400 tracking-wider block mb-1">
                        ● 项目周期
                      </span>
                      <p className="font-mono font-medium text-stone-700">
                        {selectedProject.year} 运营实操案
                      </p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        算法验证 / 商业转化闭环
                      </p>
                    </div>
                  </div>

                  {/* Right Description */}
                  <div className="md:col-span-8 space-y-5">
                    {/* Overview */}
                    <div>
                      <h4 className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1.5 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" /> 1. 项目详细概述
                      </h4>
                      <p className="text-stone-700 text-xs md:text-sm leading-relaxed">
                        {selectedProject.details}
                      </p>
                    </div>

                    {/* Implemented Features */}
                    <div>
                      <h4 className="text-xs font-mono text-stone-400 tracking-widest uppercase mb-1.5 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500" /> 2. 攻坚行动与落地功能
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex gap-2 items-start text-xs text-stone-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-500 mt-1.5 shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-4">
                      <h4 className="text-xs font-mono text-orange-700 tracking-widest uppercase mb-2 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-orange-500 animate-pulse" /> 3. 实打实项目产出业绩
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.achievements.map((ach, i) => (
                          <li key={i} className="flex gap-2 items-start text-xs text-stone-800 font-medium">
                            <span className="text-orange-500 font-bold">✓</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Footer confirmation */}
                <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                  >
                    了解并关闭文档
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
