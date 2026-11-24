/* Curriculum part 2: methods, OOP, inheritance, interfaces, collections, exceptions, capstone */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
  id: 'methods',
  nav: 'الـ Methods',
  title: 'الـ Methods: قسم كودك لقطع صغيرة ليها اسم',
  subtitle: 'بدل ما تعيد نفس السطور، علم البرنامج أوامر جديدة من صنعك',
  blocks: [
    { type: 'p', text: 'تخيل إنك بتحسب مساحة دايرة في 5 حتت في برنامجك. هتكتب نفس الحسبة 5 مرات؟ الـ `method` بتحل ده: بتكتب القاعدة مرة واحدة، تديها اسم، وتنده عليها في أي حتة. انت أصلاً بتستخدم methods من أول يوم: `System.out.println` نفسها method، و `main` كمان method.' },
    { type: 'code', code: `class CircleCalc {
  static double circleArea(double radius) {
    return 3.14159 * radius * radius;
  }

  public static void main(String[] args) {
    double a1 = circleArea(2);
    double a2 = circleArea(5);
    System.out.println("مساحة الأولى: " + a1);
    System.out.println("مساحة التانية: " + a2);
  }
}
// الناتج:
// مساحة الأولى: 12.56636
// مساحة التانية: 78.53975` },
    { type: 'p', text: 'تعريف الـ method فيه 4 حاجات بالترتيب: نوع الرجوع (`double` يعني بترجع رقم عشري)، والاسم (`circleArea`)، والمدخلات بين الأقواس (`double radius` دي اسمه parameter)، والجسم جوه الأقواس المعقوفة. كلمة `return` بترجع النتيجة للي نادى عليها. وكلمة `static` هنا معناها إننا ننده عليها من `main` مباشرة، وهنفهم معناها الحقيقي في درس الـ OOP.' },
    { type: 'h', text: 'method مبترجعش حاجة: void' },
    { type: 'code', code: `class Greeter {
  static void greet(String name) {
    System.out.println("أهلاً يا " + name + "!");
  }

  public static void main(String[] args) {
    greet("منى");
    greet("كريم");
  }
}
// الناتج:
// أهلاً يا منى!
// أهلاً يا كريم!` },
    { type: 'p', text: 'لما الـ method بتعمل فعل (زي الطباعة) ومش بترجع قيمة، نوع الرجوع بيبقى `void`. تقدر تنده عليها كأمر لوحدها من غير ما تخزن ناتج.' },
    { type: 'h', text: 'القيم اللي بتوصل والقيم اللي بترجع' },
    { type: 'code', code: `class BankFee {
  static double applyDiscount(double price, double percent) {
    double discount = price * percent / 100;
    return price - discount;
  }

  public static void main(String[] args) {
    double finalPrice = applyDiscount(200, 15);
    System.out.println("بعد الخصم: " + finalPrice);
    System.out.println("خصم تاني: " + applyDiscount(80, 50));
  }
}
// الناتج:
// بعد الخصم: 170.0
// خصم تاني: 40.0` },
    { type: 'p', text: 'الـ method ممكن تاخد أكتر من parameter، وكل واحد ليه نوعه. ومن جوه الـ main تقدر تستخدم الراجع مباشرة جوه println حتى من غير متغير وسيط، زي السطر الأخير.' },
    { type: 'h', text: 'نفس الاسم، شغل مختلف: overloading' },
    { type: 'code', code: `class Adder {
  static int add(int a, int b) {
    return a + b;
  }

  static double add(double a, double b) {
    return a + b;
  }

  static int add(int a, int b, int c) {
    return a + b + c;
  }

  public static void main(String[] args) {
    System.out.println(add(2, 3));
    System.out.println(add(2.5, 3.5));
    System.out.println(add(1, 2, 3));
  }
}
// الناتج:
// 5
// 6.0
// 6` },
    { type: 'p', text: 'Java بتفرق بين الـ methods بنوع وعدد الـ parameters، مش بالاسم بس. عشان كده ينفع يكون عندك 3 methods بنفس الاسم `add`، والمترجم بيختار أنهي واحدة حسب اللي بعته. دي ميزة اسمها `method overloading`.' },
    { type: 'h', text: 'المتغيرات المحلية: scope' },
    { type: 'code', code: `class Scope {
  static void tryChange() {
    int local = 99;
    System.out.println("جوه الميثود: " + local);
  }

  public static void main(String[] args) {
    tryChange();
    // System.out.println(local); // لو شيلت التعليق: خطأ! local مش معروفة هنا
    int mainVar = 5;
    System.out.println("جوه main: " + mainVar);
  }
}
// الناتج:
// جوه الميثود: 99
// جوه main: 5` },
    { type: 'p', text: 'المتغير اللي بتعرفه جوه method بيعيش جواها بس، واسمه `local variable`. مينفعش تستخدمه من method تانية، ولا main تشوف متغيرات غيرها. ده مش قيد، ده تنظيم: كل method عالمها الخاص اللي مفيش حاجة تبوظه من بره.' },
    { type: 'note', text: 'قاعدة ذهبية للـ methods: اسمها فعل بيوصف بتعمل إيه (calculateTotal مش m1)، وكل method مسؤولة عن مهمة واحدة واضحة. لو لقيت method بتعمل 3 حاجات، قسمها.' }
  ],
  quiz: [
    { q: 'إيه ناتج الكود ده؟', code: `class Q {
  static int square(int n) {
    return n * n;
  }
  public static void main(String[] args) {
    System.out.println(square(4) + square(3));
  }
}`, verifyOutput: true, options: [
      { text: '25' },
      { text: '16' },
      { text: '49' }
    ], answer: 0, explain: 'square(4) بـ 16 و square(3) بـ 9، وجمعهم 25. كل نداء بيرجع قيمة مكان نفسه في السطر.' },
    { q: 'method بتطبع رسالة ترحيب ومبترجعش أي قيمة، نوع الرجوع بتاعها إيه؟', options: [
      { text: 'void', mono: true },
      { text: 'String', mono: true },
      { text: 'int', mono: true }
    ], answer: 0, explain: 'void معناها "مفيش قيمة راجعة". الميثود بتعمل فعلها وبتخلص.' },
    { q: 'ينفع يكون عندك methodين بنفس الاسم في نفس الكلاس؟', options: [
      { text: 'أيوه، طالما اختلفوا في عدد أو نوع الـ parameters (overloading)' },
      { text: 'لأ، مستحيل في Java' },
      { text: 'أيوه بأي شكل، حتى لو نفس الـ parameters بالظبط' }
    ], answer: 0, explain: 'المترجم بيميز بينهم بقائمة الـ parameters. نفس الاسم ونفس الـ parameters بالظبط هو اللي ممنوع.' }
  ],
  exercises: [
    { task: 'اكتب method اسمها isEven بتاخد int وترجع boolean، وجربها في main على رقم زوجي ورقم فردي', code: `class EvenCheck {
  static boolean isEven(int n) {
    return n % 2 == 0;
  }

  public static void main(String[] args) {
    System.out.println(isEven(10));
    System.out.println(isEven(7));
  }
}
// الناتج:
// true
// false`, why: 'لاحظ إن n % 2 == 0 نفسها قيمة boolean، فرجعناها على طول من غير if. دي كتابة أنضف من if ترجع true و else ترجع false.' },
    { task: 'اكتب method اسمها max بتاخد رقمين int وترجع الأكبر فيهم، وmethod تانية بنفس الاسم بتاخد 3 أرقام', code: `class MaxDemo {
  static int max(int a, int b) {
    return (a > b) ? a : b;
  }

  static int max(int a, int b, int c) {
    return max(max(a, b), c);
  }

  public static void main(String[] args) {
    System.out.println(max(12, 8));
    System.out.println(max(4, 15, 9));
  }
}
// الناتج:
// 12
// 15`, why: 'الحتة اللذيذة: النسخة بتاعت 3 أرقام بتستخدم نسخة الرقمين جواها. إعادة استخدام الميثودز في بعضها من أهم مهارات التنظيم.' }
  ]
}
,
{
  id: 'oop-classes',
  nav: 'OOP: Classes و Objects',
  title: 'البرمجة كائنية التوجه: Classes و Objects',
  subtitle: 'مبروك وصولك لقلب Java: إزاي تصمم كائنات من العالم الحقيقي',
  blocks: [
    { type: 'p', text: 'لحد دلوقتي بنخزن بيانات في متغيرات متفرقة: اسم الطالب في String، وسنه في int، ودرجاته في array. الـ `OOP` (Object-Oriented Programming) بتقول: ليه مانتجمعش البيانات المرتبطة ببعض في كيان واحد؟ الكيان ده اسمه `object`، والقالب اللي بنعمل منه الكيانات اسمه `class`.' },
    { type: 'p', text: 'افكرها كده: الـ class هو ورقة تصميم العربية، والـ object هو عربية حقيقية واقفة في الشارع. من ورقة تصميم واحدة تقدر تنتج ألف عربية، كل واحدة ليها لونها ورقمها.' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    Student s1 = new Student();
    s1.name = "منى";
    s1.age = 20;
    s1.gpa = 3.8;

    Student s2 = new Student();
    s2.name = "كريم";
    s2.age = 22;

    s1.introduce();
    s2.introduce();
    System.out.println("متوسط " + s1.name + ": " + s1.gpa);
  }
}

class Student {
  String name;
  int age;
  double gpa;

  void introduce() {
    System.out.println("أنا " + name + "، عندي " + age + " سنة");
  }
}
// الناتج:
// أنا منى، عندي 20 سنة
// أنا كريم، عندي 22 سنة
// متوسط منى: 3.8
` },
    { type: 'p', text: 'الـ class Student فيها `fields` (بيانات: name و age و gpa) و `method` (سلوك: introduce). السطر `new Student()` بيخلق object جديد من القالب ده في الذاكرة. كل object ليه نسخته الخاصة من الـ fields: s1.name حاجة، و s2.name حاجة تانية خالص.' },
    { type: 'h', text: 'الـ Constructor: استقبال البيانات من أول لحظة' },
    { type: 'p', text: 'تعبئة الـ fields سطر سطر مملة وسهلة النسيان. الـ `constructor` هو method خاصة بتتنادى تلقائياً لحظة إنشاء الـ object، وبتوصلها البيانات الأولية مرة واحدة:' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    BankAccount acc = new BankAccount("أحمد", 100);
    acc.deposit(50);
    acc.printStatus();
  }
}

class BankAccount {
  String owner;
  double balance;

  BankAccount(String ownerName, double startBalance) {
    owner = ownerName;
    balance = startBalance;
  }

  void deposit(double amount) {
    balance += amount;
  }

  void printStatus() {
    System.out.println(owner + ": " + balance + " جنيه");
  }
}
// الناتج:
// أحمد: 150.0 جنيه
` },
    { type: 'p', text: 'الـ constructor اسمها نفس اسم الكلاس بالظبط ومعلهاش نوع رجوع (ولا حتى void). لما بتكتب `new BankAccount("أحمد", 100)`، Java بتنده على الـ constructor بالقيم دي، والـ object بيطلع جاهز من أول لحظة.' },
    { type: 'h', text: 'كلمة this: أنا مين؟' },
    { type: 'p', text: 'لو اسم الـ parameter نفس اسم الـ field، Java بتحتار. الحل هو `this`: بتعني "الـ object الحالي نفسه". الكتبة دي هي الشائعة في كل كود Java:' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    Player p = new Player("سارة");
    p.addPoints(30);
    p.addPoints(15);
    p.show();
  }
}

