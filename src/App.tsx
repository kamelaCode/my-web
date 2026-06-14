/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Workflow, 
  Monitor, 
  Sparkles, 
  Trophy,
  Heart,
  ChevronRight,
  Info,
  Layers,
  X
} from 'lucide-react';

import { PERSONAL_INFO } from './data';
import MainWindow from './components/MainWindow';
import DesktopTaskbar from './components/DesktopTaskbar';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  // fullScrollMode: true means vertical readable timeline layout (HR Friendly)
  // fullScrollMode: false means tiled OS Workspace Folder mode (Interactive Desk layout)
  const [fullScrollMode, setFullScrollMode] = useState<boolean>(true);
  
  // Custom interactive sub-modals for secondary folder items: About, Chat, Guestbook, Press Kit
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Recruiter mock testimonials for the Guestbook folder
  const recruitersTestimonials = [
    { name: "内容全链路", title: "核心优势", content: "从账号定位、内容策划，到拍摄剪辑、达人合作、活动运营及UGC裂变，均可独立推进。" },
    { name: "爆款内容", title: "代表成果", content: "单条视频最高播放量2000万+，多条内容获得10万+互动，能够结合场馆特色做内容包装。" },
    { name: "AI提效", title: "AIGC能力", content: "熟悉ChatGPT、Gemini、即梦等工具，可辅助选题、文案、海报、视觉及创意提案。" }
  ];

  const toggleLayoutMode = () => {
    setFullScrollMode(prev => !prev);
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Smooth scroll handles natively inside MainWindow
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-stone-800 font-sans relative pb-16 overflow-x-hidden selection:bg-orange-200">
      
      {/* 1. 复古现代风格背景光晕 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* 珊瑚粉色背光 */}
        <div className="absolute top-[-80px] left-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-rose-200/40 to-pink-300/30 blur-3xl mix-blend-multiply opacity-80"></div>
        {/* 柔和黄橙色光晕 */}
        <div className="absolute top-[-120px] left-[45%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-100/50 to-orange-200/40 blur-3xl mix-blend-multiply opacity-90"></div>
        {/* 柔和天蓝色高光 */}
        <div className="absolute top-[-80px] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-100/40 to-sky-200/30 blur-3xl mix-blend-multiply opacity-80"></div>
      </div>

      {/* Main viewport Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        


        {/* THREE COLUMNS GRID */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR: PROFILE HANDLES & DIRECTORY FILE-TREE */}
          {/* ========================================================= */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2.5 space-y-6">
            
            {/* Quick Contacts Block */}
            <div className="font-mono text-[11px] space-y-1 text-stone-500 bg-white/40 p-4 rounded-xl border border-stone-200/60 shadow-3xs">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                // 联系方式
              </span>
              <p className="hover:text-stone-800 transition-colors uppercase font-medium">linjiaxin_ops</p>
              <p className="flex items-center gap-1 hover:text-stone-800 transition-colors">
                <span className="text-orange-500 font-bold">@</span> {PERSONAL_INFO.wechat}
              </p>
              <p className="flex items-center gap-1 hover:text-stone-800 transition-colors truncate">
                <span className="text-blue-500 font-bold">#</span> AI内容运营
              </p>
              <p className="flex items-center gap-1 hover:text-stone-800 transition-colors truncate">
                <span className="text-purple-500 font-bold">✉</span> {PERSONAL_INFO.email}
              </p>
              <button 
                onClick={() => handleSectionClick('contact')}
                className="text-stone-600 hover:text-orange-600 font-bold block pt-1.5 border-t border-stone-150 mt-1 cursor-pointer underline text-[10px] text-left"
              >
                在线预约 15m 面试 &rarr;
              </button>
            </div>

            {/* Folder 1: Primary Portfolio Directory Tree */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 tracking-wider flex items-center gap-1">
                  <Folder className="w-3 h-3 text-stone-400 fill-stone-300" />
                  案例研究 / 简历目录
                </span>
                <div className="mt-2 pl-3 border-l border-stone-200 space-y-1.5 font-mono text-xs text-stone-500">
                  {[
                    { id: 'intro', name: '首页简介' },
                    { id: 'experiences', name: '个人经历' },
                    { id: 'portfolio', name: '案例作品集' },
                    { id: 'skills', name: '技能与证书' },
                    { id: 'download', name: '简历下载' },
                    { id: 'contact', name: '联系方式' }
                  ].map((item) => {
                    const isSelected = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSectionClick(item.id)}
                        className={`group flex items-center gap-1.5 py-0.5 text-left w-full cursor-pointer transition-colors ${isSelected ? 'text-orange-600 font-bold' : 'hover:text-stone-800'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full border shrink-0 ${isSelected ? 'bg-orange-500 border-orange-500' : 'border-stone-400 group-hover:bg-stone-500'}`}></span>
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Folder 2: Cool Side Projects Tree */}
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 tracking-wider flex items-center gap-1">
                  <Folder className="w-3 h-3 text-stone-400 fill-stone-300" />
                  应用门户 / 实操策略
                </span>
                <div className="mt-2 pl-3 border-l border-stone-200 space-y-1.5 font-mono text-xs text-stone-500">
                  <button onClick={() => handleSectionClick('portfolio')} className="flex items-center gap-1.5 hover:text-stone-850 text-left w-full cursor-pointer">
                    <span className="text-[10px] text-stone-400">📗</span> 账号矩阵0-1搭建
                  </button>
                  <button onClick={() => handleSectionClick('portfolio')} className="flex items-center gap-1.5 hover:text-stone-850 text-left w-full cursor-pointer">
                    <span className="text-[10px] text-stone-400">📗</span> 活动策划与UGC裂变
                  </button>
                  <button onClick={() => handleSectionClick('portfolio')} className="flex items-center gap-1.5 hover:text-stone-850 text-left w-full cursor-pointer">
                    <span className="text-[10px] text-stone-400">📗</span> 爆款短视频内容
                  </button>
                  <button onClick={() => handleSectionClick('portfolio')} className="flex items-center gap-1.5 hover:text-stone-850 text-left w-full cursor-pointer">
                    <span className="text-[10px] text-stone-400">📗</span> 达人/KOL/KOC合作
                  </button>
                  <button onClick={() => handleSectionClick('portfolio')} className="flex items-center gap-1.5 hover:text-stone-850 text-left w-full cursor-pointer">
                    <span className="text-[10px] text-stone-400">📗</span> AI内容生产流程
                  </button>
                </div>
              </div>

              {/* Folder 3: Auxiliary Icons matching the bottom reference */}
              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] font-mono font-bold text-stone-400 tracking-wider block mb-2">
                  💾 互动工具 / 互动挂件
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  {/* Testimonial Guestbook */}
                  <button
                    onClick={() => setActivePopup('guestbook')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 cursor-pointer text-left"
                  >
                    <span>💝</span> 留言板
                  </button>

                  {/* About Story */}
                  <button
                    onClick={() => setActivePopup('about')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 cursor-pointer text-left"
                  >
                    <span>🦁</span> 自白书
                  </button>

                  {/* Chat with Assistant */}
                  <button
                    onClick={() => setActivePopup('chat')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 cursor-pointer text-left"
                  >
                    <span>🤖</span> 智友AI
                  </button>

                  {/* Media Press Kit */}
                  <button
                    onClick={() => setActivePopup('press')}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 cursor-pointer text-left"
                  >
                    <span>📦</span> 物资箱
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* CENTER PANEL: CORE RESUME CONTENT WINDOW */}
          {/* ========================================================= */}
          <div className="col-span-12 md:col-span-9 lg:col-span-6.5 space-y-6">
            
            {/* Header Identity Board with overlapping sticker */}
            <div className="relative bg-white/25 border border-stone-200/50 rounded-2xl p-6 shadow-3xs">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* Simulated overlapping avatar sticker stamps */}
                <div className="relative group select-none">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-pink-500 shadow-md text-white font-bold text-xs flex items-center justify-center -rotate-6 transform hover:rotate-0 transition-transform cursor-help">
                    ops!
                  </div>
                  <div className="absolute top-1/2 left-20 w-32 bg-stone-900 text-stone-100 p-2 rounded-lg text-[10px] hidden group-hover:block z-30 font-sans shadow-lg">
                    新媒体实干派：从0-1搭建账号矩阵，单条视频最高播放2000万+。
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                {/* Sleek rounded avatar mimicking image */}
                <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-100 font-mono text-2xl font-bold flex items-center justify-center shrink-0 shadow-md relative group select-none border-2 border-white">
                  {PERSONAL_INFO.avatarInitials}
                  <div className="absolute inset-0 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-sans font-bold cursor-help">
                    康康
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-sans font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
                    {PERSONAL_INFO.name}
                    <span className="text-xs bg-orange-100 text-orange-700 font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 shadow-3xs">
                      新媒体运营
                    </span>
                  </h1>
                  
                  <p className="text-stone-500 font-mono text-xs md:text-sm mt-1">
                    — {PERSONAL_INFO.title}
                  </p>
                </div>
              </div>

              {/* Slogan and layout controls block */}
              <div className="mt-5 pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-stone-500 text-xs italic leading-tight">
                  "用内容建立品牌声量，用运营沉淀用户关系"
                </p>

                {/* Switchable Display Mechanism */}
                <div className="flex items-center gap-1.5 bg-[#eae9e2] p-1 rounded-lg border border-stone-250 self-start sm:self-auto">
                  <button
                    onClick={() => setFullScrollMode(true)}
                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium cursor-pointer transition-all ${fullScrollMode ? 'bg-white text-stone-900 font-semibold shadow-3xs' : 'text-stone-500 hover:text-stone-850'}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    卷轴阅读 (HR 严选)
                  </button>
                  <button
                    onClick={() => setFullScrollMode(false)}
                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium cursor-pointer transition-all ${!fullScrollMode ? 'bg-white text-stone-900 font-semibold shadow-3xs' : 'text-stone-500 hover:text-stone-850'}`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    桌面文件卡
                  </button>
                </div>
              </div>
            </div>

            {/* Core Workspace Main Window Module */}
            <MainWindow 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
              fullScrollMode={fullScrollMode} 
            />

          </div>



        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. PERSISTENT RETRO OS TASKBAR AT THE ABSOLUTE BOTTOM */}
      {/* ========================================================= */}
      <DesktopTaskbar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        fullScrollMode={fullScrollMode}
        onToggleLayoutMode={toggleLayoutMode}
      />

      {/* ========================================================= */}
      {/* DETAILED DIALOG MODALS FOR AUXILIARY FOLDER INTERACTIONS */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activePopup && (
          <div className="fixed inset-0 bg-[#3a3530]/40 backdrop-blur-xs flex items-center justify-center z-55 p-4">
            <div className="absolute inset-0" onClick={() => setActivePopup(null)}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-[#FAF9F5] border-2 border-stone-800 text-stone-800 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden z-20 flex flex-col font-sans"
            >
              {/* Retro titlebar */}
              <div className="bg-stone-800 text-white px-4 py-2.5 flex items-center justify-between">
                <span className="font-mono text-xs text-stone-300">
                  互动模块 // {activePopup}.sh
                </span>
                <button
                  onClick={() => setActivePopup(null)}
                  className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4">
                
                {/* 1. GUESTBOOK TESTIMONIAL VIEW */}
                {activePopup === 'guestbook' && (
                  <div className="space-y-4">
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">💝</span>
                      <h3 className="text-base font-bold text-stone-900">业界同行推荐评价</h3>
                    </div>
                    <p className="text-stone-500 text-xs">
                      以下内容整理自简历中的高频优势，可作为面试沟通时的快速参考：
                    </p>
                    <div className="space-y-3 pt-1">
                      {recruitersTestimonials.map((note, index) => (
                        <div key={index} className="bg-white border border-stone-200 rounded-xl p-3 shadow-3xs text-xs">
                          <div className="flex justify-between items-center text-stone-400 font-mono text-[10px] mb-1">
                            <strong>{note.name}</strong>
                            <span>{note.title}</span>
                          </div>
                          <p className="text-stone-700 italic leading-normal font-medium">“{note.content}”</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. ABOUT STORY VIEW */}
                {activePopup === 'about' && (
                  <div className="space-y-3 text-xs leading-relaxed text-stone-700">
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">🦁</span>
                      <h3 className="text-base font-bold text-stone-900">康康的增长独白</h3>
                    </div>
                    <div className="space-y-2.5 bg-white p-4 rounded-xl border border-stone-200">
                      <p>
                        <strong>问：为什么专注于新媒体运营方向？</strong>
                        <br />
                        答：因为新媒体运营既需要内容创意，也需要用户洞察和执行落地。我喜欢把场馆特色、热点趋势和用户情绪结合起来，让内容真正带来曝光、互动和到店转化。
                      </p>
                      <p>
                        <strong>问：你最大的核心竞争力是什么？</strong>
                        <br />
                        答：<strong>内容全链路能力完整。</strong> 从账号定位、内容策划，到拍摄剪辑、达人合作、活动运营、UGC裂变和AI提效，都有一线实操经验。
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. CHAT COMPACT VIEW */}
                {activePopup === 'chat' && (
                  <div className="space-y-4">
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">🤖</span>
                      <h3 className="text-base font-bold text-stone-900">智友智能面试小助手</h3>
                    </div>
                    <p className="text-[#3c6e71] text-xs font-mono font-bold bg-[#f4f7f6] p-2 rounded border border-[#d2dbd9]">
                      已成功开启康康简历自动答疑，选择您感兴趣的信息：
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => alert("康康目前希望寻找内容运营、品牌运营、新媒体运营、用户运营或AI内容运营等方向岗位。")}
                        className="w-full text-left px-3 py-2 bg-stone-100 hover:bg-orange-50 hover:text-orange-700 border border-stone-200 rounded-lg text-xs cursor-pointer block font-medium"
                      >
                        ⚡ 1. 康康当前求职状态与入职时间？
                      </button>
                      <button
                        onClick={() => alert("她最擅长：1) 账号矩阵从0-1搭建，2) 短视频策划拍摄剪辑，3) 活动运营与UGC裂变，4) 达人/KOL/KOC合作，5) AI内容生产提效。")}
                        className="w-full text-left px-3 py-2 bg-stone-100 hover:bg-orange-50 hover:text-orange-700 border border-stone-200 rounded-lg text-xs cursor-pointer block font-medium"
                      >
                        ⚡ 2. 核心最拿手的3个看家本领是什么？
                      </button>
                      <button
                        onClick={() => alert("点击简历下载板块的 [下载PDF/WORD] 按钮即可获取网页生成版简历。电话、邮箱、学校等信息请补充后再投递。")}
                        className="w-full text-left px-3 py-2 bg-stone-100 hover:bg-orange-50 hover:text-orange-700 border border-stone-200 rounded-lg text-xs cursor-pointer block font-medium"
                      >
                        ⚡ 3. 怎样获取完整打印版的高清 PDF Resume？
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. MEDIA PRESS KIT VIEW */}
                {activePopup === 'press' && (
                  <div className="space-y-3 text-xs text-stone-700">
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">📦</span>
                      <h3 className="text-base font-bold text-stone-900">求职者物资大礼包</h3>
                    </div>
                    <p className="text-stone-500">
                      特为尊贵的企业 HR / 面试官准备的求职全家桶，帮助您在内部汇报：
                    </p>
                    <ul className="space-y-2">
                      <li className="bg-white p-2.5 rounded-lg border border-stone-200 flex justify-between items-center">
                        <div>
                          <p className="font-bold">A. BOSS直聘自我介绍</p>
                          <p className="text-[10px] text-stone-400">2年新媒体及品牌运营经验版本</p>
                        </div>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-mono font-bold select-none cursor-pointer" onClick={() => alert("2年新媒体及品牌运营经验，负责赛博跳动官方账号及门店矩阵账号从0-1搭建与运营，具备内容策划、短视频拍摄剪辑、活动运营、达人合作及UGC裂变经验。")}>
                          GET
                        </span>
                      </li>
                      <li className="bg-white p-2.5 rounded-lg border border-stone-200 flex justify-between items-center">
                        <div>
                          <p className="font-bold">B. 面试高频问题回答</p>
                          <p className="text-[10px] text-stone-400">优势 / 爆款内容 / AI影响 / 换工作原因</p>
                        </div>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-mono font-bold select-none cursor-pointer" onClick={() => alert("我的优势是内容全链路能力比较完整，同时熟悉AI工具辅助选题、文案、视觉创意和物料方案。")}>
                          GET
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Footer close button */}
                <div className="pt-3 border-t border-stone-200 flex justify-end">
                  <button
                    onClick={() => setActivePopup(null)}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-white rounded-lg text-xs font-medium cursor-pointer"
                  >
                    确认并返回桌面
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
