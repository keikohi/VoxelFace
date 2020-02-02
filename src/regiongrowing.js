const THRESHOLD = 6

export default class {
  constructor(imageData) {
    this.imageData = imageData
    this.width = imageData.width
    this.height = imageData.height
  }

  isSameRegion(currentPos, neighborPos) {
    currentPos = currentPos*4
    neighborPos = neighborPos*4

    const rdiff = Math.abs(
      this.imageData.data[currentPos] - this.imageData.data[neighborPos]
    )
    const gdiff = Math.abs(
      this.imageData.data[currentPos + 1] - this.imageData.data[neighborPos + 1]
    )
    const bdiff = Math.abs(
      this.imageData.data[currentPos + 2] - this.imageData.data[neighborPos + 2]
    )
    let sum = rdiff + gdiff + bdiff
    if (sum < THRESHOLD) {
    // if (rdiff < THRESHOLD && gdiff < THRESHOLD && bdiff < THRESHOLD) {
        // console.log((currentPos/4)%this.width+","+parseInt((currentPos/4)/this.width)+":"+this.imageData.data[currentPos]+","+this.imageData.data[currentPos+1]+","+this.imageData.data[currentPos+2]);
        // console.log((neighborPos/4)%this.width+","+parseInt((neighborPos/4)/this.width)+":"+this.imageData.data[neighborPos]+","+this.imageData.data[neighborPos+1]+","+this.imageData.data[neighborPos+2]);
        // console.log("--");
      return true
    }    
    return false
  }

  newSearchMap() {
    // var map = new Array(this.ImageData.width);
    // for(let y = 0; y < this.ImageData.height; y++) {
    //     map[y] = new Array(this.ImageData.width).fill(-1);
    // }
    let map = new Array(this.width * this.height).fill(-1)
    return map
  }

  isBoundaryPos(pos){
    return ( pos <= 0 || pos >= (this.width)*(this.height) || pos % this.width == 0 ||pos % this.width == this.width - 1 ||pos % this.height == 0 ||pos % this.height == this.height - 1)
  }

  execute() {
    const map = this.newSearchMap()
    let stack = []
    let regionNo = 0
    console.log(this.width * this.height)

    for (let yi = 0; yi < this.height; yi++) {
      for (let xi = 0; xi < this.width; xi++) {
        const pos = xi + yi * this.width
        if (map[pos] != -1) continue
        // console.log("region no: "+regionNo)
        stack.push(pos)
        regionNo++

        while (stack.length > 0) {
          let currentPos = stack.pop()
          map[currentPos] = regionNo
          //   console.log(currentPos);
        //   if (this.isBoundaryPos(currentPos)) continue

          const topPos = currentPos - this.width
          const rightPos = currentPos + 1
          const leftPos = currentPos - 1
          const bottomPos = currentPos + this.width
          if (  (topPos) >=0 && (this.isSameRegion(currentPos, topPos) &&map[topPos] == -1) ) {
               stack.push(topPos)
          }
          if ( (rightPos % this.width != 0) && (this.isSameRegion(currentPos, rightPos) &&map[rightPos] == -1)) {
            stack.push(rightPos)
          }
          if ( (leftPos % this.width != this.width-1) && (this.isSameRegion(currentPos, leftPos) && map[leftPos] == -1)) {
            stack.push(leftPos)
          }
          if ( (bottomPos <= this.width*this.height -1) && (this.isSameRegion(currentPos, bottomPos) && map[bottomPos] == -1)) {
             stack.push(bottomPos)
          }
        }
        //例外チェックをすること
      }
    }
    console.log('region:'+regionNo)
    let out = ""
    map.forEach(e => out+=e);
    console.log(out);
    
    return map
  }
}
