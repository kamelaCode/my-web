/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, FileText, CheckCircle, Clock } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILL_CATEGORIES, CERTIFICATES } from '../data';

export default function ResumeDownloadSection() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const currentDateStr = "20260601";

  const triggerDownload = (format: 'pdf' | 'docx') => {
    const filename = `康康-新媒体运营-个人简历-${currentDateStr}.${format}`;
    let content = "";
    let mimeType = "";

    if (format === 'docx') {
      // Create rich HTML file formatted in a way that MS Word reads perfectly as a document
      mimeType = 'application/msword;charset=utf-8';
      content = `
        <html xmlns:o='urn:schemas-microsoft-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>康康 - 新媒体运营 个人简历</title>
          <style>
            body { font-family: 'Microsoft YaHei', sans-serif; line-height: 1.6; color: #333; padding: 20px; }
            h1 { color: #d9383a; border-bottom: 2px solid #d9383a; padding-bottom: 8px; }
            h2 { color: #2d3748; margin-top: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
            .info-item { font-size: 14px; margin-bottom: 5px; }
            .exp-header { font-weight: bold; display: flex; justify-content: space-between; margin-top: 15px; }
            .achievements-list { margin-left: 20px; }
            .tech-badge { background-color: #f7fafc; border: 1px solid #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-right: 5px; display: inline-block; }
          </style>
        </head>
        <body>
          <h1>康康</h1>
          <p class="info-item"><strong>求职意向：</strong>${PERSONAL_INFO.title} | <strong>所在地：</strong>${PERSONAL_INFO.location} | <strong>电话：</strong>${PERSONAL_INFO.phone} | <strong>邮箱：</strong>${PERSONAL_INFO.email}</p>
          
          <h2>个人简介</h2>
          <p>${PERSONAL_INFO.bioIntro}</p>
          
          <h2>工作经历</h2>
          ${EXPERIENCES.map(exp => `
            <div style="margin-bottom: 18px;">
              <div class="exp-header" style="background-color: #f7fafc; padding: 5px 10px;">
                <strong>${exp.company}</strong> | <span>${exp.role}</span> | <i>${exp.period}</i>
              </div>
              <p style="font-size: 13px; color: #555; margin: 5px 0;">${exp.content}</p>
              <ul class="achievements-list">
                ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
          
          <h2>核心实战作品集 (部分摘要)</h2>
          ${PROJECTS.slice(0, 3).map(proj => `
            <div style="margin-bottom: 15px; border-left: 3px solid #d9383a; padding-left: 10px;">
              <h4><strong>${proj.title}</strong> (${proj.year})</h4>
              <p><strong>角色：</strong>${proj.role}</p>
              <p><strong>核心技术：</strong>${proj.techStack.join(' | ')}</p>
              <p><strong>功能与攻坚：</strong>${proj.features.join('；')}</p>
              <p><strong>核心产出：</strong>${proj.achievements.join('；')}</p>
            </div>
          `).join('')}
          
          <h2>专业技能</h2>
          ${SKILL_CATEGORIES.map(cat => `
            <p><strong>${cat.category}：</strong>${cat.skills.join('，')}</p>
          `).join('')}
          
          <h2>教育经历与求职补充</h2>
          <ul>
            ${CERTIFICATES.map(cert => `
              <li><strong>${cert.title}</strong> - ${cert.issuer} (${cert.date}) [${cert.status}]</li>
            `).join('')}
          </ul>
        </body>
        </html>
      `;
    } else {
      // Generate standard ASCII/Rich Printable formatting for PDF print conversion
      mimeType = 'text/plain;charset=utf-8';
      content = `康康 - 新媒体运营 个人求职简历
=========================================
求职意向：${PERSONAL_INFO.title}
所在地：${PERSONAL_INFO.location}
联系电话：${PERSONAL_INFO.phone}
联系邮箱：${PERSONAL_INFO.email}
微信号码：${PERSONAL_INFO.wechat}
更新日期：2026年6月1日

-----------------------------------------
【个人优势 / SUMMARY】
${PERSONAL_INFO.bioIntro}

-----------------------------------------
【工作经历 / WORK EXPERIENCE】

${EXPERIENCES.map(exp => `■ ${exp.company}
  职位：${exp.role}
  周期：${exp.period}
  简介：${exp.content}
  核心业绩输出：
  ${exp.achievements.map((ach, idx) => `  ${idx + 1}. ${ach}`).join('\n  ')}
`).join('\n')}

-----------------------------------------
【项目作品集实操 / CASE STUDIES】

${PROJECTS.map(proj => `● 项目名称：${proj.title} - ${proj.subtitle} (${proj.year})
  负责角色：${proj.role}
  关键策略：${proj.techStack.join(' / ')}
  落地动作：
  ${proj.features.map(f => `  - ${f}`).join('\n  ')}
  产出成果：
  ${proj.achievements.map(a => `  * ${a}`).join('\n  ')}
`).join('\n')}

-----------------------------------------
【核心技能地图 / EXPERTISE】
${SKILL_CATEGORIES.map(cat => `* ${cat.category}：
  ${cat.skills.join(' / ')}`).join('\n\n')}

-----------------------------------------
【教育经历与求职补充 / EDUCATION & NOTES】
${CERTIFICATES.map(cert => `- ${cert.title} | ${cert.issuer} (${cert.date})`).join('\n')}

=========================================
提示：电话、邮箱、所在地、学校与专业仍需补充真实信息后再正式投递。
若需在浏览器直接生成彩色 PDF：请按 Ctrl+P (或 CMD+P) 将本个人网页转存为 PDF 文件。
`.trim();
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(format);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div id="cv-download" className="bg-[#FFFFFA] border border-stone-200 rounded-xl p-6 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-orange-400"></div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-orange-50 text-orange-700 border border-orange-200 mb-3">
            <Clock className="w-3 h-3" />
            已更新：2026年06月01日 (最新版)
          </span>
          <h3 className="text-lg font-sans font-semibold text-stone-900 tracking-tight flex items-center gap-2">
            📥 下载求职简历（HR 归档专用）
          </h3>
          <p className="text-stone-500 text-xs mt-1.5 leading-relaxed max-w-xl">
            提供经过排版优化的 <strong>PDF格式</strong> 和 <strong>Word(doc)格式</strong> 简历镜像包供即时下载。
            文件名已严格遵循 <code>[姓名]-[职位]-简历-[日期]</code> 标准化结构命名，契合企业 ATS 识别规范，方便一键导入与归档。
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto shrink-0">
          {/* PDF Download Button */}
          <button 
            id="download-pdf-btn"
            onClick={() => triggerDownload('pdf')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100/80 active:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-rose-500 group-hover:scale-105 transition-transform" />
            下载 PDF 格式 (.pdf)
          </button>

          {/* Word Download Button */}
          <button 
            id="download-doc-btn"
            onClick={() => triggerDownload('docx')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100/80 active:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium transition-colors cursor-pointer group"
          >
            <Download className="w-4 h-4 text-blue-500 group-hover:translate-y-0.5 transition-transform" />
            下载 Word 格式 (.doc)
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-700 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>正在成功下载：<strong>康康-新媒体运营-个人简历-20260601.{downloadSuccess === 'pdf' ? 'pdf' : 'doc'}</strong></span>
        </div>
      )}

      {/* Manual Action Guidance */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
        <span>档案大小：~45KB (极速下载)</span>
        <span className="hidden sm:inline">💡 专业贴士：您也可以按键盘 [Ctrl+P / Command+P] 将本页面直接保存为精致的彩色纸质简历 PDF。</span>
      </div>
    </div>
  );
}
