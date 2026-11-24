/* معمل Java — mini-interpreter core (client-side, no server).
   Supports a teaching subset: int/double/boolean/char/String, arrays,
   ArrayList/HashMap, methods, classes/objects, inheritance, try/catch,
   loops and conditions. Exposed as window.JAVA_CORE.run(source) ->
   { ok, output, error } where error is { line, message }. */
(function () {
  'use strict';

  function JavaException(javaType, message) {
    this.javaType = javaType;
    this.message = message || '';
    this.isJavaException = true;
  }
  function rt(type, msg) { throw new JavaException(type, msg); }
  function err(msg) { throw new Error(msg); }

  /* ============ Lexer ============ */
  var KEYWORDS = ['class','interface','extends','implements','public','private','protected','static','final','void','int','double','boolean','char','String','long','float','var','new','return','if','else','for','while','do','break','continue','try','catch','finally','throw','this','super','import','true','false','null','switch','case','default','instanceof','package','abstract','@Override'];
  var OPS = ['@Override','@','>>=','<<=','++','--','+=','-=','*=','/=','%=','==','!=','<=','>=','&&','||','<<','>>','->','=','<','>','+','-','*','/','%','!','?',';',':',',','.','(',')','{','}','[',']','&','|'];

  function lex(src) {
    var toks = [], i = 0, line = 1, n = src.length;
    function isIdStart(c) { return /[A-Za-z_$؀-ۿ]/.test(c); }
    function isId(c) { return /[A-Za-z0-9_$؀-ۿ]/.test(c); }
    while (i < n) {
      var c = src[i];
      if (c === '\n') { line++; i++; continue; }
      if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
      if (src.startsWith('//', i)) { while (i < n && src[i] !== '\n') i++; continue; }
      if (src.startsWith('/*', i)) { var j = src.indexOf('*/', i + 2); if (j === -1) err('تعليق مش متقفل'); line += src.slice(i, j).split('\n').length - 1; i = j + 2; continue; }
      if (c === '"') {
        var s = '', start = line;
        i++;
        while (i < n && src[i] !== '"') {
          if (src[i] === '\\') {
            var e = src[i + 1];
            s += e === 'n' ? '\n' : e === 't' ? '\t' : e === 'r' ? '\r' : e === '\\' ? '\\' : e === '"' ? '"' : e === "'" ? "'" : e;
            i += 2;
          } else { if (src[i] === '\n') line++; s += src[i]; i++; }
        }
        if (i >= n) err('string مش متقفل في سطر ' + start);
        i++;
        toks.push({ t: 'str', v: s, line: start });
        continue;
      }
      if (c === "'") {
        var ch, ci = i + 1;
        if (src[ci] === '\\') {
          var e2 = src[ci + 1];
          ch = e2 === 'n' ? '\n' : e2 === 't' ? '\t' : e2 === '0' ? '' : e2 === '\\' ? '\\' : e2 === "'" ? "'" : e2 === '"' ? '"' : e2;
          ci += 2;
        } else { ch = src[ci]; ci++; }
        if (src[ci] !== "'") err('char لازم يكون حرف واحد في سطر ' + line);
        toks.push({ t: 'char', v: ch, line: line });
        i = ci + 1;
        continue;
      }
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
        var num = '', isDouble = false, k = i;
        while (k < n && /[0-9._]/.test(src[k])) { if (src[k] === '.') isDouble = true; num += src[k]; k++; }
        if (/[eE]/.test(src[k] || '')) { isDouble = true; num += src[k]; k++; if (/[+-]/.test(src[k] || '')) { num += src[k]; k++; } while (k < n && /[0-9]/.test(src[k])) { num += src[k]; k++; } }
        if (/[lLfFdD]/.test(src[k] || '')) { if (/[fFdD]/.test(src[k])) isDouble = true; k++; }
        num = num.replace(/_/g, '');
        toks.push({ t: 'num', v: parseFloat(num), isDouble: isDouble, line: line });
        i = k;
        continue;
      }
      if (isIdStart(c)) {
        var id = '';
        while (i < n && isId(src[i])) { id += src[i]; i++; }
        toks.push({ t: KEYWORDS.indexOf(id) !== -1 ? 'kw' : 'ident', v: id, line: line });
        continue;
      }
      var matched = null;
      for (var o = 0; o < OPS.length; o++) { if (src.startsWith(OPS[o], i)) { matched = OPS[o]; break; } }
      if (matched) { toks.push({ t: 'op', v: matched, line: line }); i += matched.length; continue; }
      err('رمز مش مفهوم: ' + c + ' في سطر ' + line);
    }
    toks.push({ t: 'eof', v: '', line: line });
    return toks;
  }

  /* ============ Parser ============ */
  function Parser(toks) { this.toks = toks; this.i = 0; }
  Parser.prototype.peek = function (o) { return this.toks[this.i + (o || 0)]; };
  Parser.prototype.next = function () { return this.toks[this.i++]; };
  Parser.prototype.at = function (v) { return this.peek().v === v; };
  Parser.prototype.atType = function (t) { return this.peek().t === t; };
  Parser.prototype.expect = function (v) { var t = this.next(); if (t.v !== v) err('متوقع ' + v + ' لكن لقيت "' + t.v + '" في سطر ' + t.line); return t; };
  Parser.prototype.accept = function (v) { if (this.at(v)) { this.i++; return true; } return false; };

  Parser.prototype.parseType = function (noArr) {
    var t = this.next();
    if (t.t !== 'kw' && t.t !== 'ident') err('متوقع نوع في سطر ' + t.line);
    var name = t.v;
    if (this.at('<')) { var depth = 0; do { var x = this.next(); if (x.v === '<') depth++; else if (x.v === '>') depth--; } while (depth > 0 && this.peek().t !== 'eof'); name += '<>'; }
    if (!noArr) while (this.accept('[')) { this.expect(']'); name += '[]'; }
    return name;
  };
  Parser.prototype.parseModifiers = function () {
    while (['public','private','protected','static','final','abstract','@Override','@'].indexOf(this.peek().v) !== -1) {
      this.next();
      if (this.peek().t === 'ident') this.next();
    }
  };

  Parser.prototype.parseProgram = function () {
    var prog = { kind: 'program', items: [] };
    while (this.peek().t !== 'eof') {
      if (this.accept('package')) { while (!this.at(';') && this.peek().t !== 'eof') this.next(); this.expect(';'); continue; }
      if (this.accept('import')) { while (!this.at(';') && this.peek().t !== 'eof') this.next(); this.expect(';'); continue; }
      prog.items.push(this.parseTopLevel());
    }
    return prog;
  };

  Parser.prototype.parseTopLevel = function () {
    this.parseModifiers();
    if (this.at('class') || this.at('interface')) return this.parseClass();
    // method or field or statement at top level (lab synthetic class)
    var save = this.i;
    try {
      var type = this.parseType();
      if (this.atType('ident') || this.atType('kw')) {
        var nameT = this.next();
        if (this.at('(')) { var m = this.parseMethodRest(type, nameT.v); return m; }
        if (this.at('=') || this.at(';') || this.at(',')) { this.i = save; return this.parseStatement(); }
      }
      this.i = save;
    } catch (e) { this.i = save; }
    return this.parseStatement();
  };

  Parser.prototype.parseClass = function () {
    var isInterface = this.accept('interface');
    if (!isInterface) this.expect('class');
    var name = this.expect(this.peek().v).v;
    var superName = null;
    if (this.accept('extends')) superName = this.next().v;
    if (this.accept('implements')) { do { this.next(); } while (this.accept(',')); }
    this.expect('{');
    var cls = { kind: 'class', name: name, superName: superName, fields: [], methods: [], ctors: [], isInterface: isInterface };
    while (!this.at('}') && this.peek().t !== 'eof') {
      this.parseModifiers();
      var save = this.i;
      var t1 = this.next();
      if (t1.v === name && this.at('(')) { // constructor
        this.expect('(');
        var params = this.parseParams();
        var body = this.parseBlock();
        cls.ctors.push({ params: params, body: body });
        continue;
      }
      this.i = save;
      var type = this.parseType();
      var nameT = this.next();
      if (this.at('(')) {
        var m = this.parseMethodRest(type, nameT.v);
        cls.methods.push(m);
      } else {
        var init = null;
        if (this.accept('=')) init = this.parseExpr();
        this.expect(';');
        cls.fields.push({ name: nameT.v, type: type, init: init });
      }
    }
    this.expect('}');
    return cls;
  };

  Parser.prototype.parseMethodRest = function (retType, name) {
    this.expect('(');
    var params = this.parseParams();
    var body = this.at('{') ? this.parseBlock() : (this.expect(';'), null);
    return { kind: 'method', name: name, retType: retType, params: params, body: body };
  };

  Parser.prototype.parseParams = function () {
    var params = [];
    if (this.at(')')) { this.next(); return params; }
    do {
      this.parseModifiers();
      var type = this.parseType();
      var nameT = this.next();
      params.push({ type: type, name: nameT.v });
    } while (this.accept(','));
    this.expect(')');
    return params;
  };

  Parser.prototype.parseBlock = function () {
    this.expect('{');
    var stmts = [];
    while (!this.at('}') && this.peek().t !== 'eof') stmts.push(this.parseStatement());
    this.expect('}');
    return { kind: 'block', stmts: stmts };
  };

  var PRIMITIVES = ['int','double','boolean','char','String','long','float','var'];

  Parser.prototype.parseStatement = function () {
    var t = this.peek();
    if (this.at('{')) return this.parseBlock();
    if (this.accept('if')) {
      this.expect('('); var cond = this.parseExpr(); this.expect(')');
      var then = this.parseStatement();
      var els = this.accept('else') ? this.parseStatement() : null;
      return { kind: 'if', cond: cond, then: then, els: els };
    }
    if (this.accept('while')) {
      this.expect('('); var wc = this.parseExpr(); this.expect(')');
      return { kind: 'while', cond: wc, body: this.parseStatement() };
    }
    if (this.accept('do')) {
      var db = this.parseStatement();
      this.expect('while'); this.expect('('); var dc = this.parseExpr(); this.expect(')'); this.accept(';');
      return { kind: 'dowhile', cond: dc, body: db };
    }
    if (this.accept('for')) {
      this.expect('(');
      // enhanced for?  type IDENT ':' expr
      var save = this.i;
      try {
        var ft = this.parseType();
        if (this.atType('ident')) {
          var fn = this.next().v;
          if (this.accept(':')) {
            var src = this.parseExpr();
            this.expect(')');
            return { kind: 'foreach', type: ft, name: fn, src: src, body: this.parseStatement() };
          }
        }
      } catch (e) { /* fall through */ }
      this.i = save;
      var init = null;
      if (!this.at(';')) {
        var save2 = this.i;
        try {
          var ty = this.parseType();
          if (this.atType('ident')) { init = this.parseVarDeclRest(ty); }
          else { this.i = save2; init = { kind: 'exprstmt', expr: this.parseExpr() }; }
        } catch (e) { this.i = save2; init = { kind: 'exprstmt', expr: this.parseExpr() }; }
      }
      this.expect(';');
      var cond = this.at(';') ? null : this.parseExpr();
      this.expect(';');
      var update = this.at(')') ? null : this.parseExprList();
      this.expect(')');
      return { kind: 'for', init: init, cond: cond, update: update, body: this.parseStatement() };
    }
    if (this.accept('try')) {
      var tb = this.parseBlock();
      var catches = [];
      while (this.accept('catch')) {
        this.expect('(');
        var ct = this.parseType();
        var cn = this.next().v;
        this.expect(')');
        catches.push({ type: ct, name: cn, body: this.parseBlock() });
      }
      var fin = null;
      if (this.accept('finally')) fin = this.parseBlock();
      return { kind: 'try', block: tb, catches: catches, fin: fin };
    }
    if (this.accept('throw')) {
      var te = this.parseExpr(); this.expect(';');
      return { kind: 'throw', expr: te };
    }
    if (this.accept('return')) {
      var rv = this.at(';') ? null : this.parseExpr();
      this.expect(';');
      return { kind: 'return', value: rv };
    }
    if (this.accept('break')) { this.expect(';'); return { kind: 'break' }; }
    if (this.accept('continue')) { this.expect(';'); return { kind: 'continue' }; }
    if (this.accept('switch')) return this.parseSwitch();
    // variable declaration or expression statement
    var save3 = this.i;
    try {
      var type2 = this.parseType();
      if ((this.atType('ident') || this.peek().t === 'kw') && this.peek().v !== 'new') {
        var decl = this.parseVarDeclRest(type2);
        this.expect(';');
        return decl;
      }
      this.i = save3;
    } catch (e) { this.i = save3; }
    var ex = this.parseExpr();
    this.expect(';');
    return { kind: 'exprstmt', expr: ex };
  };

  Parser.prototype.parseSwitch = function () {
    this.expect('('); var disc = this.parseExpr(); this.expect(')'); this.expect('{');
    var cases = [], def = null;
    while (!this.at('}') && this.peek().t !== 'eof') {
      if (this.accept('case')) {
        var v = this.parseExpr(); this.expect(':');
        var stmts = [];
        while (!this.at('case') && !this.at('default') && !this.at('}') && this.peek().t !== 'eof') stmts.push(this.parseStatement());
        cases.push({ value: v, stmts: stmts });
      } else if (this.accept('default')) {
        this.expect(':');
        var ds = [];
        while (!this.at('case') && !this.at('}') && this.peek().t !== 'eof') ds.push(this.parseStatement());
        def = ds;
      } else this.next();
    }
    this.expect('}');
    return { kind: 'switch', disc: disc, cases: cases, def: def };
  };

  Parser.prototype.parseVarDeclRest = function (type) {
    var decls = [];
    do {
      var nameT = this.next();
      var init = null;
      if (this.accept('=')) init = this.parseExprOrInit(type);
      decls.push({ name: nameT.v, init: init });
    } while (this.accept(','));
    return { kind: 'vardecl', type: type, decls: decls };
  };

  Parser.prototype.parseExprOrInit = function (type) {
    if (this.at('{')) { // array initializer
      this.expect('{');
      var items = [];
      if (!this.at('}')) do { items.push(this.parseExpr()); } while (this.accept(','));
      this.expect('}');
      return { kind: 'arrayinit', items: items, elemType: type.replace('[]', '') };
    }
    return this.parseExpr();
  };

  Parser.prototype.parseExprList = function () {
    var list = [this.parseExpr()];
    while (this.accept(',')) list.push(this.parseExpr());
    return list;
  };

  Parser.prototype.parseExpr = function () { return this.parseAssign(); };

  Parser.prototype.parseAssign = function () {
    var left = this.parseTernary();
    if (['=','+=','-=','*=','/=','%='].indexOf(this.peek().v) !== -1) {
      var op = this.next().v;
      var right = this.parseAssign();
      return { kind: 'assign', op: op, left: left, right: right };
    }
    return left;
  };

  Parser.prototype.parseTernary = function () {
    var c = this.parseOr();
    if (this.accept('?')) {
      var a = this.parseExpr();
      this.expect(':');
      var b = this.parseAssign();
      return { kind: 'ternary', cond: c, a: a, b: b };
    }
    return c;
  };

  function binParser(ops, sub) {
    return function () {
      var left = this[sub]();
      while (ops.indexOf(this.peek().v) !== -1 && (this.peek().t === 'op' || this.peek().t === 'kw')) {
        var op = this.next().v;
        left = { kind: 'bin', op: op, left: left, right: this[sub]() };
      }
      return left;
    };
  }
  Parser.prototype.parseOr = binParser(['||'], 'parseAnd');
  Parser.prototype.parseAnd = binParser(['&&'], 'parseEq');
  Parser.prototype.parseEq = binParser(['==','!='], 'parseRel');
  Parser.prototype.parseRel = binParser(['<','<=','>','>='], 'parseAdd');
  Parser.prototype.parseAdd = binParser(['+','-'], 'parseMul');
  Parser.prototype.parseMul = binParser(['*','/','%'], 'parseUnary');

  Parser.prototype.parseUnary = function () {
    var v = this.peek().v;
    if (v === '!' || v === '-') { this.next(); return { kind: 'unary', op: v, expr: this.parseUnary() }; }
    if (v === '++' || v === '--') { this.next(); return { kind: 'pre', op: v, expr: this.parseUnary() }; }
    if (v === '(' && this.looksLikeCast()) {
      this.expect('(');
      var type = this.parseType();
      this.expect(')');
      return { kind: 'cast', type: type, expr: this.parseUnary() };
    }
    if (v === 'new') return this.parseNew();
    return this.parsePostfix();
  };

  Parser.prototype.looksLikeCast = function () {
    // '(' Type ')' where Type is primitive/String or Capitalized ident
    var t1 = this.toks[this.i + 1], t2 = this.toks[this.i + 2];
    if (!t1 || !t2) return false;
    if (t2.v !== ')') return false;
    if (PRIMITIVES.indexOf(t1.v) !== -1) return true;
    if (t1.t === 'ident' && /^[A-Z]/.test(t1.v)) return true;
    return false;
  };

  Parser.prototype.parseNew = function () {
    this.expect('new');
    var type = this.parseType(true);
    if (this.at('(')) {
      this.expect('(');
      var args = this.at(')') ? [] : this.parseExprList();
      this.expect(')');
      return { kind: 'newobj', type: type, args: args };
    }
    if (this.at('[')) {
      this.expect('[');
      var size = this.parseExpr();
      this.expect(']');
      return { kind: 'newarr', type: type, size: size };
    }
    err('تعبير new مش مفهوم');
  };

  Parser.prototype.parsePostfix = function () {
    var e = this.parsePrimary();
    for (;;) {
      if (this.accept('.')) {
        var nameT = this.next();
        if (this.at('(')) {
          this.expect('(');
          var args = this.at(')') ? [] : this.parseExprList();
          this.expect(')');
          e = { kind: 'call', obj: e, name: nameT.v, args: args };
        } else {
          e = { kind: 'field', obj: e, name: nameT.v };
        }
        continue;
      }
      if (this.at('(')) { // direct call: name(...)
        this.expect('(');
        var args2 = this.at(')') ? [] : this.parseExprList();
        this.expect(')');
        e = { kind: 'call', obj: null, name: e.kind === 'super' ? 'super' : (e.v !== undefined ? e.v : ''), args: args2 };
        continue;
      }
      if (this.accept('[')) {
        var idx = this.parseExpr();
        this.expect(']');
        e = { kind: 'index', obj: e, index: idx };
        continue;
      }
      if (this.at('++') || this.at('--')) {
        e = { kind: 'post', op: this.next().v, expr: e };
        continue;
      }
      break;
    }
    return e;
  };

  Parser.prototype.parsePrimary = function () {
    var t = this.next();
    if (t.t === 'num') return { kind: 'num', v: t.v, isDouble: t.isDouble };
    if (t.t === 'str') return { kind: 'str', v: t.v };
    if (t.t === 'char') return { kind: 'charlit', v: t.v };
    if (t.v === 'true' || t.v === 'false') return { kind: 'bool', v: t.v === 'true' };
    if (t.v === 'null') return { kind: 'null' };
    if (t.v === '(') { var e = this.parseExpr(); this.expect(')'); return e; }
    if (t.v === 'this') return { kind: 'this' };
    if (t.v === 'super') return { kind: 'super' };
    if (t.t === 'ident' || t.t === 'kw') return { kind: 'var', v: t.v };
    err('تعبير مش متوقع "' + t.v + '" في سطر ' + t.line);
  };

  window.JAVA_CORE_LEX = lex;
  window.JAVA_CORE_PARSER = Parser;
  window.__JAVA_EX = { JavaException: JavaException, rt: rt, err: err };
})();

/* ============ Interpreter ============ */
(function () {
  'use strict';
  var JavaException = window.__JAVA_EX.JavaException;
  var rt = window.__JAVA_EX.rt;
  var err = window.__JAVA_EX.err;

  var INT_TYPES = ['int', 'long'];
  var DBL_TYPES = ['double', 'float'];
  function isIntT(t) { return INT_TYPES.indexOf(t) !== -1; }
  function isDblT(t) { return DBL_TYPES.indexOf(t) !== -1; }
  function isNumT(t) { return isIntT(t) || isDblT(t) || t === 'char'; }
  function cell(t, v) { return { t: t, v: v }; }
  function intC(v) { return cell('int', Math.trunc(v)); }
  function dblC(v) { return cell('double', v); }
  function boolC(v) { return cell('boolean', !!v); }
  function strC(v) { return cell('String', String(v)); }
  function nullC() { return cell('null', null); }

  function javaStr(c) {
    if (!c || c.t === 'null' || c.v === null || c.v === undefined) return 'null';
    switch (c.t) {
      case 'boolean': return c.v ? 'true' : 'false';
      case 'int': case 'long': return String(Math.trunc(c.v));
      case 'double': case 'float': {
        var v = c.v;
        if (Number.isNaN(v)) return 'NaN';
        if (v === Infinity) return 'Infinity';
        if (v === -Infinity) return '-Infinity';
        if (Number.isInteger(v) && Math.abs(v) < 1e15) return v.toFixed(1);
        return String(v);
      }
      case 'char': return c.v;
      case 'String': return c.v;
      case 'array': return '[@1a2b3c4d';
      case 'list': {
        var parts = c.v.items.map(javaStr);
        return '[' + parts.join(', ') + ']';
      }
      case 'map': {
        var ps = [];
        for (var i = 0; i < c.v.keys.length; i++) ps.push(javaStr(c.v.keys[i]) + '=' + javaStr(c.v.vals[i]));
        return '{' + ps.join(', ') + '}';
      }
      case 'object': return (c.v.cls ? c.v.cls.name : 'Object') + '@1a2b3c4d';
      case 'exception': return 'java.lang.' + c.v.javaType + ': ' + c.v.message;
      default: return String(c.v);
    }
  }

  function defaultCell(type) {
    var t = type.replace(/<.*>/, '');
    if (isIntT(t)) return intC(0);
    if (isDblT(t)) return dblC(0);
    if (t === 'boolean') return boolC(false);
    if (t === 'char') return cell('char', '');
    if (t === 'String') return nullC();
    if (t.endsWith('[]')) return nullC();
    return nullC();
  }

  function Env(parent) { this.vars = Object.create(null); this.parent = parent || null; }
  Env.prototype.get = function (name) {
    var e = this;
    while (e) { if (e.vars[name] !== undefined) return e.vars[name]; e = e.parent; }
    return undefined;
  };
  Env.prototype.declare = function (name, c) { this.vars[name] = c; return c; };

  function Interp(program) {
    this.program = program;
    this.classes = Object.create(null);
    this.statics = Object.create(null); // synthetic top-level methods
    this.global = new Env(null);
    this.out = [];
    this.iterations = 0;
    this.callDepth = 0;
    this.installBuiltins();
  }

  Interp.prototype.installBuiltins = function () {
    this.global.declare('System', cell('system', { sys: true }));
    this.global.declare('Math', cell('mathclass', {}));
    this.global.declare('Integer', cell('intclass', {}));
    this.global.declare('Double', cell('dblclass', {}));
    this.global.declare('String', cell('strclass', {}));
  };

  Interp.prototype.run = function () {
    var items = this.program.items;
    var i, topStmts = [];
    for (i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.kind === 'class') this.classes[it.name] = it;
      else if (it.kind === 'method') {
          var key = it.name + '/' + it.params.length;
          (this.statics[key] = this.statics[key] || []).push(it);
        }
      else topStmts.push(it);
    }
    // find a class with main
    for (var cn in this.classes) {
      var cls = this.classes[cn];
      for (i = 0; i < cls.methods.length; i++) {
        if (cls.methods[i].name === 'main') {
          this.invokeMethod(null, cls, cls.methods[i], [], null);
          return this.out.join('');
        }
      }
    }
    var frame = new Env(this.global);
    this.execBlock({ kind: 'block', stmts: topStmts }, frame, null, null);
    return this.out.join('');
  };

  Interp.prototype.findMethod = function (cls, name, argc) {
    var c = cls;
    while (c) {
      for (var i = 0; i < c.methods.length; i++) {
        if (c.methods[i].name === name && c.methods[i].params.length === argc) return { cls: c, m: c.methods[i] };
      }
      c = c.superName ? this.classes[c.superName] : null;
    }
    return null;
  };

  Interp.prototype.invokeMethod = function (obj, cls, m, args, callerCtx) {
    if (++this.callDepth > 300) rt('StackOverflowError', 'استدعاءات متداخلة كتير (recursion بلا نهاية؟)');
    var env = new Env(this.global);
    for (var i = 0; i < m.params.length; i++) env.declare(m.params[i].name, this.coerceDecl(m.params[i].type, args[i] || nullC()));
    var thisObj = obj || (callerCtx ? callerCtx.thisObj : null);
    if (thisObj) env.declare('this', thisObj);
    var r = this.execBlock(m.body || { kind: 'block', stmts: [] }, env, thisObj, cls);
    this.callDepth--;
    if (r && r.sig === 'return') return r.value || cell('void', null);
    return cell('void', null);
  };

  Interp.prototype.execBlock = function (block, env, thisObj, cls) {
    for (var i = 0; i < block.stmts.length; i++) {
      var r = this.execStmt(block.stmts[i], env, thisObj, cls);
      if (r) return r;
    }
    return undefined;
  };

  Interp.prototype.guard = function () {
    if (++this.iterations > 400000) rt('RuntimeException', 'اللوب شغالة من غير نهاية: اتجاوز الحد الأقصى للدورات');
  };

  Interp.prototype.execStmt = function (s, env, thisObj, cls) {
    switch (s.kind) {
      case 'block': return this.execBlock(s, new Env(env), thisObj, cls);
      case 'vardecl': {
        for (var i = 0; i < s.decls.length; i++) {
          var d = s.decls[i];
          var c = d.init ? this.evalExpr(d.init, env, thisObj, cls) : defaultCell(s.type);
          if (s.type.endsWith('[]') && d.init && d.init.kind === 'arrayinit') c = c;
          c = this.coerceDecl(s.type, c);
          env.declare(d.name, c);
        }
        return undefined;
      }
      case 'exprstmt': this.evalExpr(s.expr, env, thisObj, cls); return undefined;
      case 'if': return this.truthy(this.evalExpr(s.cond, env, thisObj, cls)) ? this.execStmt(s.then, env, thisObj, cls) : (s.els ? this.execStmt(s.els, env, thisObj, cls) : undefined);
      case 'while': {
        var r;
        while (this.truthy(this.evalExpr(s.cond, env, thisObj, cls))) {
          this.guard();
          r = this.execStmt(s.body, env, thisObj, cls);
          if (r) { if (r.sig === 'break') break; if (r.sig === 'continue') continue; return r; }
        }
        return undefined;
      }
      case 'dowhile': {
        var r2;
        do {
          this.guard();
          r2 = this.execStmt(s.body, env, thisObj, cls);
          if (r2) { if (r2.sig === 'break') return undefined; if (r2.sig !== 'continue') return r2; }
        } while (this.truthy(this.evalExpr(s.cond, env, thisObj, cls)));
        return undefined;
      }
      case 'for': {
        var fenv = new Env(env);
        if (s.init) this.execStmt(s.init, fenv, thisObj, cls);
        var r3;
        while (s.cond === null || this.truthy(this.evalExpr(s.cond, fenv, thisObj, cls))) {
          this.guard();
          r3 = this.execStmt(s.body, fenv, thisObj, cls);
          if (r3) { if (r3.sig === 'break') break; if (r3.sig !== 'continue') return r3; }
          if (s.update) for (var u = 0; u < s.update.length; u++) this.evalExpr(s.update[u], fenv, thisObj, cls);
        }
        return undefined;
      }
      case 'foreach': {
        var src = this.evalExpr(s.src, env, thisObj, cls);
        var items = null;
        if (src.t === 'array') items = src.v.items;
        else if (src.t === 'list') items = src.v.items;
        else rt('RuntimeException', 'enhanced for محتاجة array أو ArrayList');
        var fe = new Env(env);
        fe.declare(s.name, items[0] || defaultCell(s.type));
        for (var k = 0; k < items.length; k++) {
          this.guard();
          fe.vars[s.name] = items[k];
          var r4 = this.execStmt(s.body, fe, thisObj, cls);
          if (r4) { if (r4.sig === 'break') break; if (r4.sig !== 'continue') return r4; }
        }
        return undefined;
      }
      case 'try': {
        var res;
        try {
          res = this.execBlock(s.block, new Env(env), thisObj, cls);
        } catch (ex) {
          var isJ = ex && ex.isJavaException;
          var matched = null;
          if (isJ) {
            for (var ci = 0; ci < s.catches.length; ci++) {
              if (this.catchMatches(s.catches[ci].type, ex.javaType)) { matched = s.catches[ci]; break; }
            }
          }
          if (matched) {
            var cenv = new Env(env);
            cenv.declare(matched.name, cell('exception', { javaType: ex.javaType, message: ex.message }));
            res = this.execBlock(matched.body, cenv, thisObj, cls);
          } else {
            if (s.fin) this.execBlock(s.fin, new Env(env), thisObj, cls);
            throw ex;
          }
        }
        if (s.fin) this.execBlock(s.fin, new Env(env), thisObj, cls);
        return res;
      }
      case 'throw': {
        var exv = this.evalExpr(s.expr, env, thisObj, cls);
        if (exv.t === 'exception') rt(exv.v.javaType, exv.v.message);
        rt('RuntimeException', javaStr(exv));
      }
      case 'return': return { sig: 'return', value: s.value ? this.evalExpr(s.value, env, thisObj, cls) : cell('void', null) };
      case 'break': return { sig: 'break' };
      case 'continue': return { sig: 'continue' };
      case 'switch': {
        var dv = this.evalExpr(s.disc, env, thisObj, cls);
        var start = -1;
        for (var sc = 0; sc < s.cases.length; sc++) {
          if (this.javaEquals(dv, this.evalExpr(s.cases[sc].value, env, thisObj, cls))) { start = sc; break; }
        }
        var swEnv = new Env(env);
        var flow;
        if (start !== -1) {
          for (var si = start; si < s.cases.length; si++) {
            flow = this.execBlock({ kind: 'block', stmts: s.cases[si].stmts }, swEnv, thisObj, cls);
            if (flow) { if (flow.sig === 'break') return undefined; return flow; }
          }
        } else if (s.def) {
          flow = this.execBlock({ kind: 'block', stmts: s.def }, swEnv, thisObj, cls);
          if (flow) { if (flow.sig === 'break') return undefined; return flow; }
        }
        return undefined;
      }
    }
    err('جملة غير مدعومة في المعمل: ' + s.kind);
  };

  Interp.prototype.catchMatches = function (catchType, exType) {
    catchType = catchType.replace(/<.*>/, '');
    if (catchType === exType) return true;
    if (['Exception', 'RuntimeException', 'Throwable'].indexOf(catchType) !== -1) return true;
    if (catchType === 'IndexOutOfBoundsException' && exType === 'ArrayIndexOutOfBoundsException') return true;
    return false;
  };

  Interp.prototype.coerceDecl = function (type, c) {
    var t = type.replace(/<.*>/, '');
    if (t === 'var') return c;
    if (isIntT(t) && isNumT(c.t)) return cell(t, Math.trunc(c.v));
    if (isDblT(t) && isNumT(c.t)) return cell(t, c.v);
    return c;
  };

  Interp.prototype.truthy = function (c) {
    if (c.t === 'boolean') return c.v;
    rt('RuntimeException', 'الشرط لازم يكون boolean');
  };

  Interp.prototype.javaEquals = function (a, b) {
    if (isNumT(a.t) && isNumT(b.t)) return a.v === b.v;
    if (a.t === 'String' && b.t === 'String') return a.v === b.v;
    if (a.t === 'boolean' && b.t === 'boolean') return a.v === b.v;
    if (a.t === 'null' || b.t === 'null') return a.t === 'null' && b.t === 'null';
    return a.v === b.v;
  };

  Interp.prototype.evalExpr = function (e, env, thisObj, cls) {
    switch (e.kind) {
      case 'num': return e.isDouble ? dblC(e.v) : intC(e.v);
      case 'str': return strC(e.v);
      case 'charlit': return cell('char', e.v);
      case 'bool': return boolC(e.v);
      case 'null': return nullC();
      case 'this': {
        var t = env.get('this');
        if (!t) rt('RuntimeException', 'this مش متاحة هنا');
        return t;
      }
      case 'var': {
        var c = env.get(e.v);
        if (!c) {
          var th = env.get('this');
          if (th && th.t === 'object' && th.v.fields[e.v]) return th.v.fields[e.v];
          rt('RuntimeException', 'متغير مش معروف: ' + e.v);
        }
        return c;
      }
      case 'ternary': return this.truthy(this.evalExpr(e.cond, env, thisObj, cls)) ? this.evalExpr(e.a, env, thisObj, cls) : this.evalExpr(e.b, env, thisObj, cls);
      case 'unary': {
        var v = this.evalExpr(e.expr, env, thisObj, cls);
        if (e.op === '!') return boolC(!this.truthy(v));
        if (!isNumT(v.t)) rt('RuntimeException', 'السالب بيشتغل على أرقام بس');
        return isDblT(v.t) ? dblC(-v.v) : intC(-v.v);
      }
      case 'pre': case 'post': {
        var cur = this.evalExpr(e.expr, env, thisObj, cls);
        if (!isNumT(cur.t)) rt('RuntimeException', '++/-- بيشتغلوا على أرقام بس');
        var delta = e.op === '++' ? 1 : -1;
        var nv = isDblT(cur.t) ? dblC(cur.v + delta) : cell(cur.t, cur.v + delta);
        if (cur.t === 'char') nv = cell('char', String.fromCharCode(cur.v.charCodeAt(0) + delta));
        var old = cell(cur.t, cur.v);
        this.assignTo(e.expr, nv, env, thisObj, cls);
        return e.kind === 'pre' ? nv : old;
      }
      case 'cast': {
        var cv = this.evalExpr(e.expr, env, thisObj, cls);
        var tt = e.type.replace(/<.*>/, '');
        if (isIntT(tt)) { if (cv.t === 'char') return cell(tt, cv.v.charCodeAt(0)); if (isNumT(cv.t)) return cell(tt, Math.trunc(cv.v)); }
        if (isDblT(tt)) { if (cv.t === 'char') return dblC(cv.v.charCodeAt(0)); if (isNumT(cv.t)) return dblC(cv.v); }
        if (tt === 'char' && isNumT(cv.t)) return cell('char', String.fromCharCode(Math.trunc(cv.v)));
        if (tt === 'String') return strC(javaStr(cv));
        return cv;
      }
      case 'bin': return this.evalBin(e, env, thisObj, cls);
      case 'assign': return this.evalAssign(e, env, thisObj, cls);
      case 'arrayinit': {
        var items = e.items.map(function (x) { return this.evalExpr(x, env, thisObj, cls); }, this);
        return cell('array', { elem: e.elemType, items: items });
      }
      case 'newarr': {
        var sz = this.evalExpr(e.size, env, thisObj, cls);
        var arr = { elem: e.type, items: [] };
        for (var ai = 0; ai < sz.v; ai++) arr.items.push(defaultCell(e.type));
        return cell('array', arr);
      }
      case 'newobj': return this.evalNew(e, env, thisObj, cls);
      case 'field': return this.evalField(e, env, thisObj, cls);
      case 'index': {
        var ov = this.evalExpr(e.obj, env, thisObj, cls);
        var iv = this.evalExpr(e.index, env, thisObj, cls);
        if (ov.t === 'null') rt('NullPointerException', 'محاولة قراءة خانة من null');
        if (ov.t === 'array') {
          if (iv.v < 0 || iv.v >= ov.v.items.length) rt('ArrayIndexOutOfBoundsException', 'Index ' + Math.trunc(iv.v) + ' out of bounds for length ' + ov.v.items.length);
          return ov.v.items[Math.trunc(iv.v)];
        }
        if (ov.t === 'list') {
          if (iv.v < 0 || iv.v >= ov.v.items.length) rt('IndexOutOfBoundsException', 'Index: ' + Math.trunc(iv.v) + ', Size: ' + ov.v.items.length);
          return ov.v.items[Math.trunc(iv.v)];
        }
        rt('RuntimeException', 'الأقواس المربعة بتشتغل على arrays و ArrayList بس');
      }
      case 'call': return this.evalCall(e, env, thisObj, cls);
      case 'super': return cell('super', { thisObj: thisObj });
    }
    err('تعبير غير مدعوم في المعمل: ' + e.kind);
  };

  Interp.prototype.evalBin = function (e, env, thisObj, cls) {
    if (e.op === '&&') {
      var l1 = this.evalExpr(e.left, env, thisObj, cls);
      if (!this.truthy(l1)) return boolC(false);
      return boolC(this.truthy(this.evalExpr(e.right, env, thisObj, cls)));
    }
    if (e.op === '||') {
      var l2 = this.evalExpr(e.left, env, thisObj, cls);
      if (this.truthy(l2)) return boolC(true);
      return boolC(this.truthy(this.evalExpr(e.right, env, thisObj, cls)));
    }
    var a = this.evalExpr(e.left, env, thisObj, cls);
    var b = this.evalExpr(e.right, env, thisObj, cls);
    return this.applyBin(e.op, a, b);
  };

  Interp.prototype.applyBin = function (op, a, b) {
    switch (op) {
      case '+': {
        if (a.t === 'String' || b.t === 'String') return strC(javaStr(a) + javaStr(b));
        if (isNumT(a.t) && isNumT(b.t)) {
          if (isDblT(a.t) || isDblT(b.t)) return dblC(a.v + b.v);
          return intC(a.v + b.v);
        }
        rt('RuntimeException', 'عملية + بين أنواع مش متوافقة');
      }
      case '-': case '*': case '/': case '%': {
        if (!isNumT(a.t) || !isNumT(b.t)) rt('RuntimeException', 'عملية حسابية بين أنواع مش رقمية');
        if (isDblT(a.t) || isDblT(b.t)) {
          if (op === '-') return dblC(a.v - b.v);
          if (op === '*') return dblC(a.v * b.v);
          if (op === '/') return dblC(a.v / b.v);
          return dblC(a.v % b.v);
        }
        var x = Math.trunc(a.v), y = Math.trunc(b.v);
        if ((op === '/' || op === '%') && y === 0) rt('ArithmeticException', '/ by zero');
        if (op === '-') return intC(x - y);
        if (op === '*') return intC(x * y);
        if (op === '/') return intC(x / y);
        return intC(x % y);
      }
      case '<': case '<=': case '>': case '>=': {
        if (!isNumT(a.t) || !isNumT(b.t)) rt('RuntimeException', 'مقارنة بين أنواع مش رقمية');
        if (op === '<') return boolC(a.v < b.v);
        if (op === '<=') return boolC(a.v <= b.v);
        if (op === '>') return boolC(a.v > b.v);
        return boolC(a.v >= b.v);
      }
      case '==': return boolC(this.javaEquals(a, b));
      case '!=': return boolC(!this.javaEquals(a, b));
    }
    rt('RuntimeException', 'عملية غير مدعومة: ' + op);
  };

  Interp.prototype.assignTo = function (target, val, env, thisObj, cls) {
    if (target.kind === 'var') {
      var c = env.get(target.v);
      if (!c) {
        var th2 = env.get('this');
        if (th2 && th2.t === 'object' && th2.v.fields[target.v]) { c = th2.v.fields[target.v]; }
        else rt('RuntimeException', 'متغير مش معروف: ' + target.v);
      }
      // keep declared type container
      c.t = val.t === 'null' ? c.t : (isNumT(c.t) && isNumT(val.t) ? c.t : val.t);
      if (isIntT(c.t) && isNumT(val.t)) { c.v = Math.trunc(val.v); return val; }
      c.v = val.v; return val;
    }
    if (target.kind === 'field') {
      var ov = this.evalExpr(target.obj, env, thisObj, cls);
      if (ov.t === 'object') {
        if (!ov.v.fields[target.name]) ov.v.fields[target.name] = defaultCell('var');
        var fc = ov.v.fields[target.name];
        if (isNumT(fc.t) && isNumT(val.t)) {
          if (isIntT(fc.t)) { fc.v = Math.trunc(val.v); return val; }
          fc.v = val.v; return val;
        }
        fc.t = val.t === 'null' ? fc.t : val.t;
        fc.v = val.v;
        return val;
      }
      if (ov.t === 'null') rt('NullPointerException', 'كتابة خاصية في null');
      rt('RuntimeException', 'مينفعش تكتب خاصية هنا');
    }
    if (target.kind === 'index') {
      var arr = this.evalExpr(target.obj, env, thisObj, cls);
      var iv = this.evalExpr(target.index, env, thisObj, cls);
      var items = arr.t === 'array' ? arr.v.items : arr.t === 'list' ? arr.v.items : null;
      if (!items) rt('RuntimeException', 'كتابة خانة في حاجة مش array');
      if (iv.v < 0 || iv.v >= items.length) rt('ArrayIndexOutOfBoundsException', 'Index ' + Math.trunc(iv.v) + ' out of bounds for length ' + items.length);
      items[Math.trunc(iv.v)] = val;
      return val;
    }
    rt('RuntimeException', 'هدف تخزين غير صالح');
  };

  Interp.prototype.evalAssign = function (e, env, thisObj, cls) {
    var right = this.evalExpr(e.right, env, thisObj, cls);
    if (e.op === '=') return this.assignTo(e.left, right, env, thisObj, cls);
    var cur = this.evalExpr(e.left, env, thisObj, cls);
    var nv = this.applyBin(e.op[0], cur, right);
    return this.assignTo(e.left, nv, env, thisObj, cls);
  };

  Interp.prototype.evalField = function (e, env, thisObj, cls) {
    var ov = this.evalExpr(e.obj, env, thisObj, cls);
    if (ov.t === 'array' && e.name === 'length') return intC(ov.v.items.length);
    if (ov.t === 'system' && e.name === 'out') return cell('sysout', {});
    if (ov.t === 'mathclass' || ov.t === 'intclass' || ov.t === 'dblclass') {
      var consts = { PI: Math.PI, E: Math.E, MAX_VALUE: ov.t === 'intclass' ? 2147483647 : 1.7976931348623157e308, MIN_VALUE: ov.t === 'intclass' ? -2147483648 : 4.9e-324 };
      if (consts[e.name] !== undefined) return isDblT(ov.t === 'dblclass' ? 'double' : 'x') && false ? dblC(consts[e.name]) : (ov.t === 'mathclass' ? dblC(consts[e.name]) : (ov.t === 'intclass' ? intC(consts[e.name]) : dblC(consts[e.name])));
    }
    if (ov.t === 'null') rt('NullPointerException', 'قراءة خاصية "' + e.name + '" من null');
    if (ov.t === 'object') {
      var f = ov.v.fields[e.name];
      if (!f) rt('RuntimeException', 'خاصية مش موجودة: ' + e.name);
      return f;
    }
    if (ov.t === 'exception' && e.name === 'message') return strC(ov.v.message);
    rt('RuntimeException', 'مفيش خاصية "' + e.name + '" هنا');
  };

  Interp.prototype.evalNew = function (e, env, thisObj, cls) {
    var type = e.type.replace(/<.*>/, '');
    var args = e.args.map(function (a) { return this.evalExpr(a, env, thisObj, cls); }, this);
    if (type === 'ArrayList' || type === 'LinkedList' || type === 'List') return cell('list', { items: [] });
    if (type === 'HashMap' || type === 'LinkedHashMap' || type === 'Map') return cell('map', { keys: [], vals: [] });
    if (/Exception$|Error$/.test(type)) return cell('exception', { javaType: type, message: args.length ? javaStr(args[0]) : '' });
    var cdef = this.classes[type];
    if (!cdef) rt('RuntimeException', 'كلاس مش موجود في المعمل: ' + type);
    var obj = cell('object', { cls: cdef, fields: Object.create(null) });
    // init fields along super chain (super first)
    var chain = [];
    var cc = cdef;
    while (cc) { chain.unshift(cc); cc = cc.superName ? this.classes[cc.superName] : null; }
    var fenv = new Env(this.global);
    fenv.declare('this', obj);
    for (var ci = 0; ci < chain.length; ci++) {
      for (var fi = 0; fi < chain[ci].fields.length; fi++) {
        var f = chain[ci].fields[fi];
        obj.v.fields[f.name] = f.init ? this.evalExpr(f.init, fenv, obj, chain[ci]) : defaultCell(f.type);
      }
    }
    // constructor
    var ctor = null;
    for (var ki = 0; ki < cdef.ctors.length; ki++) if (cdef.ctors[ki].params.length === args.length) { ctor = cdef.ctors[ki]; break; }
    if (ctor) {
      var cenv = new Env(this.global);
      cenv.declare('this', obj);
      for (var pi = 0; pi < ctor.params.length; pi++) cenv.declare(ctor.params[pi].name, this.coerceDecl(ctor.params[pi].type, args[pi] || nullC()));
      // super(...) call as first statement?
      var stmts = ctor.body.stmts.slice();
      if (stmts.length && stmts[0].kind === 'exprstmt' && stmts[0].expr.kind === 'call' && stmts[0].expr.name === 'super') {
        var sargs = stmts[0].expr.args.map(function (a) { return this.evalExpr(a, cenv, obj, cdef); }, this);
        this.callSuperCtor(cdef, obj, sargs);
        stmts = stmts.slice(1);
      } else if (cdef.superName) {
        this.callSuperCtor(cdef, obj, []);
      }
      this.execBlock({ kind: 'block', stmts: stmts }, cenv, obj, cdef);
    } else if (cdef.ctors.length && args.length) {
      rt('RuntimeException', 'مفيش constructor في ' + type + ' بتاخد ' + args.length + ' قيمة');
    } else if (!cdef.ctors.length && cdef.superName) {
      this.callSuperCtor(cdef, obj, []);
    }
    return obj;
  };

  Interp.prototype.callSuperCtor = function (cdef, obj, args) {
    var sup = cdef.superName ? this.classes[cdef.superName] : null;
    if (!sup) return;
    var sctor = null;
    for (var i = 0; i < sup.ctors.length; i++) if (sup.ctors[i].params.length === args.length) { sctor = sup.ctors[i]; break; }
    if (!sctor) return;
    var senv = new Env(this.global);
    senv.declare('this', obj);
    for (var p = 0; p < sctor.params.length; p++) senv.declare(sctor.params[p].name, this.coerceDecl(sctor.params[p].type, args[p] || nullC()));
    this.execBlock(sctor.body, senv, obj, sup);
  };

  Interp.prototype.evalCall = function (e, env, thisObj, cls) {
    var args = e.args.map(function (a) { return this.evalExpr(a, env, thisObj, cls); }, this);
    // super(...) inside ctor is handled in evalNew; super.method()
    if (e.obj === null && e.name === 'super') return cell('void', null);
    if (e.obj && e.obj.kind === 'super') {
      var sup = cls && cls.superName ? this.classes[cls.superName] : null;
      if (!sup) rt('RuntimeException', 'super مش متاحة هنا');
      var sm = this.findMethod(sup, e.name, args.length);
      if (!sm) rt('RuntimeException', 'method مش موجودة في الأب: ' + e.name);
      return this.invokeMethod(env.get('this'), sm.cls, sm.m, args, null);
    }
    if (e.obj === null) {
      // statics (synthetic top-level), then current class methods, then builtins
      var stList = this.statics[e.name + '/' + args.length];
      var st = null;
      if (stList) {
        st = stList[0];
        for (var si = 0; si < stList.length; si++) {
          var cand = stList[si], exact = true;
          for (var pj = 0; pj < cand.params.length; pj++) {
            var pt = cand.params[pj].type.replace(/<.*>/, '');
            var at = args[pj] ? args[pj].t : 'null';
            if (isNumT(pt) && isNumT(at) && isDblT(pt) !== isDblT(at)) { exact = false; break; }
          }
          if (exact) { st = cand; break; }
        }
      }
      if (st) return this.invokeMethod(null, null, st, args, { thisObj: thisObj });
      if (cls) {
        var cm = this.findMethod(cls, e.name, args.length);
        if (cm) return this.invokeMethod(thisObj, cm.cls, cm.m, args, null);
      }
      rt('RuntimeException', 'method مش معروفة: ' + e.name + '. لو قصدك method من مكتبة جاهزة، المعمل بيدعم methods الـ String و ArrayList و HashMap و Math و Integer.parseInt بس.');
    }
    var ov = this.evalExpr(e.obj, env, thisObj, cls);
    return this.callOn(ov, e.name, args, env, thisObj, cls);
  };

  Interp.prototype.callOn = function (ov, name, args, env, thisObj, cls) {
    if (ov.t === 'sysout') {
      if (name === 'println' || name === 'print') {
        var s = args.length ? javaStr(args[0]) : '';
        this.out.push(s + (name === 'println' ? '\n' : ''));
        return cell('void', null);
      }
      if (name === 'printf') rt('RuntimeException', 'printf مش مدعومة في المعمل، استخدم println مع اللصق +');
    }
    if (ov.t === 'mathclass') {
      var nv = args.map(function (a) { return a.v; });
      switch (name) {
        case 'max': return args.some(function (a) { return isDblT(a.t); }) ? dblC(Math.max(nv[0], nv[1])) : intC(Math.max(nv[0], nv[1]));
        case 'min': return args.some(function (a) { return isDblT(a.t); }) ? dblC(Math.min(nv[0], nv[1])) : intC(Math.min(nv[0], nv[1]));
        case 'abs': return isDblT(args[0].t) ? dblC(Math.abs(nv[0])) : intC(Math.abs(nv[0]));
        case 'pow': return dblC(Math.pow(nv[0], nv[1]));
        case 'sqrt': return dblC(Math.sqrt(nv[0]));
        case 'round': return intC(Math.round(nv[0]));
        case 'floor': return dblC(Math.floor(nv[0]));
        case 'ceil': return dblC(Math.ceil(nv[0]));
      }
      rt('RuntimeException', 'Math.' + name + ' مش مدعومة في المعمل');
    }
    if (ov.t === 'intclass') {
      if (name === 'parseInt') {
        var pnum = Number(String(args[0].v).trim());
        if (!/^-?\d+$/.test(String(args[0].v).trim())) rt('NumberFormatException', 'For input string: "' + args[0].v + '"');
        return intC(parseInt(String(args[0].v).trim(), 10));
      }
    }
    if (ov.t === 'dblclass' && name === 'parseDouble') {
      var pd = Number(String(args[0].v).trim());
      if (Number.isNaN(pd)) rt('NumberFormatException', 'For input string: "' + args[0].v + '"');
      return dblC(pd);
    }
    if (ov.t === 'strclass' && name === 'valueOf') return strC(javaStr(args[0]));
    if (ov.t === 'null') rt('NullPointerException', 'نداء method "' + name + '" على متغير null');
    if (ov.t === 'String') {
      var sv = ov.v, av = function (i) { return args[i] ? args[i].v : undefined; };
      switch (name) {
        case 'length': return intC(sv.length);
        case 'charAt': {
          var ix = Math.trunc(av(0));
          if (ix < 0 || ix >= sv.length) rt('StringIndexOutOfBoundsException', 'String index out of range: ' + ix);
          return cell('char', sv[ix]);
        }
        case 'toUpperCase': return strC(sv.toUpperCase());
        case 'toLowerCase': return strC(sv.toLowerCase());
        case 'trim': return strC(sv.trim());
        case 'substring': return strC(args.length > 1 ? sv.substring(Math.trunc(av(0)), Math.trunc(av(1))) : sv.substring(Math.trunc(av(0))));
        case 'equals': return boolC(args[0].t === 'String' && sv === args[0].v);
        case 'equalsIgnoreCase': return boolC(args[0].t === 'String' && sv.toLowerCase() === args[0].v.toLowerCase());
        case 'contains': return boolC(sv.indexOf(javaStr(args[0])) !== -1);
        case 'startsWith': return boolC(sv.startsWith(javaStr(args[0])));
        case 'endsWith': return boolC(sv.endsWith(javaStr(args[0])));
        case 'indexOf': return intC(sv.indexOf(javaStr(args[0])));
        case 'replace': return strC(sv.split(javaStr(args[0])).join(javaStr(args[1])));
        case 'isEmpty': return boolC(sv.length === 0);
        case 'concat': return strC(sv + javaStr(args[0]));
      }
      rt('RuntimeException', 'method "' + name + '" مش مدعومة للـ String في المعمل');
    }
    if (ov.t === 'array') rt('RuntimeException', 'الـ array معندهاش methods في المعمل، استخدم .length والأقواس المربعة');
    if (ov.t === 'list') {
      var L = ov.v;
      switch (name) {
        case 'add': L.items.push(args[0]); return boolC(true);
        case 'get': {
          var gi = Math.trunc(args[0].v);
          if (gi < 0 || gi >= L.items.length) rt('IndexOutOfBoundsException', 'Index: ' + gi + ', Size: ' + L.items.length);
          return L.items[gi];
        }
        case 'size': return intC(L.items.length);
        case 'isEmpty': return boolC(L.items.length === 0);
        case 'remove': {
          if (args[0].t === 'int') {
            var ri = Math.trunc(args[0].v);
            if (ri < 0 || ri >= L.items.length) rt('IndexOutOfBoundsException', 'Index: ' + ri + ', Size: ' + L.items.length);
            return L.items.splice(ri, 1)[0];
          }
          var rj = -1;
          for (var li = 0; li < L.items.length; li++) if (this.javaEquals(L.items[li], args[0])) { rj = li; break; }
          if (rj === -1) return boolC(false);
          L.items.splice(rj, 1); return boolC(true);
        }
        case 'contains': {
          for (var ci2 = 0; ci2 < L.items.length; ci2++) if (this.javaEquals(L.items[ci2], args[0])) return boolC(true);
          return boolC(false);
        }
        case 'clear': L.items.length = 0; return cell('void', null);
        case 'set': {
          var si2 = Math.trunc(args[0].v);
          if (si2 < 0 || si2 >= L.items.length) rt('IndexOutOfBoundsException', 'Index: ' + si2 + ', Size: ' + L.items.length);
          var old = L.items[si2]; L.items[si2] = args[1]; return old;
        }
      }
      rt('RuntimeException', 'method "' + name + '" مش مدعومة للـ ArrayList في المعمل');
    }
    if (ov.t === 'map') {
      var M = ov.v;
      var findKey = function (kc) {
        for (var i = 0; i < M.keys.length; i++) if (javaStr(M.keys[i]) === javaStr(kc)) return i;
        return -1;
      };
      switch (name) {
        case 'put': {
          var pi2 = findKey(args[0]);
          var oldv = nullC();
          if (pi2 === -1) { M.keys.push(args[0]); M.vals.push(args[1]); }
          else { oldv = M.vals[pi2]; M.vals[pi2] = args[1]; }
          return oldv;
        }
        case 'get': { var gi2 = findKey(args[0]); return gi2 === -1 ? nullC() : M.vals[gi2]; }
        case 'containsKey': return boolC(findKey(args[0]) !== -1);
        case 'containsValue': { for (var vi = 0; vi < M.vals.length; vi++) if (this.javaEquals(M.vals[vi], args[0])) return boolC(true); return boolC(false); }
        case 'size': return intC(M.keys.length);
        case 'isEmpty': return boolC(M.keys.length === 0);
        case 'remove': { var ri2 = findKey(args[0]); if (ri2 === -1) return nullC(); var rv = M.vals[ri2]; M.keys.splice(ri2, 1); M.vals.splice(ri2, 1); return rv; }
        case 'keySet': return cell('list', { items: M.keys.slice() });
        case 'clear': M.keys.length = 0; M.vals.length = 0; return cell('void', null);
      }
      rt('RuntimeException', 'method "' + name + '" مش مدعومة للـ HashMap في المعمل');
    }
    if (ov.t === 'exception') {
      if (name === 'getMessage') return strC(ov.v.message);
      if (name === 'printStackTrace') { this.out.push('java.lang.' + ov.v.javaType + ': ' + ov.v.message + '\n'); return cell('void', null); }
    }
    if (ov.t === 'object') {
      var found = this.findMethod(ov.v.cls, name, args.length);
      if (!found) rt('RuntimeException', 'method "' + name + '" مش موجودة في ' + ov.v.cls.name);
      return this.invokeMethod(ov, found.cls, found.m, args, null);
    }
    rt('RuntimeException', 'مينفعش تنده method "' + name + '" على القيمة دي');
  };

  /* ============ public API ============ */
  window.JAVA_CORE = {
    run: function (src) {
      try {
        var toks = window.JAVA_CORE_LEX(src);
        var parser = new window.JAVA_CORE_PARSER(toks);
        var prog = parser.parseProgram();
        var interp = new Interp(prog);
        var output = interp.run();
        return { ok: true, output: output };
      } catch (ex) {
        if (ex && ex.isJavaException) {
          return { ok: false, output: '', error: 'Exception in thread "main" java.lang.' + ex.javaType + (ex.message ? ': ' + ex.message : '') };
        }
        return { ok: false, output: '', error: String(ex && ex.message ? ex.message : ex) };
      }
    }
  };
})();
