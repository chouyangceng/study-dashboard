// 学习执行看板 · 计划数据
// 从清华车辆 822 学习计划的详细周计划提取
// 结构：周 → 每日任务块（对应 02_每日时间表 的主攻块）

// 当前阶段映射（依据 01_阶段导航）
const STAGES = [
  { id: 1, name: '阶段1 基础', range: '2026-08 ~ 2026-11', focus: '高数基础 + 雅思/英语备考 + 822入门', accept: '高数基础收口；雅思完成；822入门图谱成型' },
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

  {
    week: 6, range: '9/7-9/13', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第19-21讲 + 1000A对应', metric: '讲次/题组' },
      { block: 'm2', text: '822基础：时域响应与稳定性 + 错题标注统一(圆/方/星/三角)', metric: '章节' },
      { block: 'm3', text: '雅思：听力Section3-4专项 + 阅读长难句精翻', metric: '训练' },
      { block: 'm3', text: '写作Task1框架', metric: '产出' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '稳定性判据能独立用一次（Routh）'
  },
  {
    week: 7, range: '9/14-9/20', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础：30讲第22-25讲 + 1000A对应', metric: '讲次/题组' },
      { block: 'm1', text: '补2/6/11中最必要内容', metric: '章节' },
      { block: 'm2', text: '822基础：根轨迹/频域初步 + 补讲义例题', metric: '章节' },
      { block: 'm3', text: '雅思：口语Part2素材库 + 写作Task2观点库', metric: '素材' },
      { block: 'm3', text: '1套听读限时', metric: '套' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '能画出二阶系统根轨迹'
  },
  {
    week: 8, range: '9/21-9/27', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础收口：30讲第26-30讲 + 统计1000A正确率并分流', metric: '讲次/分流' },
      { block: 'm1', text: '正确率≥60%立即启动A4大法', metric: 'A4' },
      { block: 'm2', text: '822基础：串联校正/反馈校正概念 + 月末小测', metric: '章节' },
      { block: 'm3', text: '雅思：完整听读模考1次 + 作文2篇修改', metric: '模考' },
      { block: 'm3', text: '口语录音复盘2次', metric: '次数' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '月末复盘：周总结 + 下月缺口', metric: '完成' },
    ],
    check: '822入门图谱成型'
  },
  {
    week: 9, range: '9/28-10/4', stage: 1,
    tasks: [
      { block: 'm1', text: '高数基础验收：零基础讲义目录逐项打勾', metric: '验收' },
      { block: 'm2', text: '822基础目录验收：传递函数/方块图 + 课后题第1组', metric: '章节' },
      { block: 'm3', text: '雅思冲刺：听读套题2套 + 作文各1篇', metric: '套' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '高数基础目录打通'
  },
  {
    week: 10, range: '10/5-10/11', stage: 1,
    tasks: [
      { block: 'm1', text: '1000A分流执行：≤50%章节只回讲义', metric: '分流' },
      { block: 'm2', text: '822基础目录验收：时域/稳定性 + 课后题第2组', metric: '章节' },
      { block: 'm3', text: '雅思冲刺：口语全流程 + 作文修改2轮', metric: '训练' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '时域/稳定性验收通过'
  },
  {
    week: 11, range: '10/12-10/18', stage: 1,
    tasks: [
      { block: 'm1', text: '高数补弱：30讲跳过章节回补 + 每天10道错题', metric: '章节/错题' },
      { block: 'm2', text: '822基础目录验收：频域/校正 + 课后题第3组', metric: '章节' },
      { block: 'm3', text: '雅思冲刺：完整模考1套 + Lexi写作反馈', metric: '模考' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 高频错词整理', metric: '完成' },
    ],
    check: '频域/校正验收通过'
  },
  {
    week: 12, range: '10/19-10/25', stage: 1,
    tasks: [
      { block: 'm1', text: '月末测评：1000A错题重做 + 确定12月二刷清单', metric: '测评' },
      { block: 'm2', text: '822基础总复盘：形成一轮基础缺口清单', metric: '复盘' },
      { block: 'm3', text: '雅思考前：听读限时 + 口语录音 + 作文调整', metric: '训练' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '月末复盘：周总结 + 下月缺口', metric: '完成' },
    ],
    check: '822一轮基础缺口清单成型'
  },
  {
    week: 13, range: '10/26-11/1', stage: 1,
    tasks: [
      { block: 'm1', text: '高数复核：30讲第1-8讲错题回看 + 1000A错题重做', metric: '错题' },
      { block: 'm2', text: '822基础：系统建模与反馈结构 + 讲义错题回做', metric: '章节' },
      { block: 'm3', text: '雅思考前：听读限时 + 口语录音 + 作文模板调整', metric: '训练' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '822反馈结构错题清零'
  },
  {
    week: 14, range: '11/2-11/8', stage: 1,
    tasks: [
      { block: 'm1', text: '高数复核：30讲第9-16讲错题回看', metric: '错题' },
      { block: 'm2', text: '822基础：时域响应与稳定性 + 题型卡更新', metric: '章节' },
      { block: 'm3', text: '雅思考试周：轻复盘，不硬开新任务', metric: '考试' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '雅思考试完成'
  },
  {
    week: 15, range: '11/9-11/15', stage: 1,
    tasks: [
      { block: 'm1', text: '高数复核：30讲第17-24讲错题回看 + 整理二刷顺序', metric: '错题' },
      { block: 'm2', text: '822基础：频域法与Bode + 基础题限时', metric: '章节' },
      { block: 'm3', text: '英语备考切换：单词50-100/日 + 外刊长难句第1批', metric: '词汇/外刊' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '英语备考启动'
  },
  {
    week: 16, range: '11/16-11/22', stage: 1,
    tasks: [
      { block: 'm1', text: '高数复核：30讲第25-30讲 + 2/6/11 + 形成强化清单', metric: '错题' },
      { block: 'm2', text: '822基础：根轨迹/校正 + 结论卡复述', metric: '章节' },
      { block: 'm3', text: '英语备考：单词第1轮继续 + 外刊长难句第2批', metric: '词汇/外刊' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '晚间复盘：单词 + 错题回顾', metric: '完成' },
    ],
    check: '阶段1收口清单成型'
  },
  {
    week: 17, range: '11/23-11/29', stage: 1,
    tasks: [
      { block: 'm1', text: '高数缓冲：1000A高频错题二刷 + 章节正确率统计', metric: '错题' },
      { block: 'm2', text: '822基础缓冲：补课程/雅思冲突欠账', metric: '欠账' },
      { block: 'm3', text: '英语备考缓冲：补齐单词复习 + 准备牛皮纸真题册', metric: '缓冲' },
      { block: 'm4', text: '822结论卡复述 ≥1次', metric: '次数' },
      { block: 'night', text: '月末复盘：周总结 + 12月强化清单', metric: '完成' },
    ],
    check: '阶段1验收：高数基础收口/雅思完成/822入门图谱成型'
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
