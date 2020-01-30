/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst loadImage = imageUrl => {\n  const img = new Image()\n  img.src = imageUrl\n  return img\n}\n\nconst setImageToCanvas = (image, canvasId) => {\n  let canvas = document.getElementById(canvasId)\n  let ctx = canvas.getContext('2d')\n  document.getElementById(canvasId).style.display = 'none'\n  canvas.width = image.width\n  canvas.height = image.height\n  ctx.drawImage(image, 0, 0)\n  return ctx.getImageData(0, 0, canvas.width, canvas.height)\n}\n\n// const loadImage = imageUrl =>\n//   new Promise((resolve, reject) => {\n//     const img = new Image()\n//     img.onload = () => resolve(img)\n//     img.onerror = err => reject(err)\n//     //src属性にURLを指定した時点で即非同期リクエストが実行\n//     img.src = imageUrl\n//   })\n\nlet imgData\nconst depthImage = loadImage('./IMG_0943_depth.png')\ndepthImage.onload = () => {\n  imgData = setImageToCanvas(depthImage, 'faceCanvas')\n}\n\nlet coloredImgData\nconst coloredImg = loadImage('./IMG_0943.jpg')\ncoloredImg.onload = () => {\n  coloredImgData = setImageToCanvas(coloredImg, 'coloredFaceCanvas')\n}\n\nwindow.addEventListener('load', init)\nfunction init() {\n  // サイズを指定\n  const width = 960\n  const height = 540\n\n  // レンダラクラスのインスタンスを定義\n  const renderer = new THREE.WebGLRenderer({\n    //HTMLに定義したcanvas要素を指定する\n    canvas: document.querySelector('#myCanvas')\n  })\n  renderer.setPixelRatio(window.devicePixelRatio)\n  renderer.setSize(width, height)\n\n  // シーン(3D空間:カメラやオブジェクト置き場)を作成\n  const scene = new THREE.Scene()\n\n  // カメラを作成　画角、アス比\n  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000)\n  camera.position.set(288, 1000, 384)\n  // camera.lookAt(new THREE.Vector3(288, 0, 384));\n  const controls = new THREE.OrbitControls(camera)\n\n  const plane2 = new THREE.GridHelper(600)\n  scene.add(plane2)\n  const plane = new THREE.AxesHelper(300)\n  scene.add(plane)\n\n  const light = new THREE.AmbientLight(0xffffff, 1.0)\n  scene.add(light)\n\n  const pictureRate = coloredImgData.height / imgData.height\n\n  const pixelNum = imgData.height * imgData.width\n  let r = new Array(pixelNum)\n  let g = new Array(pixelNum)\n  let b = new Array(pixelNum)\n  let c = new Array(pixelNum)\n  r.fill(0)\n  g.fill(0)\n  b.fill(0)\n  c.fill(0)\n  for (let yi = 0; yi < coloredImgData.height; yi++) {\n    for (let xi = 0; xi < coloredImgData.width; xi++) {\n      // const height = coloredImgData.data[(xi + yi * coloredImgData.width) * 4]\n      const x = Math.floor(xi / pictureRate)\n      const y = Math.floor(yi / pictureRate)\n      if (yi < 2) {\n        // console.log(x+\" : \"+xi)\n      }\n      const pos = (xi + yi * coloredImgData.width) * 4\n      r[x + y * imgData.width] += coloredImgData.data[pos]\n      g[x + y * imgData.width] += coloredImgData.data[pos + 1]\n      b[x + y * imgData.width] += coloredImgData.data[pos + 2]\n      c[x + y * imgData.width]++\n    }\n  }\n\n  for (let yi = 0; yi < imgData.height; yi++) {\n    for (let xi = 0; xi < imgData.width; xi++) {\n      const pos = xi + yi * imgData.width\n      r[pos] = Math.floor(r[pos] / c[pos])\n      g[pos] = Math.floor(g[pos] / c[pos])\n      b[pos] = Math.floor(b[pos] / c[pos])\n    }\n  }\n\n  for (let yi = 0; yi < imgData.height; yi += 12) {\n    for (let xi = 0; xi < imgData.width; xi += 12) {\n      const height = imgData.data[(xi + yi * imgData.width) * 4]\n      const pos = xi + yi * imgData.width\n      if (height < 180) continue\n      const geometry = new THREE.BoxGeometry(15, 15, 15)\n      const material = new THREE.MeshLambertMaterial({\n        color: 'rgb(' + r[pos] + ',' + g[pos] + ',' + b[pos] + ')'\n      })\n      const box = new THREE.Mesh(geometry, material)\n      box.position.set(xi, height * 5, yi)\n      scene.add(box)\n    }\n  }\n  tick()\n  // 毎フレーム時に実行されるループイベントです\n  function tick() {\n    controls.update()\n    renderer.render(scene, camera)\n    requestAnimationFrame(tick)\n  }\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });