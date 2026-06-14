/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { PERSONAL_INFO, EXPERIENCES, SKILL_CATEGORIES, CERTIFICATES } from '../data';
import ProjectGrid from './ProjectGrid';
import ResumeDownloadSection from './ResumeDownloadSection';
import { 
  Briefcase, 
  Code, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  Layers, 
  Check, 
  Sparkles,
  Link,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface MainWindowProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  fullScrollMode: boolean;
}

export default function MainWindow({ activeSection, onSectionChange, fullScrollMode }: MainWindowProps) {
  // References for anchor scrolling in Full Scroll Mode
  const introRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler
  useEffect(() => {
    if (fullScrollMode) {
      const refMap: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
        intro: introRef,
        experiences: experiencesRef,
        portfolio: portfolioRef,
        skills: skillsRef,
        download: downloadRef,
        contact: contactRef,
      };

      const targetRef = refMap[activeSection];
      if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection, fullScrollMode]);

  // Observer to highlight active folder during scrolling
  useEffect(() => {
    if (!fullScrollMode) return;

    const refs = [
      { id: 'intro', ref: introRef },
      { id: 'experiences', ref: experiencesRef },
      { id: 'portfolio', ref: portfolioRef },
      { id: 'skills', ref: skillsRef },
      { id: 'download', ref: downloadRef },
      { id: 'contact', ref: contactRef },
    ];

    const observerOption = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // active when it occupies central viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchingSection = refs.find(r => r.ref.current === entry.target);
          if (matchingSection) {
            onSectionChange(matchingSection.id);
          }
        }
      });
    }, observerOption);

    refs.forEach(r => {
      if (r.ref.current) observer.observe(r.ref.current);
    });

    return () => {
      refs.forEach(r => {
        if (r.ref.current) observer.unobserve(r.ref.current);
      });
    };
  }, [fullScrollMode, onSectionChange]);

  // Render method depending on layout selection
  const renderIntroSection = () => (
    <div id="intro-item" ref={introRef} className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs relative">
      <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
      
      <div className="relative">
        <span className="text-[10px] font-mono tracking-widest text-orange-600 font-bold uppercase block mb-1">
          // 个人简介.docx
        </span>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          👋 首页个人简介
        </h2>
        
        <div className="mt-4 text-stone-600 text-xs md:text-sm leading-relaxed space-y-4">
          <p className="indent-6 font-medium text-stone-800 bg-stone-50/70 p-4 rounded-xl border border-stone-100 italic">
            &ldquo;{PERSONAL_INFO.bioIntro}&rdquo;
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex gap-2.5 items-start bg-neutral-50/50 p-3 rounded-lg border border-neutral-100">
              <UserCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-850 text-xs">运营操盘定位</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">聚焦账号矩阵0-1搭建、短视频内容、活动运营、达人合作与用户运营。</p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start bg-neutral-50/50 p-3 rounded-lg border border-neutral-100">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-850 text-xs">核心优势输出</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">月曝光1000万+、单条最高播放2000万+，熟悉AI内容生产与AIGC设计流程。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperiencesSection = () => (
    <div id="experiences-item" ref={experiencesRef} className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-6">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] font-bold uppercase block mb-1">
          // 工作经历.log
        </span>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          💼 个人工作经历 / HR 审阅重点
        </h2>
        <p className="text-stone-400 text-xs mt-1">
          围绕赛博跳动官方账号及门店矩阵账号，沉淀内容策划、活动运营、达人合作、UGC裂变与品牌视觉实操经验。
        </p>
      </div>

      <div className="space-y-6 pt-2">
        {EXPERIENCES.map((exp, idx) => (
          <div key={exp.id} className="relative pl-6 border-l border-stone-200 group">
            {/* Dot indicator */}
            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border border-stone-300 bg-white group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="font-sans font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] rounded font-mono uppercase font-bold shrink-0 shadow-3xs">
                    {exp.logo}
                  </span>
                  {exp.company}
                </h3>
                <p className="text-stone-700 text-xs font-medium font-sans mt-0.5">
                  {exp.role}
                </p>
              </div>
              <span className="text-xs font-mono text-stone-400 shrink-0 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-lg">
                {exp.period}
              </span>
            </div>

            <p className="text-stone-500 text-xs mt-3 leading-relaxed bg-[#FFFFFA] pr-2">
              {exp.content}
            </p>

            {/* Structured performance achievements */}
            <div className="mt-3.5 space-y-2 bg-[#FAF9F5] border border-stone-150 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-orange-600 block font-bold mb-1 uppercase tracking-widest">
                🏆 核心量化业绩指标
              </span>
              <ul className="space-y-2">
                {exp.achievements.map((ach, index) => (
                  <li key={index} className="flex gap-2.5 items-start text-xs text-stone-850">
                    <Check className="w-3.5 h-3.5 text-orange-500 mt-1 shrink-0 bg-orange-100 rounded p-0.5" />
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolioSection = () => (
    <div id="portfolio-item" ref={portfolioRef} className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 font-bold uppercase block mb-1">
              // 创意案例研究
            </span>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              🎨 核心实操项目作品集
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-amber-700 font-mono text-[10px] border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            鼠标悬停看Spec · 点击打开档案
          </span>
        </div>
        <p className="text-stone-500 text-xs leading-relaxed max-w-xl">
          精选账号矩阵、爆款短视频、节点活动、达人合作、品牌/IP及AI内容生产等一线实战案例。
        </p>
      </div>

      <ProjectGrid />
    </div>
  );

  const renderSkillsSection = () => (
    <div id="skills-item" ref={skillsRef} className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs space-y-6">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-purple-600 font-bold uppercase block mb-1">
          // 技能证书.xls
        </span>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          🏆 技能证书 & 专业实力
        </h2>
        <p className="text-stone-400 text-xs mt-1">
          覆盖新媒体运营、内容制作、AI/AIGC、工具使用与团队协作的综合能力矩阵。
        </p>
      </div>

      {/* Grid of skill blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="bg-stone-50/50 border border-stone-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold text-stone-550 border-b border-stone-200 pb-1.5 mb-2.5 tracking-wider uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-orange-400"></span>
                {cat.category}
              </h4>
              <ul className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5 text-xs text-stone-700 leading-normal">
                    <span className="text-orange-500 select-none mt-0.5">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section */}
      <div className="pt-4 border-t border-stone-100">
        <h3 className="text-xs font-mono font-bold text-stone-400 tracking-wider mb-3.5 uppercase">
          🎫 教育经历与求职补充
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CERTIFICATES.map((cert) => (
            <div key={cert.id} className="bg-[#FFFFFA] border border-stone-150 rounded-xl p-3.5 flex items-center justify-between hover:border-orange-200 transition-all group">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-stone-850 group-hover:text-stone-900 transition-colors">
                  {cert.title}
                </h4>
                <p className="text-[10px] text-stone-500 font-mono">
                  核发方：{cert.issuer} ({cert.date})
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-mono shrink-0 px-2 py-0.5 rounded-md font-bold uppercase transition-shadow shadow-3xs">
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div id="contact-item" ref={contactRef} className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-6 md:p-8 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full filter blur-2xl"></div>
      
      <div>
        <span className="text-[10px] font-mono tracking-widest text-[#22c55e] font-bold uppercase block mb-1">
          // 联系方式.card
        </span>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          📞 欢迎联系我 / 期待加入您的团队
        </h2>
        <p className="text-stone-400 text-xs mt-1">
          康康希望寻找内容运营、品牌运营、新媒体运营、用户运营及AI内容运营等方向岗位，欢迎沟通面试机会。
        </p>
      </div>

      {/* Grid of contact details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* WeChat & QR Core Box */}
        <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl flex items-center gap-4 relative">
          {/* Mock QR Core */}
          <div className="w-16 h-16 shrink-0 bg-white border border-stone-200 rounded-lg p-1 relative overflow-hidden group flex items-center justify-center">
            {/* Visual Vector QR lookalike */}
            <div className="grid grid-cols-4 gap-0.5 w-full h-full opacity-75">
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-transparent"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-transparent"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-transparent"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-transparent"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-stone-850 rounded-xs"></div>
              <div className="bg-transparent"></div>
              <div className="bg-stone-850 rounded-xs"></div>
            </div>
            {/* Hover tooltip for WeChat visual verification */}
            <div className="absolute inset-0 bg-stone-900/90 text-white flex flex-col items-center justify-center text-[10px] font-sans scale-0 group-hover:scale-100 transition-transform origin-center p-1 text-center font-mono">
              <span>微信号:</span>
              <span className="font-bold underline text-orange-400">{PERSONAL_INFO.wechat}</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-800">微信即时沟通 (WeChat)</h4>
            <p className="text-xs font-mono font-bold text-orange-600 mt-1">{PERSONAL_INFO.wechat}</p>
            <p className="text-[10px] text-stone-400 mt-0.5">微信信息待补充后可用于投递联系</p>
          </div>
        </div>

        {/* Email Box */}
        <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-800">邮箱投递 (Email)</h4>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-mono font-medium text-blue-600 hover:underline hover:text-blue-700 block mt-0.5">
              {PERSONAL_INFO.email}
            </a>
            <p className="text-[10px] text-stone-400 mt-0.5">请补充真实邮箱后再正式投递</p>
          </div>
        </div>

        {/* Telephone Box */}
        <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-800">电话联络 (Tel)</h4>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-mono font-bold text-stone-700 block mt-0.5 hover:text-orange-600 transition-colors">
              {PERSONAL_INFO.phone}
            </a>
            <p className="text-[10px] text-stone-400 mt-0.5">请补充真实电话后再正式投递</p>
          </div>
        </div>

        {/* Online Booking Box */}
        <div className="bg-stone-50 border border-stone-150 p-4 rounded-xl flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-800">求职方向 (Availability)</h4>
            <p className="text-xs text-stone-700 font-medium block mt-0.5">新媒体运营 / 品牌运营 / 内容运营 / 用户运营 / AI内容运营</p>
            <p className="text-[10px] text-emerald-600 font-mono mt-0.5 font-bold flex items-center gap-0.5">
              <span>● {PERSONAL_INFO.location}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // If in interactive tabs mode, display only selected windowpane
  const renderInteractiveMode = () => {
    switch (activeSection) {
      case 'intro': return renderIntroSection();
      case 'experiences': return renderExperiencesSection();
      case 'portfolio': return renderPortfolioSection();
      case 'skills': return renderSkillsSection();
      case 'download': return <div id="download-item" ref={downloadRef}><ResumeDownloadSection /></div>;
      case 'contact': return renderContactSection();
      default: return renderIntroSection();
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {fullScrollMode ? (
        // Full Resume Scrolling view
        <div className="space-y-8 animate-fade-in pr-0 md:pr-1">
          {renderIntroSection()}
          {renderExperiencesSection()}
          {renderPortfolioSection()}
          {renderSkillsSection()}
          <div id="download-item" ref={downloadRef}>
            <ResumeDownloadSection />
          </div>
          {renderContactSection()}
        </div>
      ) : (
        // Interactive Desk Window Tab view
        <div className="min-h-[460px] animate-fade-in relative">
          {/* OS Window header styling inside center pane */}
          <div className="bg-white border-2 border-stone-800 text-stone-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-stone-850 px-4 py-2.5 text-white flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <span>工作区_板块_阅读器 // {activeSection}.txt</span>
              </div>
              <div className="flex gap-4 text-[10px] text-stone-400">
                <span>UTF-8</span>
                <span>活跃中</span>
              </div>
            </div>
            
            <div className="p-4 md:p-6 bg-[#FAF9F5] max-h-[750px] overflow-y-auto">
              {renderInteractiveMode()}
            </div>
          </div>

          {/* Quick tab switching inside parent */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-stone-500">
            <span>快速切换标签:</span>
            {[
              { id: 'intro', name: '简介' },
              { id: 'experiences', name: '经历' },
              { id: 'portfolio', name: '作品集' },
              { id: 'skills', name: '技能' },
              { id: 'download', name: '下载简历' },
              { id: 'contact', name: '联系' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => onSectionChange(tab.id)}
                className={`px-2 py-1 rounded border-b-2 hover:bg-stone-100 cursor-pointer ${activeSection === tab.id ? 'border-orange-500 bg-stone-50 font-bold text-orange-600' : 'border-transparent text-stone-500'}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
