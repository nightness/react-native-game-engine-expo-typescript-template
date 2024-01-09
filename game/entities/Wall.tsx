import Matter from 'matter-js'
import React from 'react'
import { ColorValue, View } from 'react-native'

import { GameEntity, Position2D, Size2D } from '@types'

const Wall = ({ body, color }: GameEntity) => {
    const widthBody = body.bounds.max.x - body.bounds.min.x
    const heightBody = body.bounds.max.y - body.bounds.min.y

    const xBody = body.position.x - widthBody / 2
    const yBody = body.position.y - heightBody / 2

    return (
        <View style={{
            backgroundColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }} />
    )
}

export default (label: string, world: Matter.Composite, color: ColorValue, pos: Position2D, size: Size2D) => {
    const body = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true
        } as Matter.IChamferableBodyDefinition
    )
    Matter.Composite.add(world, body)

    return {
        body,
        color,
        pos,
        renderer: Wall
    }
}