class Player {
  String name;
  int score;

  Player(String name) {
    this.name = name;
    this.score = 0;
  }

  void addPoints(int points) {
    this.score += points;
  }

  void show() {
    System.out.println(this.name + " جمع " + this.score + " نقطة");
  }
}
// الناتج:
// سارة جمع 45 نقطة
` },
    { type: 'h', text: 'ليه ده أحسن من متغيرات متفرقة؟' },
    { type: 'list', items: [
      'البيانات المترابطة مسافرة مع بعض: حساب واحد فيه صاحبه ورصيده، مش متغيرين تايهين.',
      'السلوك مربوط بالبيانات: deposit بتعرف تعدل balance لأنها جوه نفس الكلاس.',
      'تنظيم المشاريع الكبيرة: بدل ملف فيه 500 سطر متشابكين، كل مفهوم له كلاس واضح مسؤول عنه.',
      'إعادة الاستخدام: نفس كلاس Student يشتغل في نظام مدرسة ونظام جامعة.'
    ] },
    { type: 'note', text: 'فاكر كلمة static اللي شفناها في main وفي methods الدرس اللي فات؟ دلوقتي تقدر تفهمها: method بـ static بتنتمي للكلاس نفسه ومش محتاجة object. أما methods زي introduce فبتنتمي لكل object، عشان كده بننده عليها بـ s1.introduce() مش Student.introduce().' }
  ],
  quiz: [
    { q: 'إيه الفرق بين الـ class والـ object؟', options: [
      { text: 'الـ class هو القالب أو التصميم، والـ object نسخة حقيقية حية اتعملت من القالب ده' },
      { text: 'مفيش فرق، دول اسمين لنفس الحاجة' },
      { text: 'الـ object هو القالب والـ class هو النسخة' }
    ], answer: 0, explain: 'من كلاس Student واحد تقدر تعمل ألف object، كل واحد بياناته مستقلة.' },
    { q: 'إيه ناتج الكود ده؟', code: `class Main {
  public static void main(String[] args) {
    Counter c = new Counter();
    c.bump();
    c.bump();
    c.bump();
    System.out.println(c.count);
  }
}

class Counter {
  int count = 0;
  void bump() {
    count++;
  }
}`, verifyOutput: true, options: [
      { text: '3' },
      { text: '0' },
      { text: '1' }
    ], answer: 0, explain: 'كل object بيحتفظ بحالته: count اتخزنت جوه c، وكل bump زودتها واحد.' },
    { q: 'ليه بنستخدم this داخل الـ constructor؟', options: [
      { text: 'عشان نفرق بين الـ field والـ parameter لما يكون ليهم نفس الاسم' },
      { text: 'عشان نسرع تنفيذ البرنامج' },
      { text: 'لأنها إجبارية في أي constructor' }
    ], answer: 0, explain: 'this.name = name معناها: حط قيمة الـ parameter في الـ field بتاع الـ object الحالي. من غيرها، name = name مبتعملش حاجة.' }
  ],
  exercises: [
    { task: 'صمم كلاس Book فيها title و pages، وconstructor بياخدهم، وmethod اسمها describe بتطبع جملة عن الكتاب. اعمل objectين وجربهم', code: `class Main {
  public static void main(String[] args) {
    Book b1 = new Book("الأسود يليق بك", 350);
    Book b2 = new Book("أرض زيكولا", 376);
    b1.describe();
    b2.describe();
  }
}

class Book {
  String title;
  int pages;

  Book(String title, int pages) {
    this.title = title;
    this.pages = pages;
  }

  void describe() {
    System.out.println("كتاب " + this.title + " فيه " + this.pages + " صفحة");
  }
}
// الناتج:
// كتاب الأسود يليق بك فيه 350 صفحة
// كتاب أرض زيكولا فيه 376 صفحة
`, why: 'لاحظ إن الملف بيتسمى Main.java لأن الكلاس اللي فيه main اسمه Main. في المشاريع الحقيقية كل كلاس في ملف لوحده بنفس اسمه.' },
    { task: 'زود على كلاس BankAccount اللي في الدرس method اسمها withdraw بتسحب فلوس بس ترفض لو المبلغ أكبر من الرصيد، واطبع رسالة مناسبة في الحالتين', code: `class Main {
  public static void main(String[] args) {
    BankAccount acc = new BankAccount("أحمد", 100);
    acc.withdraw(60);
    acc.withdraw(80);
    acc.printStatus();
  }
}

