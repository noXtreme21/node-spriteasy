node-spriteasy
==============

**This tool reads multiple images via configuration file or commandline arguments and writes sprite images and stylesheet files to simplify using that sprite in a browser. This tool also provides a posibility to compile less files and merge all generated stylesheet information into one big stylesheet.

Wy I wrote this tool? Me and a graphic artist are writing a css3/javascript browsergame and we've a lot of images which have to scale down and be available as sprite images. So this tool make my life easier.


## Requirements

* [Node.js](http://nodejs.org/)
* [cairo](http://cairographics.org/)
* [ansi-color](https://github.com/loopj/commonjs-ansi-color) (dependency handled by npm)
* [node-canvas](http://github.com/LearnBoost/node-canvas) (dependency handled by npm)
* [optimist](http://github.com/substack/node-optimist) (dependency handled by npm)

node-canvas requires the [cairo graphics library](http://cairographics.org/download/) version >= 1.8.6.

Tested on Mac OS X 10.7.4 with Node.js 0.6.16.
It probably works just as well in other environments supported by Node.js, cario, and node-canvas.

## Installation

### With npm:

	$ npm install spriteasy

Places the spriteasy command in ./node_modules/spriteasy/bin

### With npm globally:

	$ npm install -g spriteasy

After installation you can use "spriteasy" command in your shell directly.

## Examples

### Show help:

	$ spriteasy --help
    => [spriteasy]
       This tool reads multiple images via configuration file or commandline arguments
       and writes sprite images and stylesheet files to simplify using that sprite in
       a browser. This tool also provides a posibility to compile less files and merge
       all generated stylesheet information into one big stylesheet.
    
      * Version: 0.0.1
      * Usage: spriteasy [options]
    
    Options:
      --help, -h                         show help                                              
      --config, -c                       configuration file                                     
      --directory, -d                    image directory                                        
      --class-identifier, --class        alternative class name for stylesheet generation       
      --image-destination, --image       sprite image destination                               
      --stylesheet-destination, --style  sprite stylesheet destination                          
      --mirror-type, --mirror            mirror type (horizontal, vertical, horizontal-vertical)
      --scale-x, -x                      scale image to a new defined width                     
      --scale-y, -y                      scale image to a new defined height
      --less, -l                         path of less file which should be compiled

### Basic usage:

	$ spriteasy -d my/image/directory --class mySriteClassName --image image.png --style image.css

Combines all images inside directory "my/image/directory" into one sprite.png and writes image.css which contains something like:

```css
    .mySriteClassName_0 {
    	background-image: url("image.png");
    	background-repeat: no-repeat;
    	background-position: -0px -400px;
    	width: 400px;
    	height: 400px;
    }
    
    .mySriteClassName_1 {
    	background-image: url("image.png");
    	background-repeat: no-repeat;
    	background-position: -0px -800px;
    	width: 400px;
    	height: 400px;
    }
    
    .mySriteClassName_2 {
    	background-image: url("image.png");
    	background-repeat: no-repeat;
    	background-position: -0px -1200px;
    	width: 400px;
    	height: 400px;
    }
```

Which works with HTML like this:

```html
	<!DOCTYPE html>
	<html>
		<head>
			<title>spriteasy example</title>
			<link rel="stylesheet" href="image.css"/>
		</head>
		<body>
			<p>
				<span class="mySriteClassName_0"></span>
				<span class="mySriteClassName_1"></span>
				<span class="mySriteClassName_2"></span>
			</p>
		</body>
	</html>
```

### Advanced usage:

You can use spriteasy to scale down image to a new resolution or to mirror/flip images.

    $ spriteasy -d my/image/directory --class mySriteClassName --image image.png --style image.css -x 100 -y 100

This will scale down each image inside the "my/image/directory" to 100px x 100px. A sprite of tree images have a size of 100px x 300px now.

    $ spriteasy -d my/image/directory --class mySriteClassName --image image.png --style image.css --mirror vertical
    
This mirros/flip the sprite image in vertical direction

    $ spriteasy -d my/image/directory --class mySriteClassName --image image.png --style image.css --mirror horizontal
    
This mirros/flip the sprite image in horizontal direction

    $ spriteasy -d my/image/directory --class mySriteClassName --image image.png --style image.css --mirror horizontal-vertical
    
This mirros/flip the sprite image in horizontal and vertical direction

    $ spriteasy -d my/image/directory --class mySriteClassName --image image.png --style image.css --less path/to/my/less/file.less
    
This will also compile the less file into the image.css file.

### Configuration usage:

The best practice is to use a configuration file. There you can define more images for one procedure.

    $ spriteasy -c configuration.json

This will run spriteasy with a defined configuration file (in JSON format) which looks like these:

```javascript
    {
        "packages": [
            {
                // REQUIRED
                "class":            "character_walk_right"
                // OPTIONAL
              , "imageDestination": "sprites/character_walk_right.png"
                // OPTIONAL
              , "scale":            "100px x 100px"
                // OPTIONAL
              , "mirror":           "false"
                // REQUIRED
              , "path": [
                    "images/character/walk_right"
                ]
            }
          , {
                "class":            "character_walk_left"
              , "imageDestination": "sprites/character_walk_left.png"
              , "scale":            "100px x 100px"
              , "mirror":           "horizontal"
              , "path": [
                    "images/character/walk_left"
                ]
            }
          , {
                "class":                 "icons"
              , "imageDestination":      "sprites/icons.png"
              , "stylesheetDestination": "stylesheet-icons.css"
              , "scale":                 "false"
              , "mirror":                "false"
              , "path": [
                    "images/icons/delete.png"
                  , "images/icons/add.png"
                  , "images/icons/edit.png"
                  , "images/icons/update.png"
                ]
            }
        ]
        // Will compile all defined less files and write them to stylesheetDestination.
        // OPTIONAL.
      , "compileLessFiles":         [
            "lessfiles/core.less"
        ]
        // Will used if a package have no imageSheetDestination defined.
        // OPTIONAL.
        // MUST BE FILENAME.
      , "stylesheetDestination": "stylesheet.css"
        // Will used if a package have no imageSheetDestination defined.
        // OPTIONAL.
        // MUST BE DIRECTORY.
      , "imageDestination": "sprites"
    }
```

    