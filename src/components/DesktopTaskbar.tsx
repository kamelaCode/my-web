/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data';
import { 
  FileDown, 
  Terminal, 
  Monitor, 
  Send, 
  Clock, 
  Settings, 
  User, 
  Check, 
  Maximize2 
} from 'lucide-react';

interface DesktopTaskbarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  fullScrollMode: boolean;
  onToggleLayoutMode: () => void;
}

export default function DesktopTaskbar({ 
  activeSection, 
  onSectionClick, 
  fullScrollMode, 
  onToggleLayoutMode 
}: DesktopTaskbarProps) {
  const [timeStr, setTimeStr] = useState("12:00:00 PM");
  const [dateStr, setDateStr] = useState("2026/05/29");
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Synchronize clock continuously mimicking high-fidelity OS taskbar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Enforce Year 2026 matching current meta context (2026-05-29)
      const formattedTime = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTimeStr(formattedTime);
      setDateStr("2026/05/29");
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleStartShortcutClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setStartMenuOpen(false);
  };

  const triggerPDFDownloadDirect = () => {
    const btn = document.getElementById('download-pdf-btn');
    if (btn) btn.click();
    setStartMenuOpen(false);
  };

  return (
    <div id="desktop-taskbar" className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 text-stone-100 h-12 flex items-center justify-between px-3 md:px-4 z-50 font-mono shadow-xl select-none">
      
      {/* Left side: Start Button Menu */}
      <div className="relative">
        <button
          id="taskbar-start-btn"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${startMenuOpen ? 'bg-orange-500 text-white' : 'bg-zinc-800 hover:bg-zinc-750 text-stone-200 border border-zinc-700'}`}
        >
          {/* Windows-like 4-panel vector tile icon using CSS */}
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3 origin-center">
            <div className="bg-orange-400 w-1.5 h-1.5 rounded-3xs"></div>
            <div className="bg-orange-400 w-1.5 h-1.5 rounded-3xs"></div>
            <div className="bg-orange-400 w-1.5 h-1.5 rounded-3xs"></div>
            <div className="bg-orange-400 w-1.5 h-1.5 rounded-3xs"></div>
          </div>
          开始 (Start)
        </button>

        {/* Dynamic retro start menu dropdown */}
        {startMenuOpen && (
          <div className="absolute bottom-11 left-0 w-64 bg-zinc-900 border-2 border-stone-800 text-stone-200 rounded-lg shadow-2xl overflow-hidden z-50 animate-fade-in font-sans">
            {/* Sidebar band in Start Menu */}
            <div className="flex">
              <div className="w-14 bg-gradient-to-b from-orange-500 to-amber-600 flex items-end justify-center pb-4 text-white font-mono text-[10px] font-bold origin-center -rotate-180 writing-vertical select-none capitalize leading-none tracking-widest text-[#fff] relative">
                <span className="absolute bottom-10 left-1/2 -translate-x-1/2 rotate-90 shrink-0 transform whitespace-nowrap">康康_简历版 v1.0</span>
              </div>
              
              {/* Menu Actions */}
              <div className="flex-1 p-2 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 px-2.5 pb-1 block border-b border-zinc-850">
                  📁 个人简历板块
                </span>
                
                {[
                  { id: 'intro', name: '🏠 首页简介' },
                  { id: 'experiences', name: '💼 个人经历' },
                  { id: 'portfolio', name: '🎨 项目作品集' },
                  { id: 'skills', name: '🏆 技能证书' },
                  { id: 'download', name: '📥 简历下载' },
                  { id: 'contact', name: '📞 联系方式' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleStartShortcutClick(item.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-orange-500 hover:text-white transition-colors text-xs flex items-center justify-between group cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] text-stone-500 group-hover:text-white/80 font-mono">
                      _doc
                    </span>
                  </button>
                ))}

                <span className="text-[10px] font-mono text-stone-500 px-2.5 pt-2 pb-1 block border-b border-zinc-850">
                  ⚡ 快速指令工具
                </span>

                <button
                  onClick={triggerPDFDownloadDirect}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-emerald-600 hover:text-white transition-colors text-xs flex items-center gap-2 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>一键秒发 PDF 简历</span>
                </button>

                <button
                  onClick={() => {
                    onToggleLayoutMode();
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-sky-600 hover:text-white transition-colors text-xs flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>{fullScrollMode ? "电脑桌面积木界面" : "全幅列表阅读界面"}</span>
                  </span>
                  <span className="text-[9px] bg-zinc-800 text-stone-400 px-1 py-0.2 rounded font-mono">模式</span>
                </button>
              </div>
            </div>

            {/* Bottom logout zone of Start menu */}
            <div className="bg-zinc-950 px-3 py-2 border-t border-zinc-850 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-500" />
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-orange-400">ONLINE</span>
            </div>
          </div>
        )}
      </div>

      {/* Middle: Active Task Buttons mirroring desktop apps */}
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xl mx-4 overflow-x-auto scrollbar-none">
        
        {/* Layout Modality Switch button */}
        <button
          onClick={onToggleLayoutMode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[11px] text-stone-300">
            切换为: {fullScrollMode ? "桌面卡片模式" : "简历卷轴模式"}
          </span>
        </button>

        {/* Active task representation */}
        <div className="w-[1px] h-4 bg-zinc-800"></div>

        {[
          { id: 'intro', label: '首页简介' },
          { id: 'experiences', label: '个人经历' },
          { id: 'portfolio', label: '项目作品' },
          { id: 'skills', label: '技能证书' },
          { id: 'download', label: '简历下载' },
          { id: 'contact', label: '联系方式' }
        ].map((task) => {
          const isActive = activeSection === task.id;
          return (
            <button
              key={task.id}
              onClick={() => onSectionClick(task.id)}
              className={`px-2.5 py-1 rounded text-xs shrink-0 transition-all flex items-center gap-1 cursor-pointer ${isActive ? 'bg-zinc-800 text-orange-400 font-bold border-l-2 border-l-orange-500 shadow-inner' : 'bg-zinc-900 border border-transparent hover:bg-zinc-850 text-stone-400'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-orange-500 animate-pulse' : 'bg-stone-500'}`}></div>
              {task.label}
            </button>
          );
        })}
      </div>

      {/* Right side: Systray / Clock / Specs */}
      <div className="flex items-center gap-3.5 text-xs text-stone-400">
        {/* Compact Mode indicator */}
        <span className="hidden md:inline text-[10px] bg-zinc-850 border border-zinc-800 px-2 py-0.5 rounded-md text-stone-400 select-none">
          UTC+8 时区
        </span>

        {/* Digital ticking Clock with calendar */}
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-850 text-[11px] hover:text-white transition-colors duration-200 px-2.5 py-1 rounded-md cursor-help w-[150px] justify-center">
          <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
          <div className="flex flex-col text-right leading-none select-none">
            <span className="font-bold text-orange-400">{timeStr}</span>
            <span className="text-[9px] text-stone-500 mt-0.5">{dateStr}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