class BankAccount {
  String owner;
  double balance;

  BankAccount(String owner, double balance) {
    this.owner = owner;
    this.balance = balance;
  }

  void withdraw(double amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      System.out.println("سحب ناجح: " + amount);
    } else {
      System.out.println("الرصيد مش كفاية يا " + this.owner);
    }
  }

  void printStatus() {
    System.out.println(this.owner + ": " + this.balance + " جنيه");
  }
}
// الناتج:
// سحب ناجح: 60.0
// الرصيد مش كفاية يا أحمد
// أحمد: 40.0 جنيه
`, why: 'ده أول ذرة منطق حماية: الـ method مش بس بتنفذ، دي كمان بتأكد إن العملية منطقية. الفكرة دي هتكبر معاك لحد الـ encapsulation والـ exceptions.' }
  ]
}
,
{
  id: 'inheritance',
  nav: 'الوراثة',
  title: 'الوراثة (Inheritance): كلاس تاخد من كلاس',
  subtitle: 'extends و super: ليه نكتب الكود مرتين وإحنا ممكن نورثه؟',
  blocks: [
    { type: 'p', text: 'تخيل نظام فيه موظفين ومديرين. الاتنين عندهم اسم ومرتب وبياخدوا إجازات، بس المدير عنده حاجات زيادة: فريق تحته وبونص. هنكتب الاسم والمرتب في كلاسين؟ لأ: بنعمل كلاس أساسي فيه المشترك، وكلاسات تانية `ترث` منه وتزود اللي يخصها. دي الوراثة.' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    Employee e = new Employee("منى", 8000);
    Manager m = new Manager("كريم", 15000, 6);
    e.work();
    m.work();
    m.holdMeeting();
  }
}

class Employee {
  String name;
  double salary;

  Employee(String name, double salary) {
    this.name = name;
    this.salary = salary;
  }

  void work() {
    System.out.println(this.name + " بيشتغل");
  }
}

class Manager extends Employee {
  int teamSize;

  Manager(String name, double salary, int teamSize) {
    super(name, salary);
    this.teamSize = teamSize;
  }

  void holdMeeting() {
    System.out.println(this.name + " عقد اجتماع مع " + this.teamSize + " أفراد");
  }
}
// الناتج:
// منى بيشتغل
// كريم بيشتغل
// كريم عقد اجتماع مع 6 أفراد
` },
    { type: 'p', text: 'كلمة `extends` معناها: Manager نوع من Employee. ورث كل حاجة: الـ fields والـ methods. عشان كده `m.work()` اشتغلت من غير ما نكتبها في Manager أصلاً. وكلمة `super(name, salary)` بتنده على constructor الأب عشان يجهز الجزء الموروث.' },
    { type: 'h', text: 'نفس الـ method بروح مختلفة: overriding' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    Animal a = new Animal();
    Dog d = new Dog();
    Cat c = new Cat();
    a.makeSound();
    d.makeSound();
    c.makeSound();
  }
}

class Animal {
  void makeSound() {
    System.out.println("صوت حيوان عام");
  }
}

class Dog extends Animal {
  @Override
  void makeSound() {
    System.out.println("هو هو!");
  }
}

class Cat extends Animal {
  @Override
  void makeSound() {
    System.out.println("مياو!");
  }
}
// الناتج:
// صوت حيوان عام
// هو هو!
// مياو!
` },
    { type: 'p', text: 'لما الكلاس الابن يعيد كتابة method موجودة في الأب بنفس الاسم والـ parameters، ده اسمه `overriding`. السطر `@Override` تعليمة اختيارية بتقول للمترجم: أنا قاصد أعيد كتابة method الأب، لو غلطت في الاسم أو الـ parameters نبّهني. انصحك تكتبها دايماً.' },
    { type: 'note', warn: true, text: 'متلخبطش بين overriding و overloading اللي خدناه في درس الـ Methods: overloading = نفس الاسم parameters مختلفة في نفس الكلاس. overriding = نفس الاسم ونفس الـ parameters، بس في علاقة أب وابن.' },
    { type: 'h', text: 'السحر الحقيقي: polymorphism' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    Shape[] shapes = { new Square(4), new CircleShape(2) };
    for (Shape s : shapes) {
      System.out.println("المساحة: " + s.area());
    }
  }
}

class Shape {
  double area() {
    return 0;
  }
}

class Square extends Shape {
  double side;
  Square(double side) {
    this.side = side;
  }
  @Override
  double area() {
    return side * side;
  }
}

class CircleShape extends Shape {
  double radius;
  CircleShape(double radius) {
    this.radius = radius;
  }
  @Override
  double area() {
    return 3.14159 * radius * radius;
  }
}
// الناتج:
// المساحة: 16.0
// المساحة: 12.56636
` },
    { type: 'p', text: 'لاحظ اللي حصل: الـ array نوعها `Shape`، بس حطينا جواها Square و CircleShape (لأن كل واحد فيهم "هو" Shape بالوراثة). ولما نادينا `s.area()`، Java اختارت نسخة الابن الصح تلقائياً. ده اسمه `polymorphism` (تعدد الأشكال): أمر واحد، سلوك مختلف حسب النوع الحقيقي للـ object. دي أقوى فكرة في الـ OOP كلها.' },
    { type: 'h', text: 'قواعد مهمة عن الوراثة في Java' },
    { type: 'list', items: [
      'الكلاس بيرث من كلاس واحد بس (مفيش وراثة متعددة من كلاسات). عايز تورث سلوك من أكتر من مصدر؟ الـ interfaces الجاية بتحلها.',
      'الابن بيقدر يستخدم methods و fields الأب، ويزود حاجاته الخاصة، ويعيد كتابة اللي يعجبه.',
      'super.methodName() بتنده نسخة الأب من الـ method حتى لو عملتلها override.',
      'كل كلاس في Java بيرث ضمنياً من كلاس اسمه Object، حتى لو مكتبتش extends.'
    ] }
  ],
  quiz: [
    { q: 'إيه ناتج الكود ده؟', code: `class Main {
  public static void main(String[] args) {
    A obj = new B();
    obj.hello();
  }
}

class A {
  void hello() {
    System.out.println("من الأب");
  }
}

class B extends A {
  @Override
  void hello() {
    System.out.println("من الابن");
  }
}`, verifyOutput: true, options: [
      { text: 'من الابن' },
      { text: 'من الأب' },
      { text: 'هيطلع خطأ لأن المتغير نوعه A' }
    ], answer: 0, explain: 'ده الـ polymorphism: نوع المتغير A بس الـ object الحقيقي B، فبتتنفذ نسخة الابن. نوع الـ object هو اللي يحدد السلوك.' },
    { q: 'ليه بنكتب super(name, salary) في constructor الابن؟', options: [
      { text: 'عشان ننده على constructor الأب ليجهز الجزء الموروث قبل ما نكمل إعداد الابن' },
      { text: 'عشان نمنع إنشاء objects من الأب' },
      { text: 'عشان نخلي الابن أسرع في التنفيذ' }
    ], answer: 0, explain: 'الابن بيحتوي الأب جواه، فالأب لازم يتبنى الأول. super بتوصله بالبيانات اللي محتاجها.' },
    { q: 'كلاس في Java يقدر يرث من كام كلاس؟', options: [
      { text: 'كلاس واحد بس' },
      { text: 'اتنين على الأكثر' },
      { text: 'أي عدد' }
    ], answer: 0, explain: 'Java بتسمح بوراثة واحدة من كلاس، بس تقدر تطبق implements لأكتر من interface زي ما هنشوف الدرس الجاي.' }
  ],
  exercises: [
    { task: 'اعمل كلاس Vehicle فيها speed وmethod اسمها move، وورث منها كلاس Car بيزود عدد الأبواب ويعمل override لـ move', code: `class Main {
  public static void main(String[] args) {
    Vehicle v = new Vehicle(60);
    Car c = new Car(120, 4);
    v.move();
    c.move();
  }
}

class Vehicle {
  int speed;

  Vehicle(int speed) {
    this.speed = speed;
  }

  void move() {
    System.out.println("مركبة بتتحرك بسرعة " + speed);
  }
}

class Car extends Vehicle {
  int doors;

  Car(int speed, int doors) {
    super(speed);
    this.doors = doors;
  }

  @Override
  void move() {
    System.out.println("عربية " + doors + " أبواب ماشية بسرعة " + speed);
  }
}
// الناتج:
// مركبة بتتحرك بسرعة 60
// عربية 4 أبواب ماشية بسرعة 120
`, why: 'لاحظ إن الابن استخدم speed الموروثة من غير ما يعرفها من تاني. ولو غيرت نسخة move في Car، نسخة الأب لسه موجودة للـ objects العادية.' },
    { task: 'اعمل array نوعها Animal (من مثال الدرس) فيها Dog و Cat و Animal عادي، والف عليهم ونادي makeSound على كل واحد', code: `class Main {
  public static void main(String[] args) {
    Animal[] zoo = { new Dog(), new Cat(), new Animal() };
    for (Animal a : zoo) {
      a.makeSound();
    }
  }
}

class Animal {
  void makeSound() {
    System.out.println("صوت حيوان عام");
  }
}

class Dog extends Animal {
  @Override
  void makeSound() {
    System.out.println("هو هو!");
  }
}

class Cat extends Animal {
  @Override
  void makeSound() {
    System.out.println("مياو!");
  }
}
// الناتج:
// هو هو!
// مياو!
// صوت حيوان عام
`, why: '3 objects من 3 أنواع في array واحدة، وكل واحد رد بطريقته. لما تفهم السطر ده كويس، تبقى فهمت الـ polymorphism فعلاً.' }
  ]
}
,
{
  id: 'interfaces',
  nav: 'الـ Interfaces',
  title: 'الـ Interfaces: عقد التزام بين الكلاسات',
  subtitle: 'لما تقول "أي حاجة تشتغل معايا لازم تعمل كده"، بتكتب interface',
  blocks: [
    { type: 'p', text: 'تخيل إنك بتبني لعبة فيها شخصيات كتير: محارب، ساحر، رامي سهام. عايز تضمن إن أي شخصية جديدة تنضم للعبة يكون عندها إمكانية "تهاجم" و "تدافع"، وإلا اللعبة هتبوظ. الـ `interface` هو الضمان ده: عقد مكتوب بيقول "أي كلاس يوقع هنا ملزم يكتب الـ methods دي".' },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    Playable p1 = new MusicPlayer();
    Playable p2 = new VideoPlayer();
    p1.play();
    p2.play();
    p1.stop();
  }
}

