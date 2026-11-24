/* معمل Java التفاعلي — محرر كود + مترجم مصغّر + مهام موجهة. بيشتغل كله في المتصفح. */
(function (global) {
'use strict';
var CORE = global.JAVA_CORE;

/* ---------- المهام (المخرجات المتوقعة متأكد منها على JDK حقيقي) ---------- */
var MISSIONS = [
  {
    "id": "m1",
    "title": "أول سطر Java",
    "desc": "اطبع الجملة: أهلاً يا Java",
    "hint": "System.out.println(\"أهلاً يا Java\");",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        // اطبع الجملة هنا\n    }\n}",
    "expected": "أهلاً يا Java"
  },
  {
    "id": "m2",
    "title": "متغيرات بتتكلم",
    "desc": "خزّن اسمك في متغير String وسنك في int، واطبع: أنا <اسمك>، عندي <سنك> سنة (استخدم الاسم أحمد والسن 20)",
    "hint": "String name = \"أحمد\"; int age = 20; وبعدين println بدمج النصوص بـ +",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        String name = \"أحمد\";\n        int age = 20;\n        // اطبع: أنا أحمد، عندي 20 سنة\n    }\n}",
    "expected": "أنا أحمد، عندي 20 سنة"
  },
  {
    "id": "m3",
    "title": "آلة حاسبة صغيرة",
    "desc": "احسب مساحة دايرة نصف قطرها 3 (المعادلة: 3.14159 * r * r) واطبع الناتج double زي ما هو",
    "hint": "double area = 3.14159 * 3 * 3; واطبعها",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        double r = 3;\n        // احسب المساحة واطبعها\n    }\n}",
    "expected": "28.274309999999996"
  },
  {
    "id": "m4",
    "title": "ناجح ولا راسب؟",
    "desc": "عندك درجة 75 من 100. لو الدرجة 50 أو أكتر اطبع \"ناجح\"، غير كده اطبع \"راسب\"",
    "hint": "if (grade >= 50) { ... } else { ... }",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        int grade = 75;\n        // قرار النجاح هنا\n    }\n}",
    "expected": "ناجح"
  },
  {
    "id": "m5",
    "title": "مجموع الأرقام",
    "desc": "باستخدام for loop اجمع الأرقام من 1 لـ 100 واطبع المجموع",
    "hint": "int sum = 0; for (int i = 1; i <= 100; i++) { sum += i; }",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        // for loop تجمع من 1 لـ 100\n    }\n}",
    "expected": "5050"
  },
  {
    "id": "m6",
    "title": "أكبر رقم في المصفوفة",
    "desc": "عندك المصفوفة {4, 9, 2, 17, 6}. لف عليها واطبع أكبر رقم فيها",
    "hint": "int max = nums[0]; وبعدين for loop تقارن",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        int[] nums = {4, 9, 2, 17, 6};\n        // دوّر على أكبر رقم\n    }\n}",
    "expected": "17"
  },
  {
    "id": "m7",
    "title": "دالة المضروب",
    "desc": "اكتب دالة factorial بترجع مضروب رقم، واطبع factorial(5)",
    "hint": "static int factorial(int n) { int r = 1; for (...) r *= i; return r; }",
    "starter": "public class Main {\n    static int factorial(int n) {\n        // كمّل الدالة\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}",
    "expected": "120"
  },
  {
    "id": "m8",
    "title": "أول كلاس ليك",
    "desc": "اعمل كلاس Student فيه name و age ودالة introduce بتطبع: أنا منى، عندي 20 سنة. اعمل object واستدعِ الدالة",
    "hint": "class Student { String name; int age; void introduce() { System.out.println(...); } }",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        s.name = \"منى\";\n        s.age = 20;\n        s.introduce();\n    }\n}\n// اكتب كلاس Student هنا",
    "expected": "أنا منى، عندي 20 سنة"
  },
  {
    "id": "m9",
    "title": "قايمة المهام",
    "desc": "اعمل ArrayList<String> ضيف فيها 3 مهام، واطبع عددها بـ size()",
    "hint": "import java.util.ArrayList; وبعدين add ثلاث مرات",
    "starter": "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        // ArrayList فيها 3 مهام، اطبع العدد\n    }\n}",
    "expected": "3"
  },
  {
    "id": "m10",
    "title": "قبض على الخطأ",
    "desc": "اقسم 10 على 0 جوه try، وامسك ArithmeticException واطبع \"مينفعش نقسم على صفر!\"",
    "hint": "try { int r = 10 / 0; } catch (ArithmeticException e) { ... }",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        // try/catch هنا\n    }\n}",
    "expected": "مينفعش نقسم على صفر!"
  }
];

global.JAVA_LAB_META = { missions: MISSIONS.length };

function normalize(s) { return String(s == null ? '' : s).replace(/\s+$/,''); }
function checkMission(m, srcText) {
  var res = CORE.run(srcText);
  if (!res.ok) return { pass: false, output: res.output, error: res.error };
  return { pass: normalize(res.output) === normalize(m.expected), output: res.output, error: null };
}

/* ---------- واجهة المتصفح ---------- */
if (typeof document === 'undefined') {
  global.JAVA_LAB = { MISSIONS: MISSIONS, checkMission: checkMission };
  return;
}

var LAB_KEY = 'java-zero-lab-v1';
var codeEl = document.getElementById('code-in');
var outEl = document.getElementById('lab-out');
var runBtn = document.getElementById('run-btn');
var missionsPanel = document.getElementById('missions-panel');
var curMissionEl = document.getElementById('cur-mission');
var missionsDone = {};

function save() {
  try { localStorage.setItem(LAB_KEY, JSON.stringify({ code: codeEl.value, missionsDone: missionsDone })); } catch (e) {}
}
function load() {
  try {
    var raw = localStorage.getItem(LAB_KEY);
    if (!raw) return false;
    var d = JSON.parse(raw);
    if (d) { missionsDone = d.missionsDone || {}; if (typeof d.code === 'string' && d.code.trim()) { codeEl.value = d.code; return true; } }
  } catch (e) {}
  return false;
}
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function printLine(text, cls) {
  var div = document.createElement('div');
  if (cls) div.className = cls;
  div.textContent = text;
  outEl.appendChild(div);
  outEl.scrollTop = outEl.scrollHeight;
}

function currentMission() {
  for (var i = 0; i < MISSIONS.length; i++) if (!missionsDone[MISSIONS[i].id]) return MISSIONS[i];
  return null;
}

function renderMissions() {
  var cur = currentMission();
  var done = Object.keys(missionsDone).length;
  var html = '<div class="mission"><div class="m-title">🎯 مهام التدريب (' + done + '/' + MISSIONS.length + ')</div></div>';
  MISSIONS.forEach(function (m) {
    var isDone = !!missionsDone[m.id];
    var isCur = cur && cur.id === m.id;
    html += '<div class="mission' + (isDone ? ' done' : '') + '"' + (isCur ? ' style="border-color:rgba(122,167,255,.6)"' : '') + '>' +
      '<div class="m-title">' + (isDone ? '<span class="m-check">✓</span>' : '') + esc(m.title) + '</div>' +
      (isCur || !isDone ? '<p>' + esc(m.desc) + '</p><div class="m-hint">💡 ' + esc(m.hint) + '</div><button class="solution-toggle m-load" data-mid="' + m.id + '">حمّل كود البداية</button>' : '') +
      '</div>';
  });
  missionsPanel.innerHTML = html;
  Array.prototype.forEach.call(missionsPanel.querySelectorAll('.m-load'), function (b) {
    b.addEventListener('click', function () {
      var m = MISSIONS.find(function (x) { return x.id === b.getAttribute('data-mid'); });
      if (m) { codeEl.value = m.starter; save(); codeEl.focus(); printLine('📥 اتحمل كود بداية مهمة: ' + m.title, 't-hint'); }
    });
  });
  curMissionEl.textContent = cur ? ('المهمة الحالية: ' + cur.title) : 'خلصت كل المهام 🏆 — الوضع الحر مفتوح لك';
}

function runCode() {
  outEl.innerHTML = '';
  var srcText = codeEl.value;
  if (!srcText.trim()) { printLine('اكتب كود الأول 🙂', 't-dim'); return; }
  var res = CORE.run(srcText);
  if (res.output) res.output.replace(/\s+$/,'').split('\n').forEach(function (l) { printLine(l, ''); });
  if (!res.ok) printLine('❌ ' + res.error, 't-err');
  else printLine('— خلص التنفيذ من غير أخطاء —', 't-dim');
  var m = currentMission();
  if (m) {
    var chk = checkMission(m, srcText);
    if (chk.pass) {
      missionsDone[m.id] = true;
      printLine('✅ برافو! خلصت المهمة: ' + m.title, 't-ok');
      var nxt = currentMission();
      if (nxt) printLine('🎯 المهمة اللي بعدها: ' + nxt.title + ' — ' + nxt.desc, 't-hint');
      else printLine('🏆 خلصت كل مهام التدريب! جرب أي كود Java براحتك.', 't-ok');
    } else if (res.ok) {
      printLine('🎯 لسه مش المطلوب للمهمة "' + m.title + '". المفروض يطبع: ' + m.expected, 't-hint');
    }
  }
  renderMissions();
  save();
}

runBtn.addEventListener('click', runCode);
codeEl.addEventListener('keydown', function (ev) {
  if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') { ev.preventDefault(); runCode(); }
  if (ev.key === 'Tab') {
    ev.preventDefault();
    var st = codeEl.selectionStart, en = codeEl.selectionEnd;
    codeEl.value = codeEl.value.slice(0, st) + '    ' + codeEl.value.slice(en);
    codeEl.selectionStart = codeEl.selectionEnd = st + 4;
    save();
  }
});
codeEl.addEventListener('input', save);
document.getElementById('reset-lab').addEventListener('click', function () {
  missionsDone = {};
  codeEl.value = MISSIONS[0].starter;
  outEl.innerHTML = '';
  bootText();
  renderMissions();
  save();
});
document.getElementById('missions-toggle').addEventListener('click', function () {
  missionsPanel.hidden = !missionsPanel.hidden;
  if (!missionsPanel.hidden) renderMissions();
});

function bootText() {
  printLine('أهلاً بيك في معمل Java التفاعلي 👋', 't-hint');
  printLine('اكتب كود Java في المحرر واضغط "شغّل الكود" (أو Ctrl+Enter). المترجم بيشتغل على جهازك مباشرة.', 't-dim');
  var m = currentMission();
  if (m) printLine('🎯 مهمتك الحالية: ' + m.title + ' — ' + m.desc, 't-hint');
}

global.JAVA_LAB_FOCUS = function () { codeEl.focus(); };

if (!load()) codeEl.value = MISSIONS[0].starter;
bootText();
renderMissions();

global.JAVA_LAB = { MISSIONS: MISSIONS, checkMission: checkMission };
})(typeof window !== 'undefined' ? window : globalThis);
