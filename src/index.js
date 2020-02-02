
import RegionGrowing from "./regiongrowing.js"

const loadImage = imageUrl => {
  const img = new Image()
  img.src = imageUrl
  return img
}

const setImageToCanvas = (image, canvasId) => {
  let canvas = document.getElementById(canvasId)
  let ctx = canvas.getContext('2d')
  document.getElementById(canvasId).style.display = 'none'
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

let imgData
// const depthImage = loadImage('./IMG_2017_depth.png')
const depthImage = loadImage('./IMG_2017_depth.png')
depthImage.onload = () => {
  imgData = setImageToCanvas(depthImage, 'faceCanvas')
}

let coloredImgData
const coloredImg = loadImage('./IMG_2017.png')
coloredImg.onload = () => {
  coloredImgData = setImageToCanvas(coloredImg, 'coloredFaceCanvas')
}
let regionColorMap = new Map()
window.addEventListener('load', init)
function init() {

  let rigiongrowing = new RegionGrowing(coloredImgData)
  let groupMap = rigiongrowing.execute()
  
  // サイズを指定
  const width = 960
  const height = 540

  // レンダラクラスのインスタンスを定義
  const renderer = new THREE.WebGLRenderer({
    //HTMLに定義したcanvas要素を指定する
    canvas: document.querySelector('#myCanvas')
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーン(3D空間:カメラやオブジェクト置き場)を作成
  const scene = new THREE.Scene()

  // カメラを作成　画角、アス比
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000)
  camera.position.set(288, 1000, 384)
  // camera.lookAt(new THREE.Vector3(288, 0, 384));
  const controls = new THREE.OrbitControls(camera)

  const plane2 = new THREE.GridHelper(600)
  scene.add(plane2)
  const plane = new THREE.AxesHelper(300)
  scene.add(plane)

  const light = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(light)

  const pictureRate = coloredImgData.height / imgData.height

  const pixelNum = imgData.height * imgData.width
  let r = new Array(pixelNum).fill(0)
  let g = new Array(pixelNum).fill(0)
  let b = new Array(pixelNum).fill(0)
  let c = new Array(pixelNum).fill(0)
  
  
  // id: regionId
  groupMap.forEach(e =>{
    if(!regionColorMap.has(e)){
        let color =    {
            r: Math.floor(Math.random()*255), 
            g: Math.floor(Math.random()*255), 
            b: Math.floor(Math.random()*255)
        }
        regionColorMap.set(e, color)
    }
  })
  let countMap = new Map()
  groupMap.forEach(e => {
    if(!countMap.has(e)){
        countMap.set(e, 1)
    } else {
        let count = countMap.get(e)
        // if(e !== 2)console.log(count);
        countMap.set(e, count +1)
    }
  })
  console.log(countMap);
  

  groupMap.forEach(e =>{
    if(!regionColorMap.has(e)){
        let color =    {
            r: Math.floor(Math.random()*255), 
            g: Math.floor(Math.random()*255), 
            b: Math.floor(Math.random()*255)
        }
        regionColorMap.set(e, color)
    }
  })
  console.log(regionColorMap);
  

  for (let yi = 0; yi < coloredImgData.height; yi++) {
    for (let xi = 0; xi < coloredImgData.width; xi++) {
      // const height = coloredImgData.data[(xi + yi * coloredImgData.width) * 4]
      const x = Math.floor(xi / pictureRate)
      const y = Math.floor(yi / pictureRate)
    //   const pos = (xi + yi * coloredImgData.width) * 4
    //   r[x + y * imgData.width] += coloredImgData.data[pos]
    //   g[x + y * imgData.width] += coloredImgData.data[pos + 1]
    //   b[x + y * imgData.width] += coloredImgData.data[pos + 2]
    const pos = (xi + yi * coloredImgData.width)
    const regionId = groupMap[pos]
    // console.log(regionId)
    const color = regionColorMap.get(regionId)
    //   r[x + y * imgData.width] = coloredImgData.data[pos*4]
    //   g[x + y * imgData.width] = coloredImgData.data[pos*4 + 1]
    //   b[x + y * imgData.width] = coloredImgData.data[pos*4 + 2]
      r[x + y * imgData.width] = color.r
      g[x + y * imgData.width] = color.g
      b[x + y * imgData.width] = color.b
      c[x + y * imgData.width]++
    }
  }

  //色の平均化
//   for (let yi = 0; yi < imgData.height; yi++) {
//     for (let xi = 0; xi < imgData.width; xi++) {
//       const pos = xi + yi * imgData.width
//       r[pos] = Math.floor(r[pos] / c[pos])
//       g[pos] = Math.floor(g[pos] / c[pos])
//       b[pos] = Math.floor(b[pos] / c[pos])
//     }
//   }

  for (let yi = 0; yi < imgData.height; yi += 5) {
    for (let xi = 0; xi < imgData.width; xi += 5) {
      const height = imgData.data[(xi + yi * imgData.width) * 4]
      const pos = xi + yi * imgData.width
    //   if (height < 180) continue
      const geometry = new THREE.BoxGeometry(4.8, 4.8, 4.8)
      const material = new THREE.MeshLambertMaterial({
        color: 'rgb(' + r[pos] + ',' + g[pos] + ',' + b[pos] + ')'
      })
      const box = new THREE.Mesh(geometry, material)
    //   box.position.set(xi, height * 5, yi)
      box.position.set(xi, 0, yi)
      scene.add(box)
    }
  }
  tick()
  // 毎フレーム時に実行されるループイベントです
  function tick() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
}


