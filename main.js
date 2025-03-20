const ktx = kaboom({
    width: 1280,
    height: 720,
    scale: 1,
    stretch: true, // Enable stretching to fit any aspect ratio
    letterbox: true // Optional: Adds black bars to maintain aspect ratio
})

setBackground(Color.fromHex('#36A6E0'))

loadAssets()

scene('world', (worldState) => setWorld(worldState))
scene('battle', (worldState) => setBattle(worldState))

go('world')