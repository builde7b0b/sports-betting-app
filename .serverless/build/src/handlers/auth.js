"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/jws/lib/data-stream.js"(exports2, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = require("stream");
    var util = require("util");
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    util.inherits(DataStream, Stream);
    DataStream.prototype.write = function write(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    };
    DataStream.prototype.end = function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    };
    module2.exports = DataStream;
  }
});

// node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "node_modules/buffer-equal-constant-time/index.js"(exports2, module2) {
    "use strict";
    var Buffer2 = require("buffer").Buffer;
    var SlowBuffer = require("buffer").SlowBuffer;
    module2.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
      };
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports2, module2) {
    "use strict";
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    module2.exports = getParamBytesForAlg;
  }
});

// node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports2, module2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    module2.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node_modules/jwa/index.js
var require_jwa = __commonJS({
  "node_modules/jwa/index.js"(exports2, module2) {
    var bufferEqual = require_buffer_equal_constant_time();
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto = require("crypto");
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util = require("util");
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util.format.bind(util, template).apply(null, args);
      return new TypeError(errMsg);
    }
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    function createHmacSigner(bits) {
      return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      };
    }
    function createHmacVerifier(bits) {
      return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return bufferEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      };
    }
    function createKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      };
    }
    function createKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      };
    }
    function createPSSKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      };
    }
    function createPSSKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      };
    }
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      };
    }
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      };
    }
    function createNoneSigner() {
      return function sign() {
        return "";
      };
    }
    function createNoneVerifier() {
      return function verify(thing, signature) {
        return signature === "";
      };
    }
    module2.exports = function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
      if (!match)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match[1] || match[3]).toLowerCase();
      var bits = match[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    };
  }
});

// node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "node_modules/jws/lib/tostring.js"(exports2, module2) {
    var Buffer2 = require("buffer").Buffer;
    module2.exports = function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    };
  }
});

// node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "node_modules/jws/lib/sign-stream.js"(exports2, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require("stream");
    var toString = require_tostring();
    var util = require("util");
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util.format("%s.%s", encodedHeader, encodedPayload);
    }
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util.format("%s.%s", securedInput, signature);
    }
    function SignStream(opts) {
      var secret = opts.secret || opts.privateKey || opts.key;
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    util.inherits(SignStream, Stream);
    SignStream.prototype.sign = function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    SignStream.sign = jwsSign;
    module2.exports = SignStream;
  }
});

// node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "node_modules/jws/lib/verify-stream.js"(exports2, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require("stream");
    var toString = require_tostring();
    var util = require("util");
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret || opts.publicKey || opts.key;
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    util.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module2.exports = VerifyStream;
  }
});

// node_modules/jws/index.js
var require_jws = __commonJS({
  "node_modules/jws/index.js"(exports2) {
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports2.ALGORITHMS = ALGORITHMS;
    exports2.sign = SignStream.sign;
    exports2.verify = VerifyStream.verify;
    exports2.decode = VerifyStream.decode;
    exports2.isValid = VerifyStream.isValid;
    exports2.createSign = function createSign(opts) {
      return new SignStream(opts);
    };
    exports2.createVerify = function createVerify(opts) {
      return new VerifyStream(opts);
    };
  }
});

// node_modules/jsonwebtoken/decode.js
var require_decode = __commonJS({
  "node_modules/jsonwebtoken/decode.js"(exports2, module2) {
    var jws = require_jws();
    module2.exports = function(jwt2, options) {
      options = options || {};
      var decoded = jws.decode(jwt2, options);
      if (!decoded) {
        return null;
      }
      var payload = decoded.payload;
      if (typeof payload === "string") {
        try {
          var obj = JSON.parse(payload);
          if (obj !== null && typeof obj === "object") {
            payload = obj;
          }
        } catch (e) {
        }
      }
      if (options.complete === true) {
        return {
          header: decoded.header,
          payload,
          signature: decoded.signature
        };
      }
      return payload;
    };
  }
});

// node_modules/jsonwebtoken/lib/JsonWebTokenError.js
var require_JsonWebTokenError = __commonJS({
  "node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports2, module2) {
    var JsonWebTokenError = function(message, error) {
      Error.call(this, message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "JsonWebTokenError";
      this.message = message;
      if (error) this.inner = error;
    };
    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;
    module2.exports = JsonWebTokenError;
  }
});

// node_modules/jsonwebtoken/lib/NotBeforeError.js
var require_NotBeforeError = __commonJS({
  "node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports2, module2) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = function(message, date) {
      JsonWebTokenError.call(this, message);
      this.name = "NotBeforeError";
      this.date = date;
    };
    NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
    NotBeforeError.prototype.constructor = NotBeforeError;
    module2.exports = NotBeforeError;
  }
});

// node_modules/jsonwebtoken/lib/TokenExpiredError.js
var require_TokenExpiredError = __commonJS({
  "node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports2, module2) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var TokenExpiredError = function(message, expiredAt) {
      JsonWebTokenError.call(this, message);
      this.name = "TokenExpiredError";
      this.expiredAt = expiredAt;
    };
    TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
    TokenExpiredError.prototype.constructor = TokenExpiredError;
    module2.exports = TokenExpiredError;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/jsonwebtoken/lib/timespan.js
var require_timespan = __commonJS({
  "node_modules/jsonwebtoken/lib/timespan.js"(exports2, module2) {
    var ms = require_ms();
    module2.exports = function(time, iat) {
      var timestamp = iat || Math.floor(Date.now() / 1e3);
      if (typeof time === "string") {
        var milliseconds = ms(time);
        if (typeof milliseconds === "undefined") {
          return;
        }
        return Math.floor(timestamp + milliseconds / 1e3);
      } else if (typeof time === "number") {
        return timestamp + time;
      } else {
        return;
      }
    };
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var t = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (!identifier && identifierBase === false) {
              throw new Error("invalid increment argument: identifier is empty");
            }
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports2, module2) {
    var SemVer = require_semver();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports2, module2) {
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports2, module2) {
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports2, module2) {
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports2, module2) {
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (highVersion.patch) {
          return "patch";
        }
        if (highVersion.minor) {
          return "minor";
        }
        return "major";
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports2, module2) {
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports2, module2) {
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports2, module2) {
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports2, module2) {
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports2, module2) {
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports2, module2) {
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports2, module2) {
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports2, module2) {
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports2, module2) {
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports2, module2) {
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports2, module2) {
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports2, module2) {
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports2, module2) {
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports2, module2) {
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports2, module2) {
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports2, module2) {
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports2, module2) {
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports2, module2) {
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports2, module2) {
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports2, module2) {
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports2, module2) {
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports2, module2) {
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports2, module2) {
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports2, module2) {
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports2, module2) {
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports2, module2) {
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports2, module2) {
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports2, module2) {
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports2, module2) {
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/semver/index.js"(exports2, module2) {
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
var require_asymmetricKeyDetailsSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"(exports2, module2) {
    var semver = require_semver2();
    module2.exports = semver.satisfies(process.version, ">=15.7.0");
  }
});

// node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js
var require_rsaPssKeyDetailsSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"(exports2, module2) {
    var semver = require_semver2();
    module2.exports = semver.satisfies(process.version, ">=16.9.0");
  }
});

// node_modules/jsonwebtoken/lib/validateAsymmetricKey.js
var require_validateAsymmetricKey = __commonJS({
  "node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"(exports2, module2) {
    var ASYMMETRIC_KEY_DETAILS_SUPPORTED = require_asymmetricKeyDetailsSupported();
    var RSA_PSS_KEY_DETAILS_SUPPORTED = require_rsaPssKeyDetailsSupported();
    var allowedAlgorithmsForKeys = {
      "ec": ["ES256", "ES384", "ES512"],
      "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
      "rsa-pss": ["PS256", "PS384", "PS512"]
    };
    var allowedCurves = {
      ES256: "prime256v1",
      ES384: "secp384r1",
      ES512: "secp521r1"
    };
    module2.exports = function(algorithm, key) {
      if (!algorithm || !key) return;
      const keyType = key.asymmetricKeyType;
      if (!keyType) return;
      const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
      if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
      }
      if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
      }
      if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch (keyType) {
          case "ec":
            const keyCurve = key.asymmetricKeyDetails.namedCurve;
            const allowedCurve = allowedCurves[algorithm];
            if (keyCurve !== allowedCurve) {
              throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
            }
            break;
          case "rsa-pss":
            if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
              const length = parseInt(algorithm.slice(-3), 10);
              const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
              if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
              }
              if (saltLength !== void 0 && saltLength > length >> 3) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
              }
            }
            break;
        }
      }
    };
  }
});

// node_modules/jsonwebtoken/lib/psSupported.js
var require_psSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/psSupported.js"(exports2, module2) {
    var semver = require_semver2();
    module2.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  }
});

// node_modules/jsonwebtoken/verify.js
var require_verify = __commonJS({
  "node_modules/jsonwebtoken/verify.js"(exports2, module2) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = require_NotBeforeError();
    var TokenExpiredError = require_TokenExpiredError();
    var decode = require_decode();
    var timespan = require_timespan();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var { KeyObject, createSecretKey, createPublicKey } = require("crypto");
    var PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
    var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var HS_ALGS = ["HS256", "HS384", "HS512"];
    if (PS_SUPPORTED) {
      PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
      RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
    }
    module2.exports = function(jwtString, secretOrPublicKey, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      }
      if (!options) {
        options = {};
      }
      options = Object.assign({}, options);
      let done;
      if (callback) {
        done = callback;
      } else {
        done = function(err, data) {
          if (err) throw err;
          return data;
        };
      }
      if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
        return done(new JsonWebTokenError("clockTimestamp must be a number"));
      }
      if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
        return done(new JsonWebTokenError("nonce must be a non-empty string"));
      }
      if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
        return done(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
      }
      const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
      if (!jwtString) {
        return done(new JsonWebTokenError("jwt must be provided"));
      }
      if (typeof jwtString !== "string") {
        return done(new JsonWebTokenError("jwt must be a string"));
      }
      const parts = jwtString.split(".");
      if (parts.length !== 3) {
        return done(new JsonWebTokenError("jwt malformed"));
      }
      let decodedToken;
      try {
        decodedToken = decode(jwtString, { complete: true });
      } catch (err) {
        return done(err);
      }
      if (!decodedToken) {
        return done(new JsonWebTokenError("invalid token"));
      }
      const header = decodedToken.header;
      let getSecret;
      if (typeof secretOrPublicKey === "function") {
        if (!callback) {
          return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
        }
        getSecret = secretOrPublicKey;
      } else {
        getSecret = function(header2, secretCallback) {
          return secretCallback(null, secretOrPublicKey);
        };
      }
      return getSecret(header, function(err, secretOrPublicKey2) {
        if (err) {
          return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
        }
        const hasSignature = parts[2].trim() !== "";
        if (!hasSignature && secretOrPublicKey2) {
          return done(new JsonWebTokenError("jwt signature is required"));
        }
        if (hasSignature && !secretOrPublicKey2) {
          return done(new JsonWebTokenError("secret or public key must be provided"));
        }
        if (!hasSignature && !options.algorithms) {
          return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
          try {
            secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
          } catch (_) {
            try {
              secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer.from(secretOrPublicKey2) : secretOrPublicKey2);
            } catch (_2) {
              return done(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
            }
          }
        }
        if (!options.algorithms) {
          if (secretOrPublicKey2.type === "secret") {
            options.algorithms = HS_ALGS;
          } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
            options.algorithms = RSA_KEY_ALGS;
          } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
            options.algorithms = EC_KEY_ALGS;
          } else {
            options.algorithms = PUB_KEY_ALGS;
          }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
          return done(new JsonWebTokenError("invalid algorithm"));
        }
        if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
          try {
            validateAsymmetricKey(header.alg, secretOrPublicKey2);
          } catch (e) {
            return done(e);
          }
        }
        let valid;
        try {
          valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
        if (!valid) {
          return done(new JsonWebTokenError("invalid signature"));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
          if (typeof payload.nbf !== "number") {
            return done(new JsonWebTokenError("invalid nbf value"));
          }
          if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
            return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
          }
        }
        if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
          if (typeof payload.exp !== "number") {
            return done(new JsonWebTokenError("invalid exp value"));
          }
          if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
          }
        }
        if (options.audience) {
          const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
          const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
          const match = target.some(function(targetAudience) {
            return audiences.some(function(audience) {
              return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
            });
          });
          if (!match) {
            return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
          }
        }
        if (options.issuer) {
          const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
          if (invalid_issuer) {
            return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
          }
        }
        if (options.subject) {
          if (payload.sub !== options.subject) {
            return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
          }
        }
        if (options.jwtid) {
          if (payload.jti !== options.jwtid) {
            return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
          }
        }
        if (options.nonce) {
          if (payload.nonce !== options.nonce) {
            return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
          }
        }
        if (options.maxAge) {
          if (typeof payload.iat !== "number") {
            return done(new JsonWebTokenError("iat required when maxAge is specified"));
          }
          const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
          if (typeof maxAgeTimestamp === "undefined") {
            return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
          if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
          }
        }
        if (options.complete === true) {
          const signature = decodedToken.signature;
          return done(null, {
            header,
            payload,
            signature
          });
        }
        return done(null, payload);
      });
    };
  }
});

// node_modules/lodash.includes/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.includes/index.js"(exports2, module2) {
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    module2.exports = includes;
  }
});

// node_modules/lodash.isboolean/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.isboolean/index.js"(exports2, module2) {
    var boolTag = "[object Boolean]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    module2.exports = isBoolean;
  }
});

// node_modules/lodash.isinteger/index.js
var require_lodash3 = __commonJS({
  "node_modules/lodash.isinteger/index.js"(exports2, module2) {
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isInteger(value) {
      return typeof value == "number" && value == toInteger(value);
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = isInteger;
  }
});

// node_modules/lodash.isnumber/index.js
var require_lodash4 = __commonJS({
  "node_modules/lodash.isnumber/index.js"(exports2, module2) {
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
    }
    module2.exports = isNumber;
  }
});

// node_modules/lodash.isplainobject/index.js
var require_lodash5 = __commonJS({
  "node_modules/lodash.isplainobject/index.js"(exports2, module2) {
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module2.exports = isPlainObject;
  }
});

// node_modules/lodash.isstring/index.js
var require_lodash6 = __commonJS({
  "node_modules/lodash.isstring/index.js"(exports2, module2) {
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var isArray = Array.isArray;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    module2.exports = isString;
  }
});

// node_modules/lodash.once/index.js
var require_lodash7 = __commonJS({
  "node_modules/lodash.once/index.js"(exports2, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function before(n, func) {
      var result;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = void 0;
        }
        return result;
      };
    }
    function once(func) {
      return before(2, func);
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = once;
  }
});

// node_modules/jsonwebtoken/sign.js
var require_sign = __commonJS({
  "node_modules/jsonwebtoken/sign.js"(exports2, module2) {
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var jws = require_jws();
    var includes = require_lodash();
    var isBoolean = require_lodash2();
    var isInteger = require_lodash3();
    var isNumber = require_lodash4();
    var isPlainObject = require_lodash5();
    var isString = require_lodash6();
    var once = require_lodash7();
    var { KeyObject, createSecretKey, createPrivateKey } = require("crypto");
    var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
    if (PS_SUPPORTED) {
      SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    var sign_options_schema = {
      expiresIn: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
      notBefore: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
      audience: { isValid: function(value) {
        return isString(value) || Array.isArray(value);
      }, message: '"audience" must be a string or array' },
      algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
      header: { isValid: isPlainObject, message: '"header" must be an object' },
      encoding: { isValid: isString, message: '"encoding" must be a string' },
      issuer: { isValid: isString, message: '"issuer" must be a string' },
      subject: { isValid: isString, message: '"subject" must be a string' },
      jwtid: { isValid: isString, message: '"jwtid" must be a string' },
      noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
      keyid: { isValid: isString, message: '"keyid" must be a string' },
      mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
      allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean' },
      allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
    };
    var registered_claims_schema = {
      iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
      exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
      nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
    };
    function validate(schema, allowUnknown, object, parameterName) {
      if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
      }
      Object.keys(object).forEach(function(key) {
        const validator = schema[key];
        if (!validator) {
          if (!allowUnknown) {
            throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
          }
          return;
        }
        if (!validator.isValid(object[key])) {
          throw new Error(validator.message);
        }
      });
    }
    function validateOptions(options) {
      return validate(sign_options_schema, false, options, "options");
    }
    function validatePayload(payload) {
      return validate(registered_claims_schema, true, payload, "payload");
    }
    var options_to_payload = {
      "audience": "aud",
      "issuer": "iss",
      "subject": "sub",
      "jwtid": "jti"
    };
    var options_for_objects = [
      "expiresIn",
      "notBefore",
      "noTimestamp",
      "audience",
      "issuer",
      "subject",
      "jwtid"
    ];
    module2.exports = function(payload, secretOrPrivateKey, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
      const isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
      const header = Object.assign({
        alg: options.algorithm || "HS256",
        typ: isObjectPayload ? "JWT" : void 0,
        kid: options.keyid
      }, options.header);
      function failure(err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      if (!secretOrPrivateKey && options.algorithm !== "none") {
        return failure(new Error("secretOrPrivateKey must have a value"));
      }
      if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
          secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
        } catch (_) {
          try {
            secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
          } catch (_2) {
            return failure(new Error("secretOrPrivateKey is not valid key material"));
          }
        }
      }
      if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
      } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== "private") {
          return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
          return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
      }
      if (typeof payload === "undefined") {
        return failure(new Error("payload is required"));
      } else if (isObjectPayload) {
        try {
          validatePayload(payload);
        } catch (error) {
          return failure(error);
        }
        if (!options.mutatePayload) {
          payload = Object.assign({}, payload);
        }
      } else {
        const invalid_options = options_for_objects.filter(function(opt) {
          return typeof options[opt] !== "undefined";
        });
        if (invalid_options.length > 0) {
          return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
        }
      }
      if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
      }
      if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
      }
      try {
        validateOptions(options);
      } catch (error) {
        return failure(error);
      }
      if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
          validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error) {
          return failure(error);
        }
      }
      const timestamp = payload.iat || Math.floor(Date.now() / 1e3);
      if (options.noTimestamp) {
        delete payload.iat;
      } else if (isObjectPayload) {
        payload.iat = timestamp;
      }
      if (typeof options.notBefore !== "undefined") {
        try {
          payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.nbf === "undefined") {
          return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
        try {
          payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.exp === "undefined") {
          return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== "undefined") {
          if (typeof payload[claim] !== "undefined") {
            return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
          }
          payload[claim] = options[key];
        }
      });
      const encoding = options.encoding || "utf8";
      if (typeof callback === "function") {
        callback = callback && once(callback);
        jws.createSign({
          header,
          privateKey: secretOrPrivateKey,
          payload,
          encoding
        }).once("error", callback).once("done", function(signature) {
          if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
          }
          callback(null, signature);
        });
      } else {
        let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
      }
    };
  }
});

// node_modules/jsonwebtoken/index.js
var require_jsonwebtoken = __commonJS({
  "node_modules/jsonwebtoken/index.js"(exports2, module2) {
    module2.exports = {
      decode: require_decode(),
      verify: require_verify(),
      sign: require_sign(),
      JsonWebTokenError: require_JsonWebTokenError(),
      NotBeforeError: require_NotBeforeError(),
      TokenExpiredError: require_TokenExpiredError()
    };
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var flagForceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    function envForceColor() {
      if ("FORCE_COLOR" in env) {
        if (env.FORCE_COLOR === "true") {
          return 1;
        }
        if (env.FORCE_COLOR === "false") {
          return 0;
        }
        return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
      const noFlagForceColor = envForceColor();
      if (noFlagForceColor !== void 0) {
        flagForceColor = noFlagForceColor;
      }
      const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
      if (forceColor === 0) {
        return 0;
      }
      if (sniffFlags) {
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
          return 3;
        }
        if (hasFlag("color=256")) {
          return 2;
        }
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream, options = {}) {
      const level = supportsColor(stream, {
        streamIsTTY: stream && stream.isTTY,
        ...options
      });
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel({ isTTY: tty.isatty(1) }),
      stderr: getSupportLevel({ isTTY: tty.isatty(2) })
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/jose/dist/node/cjs/runtime/digest.js
var require_digest = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/digest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var digest = (algorithm, data) => (0, crypto_1.createHash)(algorithm).update(data).digest();
    exports2.default = digest;
  }
});

// node_modules/jose/dist/node/cjs/lib/buffer_utils.js
var require_buffer_utils = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/buffer_utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatKdf = exports2.lengthAndInput = exports2.uint32be = exports2.uint64be = exports2.p2s = exports2.concat = exports2.decoder = exports2.encoder = void 0;
    var digest_js_1 = require_digest();
    exports2.encoder = new TextEncoder();
    exports2.decoder = new TextDecoder();
    var MAX_INT32 = 2 ** 32;
    function concat(...buffers) {
      const size = buffers.reduce((acc, { length }) => acc + length, 0);
      const buf = new Uint8Array(size);
      let i = 0;
      buffers.forEach((buffer) => {
        buf.set(buffer, i);
        i += buffer.length;
      });
      return buf;
    }
    exports2.concat = concat;
    function p2s(alg, p2sInput) {
      return concat(exports2.encoder.encode(alg), new Uint8Array([0]), p2sInput);
    }
    exports2.p2s = p2s;
    function writeUInt32BE(buf, value, offset) {
      if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
      }
      buf.set([value >>> 24, value >>> 16, value >>> 8, value & 255], offset);
    }
    function uint64be(value) {
      const high = Math.floor(value / MAX_INT32);
      const low = value % MAX_INT32;
      const buf = new Uint8Array(8);
      writeUInt32BE(buf, high, 0);
      writeUInt32BE(buf, low, 4);
      return buf;
    }
    exports2.uint64be = uint64be;
    function uint32be(value) {
      const buf = new Uint8Array(4);
      writeUInt32BE(buf, value);
      return buf;
    }
    exports2.uint32be = uint32be;
    function lengthAndInput(input) {
      return concat(uint32be(input.length), input);
    }
    exports2.lengthAndInput = lengthAndInput;
    async function concatKdf(secret, bits, value) {
      const iterations = Math.ceil((bits >> 3) / 32);
      const res = new Uint8Array(iterations * 32);
      for (let iter = 0; iter < iterations; iter++) {
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await (0, digest_js_1.default)("sha256", buf), iter * 32);
      }
      return res.slice(0, bits >> 3);
    }
    exports2.concatKdf = concatKdf;
  }
});

// node_modules/jose/dist/node/cjs/runtime/base64url.js
var require_base64url = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/base64url.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decode = exports2.encode = exports2.encodeBase64 = exports2.decodeBase64 = void 0;
    var buffer_1 = require("buffer");
    var buffer_utils_js_1 = require_buffer_utils();
    var encode;
    function normalize(input) {
      let encoded = input;
      if (encoded instanceof Uint8Array) {
        encoded = buffer_utils_js_1.decoder.decode(encoded);
      }
      return encoded;
    }
    if (buffer_1.Buffer.isEncoding("base64url")) {
      exports2.encode = encode = (input) => buffer_1.Buffer.from(input).toString("base64url");
    } else {
      exports2.encode = encode = (input) => buffer_1.Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    var decodeBase64 = (input) => buffer_1.Buffer.from(input, "base64");
    exports2.decodeBase64 = decodeBase64;
    var encodeBase64 = (input) => buffer_1.Buffer.from(input).toString("base64");
    exports2.encodeBase64 = encodeBase64;
    var decode = (input) => buffer_1.Buffer.from(normalize(input), "base64");
    exports2.decode = decode;
  }
});