interface Playable {
  void play();
  void stop();
}

class MusicPlayer implements Playable {
  public void play() {
    System.out.println("الموسيقى شغالة");
  }
  public void stop() {
    System.out.println("الموسيقى وقفت");
  }
}

class VideoPlayer implements Playable {
  public void play() {
    System.out.println("الفيديو شغال");
  }
  public void stop() {
    System.out.println("الفيديو وقف");
  }
}
// الناتج:
// الموسيقى شغالة
// الفيديو شغال
// الموسيقى وقفت
` },
    { type: 'p', text: 'الـ interface بيحدد أسماء الـ methods وأنواعها من غير أي تنفيذ (مفيش جسم للـ method). الكلاس اللي بيكتب `implements Playable` بيتعاقد: لازم يكتب تنفيذ حقيقي لكل method في العقد، والمترجم بيرفض يترجم الكود لو نسيت واحدة. لاحظ إننا قدرنا نخزن MusicPlayer و VideoPlayer في متغيرات نوعها Playable، نفس فكرة الـ polymorphism اللي خدناها في الوراثة.' },
    { type: 'h', text: 'interface ولا class؟ إيه الفرق؟' },
    { type: 'table', head: ['النقطة', 'Class عادية', 'Interface'], rows: [
      ['الغرض', 'قالب لعمل objects', 'عقد التزام بالـ methods'],
      ['التنفيذ', 'فيها كود حقيقي', 'الأسماء بس (الكلاس ينفذ)'],
      ['العلاقة', 'extends من كلاس واحد', 'implements لأكتر من interface'],
      ['الإنشاء', 'new مباشرة', 'مينفعش new interface']
    ] },
    { type: 'code', code: `class Main {
  public static void main(String[] args) {
    SmartWatch w = new SmartWatch();
    w.charge();
    w.dry();
  }
}

interface Chargeable {
  void charge();
}

interface Waterproof {
  void dry();
}

class SmartWatch implements Chargeable, Waterproof {
  public void charge() {
    System.out.println("الساعة بتتشحن");
  }
  public void dry() {
    System.out.println("الساعة بتتنشف بعد المية");
  }
}
// الناتج:
// الساعة بتتشحن
// الساعة بتتنشف بعد المية
` },
    { type: 'p', text: 'هاك الفرق القاتل عن الوراثة: الكلاس يرث من كلاس واحد بس، بس يقدر يعمل `implements` لأكتر من interface في نفس الوقت. عشان كده الـ interfaces هي الطريقة المعتمدة في Java لتركيب قدرات مختلفة على نفس الكلاس.' },
    { type: 'h', text: 'ليه ده مفيد في الحقيقة؟' },
    { type: 'p', text: 'أشهر استخدام: لما تكتب كود بيتعامل مع "أي حاجة قابلة للتشغيل" من غير ما يهمه نوعها. زي زرار Play في مشغل وسائط: بيشتغل مع أغاني وفيديوهات وبودكاست، لأنهم كلهم implements Playable. لما تضيف نوع جديد سنة جاية، الكود القديم هيشتغل معاه من غير تعديل سطر واحد.' },
    { type: 'note', text: 'هتلاقي interfaces جاهزة في Java نفسها هتقابلها كتير: `Comparable` (عشان الترتيب)، `Runnable` (عشان الـ threads)، و `List` نفسها interface والـ ArrayList بيعمل لها implements. الدرس الجاي هيبني على النقطة دي بالظبط.' },
    { type: 'note', warn: true, text: 'قاعدة صغيرة بتتلخبط ناس: الـ methods في الـ interface بتكون public ضمنياً، فلما تيجي تنفذها في الكلاس لازم تكتب public صراحة، وإلا هيطلعلك خطأ ترجمة. عشان كده شفت public void play في الأمثلة فوق.' }
  ],
  quiz: [
    { q: 'إيه اللي بيحصل لو كلاس كتب implements Playable ونسي ينفذ method stop؟', options: [
      { text: 'المترجم بيرفض يترجم الكود ويطلع خطأ' },
      { text: 'البرنامج يشتغل عادي والـ method تتجاهل' },
      { text: 'بيتعمل stop فاضية تلقائياً' }
    ], answer: 0, explain: 'دي فكرة العقد: الترجمة نفسها بتفشل، فالغلطة بتتكشف قبل التشغيل بكتير. ده أمان مش إزعاج.' },
    { q: 'إيه ناتج الكود ده؟', code: `class Main {
  public static void main(String[] args) {
    Greeter g = new EgyptianGreeter();
    g.sayHi();
  }
}

interface Greeter {
  void sayHi();
}

class EgyptianGreeter implements Greeter {
  public void sayHi() {
    System.out.println("أهلاً وسهلاً");
  }
}`, verifyOutput: true, options: [
      { text: 'أهلاً وسهلاً' },
      { text: 'خطأ: مينفعش نخزن object في متغير نوعه interface' },
      { text: 'مفيش ناتج' }
    ], answer: 0, explain: 'ينفع جداً: متغير نوعه interface يشاور على أي object بيطبق العقد، وبتتنفذ نسخة الكلاس الحقيقي.' },
    { q: 'إيه الميزة اللي في الـ interfaces ومش موجودة في وراثة الكلاسات؟', options: [
      { text: 'الكلاس يقدر يعمل implements لأكتر من interface، بينما يرث من كلاس واحد بس' },
      { text: 'الـ interfaces أسرع في التنفيذ' },
      { text: 'الـ interfaces بتكتب بالعربي' }
    ], answer: 0, explain: 'extends واحدة بس، لكن implements لأي عدد: class X implements A, B, C شغالة عادي.' }
  ],
  exercises: [
    { task: 'اعمل interface اسمها Drawable فيها method واحدة draw، وكلاسين Circle و Rectangle بينفذوها كل بطريقته، وجربهم من main', code: `class Main {
  public static void main(String[] args) {
    Drawable[] shapes = { new Circle(), new Rectangle() };
    for (Drawable d : shapes) {
      d.draw();
    }
  }
}

