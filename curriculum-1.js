/* Curriculum part 1: why Java, setup, hello, variables, conditions, loops, arrays */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
  id: 'why-java',
  nav: 'ليه Java أصلاً؟',
  title: 'ليه Java أصلاً؟ وليه لسه مهمة لحد دلوقتي',
  subtitle: 'قصة Java، يعني إيه JVM و JDK، وفين بتتستخدم في العالم الحقيقي',
  blocks: [
    { type: 'p', text: 'Java لغة برمجة اتولدت سنة 1995 في شركة Sun Microsystems على إيد James Gosling وفريقه، وبقت بعد كده ملك Oracle. الفكرة اللي خلاها تغير الدنيا وقتها كانت جملة واحدة: `Write Once, Run Anywhere`، يعني اكتب الكود مرة واحدة وشغله على أي جهاز: Windows أو macOS أو Linux أو حتى تليفون.' },
    { type: 'p', text: 'السر في حاجة اسمها `JVM` (Java Virtual Machine). الكود اللي بتكتبه بيتحول لشكل وسيط اسمه `bytecode`، والـ JVM هي اللي بتشغله. كل نظام تشغيل عنده JVM خاصة بيه، بس الـ bytecode واحد. يعني انت بتكتب الكود مرة، والـ JVM هي اللي بتتكفل بباقي الحكاية على كل جهاز.' },
    { type: 'h', text: 'JDK و JRE و JVM: التلاتة دول إيه؟' },
    { type: 'table', head: ['المصطلح', 'معناه', 'بيحتوي على'], rows: [
      ['JVM', 'Java Virtual Machine: اللي بتشغل الـ bytecode', 'محرك التشغيل نفسه'],
      ['JRE', 'Java Runtime Environment: بيئة التشغيل', 'JVM + مكتبات التشغيل'],
      ['JDK', 'Java Development Kit: عدّة المطور', 'JRE + المترجم javac + أدوات التطوير']
    ] },
    { type: 'p', text: 'كمبرمج، انت محتاج الـ `JDK`: فيها المترجم `javac` اللي بيحول كودك لـ bytecode، وأداة التشغيل `java` اللي بتشغله على الـ JVM. في الدرس الجاي هنثبتها خطوة بخطوة.' },
    { type: 'h', text: 'فين Java شغالة حواليك؟' },
    { type: 'list', items: [
      'تطبيقات Android: أغلب تطبيقات أندرويد اتكتبت بـ Java (ودلوقتي Kotlin كمان، وهي شغالة على نفس الـ JVM).',
      'الأنظمة الخلفية (Backend): بنوك، شركات اتصالات، وحكومات بتعتمد على Java في الأنظمة الكبيرة بأدوات زي Spring.',
      'أنظمة المؤسسات: برامج المحاسبة وإدارة الموارد ERP اللي بتشتغل في الشركات الكبيرة.',
      'أدوات المطورين نفسها: IntelliJ IDEA و Eclipse و Android Studio كلها مبنية بـ Java.',
      'البيانات الضخمة: أدوات زي Hadoop و Kafka مكتوبة بـ Java.'
    ] },
    { type: 'h', text: 'ليه تبدأ بيها وهي مش أسهل لغة؟' },
    { type: 'p', text: 'Java بتعلمك البرمجة صح: أنواع واضحة (`statically typed`)، تنظيم بالـ Classes والـ Objects، ورسايل خطأ بتقولك الغلطة بالظبط. اللي بيتعلم Java كويس بيلاقي أي لغة تانية أسهل بعدها: المفاهيم اللي هتتعلمها هنا (شروط، لوبس، دوال، OOP) هي نفسها في كل اللغات تقريباً.' },
    { type: 'note', text: 'سوق الشغل: Java من أكتر اللغات المطلوبة في الشركات الكبيرة والبنوك في مصر والمنطقة، وخاصة في شغل الـ Backend بـ Spring Boot. يعني اللي هتتعلمه هنا مباشرة على طريق شغل حقيقي.' },
    { type: 'h', text: 'الرحلة اللي جاية' },
    { type: 'list', items: [
      'هتثبت الـ JDK وتكتب أول برنامج ليك وتشغله بنفسك.',
      'هتتعلم المتغيرات والأنواع، الشروط، اللوبس، والـ Arrays.',
      'هتنظم كودك بالـ Methods وبعدين تدخل عالم الـ OOP: Classes و Inheritance و Interfaces.',
      'هتتعرف على الـ Collections زي ArrayList و HashMap، وتتعلم تتعامل مع الأخطاء بالـ Exceptions.',
      'في الآخر: مشروع ختامي، تطبيق console كامل بتبنيه بنفسك من الأول للآخر.'
    ] }
  ],
  quiz: [
    { q: 'إيه الفكرة الأساسية اللي اتبنت عليها Java؟', options: [
      { text: 'إنها أسرع لغة في العالم' },
      { text: 'Write Once, Run Anywhere: اكتب الكود مرة وشغله على أي نظام' },
      { text: 'إنها لغة مخصصة للمواقع بس' }
    ], answer: 1, explain: 'الكود بيتحول لـ bytecode موحد، والـ JVM على كل نظام بتشغله. دي فكرة Write Once, Run Anywhere.' },
    { q: 'مين اللي بيشغل الـ bytecode بتاع Java؟', options: [
      { text: 'المتصفح' },
      { text: 'المترجم javac' },
      { text: 'الـ JVM (Java Virtual Machine)' }
    ], answer: 2, explain: 'javac بيحول الكود لـ bytecode، والـ JVM هي اللي بتنفذه سطر بسطر وقت التشغيل.' },
    { q: 'انت كمبرمج محتاج تثبت إيه عشان تكتب وتشغل برامج Java؟', options: [
      { text: 'الـ JDK', mono: true },
      { text: 'الـ JRE بس', mono: true },
      { text: 'متصفح Chrome', mono: true }
    ], answer: 0, explain: 'الـ JDK فيها المترجم javac وأدوات التطوير زيادة على بيئة التشغيل. الـ JRE لوحدها بتشغل بس ومبتكتبش.' }
  ],
  exercises: [
    { task: 'اكتب بإيدك 3 تطبيقات أو أنظمة بتستخدمها في حياتك وتفتكر إن Java ممكن تكون جزء منها، وقول ليه', code: `# أمثلة متوقعة (مفيش إجابة نموذجية واحدة):
# 1. تطبيق البنك على الموبايل: أندرويد + Backend بـ Java
# 2. تطبيقات التوصيل زي طلبات: تطبيق أندرويد وخوادم خلفية
# 3. Android Studio نفسه لو جربت تثبته: مبني بـ Java`, why: 'الهدف إنك تربط اللغة بحاجات حقيقية بتحصل حواليك، مش مجرد اسم في كورس.' },
    { task: 'من غير ما ترجع للدرس، رتب التلاتة دول من الأصغر للأكبر: JDK و JRE و JVM، واكتب ليه اخترت الترتيب ده', code: `# الترتيب: JVM ثم JRE ثم JDK
# JVM = محرك التشغيل بس
# JRE = JVM + مكتبات التشغيل
# JDK = JRE + المترجم javac + أدوات المطور`, why: 'كل واحدة بتحتوي اللي قبلها. عشان كده كمبرمج بتثبت JDK واحدة وخلاص.' }
  ]
}
,
{
  id: 'setup',
  nav: 'تثبيت JDK',
  title: 'تثبيت JDK وإعداد بيئة الشغل',
  subtitle: 'نزل العدة، اتأكد إنها شغالة، واختار المحرر اللي هتكتب فيه',
  blocks: [
    { type: 'p', text: 'قبل ما نكتب سطر كود واحد، نثبت الـ `JDK`. التثبيت بياخد دقايق وبيحصل مرة واحدة في عمر الجهاز. أنصحك تثبت نسخة LTS (Long-Term Support) زي Java 17 أو Java 21: دي النسخ المستقرة اللي الشركات بتستخدمها.' },
    { type: 'h', text: 'التثبيت حسب نظامك' },
    { type: 'list', items: [
      'Windows: نزل المتسبت الرسمي من adoptium.net (نسخة Eclipse Temurin المجانية) أو من oracle.com، اختار نسخة LTS لنظام Windows x64، ودوس Next على كل حاجة. المتسبت بيضيف java للـ PATH لوحده.',
      'macOS: الأسهل من Homebrew: brew install --cask temurin، أو نزل متسبت macOS من نفس الموقع.',
      'Linux (Ubuntu/Debian): sudo apt update && sudo apt install openjdk-17-jdk'
    ] },
    { type: 'h', text: 'اتأكد إن كل حاجة تمام' },
    { type: 'p', text: 'افتح الترمنال (على Windows: ابحث عن cmd أو PowerShell) واكتب الأمرين دول:' },
    { type: 'code', code: `$ java -version
openjdk version "17.0.13" 2024-10-15
OpenJDK Runtime Environment Temurin-17.0.13+11 (build 17.0.13+11)
OpenJDK 64-Bit Server VM Temurin-17.0.13+11 (build 17.0.13+11, mixed mode)

$ javac -version
javac 17.0.13` },
    { type: 'p', text: 'أرقام النسخ عندك ممكن تختلف، المهم إن الأمرين يطلعوا رقم نسخة مش رسالة خطأ. لو ظهر `java is not recognized` على Windows، قفل الترمنال وافتحه تاني، ولو المشكلة فضلت راجع خطوة الـ PATH في المتسبت.' },
    { type: 'note', text: 'من Java 11 في ميزة لذيذة: تقدر تشغل ملف Java واحد مباشرة بالأمر `java Hello.java` من غير ما تعمل compile في خطوة لوحدها. هنستخدمها في الأول، وبعدين هنتعلم الطريقة الكاملة `javac` وبعدين `java` في الدرس الجاي.' },
    { type: 'h', text: 'هتكتب الكود فين؟' },
    { type: 'list', items: [
      'IntelliJ IDEA Community Edition: مجانية وأشهر IDE لـ Java في العالم. فيها إكمال تلقائي واكتشاف أخطاء لحظي، وهي الاختيار الأريح للمبتدئين.',
      'VS Code: خفيف وسريع، ثبت فيه إضافة Extension Pack for Java وهيشتغل معاك كويس.',
      'أي محرر نصوص + الترمنال: شغال برضه، وبيفهمك إيه اللي بيحصل تحت الغطاء. هنبدأ بيه في الدرس الجاي عشان تشوف الـ compile والتشغيل بعينك.'
    ] },
    { type: 'h', text: 'مفيش جهاز كمبيوتر تحت إيدك دلوقتي؟' },
    { type: 'p', text: 'متوقفش: الموقع ده فيه معمل Java تفاعلي جوه المتصفح (من الشريط اللي فوق)، هيتيح لك تكتب كود Java وتشغله وتشوف الناتج فوراً من غير أي تثبيت. كمل الدروس وتمرن في المعمل، وثبت الـ JDK على جهازك أول ما يتاح.' },
    { type: 'note', warn: true, text: 'معمل الموقع بيدعم مجموعة من أوامر Java الأساسية اللي هنتعلمها في الدروس، مش اللغة كلها. أي كود خارج المدعوم هيقولك بوضوح إنه مش متاح في المعمل، وده طبيعي: جربه على جهازك بعد تثبيت الـ JDK.' }
  ],
  quiz: [
    { q: 'إيه الأمر اللي بيتأكد إن المترجم نفسه متثبت؟', options: [
      { text: 'javac -version', mono: true },
      { text: 'java -start', mono: true },
      { text: 'jdk install', mono: true }
    ], answer: 0, explain: 'javac هو المترجم. لو javac -version طلع رقم، يبقى الـ JDK كاملة متثبتة صح.' },
    { q: 'من Java 11، إزاي تشغل ملف Hello.java في خطوة واحدة؟', options: [
      { text: 'run Hello.java', mono: true },
      { text: 'java Hello.java', mono: true },
      { text: 'javac run Hello', mono: true }
    ], answer: 1, explain: 'java Hello.java بيعمل compile وتشغيل في خطوة واحدة للملفات المفردة. الطريقة التقليدية javac ثم java لسه شغالة عادي.' },
    { q: 'ليه بنفضل نسخة LTS زي 17 أو 21؟', options: [
      { text: 'لأنها نسخ مستقرة بتحصل على دعم وتحديثات فترة طويلة، ومعتمدة في الشركات' },
      { text: 'لأنها أسرع في التحميل' },
      { text: 'لأنها النسخ الوحيدة المجانية' }
    ], answer: 0, explain: 'LTS معناها دعم طويل المدى. الشركات بتبني أنظمتها عليها، فبتتعلم على نفس النسخة اللي في سوق الشغل.' }
  ],
  exercises: [
    { task: 'ثبت الـ JDK على جهازك وشغل أمرين التحقق، واكتب رقم النسخة اللي ظهرت عندك', code: `$ java -version
openjdk version "17.0.13" 2024-10-15
...
$ javac -version
javac 17.0.13`, why: 'لو الأمرين طلعوا أرقام نسخ، انت جاهز رسمياً. أي نسخة 11 أو أحدث هتشتغل معاك في الأكاديمية كلها.' },
    { task: 'سطب واحد من المحررين: IntelliJ IDEA Community أو VS Code مع إضافة Java، وافتحه وتأكد إنه شغال', code: `# IntelliJ IDEA Community:
#   نزله من jetbrains.com/idea/download (اختار Community المجانية)
# VS Code:
#   نزله من code.visualstudio.com
#   وبعدين من Extensions ابحث عن: Extension Pack for Java`, why: 'المحرر الكويس بيوفر عليك وقت كبير: بيظبط الأقواس، بيلون الكود، وبيظهر الغلطات قبل ما تشغل.' }
  ]
}
,
{
  id: 'hello',
  nav: 'أول برنامج',
  title: 'أول برنامج ليك: أهلاً يا عالم',
  subtitle: 'تشريح برنامج Java سطر بسطر، من الكود لحد ما يظهر الناتج',
  blocks: [
    { type: 'p', text: 'يلا نكتب أول برنامج. افتح أي محرر نصوص، اعمل ملف اسمه `Hello.java`، واكتب فيه الكود ده بالظبط:' },
    { type: 'code', code: `class Hello {
  public static void main(String[] args) {
    System.out.println("أهلاً يا عالم");
  }
}
// الناتج:
// أهلاً يا عالم` },
    { type: 'p', text: 'احفظ الملف، افتح الترمنال في نفس الفولدر، وشغله:' },
    { type: 'code', code: `$ java Hello.java
أهلاً يا عالم` },
    { type: 'p', text: 'مبروك! ده أول برنامج Java تشغله بنفسك. دلوقتي تعالى نفهم كل سطر بيعمل إيه، لأن نفس الهيكل ده هيتكرر في كل برنامج تقريباً.' },
    { type: 'h', text: 'تشريح البرنامج سطر بسطر' },
    { type: 'list', items: [
      'class Hello { ... }: كل كود Java عايش جوه `class`. اسم الكلاس لازم يطابق اسم الملف بالظبط: Hello في ملف Hello.java. حرف الـ H الكابيتال مهم: Java بتهتم بالحروف (case-sensitive).',
      'public static void main(String[] args): دي نقطة البداية. أول ما تشغل البرنامج، الـ JVM بتدور على الـ method دي بالاسم والشكل ده بالظبط وتبدأ من أول سطر جواها.',
      'System.out.println("..."): أمر الطباعة. بيطبع اللي جوه الأقواس على الشاشة وينزل سطر جديد في الآخر. افتكرها كده: بعت رسالة للشاشة.',
      'الفاصلة المنقوطة ; في آخر السطر: كل أمر في Java بينتهي بـ ;. نسيانها أشهر غلطة للمبتدئين، والمترجم هيذكرك بيها على طول.',
      'الأقواس المعقوفة { }: بتحدد بداية ونهاية كل جزء: الكلاس ليه أقواس، والـ main ليها أقواس جواه.'
    ] },
    { type: 'h', text: 'println و print: إيه الفرق؟' },
    { type: 'code', code: `class PrintDemo {
  public static void main(String[] args) {
    System.out.print("أول ");
    System.out.print("سطر ");
    System.out.println("كامل");
    System.out.println("وسطر جديد لوحده");
  }
}
// الناتج:
// أول سطر كامل
// وسطر جديد لوحده` },
    { type: 'p', text: '`print` بيطبع ويفضل واقف في نفس السطر، أما `println` بيطبع وينزل سطر جديد. الـ ln في الآخر اختصار line.' },
    { type: 'h', text: 'الطريقة الكاملة: compile وبعدين تشغيل' },
    { type: 'p', text: 'أمر `java Hello.java` عمل خطوتين ورا الكواليس. تقدر تعملهم بإيدك خطوة خطوة:' },
    { type: 'code', code: `$ javac Hello.java
$ java Hello
أهلاً يا عالم` },
    { type: 'p', text: '`javac Hello.java` بيترجم الكود لملف اسمه `Hello.class` فيه الـ bytecode. وبعدين `java Hello` (من غير .java ولا .class) بيشغل الملف المترجم ده على الـ JVM. في المشاريع الصغيرة استخدم `java Hello.java`، بس لازم تكون فاهم إن الترجمة خطوة موجودة دايماً.' },
    { type: 'note', warn: true, text: 'لو ظهرلك خطأ زي missing semicolon أو cannot find symbol، اقرأ رقم السطر اللي المترجم بيقوله وراجع السطر ده حرف حرف. رسايل Java دقيقة جداً: بتقولك الغلطة فين بالظبط.' },
    { type: 'h', text: 'التعليقات: ملاحظات ليك مش للكمبيوتر' },
    { type: 'code', code: `class Comments {
  public static void main(String[] args) {
    // تعليق سطر واحد: الكمبيوتر بيتجاهله تماماً
    System.out.println("سطر شغال"); // ممكن ييجي في آخر السطر
    /* تعليق طويل
       على كذا سطر */
  }
}
// الناتج:
// سطر شغال` }
  ],
  quiz: [
    { q: 'ليه الملف لازم يتسمى Hello.java؟', options: [
      { text: 'عشان الكلاس اسمه Hello، واسم الملف لازم يطابق اسم الكلاس' },
      { text: 'اسم عشوائي، أي اسم يمشي' },
      { text: 'عشان الترمنال يفهمه' }
    ], answer: 0, explain: 'في Java كل كلاس public في ملف بنفس اسمه بالظبط، حتى بحالة الحروف. Hello != hello.' },
    { q: 'إيه ناتج الكود ده؟', code: `class T {
  public static void main(String[] args) {
    System.out.print("1");
    System.out.print("2");
    System.out.println("3");
  }
}`, verifyOutput: true, options: [
      { text: '123' },
      { text: '1\n2\n3' },
      { text: '1 2 3' }
    ], answer: 0, explain: 'print مبينزلش سطر، فـ 1 و 2 طلعوا ورا بعض، وبعدين println طبعت 3 في نفس السطر ونزلت بعدها.' },
    { q: 'أول ما تشغل برنامج Java، الـ JVM بتدور على إيه؟', options: [
      { text: 'أول سطر في الملف مهما كان' },
      { text: 'method اسمها main بالشكل public static void main(String[] args)' },
      { text: 'آخر سطر في الكلاس' }
    ], answer: 1, explain: 'main هي نقطة الدخول الرسمية. من غيرها بنفس الشكل ده، البرنامج مش هيشتغل.' }
  ],
  exercises: [
    { task: 'اكتب برنامج بيطبع اسمك في سطر، ومدينتك في سطر تاني. شغله بأمر java وجرب كمان الطريقة الكاملة javac وبعدين java', code: `class AboutMe {
  public static void main(String[] args) {
    System.out.println("Ahmed");
    System.out.println("Assiut");
  }
}
// الناتج:
// Ahmed
// Assiut`, why: 'شغله بـ java AboutMe.java، أو بالطريقة الكاملة: javac AboutMe.java وبعدين java AboutMe. نفس الهيكل كل مرة: كلاس بنفس اسم الملف، main جواه، وprintln لكل سطر. التكرار ده مقصود: هتحفظ الهيكل من كتر ما هتشوفه.' },
    { task: 'اكتب برنامج بيطبع شكل نجمتين بالشكل ده: سطر فيه نجمة، وتحته سطر فيه نجمتين، وتحته سطر فيه تلاتة. استخدم println بس', code: `class Stars {
  public static void main(String[] args) {
    System.out.println("*");
    System.out.println("**");
    System.out.println("***");
  }
}
// الناتج:
// *
// **
// ***`, why: 'بعد درس اللوبس هتعرف ترسم الشكل ده بثلاث أسطر كود بس مهما كان عدد الأسطر. استنى المفاجأة.' }
  ]
}
,
{
  id: 'variables',
  nav: 'المتغيرات والأنواع',
  title: 'المتغيرات والأنواع في Java',
  subtitle: 'إزاي تخزن البيانات، الأنواع الأساسية، والحساب اللي ممكن يضحك عليك',
  blocks: [
    { type: 'p', text: 'المتغير هو صندوق له اسم ونوع، بتحط جواه قيمة وتستخدمها بعدين. في Java لازم تقول نوع الصندوق قبل ما تستخدمه، وده اسمه `static typing`: بيمنع غلطات كتير قبل ما البرنامج يشتغل أصلاً.' },
    { type: 'code', code: `class Vars {
  public static void main(String[] args) {
    int age = 21;
    double gpa = 3.75;
    boolean passed = true;
    char grade = 'A';
    String name = "Ahmed";
    System.out.println(name + " عنده " + age + " سنة وتقديره " + grade);
  }
}
// الناتج:
// Ahmed عنده 21 سنة وتقديره A` },
    { type: 'h', text: 'الأنواع اللي هتستخدمها كل يوم' },
    { type: 'table', head: ['النوع', 'بيخزن إيه', 'مثال'], rows: [
      ['int', 'أرقام صحيحة', 'int age = 21;'],
      ['double', 'أرقام عشرية', 'double gpa = 3.75;'],
      ['boolean', 'صح أو غلط بس', 'boolean passed = true;'],
      ['char', 'حرف واحد بعلامة تنصيص مفردة', "char grade = 'A';"],
      ['String', 'نص كامل بتنصيص مزدوجة', 'String name = "Ahmed";']
    ] },
    { type: 'p', text: 'لاحظ: `String` بحرف S كابيتال لأنها كلاس مش نوع أساسي، وقيمتها بين علامتي تنصيص مزدوجتين "..."، أما `char` فحرف واحد بس بين تنصيص مفردة. فيه أنواع رقمية تانية زي `long` و `float` و `byte` و `short`، بس int و double هيكفوك فترة طويلة.' },
    { type: 'h', text: 'الحساب: انتبه لقسمة الأرقام الصحيحة' },
    { type: 'code', code: `class Division {
  public static void main(String[] args) {
    System.out.println(7 / 2);
    System.out.println(7.0 / 2);
    System.out.println(7 % 2);
    System.out.println(2 * 3 + 4);
    System.out.println(2 * (3 + 4));
  }
}
// الناتج:
// 3
// 3.5
// 1
// 10
// 14` },
    { type: 'p', text: 'أهم نقطة في السطرين الأولانيين: لما العددين `int`، الناتج `int` والكسر بيترمي (7 / 2 = 3 مش 3.5). عايز الناتج العشري؟ خلي واحد فيهم double على الأقل. أما `%` فبيرجع باقي القسمة، وهيتح معاك كتير (مثلاً تعرف الرقم فردي ولا زوجي).' },
    { type: 'h', text: 'الجمع مع النصوص: اتجاه القراءة بيغير كل حاجة' },
    { type: 'code', code: `class Concat {
  public static void main(String[] args) {
    System.out.println("المجموع: " + 1 + 2);
    System.out.println("المجموع: " + (1 + 2));
    System.out.println(1 + 2 + " هو المجموع");
  }
}
// الناتج:
// المجموع: 12
// المجموع: 3
// 3 هو المجموع` },
    { type: 'p', text: 'الحساب بيمشي من الشمال لليمين: أول ما يقابل نص، كل `+` بعدها بتتحول للصق نصوص. عشان كده الأقواس مهمة: خلي الحساب جواها لو عايزه يحصل الأول.' },
    { type: 'h', text: 'تحويل الأنواع: casting' },
    { type: 'code', code: `class Casting {
  public static void main(String[] args) {
    double price = 9.99;
    int roundedDown = (int) price;
    System.out.println(roundedDown);

    int x = 5;
    double y = x;
    System.out.println(y);

    int share = (int) 9.99 / 2;
    double fairShare = 9.99 / 2;
    System.out.println(share);
    System.out.println(fairShare);
  }
}
// الناتج:
// 9
// 5.0
// 4
// 4.995` },
    { type: 'p', text: 'من `double` لـ `int` لازم تطلب التحويل صراحة بـ `(int)` والكسر بيترمي (مش بيتقرب). العكس بيحصل لوحده: أي int بيتحول double من غير ما تطلب. ولاحظ السطر اللي فيه `share`: التحويل حصل على 9.99 الأول بقت 9، وبعدين اتقسمت على 2.' },
    { type: 'h', text: 'تغيير قيمة المتغير والاختصارات' },
    { type: 'code', code: `class Counter {
  public static void main(String[] args) {
    int score = 10;
    score = score + 5;
    score += 3;
    score++;
    System.out.println(score);

    int a = 5;
    int b = a++ + 2;
    System.out.println(a);
    System.out.println(b);
  }
}
// الناتج:
// 19
// 6
// 7` },
    { type: 'p', text: '`+=` و `++` اختصارات هتشوفها في كل حتة: `score += 3` يعني زود 3، و `score++` يعني زود 1. لاحظ الفرق اللطيف في `a++`: الاستخدام بياخد القيمة القديمة وبعدين يزود، عشان كده b طلعت 7 (5 + 2) و a بقت 6 بعد السطر.' },
    { type: 'note', text: 'أسماء المتغيرات: بتبدأ بحرف صغير بالعرف، ولو الاسم كلمتين بنكتب التانية بحرف كابيتال: `studentName` و `totalPrice`. الاسلوب ده اسمه camelCase وهو المتفق عليه في Java كلها.' }
  ],
  quiz: [
    { q: 'إيه ناتج System.out.println(9 / 2); ؟', code: `System.out.println(9 / 2);`, verifyOutput: true, options: [
      { text: '4.5' },
      { text: '4' },
      { text: '5' }
    ], answer: 1, explain: 'العددين int فالنتيجة int: الكسر بيترمي تماماً. عايز 4.5؟ اكتب 9.0 / 2.' },
    { q: 'إيه ناتج System.out.println("النتيجة: " + 2 + 3); ؟', code: `System.out.println("النتيجة: " + 2 + 3);`, verifyOutput: true, options: [
      { text: 'النتيجة: 23' },
      { text: 'النتيجة: 5' },
      { text: '5النتيجة: ' }
    ], answer: 0, explain: 'بعد أول نص، كل + بتتحول للصق: "النتيجة: " + 2 بقت نص، وبعدين + 3 لصقت 3 جنب 2.' },
    { q: 'عايز تخزن ناتج قسمة فيه كسور، أنهي نوع تختار؟', options: [
      { text: 'int', mono: true },
      { text: 'char', mono: true },
      { text: 'double', mono: true }
    ], answer: 2, explain: 'double بيخزن الكسور العشرية. int هيرمي الكسر مهما كان.' }
  ],
  exercises: [
    { task: 'اعمل متغيرات لاسمك وسنك ومتوسط درجاتك، واطبع جملة واحدة بتجمعهم كلهم', code: `class Profile {
  public static void main(String[] args) {
    String name = "Ahmed";
    int age = 21;
    double gpa = 3.75;
    System.out.println("أنا " + name + "، عندي " + age + " سنة، ومتوسط درجاتي " + gpa);
  }
}
// الناتج:
// أنا Ahmed، عندي 21 سنة، ومتوسط درجاتي 3.75`, why: 'لاحظ إن الجمع مع String بيحول أي حاجة لنص لوحده. دي أسهل طريقة تطبع بيها رسايل فيها قيم متغيرة.' },
    { task: 'محل بيبيع منتج سعره 19.99 جنيه، وعميل اشترى 3 قطع. اطبع الإجمالي، وبعدين اطبع الإجمالي كرقم صحيح بـ casting ولاحظ الفرق', code: `class Shop {
  public static void main(String[] args) {
    double price = 19.99;
    int count = 3;
    double total = price * count;
    System.out.println("الإجمالي: " + total);
    System.out.println("كرقم صحيح: " + (int) total);
  }
}
// الناتج:
// الإجمالي: 59.97
// كرقم صحيح: 59`, why: 'الـ casting بيرمي الكسر مش بيقرب. لو كنت عايز تقريب حقيقي كنت هتستخدم Math.round(total) وهترجع 60.' }
  ]
}
,
{
  id: 'conditions',
  nav: 'الشروط',
  title: 'الشروط: علم برنامجك ياخد قرارات',
  subtitle: 'if و else و switch: برنامجك بقى يسأل ويجاوب',
  blocks: [
    { type: 'p', text: 'لحد دلوقتي برامجنا بتنفذ سطر ورا سطر من غير تفكير. الحياة الحقيقية مليانة قرارات: لو الدرجة فوق الخمسين يبقى ناجح، لو الرصيد يكفي اشحن، لو المستخدم admin افتحله الصفحة. كل دي شروط، وJava بتكتبها بـ `if`.' },
    { type: 'code', code: `class Grades {
  public static void main(String[] args) {
    int score = 72;
    if (score >= 85) {
      System.out.println("ممتاز");
    } else if (score >= 65) {
      System.out.println("جيد جداً");
    } else if (score >= 50) {
      System.out.println("مقبول");
    } else {
      System.out.println("راسب");
    }
  }
}
// الناتج:
// جيد جداً` },
    { type: 'p', text: 'الفكرة: Java بتجرب الشرط الأول، لو `true` بتنفذ الكتلة بتاعته وتتخطى الباقي كله. لو `false` بتنزل للي بعده. أول شرط يطلع صح بيتنفذ وخلاص، ولو مفيش ولا واحد صح بينفذ الـ `else` الأخيرة لو موجودة.' },
    { type: 'h', text: 'عايز تسأل سؤال إزاي؟ عمليات المقارنة' },
    { type: 'table', head: ['العملية', 'معناها', 'مثال'], rows: [
      ['==', 'يساوي', 'score == 100'],
      ['!=', 'لا يساوي', 'score != 0'],
      ['>', '<', 'أكبر من / أصغر من', 'age > 18'],
      ['>=', '<=', 'أكبر أو يساوي / أصغر أو يساوي', 'score >= 50']
    ] },
    { type: 'note', warn: true, text: 'أشهر غلطة: كتابة `=` بدل `==` جوه الشرط. الواحدة بتخزن قيمة (assignment) والتانية بتقارن. ولما تقارن نصوص String استخدم `name.equals("Ahmed")` مش `==`، دي نقطة هتقابلك كتير.' },
    { type: 'h', text: 'ربط الشروط ببعض: AND و OR و NOT' },
    { type: 'code', code: `class Login {
  public static void main(String[] args) {
    int age = 20;
    boolean hasId = true;

    if (age >= 18 && hasId) {
      System.out.println("ادخل");
    }

    boolean isWeekend = false;
    boolean isHoliday = true;
    if (isWeekend || isHoliday) {
      System.out.println("النهارده أجازة");
    }

    boolean raining = false;
    if (!raining) {
      System.out.println("مش محتاج شمسية");
    }
  }
}
// الناتج:
// ادخل
// النهارده أجازة
// مش محتاج شمسية` },
    { type: 'p', text: '`&&` معناها "و": لازم الاتنين يكونوا صح. `||` معناها "أو": يكفي واحد فيهم صح. و `!` معناها "مش": بتقلب القيمة. لاحظ إن `if (hasId)` لوحدها تكفي لأن المتغير أصلاً boolean.' },
    { type: 'h', text: 'الاختصار الأنيق: الـ ternary operator' },
    { type: 'code', code: `class Ternary {
  public static void main(String[] args) {
    int score = 45;
    String result = (score >= 50) ? "ناجح" : "راسب";
    System.out.println(result);

    int max = (10 > 7) ? 10 : 7;
    System.out.println("الأكبر: " + max);
  }
}
// الناتج:
// راسب
// الأكبر: 10` },
    { type: 'p', text: 'الشكل `(شرط) ? قيمة_لو_صح : قيمة_لو_غلط` بيختصر if/else بسيطة في سطر واحد. استخدمه للحالات البسيطة بس، لو الشرط معقد ارجع لـ if العادية عشان الكود يفضل مقروء.' },
    { type: 'h', text: 'لما الاحتمالات تكتر: switch' },
    { type: 'code', code: `class DayName {
  public static void main(String[] args) {
    int day = 3;
    switch (day) {
      case 1:
        System.out.println("السبت");
        break;
      case 2:
        System.out.println("الأحد");
        break;
      case 3:
        System.out.println("الاتنين");
        break;
      default:
        System.out.println("يوم مش معروف");
    }
  }
}
// الناتج:
// الاتنين` },
    { type: 'p', text: '`switch` بتقارن قيمة واحدة باحتمالات كتير. كل `case` احتمال، و `default` بيتنفذ لو مفيش احتمال طابق. كلمة `break` مهمة جداً: لو نسيتها، الكود هيكمل ينفذ الـ cases اللي تحتها حتى لو مش مطابقة، وده اسمه fall-through وأغلب الوقت مش اللي انت عايزه.' }
  ],
  quiz: [
    { q: 'لو score = 60، إيه اللي هيظهر؟', code: `int score = 60;
if (score >= 85) {
  System.out.println("ممتاز");
} else if (score >= 65) {
  System.out.println("جيد جداً");
} else if (score >= 50) {
  System.out.println("مقبول");
} else {
  System.out.println("راسب");
}`, verifyOutput: true, options: [
      { text: 'مقبول' },
      { text: 'جيد جداً' },
      { text: 'راسب' }
    ], answer: 0, explain: '60 مش >= 85 ولا >= 65، بس >= 50، فبيتنفذ فرع "مقبول" ويتخطى الباقي.' },
    { q: 'إيه ناتج الكود ده؟', code: `int x = 8;
if (x > 10 || x % 2 == 0) {
  System.out.println("تحقق");
} else {
  System.out.println("لأ");
}`, verifyOutput: true, options: [
      { text: 'تحقق' },
      { text: 'لأ' },
      { text: 'هيطلع خطأ' }
    ], answer: 0, explain: 'الشرط الأول غلط (8 مش أكبر من 10) بس التاني صح: باقي قسمة 8 على 2 يساوي صفر. || يكفيها طرف واحد صح.' },
    { q: 'ليه بنكتب break في آخر كل case في الـ switch؟', options: [
      { text: 'عشان نمنع تنفيذ الـ cases اللي تحتها بعد ما الاحتمال المطابق اتنفذ' },
      { text: 'عشان نسرع البرنامج' },
      { text: 'لأنها إجبارية ولازمة في كل اللغات' }
    ], answer: 0, explain: 'من غير break بيحصل fall-through: التنفيذ بيكمل في الـ case اللي بعدها حتى لو مش مطابقة. break بتقفل الموضوع.' }
  ],
  exercises: [
    { task: 'اكتب برنامج عنده متغير temperature، لو أكبر من 35 يطبع "الجو حار"، لو بين 20 و 35 يطبع "الجو معتدل"، ولو أقل من 20 يطبع "الجو بارد". جربه بقيم مختلفة', code: `class Weather {
  public static void main(String[] args) {
    int temperature = 28;
    if (temperature > 35) {
      System.out.println("الجو حار");
    } else if (temperature >= 20) {
      System.out.println("الجو معتدل");
    } else {
      System.out.println("الجو بارد");
    }
  }
}
// الناتج:
// الجو معتدل`, why: 'لاحظ إننا مكتبناش temperature >= 20 && temperature <= 35 صراحة: الشرط بيفحص بالترتيب، فلو وصلنا للـ else if يبقى أكيد مش فوق 35.' },
    { task: 'اكتب switch بتطبع اسم الشهر لما الرقم يكون 1 أو 2 أو 3، وأي رقم تاني يطبع "شهر غير مدعوم"', code: `class Month {
  public static void main(String[] args) {
    int month = 2;
    switch (month) {
      case 1:
        System.out.println("يناير");
        break;
      case 2:
        System.out.println("فبراير");
        break;
      case 3:
        System.out.println("مارس");
        break;
      default:
        System.out.println("شهر غير مدعوم");
    }
  }
}
// الناتج:
// فبراير`, why: 'لو نسيت break في case 2، كان هيطبع فبراير ومارس ورا بعض. جرب تمسحها في المعمل وشوف الفرق بعينك.' }
  ]
}
,
{
  id: 'loops',
  nav: 'اللوبس',
  title: 'اللوبس: علم الكمبيوتر يكرر من غير ما يزهق',
  subtitle: 'for و while و do-while: نفس المهمة ألف مرة من غير ما تكتبها مرتين',
  blocks: [
    { type: 'p', text: 'تفتكر تمرين النجوم اللي فات؟ رسمنا 3 أسطر بـ 3 أوامر println. طب لو المطلوب 100 سطر؟ هنا بييجي دور اللوب: تكتب القاعدة مرة واحدة، والكمبيوتر يكررها اللي انت عايزه.' },
    { type: 'h', text: 'for: لما تعرف عدد المرات مسبقاً' },
    { type: 'code', code: `class Counting {
  public static void main(String[] args) {
    for (int i = 1; i <= 5; i++) {
      System.out.println("الدورة رقم " + i);
    }
  }
}
// الناتج:
// الدورة رقم 1
// الدورة رقم 2
// الدورة رقم 3
// الدورة رقم 4
// الدورة رقم 5` },
    { type: 'p', text: 'الـ for ليها 3 أجزاء جوه الأقواس: البداية `int i = 1`، وشرط الاستمرار `i <= 5`، والتحديث بعد كل دورة `i++`. اللوب بتفضل شغالة طالما الشرط صح.' },
    { type: 'code', code: `class StarsLoop {
  public static void main(String[] args) {
    for (int i = 1; i <= 4; i++) {
      String line = "";
      for (int j = 1; j <= i; j++) {
        line += "*";
      }
      System.out.println(line);
    }
  }
}
// الناتج:
// *
// **
// ***
// ****` },
    { type: 'p', text: 'وده حل تمرين النجوم بشكل عام: لوب جوه لوب. الخارجية مسؤولة عن السطر رقم كام، والداخلية بتبني نجوم السطر ده. غير الرقم 4 لأي رقم وهيترسم كله لوحده.' },
    { type: 'h', text: 'مثال حسابي: مجموع الأرقام من 1 لـ 100' },
    { type: 'code', code: `class Sum {
  public static void main(String[] args) {
    int total = 0;
    for (int i = 1; i <= 100; i++) {
      total += i;
    }
    System.out.println("المجموع: " + total);
  }
}
// الناتج:
// المجموع: 5050` },
    { type: 'h', text: 'while: لما الشرط هو اللي يقود' },
    { type: 'code', code: `class Countdown {
  public static void main(String[] args) {
    int fuel = 3;
    while (fuel > 0) {
      System.out.println("باقي " + fuel);
      fuel--;
    }
    System.out.println("انطلاق!");
  }
}
// الناتج:
// باقي 3
// باقي 2
// باقي 1
// انطلاق!` },
    { type: 'p', text: '`while` بتكرر طالما الشرط صح، وممكن متنفذش ولا مرة لو الشرط غلط من الأول. استخدمها لما متعرفش عدد المرات مسبقاً: زي "فضل اسأل المستخدم لحد ما يكتب خروج".' },
    { type: 'note', warn: true, text: 'أخطر غلطة في while: اللوب اللانهائية. لو نسيت تحدث المتغير جوه اللوب (زي fuel-- في المثال)، الشرط هيفضل صح للأبد والبرنامج هيعلق. في المعمل هتلاقي حد أقصى للدورات بيحميك، بس على جهازك راجع سطر التحديث دايماً.' },
    { type: 'h', text: 'do-while: نفذ الأول وبعدين اسأل' },
    { type: 'code', code: `class DoOnce {
  public static void main(String[] args) {
    int tries = 0;
    do {
      System.out.println("محاولة رقم " + (tries + 1));
      tries++;
    } while (tries < 2);
  }
}
// الناتج:
// محاولة رقم 1
// محاولة رقم 2` },
    { type: 'p', text: '`do-while` زي while بالظبط، بس بترتيب معكوس: بتنفذ الجسم الأول وبعدين تفحص الشرط. يعني الجسم بيتنفذ مرة على الأقل مهما كان الشرط. مناسبة لحاجات زي "اطلب من المستخدم إدخال، وبعدين كرر لو الإدخال غلط".' },
    { type: 'h', text: 'التحكم في اللوب: break و continue' },
    { type: 'code', code: `class Control {
  public static void main(String[] args) {
    for (int i = 1; i <= 10; i++) {
      if (i == 4) {
        continue;
      }
      if (i == 8) {
        break;
      }
      System.out.println(i);
    }
  }
}
// الناتج:
// 1
// 2
// 3
// 5
// 6
// 7` },
    { type: 'p', text: '`continue` بتتخطى باقي الدورة الحالية وتكمل اللي بعدها (عشان كده 4 اختفت). و `break` بتخرج من اللوب خالص (عشان كده 8 و 9 و 10 مظهروش). الاتنين أدوات قوية، بس بلاش تكتر منهم عشان الكود ميبقاش ملخبط.' }
  ],
  quiz: [
    { q: 'إيه ناتج الكود ده؟', code: `for (int i = 0; i < 3; i++) {
  System.out.println("قيمة i: " + i);
}`, verifyOutput: true, options: [
      { text: 'قيمة i: 0\nقيمة i: 1\nقيمة i: 2' },
      { text: 'قيمة i: 1\nقيمة i: 2\nقيمة i: 3' },
      { text: 'قيمة i: 0\nقيمة i: 1\nقيمة i: 2\nقيمة i: 3' }
    ], answer: 0, explain: 'البداية من 0 والشرط i < 3، يعني الدورات على 0 و 1 و 2 بس. لما i توصل 3 الشرط يبقى غلط فتقف اللوب.' },
    { q: 'كام مرة هتتنفذ اللوب دي؟', code: `int n = 5;
while (n > 0) {
  System.out.println(n);
  n--;
}`, verifyOutput: true, options: [
      { text: '5\n4\n3\n2\n1' },
      { text: '5\n4\n3\n2\n1\n0' },
      { text: 'لوب لانهائية' }
    ], answer: 0, explain: 'بطبع وبعدين بنقص: 5 4 3 2 1. لما n توصل 0 الشرط يبقى غلط فتقف قبل الطباعة.' },
    { q: 'إيه الفرق الأساسي بين while و do-while؟', options: [
      { text: 'do-while بتنفذ الجسم مرة على الأقل حتى لو الشرط غلط من البداية' },
      { text: 'while أسرع من do-while' },
      { text: 'do-while مخصصة للأرقام بس' }
    ], answer: 0, explain: 'while بتفحص الشرط قبل أول تنفيذ، أما do-while بتنفذ الأول وبعدين تسأل.' }
  ],
  exercises: [
    { task: 'اكتب لوب بتطبع الأرقام الزوجية من 2 لـ 10', code: `class Even {
  public static void main(String[] args) {
    for (int i = 2; i <= 10; i += 2) {
      System.out.println(i);
    }
  }
}
// الناتج:
// 2
// 4
// 6
// 8
// 10`, why: 'لاحظ التحديث i += 2: مش لازم اللوب تعد واحد واحد. طريقة تانية: عد عادي واستخدم if (i % 2 == 0) جوه اللوب.' },
    { task: 'احسب مضروب الرقم 5 (يعني 5 × 4 × 3 × 2 × 1) بلوب واطبع الناتج', code: `class Factorial {
  public static void main(String[] args) {
    int n = 5;
    int fact = 1;
    for (int i = 2; i <= n; i++) {
      fact *= i;
    }
    System.out.println("مضروب " + n + " = " + fact);
  }
}
// الناتج:
// مضروب 5 = 120`, why: 'بدأنا fact بواحد مش صفر لأننا بنضرب. غير n وجرب: مضروب 10 = 3628800. خد بالك إن المضروب بيكبر بسرعة جداً وint هتفيض بعد شوية.' }
  ]
}
,
{
  id: 'arrays',
  nav: 'الـ Arrays',
  title: 'الـ Arrays: خزن مجموعة قيم في متغير واحد',
  subtitle: 'صفوف مرتبة من البيانات، إزاي تقراها وتلف عليها، والغلطة اللي كلنا وقعنا فيها',
  blocks: [
    { type: 'p', text: 'تخيل عندك درجات 5 طلاب. هتعمل 5 متغيرات؟ ولو بقوا 500؟ الحل هو الـ `Array`: متغير واحد بيخزن مجموعة قيم من نفس النوع، مرتبة في خانات مرقمة. الرقم ده اسمه الـ `index` وبيبدأ من صفر.' },
    { type: 'code', code: `class GradesArray {
  public static void main(String[] args) {
    int[] grades = {85, 90, 72, 95, 60};
    System.out.println("أول درجة: " + grades[0]);
    System.out.println("تالت درجة: " + grades[2]);
    System.out.println("عدد الدرجات: " + grades.length);
  }
}
// الناتج:
// أول درجة: 85
// تالت درجة: 72
// عدد الدرجات: 5` },
    { type: 'p', text: 'أهم 3 حقايق عن الـ arrays: الـ index بيبدأ من 0 (أول عنصر هو `grades[0]`)، وآخر index هو `length - 1`، وحجم الـ array ثابت بعد إنشائها: مينفعش تضيف خانات جديدة لنفس الـ array. عايز حجم مرن؟ ده شغل الـ ArrayList اللي جاي في درس الـ Collections.' },
    { type: 'h', text: 'اللف على كل العناصر' },
    { type: 'code', code: `class SumArray {
  public static void main(String[] args) {
    int[] grades = {85, 90, 72, 95, 60};
    int total = 0;
    for (int i = 0; i < grades.length; i++) {
      total += grades[i];
    }
    double average = (double) total / grades.length;
    System.out.println("المجموع: " + total);
    System.out.println("المتوسط: " + average);
  }
}
// الناتج:
// المجموع: 402
// المتوسط: 80.4` },
    { type: 'p', text: 'لاحظ حاجتين: اللوب بتقف عند `grades.length` من غير يساوي، لأن آخر index هو length - 1. وعملنا cast لـ total قبل القسمة عشان المتوسط يطلع بالكسور زي ما اتعلمنا في درس المتغيرات.' },
    { type: 'h', text: 'اللوب المختصرة: enhanced for' },
    { type: 'code', code: `class ForEach {
  public static void main(String[] args) {
    String[] names = {"أحمد", "منى", "كريم"};
    for (String name : names) {
      System.out.println("أهلاً يا " + name);
    }
  }
}
// الناتج:
// أهلاً يا أحمد
// أهلاً يا منى
// أهلاً يا كريم` },
    { type: 'p', text: 'الشكل `for (String name : names)` يعني: لكل عنصر في names، حطه في المتغير name ونفذ الجسم. أقصر وأنظف لما مش محتاج رقم الخانة. بس لو محتاج الـ index نفسه (مثلاً تطبع "الطالب رقم 3")، ارجع للـ for العادية.' },
    { type: 'h', text: 'الغلطة اللي كلنا وقعنا فيها: IndexOutOfBounds' },
    { type: 'code', code: `class Oops {
  public static void main(String[] args) {
    int[] grades = {85, 90, 72};
    System.out.println(grades[3]);
  }
}` },
    { type: 'p', text: 'الكود ده بيترجم عادي، بس وقت التشغيل بيحصل crash: `Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3`. الـ array فيها 3 عناصر، يعني الـ indexes المتاحة 0 و 1 و 2 بس. جرب الكود ده على جهازك وشوف الرسالة بنفسك، وافهم منها حاجتين: اسم الخطأ، ورقم الـ index اللي ضرب.' },
    { type: 'h', text: 'إنشاء array فاضية وتملاها بعدين' },
    { type: 'code', code: `class FillArray {
  public static void main(String[] args) {
    int[] squares = new int[4];
    for (int i = 0; i < squares.length; i++) {
      squares[i] = i * i;
    }
    for (int s : squares) {
      System.out.println(s);
    }
  }
}
// الناتج:
// 0
// 1
// 4
// 9` },
    { type: 'p', text: '`new int[4]` بتعمل array فيها 4 خانات، كلها قيم افتراضية (صفر للأرقام، false للـ boolean، null للنصوص والـ objects). وبعدين مليناها بلوب. الشكل ده شائع لما تعرف العدد بس القيم بتتحسب بعدين.' },
    { type: 'note', text: 'في arrays متعددة الأبعاد كمان زي `int[][] grid = new int[3][3];` للجداول والخرايط. نفس الفكرة بالظبط: index لكل بعد. مش هنعمق فيها دلوقتي، بس اعرف إنها موجودة لما تحتاجها.' }
  ],
  quiz: [
    { q: 'في int[] nums = {10, 20, 30}; إيه قيمة nums[1]؟', code: `int[] nums = {10, 20, 30};
System.out.println(nums[1]);`, verifyOutput: true, options: [
      { text: '20' },
      { text: '10' },
      { text: '30' }
    ], answer: 0, explain: 'الـ index بيبدأ من صفر: nums[0] هي 10 و nums[1] هي 20.' },
    { q: 'لو array فيها 5 عناصر، إيه آخر index صحيح؟', options: [
      { text: '5' },
      { text: '4' },
      { text: '6' }
    ], answer: 1, explain: 'الـ indexes من 0 لـ length - 1. يعني 0, 1, 2, 3, 4. الرقم 5 نفسه هيرمي ArrayIndexOutOfBoundsException.' },
    { q: 'إيه ناتج الكود ده؟', code: `int[] nums = {3, 7, 2};
int biggest = nums[0];
for (int n : nums) {
  if (n > biggest) {
    biggest = n;
  }
}
System.out.println(biggest);`, verifyOutput: true, options: [
      { text: '7' },
      { text: '3' },
      { text: '12' }
    ], answer: 0, explain: 'دي طريقة كلاسيكية لإيجاد أكبر عنصر: افترض إن الأول هو الأكبر، وبعدين قارن بكل عنصر وحدث لو لقيت أكبر.' }
  ],
  exercises: [
    { task: 'اعمل array فيها مصاريفك اليومية لأسبوع (7 أرقام)، واطبع إجمالي الأسبوع وأكبر مصروف في يوم واحد', code: `class Expenses {
  public static void main(String[] args) {
    int[] week = {50, 30, 80, 20, 45, 60, 35};
    int total = 0;
    int max = week[0];
    for (int day : week) {
      total += day;
      if (day > max) {
        max = day;
      }
    }
    System.out.println("إجمالي الأسبوع: " + total);
    System.out.println("أكبر مصروف: " + max);
  }
}
// الناتج:
// إجمالي الأسبوع: 320
// أكبر مصروف: 80`, why: 'لوب واحدة كفاية للمهمتين: بنجمع ونقارن في نفس الدورة. لاحظ إن max بدأت بأول عنصر مش بصفر، عشان لو كل الأرقام بالسالب المنطق يفضل صح.' },
    { task: 'اعمل array فيها أسماء 4 أصحابك، واطبع كل اسم مع رقمه بالشكل: 1. أحمد (الترقيم يبدأ من 1 للبشر مش من 0)', code: `class Friends {
  public static void main(String[] args) {
    String[] friends = {"أحمد", "منى", "كريم", "سارة"};
    for (int i = 0; i < friends.length; i++) {
      System.out.println((i + 1) + ". " + friends[i]);
    }
  }
}
// الناتج:
// 1. أحمد
// 2. منى
// 3. كريم
// 4. سارة`, why: 'هنا احتجنا الـ index نفسه، فالـ for العادية أنسب. ولاحظ (i + 1) جوه أقواس: من غيرها النص كان هيلصق الأول وتبوظ الحسبة.' }
  ]
}
);