// node_modules/jose/dist/node/cjs/util/errors.js
var require_errors = __commonJS({
  "node_modules/jose/dist/node/cjs/util/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JWSSignatureVerificationFailed = exports2.JWKSTimeout = exports2.JWKSMultipleMatchingKeys = exports2.JWKSNoMatchingKey = exports2.JWKSInvalid = exports2.JWKInvalid = exports2.JWTInvalid = exports2.JWSInvalid = exports2.JWEInvalid = exports2.JWEDecompressionFailed = exports2.JWEDecryptionFailed = exports2.JOSENotSupported = exports2.JOSEAlgNotAllowed = exports2.JWTExpired = exports2.JWTClaimValidationFailed = exports2.JOSEError = void 0;
    var JOSEError = class extends Error {
      static get code() {
        return "ERR_JOSE_GENERIC";
      }
      constructor(message) {
        var _a;
        super(message);
        this.code = "ERR_JOSE_GENERIC";
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
      }
    };
    exports2.JOSEError = JOSEError;
    var JWTClaimValidationFailed = class extends JOSEError {
      static get code() {
        return "ERR_JWT_CLAIM_VALIDATION_FAILED";
      }
      constructor(message, claim = "unspecified", reason = "unspecified") {
        super(message);
        this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        this.claim = claim;
        this.reason = reason;
      }
    };
    exports2.JWTClaimValidationFailed = JWTClaimValidationFailed;
    var JWTExpired = class extends JOSEError {
      static get code() {
        return "ERR_JWT_EXPIRED";
      }
      constructor(message, claim = "unspecified", reason = "unspecified") {
        super(message);
        this.code = "ERR_JWT_EXPIRED";
        this.claim = claim;
        this.reason = reason;
      }
    };
    exports2.JWTExpired = JWTExpired;
    var JOSEAlgNotAllowed = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      static get code() {
        return "ERR_JOSE_ALG_NOT_ALLOWED";
      }
    };
    exports2.JOSEAlgNotAllowed = JOSEAlgNotAllowed;
    var JOSENotSupported = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JOSE_NOT_SUPPORTED";
      }
      static get code() {
        return "ERR_JOSE_NOT_SUPPORTED";
      }
    };
    exports2.JOSENotSupported = JOSENotSupported;
    var JWEDecryptionFailed = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWE_DECRYPTION_FAILED";
        this.message = "decryption operation failed";
      }
      static get code() {
        return "ERR_JWE_DECRYPTION_FAILED";
      }
    };
    exports2.JWEDecryptionFailed = JWEDecryptionFailed;
    var JWEDecompressionFailed = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWE_DECOMPRESSION_FAILED";
        this.message = "decompression operation failed";
      }
      static get code() {
        return "ERR_JWE_DECOMPRESSION_FAILED";
      }
    };
    exports2.JWEDecompressionFailed = JWEDecompressionFailed;
    var JWEInvalid = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWE_INVALID";
      }
      static get code() {
        return "ERR_JWE_INVALID";
      }
    };
    exports2.JWEInvalid = JWEInvalid;
    var JWSInvalid = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWS_INVALID";
      }
      static get code() {
        return "ERR_JWS_INVALID";
      }
    };
    exports2.JWSInvalid = JWSInvalid;
    var JWTInvalid = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWT_INVALID";
      }
      static get code() {
        return "ERR_JWT_INVALID";
      }
    };
    exports2.JWTInvalid = JWTInvalid;
    var JWKInvalid = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWK_INVALID";
      }
      static get code() {
        return "ERR_JWK_INVALID";
      }
    };
    exports2.JWKInvalid = JWKInvalid;
    var JWKSInvalid = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWKS_INVALID";
      }
      static get code() {
        return "ERR_JWKS_INVALID";
      }
    };
    exports2.JWKSInvalid = JWKSInvalid;
    var JWKSNoMatchingKey = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWKS_NO_MATCHING_KEY";
        this.message = "no applicable key found in the JSON Web Key Set";
      }
      static get code() {
        return "ERR_JWKS_NO_MATCHING_KEY";
      }
    };
    exports2.JWKSNoMatchingKey = JWKSNoMatchingKey;
    var JWKSMultipleMatchingKeys = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        this.message = "multiple matching keys found in the JSON Web Key Set";
      }
      static get code() {
        return "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
      }
    };
    exports2.JWKSMultipleMatchingKeys = JWKSMultipleMatchingKeys;
    var JWKSTimeout = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWKS_TIMEOUT";
        this.message = "request timed out";
      }
      static get code() {
        return "ERR_JWKS_TIMEOUT";
      }
    };
    exports2.JWKSTimeout = JWKSTimeout;
    var JWSSignatureVerificationFailed = class extends JOSEError {
      constructor() {
        super(...arguments);
        this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        this.message = "signature verification failed";
      }
      static get code() {
        return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
      }
    };
    exports2.JWSSignatureVerificationFailed = JWSSignatureVerificationFailed;
  }
});

// node_modules/jose/dist/node/cjs/runtime/random.js
var require_random = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/random.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = void 0;
    var crypto_1 = require("crypto");
    Object.defineProperty(exports2, "default", { enumerable: true, get: function() {
      return crypto_1.randomFillSync;
    } });
  }
});

// node_modules/jose/dist/node/cjs/lib/iv.js
var require_iv = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/iv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bitLength = void 0;
    var errors_js_1 = require_errors();
    var random_js_1 = require_random();
    function bitLength(alg) {
      switch (alg) {
        case "A128GCM":
        case "A128GCMKW":
        case "A192GCM":
        case "A192GCMKW":
        case "A256GCM":
        case "A256GCMKW":
          return 96;
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
          return 128;
        default:
          throw new errors_js_1.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
      }
    }
    exports2.bitLength = bitLength;
    exports2.default = (alg) => (0, random_js_1.default)(new Uint8Array(bitLength(alg) >> 3));
  }
});

// node_modules/jose/dist/node/cjs/lib/check_iv_length.js
var require_check_iv_length = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/check_iv_length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    var iv_js_1 = require_iv();
    var checkIvLength = (enc, iv) => {
      if (iv.length << 3 !== (0, iv_js_1.bitLength)(enc)) {
        throw new errors_js_1.JWEInvalid("Invalid Initialization Vector length");
      }
    };
    exports2.default = checkIvLength;
  }
});

// node_modules/jose/dist/node/cjs/runtime/is_key_object.js
var require_is_key_object = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/is_key_object.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var util = require("util");
    exports2.default = util.types.isKeyObject ? (obj) => util.types.isKeyObject(obj) : (obj) => obj != null && obj instanceof crypto_1.KeyObject;
  }
});

// node_modules/jose/dist/node/cjs/runtime/check_cek_length.js
var require_check_cek_length = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/check_cek_length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    var is_key_object_js_1 = require_is_key_object();
    var checkCekLength = (enc, cek) => {
      let expected;
      switch (enc) {
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
          expected = parseInt(enc.slice(-3), 10);
          break;
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
          expected = parseInt(enc.slice(1, 4), 10);
          break;
        default:
          throw new errors_js_1.JOSENotSupported(`Content Encryption Algorithm ${enc} is not supported either by JOSE or your javascript runtime`);
      }
      if (cek instanceof Uint8Array) {
        const actual = cek.byteLength << 3;
        if (actual !== expected) {
          throw new errors_js_1.JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
        }
        return;
      }
      if ((0, is_key_object_js_1.default)(cek) && cek.type === "secret") {
        const actual = cek.symmetricKeySize << 3;
        if (actual !== expected) {
          throw new errors_js_1.JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
        }
        return;
      }
      throw new TypeError("Invalid Content Encryption Key type");
    };
    exports2.default = checkCekLength;
  }
});

// node_modules/jose/dist/node/cjs/runtime/timing_safe_equal.js
var require_timing_safe_equal = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/timing_safe_equal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var timingSafeEqual = crypto_1.timingSafeEqual;
    exports2.default = timingSafeEqual;
  }
});

// node_modules/jose/dist/node/cjs/runtime/cbc_tag.js
var require_cbc_tag = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/cbc_tag.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var buffer_utils_js_1 = require_buffer_utils();
    function cbcTag(aad, iv, ciphertext, macSize, macKey, keySize) {
      const macData = (0, buffer_utils_js_1.concat)(aad, iv, ciphertext, (0, buffer_utils_js_1.uint64be)(aad.length << 3));
      const hmac = (0, crypto_1.createHmac)(`sha${macSize}`, macKey);
      hmac.update(macData);
      return hmac.digest().slice(0, keySize >> 3);
    }
    exports2.default = cbcTag;
  }
});

// node_modules/jose/dist/node/cjs/runtime/webcrypto.js
var require_webcrypto = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/webcrypto.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isCryptoKey = void 0;
    var crypto = require("crypto");
    var util = require("util");
    var webcrypto = crypto.webcrypto;
    exports2.default = webcrypto;
    exports2.isCryptoKey = util.types.isCryptoKey ? (key) => util.types.isCryptoKey(key) : (key) => false;
  }
});

// node_modules/jose/dist/node/cjs/lib/crypto_key.js
var require_crypto_key = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/crypto_key.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkEncCryptoKey = exports2.checkSigCryptoKey = void 0;
    function unusable(name, prop = "algorithm.name") {
      return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
    }
    function isAlgorithm(algorithm, name) {
      return algorithm.name === name;
    }
    function getHashLength(hash) {
      return parseInt(hash.name.slice(4), 10);
    }
    function getNamedCurve(alg) {
      switch (alg) {
        case "ES256":
          return "P-256";
        case "ES384":
          return "P-384";
        case "ES512":
          return "P-521";
        default:
          throw new Error("unreachable");
      }
    }
    function checkUsage(key, usages) {
      if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = "CryptoKey does not support this operation, its usages must include ";
        if (usages.length > 2) {
          const last = usages.pop();
          msg += `one of ${usages.join(", ")}, or ${last}.`;
        } else if (usages.length === 2) {
          msg += `one of ${usages[0]} or ${usages[1]}.`;
        } else {
          msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
      }
    }
    function checkSigCryptoKey(key, alg, ...usages) {
      switch (alg) {
        case "HS256":
        case "HS384":
        case "HS512": {
          if (!isAlgorithm(key.algorithm, "HMAC"))
            throw unusable("HMAC");
          const expected = parseInt(alg.slice(2), 10);
          const actual = getHashLength(key.algorithm.hash);
          if (actual !== expected)
            throw unusable(`SHA-${expected}`, "algorithm.hash");
          break;
        }
        case "RS256":
        case "RS384":
        case "RS512": {
          if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
            throw unusable("RSASSA-PKCS1-v1_5");
          const expected = parseInt(alg.slice(2), 10);
          const actual = getHashLength(key.algorithm.hash);
          if (actual !== expected)
            throw unusable(`SHA-${expected}`, "algorithm.hash");
          break;
        }
        case "PS256":
        case "PS384":
        case "PS512": {
          if (!isAlgorithm(key.algorithm, "RSA-PSS"))
            throw unusable("RSA-PSS");
          const expected = parseInt(alg.slice(2), 10);
          const actual = getHashLength(key.algorithm.hash);
          if (actual !== expected)
            throw unusable(`SHA-${expected}`, "algorithm.hash");
          break;
        }
        case "EdDSA": {
          if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
            throw unusable("Ed25519 or Ed448");
          }
          break;
        }
        case "ES256":
        case "ES384":
        case "ES512": {
          if (!isAlgorithm(key.algorithm, "ECDSA"))
            throw unusable("ECDSA");
          const expected = getNamedCurve(alg);
          const actual = key.algorithm.namedCurve;
          if (actual !== expected)
            throw unusable(expected, "algorithm.namedCurve");
          break;
        }
        default:
          throw new TypeError("CryptoKey does not support this operation");
      }
      checkUsage(key, usages);
    }
    exports2.checkSigCryptoKey = checkSigCryptoKey;
    function checkEncCryptoKey(key, alg, ...usages) {
      switch (alg) {
        case "A128GCM":
        case "A192GCM":
        case "A256GCM": {
          if (!isAlgorithm(key.algorithm, "AES-GCM"))
            throw unusable("AES-GCM");
          const expected = parseInt(alg.slice(1, 4), 10);
          const actual = key.algorithm.length;
          if (actual !== expected)
            throw unusable(expected, "algorithm.length");
          break;
        }
        case "A128KW":
        case "A192KW":
        case "A256KW": {
          if (!isAlgorithm(key.algorithm, "AES-KW"))
            throw unusable("AES-KW");
          const expected = parseInt(alg.slice(1, 4), 10);
          const actual = key.algorithm.length;
          if (actual !== expected)
            throw unusable(expected, "algorithm.length");
          break;
        }
        case "ECDH": {
          switch (key.algorithm.name) {
            case "ECDH":
            case "X25519":
            case "X448":
              break;
            default:
              throw unusable("ECDH, X25519, or X448");
          }
          break;
        }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
          if (!isAlgorithm(key.algorithm, "PBKDF2"))
            throw unusable("PBKDF2");
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512": {
          if (!isAlgorithm(key.algorithm, "RSA-OAEP"))
            throw unusable("RSA-OAEP");
          const expected = parseInt(alg.slice(9), 10) || 1;
          const actual = getHashLength(key.algorithm.hash);
          if (actual !== expected)
            throw unusable(`SHA-${expected}`, "algorithm.hash");
          break;
        }
        default:
          throw new TypeError("CryptoKey does not support this operation");
      }
      checkUsage(key, usages);
    }
    exports2.checkEncCryptoKey = checkEncCryptoKey;
  }
});

