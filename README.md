Cabane
======


Presentation
------------

This repo stores the parameters and the STL-files for a *cabane*.
This repo uses the javascript packages [desi78-cli](https://www.npmjs.com/package/desi78-cli) and [desi78-uis](https://www.npmjs.com/package/desi78-uis).


Requirements
------------

- [node](https://nodejs.org) > 20.10.0
- [npm](https://docs.npmjs.com/cli) > 10.1.0


### Optional requirements

- [OpenSCAD](https://openscad.org/)

For Ubuntu users, *OpenSCAD* is available on [snapcraft](https://snapcraft.io/openscad) and can be installed with:

```bash
sudo snap install openscad
```


Dev
---

```bash
git clone https://github.com/charlyoleg2/cabane
cd cabane
npm install
npm run
npm run desi78-uis
npx desi78-uis
npx desi78-cli --help
./make_cabane.js
```

Vocabulary
----------

- Design: A parametrizable 3D parts. Desginix is a collection of designs.
- Reference: A particular parametrization of a design.
- Instance: The realization of a reference.


References for the heliostat model
----------------------------------

ID | Reference           | Design             | Nb of instances
---|---------------------|--------------------|----------------
1  | cabane\_plancher    | cabane\_plancher   | 1
2  | cabane              | cabane             | 1

Each reference has its own directory with its json-parametrization, scad-script and stl-file.


