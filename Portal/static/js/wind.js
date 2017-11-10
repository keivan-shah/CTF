'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _THREE = THREE,
    WebGLRenderer = _THREE.WebGLRenderer,
    Scene = _THREE.Scene,
    PerspectiveCamera = _THREE.PerspectiveCamera,
    Color = _THREE.Color,
    Line = _THREE.Line,
    SplineCurve = _THREE.SplineCurve,
    Path = _THREE.Path,
    Vector2 = _THREE.Vector2,
    ShaderMaterial = _THREE.ShaderMaterial;


var getRandomFloat = function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
};

/* ---- CORE ---- */
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var Webgl = function () {
  function Webgl(w, h) {
    _classCallCheck(this, Webgl);

    this.meshCount = 0;
    this.meshListeners = [];
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
    this.camera.position.set(0, 0, 2);
    this.dom = this.renderer.domElement;
    this.update = this.update.bind(this);
    this.resize = this.resize.bind(this);
    this.resize(w, h); // set render size
    this.mouseX = 0;
    this.mouseY = 0;
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  _createClass(Webgl, [{
    key: 'add',
    value: function add(mesh) {
      this.scene.add(mesh);
      if (!mesh.update) return;
      this.meshListeners.push(mesh.update);
      this.meshCount++;
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var AMPL = 5;
      this.mouseX = -(event.clientX / window.innerWidth - 0.5) * AMPL;
      this.mouseY = (event.clientY / window.innerHeight - 0.5) * AMPL;
    }
  }, {
    key: 'update',
    value: function update() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
      this.camera.position.y += (this.mouseY - this.camera.position.y) * .05;
      this.camera.lookAt(this.scene.position);

      var i = this.meshCount;
      while (--i >= 0) {
        this.meshListeners[i].apply(this, null);
      }
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'resize',
    value: function resize(w, h) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }]);

  return Webgl;
}();

var webgl = new Webgl(windowWidth, windowHeight);
document.body.appendChild(webgl.dom);

/* ---- ------------- ---- */
/* ---- CREATING ZONE ---- */

var lineVert = '\n  varying vec2 vUv;\n  varying vec3 vPos;\n\n  void main() {\n    vUv = uv;\n    vPos = position;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n  }\n';

var lineFrag = '\n  uniform vec3 color;\n  uniform float timer;\n  uniform float lineHeight;\n  uniform float spaceHeight;\n\n  varying vec2 vUv;\n  varying vec3 vPos;\n\n  void main() {\n    float t = ceil(lineHeight - mod(vPos.x + timer, spaceHeight));\n    gl_FragColor = vec4(color, t);\n  }\n';

// OBJECTS

var RandomLineCurve = function (_Line) {
  _inherits(RandomLineCurve, _Line);

  function RandomLineCurve() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$amplitude = _ref.amplitude,
        amplitude = _ref$amplitude === undefined ? 0.5 : _ref$amplitude,
        _ref$nbrOfPoints = _ref.nbrOfPoints,
        nbrOfPoints = _ref$nbrOfPoints === undefined ? 4 : _ref$nbrOfPoints,
        _ref$length = _ref.length,
        length = _ref$length === undefined ? 5 : _ref$length,
        _ref$orientationY = _ref.orientationY,
        orientationY = _ref$orientationY === undefined ? -2 : _ref$orientationY,
        _ref$speed = _ref.speed,
        speed = _ref$speed === undefined ? 0.04 : _ref$speed;

    _classCallCheck(this, RandomLineCurve);

    var MAX_LENGTH = length / nbrOfPoints;
    var MIN_LENGTH = MAX_LENGTH * 0.5;

    var points = [];
    points.push(new Vector2(0, 0));
    for (var i = 0; i < nbrOfPoints; i++) {
      points.push(new Vector2(MAX_LENGTH * i + getRandomFloat(MIN_LENGTH, MAX_LENGTH), amplitude * orientationY * i + getRandomFloat(-amplitude, amplitude)));
    }
    var curve = new SplineCurve(points);
    var path = new Path(curve.getPoints(50));
    var geometry = path.createPointsGeometry(50);
    var material = new ShaderMaterial({
      vertexShader: lineVert,
      fragmentShader: lineFrag,
      uniforms: {
        color: { type: 'v3', value: new Color(0xffffff) },
        timer: { type: 'f', value: getRandomFloat(0, 100) },
        lineHeight: { type: 'f', value: 2 },
        spaceHeight: { type: 'f', value: 20 }
      },
      transparent: true
    });

    var _this = _possibleConstructorReturn(this, (RandomLineCurve.__proto__ || Object.getPrototypeOf(RandomLineCurve)).call(this, geometry, material));

    _this.speed = speed;

    _this.update = _this.update.bind(_this);
    return _this;
  }

  _createClass(RandomLineCurve, [{
    key: 'update',
    value: function update() {
      // this.rotation.x += 0.01;
      this.material.uniforms.timer.value += this.speed;
      // this.rotation.y += 0.03;
    }
  }]);

  return RandomLineCurve;
}(Line);

function addLine() {
  var curve = new RandomLineCurve({
    orientationY: getRandomFloat(0, 2),
    length: getRandomFloat(1, 4),
    amplitude: getRandomFloat(0.2, 0.6),
    nbrOfPoints: getRandomFloat(2, 6),
    speed: getRandomFloat(0.02, 0.08)
  });
  curve.rotation.x = getRandomFloat(0, Math.PI * 180);
  curve.position.set(getRandomFloat(-4, 2), getRandomFloat(-2, 2), getRandomFloat(-2, 2));
  // curve.rotation.x = getRandomFloat(0, Math.PI * 180);
  webgl.add(curve);
}

// START
for (var i = 0; i < 500; i++) {
  addLine();
}

/* ---- CREATING ZONE END ---- */
/**/
/**/
/**/ /* ---- ON RESIZE ---- */
/**/function onResize() {
  /**/windowWidth = window.innerWidth;
  /**/windowHeight = window.innerHeight;
  /**/webgl.resize(windowWidth, windowHeight);
  /**/
}
/**/window.addEventListener('resize', onResize);
/**/window.addEventListener('orientationchange', onResize);
/**/ /* ---- LOOP ---- */
/**/function _loop() {
  /**/webgl.update();
  /**/requestAnimationFrame(_loop);
  /**/
}
/**/_loop();