// node_modules/jose/dist/node/cjs/lib/invalid_key_input.js
var require_invalid_key_input = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/invalid_key_input.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.withAlg = void 0;
    function message(msg, actual, ...types) {
      if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(", ")}, or ${last}.`;
      } else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
      } else {
        msg += `of type ${types[0]}.`;
      }
      if (actual == null) {
        msg += ` Received ${actual}`;
      } else if (typeof actual === "function" && actual.name) {
        msg += ` Received function ${actual.name}`;
      } else if (typeof actual === "object" && actual != null) {
        if (actual.constructor && actual.constructor.name) {
          msg += ` Received an instance of ${actual.constructor.name}`;
        }
      }
      return msg;
    }
    exports2.default = (actual, ...types) => {
      return message("Key must be ", actual, ...types);
    };
    function withAlg(alg, actual, ...types) {
      return message(`Key for the ${alg} algorithm must be `, actual, ...types);
    }
    exports2.withAlg = withAlg;
  }
});

// node_modules/jose/dist/node/cjs/runtime/ciphers.js
var require_ciphers = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/ciphers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var ciphers;
    exports2.default = (algorithm) => {
      ciphers || (ciphers = new Set((0, crypto_1.getCiphers)()));
      return ciphers.has(algorithm);
    };
  }
});

// node_modules/jose/dist/node/cjs/runtime/is_key_like.js
var require_is_key_like = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/is_key_like.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.types = void 0;
    var webcrypto_js_1 = require_webcrypto();
    var is_key_object_js_1 = require_is_key_object();
    exports2.default = (key) => (0, is_key_object_js_1.default)(key) || (0, webcrypto_js_1.isCryptoKey)(key);
    var types = ["KeyObject"];
    exports2.types = types;
    if (globalThis.CryptoKey || (webcrypto_js_1.default === null || webcrypto_js_1.default === void 0 ? void 0 : webcrypto_js_1.default.CryptoKey)) {
      types.push("CryptoKey");
    }
  }
});

// node_modules/jose/dist/node/cjs/runtime/decrypt.js
var require_decrypt = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/decrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var check_iv_length_js_1 = require_check_iv_length();
    var check_cek_length_js_1 = require_check_cek_length();
    var buffer_utils_js_1 = require_buffer_utils();
    var errors_js_1 = require_errors();
    var timing_safe_equal_js_1 = require_timing_safe_equal();
    var cbc_tag_js_1 = require_cbc_tag();
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var ciphers_js_1 = require_ciphers();
    var is_key_like_js_1 = require_is_key_like();
    function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
      const keySize = parseInt(enc.slice(1, 4), 10);
      if ((0, is_key_object_js_1.default)(cek)) {
        cek = cek.export();
      }
      const encKey = cek.subarray(keySize >> 3);
      const macKey = cek.subarray(0, keySize >> 3);
      const macSize = parseInt(enc.slice(-3), 10);
      const algorithm = `aes-${keySize}-cbc`;
      if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
      }
      const expectedTag = (0, cbc_tag_js_1.default)(aad, iv, ciphertext, macSize, macKey, keySize);
      let macCheckPassed;
      try {
        macCheckPassed = (0, timing_safe_equal_js_1.default)(tag, expectedTag);
      } catch {
      }
      if (!macCheckPassed) {
        throw new errors_js_1.JWEDecryptionFailed();
      }
      let plaintext;
      try {
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, encKey, iv);
        plaintext = (0, buffer_utils_js_1.concat)(decipher.update(ciphertext), decipher.final());
      } catch {
      }
      if (!plaintext) {
        throw new errors_js_1.JWEDecryptionFailed();
      }
      return plaintext;
    }
    function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
      const keySize = parseInt(enc.slice(1, 4), 10);
      const algorithm = `aes-${keySize}-gcm`;
      if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
      }
      try {
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, cek, iv, { authTagLength: 16 });
        decipher.setAuthTag(tag);
        if (aad.byteLength) {
          decipher.setAAD(aad, { plaintextLength: ciphertext.length });
        }
        const plaintext = decipher.update(ciphertext);
        decipher.final();
        return plaintext;
      } catch {
        throw new errors_js_1.JWEDecryptionFailed();
      }
    }
    var decrypt = (enc, cek, ciphertext, iv, tag, aad) => {
      let key;
      if ((0, webcrypto_js_1.isCryptoKey)(cek)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(cek, enc, "decrypt");
        key = crypto_1.KeyObject.from(cek);
      } else if (cek instanceof Uint8Array || (0, is_key_object_js_1.default)(cek)) {
        key = cek;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(cek, ...is_key_like_js_1.types, "Uint8Array"));
      }
      (0, check_cek_length_js_1.default)(enc, key);
      (0, check_iv_length_js_1.default)(enc, iv);
      switch (enc) {
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
          return cbcDecrypt(enc, key, ciphertext, iv, tag, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
          return gcmDecrypt(enc, key, ciphertext, iv, tag, aad);
        default:
          throw new errors_js_1.JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
      }
    };
    exports2.default = decrypt;
  }
});

// node_modules/jose/dist/node/cjs/runtime/zlib.js
var require_zlib = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/zlib.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deflate = exports2.inflate = void 0;
    var util_1 = require("util");
    var zlib_1 = require("zlib");
    var errors_js_1 = require_errors();
    var inflateRaw = (0, util_1.promisify)(zlib_1.inflateRaw);
    var deflateRaw = (0, util_1.promisify)(zlib_1.deflateRaw);
    var inflate = (input) => inflateRaw(input, { maxOutputLength: 25e4 }).catch(() => {
      throw new errors_js_1.JWEDecompressionFailed();
    });
    exports2.inflate = inflate;
    var deflate = (input) => deflateRaw(input);
    exports2.deflate = deflate;
  }
});

// node_modules/jose/dist/node/cjs/lib/is_disjoint.js
var require_is_disjoint = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/is_disjoint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var isDisjoint = (...headers) => {
      const sources = headers.filter(Boolean);
      if (sources.length === 0 || sources.length === 1) {
        return true;
      }
      let acc;
      for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
          acc = new Set(parameters);
          continue;
        }
        for (const parameter of parameters) {
          if (acc.has(parameter)) {
            return false;
          }
          acc.add(parameter);
        }
      }
      return true;
    };
    exports2.default = isDisjoint;
  }
});

// node_modules/jose/dist/node/cjs/lib/is_object.js
var require_is_object = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/is_object.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function isObjectLike(value) {
      return typeof value === "object" && value !== null;
    }
    function isObject(input) {
      if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
        return false;
      }
      if (Object.getPrototypeOf(input) === null) {
        return true;
      }
      let proto = input;
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
      }
      return Object.getPrototypeOf(input) === proto;
    }
    exports2.default = isObject;
  }
});

// node_modules/jose/dist/node/cjs/runtime/aeskw.js
var require_aeskw = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/aeskw.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unwrap = exports2.wrap = void 0;
    var buffer_1 = require("buffer");
    var crypto_1 = require("crypto");
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var ciphers_js_1 = require_ciphers();
    var is_key_like_js_1 = require_is_key_like();
    function checkKeySize(key, alg) {
      if (key.symmetricKeySize << 3 !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
      }
    }
    function ensureKeyObject(key, alg, usage) {
      if ((0, is_key_object_js_1.default)(key)) {
        return key;
      }
      if (key instanceof Uint8Array) {
        return (0, crypto_1.createSecretKey)(key);
      }
      if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(key, alg, usage);
        return crypto_1.KeyObject.from(key);
      }
      throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
    }
    var wrap = (alg, key, cek) => {
      const size = parseInt(alg.slice(1, 4), 10);
      const algorithm = `aes${size}-wrap`;
      if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
      }
      const keyObject = ensureKeyObject(key, alg, "wrapKey");
      checkKeySize(keyObject, alg);
      const cipher = (0, crypto_1.createCipheriv)(algorithm, keyObject, buffer_1.Buffer.alloc(8, 166));
      return (0, buffer_utils_js_1.concat)(cipher.update(cek), cipher.final());
    };
    exports2.wrap = wrap;
    var unwrap = (alg, key, encryptedKey) => {
      const size = parseInt(alg.slice(1, 4), 10);
      const algorithm = `aes${size}-wrap`;
      if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
      }
      const keyObject = ensureKeyObject(key, alg, "unwrapKey");
      checkKeySize(keyObject, alg);
      const cipher = (0, crypto_1.createDecipheriv)(algorithm, keyObject, buffer_1.Buffer.alloc(8, 166));
      return (0, buffer_utils_js_1.concat)(cipher.update(encryptedKey), cipher.final());
    };
    exports2.unwrap = unwrap;
  }
});

// node_modules/jose/dist/node/cjs/runtime/get_named_curve.js
var require_get_named_curve = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/get_named_curve.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.setCurve = exports2.weakMap = void 0;
    var buffer_1 = require("buffer");
    var crypto_1 = require("crypto");
    var errors_js_1 = require_errors();
    var webcrypto_js_1 = require_webcrypto();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var p256 = buffer_1.Buffer.from([42, 134, 72, 206, 61, 3, 1, 7]);
    var p384 = buffer_1.Buffer.from([43, 129, 4, 0, 34]);
    var p521 = buffer_1.Buffer.from([43, 129, 4, 0, 35]);
    var secp256k1 = buffer_1.Buffer.from([43, 129, 4, 0, 10]);
    exports2.weakMap = /* @__PURE__ */ new WeakMap();
    var namedCurveToJOSE = (namedCurve) => {
      switch (namedCurve) {
        case "prime256v1":
          return "P-256";
        case "secp384r1":
          return "P-384";
        case "secp521r1":
          return "P-521";
        case "secp256k1":
          return "secp256k1";
        default:
          throw new errors_js_1.JOSENotSupported("Unsupported key curve for this operation");
      }
    };
    var getNamedCurve = (kee, raw) => {
      var _a;
      let key;
      if ((0, webcrypto_js_1.isCryptoKey)(kee)) {
        key = crypto_1.KeyObject.from(kee);
      } else if ((0, is_key_object_js_1.default)(kee)) {
        key = kee;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(kee, ...is_key_like_js_1.types));
      }
      if (key.type === "secret") {
        throw new TypeError('only "private" or "public" type keys can be used for this operation');
      }
      switch (key.asymmetricKeyType) {
        case "ed25519":
        case "ed448":
          return `Ed${key.asymmetricKeyType.slice(2)}`;
        case "x25519":
        case "x448":
          return `X${key.asymmetricKeyType.slice(1)}`;
        case "ec": {
          if (exports2.weakMap.has(key)) {
            return exports2.weakMap.get(key);
          }
          let namedCurve = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.namedCurve;
          if (!namedCurve && key.type === "private") {
            namedCurve = getNamedCurve((0, crypto_1.createPublicKey)(key), true);
          } else if (!namedCurve) {
            const buf = key.export({ format: "der", type: "spki" });
            const i = buf[1] < 128 ? 14 : 15;
            const len = buf[i];
            const curveOid = buf.slice(i + 1, i + 1 + len);
            if (curveOid.equals(p256)) {
              namedCurve = "prime256v1";
            } else if (curveOid.equals(p384)) {
              namedCurve = "secp384r1";
            } else if (curveOid.equals(p521)) {
              namedCurve = "secp521r1";
            } else if (curveOid.equals(secp256k1)) {
              namedCurve = "secp256k1";
            } else {
              throw new errors_js_1.JOSENotSupported("Unsupported key curve for this operation");
            }
          }
          if (raw)
            return namedCurve;
          const curve = namedCurveToJOSE(namedCurve);
          exports2.weakMap.set(key, curve);
          return curve;
        }
        default:
          throw new TypeError("Invalid asymmetric key type for this operation");
      }
    };
    function setCurve(keyObject, curve) {
      exports2.weakMap.set(keyObject, curve);
    }
    exports2.setCurve = setCurve;
    exports2.default = getNamedCurve;
  }
});

// node_modules/jose/dist/node/cjs/runtime/ecdhes.js
var require_ecdhes = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/ecdhes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ecdhAllowed = exports2.generateEpk = exports2.deriveKey = void 0;
    var crypto_1 = require("crypto");
    var util_1 = require("util");
    var get_named_curve_js_1 = require_get_named_curve();
    var buffer_utils_js_1 = require_buffer_utils();
    var errors_js_1 = require_errors();
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var generateKeyPair = (0, util_1.promisify)(crypto_1.generateKeyPair);
    async function deriveKey(publicKee, privateKee, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
      let publicKey;
      if ((0, webcrypto_js_1.isCryptoKey)(publicKee)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(publicKee, "ECDH");
        publicKey = crypto_1.KeyObject.from(publicKee);
      } else if ((0, is_key_object_js_1.default)(publicKee)) {
        publicKey = publicKee;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(publicKee, ...is_key_like_js_1.types));
      }
      let privateKey;
      if ((0, webcrypto_js_1.isCryptoKey)(privateKee)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(privateKee, "ECDH", "deriveBits");
        privateKey = crypto_1.KeyObject.from(privateKee);
      } else if ((0, is_key_object_js_1.default)(privateKee)) {
        privateKey = privateKee;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(privateKee, ...is_key_like_js_1.types));
      }
      const value = (0, buffer_utils_js_1.concat)((0, buffer_utils_js_1.lengthAndInput)(buffer_utils_js_1.encoder.encode(algorithm)), (0, buffer_utils_js_1.lengthAndInput)(apu), (0, buffer_utils_js_1.lengthAndInput)(apv), (0, buffer_utils_js_1.uint32be)(keyLength));
      const sharedSecret = (0, crypto_1.diffieHellman)({ privateKey, publicKey });
      return (0, buffer_utils_js_1.concatKdf)(sharedSecret, keyLength, value);
    }
    exports2.deriveKey = deriveKey;
    async function generateEpk(kee) {
      let key;
      if ((0, webcrypto_js_1.isCryptoKey)(kee)) {
        key = crypto_1.KeyObject.from(kee);
      } else if ((0, is_key_object_js_1.default)(kee)) {
        key = kee;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(kee, ...is_key_like_js_1.types));
      }
      switch (key.asymmetricKeyType) {
        case "x25519":
          return generateKeyPair("x25519");
        case "x448": {
          return generateKeyPair("x448");
        }
        case "ec": {
          const namedCurve = (0, get_named_curve_js_1.default)(key);
          return generateKeyPair("ec", { namedCurve });
        }
        default:
          throw new errors_js_1.JOSENotSupported("Invalid or unsupported EPK");
      }
    }
    exports2.generateEpk = generateEpk;
    var ecdhAllowed = (key) => ["P-256", "P-384", "P-521", "X25519", "X448"].includes((0, get_named_curve_js_1.default)(key));
    exports2.ecdhAllowed = ecdhAllowed;
  }
});

// node_modules/jose/dist/node/cjs/lib/check_p2s.js
var require_check_p2s = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/check_p2s.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    function checkP2s(p2s) {
      if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new errors_js_1.JWEInvalid("PBES2 Salt Input must be 8 or more octets");
      }
    }
    exports2.default = checkP2s;
  }
});

// node_modules/jose/dist/node/cjs/runtime/pbes2kw.js
var require_pbes2kw = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/pbes2kw.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decrypt = exports2.encrypt = void 0;
    var util_1 = require("util");
    var crypto_1 = require("crypto");
    var random_js_1 = require_random();
    var buffer_utils_js_1 = require_buffer_utils();
    var base64url_js_1 = require_base64url();
    var aeskw_js_1 = require_aeskw();
    var check_p2s_js_1 = require_check_p2s();
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var pbkdf2 = (0, util_1.promisify)(crypto_1.pbkdf2);
    function getPassword(key, alg) {
      if ((0, is_key_object_js_1.default)(key)) {
        return key.export();
      }
      if (key instanceof Uint8Array) {
        return key;
      }
      if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(key, alg, "deriveBits", "deriveKey");
        return crypto_1.KeyObject.from(key).export();
      }
      throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
    }
    var encrypt = async (alg, key, cek, p2c = 2048, p2s = (0, random_js_1.default)(new Uint8Array(16))) => {
      (0, check_p2s_js_1.default)(p2s);
      const salt = (0, buffer_utils_js_1.p2s)(alg, p2s);
      const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
      const password = getPassword(key, alg);
      const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
      const encryptedKey = await (0, aeskw_js_1.wrap)(alg.slice(-6), derivedKey, cek);
      return { encryptedKey, p2c, p2s: (0, base64url_js_1.encode)(p2s) };
    };
    exports2.encrypt = encrypt;
    var decrypt = async (alg, key, encryptedKey, p2c, p2s) => {
      (0, check_p2s_js_1.default)(p2s);
      const salt = (0, buffer_utils_js_1.p2s)(alg, p2s);
      const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
      const password = getPassword(key, alg);
      const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
      return (0, aeskw_js_1.unwrap)(alg.slice(-6), derivedKey, encryptedKey);
    };
    exports2.decrypt = decrypt;
  }
});

// node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js
var require_check_modulus_length = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.setModulusLength = exports2.weakMap = void 0;
    exports2.weakMap = /* @__PURE__ */ new WeakMap();
    var getLength = (buf, index) => {
      let len = buf.readUInt8(1);
      if ((len & 128) === 0) {
        if (index === 0) {
          return len;
        }
        return getLength(buf.subarray(2 + len), index - 1);
      }
      const num = len & 127;
      len = 0;
      for (let i = 0; i < num; i++) {
        len <<= 8;
        const j = buf.readUInt8(2 + i);
        len |= j;
      }
      if (index === 0) {
        return len;
      }
      return getLength(buf.subarray(2 + len), index - 1);
    };
    var getLengthOfSeqIndex = (sequence, index) => {
      const len = sequence.readUInt8(1);
      if ((len & 128) === 0) {
        return getLength(sequence.subarray(2), index);
      }
      const num = len & 127;
      return getLength(sequence.subarray(2 + num), index);
    };
    var getModulusLength = (key) => {
      var _a, _b;
      if (exports2.weakMap.has(key)) {
        return exports2.weakMap.get(key);
      }
      const modulusLength = (_b = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.modulusLength) !== null && _b !== void 0 ? _b : getLengthOfSeqIndex(key.export({ format: "der", type: "pkcs1" }), key.type === "private" ? 1 : 0) - 1 << 3;
      exports2.weakMap.set(key, modulusLength);
      return modulusLength;
    };
    var setModulusLength = (keyObject, modulusLength) => {
      exports2.weakMap.set(keyObject, modulusLength);
    };
    exports2.setModulusLength = setModulusLength;
    exports2.default = (key, alg) => {
      if (getModulusLength(key) < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
      }
    };
  }
});

// node_modules/jose/dist/node/cjs/runtime/rsaes.js
var require_rsaes = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/rsaes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decrypt = exports2.encrypt = void 0;
    var crypto_1 = require("crypto");
    var check_modulus_length_js_1 = require_check_modulus_length();
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var checkKey = (key, alg) => {
      if (key.asymmetricKeyType !== "rsa") {
        throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
      }
      (0, check_modulus_length_js_1.default)(key, alg);
    };
    var resolvePadding = (alg) => {
      switch (alg) {
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          return crypto_1.constants.RSA_PKCS1_OAEP_PADDING;
        case "RSA1_5":
          return crypto_1.constants.RSA_PKCS1_PADDING;
        default:
          return void 0;
      }
    };
    var resolveOaepHash = (alg) => {
      switch (alg) {
        case "RSA-OAEP":
          return "sha1";
        case "RSA-OAEP-256":
          return "sha256";
        case "RSA-OAEP-384":
          return "sha384";
        case "RSA-OAEP-512":
          return "sha512";
        default:
          return void 0;
      }
    };
    function ensureKeyObject(key, alg, ...usages) {
      if ((0, is_key_object_js_1.default)(key)) {
        return key;
      }
      if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(key, alg, ...usages);
        return crypto_1.KeyObject.from(key);
      }
      throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
    }
    var encrypt = (alg, key, cek) => {
      const padding = resolvePadding(alg);
      const oaepHash = resolveOaepHash(alg);
      const keyObject = ensureKeyObject(key, alg, "wrapKey", "encrypt");
      checkKey(keyObject, alg);
      return (0, crypto_1.publicEncrypt)({ key: keyObject, oaepHash, padding }, cek);
    };
    exports2.encrypt = encrypt;
    var decrypt = (alg, key, encryptedKey) => {
      const padding = resolvePadding(alg);
      const oaepHash = resolveOaepHash(alg);
      const keyObject = ensureKeyObject(key, alg, "unwrapKey", "decrypt");
      checkKey(keyObject, alg);
      return (0, crypto_1.privateDecrypt)({ key: keyObject, oaepHash, padding }, encryptedKey);
    };
    exports2.decrypt = decrypt;
  }
});

// node_modules/jose/dist/node/cjs/lib/cek.js
var require_cek = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/cek.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bitLength = void 0;
    var errors_js_1 = require_errors();
    var random_js_1 = require_random();
    function bitLength(alg) {
      switch (alg) {
        case "A128GCM":
          return 128;
        case "A192GCM":
          return 192;
        case "A256GCM":
        case "A128CBC-HS256":
          return 256;
        case "A192CBC-HS384":
          return 384;
        case "A256CBC-HS512":
          return 512;
        default:
          throw new errors_js_1.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
      }
    }
    exports2.bitLength = bitLength;
    exports2.default = (alg) => (0, random_js_1.default)(new Uint8Array(bitLength(alg) >> 3));
  }
});

// node_modules/jose/dist/node/cjs/runtime/asn1.js
var require_asn1 = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/asn1.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromX509 = exports2.fromSPKI = exports2.fromPKCS8 = exports2.toPKCS8 = exports2.toSPKI = void 0;
    var crypto_1 = require("crypto");
    var buffer_1 = require("buffer");
    var webcrypto_js_1 = require_webcrypto();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var genericExport = (keyType, keyFormat, key) => {
      let keyObject;
      if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        if (!key.extractable) {
          throw new TypeError("CryptoKey is not extractable");
        }
        keyObject = crypto_1.KeyObject.from(key);
      } else if ((0, is_key_object_js_1.default)(key)) {
        keyObject = key;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
      }
      if (keyObject.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
      }
      return keyObject.export({ format: "pem", type: keyFormat });
    };
    var toSPKI = (key) => {
      return genericExport("public", "spki", key);
    };
    exports2.toSPKI = toSPKI;
    var toPKCS8 = (key) => {
      return genericExport("private", "pkcs8", key);
    };
    exports2.toPKCS8 = toPKCS8;
    var fromPKCS8 = (pem) => (0, crypto_1.createPrivateKey)({
      key: buffer_1.Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, ""), "base64"),
      type: "pkcs8",
      format: "der"
    });
    exports2.fromPKCS8 = fromPKCS8;
    var fromSPKI = (pem) => (0, crypto_1.createPublicKey)({
      key: buffer_1.Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, ""), "base64"),
      type: "spki",
      format: "der"
    });
    exports2.fromSPKI = fromSPKI;
    var fromX509 = (pem) => (0, crypto_1.createPublicKey)({
      key: pem,
      type: "spki",
      format: "pem"
    });
    exports2.fromX509 = fromX509;
  }
});

// node_modules/jose/dist/node/cjs/runtime/asn1_sequence_encoder.js
var require_asn1_sequence_encoder = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/asn1_sequence_encoder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var buffer_1 = require("buffer");
    var errors_js_1 = require_errors();
    var tagInteger = 2;
    var tagBitStr = 3;
    var tagOctStr = 4;
    var tagSequence = 48;
    var bZero = buffer_1.Buffer.from([0]);
    var bTagInteger = buffer_1.Buffer.from([tagInteger]);
    var bTagBitStr = buffer_1.Buffer.from([tagBitStr]);
    var bTagSequence = buffer_1.Buffer.from([tagSequence]);
    var bTagOctStr = buffer_1.Buffer.from([tagOctStr]);
    var encodeLength = (len) => {
      if (len < 128)
        return buffer_1.Buffer.from([len]);
      const buffer = buffer_1.Buffer.alloc(5);
      buffer.writeUInt32BE(len, 1);
      let offset = 1;
      while (buffer[offset] === 0)
        offset++;
      buffer[offset - 1] = 128 | 5 - offset;
      return buffer.slice(offset - 1);
    };
    var oids = /* @__PURE__ */ new Map([
      ["P-256", buffer_1.Buffer.from("06 08 2A 86 48 CE 3D 03 01 07".replace(/ /g, ""), "hex")],
      ["secp256k1", buffer_1.Buffer.from("06 05 2B 81 04 00 0A".replace(/ /g, ""), "hex")],
      ["P-384", buffer_1.Buffer.from("06 05 2B 81 04 00 22".replace(/ /g, ""), "hex")],
      ["P-521", buffer_1.Buffer.from("06 05 2B 81 04 00 23".replace(/ /g, ""), "hex")],
      ["ecPublicKey", buffer_1.Buffer.from("06 07 2A 86 48 CE 3D 02 01".replace(/ /g, ""), "hex")],
      ["X25519", buffer_1.Buffer.from("06 03 2B 65 6E".replace(/ /g, ""), "hex")],
      ["X448", buffer_1.Buffer.from("06 03 2B 65 6F".replace(/ /g, ""), "hex")],
      ["Ed25519", buffer_1.Buffer.from("06 03 2B 65 70".replace(/ /g, ""), "hex")],
      ["Ed448", buffer_1.Buffer.from("06 03 2B 65 71".replace(/ /g, ""), "hex")]
    ]);
    var DumbAsn1Encoder = class {
      constructor() {
        this.length = 0;
        this.elements = [];
      }
      oidFor(oid) {
        const bOid = oids.get(oid);
        if (!bOid) {
          throw new errors_js_1.JOSENotSupported("Invalid or unsupported OID");
        }
        this.elements.push(bOid);
        this.length += bOid.length;
      }
      zero() {
        this.elements.push(bTagInteger, buffer_1.Buffer.from([1]), bZero);
        this.length += 3;
      }
      one() {
        this.elements.push(bTagInteger, buffer_1.Buffer.from([1]), buffer_1.Buffer.from([1]));
        this.length += 3;
      }
      unsignedInteger(integer) {
        if (integer[0] & 128) {
          const len = encodeLength(integer.length + 1);
          this.elements.push(bTagInteger, len, bZero, integer);
          this.length += 2 + len.length + integer.length;
        } else {
          let i = 0;
          while (integer[i] === 0 && (integer[i + 1] & 128) === 0)
            i++;
          const len = encodeLength(integer.length - i);
          this.elements.push(bTagInteger, encodeLength(integer.length - i), integer.slice(i));
          this.length += 1 + len.length + integer.length - i;
        }
      }
      octStr(octStr) {
        const len = encodeLength(octStr.length);
        this.elements.push(bTagOctStr, encodeLength(octStr.length), octStr);
        this.length += 1 + len.length + octStr.length;
      }
      bitStr(bitS) {
        const len = encodeLength(bitS.length + 1);
        this.elements.push(bTagBitStr, encodeLength(bitS.length + 1), bZero, bitS);
        this.length += 1 + len.length + bitS.length + 1;
      }
      add(seq) {
        this.elements.push(seq);
        this.length += seq.length;
      }
      end(tag = bTagSequence) {
        const len = encodeLength(this.length);
        return buffer_1.Buffer.concat([tag, len, ...this.elements], 1 + len.length + this.length);
      }
    };
    exports2.default = DumbAsn1Encoder;
  }
});

// node_modules/jose/dist/node/cjs/runtime/flags.js
var require_flags = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/flags.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.jwkImport = exports2.jwkExport = exports2.rsaPssParams = exports2.oneShotCallback = void 0;
    var [major, minor] = process.versions.node.split(".").map((str) => parseInt(str, 10));
    exports2.oneShotCallback = major >= 16 || major === 15 && minor >= 13;
    exports2.rsaPssParams = !("electron" in process.versions) && (major >= 17 || major === 16 && minor >= 9);
    exports2.jwkExport = major >= 16 || major === 15 && minor >= 9;
    exports2.jwkImport = major >= 16 || major === 15 && minor >= 12;
  }
});

// node_modules/jose/dist/node/cjs/runtime/jwk_to_key.js
var require_jwk_to_key = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/jwk_to_key.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var buffer_1 = require("buffer");
    var crypto_1 = require("crypto");
    var base64url_js_1 = require_base64url();
    var errors_js_1 = require_errors();
    var get_named_curve_js_1 = require_get_named_curve();
    var check_modulus_length_js_1 = require_check_modulus_length();
    var asn1_sequence_encoder_js_1 = require_asn1_sequence_encoder();
    var flags_js_1 = require_flags();
    var parse = (jwk) => {
      if (flags_js_1.jwkImport && jwk.kty !== "oct") {
        return jwk.d ? (0, crypto_1.createPrivateKey)({ format: "jwk", key: jwk }) : (0, crypto_1.createPublicKey)({ format: "jwk", key: jwk });
      }
      switch (jwk.kty) {
        case "oct": {
          return (0, crypto_1.createSecretKey)((0, base64url_js_1.decode)(jwk.k));
        }
        case "RSA": {
          const enc = new asn1_sequence_encoder_js_1.default();
          const isPrivate = jwk.d !== void 0;
          const modulus = buffer_1.Buffer.from(jwk.n, "base64");
          const exponent = buffer_1.Buffer.from(jwk.e, "base64");
          if (isPrivate) {
            enc.zero();
            enc.unsignedInteger(modulus);
            enc.unsignedInteger(exponent);
            enc.unsignedInteger(buffer_1.Buffer.from(jwk.d, "base64"));
            enc.unsignedInteger(buffer_1.Buffer.from(jwk.p, "base64"));
            enc.unsignedInteger(buffer_1.Buffer.from(jwk.q, "base64"));
            enc.unsignedInteger(buffer_1.Buffer.from(jwk.dp, "base64"));
            enc.unsignedInteger(buffer_1.Buffer.from(jwk.dq, "base64"));
            enc.unsignedInteger(buffer_1.Buffer.from(jwk.qi, "base64"));
          } else {
            enc.unsignedInteger(modulus);
            enc.unsignedInteger(exponent);
          }
          const der = enc.end();
          const createInput = {
            key: der,
            format: "der",
            type: "pkcs1"
          };
          const keyObject = isPrivate ? (0, crypto_1.createPrivateKey)(createInput) : (0, crypto_1.createPublicKey)(createInput);
          (0, check_modulus_length_js_1.setModulusLength)(keyObject, modulus.length << 3);
          return keyObject;
        }
        case "EC": {
          const enc = new asn1_sequence_encoder_js_1.default();
          const isPrivate = jwk.d !== void 0;
          const pub = buffer_1.Buffer.concat([
            buffer_1.Buffer.alloc(1, 4),
            buffer_1.Buffer.from(jwk.x, "base64"),
            buffer_1.Buffer.from(jwk.y, "base64")
          ]);
          if (isPrivate) {
            enc.zero();
            const enc$12 = new asn1_sequence_encoder_js_1.default();
            enc$12.oidFor("ecPublicKey");
            enc$12.oidFor(jwk.crv);
            enc.add(enc$12.end());
            const enc$2 = new asn1_sequence_encoder_js_1.default();
            enc$2.one();
            enc$2.octStr(buffer_1.Buffer.from(jwk.d, "base64"));
            const enc$3 = new asn1_sequence_encoder_js_1.default();
            enc$3.bitStr(pub);
            const f2 = enc$3.end(buffer_1.Buffer.from([161]));
            enc$2.add(f2);
            const f = enc$2.end();
            const enc$4 = new asn1_sequence_encoder_js_1.default();
            enc$4.add(f);
            const f3 = enc$4.end(buffer_1.Buffer.from([4]));
            enc.add(f3);
            const der2 = enc.end();
            const keyObject2 = (0, crypto_1.createPrivateKey)({ key: der2, format: "der", type: "pkcs8" });
            (0, get_named_curve_js_1.setCurve)(keyObject2, jwk.crv);
            return keyObject2;
          }
          const enc$1 = new asn1_sequence_encoder_js_1.default();
          enc$1.oidFor("ecPublicKey");
          enc$1.oidFor(jwk.crv);
          enc.add(enc$1.end());
          enc.bitStr(pub);
          const der = enc.end();
          const keyObject = (0, crypto_1.createPublicKey)({ key: der, format: "der", type: "spki" });
          (0, get_named_curve_js_1.setCurve)(keyObject, jwk.crv);
          return keyObject;
        }
        case "OKP": {
          const enc = new asn1_sequence_encoder_js_1.default();
          const isPrivate = jwk.d !== void 0;
          if (isPrivate) {
            enc.zero();
            const enc$12 = new asn1_sequence_encoder_js_1.default();
            enc$12.oidFor(jwk.crv);
            enc.add(enc$12.end());
            const enc$2 = new asn1_sequence_encoder_js_1.default();
            enc$2.octStr(buffer_1.Buffer.from(jwk.d, "base64"));
            const f = enc$2.end(buffer_1.Buffer.from([4]));
            enc.add(f);
            const der2 = enc.end();
            return (0, crypto_1.createPrivateKey)({ key: der2, format: "der", type: "pkcs8" });
          }
          const enc$1 = new asn1_sequence_encoder_js_1.default();
          enc$1.oidFor(jwk.crv);
          enc.add(enc$1.end());
          enc.bitStr(buffer_1.Buffer.from(jwk.x, "base64"));
          const der = enc.end();
          return (0, crypto_1.createPublicKey)({ key: der, format: "der", type: "spki" });
        }
        default:
          throw new errors_js_1.JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
      }
    };
    exports2.default = parse;
  }
});

// node_modules/jose/dist/node/cjs/key/import.js
var require_import = __commonJS({
  "node_modules/jose/dist/node/cjs/key/import.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.importJWK = exports2.importPKCS8 = exports2.importX509 = exports2.importSPKI = void 0;
    var base64url_js_1 = require_base64url();
    var asn1_js_1 = require_asn1();
    var jwk_to_key_js_1 = require_jwk_to_key();
    var errors_js_1 = require_errors();
    var is_object_js_1 = require_is_object();
    async function importSPKI(spki, alg, options) {
      if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
      }
      return (0, asn1_js_1.fromSPKI)(spki, alg, options);
    }
    exports2.importSPKI = importSPKI;
    async function importX509(x509, alg, options) {
      if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
      }
      return (0, asn1_js_1.fromX509)(x509, alg, options);
    }
    exports2.importX509 = importX509;
    async function importPKCS8(pkcs8, alg, options) {
      if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
        throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
      }
      return (0, asn1_js_1.fromPKCS8)(pkcs8, alg, options);
    }
    exports2.importPKCS8 = importPKCS8;
    async function importJWK(jwk, alg, octAsKeyObject) {
      var _a;
      if (!(0, is_object_js_1.default)(jwk)) {
        throw new TypeError("JWK must be an object");
      }
      alg || (alg = jwk.alg);
      switch (jwk.kty) {
        case "oct":
          if (typeof jwk.k !== "string" || !jwk.k) {
            throw new TypeError('missing "k" (Key Value) Parameter value');
          }
          octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : octAsKeyObject = jwk.ext !== true;
          if (octAsKeyObject) {
            return (0, jwk_to_key_js_1.default)({ ...jwk, alg, ext: (_a = jwk.ext) !== null && _a !== void 0 ? _a : false });
          }
          return (0, base64url_js_1.decode)(jwk.k);
        case "RSA":
          if (jwk.oth !== void 0) {
            throw new errors_js_1.JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          }
        case "EC":
        case "OKP":
          return (0, jwk_to_key_js_1.default)({ ...jwk, alg });
        default:
          throw new errors_js_1.JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
      }
    }
    exports2.importJWK = importJWK;
  }
});

// node_modules/jose/dist/node/cjs/lib/check_key_type.js
var require_check_key_type = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/check_key_type.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var symmetricTypeCheck = (alg, key) => {
      if (key instanceof Uint8Array)
        return;
      if (!(0, is_key_like_js_1.default)(key)) {
        throw new TypeError((0, invalid_key_input_js_1.withAlg)(alg, key, ...is_key_like_js_1.types, "Uint8Array"));
      }
      if (key.type !== "secret") {
        throw new TypeError(`${is_key_like_js_1.types.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
      }
    };
    var asymmetricTypeCheck = (alg, key, usage) => {
      if (!(0, is_key_like_js_1.default)(key)) {
        throw new TypeError((0, invalid_key_input_js_1.withAlg)(alg, key, ...is_key_like_js_1.types));
      }
      if (key.type === "secret") {
        throw new TypeError(`${is_key_like_js_1.types.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
      }
      if (usage === "sign" && key.type === "public") {
        throw new TypeError(`${is_key_like_js_1.types.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
      }
      if (usage === "decrypt" && key.type === "public") {
        throw new TypeError(`${is_key_like_js_1.types.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
      }
      if (key.algorithm && usage === "verify" && key.type === "private") {
        throw new TypeError(`${is_key_like_js_1.types.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
      }
      if (key.algorithm && usage === "encrypt" && key.type === "private") {
        throw new TypeError(`${is_key_like_js_1.types.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
      }
    };
    var checkKeyType = (alg, key, usage) => {
      const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
      if (symmetric) {
        symmetricTypeCheck(alg, key);
      } else {
        asymmetricTypeCheck(alg, key, usage);
      }
    };
    exports2.default = checkKeyType;
  }
});

// node_modules/jose/dist/node/cjs/runtime/encrypt.js
var require_encrypt = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/encrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var check_iv_length_js_1 = require_check_iv_length();
    var check_cek_length_js_1 = require_check_cek_length();
    var buffer_utils_js_1 = require_buffer_utils();
    var cbc_tag_js_1 = require_cbc_tag();
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var errors_js_1 = require_errors();
    var ciphers_js_1 = require_ciphers();
    var is_key_like_js_1 = require_is_key_like();
    function cbcEncrypt(enc, plaintext, cek, iv, aad) {
      const keySize = parseInt(enc.slice(1, 4), 10);
      if ((0, is_key_object_js_1.default)(cek)) {
        cek = cek.export();
      }
      const encKey = cek.subarray(keySize >> 3);
      const macKey = cek.subarray(0, keySize >> 3);
      const algorithm = `aes-${keySize}-cbc`;
      if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
      }
      const cipher = (0, crypto_1.createCipheriv)(algorithm, encKey, iv);
      const ciphertext = (0, buffer_utils_js_1.concat)(cipher.update(plaintext), cipher.final());
      const macSize = parseInt(enc.slice(-3), 10);
      const tag = (0, cbc_tag_js_1.default)(aad, iv, ciphertext, macSize, macKey, keySize);
      return { ciphertext, tag };
    }
    function gcmEncrypt(enc, plaintext, cek, iv, aad) {
      const keySize = parseInt(enc.slice(1, 4), 10);
      const algorithm = `aes-${keySize}-gcm`;
      if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
      }
      const cipher = (0, crypto_1.createCipheriv)(algorithm, cek, iv, { authTagLength: 16 });
      if (aad.byteLength) {
        cipher.setAAD(aad, { plaintextLength: plaintext.length });
      }
      const ciphertext = cipher.update(plaintext);
      cipher.final();
      const tag = cipher.getAuthTag();
      return { ciphertext, tag };
    }
    var encrypt = (enc, plaintext, cek, iv, aad) => {
      let key;
      if ((0, webcrypto_js_1.isCryptoKey)(cek)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(cek, enc, "encrypt");
        key = crypto_1.KeyObject.from(cek);
      } else if (cek instanceof Uint8Array || (0, is_key_object_js_1.default)(cek)) {
        key = cek;
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(cek, ...is_key_like_js_1.types, "Uint8Array"));
      }
      (0, check_cek_length_js_1.default)(enc, key);
      (0, check_iv_length_js_1.default)(enc, iv);
      switch (enc) {
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
          return cbcEncrypt(enc, plaintext, key, iv, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
          return gcmEncrypt(enc, plaintext, key, iv, aad);
        default:
          throw new errors_js_1.JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
      }
    };
    exports2.default = encrypt;
  }
});

// node_modules/jose/dist/node/cjs/lib/aesgcmkw.js
var require_aesgcmkw = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/aesgcmkw.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unwrap = exports2.wrap = void 0;
    var encrypt_js_1 = require_encrypt();
    var decrypt_js_1 = require_decrypt();
    var iv_js_1 = require_iv();
    var base64url_js_1 = require_base64url();
    async function wrap(alg, key, cek, iv) {
      const jweAlgorithm = alg.slice(0, 7);
      iv || (iv = (0, iv_js_1.default)(jweAlgorithm));
      const { ciphertext: encryptedKey, tag } = await (0, encrypt_js_1.default)(jweAlgorithm, cek, key, iv, new Uint8Array(0));
      return { encryptedKey, iv: (0, base64url_js_1.encode)(iv), tag: (0, base64url_js_1.encode)(tag) };
    }
    exports2.wrap = wrap;
    async function unwrap(alg, key, encryptedKey, iv, tag) {
      const jweAlgorithm = alg.slice(0, 7);
      return (0, decrypt_js_1.default)(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
    }
    exports2.unwrap = unwrap;
  }
});

// node_modules/jose/dist/node/cjs/lib/decrypt_key_management.js
var require_decrypt_key_management = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/decrypt_key_management.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var aeskw_js_1 = require_aeskw();
    var ECDH = require_ecdhes();
    var pbes2kw_js_1 = require_pbes2kw();
    var rsaes_js_1 = require_rsaes();
    var base64url_js_1 = require_base64url();
    var errors_js_1 = require_errors();
    var cek_js_1 = require_cek();
    var import_js_1 = require_import();
    var check_key_type_js_1 = require_check_key_type();
    var is_object_js_1 = require_is_object();
    var aesgcmkw_js_1 = require_aesgcmkw();
    async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
      (0, check_key_type_js_1.default)(alg, key, "decrypt");
      switch (alg) {
        case "dir": {
          if (encryptedKey !== void 0)
            throw new errors_js_1.JWEInvalid("Encountered unexpected JWE Encrypted Key");
          return key;
        }
        case "ECDH-ES":
          if (encryptedKey !== void 0)
            throw new errors_js_1.JWEInvalid("Encountered unexpected JWE Encrypted Key");
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW": {
          if (!(0, is_object_js_1.default)(joseHeader.epk))
            throw new errors_js_1.JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
          if (!ECDH.ecdhAllowed(key))
            throw new errors_js_1.JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
          const epk = await (0, import_js_1.importJWK)(joseHeader.epk, alg);
          let partyUInfo;
          let partyVInfo;
          if (joseHeader.apu !== void 0) {
            if (typeof joseHeader.apu !== "string")
              throw new errors_js_1.JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
            try {
              partyUInfo = (0, base64url_js_1.decode)(joseHeader.apu);
            } catch {
              throw new errors_js_1.JWEInvalid("Failed to base64url decode the apu");
            }
          }
          if (joseHeader.apv !== void 0) {
            if (typeof joseHeader.apv !== "string")
              throw new errors_js_1.JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
            try {
              partyVInfo = (0, base64url_js_1.decode)(joseHeader.apv);
            } catch {
              throw new errors_js_1.JWEInvalid("Failed to base64url decode the apv");
            }
          }
          const sharedSecret = await ECDH.deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? (0, cek_js_1.bitLength)(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
          if (alg === "ECDH-ES")
            return sharedSecret;
          if (encryptedKey === void 0)
            throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
          return (0, aeskw_js_1.unwrap)(alg.slice(-6), sharedSecret, encryptedKey);
        }
        case "RSA1_5":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512": {
          if (encryptedKey === void 0)
            throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
          return (0, rsaes_js_1.decrypt)(alg, key, encryptedKey);
        }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW": {
          if (encryptedKey === void 0)
            throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
          if (typeof joseHeader.p2c !== "number")
            throw new errors_js_1.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
          const p2cLimit = (options === null || options === void 0 ? void 0 : options.maxPBES2Count) || 1e4;
          if (joseHeader.p2c > p2cLimit)
            throw new errors_js_1.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
          if (typeof joseHeader.p2s !== "string")
            throw new errors_js_1.JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
          let p2s;
          try {
            p2s = (0, base64url_js_1.decode)(joseHeader.p2s);
          } catch {
            throw new errors_js_1.JWEInvalid("Failed to base64url decode the p2s");
          }
          return (0, pbes2kw_js_1.decrypt)(alg, key, encryptedKey, joseHeader.p2c, p2s);
        }
        case "A128KW":
        case "A192KW":
        case "A256KW": {
          if (encryptedKey === void 0)
            throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
          return (0, aeskw_js_1.unwrap)(alg, key, encryptedKey);
        }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW": {
          if (encryptedKey === void 0)
            throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
          if (typeof joseHeader.iv !== "string")
            throw new errors_js_1.JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
          if (typeof joseHeader.tag !== "string")
            throw new errors_js_1.JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
          let iv;
          try {
            iv = (0, base64url_js_1.decode)(joseHeader.iv);
          } catch {
            throw new errors_js_1.JWEInvalid("Failed to base64url decode the iv");
          }
          let tag;
          try {
            tag = (0, base64url_js_1.decode)(joseHeader.tag);
          } catch {
            throw new errors_js_1.JWEInvalid("Failed to base64url decode the tag");
          }
          return (0, aesgcmkw_js_1.unwrap)(alg, key, encryptedKey, iv, tag);
        }
        default: {
          throw new errors_js_1.JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
    }
    exports2.default = decryptKeyManagement;
  }
});

// node_modules/jose/dist/node/cjs/lib/validate_crit.js
var require_validate_crit = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/validate_crit.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
      if (joseHeader.crit !== void 0 && protectedHeader.crit === void 0) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
      }
      if (!protectedHeader || protectedHeader.crit === void 0) {
        return /* @__PURE__ */ new Set();
      }
      if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
      }
      let recognized;
      if (recognizedOption !== void 0) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
      } else {
        recognized = recognizedDefault;
      }
      for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
          throw new errors_js_1.JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === void 0) {
          throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        } else if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
          throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
      }
      return new Set(protectedHeader.crit);
    }
    exports2.default = validateCrit;
  }
});

// node_modules/jose/dist/node/cjs/lib/validate_algorithms.js
var require_validate_algorithms = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/validate_algorithms.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var validateAlgorithms = (option, algorithms) => {
      if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
      }
      if (!algorithms) {
        return void 0;
      }
      return new Set(algorithms);
    };
    exports2.default = validateAlgorithms;
  }
});

// node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js
var require_decrypt2 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.flattenedDecrypt = void 0;
    var base64url_js_1 = require_base64url();
    var decrypt_js_1 = require_decrypt();
    var zlib_js_1 = require_zlib();
    var errors_js_1 = require_errors();
    var is_disjoint_js_1 = require_is_disjoint();
    var is_object_js_1 = require_is_object();
    var decrypt_key_management_js_1 = require_decrypt_key_management();
    var buffer_utils_js_1 = require_buffer_utils();
    var cek_js_1 = require_cek();
    var validate_crit_js_1 = require_validate_crit();
    var validate_algorithms_js_1 = require_validate_algorithms();
    async function flattenedDecrypt(jwe, key, options) {
      var _a;
      if (!(0, is_object_js_1.default)(jwe)) {
        throw new errors_js_1.JWEInvalid("Flattened JWE must be an object");
      }
      if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) {
        throw new errors_js_1.JWEInvalid("JOSE Header missing");
      }
      if (typeof jwe.iv !== "string") {
        throw new errors_js_1.JWEInvalid("JWE Initialization Vector missing or incorrect type");
      }
      if (typeof jwe.ciphertext !== "string") {
        throw new errors_js_1.JWEInvalid("JWE Ciphertext missing or incorrect type");
      }
      if (typeof jwe.tag !== "string") {
        throw new errors_js_1.JWEInvalid("JWE Authentication Tag missing or incorrect type");
      }
      if (jwe.protected !== void 0 && typeof jwe.protected !== "string") {
        throw new errors_js_1.JWEInvalid("JWE Protected Header incorrect type");
      }
      if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") {
        throw new errors_js_1.JWEInvalid("JWE Encrypted Key incorrect type");
      }
      if (jwe.aad !== void 0 && typeof jwe.aad !== "string") {
        throw new errors_js_1.JWEInvalid("JWE AAD incorrect type");
      }
      if (jwe.header !== void 0 && !(0, is_object_js_1.default)(jwe.header)) {
        throw new errors_js_1.JWEInvalid("JWE Shared Unprotected Header incorrect type");
      }
      if (jwe.unprotected !== void 0 && !(0, is_object_js_1.default)(jwe.unprotected)) {
        throw new errors_js_1.JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
      }
      let parsedProt;
      if (jwe.protected) {
        try {
          const protectedHeader2 = (0, base64url_js_1.decode)(jwe.protected);
          parsedProt = JSON.parse(buffer_utils_js_1.decoder.decode(protectedHeader2));
        } catch {
          throw new errors_js_1.JWEInvalid("JWE Protected Header is invalid");
        }
      }
      if (!(0, is_disjoint_js_1.default)(parsedProt, jwe.header, jwe.unprotected)) {
        throw new errors_js_1.JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
      }
      const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected
      };
      (0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, /* @__PURE__ */ new Map(), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
      if (joseHeader.zip !== void 0) {
        if (!parsedProt || !parsedProt.zip) {
          throw new errors_js_1.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
        }
        if (joseHeader.zip !== "DEF") {
          throw new errors_js_1.JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
      }
      const { alg, enc } = joseHeader;
      if (typeof alg !== "string" || !alg) {
        throw new errors_js_1.JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
      }
      if (typeof enc !== "string" || !enc) {
        throw new errors_js_1.JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
      }
      const keyManagementAlgorithms = options && (0, validate_algorithms_js_1.default)("keyManagementAlgorithms", options.keyManagementAlgorithms);
      const contentEncryptionAlgorithms = options && (0, validate_algorithms_js_1.default)("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
      if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) {
        throw new errors_js_1.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
      }
      if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new errors_js_1.JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter not allowed');
      }
      let encryptedKey;
      if (jwe.encrypted_key !== void 0) {
        try {
          encryptedKey = (0, base64url_js_1.decode)(jwe.encrypted_key);
        } catch {
          throw new errors_js_1.JWEInvalid("Failed to base64url decode the encrypted_key");
        }
      }
      let resolvedKey = false;
      if (typeof key === "function") {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
      }
      let cek;
      try {
        cek = await (0, decrypt_key_management_js_1.default)(alg, key, encryptedKey, joseHeader, options);
      } catch (err) {
        if (err instanceof TypeError || err instanceof errors_js_1.JWEInvalid || err instanceof errors_js_1.JOSENotSupported) {
          throw err;
        }
        cek = (0, cek_js_1.default)(enc);
      }
      let iv;
      let tag;
      try {
        iv = (0, base64url_js_1.decode)(jwe.iv);
      } catch {
        throw new errors_js_1.JWEInvalid("Failed to base64url decode the iv");
      }
      try {
        tag = (0, base64url_js_1.decode)(jwe.tag);
      } catch {
        throw new errors_js_1.JWEInvalid("Failed to base64url decode the tag");
      }
      const protectedHeader = buffer_utils_js_1.encoder.encode((_a = jwe.protected) !== null && _a !== void 0 ? _a : "");
      let additionalData;
      if (jwe.aad !== void 0) {
        additionalData = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode("."), buffer_utils_js_1.encoder.encode(jwe.aad));
      } else {
        additionalData = protectedHeader;
      }
      let ciphertext;
      try {
        ciphertext = (0, base64url_js_1.decode)(jwe.ciphertext);
      } catch {
        throw new errors_js_1.JWEInvalid("Failed to base64url decode the ciphertext");
      }
      let plaintext = await (0, decrypt_js_1.default)(enc, cek, ciphertext, iv, tag, additionalData);
      if (joseHeader.zip === "DEF") {
        plaintext = await ((options === null || options === void 0 ? void 0 : options.inflateRaw) || zlib_js_1.inflate)(plaintext);
      }
      const result = { plaintext };
      if (jwe.protected !== void 0) {
        result.protectedHeader = parsedProt;
      }
      if (jwe.aad !== void 0) {
        try {
          result.additionalAuthenticatedData = (0, base64url_js_1.decode)(jwe.aad);
        } catch {
          throw new errors_js_1.JWEInvalid("Failed to base64url decode the aad");
        }
      }
      if (jwe.unprotected !== void 0) {
        result.sharedUnprotectedHeader = jwe.unprotected;
      }
      if (jwe.header !== void 0) {
        result.unprotectedHeader = jwe.header;
      }
      if (resolvedKey) {
        return { ...result, key };
      }
      return result;
    }
    exports2.flattenedDecrypt = flattenedDecrypt;
  }
});

// node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js
var require_decrypt3 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.compactDecrypt = void 0;
    var decrypt_js_1 = require_decrypt2();
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    async function compactDecrypt(jwe, key, options) {
      if (jwe instanceof Uint8Array) {
        jwe = buffer_utils_js_1.decoder.decode(jwe);
      }
      if (typeof jwe !== "string") {
        throw new errors_js_1.JWEInvalid("Compact JWE must be a string or Uint8Array");
      }
      const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
      if (length !== 5) {
        throw new errors_js_1.JWEInvalid("Invalid Compact JWE");
      }
      const decrypted = await (0, decrypt_js_1.flattenedDecrypt)({
        ciphertext,
        iv: iv || void 0,
        protected: protectedHeader || void 0,
        tag: tag || void 0,
        encrypted_key: encryptedKey || void 0
      }, key, options);
      const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
      if (typeof key === "function") {
        return { ...result, key: decrypted.key };
      }
      return result;
    }
    exports2.compactDecrypt = compactDecrypt;
  }
});

// node_modules/jose/dist/node/cjs/jwe/general/decrypt.js
var require_decrypt4 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwe/general/decrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generalDecrypt = void 0;
    var decrypt_js_1 = require_decrypt2();
    var errors_js_1 = require_errors();
    var is_object_js_1 = require_is_object();
    async function generalDecrypt(jwe, key, options) {
      if (!(0, is_object_js_1.default)(jwe)) {
        throw new errors_js_1.JWEInvalid("General JWE must be an object");
      }
      if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(is_object_js_1.default)) {
        throw new errors_js_1.JWEInvalid("JWE Recipients missing or incorrect type");
      }
      if (!jwe.recipients.length) {
        throw new errors_js_1.JWEInvalid("JWE Recipients has no members");
      }
      for (const recipient of jwe.recipients) {
        try {
          return await (0, decrypt_js_1.flattenedDecrypt)({
            aad: jwe.aad,
            ciphertext: jwe.ciphertext,
            encrypted_key: recipient.encrypted_key,
            header: recipient.header,
            iv: jwe.iv,
            protected: jwe.protected,
            tag: jwe.tag,
            unprotected: jwe.unprotected
          }, key, options);
        } catch {
        }
      }
      throw new errors_js_1.JWEDecryptionFailed();
    }
    exports2.generalDecrypt = generalDecrypt;
  }
});

// node_modules/jose/dist/node/cjs/runtime/asn1_sequence_decoder.js
var require_asn1_sequence_decoder = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/asn1_sequence_decoder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tagInteger = 2;
    var tagSequence = 48;
    var Asn1SequenceDecoder = class {
      constructor(buffer) {
        if (buffer[0] !== tagSequence) {
          throw new TypeError();
        }
        this.buffer = buffer;
        this.offset = 1;
        const len = this.decodeLength();
        if (len !== buffer.length - this.offset) {
          throw new TypeError();
        }
      }
      decodeLength() {
        let length = this.buffer[this.offset++];
        if (length & 128) {
          const nBytes = length & ~128;
          length = 0;
          for (let i = 0; i < nBytes; i++)
            length = length << 8 | this.buffer[this.offset + i];
          this.offset += nBytes;
        }
        return length;
      }
      unsignedInteger() {
        if (this.buffer[this.offset++] !== tagInteger) {
          throw new TypeError();
        }
        let length = this.decodeLength();
        if (this.buffer[this.offset] === 0) {
          this.offset++;
          length--;
        }
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      end() {
        if (this.offset !== this.buffer.length) {
          throw new TypeError();
        }
      }
    };
    exports2.default = Asn1SequenceDecoder;
  }
});

// node_modules/jose/dist/node/cjs/runtime/key_to_jwk.js
var require_key_to_jwk = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/key_to_jwk.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var base64url_js_1 = require_base64url();
    var asn1_sequence_decoder_js_1 = require_asn1_sequence_decoder();
    var errors_js_1 = require_errors();
    var get_named_curve_js_1 = require_get_named_curve();
    var webcrypto_js_1 = require_webcrypto();
    var is_key_object_js_1 = require_is_key_object();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    var flags_js_1 = require_flags();
    var keyToJWK = (key) => {
      let keyObject;
      if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        if (!key.extractable) {
          throw new TypeError("CryptoKey is not extractable");
        }
        keyObject = crypto_1.KeyObject.from(key);
      } else if ((0, is_key_object_js_1.default)(key)) {
        keyObject = key;
      } else if (key instanceof Uint8Array) {
        return {
          kty: "oct",
          k: (0, base64url_js_1.encode)(key)
        };
      } else {
        throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
      }
      if (flags_js_1.jwkExport) {
        if (keyObject.type !== "secret" && !["rsa", "ec", "ed25519", "x25519", "ed448", "x448"].includes(keyObject.asymmetricKeyType)) {
          throw new errors_js_1.JOSENotSupported("Unsupported key asymmetricKeyType");
        }
        return keyObject.export({ format: "jwk" });
      }
      switch (keyObject.type) {
        case "secret":
          return {
            kty: "oct",
            k: (0, base64url_js_1.encode)(keyObject.export())
          };
        case "private":
        case "public": {
          switch (keyObject.asymmetricKeyType) {
            case "rsa": {
              const der = keyObject.export({ format: "der", type: "pkcs1" });
              const dec = new asn1_sequence_decoder_js_1.default(der);
              if (keyObject.type === "private") {
                dec.unsignedInteger();
              }
              const n = (0, base64url_js_1.encode)(dec.unsignedInteger());
              const e = (0, base64url_js_1.encode)(dec.unsignedInteger());
              let jwk;
              if (keyObject.type === "private") {
                jwk = {
                  d: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                  p: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                  q: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                  dp: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                  dq: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                  qi: (0, base64url_js_1.encode)(dec.unsignedInteger())
                };
              }
              dec.end();
              return { kty: "RSA", n, e, ...jwk };
            }
            case "ec": {
              const crv = (0, get_named_curve_js_1.default)(keyObject);
              let len;
              let offset;
              let correction;
              switch (crv) {
                case "secp256k1":
                  len = 64;
                  offset = 31 + 2;
                  correction = -1;
                  break;
                case "P-256":
                  len = 64;
                  offset = 34 + 2;
                  correction = -1;
                  break;
                case "P-384":
                  len = 96;
                  offset = 33 + 2;
                  correction = -3;
                  break;
                case "P-521":
                  len = 132;
                  offset = 33 + 2;
                  correction = -3;
                  break;
                default:
                  throw new errors_js_1.JOSENotSupported("Unsupported curve");
              }
              if (keyObject.type === "public") {
                const der2 = keyObject.export({ type: "spki", format: "der" });
                return {
                  kty: "EC",
                  crv,
                  x: (0, base64url_js_1.encode)(der2.subarray(-len, -len / 2)),
                  y: (0, base64url_js_1.encode)(der2.subarray(-len / 2))
                };
              }
              const der = keyObject.export({ type: "pkcs8", format: "der" });
              if (der.length < 100) {
                offset += correction;
              }
              return {
                ...keyToJWK((0, crypto_1.createPublicKey)(keyObject)),
                d: (0, base64url_js_1.encode)(der.subarray(offset, offset + len / 2))
              };
            }
            case "ed25519":
            case "x25519": {
              const crv = (0, get_named_curve_js_1.default)(keyObject);
              if (keyObject.type === "public") {
                const der2 = keyObject.export({ type: "spki", format: "der" });
                return {
                  kty: "OKP",
                  crv,
                  x: (0, base64url_js_1.encode)(der2.subarray(-32))
                };
              }
              const der = keyObject.export({ type: "pkcs8", format: "der" });
              return {
                ...keyToJWK((0, crypto_1.createPublicKey)(keyObject)),
                d: (0, base64url_js_1.encode)(der.subarray(-32))
              };
            }
            case "ed448":
            case "x448": {
              const crv = (0, get_named_curve_js_1.default)(keyObject);
              if (keyObject.type === "public") {
                const der2 = keyObject.export({ type: "spki", format: "der" });
                return {
                  kty: "OKP",
                  crv,
                  x: (0, base64url_js_1.encode)(der2.subarray(crv === "Ed448" ? -57 : -56))
                };
              }
              const der = keyObject.export({ type: "pkcs8", format: "der" });
              return {
                ...keyToJWK((0, crypto_1.createPublicKey)(keyObject)),
                d: (0, base64url_js_1.encode)(der.subarray(crv === "Ed448" ? -57 : -56))
              };
            }
            default:
              throw new errors_js_1.JOSENotSupported("Unsupported key asymmetricKeyType");
          }
        }
        default:
          throw new errors_js_1.JOSENotSupported("Unsupported key type");
      }
    };
    exports2.default = keyToJWK;
  }
});

// node_modules/jose/dist/node/cjs/key/export.js
var require_export = __commonJS({
  "node_modules/jose/dist/node/cjs/key/export.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exportJWK = exports2.exportPKCS8 = exports2.exportSPKI = void 0;
    var asn1_js_1 = require_asn1();
    var asn1_js_2 = require_asn1();
    var key_to_jwk_js_1 = require_key_to_jwk();
    async function exportSPKI(key) {
      return (0, asn1_js_1.toSPKI)(key);
    }
    exports2.exportSPKI = exportSPKI;
    async function exportPKCS8(key) {
      return (0, asn1_js_2.toPKCS8)(key);
    }
    exports2.exportPKCS8 = exportPKCS8;
    async function exportJWK(key) {
      return (0, key_to_jwk_js_1.default)(key);
    }
    exports2.exportJWK = exportJWK;
  }
});

// node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js
var require_encrypt_key_management = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var aeskw_js_1 = require_aeskw();
    var ECDH = require_ecdhes();
    var pbes2kw_js_1 = require_pbes2kw();
    var rsaes_js_1 = require_rsaes();
    var base64url_js_1 = require_base64url();
    var cek_js_1 = require_cek();
    var errors_js_1 = require_errors();
    var export_js_1 = require_export();
    var check_key_type_js_1 = require_check_key_type();
    var aesgcmkw_js_1 = require_aesgcmkw();
    async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
      let encryptedKey;
      let parameters;
      let cek;
      (0, check_key_type_js_1.default)(alg, key, "encrypt");
      switch (alg) {
        case "dir": {
          cek = key;
          break;
        }
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW": {
          if (!ECDH.ecdhAllowed(key)) {
            throw new errors_js_1.JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
          }
          const { apu, apv } = providedParameters;
          let { epk: ephemeralKey } = providedParameters;
          ephemeralKey || (ephemeralKey = (await ECDH.generateEpk(key)).privateKey);
          const { x, y, crv, kty } = await (0, export_js_1.exportJWK)(ephemeralKey);
          const sharedSecret = await ECDH.deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? (0, cek_js_1.bitLength)(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
          parameters = { epk: { x, crv, kty } };
          if (kty === "EC")
            parameters.epk.y = y;
          if (apu)
            parameters.apu = (0, base64url_js_1.encode)(apu);
          if (apv)
            parameters.apv = (0, base64url_js_1.encode)(apv);
          if (alg === "ECDH-ES") {
            cek = sharedSecret;
            break;
          }
          cek = providedCek || (0, cek_js_1.default)(enc);
          const kwAlg = alg.slice(-6);
          encryptedKey = await (0, aeskw_js_1.wrap)(kwAlg, sharedSecret, cek);
          break;
        }
        case "RSA1_5":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512": {
          cek = providedCek || (0, cek_js_1.default)(enc);
          encryptedKey = await (0, rsaes_js_1.encrypt)(alg, key, cek);
          break;
        }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW": {
          cek = providedCek || (0, cek_js_1.default)(enc);
          const { p2c, p2s } = providedParameters;
          ({ encryptedKey, ...parameters } = await (0, pbes2kw_js_1.encrypt)(alg, key, cek, p2c, p2s));
          break;
        }
        case "A128KW":
        case "A192KW":
        case "A256KW": {
          cek = providedCek || (0, cek_js_1.default)(enc);
          encryptedKey = await (0, aeskw_js_1.wrap)(alg, key, cek);
          break;
        }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW": {
          cek = providedCek || (0, cek_js_1.default)(enc);
          const { iv } = providedParameters;
          ({ encryptedKey, ...parameters } = await (0, aesgcmkw_js_1.wrap)(alg, key, cek, iv));
          break;
        }
        default: {
          throw new errors_js_1.JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
      }
      return { cek, encryptedKey, parameters };
    }
    exports2.default = encryptKeyManagement;
  }
});

// node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js
var require_encrypt2 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FlattenedEncrypt = exports2.unprotected = void 0;
    var base64url_js_1 = require_base64url();
    var encrypt_js_1 = require_encrypt();
    var zlib_js_1 = require_zlib();
    var iv_js_1 = require_iv();
    var encrypt_key_management_js_1 = require_encrypt_key_management();
    var errors_js_1 = require_errors();
    var is_disjoint_js_1 = require_is_disjoint();
    var buffer_utils_js_1 = require_buffer_utils();
    var validate_crit_js_1 = require_validate_crit();
    exports2.unprotected = Symbol();
    var FlattenedEncrypt = class {
      constructor(plaintext) {
        if (!(plaintext instanceof Uint8Array)) {
          throw new TypeError("plaintext must be an instance of Uint8Array");
        }
        this._plaintext = plaintext;
      }
      setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
          throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this._keyManagementParameters = parameters;
        return this;
      }
      setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
          throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
      }
      setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
          throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
      }
      setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
          throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
      }
      setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
      }
      setContentEncryptionKey(cek) {
        if (this._cek) {
          throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this._cek = cek;
        return this;
      }
      setInitializationVector(iv) {
        if (this._iv) {
          throw new TypeError("setInitializationVector can only be called once");
        }
        this._iv = iv;
        return this;
      }
      async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
          throw new errors_js_1.JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
        }
        if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
          throw new errors_js_1.JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
        }
        const joseHeader = {
          ...this._protectedHeader,
          ...this._unprotectedHeader,
          ...this._sharedUnprotectedHeader
        };
        (0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, /* @__PURE__ */ new Map(), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== void 0) {
          if (!this._protectedHeader || !this._protectedHeader.zip) {
            throw new errors_js_1.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
          }
          if (joseHeader.zip !== "DEF") {
            throw new errors_js_1.JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
          }
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== "string" || !alg) {
          throw new errors_js_1.JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== "string" || !enc) {
          throw new errors_js_1.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (alg === "dir") {
          if (this._cek) {
            throw new TypeError("setContentEncryptionKey cannot be called when using Direct Encryption");
          }
        } else if (alg === "ECDH-ES") {
          if (this._cek) {
            throw new TypeError("setContentEncryptionKey cannot be called when using Direct Key Agreement");
          }
        }
        let cek;
        {
          let parameters;
          ({ cek, encryptedKey, parameters } = await (0, encrypt_key_management_js_1.default)(alg, enc, key, this._cek, this._keyManagementParameters));
          if (parameters) {
            if (options && exports2.unprotected in options) {
              if (!this._unprotectedHeader) {
                this.setUnprotectedHeader(parameters);
              } else {
                this._unprotectedHeader = { ...this._unprotectedHeader, ...parameters };
              }
            } else {
              if (!this._protectedHeader) {
                this.setProtectedHeader(parameters);
              } else {
                this._protectedHeader = { ...this._protectedHeader, ...parameters };
              }
            }
          }
        }
        this._iv || (this._iv = (0, iv_js_1.default)(enc));
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
          protectedHeader = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(JSON.stringify(this._protectedHeader)));
        } else {
          protectedHeader = buffer_utils_js_1.encoder.encode("");
        }
        if (this._aad) {
          aadMember = (0, base64url_js_1.encode)(this._aad);
          additionalData = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode("."), buffer_utils_js_1.encoder.encode(aadMember));
        } else {
          additionalData = protectedHeader;
        }
        let ciphertext;
        let tag;
        if (joseHeader.zip === "DEF") {
          const deflated = await ((options === null || options === void 0 ? void 0 : options.deflateRaw) || zlib_js_1.deflate)(this._plaintext);
          ({ ciphertext, tag } = await (0, encrypt_js_1.default)(enc, deflated, cek, this._iv, additionalData));
        } else {
          ;
          ({ ciphertext, tag } = await (0, encrypt_js_1.default)(enc, this._plaintext, cek, this._iv, additionalData));
        }
        const jwe = {
          ciphertext: (0, base64url_js_1.encode)(ciphertext),
          iv: (0, base64url_js_1.encode)(this._iv),
          tag: (0, base64url_js_1.encode)(tag)
        };
        if (encryptedKey) {
          jwe.encrypted_key = (0, base64url_js_1.encode)(encryptedKey);
        }
        if (aadMember) {
          jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
          jwe.protected = buffer_utils_js_1.decoder.decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
          jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
          jwe.header = this._unprotectedHeader;
        }
        return jwe;
      }
    };
    exports2.FlattenedEncrypt = FlattenedEncrypt;
  }
});

// node_modules/jose/dist/node/cjs/jwe/general/encrypt.js
var require_encrypt3 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwe/general/encrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GeneralEncrypt = void 0;
    var encrypt_js_1 = require_encrypt2();
    var errors_js_1 = require_errors();
    var cek_js_1 = require_cek();
    var is_disjoint_js_1 = require_is_disjoint();
    var encrypt_key_management_js_1 = require_encrypt_key_management();
    var base64url_js_1 = require_base64url();
    var validate_crit_js_1 = require_validate_crit();
    var IndividualRecipient = class {
      constructor(enc, key, options) {
        this.parent = enc;
        this.key = key;
        this.options = options;
      }
      setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
          throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
      }
      addRecipient(...args) {
        return this.parent.addRecipient(...args);
      }
      encrypt(...args) {
        return this.parent.encrypt(...args);
      }
      done() {
        return this.parent;
      }
    };
    var GeneralEncrypt = class {
      constructor(plaintext) {
        this._recipients = [];
        this._plaintext = plaintext;
      }
      addRecipient(key, options) {
        const recipient = new IndividualRecipient(this, key, { crit: options === null || options === void 0 ? void 0 : options.crit });
        this._recipients.push(recipient);
        return recipient;
      }
      setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
          throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
      }
      setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._unprotectedHeader) {
          throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = sharedUnprotectedHeader;
        return this;
      }
      setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
      }
      async encrypt(options) {
        var _a, _b, _c;
        if (!this._recipients.length) {
          throw new errors_js_1.JWEInvalid("at least one recipient must be added");
        }
        options = { deflateRaw: options === null || options === void 0 ? void 0 : options.deflateRaw };
        if (this._recipients.length === 1) {
          const [recipient] = this._recipients;
          const flattened = await new encrypt_js_1.FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, { ...recipient.options, ...options });
          let jwe2 = {
            ciphertext: flattened.ciphertext,
            iv: flattened.iv,
            recipients: [{}],
            tag: flattened.tag
          };
          if (flattened.aad)
            jwe2.aad = flattened.aad;
          if (flattened.protected)
            jwe2.protected = flattened.protected;
          if (flattened.unprotected)
            jwe2.unprotected = flattened.unprotected;
          if (flattened.encrypted_key)
            jwe2.recipients[0].encrypted_key = flattened.encrypted_key;
          if (flattened.header)
            jwe2.recipients[0].header = flattened.header;
          return jwe2;
        }
        let enc;
        for (let i = 0; i < this._recipients.length; i++) {
          const recipient = this._recipients[i];
          if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
            throw new errors_js_1.JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
          }
          const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...recipient.unprotectedHeader
          };
          const { alg } = joseHeader;
          if (typeof alg !== "string" || !alg) {
            throw new errors_js_1.JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
          }
          if (alg === "dir" || alg === "ECDH-ES") {
            throw new errors_js_1.JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
          }
          if (typeof joseHeader.enc !== "string" || !joseHeader.enc) {
            throw new errors_js_1.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
          }
          if (!enc) {
            enc = joseHeader.enc;
          } else if (enc !== joseHeader.enc) {
            throw new errors_js_1.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
          }
          (0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, /* @__PURE__ */ new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
          if (joseHeader.zip !== void 0) {
            if (!this._protectedHeader || !this._protectedHeader.zip) {
              throw new errors_js_1.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            }
          }
        }
        const cek = (0, cek_js_1.default)(enc);
        let jwe = {
          ciphertext: "",
          iv: "",
          recipients: [],
          tag: ""
        };
        for (let i = 0; i < this._recipients.length; i++) {
          const recipient = this._recipients[i];
          const target = {};
          jwe.recipients.push(target);
          const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...recipient.unprotectedHeader
          };
          const p2c = joseHeader.alg.startsWith("PBES2") ? 2048 + i : void 0;
          if (i === 0) {
            const flattened = await new encrypt_js_1.FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(cek).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({ p2c }).encrypt(recipient.key, {
              ...recipient.options,
              ...options,
              [encrypt_js_1.unprotected]: true
            });
            jwe.ciphertext = flattened.ciphertext;
            jwe.iv = flattened.iv;
            jwe.tag = flattened.tag;
            if (flattened.aad)
              jwe.aad = flattened.aad;
            if (flattened.protected)
              jwe.protected = flattened.protected;
            if (flattened.unprotected)
              jwe.unprotected = flattened.unprotected;
            target.encrypted_key = flattened.encrypted_key;
            if (flattened.header)
              target.header = flattened.header;
            continue;
          }
          const { encryptedKey, parameters } = await (0, encrypt_key_management_js_1.default)(((_a = recipient.unprotectedHeader) === null || _a === void 0 ? void 0 : _a.alg) || ((_b = this._protectedHeader) === null || _b === void 0 ? void 0 : _b.alg) || ((_c = this._unprotectedHeader) === null || _c === void 0 ? void 0 : _c.alg), enc, recipient.key, cek, { p2c });
          target.encrypted_key = (0, base64url_js_1.encode)(encryptedKey);
          if (recipient.unprotectedHeader || parameters)
            target.header = { ...recipient.unprotectedHeader, ...parameters };
        }
        return jwe;
      }
    };
    exports2.GeneralEncrypt = GeneralEncrypt;
  }
});

// node_modules/jose/dist/node/cjs/runtime/dsa_digest.js
var require_dsa_digest = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/dsa_digest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    function dsaDigest(alg) {
      switch (alg) {
        case "PS256":
        case "RS256":
        case "ES256":
        case "ES256K":
          return "sha256";
        case "PS384":
        case "RS384":
        case "ES384":
          return "sha384";
        case "PS512":
        case "RS512":
        case "ES512":
          return "sha512";
        case "EdDSA":
          return void 0;
        default:
          throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
      }
    }
    exports2.default = dsaDigest;
  }
});

// node_modules/jose/dist/node/cjs/runtime/node_key.js
var require_node_key = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/node_key.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var get_named_curve_js_1 = require_get_named_curve();
    var errors_js_1 = require_errors();
    var check_modulus_length_js_1 = require_check_modulus_length();
    var flags_js_1 = require_flags();
    var PSS = {
      padding: crypto_1.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto_1.constants.RSA_PSS_SALTLEN_DIGEST
    };
    var ecCurveAlgMap = /* @__PURE__ */ new Map([
      ["ES256", "P-256"],
      ["ES256K", "secp256k1"],
      ["ES384", "P-384"],
      ["ES512", "P-521"]
    ]);
    function keyForCrypto(alg, key) {
      switch (alg) {
        case "EdDSA":
          if (!["ed25519", "ed448"].includes(key.asymmetricKeyType)) {
            throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448");
          }
          return key;
        case "RS256":
        case "RS384":
        case "RS512":
          if (key.asymmetricKeyType !== "rsa") {
            throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
          }
          (0, check_modulus_length_js_1.default)(key, alg);
          return key;
        case (flags_js_1.rsaPssParams && "PS256"):
        case (flags_js_1.rsaPssParams && "PS384"):
        case (flags_js_1.rsaPssParams && "PS512"):
          if (key.asymmetricKeyType === "rsa-pss") {
            const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
            const length = parseInt(alg.slice(-3), 10);
            if (hashAlgorithm !== void 0 && (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm)) {
              throw new TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${alg}`);
            }
            if (saltLength !== void 0 && saltLength > length >> 3) {
              throw new TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${alg}`);
            }
          } else if (key.asymmetricKeyType !== "rsa") {
            throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss");
          }
          (0, check_modulus_length_js_1.default)(key, alg);
          return { key, ...PSS };
        case (!flags_js_1.rsaPssParams && "PS256"):
        case (!flags_js_1.rsaPssParams && "PS384"):
        case (!flags_js_1.rsaPssParams && "PS512"):
          if (key.asymmetricKeyType !== "rsa") {
            throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
          }
          (0, check_modulus_length_js_1.default)(key, alg);
          return { key, ...PSS };
        case "ES256":
        case "ES256K":
        case "ES384":
        case "ES512": {
          if (key.asymmetricKeyType !== "ec") {
            throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be ec");
          }
          const actual = (0, get_named_curve_js_1.default)(key);
          const expected = ecCurveAlgMap.get(alg);
          if (actual !== expected) {
            throw new TypeError(`Invalid key curve for the algorithm, its curve must be ${expected}, got ${actual}`);
          }
          return { dsaEncoding: "ieee-p1363", key };
        }
        default:
          throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
      }
    }
    exports2.default = keyForCrypto;
  }
});

// node_modules/jose/dist/node/cjs/runtime/hmac_digest.js
var require_hmac_digest = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/hmac_digest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    function hmacDigest(alg) {
      switch (alg) {
        case "HS256":
          return "sha256";
        case "HS384":
          return "sha384";
        case "HS512":
          return "sha512";
        default:
          throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
      }
    }
    exports2.default = hmacDigest;
  }
});

// node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js
var require_get_sign_verify_key = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto_1 = require("crypto");
    var webcrypto_js_1 = require_webcrypto();
    var crypto_key_js_1 = require_crypto_key();
    var invalid_key_input_js_1 = require_invalid_key_input();
    var is_key_like_js_1 = require_is_key_like();
    function getSignVerifyKey(alg, key, usage) {
      if (key instanceof Uint8Array) {
        if (!alg.startsWith("HS")) {
          throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
        }
        return (0, crypto_1.createSecretKey)(key);
      }
      if (key instanceof crypto_1.KeyObject) {
        return key;
      }
      if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkSigCryptoKey)(key, alg, usage);
        return crypto_1.KeyObject.from(key);
      }
      throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
    }
    exports2.default = getSignVerifyKey;
  }
});

// node_modules/jose/dist/node/cjs/runtime/sign.js
var require_sign2 = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/sign.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto = require("crypto");
    var util_1 = require("util");
    var dsa_digest_js_1 = require_dsa_digest();
    var hmac_digest_js_1 = require_hmac_digest();
    var node_key_js_1 = require_node_key();
    var get_sign_verify_key_js_1 = require_get_sign_verify_key();
    var oneShotSign;
    if (crypto.sign.length > 3) {
      oneShotSign = (0, util_1.promisify)(crypto.sign);
    } else {
      oneShotSign = crypto.sign;
    }
    var sign = async (alg, key, data) => {
      const keyObject = (0, get_sign_verify_key_js_1.default)(alg, key, "sign");
      if (alg.startsWith("HS")) {
        const hmac = crypto.createHmac((0, hmac_digest_js_1.default)(alg), keyObject);
        hmac.update(data);
        return hmac.digest();
      }
      return oneShotSign((0, dsa_digest_js_1.default)(alg), data, (0, node_key_js_1.default)(alg, keyObject));
    };
    exports2.default = sign;
  }
});

// node_modules/jose/dist/node/cjs/runtime/verify.js
var require_verify2 = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/verify.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var crypto = require("crypto");
    var util_1 = require("util");
    var dsa_digest_js_1 = require_dsa_digest();
    var node_key_js_1 = require_node_key();
    var sign_js_1 = require_sign2();
    var get_sign_verify_key_js_1 = require_get_sign_verify_key();
    var flags_js_1 = require_flags();
    var oneShotVerify;
    if (crypto.verify.length > 4 && flags_js_1.oneShotCallback) {
      oneShotVerify = (0, util_1.promisify)(crypto.verify);
    } else {
      oneShotVerify = crypto.verify;
    }
    var verify = async (alg, key, signature, data) => {
      const keyObject = (0, get_sign_verify_key_js_1.default)(alg, key, "verify");
      if (alg.startsWith("HS")) {
        const expected = await (0, sign_js_1.default)(alg, keyObject, data);
        const actual = signature;
        try {
          return crypto.timingSafeEqual(actual, expected);
        } catch {
          return false;
        }
      }
      const algorithm = (0, dsa_digest_js_1.default)(alg);
      const keyInput = (0, node_key_js_1.default)(alg, keyObject);
      try {
        return await oneShotVerify(algorithm, data, keyInput, signature);
      } catch {
        return false;
      }
    };
    exports2.default = verify;
  }
});

// node_modules/jose/dist/node/cjs/jws/flattened/verify.js
var require_verify3 = __commonJS({
  "node_modules/jose/dist/node/cjs/jws/flattened/verify.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.flattenedVerify = void 0;
    var base64url_js_1 = require_base64url();
    var verify_js_1 = require_verify2();
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var is_disjoint_js_1 = require_is_disjoint();
    var is_object_js_1 = require_is_object();
    var check_key_type_js_1 = require_check_key_type();
    var validate_crit_js_1 = require_validate_crit();
    var validate_algorithms_js_1 = require_validate_algorithms();
    async function flattenedVerify(jws, key, options) {
      var _a;
      if (!(0, is_object_js_1.default)(jws)) {
        throw new errors_js_1.JWSInvalid("Flattened JWS must be an object");
      }
      if (jws.protected === void 0 && jws.header === void 0) {
        throw new errors_js_1.JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
      }
      if (jws.protected !== void 0 && typeof jws.protected !== "string") {
        throw new errors_js_1.JWSInvalid("JWS Protected Header incorrect type");
      }
      if (jws.payload === void 0) {
        throw new errors_js_1.JWSInvalid("JWS Payload missing");
      }
      if (typeof jws.signature !== "string") {
        throw new errors_js_1.JWSInvalid("JWS Signature missing or incorrect type");
      }
      if (jws.header !== void 0 && !(0, is_object_js_1.default)(jws.header)) {
        throw new errors_js_1.JWSInvalid("JWS Unprotected Header incorrect type");
      }
      let parsedProt = {};
      if (jws.protected) {
        try {
          const protectedHeader = (0, base64url_js_1.decode)(jws.protected);
          parsedProt = JSON.parse(buffer_utils_js_1.decoder.decode(protectedHeader));
        } catch {
          throw new errors_js_1.JWSInvalid("JWS Protected Header is invalid");
        }
      }
      if (!(0, is_disjoint_js_1.default)(parsedProt, jws.header)) {
        throw new errors_js_1.JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
      }
      const joseHeader = {
        ...parsedProt,
        ...jws.header
      };
      const extensions = (0, validate_crit_js_1.default)(errors_js_1.JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
      let b64 = true;
      if (extensions.has("b64")) {
        b64 = parsedProt.b64;
        if (typeof b64 !== "boolean") {
          throw new errors_js_1.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
      }
      const { alg } = joseHeader;
      if (typeof alg !== "string" || !alg) {
        throw new errors_js_1.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
      }
      const algorithms = options && (0, validate_algorithms_js_1.default)("algorithms", options.algorithms);
      if (algorithms && !algorithms.has(alg)) {
        throw new errors_js_1.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
      }
      if (b64) {
        if (typeof jws.payload !== "string") {
          throw new errors_js_1.JWSInvalid("JWS Payload must be a string");
        }
      } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
        throw new errors_js_1.JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
      }
      let resolvedKey = false;
      if (typeof key === "function") {
        key = await key(parsedProt, jws);
        resolvedKey = true;
      }
      (0, check_key_type_js_1.default)(alg, key, "verify");
      const data = (0, buffer_utils_js_1.concat)(buffer_utils_js_1.encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ""), buffer_utils_js_1.encoder.encode("."), typeof jws.payload === "string" ? buffer_utils_js_1.encoder.encode(jws.payload) : jws.payload);
      let signature;
      try {
        signature = (0, base64url_js_1.decode)(jws.signature);
      } catch {
        throw new errors_js_1.JWSInvalid("Failed to base64url decode the signature");
      }
      const verified = await (0, verify_js_1.default)(alg, key, signature, data);
      if (!verified) {
        throw new errors_js_1.JWSSignatureVerificationFailed();
      }
      let payload;
      if (b64) {
        try {
          payload = (0, base64url_js_1.decode)(jws.payload);
        } catch {
          throw new errors_js_1.JWSInvalid("Failed to base64url decode the payload");
        }
      } else if (typeof jws.payload === "string") {
        payload = buffer_utils_js_1.encoder.encode(jws.payload);
      } else {
        payload = jws.payload;
      }
      const result = { payload };
      if (jws.protected !== void 0) {
        result.protectedHeader = parsedProt;
      }
      if (jws.header !== void 0) {
        result.unprotectedHeader = jws.header;
      }
      if (resolvedKey) {
        return { ...result, key };
      }
      return result;
    }
    exports2.flattenedVerify = flattenedVerify;
  }
});

// node_modules/jose/dist/node/cjs/jws/compact/verify.js
var require_verify4 = __commonJS({
  "node_modules/jose/dist/node/cjs/jws/compact/verify.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.compactVerify = void 0;
    var verify_js_1 = require_verify3();
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    async function compactVerify(jws, key, options) {
      if (jws instanceof Uint8Array) {
        jws = buffer_utils_js_1.decoder.decode(jws);
      }
      if (typeof jws !== "string") {
        throw new errors_js_1.JWSInvalid("Compact JWS must be a string or Uint8Array");
      }
      const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
      if (length !== 3) {
        throw new errors_js_1.JWSInvalid("Invalid Compact JWS");
      }
      const verified = await (0, verify_js_1.flattenedVerify)({ payload, protected: protectedHeader, signature }, key, options);
      const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
      if (typeof key === "function") {
        return { ...result, key: verified.key };
      }
      return result;
    }
    exports2.compactVerify = compactVerify;
  }
});

// node_modules/jose/dist/node/cjs/jws/general/verify.js
var require_verify5 = __commonJS({
  "node_modules/jose/dist/node/cjs/jws/general/verify.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generalVerify = void 0;
    var verify_js_1 = require_verify3();
    var errors_js_1 = require_errors();
    var is_object_js_1 = require_is_object();
    async function generalVerify(jws, key, options) {
      if (!(0, is_object_js_1.default)(jws)) {
        throw new errors_js_1.JWSInvalid("General JWS must be an object");
      }
      if (!Array.isArray(jws.signatures) || !jws.signatures.every(is_object_js_1.default)) {
        throw new errors_js_1.JWSInvalid("JWS Signatures missing or incorrect type");
      }
      for (const signature of jws.signatures) {
        try {
          return await (0, verify_js_1.flattenedVerify)({
            header: signature.header,
            payload: jws.payload,
            protected: signature.protected,
            signature: signature.signature
          }, key, options);
        } catch {
        }
      }
      throw new errors_js_1.JWSSignatureVerificationFailed();
    }
    exports2.generalVerify = generalVerify;
  }
});

// node_modules/jose/dist/node/cjs/lib/epoch.js
var require_epoch = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/epoch.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = (date) => Math.floor(date.getTime() / 1e3);
  }
});

// node_modules/jose/dist/node/cjs/lib/secs.js
var require_secs = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/secs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var minute = 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var year = day * 365.25;
    var REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
    exports2.default = (str) => {
      const matched = REGEX.exec(str);
      if (!matched) {
        throw new TypeError("Invalid time period format");
      }
      const value = parseFloat(matched[1]);
      const unit = matched[2].toLowerCase();
      switch (unit) {
        case "sec":
        case "secs":
        case "second":
        case "seconds":
        case "s":
          return Math.round(value);
        case "minute":
        case "minutes":
        case "min":
        case "mins":
        case "m":
          return Math.round(value * minute);
        case "hour":
        case "hours":
        case "hr":
        case "hrs":
        case "h":
          return Math.round(value * hour);
        case "day":
        case "days":
        case "d":
          return Math.round(value * day);
        case "week":
        case "weeks":
        case "w":
          return Math.round(value * week);
        default:
          return Math.round(value * year);
      }
    };
  }
});

// node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js
var require_jwt_claims_set = __commonJS({
  "node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var epoch_js_1 = require_epoch();
    var secs_js_1 = require_secs();
    var is_object_js_1 = require_is_object();
    var normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
    var checkAudiencePresence = (audPayload, audOption) => {
      if (typeof audPayload === "string") {
        return audOption.includes(audPayload);
      }
      if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
      }
      return false;
    };
    exports2.default = (protectedHeader, encodedPayload, options = {}) => {
      const { typ } = options;
      if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "typ" JWT header value', "typ", "check_failed");
      }
      let payload;
      try {
        payload = JSON.parse(buffer_utils_js_1.decoder.decode(encodedPayload));
      } catch {
      }
      if (!(0, is_object_js_1.default)(payload)) {
        throw new errors_js_1.JWTInvalid("JWT Claims Set must be a top-level JSON object");
      }
      const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
      if (maxTokenAge !== void 0)
        requiredClaims.push("iat");
      if (audience !== void 0)
        requiredClaims.push("aud");
      if (subject !== void 0)
        requiredClaims.push("sub");
      if (issuer !== void 0)
        requiredClaims.push("iss");
      for (const claim of new Set(requiredClaims.reverse())) {
        if (!(claim in payload)) {
          throw new errors_js_1.JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, "missing");
        }
      }
      if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "iss" claim value', "iss", "check_failed");
      }
      if (subject && payload.sub !== subject) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "sub" claim value', "sub", "check_failed");
      }
      if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "aud" claim value', "aud", "check_failed");
      }
      let tolerance;
      switch (typeof options.clockTolerance) {
        case "string":
          tolerance = (0, secs_js_1.default)(options.clockTolerance);
          break;
        case "number":
          tolerance = options.clockTolerance;
          break;
        case "undefined":
          tolerance = 0;
          break;
        default:
          throw new TypeError("Invalid clockTolerance option type");
      }
      const { currentDate } = options;
      const now = (0, epoch_js_1.default)(currentDate || /* @__PURE__ */ new Date());
      if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
        throw new errors_js_1.JWTClaimValidationFailed('"iat" claim must be a number', "iat", "invalid");
      }
      if (payload.nbf !== void 0) {
        if (typeof payload.nbf !== "number") {
          throw new errors_js_1.JWTClaimValidationFailed('"nbf" claim must be a number', "nbf", "invalid");
        }
        if (payload.nbf > now + tolerance) {
          throw new errors_js_1.JWTClaimValidationFailed('"nbf" claim timestamp check failed', "nbf", "check_failed");
        }
      }
      if (payload.exp !== void 0) {
        if (typeof payload.exp !== "number") {
          throw new errors_js_1.JWTClaimValidationFailed('"exp" claim must be a number', "exp", "invalid");
        }
        if (payload.exp <= now - tolerance) {
          throw new errors_js_1.JWTExpired('"exp" claim timestamp check failed', "exp", "check_failed");
        }
      }
      if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === "number" ? maxTokenAge : (0, secs_js_1.default)(maxTokenAge);
        if (age - tolerance > max) {
          throw new errors_js_1.JWTExpired('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
        }
        if (age < 0 - tolerance) {
          throw new errors_js_1.JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
        }
      }
      return payload;
    };
  }
});

// node_modules/jose/dist/node/cjs/jwt/verify.js
var require_verify6 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwt/verify.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.jwtVerify = void 0;
    var verify_js_1 = require_verify4();
    var jwt_claims_set_js_1 = require_jwt_claims_set();
    var errors_js_1 = require_errors();
    async function jwtVerify(jwt2, key, options) {
      var _a;
      const verified = await (0, verify_js_1.compactVerify)(jwt2, key, options);
      if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes("b64")) && verified.protectedHeader.b64 === false) {
        throw new errors_js_1.JWTInvalid("JWTs MUST NOT use unencoded payload");
      }
      const payload = (0, jwt_claims_set_js_1.default)(verified.protectedHeader, verified.payload, options);
      const result = { payload, protectedHeader: verified.protectedHeader };
      if (typeof key === "function") {
        return { ...result, key: verified.key };
      }
      return result;
    }
    exports2.jwtVerify = jwtVerify;
  }
});

// node_modules/jose/dist/node/cjs/jwt/decrypt.js
var require_decrypt5 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwt/decrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.jwtDecrypt = void 0;
    var decrypt_js_1 = require_decrypt3();
    var jwt_claims_set_js_1 = require_jwt_claims_set();
    var errors_js_1 = require_errors();
    async function jwtDecrypt(jwt2, key, options) {
      const decrypted = await (0, decrypt_js_1.compactDecrypt)(jwt2, key, options);
      const payload = (0, jwt_claims_set_js_1.default)(decrypted.protectedHeader, decrypted.plaintext, options);
      const { protectedHeader } = decrypted;
      if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) {
        throw new errors_js_1.JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
      }
      if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) {
        throw new errors_js_1.JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
      }
      if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new errors_js_1.JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
      }
      const result = { payload, protectedHeader };
      if (typeof key === "function") {
        return { ...result, key: decrypted.key };
      }
      return result;
    }
    exports2.jwtDecrypt = jwtDecrypt;
  }
});

// node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js
var require_encrypt4 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CompactEncrypt = void 0;
    var encrypt_js_1 = require_encrypt2();
    var CompactEncrypt = class {
      constructor(plaintext) {
        this._flattened = new encrypt_js_1.FlattenedEncrypt(plaintext);
      }
      setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
      }
      setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
      }
      setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
      }
      setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
      }
      async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join(".");
      }
    };
    exports2.CompactEncrypt = CompactEncrypt;
  }
});

// node_modules/jose/dist/node/cjs/jws/flattened/sign.js
var require_sign3 = __commonJS({
  "node_modules/jose/dist/node/cjs/jws/flattened/sign.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FlattenedSign = void 0;
    var base64url_js_1 = require_base64url();
    var sign_js_1 = require_sign2();
    var is_disjoint_js_1 = require_is_disjoint();
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var check_key_type_js_1 = require_check_key_type();
    var validate_crit_js_1 = require_validate_crit();
    var FlattenedSign = class {
      constructor(payload) {
        if (!(payload instanceof Uint8Array)) {
          throw new TypeError("payload must be an instance of Uint8Array");
        }
        this._payload = payload;
      }
      setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
          throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
      }
      setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
          throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
      }
      async sign(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader) {
          throw new errors_js_1.JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
        }
        if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader)) {
          throw new errors_js_1.JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        }
        const joseHeader = {
          ...this._protectedHeader,
          ...this._unprotectedHeader
        };
        const extensions = (0, validate_crit_js_1.default)(errors_js_1.JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        let b64 = true;
        if (extensions.has("b64")) {
          b64 = this._protectedHeader.b64;
          if (typeof b64 !== "boolean") {
            throw new errors_js_1.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
          }
        }
        const { alg } = joseHeader;
        if (typeof alg !== "string" || !alg) {
          throw new errors_js_1.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        }
        (0, check_key_type_js_1.default)(alg, key, "sign");
        let payload = this._payload;
        if (b64) {
          payload = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(payload));
        }
        let protectedHeader;
        if (this._protectedHeader) {
          protectedHeader = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(JSON.stringify(this._protectedHeader)));
        } else {
          protectedHeader = buffer_utils_js_1.encoder.encode("");
        }
        const data = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode("."), payload);
        const signature = await (0, sign_js_1.default)(alg, key, data);
        const jws = {
          signature: (0, base64url_js_1.encode)(signature),
          payload: ""
        };
        if (b64) {
          jws.payload = buffer_utils_js_1.decoder.decode(payload);
        }
        if (this._unprotectedHeader) {
          jws.header = this._unprotectedHeader;
        }
        if (this._protectedHeader) {
          jws.protected = buffer_utils_js_1.decoder.decode(protectedHeader);
        }
        return jws;
      }
    };
    exports2.FlattenedSign = FlattenedSign;
  }
});

// node_modules/jose/dist/node/cjs/jws/compact/sign.js
var require_sign4 = __commonJS({
  "node_modules/jose/dist/node/cjs/jws/compact/sign.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CompactSign = void 0;
    var sign_js_1 = require_sign3();
    var CompactSign = class {
      constructor(payload) {
        this._flattened = new sign_js_1.FlattenedSign(payload);
      }
      setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
      }
      async sign(key, options) {
        const jws = await this._flattened.sign(key, options);
        if (jws.payload === void 0) {
          throw new TypeError("use the flattened module for creating JWS with b64: false");
        }
        return `${jws.protected}.${jws.payload}.${jws.signature}`;
      }
    };
    exports2.CompactSign = CompactSign;
  }
});

// node_modules/jose/dist/node/cjs/jws/general/sign.js
var require_sign5 = __commonJS({
  "node_modules/jose/dist/node/cjs/jws/general/sign.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GeneralSign = void 0;
    var sign_js_1 = require_sign3();
    var errors_js_1 = require_errors();
    var IndividualSignature = class {
      constructor(sig, key, options) {
        this.parent = sig;
        this.key = key;
        this.options = options;
      }
      setProtectedHeader(protectedHeader) {
        if (this.protectedHeader) {
          throw new TypeError("setProtectedHeader can only be called once");
        }
        this.protectedHeader = protectedHeader;
        return this;
      }
      setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
          throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
      }
      addSignature(...args) {
        return this.parent.addSignature(...args);
      }
      sign(...args) {
        return this.parent.sign(...args);
      }
      done() {
        return this.parent;
      }
    };
    var GeneralSign = class {
      constructor(payload) {
        this._signatures = [];
        this._payload = payload;
      }
      addSignature(key, options) {
        const signature = new IndividualSignature(this, key, options);
        this._signatures.push(signature);
        return signature;
      }
      async sign() {
        if (!this._signatures.length) {
          throw new errors_js_1.JWSInvalid("at least one signature must be added");
        }
        const jws = {
          signatures: [],
          payload: ""
        };
        for (let i = 0; i < this._signatures.length; i++) {
          const signature = this._signatures[i];
          const flattened = new sign_js_1.FlattenedSign(this._payload);
          flattened.setProtectedHeader(signature.protectedHeader);
          flattened.setUnprotectedHeader(signature.unprotectedHeader);
          const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
          if (i === 0) {
            jws.payload = payload;
          } else if (jws.payload !== payload) {
            throw new errors_js_1.JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
          }
          jws.signatures.push(rest);
        }
        return jws;
      }
    };
    exports2.GeneralSign = GeneralSign;
  }
});

// node_modules/jose/dist/node/cjs/jwt/produce.js
var require_produce = __commonJS({
  "node_modules/jose/dist/node/cjs/jwt/produce.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProduceJWT = void 0;
    var epoch_js_1 = require_epoch();
    var is_object_js_1 = require_is_object();
    var secs_js_1 = require_secs();
    var ProduceJWT = class {
      constructor(payload) {
        if (!(0, is_object_js_1.default)(payload)) {
          throw new TypeError("JWT Claims Set MUST be an object");
        }
        this._payload = payload;
      }
      setIssuer(issuer) {
        this._payload = { ...this._payload, iss: issuer };
        return this;
      }
      setSubject(subject) {
        this._payload = { ...this._payload, sub: subject };
        return this;
      }
      setAudience(audience) {
        this._payload = { ...this._payload, aud: audience };
        return this;
      }
      setJti(jwtId) {
        this._payload = { ...this._payload, jti: jwtId };
        return this;
      }
      setNotBefore(input) {
        if (typeof input === "number") {
          this._payload = { ...this._payload, nbf: input };
        } else {
          this._payload = { ...this._payload, nbf: (0, epoch_js_1.default)(/* @__PURE__ */ new Date()) + (0, secs_js_1.default)(input) };
        }
        return this;
      }
      setExpirationTime(input) {
        if (typeof input === "number") {
          this._payload = { ...this._payload, exp: input };
        } else {
          this._payload = { ...this._payload, exp: (0, epoch_js_1.default)(/* @__PURE__ */ new Date()) + (0, secs_js_1.default)(input) };
        }
        return this;
      }
      setIssuedAt(input) {
        if (typeof input === "undefined") {
          this._payload = { ...this._payload, iat: (0, epoch_js_1.default)(/* @__PURE__ */ new Date()) };
        } else {
          this._payload = { ...this._payload, iat: input };
        }
        return this;
      }
    };
    exports2.ProduceJWT = ProduceJWT;
  }
});

// node_modules/jose/dist/node/cjs/jwt/sign.js
var require_sign6 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwt/sign.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SignJWT = void 0;
    var sign_js_1 = require_sign4();
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var produce_js_1 = require_produce();
    var SignJWT = class extends produce_js_1.ProduceJWT {
      setProtectedHeader(protectedHeader) {
        this._protectedHeader = protectedHeader;
        return this;
      }
      async sign(key, options) {
        var _a;
        const sig = new sign_js_1.CompactSign(buffer_utils_js_1.encoder.encode(JSON.stringify(this._payload)));
        sig.setProtectedHeader(this._protectedHeader);
        if (Array.isArray((_a = this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
          throw new errors_js_1.JWTInvalid("JWTs MUST NOT use unencoded payload");
        }
        return sig.sign(key, options);
      }
    };
    exports2.SignJWT = SignJWT;
  }
});

// node_modules/jose/dist/node/cjs/jwt/encrypt.js
var require_encrypt5 = __commonJS({
  "node_modules/jose/dist/node/cjs/jwt/encrypt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EncryptJWT = void 0;
    var encrypt_js_1 = require_encrypt4();
    var buffer_utils_js_1 = require_buffer_utils();
    var produce_js_1 = require_produce();
    var EncryptJWT = class extends produce_js_1.ProduceJWT {
      setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
          throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
      }
      setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
          throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this._keyManagementParameters = parameters;
        return this;
      }
      setContentEncryptionKey(cek) {
        if (this._cek) {
          throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this._cek = cek;
        return this;
      }
      setInitializationVector(iv) {
        if (this._iv) {
          throw new TypeError("setInitializationVector can only be called once");
        }
        this._iv = iv;
        return this;
      }
      replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
      }
      replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
      }
      replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
      }
      async encrypt(key, options) {
        const enc = new encrypt_js_1.CompactEncrypt(buffer_utils_js_1.encoder.encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
          this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss };
        }
        if (this._replicateSubjectAsHeader) {
          this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub };
        }
        if (this._replicateAudienceAsHeader) {
          this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
          enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
          enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
          enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
      }
    };
    exports2.EncryptJWT = EncryptJWT;
  }
});

// node_modules/jose/dist/node/cjs/jwk/thumbprint.js
var require_thumbprint = __commonJS({
  "node_modules/jose/dist/node/cjs/jwk/thumbprint.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.calculateJwkThumbprintUri = exports2.calculateJwkThumbprint = void 0;
    var digest_js_1 = require_digest();
    var base64url_js_1 = require_base64url();
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var is_object_js_1 = require_is_object();
    var check = (value, description) => {
      if (typeof value !== "string" || !value) {
        throw new errors_js_1.JWKInvalid(`${description} missing or invalid`);
      }
    };
    async function calculateJwkThumbprint(jwk, digestAlgorithm) {
      if (!(0, is_object_js_1.default)(jwk)) {
        throw new TypeError("JWK must be an object");
      }
      digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = "sha256";
      if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
      }
      let components;
      switch (jwk.kty) {
        case "EC":
          check(jwk.crv, '"crv" (Curve) Parameter');
          check(jwk.x, '"x" (X Coordinate) Parameter');
          check(jwk.y, '"y" (Y Coordinate) Parameter');
          components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
          break;
        case "OKP":
          check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
          check(jwk.x, '"x" (Public Key) Parameter');
          components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
          break;
        case "RSA":
          check(jwk.e, '"e" (Exponent) Parameter');
          check(jwk.n, '"n" (Modulus) Parameter');
          components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
          break;
        case "oct":
          check(jwk.k, '"k" (Key Value) Parameter');
          components = { k: jwk.k, kty: jwk.kty };
          break;
        default:
          throw new errors_js_1.JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
      }
      const data = buffer_utils_js_1.encoder.encode(JSON.stringify(components));
      return (0, base64url_js_1.encode)(await (0, digest_js_1.default)(digestAlgorithm, data));
    }
    exports2.calculateJwkThumbprint = calculateJwkThumbprint;
    async function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
      digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = "sha256";
      const thumbprint = await calculateJwkThumbprint(jwk, digestAlgorithm);
      return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
    }
    exports2.calculateJwkThumbprintUri = calculateJwkThumbprintUri;
  }
});

// node_modules/jose/dist/node/cjs/jwk/embedded.js
var require_embedded = __commonJS({
  "node_modules/jose/dist/node/cjs/jwk/embedded.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EmbeddedJWK = void 0;
    var import_js_1 = require_import();
    var is_object_js_1 = require_is_object();
    var errors_js_1 = require_errors();
    async function EmbeddedJWK(protectedHeader, token) {
      const joseHeader = {
        ...protectedHeader,
        ...token === null || token === void 0 ? void 0 : token.header
      };
      if (!(0, is_object_js_1.default)(joseHeader.jwk)) {
        throw new errors_js_1.JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
      }
      const key = await (0, import_js_1.importJWK)({ ...joseHeader.jwk, ext: true }, joseHeader.alg, true);
      if (key instanceof Uint8Array || key.type !== "public") {
        throw new errors_js_1.JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
      }
      return key;
    }
    exports2.EmbeddedJWK = EmbeddedJWK;
  }
});

// node_modules/jose/dist/node/cjs/jwks/local.js
var require_local = __commonJS({
  "node_modules/jose/dist/node/cjs/jwks/local.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createLocalJWKSet = exports2.LocalJWKSet = exports2.isJWKSLike = void 0;
    var import_js_1 = require_import();
    var errors_js_1 = require_errors();
    var is_object_js_1 = require_is_object();
    function getKtyFromAlg(alg) {
      switch (typeof alg === "string" && alg.slice(0, 2)) {
        case "RS":
        case "PS":
          return "RSA";
        case "ES":
          return "EC";
        case "Ed":
          return "OKP";
        default:
          throw new errors_js_1.JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
      }
    }
    function isJWKSLike(jwks) {
      return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
    }
    exports2.isJWKSLike = isJWKSLike;
    function isJWKLike(key) {
      return (0, is_object_js_1.default)(key);
    }
    function clone(obj) {
      if (typeof structuredClone === "function") {
        return structuredClone(obj);
      }
      return JSON.parse(JSON.stringify(obj));
    }
    var LocalJWKSet = class {
      constructor(jwks) {
        this._cached = /* @__PURE__ */ new WeakMap();
        if (!isJWKSLike(jwks)) {
          throw new errors_js_1.JWKSInvalid("JSON Web Key Set malformed");
        }
        this._jwks = clone(jwks);
      }
      async getKey(protectedHeader, token) {
        const { alg, kid } = { ...protectedHeader, ...token === null || token === void 0 ? void 0 : token.header };
        const kty = getKtyFromAlg(alg);
        const candidates = this._jwks.keys.filter((jwk2) => {
          let candidate = kty === jwk2.kty;
          if (candidate && typeof kid === "string") {
            candidate = kid === jwk2.kid;
          }
          if (candidate && typeof jwk2.alg === "string") {
            candidate = alg === jwk2.alg;
          }
          if (candidate && typeof jwk2.use === "string") {
            candidate = jwk2.use === "sig";
          }
          if (candidate && Array.isArray(jwk2.key_ops)) {
            candidate = jwk2.key_ops.includes("verify");
          }
          if (candidate && alg === "EdDSA") {
            candidate = jwk2.crv === "Ed25519" || jwk2.crv === "Ed448";
          }
          if (candidate) {
            switch (alg) {
              case "ES256":
                candidate = jwk2.crv === "P-256";
                break;
              case "ES256K":
                candidate = jwk2.crv === "secp256k1";
                break;
              case "ES384":
                candidate = jwk2.crv === "P-384";
                break;
              case "ES512":
                candidate = jwk2.crv === "P-521";
                break;
            }
          }
          return candidate;
        });
        const { 0: jwk, length } = candidates;
        if (length === 0) {
          throw new errors_js_1.JWKSNoMatchingKey();
        } else if (length !== 1) {
          const error = new errors_js_1.JWKSMultipleMatchingKeys();
          const { _cached } = this;
          error[Symbol.asyncIterator] = async function* () {
            for (const jwk2 of candidates) {
              try {
                yield await importWithAlgCache(_cached, jwk2, alg);
              } catch {
                continue;
              }
            }
          };
          throw error;
        }
        return importWithAlgCache(this._cached, jwk, alg);
      }
    };
    exports2.LocalJWKSet = LocalJWKSet;
    async function importWithAlgCache(cache, jwk, alg) {
      const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
      if (cached[alg] === void 0) {
        const key = await (0, import_js_1.importJWK)({ ...jwk, ext: true }, alg);
        if (key instanceof Uint8Array || key.type !== "public") {
          throw new errors_js_1.JWKSInvalid("JSON Web Key Set members must be public keys");
        }
        cached[alg] = key;
      }
      return cached[alg];
    }
    function createLocalJWKSet(jwks) {
      const set = new LocalJWKSet(jwks);
      return async function(protectedHeader, token) {
        return set.getKey(protectedHeader, token);
      };
    }
    exports2.createLocalJWKSet = createLocalJWKSet;
  }
});

// node_modules/jose/dist/node/cjs/runtime/fetch_jwks.js
var require_fetch_jwks = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/fetch_jwks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var http = require("http");
    var https = require("https");
    var events_1 = require("events");
    var errors_js_1 = require_errors();
    var buffer_utils_js_1 = require_buffer_utils();
    var fetchJwks = async (url, timeout, options) => {
      let get;
      switch (url.protocol) {
        case "https:":
          get = https.get;
          break;
        case "http:":
          get = http.get;
          break;
        default:
          throw new TypeError("Unsupported URL protocol.");
      }
      const { agent, headers } = options;
      const req = get(url.href, {
        agent,
        timeout,
        headers
      });
      const [response] = await Promise.race([(0, events_1.once)(req, "response"), (0, events_1.once)(req, "timeout")]);
      if (!response) {
        req.destroy();
        throw new errors_js_1.JWKSTimeout();
      }
      if (response.statusCode !== 200) {
        throw new errors_js_1.JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
      }
      const parts = [];
      for await (const part of response) {
        parts.push(part);
      }
      try {
        return JSON.parse(buffer_utils_js_1.decoder.decode((0, buffer_utils_js_1.concat)(...parts)));
      } catch {
        throw new errors_js_1.JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
      }
    };
    exports2.default = fetchJwks;
  }
});

// node_modules/jose/dist/node/cjs/jwks/remote.js
var require_remote = __commonJS({
  "node_modules/jose/dist/node/cjs/jwks/remote.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createRemoteJWKSet = void 0;
    var fetch_jwks_js_1 = require_fetch_jwks();
    var errors_js_1 = require_errors();
    var local_js_1 = require_local();
    function isCloudflareWorkers() {
      return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
    }
    var RemoteJWKSet = class extends local_js_1.LocalJWKSet {
      constructor(url, options) {
        super({ keys: [] });
        this._jwks = void 0;
        if (!(url instanceof URL)) {
          throw new TypeError("url must be an instance of URL");
        }
        this._url = new URL(url.href);
        this._options = { agent: options === null || options === void 0 ? void 0 : options.agent, headers: options === null || options === void 0 ? void 0 : options.headers };
        this._timeoutDuration = typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === "number" ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5e3;
        this._cooldownDuration = typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === "number" ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 3e4;
        this._cacheMaxAge = typeof (options === null || options === void 0 ? void 0 : options.cacheMaxAge) === "number" ? options === null || options === void 0 ? void 0 : options.cacheMaxAge : 6e5;
      }
      coolingDown() {
        return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
      }
      fresh() {
        return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
      }
      async getKey(protectedHeader, token) {
        if (!this._jwks || !this.fresh()) {
          await this.reload();
        }
        try {
          return await super.getKey(protectedHeader, token);
        } catch (err) {
          if (err instanceof errors_js_1.JWKSNoMatchingKey) {
            if (this.coolingDown() === false) {
              await this.reload();
              return super.getKey(protectedHeader, token);
            }
          }
          throw err;
        }
      }
      async reload() {
        if (this._pendingFetch && isCloudflareWorkers()) {
          this._pendingFetch = void 0;
        }
        this._pendingFetch || (this._pendingFetch = (0, fetch_jwks_js_1.default)(this._url, this._timeoutDuration, this._options).then((json) => {
          if (!(0, local_js_1.isJWKSLike)(json)) {
            throw new errors_js_1.JWKSInvalid("JSON Web Key Set malformed");
          }
          this._jwks = { keys: json.keys };
          this._jwksTimestamp = Date.now();
          this._pendingFetch = void 0;
        }).catch((err) => {
          this._pendingFetch = void 0;
          throw err;
        }));
        await this._pendingFetch;
      }
    };
    function createRemoteJWKSet(url, options) {
      const set = new RemoteJWKSet(url, options);
      return async function(protectedHeader, token) {
        return set.getKey(protectedHeader, token);
      };
    }
    exports2.createRemoteJWKSet = createRemoteJWKSet;
  }
});

// node_modules/jose/dist/node/cjs/jwt/unsecured.js
var require_unsecured = __commonJS({
  "node_modules/jose/dist/node/cjs/jwt/unsecured.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UnsecuredJWT = void 0;
    var base64url = require_base64url();
    var buffer_utils_js_1 = require_buffer_utils();
    var errors_js_1 = require_errors();
    var jwt_claims_set_js_1 = require_jwt_claims_set();
    var produce_js_1 = require_produce();
    var UnsecuredJWT = class extends produce_js_1.ProduceJWT {
      encode() {
        const header = base64url.encode(JSON.stringify({ alg: "none" }));
        const payload = base64url.encode(JSON.stringify(this._payload));
        return `${header}.${payload}.`;
      }
      static decode(jwt2, options) {
        if (typeof jwt2 !== "string") {
          throw new errors_js_1.JWTInvalid("Unsecured JWT must be a string");
        }
        const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt2.split(".");
        if (length !== 3 || signature !== "") {
          throw new errors_js_1.JWTInvalid("Invalid Unsecured JWT");
        }
        let header;
        try {
          header = JSON.parse(buffer_utils_js_1.decoder.decode(base64url.decode(encodedHeader)));
          if (header.alg !== "none")
            throw new Error();
        } catch {
          throw new errors_js_1.JWTInvalid("Invalid Unsecured JWT");
        }
        const payload = (0, jwt_claims_set_js_1.default)(header, base64url.decode(encodedPayload), options);
        return { payload, header };
      }
    };
    exports2.UnsecuredJWT = UnsecuredJWT;
  }
});

// node_modules/jose/dist/node/cjs/util/base64url.js
var require_base64url2 = __commonJS({
  "node_modules/jose/dist/node/cjs/util/base64url.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decode = exports2.encode = void 0;
    var base64url = require_base64url();
    exports2.encode = base64url.encode;
    exports2.decode = base64url.decode;
  }
});

// node_modules/jose/dist/node/cjs/util/decode_protected_header.js
var require_decode_protected_header = __commonJS({
  "node_modules/jose/dist/node/cjs/util/decode_protected_header.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodeProtectedHeader = void 0;
    var base64url_js_1 = require_base64url2();
    var buffer_utils_js_1 = require_buffer_utils();
    var is_object_js_1 = require_is_object();
    function decodeProtectedHeader(token) {
      let protectedB64u;
      if (typeof token === "string") {
        const parts = token.split(".");
        if (parts.length === 3 || parts.length === 5) {
          ;
          [protectedB64u] = parts;
        }
      } else if (typeof token === "object" && token) {
        if ("protected" in token) {
          protectedB64u = token.protected;
        } else {
          throw new TypeError("Token does not contain a Protected Header");
        }
      }
      try {
        if (typeof protectedB64u !== "string" || !protectedB64u) {
          throw new Error();
        }
        const result = JSON.parse(buffer_utils_js_1.decoder.decode((0, base64url_js_1.decode)(protectedB64u)));
        if (!(0, is_object_js_1.default)(result)) {
          throw new Error();
        }
        return result;
      } catch {
        throw new TypeError("Invalid Token or Protected Header formatting");
      }
    }
    exports2.decodeProtectedHeader = decodeProtectedHeader;
  }
});

// node_modules/jose/dist/node/cjs/util/decode_jwt.js
var require_decode_jwt = __commonJS({
  "node_modules/jose/dist/node/cjs/util/decode_jwt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decodeJwt = void 0;
    var base64url_js_1 = require_base64url2();
    var buffer_utils_js_1 = require_buffer_utils();
    var is_object_js_1 = require_is_object();
    var errors_js_1 = require_errors();
    function decodeJwt(jwt2) {
      if (typeof jwt2 !== "string")
        throw new errors_js_1.JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
      const { 1: payload, length } = jwt2.split(".");
      if (length === 5)
        throw new errors_js_1.JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
      if (length !== 3)
        throw new errors_js_1.JWTInvalid("Invalid JWT");
      if (!payload)
        throw new errors_js_1.JWTInvalid("JWTs must contain a payload");
      let decoded;
      try {
        decoded = (0, base64url_js_1.decode)(payload);
      } catch {
        throw new errors_js_1.JWTInvalid("Failed to base64url decode the payload");
      }
      let result;
      try {
        result = JSON.parse(buffer_utils_js_1.decoder.decode(decoded));
      } catch {
        throw new errors_js_1.JWTInvalid("Failed to parse the decoded payload as JSON");
      }
      if (!(0, is_object_js_1.default)(result))
        throw new errors_js_1.JWTInvalid("Invalid JWT Claims Set");
      return result;
    }
    exports2.decodeJwt = decodeJwt;
  }
});

// node_modules/jose/dist/node/cjs/runtime/generate.js
var require_generate = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/generate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateKeyPair = exports2.generateSecret = void 0;
    var crypto_1 = require("crypto");
    var util_1 = require("util");
    var random_js_1 = require_random();
    var check_modulus_length_js_1 = require_check_modulus_length();
    var errors_js_1 = require_errors();
    var generate = (0, util_1.promisify)(crypto_1.generateKeyPair);
    async function generateSecret(alg, options) {
      let length;
      switch (alg) {
        case "HS256":
        case "HS384":
        case "HS512":
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
          length = parseInt(alg.slice(-3), 10);
          break;
        case "A128KW":
        case "A192KW":
        case "A256KW":
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
          length = parseInt(alg.slice(1, 4), 10);
          break;
        default:
          throw new errors_js_1.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      return (0, crypto_1.createSecretKey)((0, random_js_1.default)(new Uint8Array(length >> 3)));
    }
    exports2.generateSecret = generateSecret;
    async function generateKeyPair(alg, options) {
      var _a, _b;
      switch (alg) {
        case "RS256":
        case "RS384":
        case "RS512":
        case "PS256":
        case "PS384":
        case "PS512":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
        case "RSA1_5": {
          const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
          if (typeof modulusLength !== "number" || modulusLength < 2048) {
            throw new errors_js_1.JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
          }
          const keypair = await generate("rsa", {
            modulusLength,
            publicExponent: 65537
          });
          (0, check_modulus_length_js_1.setModulusLength)(keypair.privateKey, modulusLength);
          (0, check_modulus_length_js_1.setModulusLength)(keypair.publicKey, modulusLength);
          return keypair;
        }
        case "ES256":
          return generate("ec", { namedCurve: "P-256" });
        case "ES256K":
          return generate("ec", { namedCurve: "secp256k1" });
        case "ES384":
          return generate("ec", { namedCurve: "P-384" });
        case "ES512":
          return generate("ec", { namedCurve: "P-521" });
        case "EdDSA": {
          switch (options === null || options === void 0 ? void 0 : options.crv) {
            case void 0:
            case "Ed25519":
              return generate("ed25519");
            case "Ed448":
              return generate("ed448");
            default:
              throw new errors_js_1.JOSENotSupported("Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448");
          }
        }
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          const crv = (_b = options === null || options === void 0 ? void 0 : options.crv) !== null && _b !== void 0 ? _b : "P-256";
          switch (crv) {
            case void 0:
            case "P-256":
            case "P-384":
            case "P-521":
              return generate("ec", { namedCurve: crv });
            case "X25519":
              return generate("x25519");
            case "X448":
              return generate("x448");
            default:
              throw new errors_js_1.JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
          }
        default:
          throw new errors_js_1.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
    }
    exports2.generateKeyPair = generateKeyPair;
  }
});

// node_modules/jose/dist/node/cjs/key/generate_key_pair.js
var require_generate_key_pair = __commonJS({
  "node_modules/jose/dist/node/cjs/key/generate_key_pair.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateKeyPair = void 0;
    var generate_js_1 = require_generate();
    async function generateKeyPair(alg, options) {
      return (0, generate_js_1.generateKeyPair)(alg, options);
    }
    exports2.generateKeyPair = generateKeyPair;
  }
});

// node_modules/jose/dist/node/cjs/key/generate_secret.js
var require_generate_secret = __commonJS({
  "node_modules/jose/dist/node/cjs/key/generate_secret.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateSecret = void 0;
    var generate_js_1 = require_generate();
    async function generateSecret(alg, options) {
      return (0, generate_js_1.generateSecret)(alg, options);
    }
    exports2.generateSecret = generateSecret;
  }
});

// node_modules/jose/dist/node/cjs/runtime/runtime.js
var require_runtime = __commonJS({
  "node_modules/jose/dist/node/cjs/runtime/runtime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = "node:crypto";
  }
});

// node_modules/jose/dist/node/cjs/util/runtime.js
var require_runtime2 = __commonJS({
  "node_modules/jose/dist/node/cjs/util/runtime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var runtime_js_1 = require_runtime();
    exports2.default = runtime_js_1.default;
  }
});

// node_modules/jose/dist/node/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/jose/dist/node/cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.cryptoRuntime = exports2.base64url = exports2.generateSecret = exports2.generateKeyPair = exports2.errors = exports2.decodeJwt = exports2.decodeProtectedHeader = exports2.importJWK = exports2.importX509 = exports2.importPKCS8 = exports2.importSPKI = exports2.exportJWK = exports2.exportSPKI = exports2.exportPKCS8 = exports2.UnsecuredJWT = exports2.createRemoteJWKSet = exports2.createLocalJWKSet = exports2.EmbeddedJWK = exports2.calculateJwkThumbprintUri = exports2.calculateJwkThumbprint = exports2.EncryptJWT = exports2.SignJWT = exports2.GeneralSign = exports2.FlattenedSign = exports2.CompactSign = exports2.FlattenedEncrypt = exports2.CompactEncrypt = exports2.jwtDecrypt = exports2.jwtVerify = exports2.generalVerify = exports2.flattenedVerify = exports2.compactVerify = exports2.GeneralEncrypt = exports2.generalDecrypt = exports2.flattenedDecrypt = exports2.compactDecrypt = void 0;
    var decrypt_js_1 = require_decrypt3();
    Object.defineProperty(exports2, "compactDecrypt", { enumerable: true, get: function() {
      return decrypt_js_1.compactDecrypt;
    } });
    var decrypt_js_2 = require_decrypt2();
    Object.defineProperty(exports2, "flattenedDecrypt", { enumerable: true, get: function() {
      return decrypt_js_2.flattenedDecrypt;
    } });
    var decrypt_js_3 = require_decrypt4();
    Object.defineProperty(exports2, "generalDecrypt", { enumerable: true, get: function() {
      return decrypt_js_3.generalDecrypt;
    } });
    var encrypt_js_1 = require_encrypt3();
    Object.defineProperty(exports2, "GeneralEncrypt", { enumerable: true, get: function() {
      return encrypt_js_1.GeneralEncrypt;
    } });
    var verify_js_1 = require_verify4();
    Object.defineProperty(exports2, "compactVerify", { enumerable: true, get: function() {
      return verify_js_1.compactVerify;
    } });
    var verify_js_2 = require_verify3();
    Object.defineProperty(exports2, "flattenedVerify", { enumerable: true, get: function() {
      return verify_js_2.flattenedVerify;
    } });
    var verify_js_3 = require_verify5();
    Object.defineProperty(exports2, "generalVerify", { enumerable: true, get: function() {
      return verify_js_3.generalVerify;
    } });
    var verify_js_4 = require_verify6();
    Object.defineProperty(exports2, "jwtVerify", { enumerable: true, get: function() {
      return verify_js_4.jwtVerify;
    } });
    var decrypt_js_4 = require_decrypt5();
    Object.defineProperty(exports2, "jwtDecrypt", { enumerable: true, get: function() {
      return decrypt_js_4.jwtDecrypt;
    } });
    var encrypt_js_2 = require_encrypt4();
    Object.defineProperty(exports2, "CompactEncrypt", { enumerable: true, get: function() {
      return encrypt_js_2.CompactEncrypt;
    } });
    var encrypt_js_3 = require_encrypt2();
    Object.defineProperty(exports2, "FlattenedEncrypt", { enumerable: true, get: function() {
      return encrypt_js_3.FlattenedEncrypt;
    } });
    var sign_js_1 = require_sign4();
    Object.defineProperty(exports2, "CompactSign", { enumerable: true, get: function() {
      return sign_js_1.CompactSign;
    } });
    var sign_js_2 = require_sign3();
    Object.defineProperty(exports2, "FlattenedSign", { enumerable: true, get: function() {
      return sign_js_2.FlattenedSign;
    } });
    var sign_js_3 = require_sign5();
    Object.defineProperty(exports2, "GeneralSign", { enumerable: true, get: function() {
      return sign_js_3.GeneralSign;
    } });
    var sign_js_4 = require_sign6();
    Object.defineProperty(exports2, "SignJWT", { enumerable: true, get: function() {
      return sign_js_4.SignJWT;
    } });
    var encrypt_js_4 = require_encrypt5();
    Object.defineProperty(exports2, "EncryptJWT", { enumerable: true, get: function() {
      return encrypt_js_4.EncryptJWT;
    } });
    var thumbprint_js_1 = require_thumbprint();
    Object.defineProperty(exports2, "calculateJwkThumbprint", { enumerable: true, get: function() {
      return thumbprint_js_1.calculateJwkThumbprint;
    } });
    Object.defineProperty(exports2, "calculateJwkThumbprintUri", { enumerable: true, get: function() {
      return thumbprint_js_1.calculateJwkThumbprintUri;
    } });
    var embedded_js_1 = require_embedded();
    Object.defineProperty(exports2, "EmbeddedJWK", { enumerable: true, get: function() {
      return embedded_js_1.EmbeddedJWK;
    } });
    var local_js_1 = require_local();
    Object.defineProperty(exports2, "createLocalJWKSet", { enumerable: true, get: function() {
      return local_js_1.createLocalJWKSet;
    } });
    var remote_js_1 = require_remote();
    Object.defineProperty(exports2, "createRemoteJWKSet", { enumerable: true, get: function() {
      return remote_js_1.createRemoteJWKSet;
    } });
    var unsecured_js_1 = require_unsecured();
    Object.defineProperty(exports2, "UnsecuredJWT", { enumerable: true, get: function() {
      return unsecured_js_1.UnsecuredJWT;
    } });
    var export_js_1 = require_export();
    Object.defineProperty(exports2, "exportPKCS8", { enumerable: true, get: function() {
      return export_js_1.exportPKCS8;
    } });
    Object.defineProperty(exports2, "exportSPKI", { enumerable: true, get: function() {
      return export_js_1.exportSPKI;
    } });
    Object.defineProperty(exports2, "exportJWK", { enumerable: true, get: function() {
      return export_js_1.exportJWK;
    } });
    var import_js_1 = require_import();
    Object.defineProperty(exports2, "importSPKI", { enumerable: true, get: function() {
      return import_js_1.importSPKI;
    } });
    Object.defineProperty(exports2, "importPKCS8", { enumerable: true, get: function() {
      return import_js_1.importPKCS8;
    } });
    Object.defineProperty(exports2, "importX509", { enumerable: true, get: function() {
      return import_js_1.importX509;
    } });
    Object.defineProperty(exports2, "importJWK", { enumerable: true, get: function() {
      return import_js_1.importJWK;
    } });
    var decode_protected_header_js_1 = require_decode_protected_header();
    Object.defineProperty(exports2, "decodeProtectedHeader", { enumerable: true, get: function() {
      return decode_protected_header_js_1.decodeProtectedHeader;
    } });
    var decode_jwt_js_1 = require_decode_jwt();
    Object.defineProperty(exports2, "decodeJwt", { enumerable: true, get: function() {
      return decode_jwt_js_1.decodeJwt;
    } });
    exports2.errors = require_errors();
    var generate_key_pair_js_1 = require_generate_key_pair();
    Object.defineProperty(exports2, "generateKeyPair", { enumerable: true, get: function() {
      return generate_key_pair_js_1.generateKeyPair;
    } });
    var generate_secret_js_1 = require_generate_secret();
    Object.defineProperty(exports2, "generateSecret", { enumerable: true, get: function() {
      return generate_secret_js_1.generateSecret;
    } });
    exports2.base64url = require_base64url2();
    var runtime_js_1 = require_runtime2();
    Object.defineProperty(exports2, "cryptoRuntime", { enumerable: true, get: function() {
      return runtime_js_1.default;
    } });
  }
});

// node_modules/jwks-rsa/src/errors/JwksError.js
var require_JwksError = __commonJS({
  "node_modules/jwks-rsa/src/errors/JwksError.js"(exports2, module2) {
    function JwksError(message) {
      Error.call(this, message);
      Error.captureStackTrace(this, this.constructor);
      this.name = "JwksError";
      this.message = message;
    }
    JwksError.prototype = Object.create(Error.prototype);
    JwksError.prototype.constructor = JwksError;
    module2.exports = JwksError;
  }
});

// node_modules/jwks-rsa/src/utils.js
var require_utils = __commonJS({
  "node_modules/jwks-rsa/src/utils.js"(exports2, module2) {
    var jose = require_cjs();
    var JwksError = require_JwksError();
    function resolveAlg(jwk) {
      if (jwk.alg) {
        return jwk.alg;
      }
      if (jwk.kty === "RSA") {
        return "RS256";
      }
      if (jwk.kty === "EC") {
        switch (jwk.crv) {
          case "P-256":
            return "ES256";
          case "secp256k1":
            return "ES256K";
          case "P-384":
            return "ES384";
          case "P-521":
            return "ES512";
        }
      }
      if (jwk.kty === "OKP") {
        switch (jwk.crv) {
          case "Ed25519":
          case "Ed448":
            return "EdDSA";
        }
      }
      throw new JwksError("Unsupported JWK");
    }
    async function retrieveSigningKeys(jwks) {
      const results = [];
      jwks = jwks.filter(({ use }) => use === "sig" || use === void 0).filter(({ kty }) => kty === "RSA" || kty === "EC" || kty === "OKP");
      for (const jwk of jwks) {
        try {
          const key = await jose.importJWK(jwk, resolveAlg(jwk));
          if (key.type !== "public") {
            continue;
          }
          let getSpki;
          switch (key[Symbol.toStringTag]) {
            case "CryptoKey": {
              const spki = await jose.exportSPKI(key);
              getSpki = () => spki;
              break;
            }
            case "KeyObject":
            default:
              getSpki = () => key.export({ format: "pem", type: "spki" });
          }
          results.push({
            get publicKey() {
              return getSpki();
            },
            get rsaPublicKey() {
              return getSpki();
            },
            getPublicKey() {
              return getSpki();
            },
            ...typeof jwk.kid === "string" && jwk.kid ? { kid: jwk.kid } : void 0,
            ...typeof jwk.alg === "string" && jwk.alg ? { alg: jwk.alg } : void 0
          });
        } catch (err) {
          continue;
        }
      }
      return results;
    }
    module2.exports = {
      retrieveSigningKeys
    };
  }
});

// node_modules/jwks-rsa/src/wrappers/request.js
var require_request = __commonJS({
  "node_modules/jwks-rsa/src/wrappers/request.js"(exports2, module2) {
    var http = require("http");
    var https = require("https");
    var urlUtil = require("url");
    module2.exports.default = (options) => {
      if (options.fetcher) {
        return options.fetcher(options.uri);
      }
      return new Promise((resolve, reject) => {
        const {
          hostname,
          path,
          port,
          protocol
        } = urlUtil.parse(options.uri);
        const requestOptions = {
          hostname,
          path,
          port,
          method: "GET",
          ...options.headers && { headers: { ...options.headers } },
          ...options.timeout && { timeout: options.timeout },
          ...options.agent && { agent: options.agent }
        };
        const httpRequestLib = protocol === "https:" ? https : http;
        const httpRequest = httpRequestLib.request(requestOptions, (res) => {
          let rawData = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => {
            rawData += chunk;
          });
          res.on("end", () => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
              const errorMsg = res.body && (res.body.message || res.body) || res.statusMessage || `Http Error ${res.statusCode}`;
              reject({ errorMsg });
            } else {
              try {
                resolve(rawData && JSON.parse(rawData));
              } catch (error) {
                reject(error);
              }
            }
          });
        });
        httpRequest.on("timeout", () => httpRequest.destroy()).on("error", (e) => reject(e)).end();
      });
    };
  }
});

// node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "node_modules/yallist/iterator.js"(exports2, module2) {
    "use strict";
    module2.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "node_modules/yallist/yallist.js"(exports2, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self2 = this;
      if (!(self2 instanceof Yallist)) {
        self2 = new Yallist();
      }
      self2.tail = null;
      self2.head = null;
      self2.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self2.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self2.push(arguments[i]);
        }
      }
      return self2;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self2, node, value) {
      var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
      if (inserted.next === null) {
        self2.tail = inserted;
      }
      if (inserted.prev === null) {
        self2.head = inserted;
      }
      self2.length++;
      return inserted;
    }
    function push(self2, item) {
      self2.tail = new Node(item, self2.tail, null, self2);
      if (!self2.head) {
        self2.head = self2.tail;
      }
      self2.length++;
    }
    function unshift(self2, item) {
      self2.head = new Node(item, null, self2.head, self2);
      if (!self2.tail) {
        self2.tail = self2.head;
      }
      self2.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// node_modules/lru-memoizer/node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/lru-memoizer/node_modules/lru-cache/index.js"(exports2, module2) {
    "use strict";
    var Yallist = require_yallist();
    var MAX = Symbol("max");
    var LENGTH = Symbol("length");
    var LENGTH_CALCULATOR = Symbol("lengthCalculator");
    var ALLOW_STALE = Symbol("allowStale");
    var MAX_AGE = Symbol("maxAge");
    var DISPOSE = Symbol("dispose");
    var NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    var LRU_LIST = Symbol("lruList");
    var CACHE = Symbol("cache");
    var UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    var naiveLength = () => 1;
    var LRUCache = class {
      constructor(options) {
        if (typeof options === "number")
          options = { max: options };
        if (!options)
          options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0))
          throw new TypeError("max must be a non-negative number");
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      // resize the cache when the max changes.
      set max(mL) {
        if (typeof mL !== "number" || mL < 0)
          throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number")
          throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      // resize the cache when the lengthCalculator changes.
      set lengthCalculator(lC) {
        if (typeof lC !== "function")
          lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = /* @__PURE__ */ new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key)) return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null;
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self2, key, doUse) => {
      const node = self2[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self2, hit)) {
          del(self2, node);
          if (!self2[ALLOW_STALE])
            return void 0;
        } else {
          if (doUse) {
            if (self2[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self2[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self2, hit) => {
      if (!hit || !hit.maxAge && !self2[MAX_AGE])
        return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self2[MAX_AGE] && diff > self2[MAX_AGE];
    };
    var trim = (self2) => {
      if (self2[LENGTH] > self2[MAX]) {
        for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
          const prev = walker.prev;
          del(self2, walker);
          walker = prev;
        }
      }
    };
    var del = (self2, node) => {
      if (node) {
        const hit = node.value;
        if (self2[DISPOSE])
          self2[DISPOSE](hit.key, hit.value);
        self2[LENGTH] -= hit.length;
        self2[CACHE].delete(hit.key);
        self2[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self2, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self2, hit)) {
        del(self2, node);
        if (!self2[ALLOW_STALE])
          hit = void 0;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self2);
    };
    module2.exports = LRUCache;
  }
});

// node_modules/lodash.clonedeep/index.js
var require_lodash8 = __commonJS({
  "node_modules/lodash.clonedeep/index.js"(exports2, module2) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set, value) {
      set.add(value);
      return set;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    function copyObject(source, props, object, customizer) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
        assignValue(object, key, newValue === void 0 ? source[key] : newValue);
      }
      return object;
    }
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array) {
      var length = array.length, result = array.constructor(length);
      if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }
    function initCloneObject(object) {
      return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
    }
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
          return new Ctor(+object);
        case dataViewTag:
          return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object, isDeep);
        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object);
        case regexpTag:
          return cloneRegExp(object);
        case setTag:
          return cloneSet(object, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function cloneDeep(value) {
      return baseClone(value, true, true);
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module2.exports = cloneDeep;
  }
});

// node_modules/lru-memoizer/lib/freeze.js
var require_freeze = __commonJS({
  "node_modules/lru-memoizer/lib/freeze.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deepFreeze = void 0;
    function deepFreeze(o) {
      if (o) {
        Object.freeze(o);
        Object.getOwnPropertyNames(o).forEach(function(prop) {
          if (o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && o[prop].constructor !== Buffer && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
          }
        });
      }
      return o;
    }
    exports2.deepFreeze = deepFreeze;
  }
});

// node_modules/lru-memoizer/lib/sync.js
var require_sync = __commonJS({
  "node_modules/lru-memoizer/lib/sync.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spread = exports2 && exports2.__spread || function() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
      return ar;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.syncMemoizer = void 0;
    var lru_cache_1 = __importDefault(require_lru_cache());
    var events_1 = require("events");
    var lodash_clonedeep_1 = __importDefault(require_lodash8());
    var freeze_1 = require_freeze();
    function syncMemoizer(options) {
      var cache = new lru_cache_1.default(options);
      var load = options.load;
      var hash = options.hash;
      var bypass = options.bypass;
      var itemMaxAge = options.itemMaxAge;
      var freeze = options.freeze;
      var clone = options.clone;
      var emitter = new events_1.EventEmitter();
      var defaultResult = Object.assign({
        del,
        reset: function() {
          return cache.reset();
        },
        keys: cache.keys.bind(cache),
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter)
      }, options);
      if (options.disable) {
        return Object.assign(load, defaultResult);
      }
      function del() {
        var key = hash.apply(void 0, __spread(arguments));
        cache.del(key);
      }
      function emit(event) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          parameters[_i - 1] = arguments[_i];
        }
        emitter.emit.apply(emitter, __spread([event], parameters));
      }
      function isPromise(result2) {
        return result2 && result2.then && typeof result2.then === "function";
      }
      function processResult(result2) {
        var res = result2;
        if (clone) {
          if (isPromise(res)) {
            res = res.then(lodash_clonedeep_1.default);
          } else {
            res = lodash_clonedeep_1.default(res);
          }
        }
        if (freeze) {
          if (isPromise(res)) {
            res = res.then(freeze_1.deepFreeze);
          } else {
            freeze_1.deepFreeze(res);
          }
        }
        return res;
      }
      var result = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (bypass && bypass.apply(void 0, __spread(args))) {
          emit.apply(void 0, __spread(["miss"], args));
          return load.apply(void 0, __spread(args));
        }
        var key = hash.apply(void 0, __spread(args));
        var fromCache = cache.get(key);
        if (fromCache) {
          emit.apply(void 0, __spread(["hit"], args));
          return processResult(fromCache);
        }
        emit.apply(void 0, __spread(["miss"], args));
        var result2 = load.apply(void 0, __spread(args));
        if (itemMaxAge) {
          cache.set(key, result2, itemMaxAge.apply(void 0, __spread(args.concat([result2]))));
        } else {
          cache.set(key, result2);
        }
        return processResult(result2);
      };
      return Object.assign(result, defaultResult);
    }
    exports2.syncMemoizer = syncMemoizer;
  }
});

// node_modules/lru-memoizer/lib/async.js
var require_async = __commonJS({
  "node_modules/lru-memoizer/lib/async.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spread = exports2 && exports2.__spread || function() {
      for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
      return ar;
    };
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.asyncMemoizer = void 0;
    var lru_cache_1 = __importDefault(require_lru_cache());
    var events_1 = require("events");
    var lodash_clonedeep_1 = __importDefault(require_lodash8());
    var freeze_1 = require_freeze();
    var sync_1 = require_sync();
    function asyncMemoizer(options) {
      var cache = new lru_cache_1.default(options);
      var load = options.load;
      var hash = options.hash;
      var bypass = options.bypass;
      var itemMaxAge = options.itemMaxAge;
      var freeze = options.freeze;
      var clone = options.clone;
      var queueMaxAge = options.queueMaxAge || 1e3;
      var loading = /* @__PURE__ */ new Map();
      var emitter = new events_1.EventEmitter();
      var memoizerMethods = Object.assign({
        del,
        reset: function() {
          return cache.reset();
        },
        keys: cache.keys.bind(cache),
        on: emitter.on.bind(emitter),
        once: emitter.once.bind(emitter)
      }, options);
      if (options.disable) {
        return Object.assign(load, memoizerMethods);
      }
      function del() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var key = hash.apply(void 0, __spread(args));
        cache.del(key);
      }
      function add(key, parameters, result) {
        if (freeze) {
          result.forEach(freeze_1.deepFreeze);
        }
        if (itemMaxAge) {
          cache.set(key, result, itemMaxAge.apply(void 0, __spread(parameters.concat(result))));
        } else {
          cache.set(key, result);
        }
      }
      function runCallbacks(callbacks, args) {
        var e_1, _a;
        try {
          for (var callbacks_1 = __values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
            var callback = callbacks_1_1.value;
            if (clone) {
              setImmediate.apply(void 0, __spread([callback], args.map(lodash_clonedeep_1.default)));
            } else {
              setImmediate.apply(void 0, __spread([callback], args));
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (callbacks_1_1 && !callbacks_1_1.done && (_a = callbacks_1.return)) _a.call(callbacks_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
      function emit(event) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          parameters[_i - 1] = arguments[_i];
        }
        emitter.emit.apply(emitter, __spread([event], parameters));
      }
      function memoizedFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var parameters = args.slice(0, -1);
        var callback = args.slice(-1).pop();
        var key;
        if (bypass && bypass.apply(void 0, __spread(parameters))) {
          emit.apply(void 0, __spread(["miss"], parameters));
          return load.apply(void 0, __spread(args));
        }
        if (parameters.length === 0 && !hash) {
          key = "_";
        } else {
          key = hash.apply(void 0, __spread(parameters));
        }
        var fromCache = cache.get(key);
        if (fromCache) {
          emit.apply(void 0, __spread(["hit"], parameters));
          return runCallbacks([callback], [null].concat(fromCache));
        }
        var pendingLoad = loading.get(key);
        if (pendingLoad && pendingLoad.expiresAt > Date.now()) {
          pendingLoad.queue.push(callback);
          emit.apply(void 0, __spread(["queue"], parameters));
          return;
        }
        emit.apply(void 0, __spread(["miss"], parameters));
        var started = Date.now();
        var queue = [callback];
        loading.set(key, {
          queue,
          expiresAt: started + queueMaxAge
        });
        var loadHandler = function() {
          var args2 = [];
          for (var _i2 = 0; _i2 < arguments.length; _i2++) {
            args2[_i2] = arguments[_i2];
          }
          var err = args2[0];
          if (!err) {
            add(key, parameters, args2.slice(1));
          }
          loading.delete(key);
          emit.apply(void 0, __spread(["loaded", Date.now() - started], parameters));
          runCallbacks(queue, args2);
        };
        load.apply(void 0, __spread(parameters, [loadHandler]));
      }
      ;
      return Object.assign(memoizedFunction, memoizerMethods);
    }
    exports2.asyncMemoizer = asyncMemoizer;
    asyncMemoizer.sync = sync_1.syncMemoizer;
  }
});

// node_modules/lru-memoizer/lib/index.js
var require_lib = __commonJS({
  "node_modules/lru-memoizer/lib/index.js"(exports2, module2) {
    "use strict";
    var async_1 = require_async();
    module2.exports = async_1.asyncMemoizer;
  }
});

// node_modules/jwks-rsa/src/wrappers/cache.js
var require_cache = __commonJS({
  "node_modules/jwks-rsa/src/wrappers/cache.js"(exports2, module2) {
    var logger = require_src()("jwks");
    var memoizer = require_lib();
    var { promisify, callbackify } = require("util");
    function cacheWrapper(client2, { cacheMaxEntries = 5, cacheMaxAge = 6e5 }) {
      logger(`Configured caching of signing keys. Max: ${cacheMaxEntries} / Age: ${cacheMaxAge}`);
      return promisify(memoizer({
        hash: (kid) => kid,
        load: callbackify(client2.getSigningKey.bind(client2)),
        maxAge: cacheMaxAge,
        max: cacheMaxEntries
      }));
    }
    module2.exports.default = cacheWrapper;
  }
});

// node_modules/limiter/lib/tokenBucket.js
var require_tokenBucket = __commonJS({
  "node_modules/limiter/lib/tokenBucket.js"(exports2, module2) {
    var TokenBucket = function(bucketSize, tokensPerInterval, interval, parentBucket) {
      this.bucketSize = bucketSize;
      this.tokensPerInterval = tokensPerInterval;
      if (typeof interval === "string") {
        switch (interval) {
          case "sec":
          case "second":
            this.interval = 1e3;
            break;
          case "min":
          case "minute":
            this.interval = 1e3 * 60;
            break;
          case "hr":
          case "hour":
            this.interval = 1e3 * 60 * 60;
            break;
          case "day":
            this.interval = 1e3 * 60 * 60 * 24;
            break;
          default:
            throw new Error("Invaid interval " + interval);
        }
      } else {
        this.interval = interval;
      }
      this.parentBucket = parentBucket;
      this.content = 0;
      this.lastDrip = +/* @__PURE__ */ new Date();
    };
    TokenBucket.prototype = {
      bucketSize: 1,
      tokensPerInterval: 1,
      interval: 1e3,
      parentBucket: null,
      content: 0,
      lastDrip: 0,
      /**
       * Remove the requested number of tokens and fire the given callback. If the
       * bucket (and any parent buckets) contains enough tokens this will happen
       * immediately. Otherwise, the removal and callback will happen when enough
       * tokens become available.
       * @param {Number} count The number of tokens to remove.
       * @param {Function} callback(err, remainingTokens)
       * @returns {Boolean} True if the callback was fired immediately, otherwise
       *  false.
       */
      removeTokens: function(count, callback) {
        var self2 = this;
        if (!this.bucketSize) {
          process.nextTick(callback.bind(null, null, count, Number.POSITIVE_INFINITY));
          return true;
        }
        if (count > this.bucketSize) {
          process.nextTick(callback.bind(null, "Requested tokens " + count + " exceeds bucket size " + this.bucketSize, null));
          return false;
        }
        this.drip();
        if (count > this.content)
          return comeBackLater();
        if (this.parentBucket) {
          return this.parentBucket.removeTokens(count, function(err, remainingTokens) {
            if (err) return callback(err, null);
            if (count > self2.content)
              return comeBackLater();
            self2.content -= count;
            callback(null, Math.min(remainingTokens, self2.content));
          });
        } else {
          this.content -= count;
          process.nextTick(callback.bind(null, null, this.content));
          return true;
        }
        function comeBackLater() {
          var waitInterval = Math.ceil(
            (count - self2.content) * (self2.interval / self2.tokensPerInterval)
          );
          setTimeout(function() {
            self2.removeTokens(count, callback);
          }, waitInterval);
          return false;
        }
      },
      /**
       * Attempt to remove the requested number of tokens and return immediately.
       * If the bucket (and any parent buckets) contains enough tokens this will
       * return true, otherwise false is returned.
       * @param {Number} count The number of tokens to remove.
       * @param {Boolean} True if the tokens were successfully removed, otherwise
       *  false.
       */
      tryRemoveTokens: function(count) {
        if (!this.bucketSize)
          return true;
        if (count > this.bucketSize)
          return false;
        this.drip();
        if (count > this.content)
          return false;
        if (this.parentBucket && !this.parentBucket.tryRemoveTokens(count))
          return false;
        this.content -= count;
        return true;
      },
      /**
       * Add any new tokens to the bucket since the last drip.
       * @returns {Boolean} True if new tokens were added, otherwise false.
       */
      drip: function() {
        if (!this.tokensPerInterval) {
          this.content = this.bucketSize;
          return;
        }
        var now = +/* @__PURE__ */ new Date();
        var deltaMS = Math.max(now - this.lastDrip, 0);
        this.lastDrip = now;
        var dripAmount = deltaMS * (this.tokensPerInterval / this.interval);
        this.content = Math.min(this.content + dripAmount, this.bucketSize);
      }
    };
    module2.exports = TokenBucket;
  }
});

// node_modules/limiter/lib/clock.js
var require_clock = __commonJS({
  "node_modules/limiter/lib/clock.js"(exports2, module2) {
    var getMilliseconds = function() {
      if (typeof process !== "undefined" && process.hrtime) {
        var hrtime = process.hrtime();
        var seconds = hrtime[0];
        var nanoseconds = hrtime[1];
        return seconds * 1e3 + Math.floor(nanoseconds / 1e6);
      }
      return (/* @__PURE__ */ new Date()).getTime();
    };
    module2.exports = getMilliseconds;
  }
});

// node_modules/limiter/lib/rateLimiter.js
var require_rateLimiter = __commonJS({
  "node_modules/limiter/lib/rateLimiter.js"(exports2, module2) {
    var TokenBucket = require_tokenBucket();
    var getMilliseconds = require_clock();
    var RateLimiter = function(tokensPerInterval, interval, fireImmediately) {
      this.tokenBucket = new TokenBucket(
        tokensPerInterval,
        tokensPerInterval,
        interval,
        null
      );
      this.tokenBucket.content = tokensPerInterval;
      this.curIntervalStart = getMilliseconds();
      this.tokensThisInterval = 0;
      this.fireImmediately = fireImmediately;
    };
    RateLimiter.prototype = {
      tokenBucket: null,
      curIntervalStart: 0,
      tokensThisInterval: 0,
      fireImmediately: false,
      /**
       * Remove the requested number of tokens and fire the given callback. If the
       * rate limiter contains enough tokens and we haven't spent too many tokens
       * in this interval already, this will happen immediately. Otherwise, the
       * removal and callback will happen when enough tokens become available.
       * @param {Number} count The number of tokens to remove.
       * @param {Function} callback(err, remainingTokens)
       * @returns {Boolean} True if the callback was fired immediately, otherwise
       *  false.
       */
      removeTokens: function(count, callback) {
        if (count > this.tokenBucket.bucketSize) {
          process.nextTick(callback.bind(
            null,
            "Requested tokens " + count + " exceeds maximum tokens per interval " + this.tokenBucket.bucketSize,
            null
          ));
          return false;
        }
        var self2 = this;
        var now = getMilliseconds();
        if (now < this.curIntervalStart || now - this.curIntervalStart >= this.tokenBucket.interval) {
          this.curIntervalStart = now;
          this.tokensThisInterval = 0;
        }
        if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) {
          if (this.fireImmediately) {
            process.nextTick(callback.bind(null, null, -1));
          } else {
            var waitInterval = Math.ceil(
              this.curIntervalStart + this.tokenBucket.interval - now
            );
            setTimeout(function() {
              self2.tokenBucket.removeTokens(count, afterTokensRemoved);
            }, waitInterval);
          }
          return false;
        }
        return this.tokenBucket.removeTokens(count, afterTokensRemoved);
        function afterTokensRemoved(err, tokensRemaining) {
          if (err) return callback(err, null);
          self2.tokensThisInterval += count;
          callback(null, tokensRemaining);
        }
      },
      /**
       * Attempt to remove the requested number of tokens and return immediately.
       * If the bucket (and any parent buckets) contains enough tokens and we
       * haven't spent too many tokens in this interval already, this will return
       * true. Otherwise, false is returned.
       * @param {Number} count The number of tokens to remove.
       * @param {Boolean} True if the tokens were successfully removed, otherwise
       *  false.
       */
      tryRemoveTokens: function(count) {
        if (count > this.tokenBucket.bucketSize)
          return false;
        var now = getMilliseconds();
        if (now < this.curIntervalStart || now - this.curIntervalStart >= this.tokenBucket.interval) {
          this.curIntervalStart = now;
          this.tokensThisInterval = 0;
        }
        if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval)
          return false;
        var removed = this.tokenBucket.tryRemoveTokens(count);
        if (removed) {
          this.tokensThisInterval += count;
        }
        return removed;
      },
      /**
       * Returns the number of tokens remaining in the TokenBucket.
       * @returns {Number} The number of tokens remaining.
       */
      getTokensRemaining: function() {
        this.tokenBucket.drip();
        return this.tokenBucket.content;
      }
    };
    module2.exports = RateLimiter;
  }
});

// node_modules/limiter/index.js
var require_limiter = __commonJS({
  "node_modules/limiter/index.js"(exports2) {
    exports2.RateLimiter = require_rateLimiter();
    exports2.TokenBucket = require_tokenBucket();
  }
});

// node_modules/jwks-rsa/src/errors/JwksRateLimitError.js
var require_JwksRateLimitError = __commonJS({
  "node_modules/jwks-rsa/src/errors/JwksRateLimitError.js"(exports2, module2) {
    function JwksRateLimitError(message) {
      Error.call(this, message);
      Error.captureStackTrace(this, this.constructor);
      this.name = "JwksRateLimitError";
      this.message = message;
    }
    JwksRateLimitError.prototype = Object.create(Error.prototype);
    JwksRateLimitError.prototype.constructor = JwksRateLimitError;
    module2.exports = JwksRateLimitError;
  }
});

// node_modules/jwks-rsa/src/wrappers/rateLimit.js
var require_rateLimit = __commonJS({
  "node_modules/jwks-rsa/src/wrappers/rateLimit.js"(exports2, module2) {
    var logger = require_src()("jwks");
    var { RateLimiter } = require_limiter();
    var JwksRateLimitError = require_JwksRateLimitError();
    function rateLimitWrapper(client2, { jwksRequestsPerMinute = 10 }) {
      const getSigningKey = client2.getSigningKey.bind(client2);
      const limiter = new RateLimiter(jwksRequestsPerMinute, "minute", true);
      logger(`Configured rate limiting to JWKS endpoint at ${jwksRequestsPerMinute}/minute`);
      return async (kid) => await new Promise((resolve, reject) => {
        limiter.removeTokens(1, async (err, remaining) => {
          if (err) {
            reject(err);
          }
          logger("Requests to the JWKS endpoint available for the next minute:", remaining);
          if (remaining < 0) {
            logger("Too many requests to the JWKS endpoint");
            reject(new JwksRateLimitError("Too many requests to the JWKS endpoint"));
          } else {
            try {
              const key = await getSigningKey(kid);
              resolve(key);
            } catch (error) {
              reject(error);
            }
          }
        });
      });
    }
    module2.exports.default = rateLimitWrapper;
  }
});

// node_modules/jwks-rsa/src/wrappers/interceptor.js
var require_interceptor = __commonJS({
  "node_modules/jwks-rsa/src/wrappers/interceptor.js"(exports2, module2) {
    var retrieveSigningKeys = require_utils().retrieveSigningKeys;
    function getKeysInterceptor(client2, { getKeysInterceptor: getKeysInterceptor2 }) {
      const getSigningKey = client2.getSigningKey.bind(client2);
      return async (kid) => {
        const keys = await getKeysInterceptor2();
        let signingKeys;
        if (keys && keys.length) {
          signingKeys = await retrieveSigningKeys(keys);
        }
        if (signingKeys && signingKeys.length) {
          const key = signingKeys.find((k) => !kid || k.kid === kid);
          if (key) {
            return key;
          }
        }
        return getSigningKey(kid);
      };
    }
    module2.exports.default = getKeysInterceptor;
  }
});

// node_modules/jwks-rsa/src/wrappers/callbackSupport.js
var require_callbackSupport = __commonJS({
  "node_modules/jwks-rsa/src/wrappers/callbackSupport.js"(exports2, module2) {
    var { callbackify } = require("util");
    var callbackSupport = (client2) => {
      const getSigningKey = client2.getSigningKey.bind(client2);
      return (kid, cb) => {
        if (cb) {
          const callbackFunc = callbackify(getSigningKey);
          return callbackFunc(kid, cb);
        }
        return getSigningKey(kid);
      };
    };
    module2.exports.default = callbackSupport;
  }
});

// node_modules/jwks-rsa/src/wrappers/index.js
var require_wrappers = __commonJS({
  "node_modules/jwks-rsa/src/wrappers/index.js"(exports2, module2) {
    module2.exports = {
      request: require_request().default,
      cacheSigningKey: require_cache().default,
      rateLimitSigningKey: require_rateLimit().default,
      getKeysInterceptor: require_interceptor().default,
      callbackSupport: require_callbackSupport().default
    };
  }
});

// node_modules/jwks-rsa/src/errors/SigningKeyNotFoundError.js
var require_SigningKeyNotFoundError = __commonJS({
  "node_modules/jwks-rsa/src/errors/SigningKeyNotFoundError.js"(exports2, module2) {
    function SigningKeyNotFoundError(message) {
      Error.call(this, message);
      Error.captureStackTrace(this, this.constructor);
      this.name = "SigningKeyNotFoundError";
      this.message = message;
    }
    SigningKeyNotFoundError.prototype = Object.create(Error.prototype);
    SigningKeyNotFoundError.prototype.constructor = SigningKeyNotFoundError;
    module2.exports = SigningKeyNotFoundError;
  }
});

// node_modules/jwks-rsa/src/JwksClient.js
var require_JwksClient = __commonJS({
  "node_modules/jwks-rsa/src/JwksClient.js"(exports2, module2) {
    var logger = require_src()("jwks");
    var { retrieveSigningKeys } = require_utils();
    var { request, cacheSigningKey, rateLimitSigningKey, getKeysInterceptor, callbackSupport } = require_wrappers();
    var JwksError = require_JwksError();
    var SigningKeyNotFoundError = require_SigningKeyNotFoundError();
    var JwksClient = class {
      constructor(options) {
        this.options = {
          rateLimit: false,
          cache: true,
          timeout: 3e4,
          ...options
        };
        if (this.options.getKeysInterceptor) {
          this.getSigningKey = getKeysInterceptor(this, options);
        }
        if (this.options.rateLimit) {
          this.getSigningKey = rateLimitSigningKey(this, options);
        }
        if (this.options.cache) {
          this.getSigningKey = cacheSigningKey(this, options);
        }
        this.getSigningKey = callbackSupport(this, options);
      }
      async getKeys() {
        logger(`Fetching keys from '${this.options.jwksUri}'`);
        try {
          const res = await request({
            uri: this.options.jwksUri,
            headers: this.options.requestHeaders,
            agent: this.options.requestAgent,
            timeout: this.options.timeout,
            fetcher: this.options.fetcher
          });
          logger("Keys:", res.keys);
          return res.keys;
        } catch (err) {
          const { errorMsg } = err;
          logger("Failure:", errorMsg || err);
          throw errorMsg ? new JwksError(errorMsg) : err;
        }
      }
      async getSigningKeys() {
        const keys = await this.getKeys();
        if (!keys || !keys.length) {
          throw new JwksError("The JWKS endpoint did not contain any keys");
        }
        const signingKeys = await retrieveSigningKeys(keys);
        if (!signingKeys.length) {
          throw new JwksError("The JWKS endpoint did not contain any signing keys");
        }
        logger("Signing Keys:", signingKeys);
        return signingKeys;
      }
      async getSigningKey(kid) {
        logger(`Fetching signing key for '${kid}'`);
        const keys = await this.getSigningKeys();
        const kidDefined = kid !== void 0 && kid !== null;
        if (!kidDefined && keys.length > 1) {
          logger("No KID specified and JWKS endpoint returned more than 1 key");
          throw new SigningKeyNotFoundError("No KID specified and JWKS endpoint returned more than 1 key");
        }
        const key = keys.find((k) => !kidDefined || k.kid === kid);
        if (key) {
          return key;
        } else {
          logger(`Unable to find a signing key that matches '${kid}'`);
          throw new SigningKeyNotFoundError(`Unable to find a signing key that matches '${kid}'`);
        }
      }
    };
    module2.exports = {
      JwksClient
    };
  }
});

// node_modules/jwks-rsa/src/errors/ArgumentError.js
var require_ArgumentError = __commonJS({
  "node_modules/jwks-rsa/src/errors/ArgumentError.js"(exports2, module2) {
    function ArgumentError(message) {
      Error.call(this, message);
      Error.captureStackTrace(this, this.constructor);
      this.name = "ArgumentError";
      this.message = message;
    }
    ArgumentError.prototype = Object.create(Error.prototype);
    ArgumentError.prototype.constructor = ArgumentError;
    module2.exports = ArgumentError;
  }
});

// node_modules/jwks-rsa/src/errors/index.js
var require_errors2 = __commonJS({
  "node_modules/jwks-rsa/src/errors/index.js"(exports2, module2) {
    module2.exports = {
      ArgumentError: require_ArgumentError(),
      JwksError: require_JwksError(),
      JwksRateLimitError: require_JwksRateLimitError(),
      SigningKeyNotFoundError: require_SigningKeyNotFoundError()
    };
  }
});

// node_modules/jwks-rsa/src/integrations/config.js
var require_config = __commonJS({
  "node_modules/jwks-rsa/src/integrations/config.js"(exports2, module2) {
    var allowedSignatureAlg = [
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES256K",
      "ES384",
      "ES512",
      "EdDSA"
    ];
    module2.exports = allowedSignatureAlg;
  }
});

// node_modules/jwks-rsa/src/integrations/hapi.js
var require_hapi = __commonJS({
  "node_modules/jwks-rsa/src/integrations/hapi.js"(exports2, module2) {
    var { ArgumentError } = require_errors2();
    var { JwksClient } = require_JwksClient();
    var supportedAlg = require_config();
    var handleSigningKeyError = (err, cb) => {
      if (err && err.name === "SigningKeyNotFoundError") {
        return cb(err, null, null);
      }
      if (err) {
        return cb(err, null, null);
      }
    };
    module2.exports.hapiJwt2KeyAsync = (options) => {
      const secretProvider = module2.exports.hapiJwt2Key(options);
      return function(decoded) {
        return new Promise((resolve, reject) => {
          const cb = (err, key) => {
            !key || err ? reject(err) : resolve({ key });
          };
          secretProvider(decoded, cb);
        });
      };
    };
    module2.exports.hapiJwt2Key = function(options) {
      if (options === null || options === void 0) {
        throw new ArgumentError("An options object must be provided when initializing hapiJwt2Key");
      }
      const client2 = new JwksClient(options);
      const onError = options.handleSigningKeyError || handleSigningKeyError;
      return function secretProvider(decoded, cb) {
        if (!decoded || !decoded.header) {
          return cb(new Error("Cannot find a signing certificate if there is no header"), null, null);
        }
        if (!supportedAlg.includes(decoded.header.alg)) {
          return cb(new Error("Unsupported algorithm " + decoded.header.alg + " supplied."), null, null);
        }
        client2.getSigningKey(decoded.header.kid).then((key) => {
          return cb(null, key.publicKey || key.rsaPublicKey, key);
        }).catch((err) => {
          return onError(err, (newError) => cb(newError, null, null));
        });
      };
    };
  }
});

// node_modules/jwks-rsa/src/integrations/express.js
var require_express = __commonJS({
  "node_modules/jwks-rsa/src/integrations/express.js"(exports2, module2) {
    var { ArgumentError } = require_errors2();
    var { JwksClient } = require_JwksClient();
    var supportedAlg = require_config();
    var handleSigningKeyError = (err, cb) => {
      if (err && err.name === "SigningKeyNotFoundError") {
        return cb(null);
      }
      if (err) {
        return cb(err);
      }
    };
    module2.exports.expressJwtSecret = function(options) {
      if (options === null || options === void 0) {
        throw new ArgumentError("An options object must be provided when initializing expressJwtSecret");
      }
      const client2 = new JwksClient(options);
      const onError = options.handleSigningKeyError || handleSigningKeyError;
      const expressJwt7Provider = async (req, token) => {
        if (!token) {
          return;
        }
        const header = token.header;
        if (!header || !supportedAlg.includes(header.alg)) {
          return;
        }
        try {
          const key = await client2.getSigningKey(header.kid);
          return key.publicKey || key.rsaPublicKey;
        } catch (err) {
          return new Promise((resolve, reject) => {
            onError(err, (newError) => {
              if (!newError) {
                return resolve();
              }
              reject(newError);
            });
          });
        }
      };
      return function secretProvider(req, header, payload, cb) {
        if (arguments.length === 4) {
          expressJwt7Provider(req, { header }).then((key) => {
            setImmediate(cb, null, key);
          }).catch((err) => {
            setImmediate(cb, err);
          });
          return;
        }
        return expressJwt7Provider(req, arguments[1]);
      };
    };
  }
});

// node_modules/jwks-rsa/src/integrations/koa.js
var require_koa = __commonJS({
  "node_modules/jwks-rsa/src/integrations/koa.js"(exports2, module2) {
    var { ArgumentError } = require_errors2();
    var { JwksClient } = require_JwksClient();
    var supportedAlg = require_config();
    module2.exports.koaJwtSecret = function(options = {}) {
      if (!options.jwksUri) {
        throw new ArgumentError("No JWKS provided. Please provide a jwksUri");
      }
      const client2 = new JwksClient(options);
      return function secretProvider({ alg, kid } = {}) {
        return new Promise((resolve, reject) => {
          if (!supportedAlg.includes(alg)) {
            return reject(new Error("Missing / invalid token algorithm"));
          }
          client2.getSigningKey(kid).then((key) => {
            resolve(key.publicKey || key.rsaPublicKey);
          }).catch((err) => {
            if (options.handleSigningKeyError) {
              return options.handleSigningKeyError(err).then(reject);
            }
            return reject(err);
          });
        });
      };
    };
  }
});

// node_modules/jwks-rsa/src/integrations/passport.js
var require_passport = __commonJS({
  "node_modules/jwks-rsa/src/integrations/passport.js"(exports2, module2) {
    var jose = require_cjs();
    var { ArgumentError } = require_errors2();
    var { JwksClient } = require_JwksClient();
    var supportedAlg = require_config();
    var handleSigningKeyError = (err, cb) => {
      if (err && err.name === "SigningKeyNotFoundError") {
        return cb(null);
      }
      if (err) {
        return cb(err);
      }
    };
    module2.exports.passportJwtSecret = function(options) {
      if (options === null || options === void 0) {
        throw new ArgumentError("An options object must be provided when initializing passportJwtSecret");
      }
      if (!options.jwksUri) {
        throw new ArgumentError("No JWKS provided. Please provide a jwksUri");
      }
      const client2 = new JwksClient(options);
      const onError = options.handleSigningKeyError || handleSigningKeyError;
      return function secretProvider(req, rawJwtToken, cb) {
        let decoded;
        try {
          decoded = {
            payload: jose.decodeJwt(rawJwtToken),
            header: jose.decodeProtectedHeader(rawJwtToken)
          };
        } catch (err) {
          decoded = null;
        }
        if (!decoded || !supportedAlg.includes(decoded.header.alg)) {
          return cb(null, null);
        }
        client2.getSigningKey(decoded.header.kid).then((key) => {
          cb(null, key.publicKey || key.rsaPublicKey);
        }).catch((err) => {
          onError(err, (newError) => cb(newError, null));
        });
      };
    };
  }
});

// node_modules/jwks-rsa/src/index.js
var require_src2 = __commonJS({
  "node_modules/jwks-rsa/src/index.js"(exports2, module2) {
    var { JwksClient } = require_JwksClient();
    var errors = require_errors2();
    var { hapiJwt2Key, hapiJwt2KeyAsync } = require_hapi();
    var { expressJwtSecret } = require_express();
    var { koaJwtSecret } = require_koa();
    var { passportJwtSecret } = require_passport();
    module2.exports = (options) => {
      return new JwksClient(options);
    };
    module2.exports.JwksClient = JwksClient;
    module2.exports.ArgumentError = errors.ArgumentError;
    module2.exports.JwksError = errors.JwksError;
    module2.exports.JwksRateLimitError = errors.JwksRateLimitError;
    module2.exports.SigningKeyNotFoundError = errors.SigningKeyNotFoundError;
    module2.exports.expressJwtSecret = expressJwtSecret;
    module2.exports.hapiJwt2Key = hapiJwt2Key;
    module2.exports.hapiJwt2KeyAsync = hapiJwt2KeyAsync;
    module2.exports.koaJwtSecret = koaJwtSecret;
    module2.exports.passportJwtSecret = passportJwtSecret;
  }
});

// src/handlers/auth.ts
var auth_exports = {};
__export(auth_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = __toESM(require_jsonwebtoken());
var import_jwks_rsa = __toESM(require_src2());
var client = (0, import_jwks_rsa.default)({
  jwksUri: "https://dev-zptlcx37huzfdhcn.us.auth0.com/.well-known/jwks.json",
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5
});
var getKey = (header, callback) => {
  console.log("Getting signing key for kid:", header.kid);
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error("Error getting signing key:", err);
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    console.log("Signing key found:", !!signingKey);
    callback(null, signingKey);
  });
};
var verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    console.log("Verifying token");
    import_jsonwebtoken.default.verify(token, getKey, {
      audience: "https://dev-zptlcx37huzfdhcn.us.auth0.com/api/v2/",
      issuer: "https://dev-zptlcx37huzfdhcn.us.auth0.com/",
      algorithms: ["RS256"]
    }, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        reject(err);
      } else {
        console.log("Token verified successfully");
        resolve(decoded);
      }
    });
  });
};
var handler = async (event, context) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));
    const authHeader = event.headers?.Authorization || event.headers?.authorization;
    if (!authHeader) {
      console.log("No Authorization header found");
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "No Authorization header provided" })
      };
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("No token found in Authorization header");
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "No token provided in Authorization header" })
      };
    }
    console.log("Token extracted:", token);
    const decodedToken = await verifyToken(token);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Authentication successful",
        user: decodedToken.sub
      })
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Authentication failed",
        error: error.message
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=auth.js.map
