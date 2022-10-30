# Fractal Tree-D
Welcome to my 3D fractal tree website that uses THREE.js and Node to set up the tree.



## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
#After pulling the repo, go into src/script.js and change the second argument of line 180 to vary the depth.
addChildren(mainBranch, [Vary depth], 2.5, Math.PI/3)

# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev
```

# The tree:
The tree consists of n branches that have n sub branches. All the branches point in the same direction and orientation towards the tip of the parent branch at 60 degrees, except The first set of branches are distributed evenly around the main branch. All the branches are evenly spaced across the parent branch.

The tree is designed as a jet blue glossy finish and red lighting and background for the display. Along with that, text containing a play on words with 3D is show in the back. The tree also has a texture of an actual branch that was imported using a normal map

# The Function:
The function used is a recursive function that takes 3 arguments from the user: The main branch, the recursion depth, the main branch length, and the angle (60 degrees). For the recursion, we also have the current depth and the current theta(spherical coords) to track the orientation and depth.

The way the branches are oriented with regards to each other is a series of homogenous transformations that are based on the geometry of our tree. This uses a combination of euler angles for rotations and spherical coordinates for translations to do the job.

# Areas for improvement:
I would have loved to have more time to develop some of the following features:
- Vary the theta around each subbranch
- Add a clickable increment to the tree depth
- Randomize the locations and orientations of the branches instead of even distribution.
- Rotations

## Image
![alt text](https://github.com/luaiabuelsamen/3Dwebsite/blob/main/static/Tree_image.png?raw=true)
