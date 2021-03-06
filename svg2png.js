/**
 * svg2png (c)2018 Cloudseat.net
 * Released under the MIT License.
 *
 * @example
 * svg2png(svg, callback)
 * svg2png(svg, scale, callback)
 */

function svg2png(svg, scale, callback) {
  if (callback === undefined) {
    callback = scale
    scale = 1
  }

  const box = svg.getBBox()
  const clone = svg.cloneNode(true)
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', box.width * scale)
  clone.setAttribute('height', box.height * scale)

  const svgXml = new XMLSerializer().serializeToString(clone)
  const base64 = 'data:image/svg+xml;base64,' + toBase64(svgXml)

  const image = new Image()
  image.src = base64
  image.crossOrigin = 'anonymous'
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    callback(canvas.toDataURL('image/png'))
  }
}

function toBase64(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str)
    .replace(/%([0-9A-F]{2})/g, (_, m) => String.fromCharCode('0x' + m)));
}