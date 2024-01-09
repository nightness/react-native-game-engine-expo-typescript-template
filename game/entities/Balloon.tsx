import React from 'react'
import Matter from 'matter-js'
import { ColorValue, View } from 'react-native'

import { BalloonSVG } from '@svg'
import { GameEntity, Position2D, Size2D } from '@types'

const Balloon = ({ body, color }: GameEntity) => {
  const heightBody = body.bounds.max.y - body.bounds.min.y;
  const widthBody = body.bounds.max.x - body.bounds.min.x;

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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BalloonSVG color={color} />
    </View>
  );
};

export default (
  label: string,
  world: Matter.Composite,
  color: ColorValue,
  pos: Position2D,
  size: Size2D
) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label,
    isStatic: false,
    id: 5,
    frictionAir: 0.5,
  });
  Matter.Composite.add(world, body);

  return {
    body,
    color,
    pos,
    renderer: Balloon,
  };
};
