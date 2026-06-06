/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, TrendingUp, BarChart2, PieChart, Layers, RefreshCw, Zap } from 'lucide-react';

export default function MetricShots() {
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  // Growth coordinates for beautiful custom SVG graph line
  const growthData = [
    { month: "1月", followers: 5 },
    { month: "2月", followers: 28 },
    { month: "3月", followers: 65 },
    { month: "4月", followers: 98 },
    { month: "5月", followers: 135 },
    { month: "6月", followers: 182 },
  ];

  const cards = [
    {
      id: "chart-growth",
      title: "📈 账号矩阵曝光表现",
      metric: "1000万+ 月曝光",
      desc: "赛博跳动官方账号及门店矩阵账号持续运营，覆盖抖音、小红书、公众号等平台。",
      renderVisual: () => (
        <div className="mt-4 bg-zinc-900 rounded-xl p-3 border border-zinc-800 relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 mb-2">
            <span>主攻阵地: 账号矩阵运营</span>
            <span className="text-emerald-400 font-bold">6+账号</span>
          </div>
          
          {/* Custom SVG Line Chart */}
          <div className="h-28 w-full flex items-end">
            <svg viewBox="0 0 240 100" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="240" y2="20" stroke="#333" strokeDasharray="2,2" />
              <line x1="0" y1="50" x2="240" y2="50" stroke="#333" strokeDasharray="2,2" />
              <line x1="0" y1="80" x2="240" y2="80" stroke="#333" strokeDasharray="2,2" />
              
              {/* Fill Gradient Path */}
              <path
                d="M 10 95 L 45 85 L 90 68 L 135 52 L 180 32 L 225 10 L 225 95 Z"
                fill="url(#grad)"
                opacity="0.15"
              />
              
              {/* Glow trend path */}
              <path
                d="M 10 95 Q 45 85, 90 68 T 135 52 T 180 32 T 225 10"
                fill="none"
                stroke="#f97316"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              
              {/* Highlight Circle on the last point */}
              <circle cx="225" cy="10" r="4.5" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
              
              {/* Labels */}
              <text x="10" y="93" fill="#888" fontSize="8" fontFamily="monospace">1月</text>
              <text x="90" y="93" fill="#888" fontSize="8" fontFamily="monospace">3月</text>
              <text x="210" y="93" fill="#888" fontSize="8" fontFamily="monospace">6月</text>
              
              <text x="135" y="44" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">曝光增长</text>
              
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="flex justify-between text-[9px] font-mono text-stone-500 mt-2 pt-2 border-t border-zinc-800">
            <span>起点: 0-1搭建</span>
            <span>目标: 稳定内容矩阵</span>
          </div>
        </div>
      )
    },
    {
      id: "chart-roi",
      title: "🎯 爆款短视频表现",
      metric: "2000万+ 播放",
      desc: "结合场馆互动属性、热点节点和用户代入感，完成高传播短视频内容包装。",
      renderVisual: () => (
        <div className="mt-4 bg-zinc-900 rounded-xl p-3 border border-zinc-800 text-stone-300">
          <div className="flex justify-between text-[10px] font-mono text-stone-400 mb-2.5">
            <span>内容表现对照</span>
            <span className="text-orange-400">Cyberjump Content</span>
          </div>
          
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span>单条视频最高播放</span>
                <span className="text-orange-400 font-bold">2000万+</span>
              </div>
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-amber-400 h-full rounded-full w-[90%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span>多条内容互动</span>
                <span className="text-stone-500">10万+点赞互动</span>
              </div>
              <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-stone-600 h-full rounded-full w-[42%]"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-[9px] text-[#38bdf8] bg-sky-950/40 p-1.5 rounded border border-sky-900/30 font-mono text-center">
            🔥 前3秒吸引力 · 标题封面优化 · 情绪节奏设计
          </div>
        </div>
      )
    },
    {
      id: "chart-funnel",
      title: "⚡ 内容运营全链路",
      metric: "策划到落地",
      desc: "覆盖选题、脚本、拍摄、剪辑、达人合作、活动执行、UGC裂变与复盘。",
      renderVisual: () => (
        <div className="mt-4 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
          <div className="space-y-1.5 text-[10px] font-mono text-stone-300">
            {/* Step 1 */}
            <div className="bg-zinc-800/60 p-1.5 rounded flex items-center justify-between border-l-2 border-orange-500">
              <span>1. 账号定位与选题策划</span>
              <span className="text-stone-400">0-1搭建</span>
            </div>
            {/* Step 2 */}
            <div className="bg-zinc-800/40 p-1.5 rounded flex items-center justify-between border-l-2 border-amber-500 ml-2">
              <span>2. 脚本拍摄剪辑与发布</span>
              <span className="text-stone-400">短视频制作</span>
            </div>
            {/* Step 3 */}
            <div className="bg-zinc-800/20 p-1.5 rounded flex items-center justify-between border-l-2 border-emerald-500 ml-4">
              <span>3. 活动互动与UGC裂变</span>
              <span className="text-stone-400">社群承接</span>
            </div>
            {/* Step 4 */}
            <div className="bg-emerald-950/30 p-1.5 rounded flex items-center justify-between border border-emerald-850 ml-6 text-emerald-300">
              <span>4. 达人合作与品牌传播</span>
              <span className="font-bold">100+达人</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNextCard = () => {
    setActiveCardIdx((prev) => (prev + 1) % cards.length);
  };

  return (
    <div id="metric-shots" className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
      {/* Absolute background accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400/5 rounded-full filter blur-xl"></div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-mono font-bold tracking-widest text-stone-400 uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-orange-500" />
            数据表现 (METRIC SHOTS)
          </h3>
          <button 
            onClick={handleNextCard}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono"
            title="切换卡片"
          >
            <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-300" />
            切换 ({activeCardIdx + 1}/{cards.length})
          </button>
        </div>

        {/* Dynamic transition container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCardIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-sans font-semibold text-stone-900 border-b border-stone-100 pb-1 flex items-center gap-1 text-sm">
                  {cards[activeCardIdx].title}
                </h4>
                <div className="text-xl font-bold text-orange-600 font-sans mt-1.5 tracking-tight flex items-center gap-1 shrink-0">
                  {cards[activeCardIdx].metric}
                  <ArrowUpRight className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-[11px] mt-1.5 leading-relaxed min-h-[36px]">
              {cards[activeCardIdx].desc}
            </p>

            {/* Render chart layout */}
            {cards[activeCardIdx].renderVisual()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[10px] font-mono text-stone-400">
          数据模型已脱敏验证
        </span>
        <button
          onClick={handleNextCard}
          className="text-[10px] font-sans font-medium text-orange-600 hover:text-orange-700 hover:underline cursor-pointer flex items-center gap-0.5"
        >
          查看下一项指标 &rarr;
        </button>
      </div>
    </div>
  );
}