interface Drawable {
  void draw();
}

class Circle implements Drawable {
  public void draw() {
    System.out.println("رسم دايرة O");
  }
}

class Rectangle implements Drawable {
  public void draw() {
    System.out.println("رسم مستطيل []");
  }
}
// الناتج:
// رسم دايرة O
// رسم مستطيل []
`, why: 'الـ array نوعها Drawable فشالت الاتنين مع بعض. لو ضفت كلاس Triangle بعدين بينفذ نفس العقد، هيشتغل في نفس اللوب من غير ما تلمس الكود ده.' },
    { task: 'اعمل interface اسمها Payable فيها method pay بترجع double (قيمة الفلوس)، وكلاسين: CashPayment بترجع المبلغ زي ما هو، وCardPayment بتضيف 5 جنيه رسوم ثابتة', code: `class Main {
  public static void main(String[] args) {
    Payable cash = new CashPayment();
    Payable card = new CardPayment();
    System.out.println("كاش: " + cash.pay(200));
    System.out.println("فيزا: " + card.pay(200));
  }
}

interface Payable {
  double pay(double amount);
}

class CashPayment implements Payable {
  public double pay(double amount) {
    return amount;
  }
}

class CardPayment implements Payable {
  public double pay(double amount) {
    return amount + 5;
  }
}
// الناتج:
// كاش: 200.0
// فيزا: 205.0
`, why: 'نفس النداء pay(200) سلوكه مختلف حسب نوع الدفع. في الأنظمة الحقيقية بتتضاف طرق دفع جديدة (محافظ إلكترونية مثلاً) من غير ما كود الكاشير يتغير.' }
  ]
}
,
{
  id: 'collections',
  nav: 'Collections: ArrayList و HashMap',
  title: 'الـ Collections: ArrayList و HashMap',
  subtitle: 'قوائم بتكبر وتصغر لوحدها، وقواميس بتدور بالاسم مش بالرقم',
  blocks: [
    { type: 'p', text: 'الـ arrays اللي خدناها حلوة، بس عندها قيد قاتل: حجمها ثابت. في الحياة الحقيقية البيانات بتزيد وتنقص: قايمة تسوق، رسايل، طلبات. هنا بييجي دور الـ `Collections`: هياكل بيانات جاهزة في Java بتكبر وتصغر لوحدها وفيها methods جاهزة لكل حاجة تقريباً. أشهر اتنين: `ArrayList` و `HashMap`.' },
    { type: 'h', text: 'ArrayList: array حجمها مرن' },
    { type: 'code', code: `import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    ArrayList<String> todos = new ArrayList<String>();
    todos.add("أذاكر Java");
    todos.add("أتمرن في المعمل");
    todos.add("أنام بدري");
    System.out.println("عدد المهام: " + todos.size());
    System.out.println("أول مهمة: " + todos.get(0));

    todos.remove(1);
    System.out.println("بعد الحذف: " + todos.size());
    for (String t : todos) {
      System.out.println("- " + t);
    }
  }
}
// الناتج:
// عدد المهام: 3
// أول مهمة: أذاكر Java
// بعد الحذف: 2
// - أذاكر Java
// - أنام بدري` },
    { type: 'p', text: 'الفرق الجوهري عن الـ array: `add` بتضيف، و `remove` بتحذف، والحجم بيتظبط لوحده. وبدل `length` بنستخدم `size()`، وبدل الأقواس المربعة بنستخدم `get(index)`. وسطر `import java.util.ArrayList;` في أول الملف بيخلي Java تعرف الكلاس ده فين.' },
    { type: 'note', warn: true, text: 'الجزء اللي بين < > اسمه generics وبيقول الـ ArrayList دي شايلة إيه. ملحوظة مهمة: مينفعش تكتب ArrayList<int> لأن الـ collections بتشيل objects بس. الحل: استخدم الكلاس المقابل: `ArrayList<Integer>` للأرقام الصحيحة، `ArrayList<Double>` للعشرية. Java بتحول بين int و Integer لوحدها (اسمه autoboxing) فهتحسش بفرق في الاستخدام.' },
    { type: 'code', code: `import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    ArrayList<Integer> scores = new ArrayList<Integer>();
    scores.add(85);
    scores.add(92);
    scores.add(78);

    int total = 0;
    for (int s : scores) {
      total += s;
    }
    System.out.println("المجموع: " + total);
    System.out.println("أكبر من 80؟ " + scores.contains(92));
  }
}
// الناتج:
// المجموع: 255
// أكبر من 80؟ true` },
    { type: 'h', text: 'HashMap: قاموس بمفتاح وقيمة' },
    { type: 'p', text: 'الـ `HashMap` بتخزن أزواج: مفتاح (key) وقيمة (value). بدل ما تدور بالرقم زي الـ array، بتدور بأي حاجة: اسم، كود منتج، رقم قومي. زي تليفونك: بتدور باسم جهة الاتصال مش برقمها في القايمة.' },
    { type: 'code', code: `import java.util.HashMap;

class Main {
  public static void main(String[] args) {
    HashMap<String, Integer> prices = new HashMap<String, Integer>();
    prices.put("شاي", 10);
    prices.put("قهوة", 25);
    prices.put("عصير", 20);

    System.out.println("سعر القهوة: " + prices.get("قهوة"));
    System.out.println("في شاي؟ " + prices.containsKey("شاي"));
    System.out.println("عدد الأصناف: " + prices.size());

    for (String item : prices.keySet()) {
      System.out.println(item + " = " + prices.get(item));
    }
  }
}
// الناتج:
// سعر القهوة: 25
// في شاي؟ true
// عدد الأصناف: 3
// قهوة = 25
// شاي = 10
// عصير = 20` },
    { type: 'p', text: '`put` بتخزن (وتحدث لو المفتاح موجود)، و `get` بتجيب القيمة بالمفتاح، و `keySet` بترجع كل المفاتيح عشان تلف عليها. تنبيه صغير: ترتيب العناصر في الـ HashMap مش مضمون، لو الترتيب مهم استخدم `LinkedHashMap` (نفس الاستخدام بالظبط). اللف على map واحدة صغيرة بتتعامل معاها كل يوم.' },
    { type: 'h', text: 'ArrayList ولا HashMap؟' },
    { type: 'list', items: [
      'ArrayList: قايمة مرتبة من حاجات متشابهة، بتوصلها بالرقم: مهام، رسايل، درجات.',
      'HashMap: علاقات مفتاح/قيمة، بتوصلها بالمفتاح: أسعار منتجات، أرقام تليفونات، إعدادات.',
      'اتنينهم بيكبروا لوحدهم، ولاتنين جواهم methods جاهزة وفرت عليك كتابة مئات السطور.'
    ] },
    { type: 'note', text: 'الـ ArrayList نفسها مبنية على فكرة الـ interfaces اللي فاتت: ArrayList بيعمل implements لـ interface اسمها List. عشان كده في كود الشركات هتلاقيهم يكتبوا List<String> x = new ArrayList<>()، يعني يتعاملوا مع العقد مش مع التنفيذ. فكرة شفتها قبل كده!' }
  ],
  quiz: [
    { q: 'إيه ناتج الكود ده؟', code: `import java.util.ArrayList;
class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<String>();
    list.add("أ");
    list.add("ب");
    list.add("ج");
    list.remove(0);
    System.out.println(list.get(0) + list.size());
  }
}`, verifyOutput: true, options: [
      { text: 'ب2' },
      { text: 'أ2' },
      { text: 'ب3' }
    ], answer: 0, explain: 'بعد حذف "أ"، العناصر زحزحت: "ب" بقت في الخانة 0، والحجم بقى 2. اللصق النصي جمعهم: ب2.' },
    { q: 'ليه ArrayList<int> ممنوعة و ArrayList<Integer> شغالة؟', options: [
      { text: 'لأن الـ collections بتشيل objects بس، و int نوع أساسي مش object، فبنستخدم المقابل الكلاسي Integer' },
      { text: 'لأن int أبطأ من Integer' },
      { text: 'مفيش فرق، الاتنين شغالين' }
    ], answer: 0, explain: 'الأنواع الأساسية ليها كلاسات مقابلة: int ليه Integer، double ليه Double، boolean ليه Boolean. Java بتحول بينهم تلقائياً (autoboxing).' },
    { q: 'في HashMap، لو عملت put("شاي", 10) وبعدين put("شاي", 15)، إيه اللي هيحصل؟', options: [
      { text: 'القيمة بتتحدث لـ 15، المفتاح الواحد ليه قيمة واحدة' },
      { text: 'هيبقى عندك مدخلين بنفس المفتاح' },
      { text: 'هيطلع خطأ تكرار مفتاح' }
    ], answer: 0, explain: 'put على مفتاح موجود بتحدث قيمته من غير أي خطأ. عشان كده الخريطة مثالية لعدّادات وأسعار بتتغير.' }
  ],
  exercises: [
    { task: 'اعمل ArrayList فيها أسماء 5 طلاب، اطبع عددهم، وبعدين امسح اسم من النص واطبع القايمة كلها', code: `import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    ArrayList<String> students = new ArrayList<String>();
    students.add("أحمد");
    students.add("منى");
    students.add("كريم");
    students.add("سارة");
    students.add("يوسف");
    System.out.println("العدد: " + students.size());
    students.remove("كريم");
    for (String s : students) {
      System.out.println(s);
    }
  }
}
// الناتج:
// العدد: 5
// أحمد
// منى
// سارة
// يوسف`, why: 'لاحظ إن remove تقبل القيمة نفسها كمان مش بس الرقم: remove("كريم") بتحذف أول ظهور للقيمة دي.' },
    { task: 'اعمل HashMap تعد كام مرة كل حرف "أ" و "ب" و "ج" ظهر في القايمة: أ، ب، أ، ج، أ، ب. المطلوب يطلع: أ=3 ب=2 ج=1', code: `import java.util.HashMap;

class Main {
  public static void main(String[] args) {
    String[] letters = {"أ", "ب", "أ", "ج", "أ", "ب"};
    HashMap<String, Integer> counts = new HashMap<String, Integer>();
    for (String letter : letters) {
      if (counts.containsKey(letter)) {
        counts.put(letter, counts.get(letter) + 1);
      } else {
        counts.put(letter, 1);
      }
    }
    System.out.println("أ=" + counts.get("أ") + " ب=" + counts.get("ب") + " ج=" + counts.get("ج"));
  }
}
// الناتج:
// أ=3 ب=2 ج=1`, why: 'دي أشهر وصفة في البرمجة كلها: العد بالخريطة. المفتاح هو الحاجة، والقيمة هي عدد مرات الظهور. هتستخدمها في تحليل نصوص وتقارير وفلترة.' }
  ]
}
,
{
  id: 'exceptions',
  nav: 'الـ Exceptions',
  title: 'الـ Exceptions: برنامج يتعامل مع الكوارث بذكاء',
  subtitle: 'try و catch و finally: الخطأ مش نهاية البرنامج',
  blocks: [
    { type: 'p', text: 'فاكر درس الـ Arrays لما قرأنا خانة مش موجودة والبرنامج عمل crash؟ اللي حصل ساعتها اسمه `exception`: حدث غير طبيعي بيوقف البرنامج. الحياة مليانة بالحاجات دي: ملف مش موجود، إنترنت فصل، المستخدم دخل نص مكان رقم، قسمة على صفر. البرنامج المحترم مش اللي معملهوش أخطاء، ده اللي بيعرف يتصرف لما تحصل.' },
    { type: 'h', text: 'try و catch: جرب، ولو حصلت مشكلة امسكها' },
    { type: 'code', code: `class SafeDivision {
  public static void main(String[] args) {
    int a = 10;
    int b = 0;
    try {
      int result = a / b;
      System.out.println("الناتج: " + result);
    } catch (ArithmeticException e) {
      System.out.println("مينفعش نقسم على صفر!");
    }
    System.out.println("البرنامج لسه شغال");
  }
}
// الناتج:
// مينفعش نقسم على صفر!
// البرنامج لسه شغال` },
    { type: 'p', text: 'الكود اللي ممكن يضرب بيتكتب جوه `try`. لو حصل exception، التنفيذ بيقفز فوراً لكتلة `catch` المناسبة لنوع الخطأ، والبرنامج يكمل بعدها عادي بدل ما يموت. لاحظ السطر الأخير اتطبع: من غير الـ try/catch كان زمانه مظهرش خالص.' },
    { type: 'h', text: 'أكتر من catch لأكتر من نوع خطأ' },
    { type: 'code', code: `class MultiCatch {
  public static void main(String[] args) {
    int[] nums = {1, 2, 3};
    String text = null;
    try {
      System.out.println(nums[10]);
      System.out.println(text.length());
    } catch (ArrayIndexOutOfBoundsException e) {
      System.out.println("خانة مش موجودة في الـ array");
    } catch (NullPointerException e) {
      System.out.println("المتغير فاضي null");
    }
  }
}
// الناتج:
// خانة مش موجودة في الـ array` },
    { type: 'p', text: 'كل `catch` متخصصة في نوع exception معين، وأول واحدة تطابق الخطأ بتتنفذ والباقي بيتتخطى. ولاحظ إن السطر التاني جوه الـ try متنفذش أصلاً: أول exception بيوقف كتلة الـ try كلها في مكانها. تقدر كمان تمسك النوع العام `Exception` في catch أخيرة كشبكة أمان.' },
    { type: 'h', text: 'finally: كود بيتنفذ مهما حصل' },
    { type: 'code', code: `class FinallyDemo {
  public static void main(String[] args) {
    try {
      int result = 20 / 4;
      System.out.println("الناتج: " + result);
    } catch (ArithmeticException e) {
      System.out.println("خطأ في القسمة");
    } finally {
      System.out.println("ده بيتطبع في كل الأحوال");
    }
  }
}
// الناتج:
// الناتج: 5
// ده بيتطبع في كل الأحوال` },
    { type: 'p', text: 'كتلة `finally` بتتنفذ سواء حصل exception أو لا. مكانها المثالي: قفل ملفات، قطع اتصالات بقواعد البيانات، أي تنضيف لازم يحصل مهما كان. جرب غير 4 لـ 0 في المعمل: هتلاقي رسالة الخطأ ورسالة الـ finally ورا بعض.' },
    { type: 'h', text: 'ارمي exception بنفسك: throw' },
    { type: 'code', code: `class AgeCheck {
  static void setAge(int age) {
    if (age < 0) {
      throw new IllegalArgumentException("السن مينفعش يكون بالسالب");
    }
    System.out.println("اتسجل السن: " + age);
  }

  public static void main(String[] args) {
    try {
      setAge(25);
      setAge(-3);
    } catch (IllegalArgumentException e) {
      System.out.println("اتمسك الخطأ: " + e.getMessage());
    }
  }
}
// الناتج:
// اتسجل السن: 25
// اتمسك الخطأ: السن مينفعش يكون بالسالب` },
    { type: 'p', text: 'لما الدنيا تكون غلط منطقياً (سن بالسالب مثلاً)، تقدم `throw` exception برسالة واضحة. اللي بينادي على الـ method هو اللي يقرر يمسكها ويتصرف. دي طريقة Java في قول "المدخلات دي مرفوضة" بدل ما البرنامج يكمل ببيانات بايظة.' },
    { type: 'h', text: 'أشهر exceptions هتقابلها' },
    { type: 'table', head: ['الـ Exception', 'بيحصل إمتى'], rows: [
      ['ArithmeticException', 'قسمة أرقام صحيحة على صفر'],
      ['ArrayIndexOutOfBoundsException', 'خانة خارج حدود الـ array'],
      ['NullPointerException', 'استخدام متغير قيمته null'],
      ['NumberFormatException', 'تحويل نص مش رقمي لرقم'],
      ['IllegalArgumentException', 'مدخل غير منطقي لـ method']
    ] },
    { type: 'note', text: 'فيه نوعين من الـ exceptions: unchecked (زي كل اللي فوق: بتحصل وقت التشغيل وانت مسؤول تتجنبها) و checked (زي IOException في قراءة الملفات: المترجم نفسه بيلزمك تتعامل معاها بـ try/catch أو throws في تعريف الـ method). هتقابل checked exceptions أول ما تشتغل مع ملفات أو شبكات.' }
  ],
  quiz: [
    { q: 'إيه ناتج الكود ده؟', code: `try {
  int[] nums = {5, 6};
  System.out.println(nums[1]);
  System.out.println(nums[5]);
  System.out.println("آخر سطر");
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("وقعت");
}`, verifyOutput: true, options: [
      { text: '6\nوقعت' },
      { text: '6\nآخر سطر' },
      { text: 'وقعت' }
    ], answer: 0, explain: 'nums[1] اتطبعت، nums[5] ضربت exception فقفز التنفيذ للـ catch فوراً، وسطر "آخر سطر" اتخطى.' },
    { q: 'إمتى بتتنفذ كتلة finally؟', options: [
      { text: 'دايماً: سواء حصل exception أو لا' },
      { text: 'بس لما يحصل exception' },
      { text: 'بس لما مفيش exception' }
    ], answer: 0, explain: 'عشان كده finally هي مكان قفل الموارد: متضمنش إن الملف اتقفل غير بيها.' },
    { q: 'السطر throw new IllegalArgumentException("رسالة") بيعمل إيه؟', options: [
      { text: 'بيرمي exception عمداً برسالة، وأقرب catch مناسبة بتمسكها' },
      { text: 'بيطبع رسالة تحذير ويكمل' },
      { text: 'بيقفل البرنامج فوراً من غير رجعة' }
    ], answer: 0, explain: 'throw بتطلع exception في الجو، وأي try/catch حوالين النداء بتمسكها. لو مفيش حد ماسك، البرنامج يقف ويطبع تفاصيل الخطأ.' }
  ],
  exercises: [
    { task: 'اكتب كود بيحول النص "abc" لرقم بـ Integer.parseInt ويمسك الـ NumberFormatException ويطبع رسالة مفهومة', code: `class ParseSafe {
  public static void main(String[] args) {
    String input = "abc";
    try {
      int number = Integer.parseInt(input);
      System.out.println("الرقم: " + number);
    } catch (NumberFormatException e) {
      System.out.println("ده مش رقم يا برنس: " + input);
    }
  }
}
// الناتج:
// ده مش رقم يا برنس: abc`, why: 'Integer.parseInt بتحول نص لرقم، وبتضرب NumberFormatException لو النص مش رقمي. دي أشهر exception هتقابلها مع إدخال المستخدمين.' },
    { task: 'اكتب method اسمها divide بتاخد رقمين، لو المقام صفر ترمي IllegalArgumentException برسالة، وغير كده ترجع ناتج القسمة كـ double. جربها بحالتين في main', code: `class DivideSafe {
  static double divide(int a, int b) {
    if (b == 0) {
      throw new IllegalArgumentException("المقام مينفعش يكون صفر");
    }
    return (double) a / b;
  }

  public static void main(String[] args) {
    try {
      System.out.println(divide(10, 4));
      System.out.println(divide(10, 0));
    } catch (IllegalArgumentException e) {
      System.out.println("اتمسك: " + e.getMessage());
    }
  }
}
// الناتج:
// 2.5
// اتمسك: المقام مينفعش يكون صفر`, why: 'لاحظ الترتيب: فحصنا المقام قبل القسمة فرمينا exception بوصفة واضحة. أفضل من سيبك الـ ArithmeticException تطلع من غير سياق.' }
  ]
}
,
{
  id: 'capstone',
  nav: 'المشروع الختامي',
  title: 'المشروع الختامي: نظام حسابات بنكية في الكونسول',
  subtitle: 'كل اللي اتعلمته في تطبيق واحد حقيقي: Classes و Collections و Exceptions',
  blocks: [
    { type: 'p', text: 'وصلت للدرس الأخير. هنا هنبني تطبيق console كامل: نظام حسابات بنكية مصغر فيه فتح حسابات، إيداع، سحب، وكشف حساب. كل سطر فيه مبني على درس خدته قبل كده: الـ class من درس OOP، الـ ArrayList من الـ Collections، الـ exceptions من الدرس اللي فات، والـ methods والـ loops من أول الرحلة.' },
    { type: 'h', text: 'المطلوب من النظام' },
    { type: 'list', items: [
      'فتح حساب جديد باسم ورصيد ابتدائي.',
      'إيداع مبلغ في حساب موجود.',
      'سحب مبلغ، مع رفض السحب لو أكبر من الرصيد.',
      'طباعة كشف بكل الحسابات وأرصدتها.',
      'رفض أي عملية على حساب مش موجود.'
    ] },
    { type: 'h', text: 'الكود كامل (اقراه بهدوء، كل سطر من درس خدته)' },
    { type: 'code', code: `import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    Bank bank = new Bank();
    bank.openAccount("أحمد", 500);
    bank.openAccount("منى", 1000);
    bank.depositTo("أحمد", 250);
    bank.withdrawFrom("منى", 300);
    bank.withdrawFrom("أحمد", 9999);
    bank.depositTo("حد مش موجود", 100);
    bank.report();
  }
}

class BankAccount {
  String owner;
  double balance;

  BankAccount(String owner, double balance) {
    this.owner = owner;
    this.balance = balance;
  }

  void deposit(double amount) {
    if (amount <= 0) {
      throw new IllegalArgumentException("مبلغ الإيداع لازم يكون أكبر من صفر");
    }
    this.balance += amount;
  }

  void withdraw(double amount) {
    if (amount > this.balance) {
      throw new IllegalArgumentException("الرصيد لا يكفي");
    }
    this.balance -= amount;
  }
}

class Bank {
  ArrayList<BankAccount> accounts = new ArrayList<BankAccount>();

  BankAccount find(String owner) {
    for (BankAccount acc : accounts) {
      if (acc.owner.equals(owner)) {
        return acc;
      }
    }
    return null;
  }

  void openAccount(String owner, double start) {
    accounts.add(new BankAccount(owner, start));
    System.out.println("اتفتح حساب لـ " + owner + " برصيد " + start);
  }

  void depositTo(String owner, double amount) {
    BankAccount acc = find(owner);
    if (acc == null) {
      System.out.println("مفيش حساب باسم " + owner);
      return;
    }
    acc.deposit(amount);
    System.out.println("إيداع ناجح، رصيد " + owner + ": " + acc.balance);
  }

  void withdrawFrom(String owner, double amount) {
    BankAccount acc = find(owner);
    if (acc == null) {
      System.out.println("مفيش حساب باسم " + owner);
      return;
    }
    try {
      acc.withdraw(amount);
      System.out.println("سحب ناجح، رصيد " + owner + ": " + acc.balance);
    } catch (IllegalArgumentException e) {
      System.out.println("فشل السحب: " + e.getMessage());
    }
  }

  void report() {
    System.out.println("=== كشف الحسابات ===");
    for (BankAccount acc : accounts) {
      System.out.println(acc.owner + ": " + acc.balance);
    }
  }
}
// الناتج:
// اتفتح حساب لـ أحمد برصيد 500.0
// اتفتح حساب لـ منى برصيد 1000.0
// إيداع ناجح، رصيد أحمد: 750.0
// سحب ناجح، رصيد منى: 700.0
// فشل السحب: الرصيد لا يكفي
// مفيش حساب باسم حد مش موجود
// === كشف الحسابات ===
// أحمد: 750.0
// منى: 700.0
` },
    { type: 'h', text: 'إزاي الكود ده بيفكر؟' },
    { type: 'list', items: [
      'BankAccount مسؤولة عن حساب واحد: بياناته (owner و balance) وسلوكه (deposit و withdraw)، والقواعد محمية بـ exceptions جوه الكلاس نفسه.',
      'Bank مسؤولة عن المجموعة كلها: عندها ArrayList<BankAccount> بتكبر مع كل حساب جديد، و method find بتدور بالاسم وترجع null لو مش موجود.',
      'الـ main بتمثل سيناريو استخدام: عمليات ناجحة، سحب مرفوض، واسم غلط، وكل حالة طلعت بالرسالة المناسبة.',
      'لاحظ إن withdrawFrom بتستخدم try/catch عشان تمسك رفض الـ withdraw وتحوله لرسالة لطيفة بدل crash.'
    ] },
    { type: 'h', text: 'شغل المشروع بنفسك' },
    { type: 'code', code: `$ java Bank.java
اتفتح حساب لـ أحمد برصيد 500.0
اتفتح حساب لـ منى برصيد 1000.0
إيداع ناجح، رصيد أحمد: 750.0
سحب ناجح، رصيد منى: 700.0
فشل السحب: الرصيد لا يكفي
مفيش حساب باسم حد مش موجود
=== كشف الحسابات ===
أحمد: 750.0
منى: 700.0` },
    { type: 'note', text: 'احفظ الكود في ملف اسمه Main.java. (أول كلاس فيه هو Main وفيه الـ main، فمع تشغيل الملف المفرد بـ `java Main.java` الاسم بيشتغل، وده كمان الاسم الأنسب لو هتترجمه بـ javac.) جرب تعدل السيناريو: ضيف حسابات، اعمل تحويل بين حسابين، واكسر النظام عمداً عشان تشوف الحماية شغالة.' },
    { type: 'h', text: 'تحديات تاخدك لبعد المشروع' },
    { type: 'list', items: [
      'ضيف رقم حساب تلقائي لكل حساب جديد (1001، 1002، ...) باستخدام static field في Bank.',
      'ضيف method transfer في Bank بتنقل مبلغ من حساب لحساب، بشرط الاتنين موجودين والرصيد يكفي.',
      'سجل كل العمليات في ArrayList<String> داخل كل حساب واطبع كشف حركات لكل عميل.',
      'خلي النظام تفاعلي بـ java.util.Scanner: اقرا أوامر من المستخدم في لوب لحد ما يكتب خروج.',
      'اربط الحسابات بـ HashMap<String, BankAccount> بدل البحث الخطي، وقارن الفرق.'
    ] },
    { type: 'p', text: 'لو قدرت تبني ده وتفهمه وتعدل فيه، انت رسمياً عندك أساس Java حقيقي: أنواع، شروط، لوبس، arrays، methods، OOP بكل أركانها، collections، وexceptions. الخطوة الجاية الطبيعية: Spring Boot لو ناوي backend، أو Android لو ناوي موبايل. بالتوفيق يا بطل، وافتكر إن المشروع ده من أسرة Infinity University Activity زي كل الأكاديميات.' }
  ],
  quiz: [
    { q: 'ليه method find بترجع null لما الحساب مش موجود؟', options: [
      { text: 'عشان اللي نادى عليها يفحص النتيجة ويتصرف برسالة مناسبة بدل crash' },
      { text: 'عشان توفر في الذاكرة' },
      { text: 'دي غلطة، كان لازم ترمي exception' }
    ], answer: 0, explain: 'null هنا إشارة "مفيش". depositTo و withdrawFrom بيفحصوها قبل الاستخدام. (في Java الحديثة فيه Optional لنفس الغرض، هتقابله بعدين.)' },
    { q: 'ليه كتبنا قاعدة "الرصيد لا يكفي" جوه BankAccount مش جوه Bank؟', options: [
      { text: 'لأن القاعدة متعلقة بالحساب نفسه: الكلاس بيحمي بياناته بنفسه أين استخدمت' },
      { text: 'لأن Bank مبتعرفش الأرقام' },
      { text: 'عشان نخلي الكود أطول' }
    ], answer: 0, explain: 'دي فلسفة الـ OOP: البيانات والقواعد اللي بتحميها في مكان واحد. أي كود هيستخدم BankAccount هيلاقي نفس الحماية جاهزة.' },
    { q: 'إيه ناتج السيناريو المصغر ده على نفس كود المشروع؟', code: `import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    BankAccount acc = new BankAccount("سامي", 200);
    acc.withdraw(120);
    try {
      acc.withdraw(100);
    } catch (IllegalArgumentException e) {
      System.out.println("فشل: " + e.getMessage());
    }
    System.out.println("الرصيد: " + acc.balance);
  }
}

class BankAccount {
  String owner;
  double balance;
  BankAccount(String owner, double balance) {
    this.owner = owner;
    this.balance = balance;
  }
  void withdraw(double amount) {
    if (amount > this.balance) {
      throw new IllegalArgumentException("الرصيد لا يكفي");
    }
    this.balance -= amount;
  }
}`, verifyOutput: true, options: [
      { text: 'فشل: الرصيد لا يكفي\nالرصيد: 80.0' },
      { text: 'الرصيد: -20.0' },
      { text: 'فشل: الرصيد لا يكفي\nالرصيد: 200.0' }
    ], answer: 0, explain: 'السحب الأول نجح (200-120=80)، التاني اترفض لأن 100 أكبر من 80، والرصيد فضل 80 زي ما هو.' }
  ],
  exercises: [
    { task: 'نفذ تحدي التحويل: ضيف method transfer(from, to, amount) في Bank بتنقل فلوس بين حسابين، وجرب سيناريو ناجح وسيناريو رصيد مش كافي', code: `void transfer(String from, String to, double amount) {
  BankAccount sender = find(from);
  BankAccount receiver = find(to);
  if (sender == null || receiver == null) {
    System.out.println("واحد من الحسابين مش موجود");
    return;
  }
  try {
    sender.withdraw(amount);
    receiver.deposit(amount);
    System.out.println("تحويل ناجح من " + from + " لـ " + to + ": " + amount);
  } catch (IllegalArgumentException e) {
    System.out.println("فشل التحويل: " + e.getMessage());
  }
}
// تجربة في main:
// bank.transfer("منى", "أحمد", 200);  // تحويل ناجح من منى لـ أحمد: 200.0
// bank.transfer("أحمد", "منى", 9999); // فشل التحويل: الرصيد لا يكفي`, why: 'لاحظ إننا أعدنا استخدام withdraw و deposit بقواعدهم الجاهزة بدل نعدل الأرصدة بإيدنا. لو السحب فشل، الإيداع مبيحصلش أصلاً لأن الـ exception وقفت الـ try.' },
    { task: 'بني نسختك الخاصة: نفس فكرة النظام بس لمكتبة: كلاس Book (عنوان وحالة استعارة) وكلاس Library فيها ArrayList وmethods للإعارة والرجوع والكشف. اكتبها من الصفر من غير ما تبص على حل', code: `# الفكرة العامة (نفذ التفاصيل بنفسك):
# class Book { String title; boolean borrowed; ... }
# class Library {
#   ArrayList<Book> books
#   find(title), addBook(title),
#   borrow(title): ترفض لو الكتاب مستعار أو مش موجود
#   giveBack(title), report()
# }
# وجرب سيناريو: ضيف 3 كتب، استعار واحد، حاول تستعاره تاني (رفض)، رجعه، واطبع الكشف`, why: 'إعادة بناء نفس النمط في مجال مختلف هي اللي بتحول الشرح لمهارة. لو وقفت في حتة، ارجع لكود البنك وشوف بنيته مش سطوره.' }
  ]
}
);
