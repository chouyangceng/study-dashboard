// 考研执行看板 · 计划数据
// 从 清华车辆822考研计划_最新大纲重制版.xlsx 的 10_详细周计划 提取
// 结构：周 → 每日任务块（对应 02_每日时间表 的主攻块）

// 当前阶段映射（依据 01_阶段导航）
const STAGES = [
  { id: 1, name: '阶段1 基础', range: '2026-08 ~ 2026-11', focus: '高数基础 + 雅思/转考研英语 + 822入门', accept: '高数基础收口；雅思完成；822入门图谱成型' },
  { id: 2, name: '阶段2 强化', range: '2026-12 ~ 2027-03', focus: '高数强化 + 线代 + 660 + 822一轮', accept: '30讲、1000A、线代、基础题型全部成框架' },
  { id: 3, name: '阶段3 二轮', range: '2027-04 ~ 2027-06', focus: '高数二次强化 + 1000B + 880 + 822二轮', accept: '36讲、1000B、880、英二精翻72篇完成' },
  { id: 4, name: '阶段4 专题', range: '2027-07 ~ 2027-09', focus: '概率 + 真题预热 + 822专题', accept: '概率9讲、英一阅读、政治启动、822专题成型' },
  { id: 5, name: '阶段5 冲刺', range: '2027-10 ~ 2027-12', focus: '真题/模拟/冲刺', accept: '真题节奏稳定，考前只看错题与框架' },
];

// 每日时间块（02_每日时间表 固定作息）
const DAY_BLOCKS = [
  { id: 'm1', label: '早读/主攻块1', time: '07:00-09:30' },
  { id: 'm2', label: '主攻块2', time: '09:45-11:15' },
  { id: 'm3', label: '主攻块3', time: '13:30-15:00' },
  { id: 'm4', label: '主攻块4', time: '15:15-16:45' },
  { id: 'night', label: '晚间', time: '21:00-22:00' },
];

// 每周计划任务（由 xlsx 03_周阶梯 + 10_详细周计划 抽取）
// 每周 7 项验收任务，每项可勾选
const WEEK_PLANS = [
  {
    week: 1, range: '8/4-8/9', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第1/3/4讲 + 1000A对应题', metric: '讲次/题组' },
      { block: 'm1', text: '每天错题≥10道（标注，不用错题本）', metric: '错题数' },
      { block: 'm2', text: '822入门：反馈结构、传递函数、开环/闭环', metric: '章节' },
      { block: 'm3', text: '雅思W1：词汇100/日 + 听音朗读', metric: '词汇量' },
      { block: 'm3', text: '精翻阅读 2 篇/日', metric: '篇数' },
      { block: 'm4', text: '822结论卡：每周至少复述1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '822入门：能画反馈结构、写传递函数'
  },
  {
    week: 2, range: '8/10-8/16', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第5/7/8讲 + 1000A对应题', metric: '讲次/题组' },
      { block: 'm1', text: '回做上周错题≥50道', metric: '错题数' },
      { block: 'm2', text: '822入门：时域指标、阶跃响应、稳态误差 + 基础题2组', metric: '章节' },
      { block: 'm3', text: '雅思W2：词汇100/日 + 听力错因分类', metric: '词汇量' },
      { block: 'm3', text: '精翻阅读 2 篇/日', metric: '篇数' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 听力复盘', metric: '完成' },
    ],
    check: '时域指标公式能默写'
  },
  {
    week: 3, range: '8/17-8/23', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第9/10/12讲 + 1000A对应题', metric: '讲次/题组' },
      { block: 'm1', text: '核心计算讲义补薄弱题型', metric: '题型' },
      { block: 'm2', text: '822入门：稳定性判据、误差系数 + 整理易混概念', metric: '章节' },
      { block: 'm3', text: '雅思W3：Sun听读方法论 + 阅读定位训练', metric: '训练' },
      { block: 'm3', text: '写作框架初稿', metric: '产出' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：错题标注 + 复盘', metric: '完成' },
    ],
    check: 'Routh判据能独立用一次'
  },
  {
    week: 4, range: '8/24-8/30', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第13/14/15讲 + 1000A阶段小测', metric: '讲次/小测' },
      { block: 'm1', text: '列出正确率<50%的章', metric: '清单' },
      { block: 'm2', text: '822入门：频域/Bode/Nyquist + 建立题型符号表', metric: '章节' },
      { block: 'm3', text: '雅思W4：口语素材Part1/2 + 作文框架', metric: '素材' },
      { block: 'm3', text: '1次听读小模考', metric: '模考' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '月末复盘：周总结 + 下月缺口', metric: '完成' },
    ],
    check: 'Bode图能画出积分+惯性环节'
  },
  {
    week: 5, range: '8/31-9/6', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第16-18讲 + 1000A对应题', metric: '讲次/题组' },
      { block: 'm2', text: '822基础：数学模型与方块图化简 + 题型卡1组', metric: '章节' },
      { block: 'm3', text: '雅思：听力Section1-2专项 + 阅读判断/匹配题', metric: '训练' },
      { block: 'm3', text: '词汇复习100%', metric: '完成率' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '能独立化简3重反馈方块图'
  },
];

// 周复盘规则（07_执行规则）
const RULES = [
  { cond: '1000A正确率 > 50%', action: '继续30讲+1000A同步推进' },
  { cond: '1000A正确率 ≤ 50%', action: '只做讲义题与例题，先把基本计算打稳（降级）' },
  { cond: '周完成率 < 70%', action: '下周新内容减20%，先补欠账' },
  { cond: '连续两周欠账', action: '只保留一条主线，砍掉轻任务' },
  { cond: '1000A一刷正确率 ≥ 60%', action: 'A4大法：默写框架（铅笔写/黑笔补漏/红笔标重点）' },
];
