import Matter from 'matter-js'
import React from 'react'
import { ColorValue, View } from 'react-native'

import { BalloonSVG } from '@svg'
import { Position2D, Size2D } from '@types'

const Balloon = ({ body, color }: any) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x;
    const heightBody = body.bounds.max.y - body.bounds.min.y;
  
    const xBody = body.position.x - widthBody / 2;
    const yBody = body.position.y - heightBody / 2;
  
    return (
      <View
        style={{
          position: "absolute",
          left: xBody,
          top: yBody,
          width: widthBody,
          height: heightBody,
        }}
      >
        <BalloonSVG color={color} />
      </View>
    );
  };
  
  export default (
    world: Matter.Composite,
    color: ColorValue,
    pos: Position2D,
    size: Size2D
  ) => {
    const body = Matter.Bodies.circle(pos.x, pos.y, 50, {
      label: "Balloon",
      isStatic: false,
      // restitution: 0.4,
      // friction: 1,
      frictionAir: 0.2,
      // mass: 0.1,
      // inverseMass: 0.1,
      // bounds: {
      //   min: { x: size.width, y: size.height },
      //   max: { x: size.width, y: size.height },
      // },
      // inertia: Infinity,
      // inverseInertia: Infinity,
    } as Matter.IChamferableBodyDefinition);
    Matter.Composite.add(world, body);
  
    return {
      body,
      color,
      pos,
      renderer: Balloon,
    };
  };
  