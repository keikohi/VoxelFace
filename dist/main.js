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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _regiongrowing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regiongrowing.js */ \"./src/regiongrowing.js\");\n\n\n\nconst loadImage = imageUrl => {\n  const img = new Image()\n  img.src = imageUrl\n  return img\n}\n\nconst setImageToCanvas = (image, canvasId) => {\n  let canvas = document.getElementById(canvasId)\n  let ctx = canvas.getContext('2d')\n  document.getElementById(canvasId).style.display = 'none'\n  canvas.width = image.width\n  canvas.height = image.height\n  ctx.drawImage(image, 0, 0)\n  return ctx.getImageData(0, 0, canvas.width, canvas.height)\n}\n\nlet imgData\n// const depthImage = loadImage('./IMG_2017_depth.png')\nconst depthImage = loadImage('./IMG_2017_depth.png')\ndepthImage.onload = () => {\n  imgData = setImageToCanvas(depthImage, 'faceCanvas')\n}\n\nlet coloredImgData\nconst coloredImg = loadImage('./IMG_2017.png')\ncoloredImg.onload = () => {\n  coloredImgData = setImageToCanvas(coloredImg, 'coloredFaceCanvas')\n}\nlet regionColorMap = new Map()\nwindow.addEventListener('load', init)\nfunction init() {\n\n  let rigiongrowing = new _regiongrowing_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](coloredImgData)\n  let groupMap = rigiongrowing.execute()\n  \n  // サイズを指定\n  const width = 960\n  const height = 540\n\n  // レンダラクラスのインスタンスを定義\n  const renderer = new THREE.WebGLRenderer({\n    //HTMLに定義したcanvas要素を指定する\n    canvas: document.querySelector('#myCanvas')\n  })\n  renderer.setPixelRatio(window.devicePixelRatio)\n  renderer.setSize(width, height)\n\n  // シーン(3D空間:カメラやオブジェクト置き場)を作成\n  const scene = new THREE.Scene()\n\n  // カメラを作成　画角、アス比\n  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000)\n  camera.position.set(288, 1000, 384)\n  // camera.lookAt(new THREE.Vector3(288, 0, 384));\n  const controls = new THREE.OrbitControls(camera)\n\n  const plane2 = new THREE.GridHelper(600)\n  scene.add(plane2)\n  const plane = new THREE.AxesHelper(300)\n  scene.add(plane)\n\n  const light = new THREE.AmbientLight(0xffffff, 1.0)\n  scene.add(light)\n\n  const pictureRate = coloredImgData.height / imgData.height\n\n  const pixelNum = imgData.height * imgData.width\n  let r = new Array(pixelNum).fill(0)\n  let g = new Array(pixelNum).fill(0)\n  let b = new Array(pixelNum).fill(0)\n  let c = new Array(pixelNum).fill(0)\n  \n  \n  // id: regionId\n  groupMap.forEach(e =>{\n    if(!regionColorMap.has(e)){\n        let color =    {\n            r: Math.floor(Math.random()*255), \n            g: Math.floor(Math.random()*255), \n            b: Math.floor(Math.random()*255)\n        }\n        regionColorMap.set(e, color)\n    }\n  })\n  let countMap = new Map()\n  groupMap.forEach(e => {\n    if(!countMap.has(e)){\n        countMap.set(e, 1)\n    } else {\n        let count = countMap.get(e)\n        // if(e !== 2)console.log(count);\n        countMap.set(e, count +1)\n    }\n  })\n  console.log(countMap);\n  \n\n  groupMap.forEach(e =>{\n    if(!regionColorMap.has(e)){\n        let color =    {\n            r: Math.floor(Math.random()*255), \n            g: Math.floor(Math.random()*255), \n            b: Math.floor(Math.random()*255)\n        }\n        regionColorMap.set(e, color)\n    }\n  })\n  console.log(regionColorMap);\n  \n\n  for (let yi = 0; yi < coloredImgData.height; yi++) {\n    for (let xi = 0; xi < coloredImgData.width; xi++) {\n      // const height = coloredImgData.data[(xi + yi * coloredImgData.width) * 4]\n      const x = Math.floor(xi / pictureRate)\n      const y = Math.floor(yi / pictureRate)\n    //   const pos = (xi + yi * coloredImgData.width) * 4\n    //   r[x + y * imgData.width] += coloredImgData.data[pos]\n    //   g[x + y * imgData.width] += coloredImgData.data[pos + 1]\n    //   b[x + y * imgData.width] += coloredImgData.data[pos + 2]\n    const pos = (xi + yi * coloredImgData.width)\n    const regionId = groupMap[pos]\n    // console.log(regionId)\n    const color = regionColorMap.get(regionId)\n    //   r[x + y * imgData.width] = coloredImgData.data[pos*4]\n    //   g[x + y * imgData.width] = coloredImgData.data[pos*4 + 1]\n    //   b[x + y * imgData.width] = coloredImgData.data[pos*4 + 2]\n      r[x + y * imgData.width] = color.r\n      g[x + y * imgData.width] = color.g\n      b[x + y * imgData.width] = color.b\n      c[x + y * imgData.width]++\n    }\n  }\n\n  //色の平均化\n//   for (let yi = 0; yi < imgData.height; yi++) {\n//     for (let xi = 0; xi < imgData.width; xi++) {\n//       const pos = xi + yi * imgData.width\n//       r[pos] = Math.floor(r[pos] / c[pos])\n//       g[pos] = Math.floor(g[pos] / c[pos])\n//       b[pos] = Math.floor(b[pos] / c[pos])\n//     }\n//   }\n\n  for (let yi = 0; yi < imgData.height; yi += 5) {\n    for (let xi = 0; xi < imgData.width; xi += 5) {\n      const height = imgData.data[(xi + yi * imgData.width) * 4]\n      const pos = xi + yi * imgData.width\n    //   if (height < 180) continue\n      const geometry = new THREE.BoxGeometry(4.8, 4.8, 4.8)\n      const material = new THREE.MeshLambertMaterial({\n        color: 'rgb(' + r[pos] + ',' + g[pos] + ',' + b[pos] + ')'\n      })\n      const box = new THREE.Mesh(geometry, material)\n    //   box.position.set(xi, height * 5, yi)\n      box.position.set(xi, 0, yi)\n      scene.add(box)\n    }\n  }\n  tick()\n  // 毎フレーム時に実行されるループイベントです\n  function tick() {\n    controls.update()\n    renderer.render(scene, camera)\n    requestAnimationFrame(tick)\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/regiongrowing.js":
/*!******************************!*\
  !*** ./src/regiongrowing.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst THRESHOLD = 6\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\n  constructor(imageData) {\n    this.imageData = imageData\n    this.width = imageData.width\n    this.height = imageData.height\n  }\n\n  isSameRegion(currentPos, neighborPos) {\n    currentPos = currentPos*4\n    neighborPos = neighborPos*4\n\n    const rdiff = Math.abs(\n      this.imageData.data[currentPos] - this.imageData.data[neighborPos]\n    )\n    const gdiff = Math.abs(\n      this.imageData.data[currentPos + 1] - this.imageData.data[neighborPos + 1]\n    )\n    const bdiff = Math.abs(\n      this.imageData.data[currentPos + 2] - this.imageData.data[neighborPos + 2]\n    )\n    let sum = rdiff + gdiff + bdiff\n    if (sum < THRESHOLD) {\n    // if (rdiff < THRESHOLD && gdiff < THRESHOLD && bdiff < THRESHOLD) {\n        // console.log((currentPos/4)%this.width+\",\"+parseInt((currentPos/4)/this.width)+\":\"+this.imageData.data[currentPos]+\",\"+this.imageData.data[currentPos+1]+\",\"+this.imageData.data[currentPos+2]);\n        // console.log((neighborPos/4)%this.width+\",\"+parseInt((neighborPos/4)/this.width)+\":\"+this.imageData.data[neighborPos]+\",\"+this.imageData.data[neighborPos+1]+\",\"+this.imageData.data[neighborPos+2]);\n        // console.log(\"--\");\n      return true\n    }    \n    return false\n  }\n\n  newSearchMap() {\n    // var map = new Array(this.ImageData.width);\n    // for(let y = 0; y < this.ImageData.height; y++) {\n    //     map[y] = new Array(this.ImageData.width).fill(-1);\n    // }\n    let map = new Array(this.width * this.height).fill(-1)\n    return map\n  }\n\n  isBoundaryPos(pos){\n    return ( pos <= 0 || pos >= (this.width)*(this.height) || pos % this.width == 0 ||pos % this.width == this.width - 1 ||pos % this.height == 0 ||pos % this.height == this.height - 1)\n  }\n\n  execute() {\n    const map = this.newSearchMap()\n    let stack = []\n    let regionNo = 0\n    console.log(this.width * this.height)\n\n    for (let yi = 0; yi < this.height; yi++) {\n      for (let xi = 0; xi < this.width; xi++) {\n        const pos = xi + yi * this.width\n        if (map[pos] != -1) continue\n        // console.log(\"region no: \"+regionNo)\n        stack.push(pos)\n        regionNo++\n\n        while (stack.length > 0) {\n          let currentPos = stack.pop()\n          map[currentPos] = regionNo\n          //   console.log(currentPos);\n        //   if (this.isBoundaryPos(currentPos)) continue\n\n          const topPos = currentPos - this.width\n          const rightPos = currentPos + 1\n          const leftPos = currentPos - 1\n          const bottomPos = currentPos + this.width\n          if (  (topPos) >=0 && (this.isSameRegion(currentPos, topPos) &&map[topPos] == -1) ) {\n               stack.push(topPos)\n          }\n          if ( (rightPos % this.width != 0) && (this.isSameRegion(currentPos, rightPos) &&map[rightPos] == -1)) {\n            stack.push(rightPos)\n          }\n          if ( (leftPos % this.width != this.width-1) && (this.isSameRegion(currentPos, leftPos) && map[leftPos] == -1)) {\n            stack.push(leftPos)\n          }\n          if ( (bottomPos <= this.width*this.height -1) && (this.isSameRegion(currentPos, bottomPos) && map[bottomPos] == -1)) {\n             stack.push(bottomPos)\n          }\n        }\n        //例外チェックをすること\n      }\n    }\n    console.log('region:'+regionNo)\n    let out = \"\"\n    map.forEach(e => out+=e);\n    console.log(out);\n    \n    return map\n  }\n});\n\n\n//# sourceURL=webpack:///./src/regiongrowing.js?");

/***/ })

/******/ });