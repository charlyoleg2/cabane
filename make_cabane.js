#!/usr/bin/env node
// make_cabane.js

import { exec } from "child_process";
import { promisify } from 'util';

const c_Parts = {
	cabane_plancher: 'cabane_plancher_v01',
	cabane: 'cabane_v01',
	door: 'door_v01',
	reinforced_tube_A1: 'reinforced_tube_A1_v01',
	reinforced_tube_A2: 'reinforced_tube_A2_v01',
	reinforced_tube_A3: 'reinforced_tube_A3_v01',
	reinforced_tube_A4: 'reinforced_tube_A4_v01'
};

function inferDesignName(instanceName) {
	const re = /_[A-Z][0-9]*$/;
	const rDesignName = instanceName.replace(re, '');
	return rDesignName
}

function getCmd(dName, fName) {
	const desiName = inferDesignName(dName);
	console.log(`info456: reference name: ${dName}   design name: ${desiName}`);
	const rCmd = [];
	//rCmd.push('pwd');
	//rCmd.push(`ls refs/${dName}`);
	//rCmd.push(`npx desi78-cli -d=desi78/${desiName} -o=refs/${dName} --outFileName=px_${fName}.json write json_param`);
	rCmd.push(`npx desi78-cli -d=desi78/${desiName} -p=refs/${dName}/px_${fName}.json -o=refs/${dName} --outFileName=${fName}.log.txt write compute_log`);
	rCmd.push(`npx desi78-cli -d=desi78/${desiName} -p=refs/${dName}/px_${fName}.json -o=refs/${dName} --outFileName=${fName}.scad write scad_3d_openscad`);
	rCmd.push(`openscad -o refs/${dName}/${fName}.stl refs/${dName}/${fName}.scad`);
	//rCmd.push(`npx shx rm -fr refs/${dName}`);
	return rCmd
}

const aExec = promisify(exec);

async function execCmd(cmd) {
	console.log(cmd);
	try {
		const { stdout, stderr } = await aExec(cmd);
		console.log('---> stdout:');
		console.log(stdout);
		console.log('---> stderr:');
		console.log(stderr);
		console.log('---> end of log');
	} catch (err) {
		console.log(`err895: Error by executing: ${cmd}`);
		console.log(err);
		console.log(`info895: script stopped!`);
		process.exit(1);
	}
}

async function loopDesign(dList) {
	const pList = Object.keys(c_Parts);
	for (const [ idx, oneDesign ] of dList.entries()) {
		const idx2 = idx + 1;
		console.log(`${idx2} : working on ${oneDesign}`);
		if (!pList.includes(oneDesign)) {
			console.log(`err309: design ${oneDesign} is unkown!`);
			process.exit(1);
		}
		const cmds = getCmd(oneDesign, c_Parts[oneDesign]);
		for (const oneCmd of cmds) {
			await execCmd(oneCmd);
		}
		console.log(`${idx2} : end of generation of ${oneDesign}`);
	}
}

async function mhcli(args) {
	//console.log(args);
	const c_flag_all = '--all';
	const allList = Object.keys(c_Parts);
	if (args.length === 3 && args[2] === c_flag_all) {
		await loopDesign(allList);
	} else if (args.length > 2) {
		await loopDesign(args.slice(2));
	} else {
		console.log('err206: no argument provided!');
		console.log(`Possible arguments: ${c_flag_all} or the following design names:`);
		let str1 = '';
		let str2 = '';
		for (const [ idx, oneDesign ] of allList.entries()) {
			str1 += ` ${oneDesign}`;
			str2 += `${(idx + 1).toString().padStart(2, ' ')} : ${oneDesign}\n`;
		}
		console.log(str1);
		console.log(str2);
		console.log('info404: Nothing done!');
	}
}

console.log('make_cabane.js says Hello!');
await mhcli(process.argv);
console.log('make_cabane.js says Bye!');

