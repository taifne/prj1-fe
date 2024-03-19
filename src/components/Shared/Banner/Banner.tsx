import { useEffect, useRef } from 'react';
import data from './data/data.json'
import { ForceGraph3D } from 'react-force-graph';
import * as THREE from 'three';
import * as d3 from "d3";
let Mydata = JSON.parse(JSON.stringify(data))

interface MyNode {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    // Include other properties that might be in your node objects
  }
  interface Link {
    distance: number;
    // Include other properties that might be in your link objects
  }

const Banner = () => {
    const fgRef = useRef<any>(null);

  
    const distance = 900;

    useEffect(() => {
        
       
        // camera orbit
        // let angle = 0;
        //   fgRef.current.cameraPosition({ z: distance });
        //   let interval = setInterval(() => {
        //     fgRef.current.cameraPosition({
        //       x: distance * Math.sin(angle),
        //       z: distance * Math.cos(angle)
        //     });
        //     angle += Math.PI / 300;
        //   }, 40)
        const fg = fgRef.current;

        // Deactivate existing forces
        fg.d3Force('center', null);
        fg.d3Force('charge', null);

        // Add collision and bounding box forces
        fg.d3Force('collide', d3.forceCollide(4));
        fg.d3Force('box', () => {
          const SQUARE_HALF_SIDE =  100 * 14 * 0.5;

          Mydata.nodes.forEach((node : MyNode) => {
            const x = node.x || 0, y = node.y || 0, z = node.z || 0;

            // bounce on box walls
            if (Math.abs(x) > 650) { node.vx *= -1; }
            if (Math.abs(y) > 130) { node.vy *= -1; }
            if (Math.abs(z) > 100) { node.vz *= -1; }

          });
        });

        fgRef.current.d3Force("link").distance((links: Link) => links.distance);

        }, []);

   console.log(Mydata)

    return (
        <ForceGraph3D
            ref={fgRef}
            // dagMode='lr'
            // enableNodeDrag={true}
            // enableNavigationControls={true}
            showNavInfo={false}
            // dagLevelDistance={200}
            // onNodeDragEnd={node => {
            //     console.log(node)
            //     node.fx = node.x;
            //     node.fy = node.y;
            //     node.fz = node.z;
            //   }}
            nodeLabel="id"
            graphData={Mydata}
            height={300}
            nodeThreeObject={({ img }) => {
                const group = new THREE.Group();


                // const nodeGeometry = new THREE.SphereGeometry(10, 32, 32);
                // const nodeMaterial = new THREE.MeshBasicMaterial({ color: '#fff' });
                // const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
                // group.add(mesh);
                // const borderGeometry = new THREE.RingGeometry(10.5 * 9, 11 * 9, 32 * 9); // slightly larger than the node
                // const borderMaterial = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
                // const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
                // borderMesh.position.set(0, 0, -5); // Adjust z-position to align with node's surface
                // borderMesh.lookAt(new THREE.Vector3(0, 0, 1)); // Rotate to face the camera
                // group.add(borderMesh);

                const imgTexture = new THREE.TextureLoader().load(img);
                imgTexture.colorSpace = THREE.SRGBColorSpace;
                const material = new THREE.SpriteMaterial({ map: imgTexture });
                const sprite = new THREE.Sprite(material);
                sprite.scale.set(128 , 128 , 128 );


                group.add(sprite);


                return group;
            }}
            
            backgroundColor='rgba(0,0,0,0)'
            linkWidth={2}
            linkDirectionalParticles={5}
            linkOpacity={1}
            linkColor={(link) => {
                return "#fff";
            }}     
            cooldownTime={Infinity}
            d3AlphaDecay={0}
            d3VelocityDecay={0}
            
        />
    )
}
export default Banner